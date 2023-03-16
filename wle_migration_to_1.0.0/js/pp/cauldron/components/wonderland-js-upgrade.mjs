/**
 * Convert Wonderland Engine 0.9.5 JavaScript code to Wonderland Engine 1.0.0 code.
 *
 * # Usage
 *
 *   node wonderland-js-upgrade.mjs <your-file>.js
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';

/* Parse filename argument and check existence */
const filename = process.argv[2];
if (!existsSync(filename)) {
    console.log(filename, 'does not exist.');
    exit(1);
}

/** Convert a string to CamelCase */
function toCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z-]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return '';
        if (/\s+|-/.test(match)) return '';
        return match.toUpperCase();
    });
}

/** Convert `WL.Type.String` to `Type.String` */
function convertParamTypes(params) {
    return params.replaceAll('WL.Type', 'Type');
}

/** Find scope end matching starting { at given index */
function getScopeEnd(code, start) {
    let count = 1;
    for (let i = start + 1; i < code.length; ++i) {
        if (code[i] == '{') ++count;
        if (code[i] == '}') --count;
        if (count == 0) return i;
    }

    throw new Error("Unmatched scope in code, starting at " + i.toString());
}

/** Convert `init: async function(params)` to `async init(params)` */
function convertFunctions(functions, apiImports) {
    /* Move global types use to imports */
    const regex_Texture = /new\s*WL\.Texture\s*\(([^\);]*)\)\s*;/gm;
    functions = functions.replace(regex_Texture, (m, i) => {
        apiImports.push('Texture');
        return `new Texture(${m[1]});`;
    });

    /* Replace global WL use that should be this.engine now */
    for (const symbol of [
        'canvas',
        'scene',
        'physics',
        'xrSession',
        'onXRSession',
        'arSupported',
        'vrSupported',
        'onSceneLoaded',
        'textures',
    ])
        functions = functions.replaceAll('WL.' + symbol, 'this.engine.' + symbol);

    /* This regex matches `functionName: (async)? function(params) {`
     * for replacement with ES6 class version */
    const regex_functions =
        /(async\s*)?([a-zA-Z_]+)(?<!if|for|while|switch)\s*(?::\s*(async)?\s*function)?\s*\((.*)\)\s*\{/gm;

    const matches = functions.matchAll(regex_functions);

    if (!matches) return functions;

    let result = '';
    let lastMatchEnd = 0;

    for (const m of matches) {
        const name = m[2];
        const isAsync = !!m[1] || !!m[3];
        const params = m[4];

        const converted = `${isAsync ? 'async ' : ''}${name}(${params || ''}) {`;

        result += functions.substr(lastMatchEnd, m.index - lastMatchEnd) + converted;
        lastMatchEnd = m.index + m[0].length;

        /* Find closing bracket to remove ',' */
        let scopeEnd = getScopeEnd(functions, lastMatchEnd);
        /* We only support ',' directly after closing bracket.
         * Replace with newline to keep functions string length same,
         * prettier cleans up after.
         * Note: This function is never run for functions already in ES6
         *  syntax, so removal will not happen. */
        if (functions[scopeEnd + 1] == ',') {
            functions =
                functions.substr(0, scopeEnd + 1) +
                '\n' +
                functions.substr(scopeEnd + 2, functions.length - (scopeEnd + 2));

        }
    }
    result += functions.substr(lastMatchEnd, functions.length - lastMatchEnd);

    return result;
}

/**
 * Convert `WL.registerComponent('my-comp', {}, {})` to `class MyComp extends Component { ... }`
 */
function convertComponents(contents, apiImports) {
    /* This monster regex matches the three parameters of the WL.registerComponent() calls into
     * match groups 1-3 */
    const regex_registerComp =
        /WL\.registerComponent\(\s*[\'\"]([^\'\"]+)[\"\']\s*,\s*\{(\s*(?:.*\s*.*\{.*\}\s*,?\s*)*)\}\s*,\s*\{/gm;

    const matches = contents.matchAll(regex_registerComp);
    if (!matches) return contents;

    let lastMatchEnd = 0;
    let result = '';
    for (const m of matches) {
        const typeName = m[1];
        console.log('Migrating component', typeName);
        const properties = convertParamTypes(m[2]);
        const scopeStart = m.index + m[0].length;
        const scopeEnd = getScopeEnd(contents, scopeStart);
        const functions = convertFunctions(contents.substr(
            scopeStart, scopeEnd - scopeStart), apiImports);

        const converted = `export class ${toCamelCase(typeName)} extends Component {
    static TypeName = '${typeName}';
    static Properties = {${properties}};

    ${functions}}`;

        result += contents.substr(lastMatchEnd, m.index - lastMatchEnd) + converted;
        lastMatchEnd = scopeEnd + 3 /* Removes final }); */;
    }

    result += contents.substr(lastMatchEnd, contents.length - lastMatchEnd);
    return result;
}

/* Keep track of imports from @wonderlandengine/api */
const apiImports = ['Component', 'Type'];

/* Read the script and convert components */
let contents = readFileSync(filename, 'utf8');
contents = convertComponents(contents, apiImports);

/* Add imports */
const uniqueApiImports = [...new Set(apiImports)].sort();
contents = `import {${uniqueApiImports.join(
    ', '
)}} from '@wonderlandengine/api';\n\n${contents}`;

/* Overwrite the input file with the result */
writeFileSync(filename, contents);

console.log('Wrote', filename);
console.log('Running prettier on', filename);

/* Run prettier, if possible */
import('prettier/cli.js')
    .then((cli) => {
        cli.default.run(['--write', filename]);
    })
    .catch((e) => {
        console.warn(e);
        console.warn('Warning: Could not find prettier');
        console.warn('You will want to run prettier yourself.');
    });
