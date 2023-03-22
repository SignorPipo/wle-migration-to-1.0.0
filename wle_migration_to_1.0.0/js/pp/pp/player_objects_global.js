import { getMainEngine } from "../plugin/wl/extensions/engine_extension";

let _myPlayerObjects = new WeakMap();

export function getPlayerObjects(engine = getMainEngine()) {
    return _myPlayerObjects.get(engine);
}

export function setPlayerObjects(playerObjects, engine = getMainEngine()) {
    _myPlayerObjects.set(engine, playerObjects);
}

export function removePlayerObjects(engine = getMainEngine()) {
    _myPlayerObjects.delete(engine);
}

export function hasPlayerObjects(engine = getMainEngine()) {
    return _myPlayerObjects.has(engine);
}