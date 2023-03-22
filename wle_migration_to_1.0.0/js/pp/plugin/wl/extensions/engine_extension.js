let myMainEngine = null;
let myEngines = [];

export function initEngineExtension(engine) {
    initEngineExtensionGlobal(engine);
}

export function getMainEngine() {
    return myMainEngine;
}

export function setMainEngine(engine) {
    if (hasEngine(engine)) {
        myMainEngine = engine;
    }
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

export function hasEngine(engine) {
    return myEngines.indexOf(engine) >= 0;
}

export function initEngineExtensionGlobal(engine) {
    if (engine != null) {
        addEngine(engine);
        if (getMainEngine() == null) {
            setMainEngine(engine);
        }
    }
}