var myMainEngine = null;
var myEngines = [];

export function initEngineExtension(engine) {
    initEngineExtensionGlobal(engine);
}

export function initEngineExtensionGlobal(engine) {
    if (engine != null) {
        addEngine(engine);
        if (getMainEngine() == null) {
            setMainEngine(engine);
        }
    }
}

export function getMainEngine() {
    return myMainEngine;
}

export function setMainEngine(engine) {
    myMainEngine = engine;
}

export function getEngines() {
    return myEngines;
}

export function addEngine(engine) {
    removeEngine(engine);
    myEngines.push(engine);
}

export function removeEngine(engine) {
    let index = myEngines.indexOf(engine);

    if (index >= 0) {
        myEngines.splice(index, 1);
    }
}