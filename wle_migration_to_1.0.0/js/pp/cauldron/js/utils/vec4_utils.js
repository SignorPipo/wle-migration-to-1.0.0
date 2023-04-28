import { vec4 } from "gl-matrix";

// glMatrix Bridge

export function create(x, y, z, w) {
    let out = vec4.create();

    if (x !== undefined) {
        set(out, x, y, z, w);
    }

    return out;
}

export function set(vector, x, y, z, w) {
    if (y === undefined) {
        vec4.set(vector, x, x, x, x);
    } else {
        vec4.set(vector, x, y, z, w);
    }

    return vector;
}

export function copy(toASD, from) {
    vec4.copy(toASD, from);
    return toASD;
}

export function clone(vector, out = create()) {
    out.copy(vector);
    return out;
}

export let Vec4Utils = {
    create,
    set,
    copy,
    clone
};