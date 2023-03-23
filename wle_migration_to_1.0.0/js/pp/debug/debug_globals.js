import { getMainEngine } from "../plugin/wl/extensions/engine_extension";

let _myDebugManagers = new WeakMap();

export function getDebugManager(engine = getMainEngine()) {
    return _myDebugManagers.get(engine);
}

export function setDebugManager(debugManager, engine = getMainEngine()) {
    _myDebugManagers.set(engine, debugManager);
}

export function removeDebugManager(engine = getMainEngine()) {
    _myDebugManagers.delete(engine);
}

export function hasDebugManager(engine = getMainEngine()) {
    return _myDebugManagers.has(engine);
}

export function getDebugVisualManager(engine = getMainEngine()) {
    let debugManager = getDebugManager(engine);
    if (debugManager != null) {
        return debugManager.getDebugVisualManager();
    }

    return null;
}