import { getMainEngine } from "../plugin/wl/extensions/engine_extension";

let _myDefaultResources = new WeakMap();

export function getDefaultResources(engine = getMainEngine()) {
    return _myDefaultResources.get(engine);
}

export function setDefaultResources(defaultResources, engine = getMainEngine()) {
    _myDefaultResources.set(engine, defaultResources);
}

export function removeDefaultResources(engine = getMainEngine()) {
    _myDefaultResources.delete(engine);
}

export function hasDefaultResources(engine = getMainEngine()) {
    return _myDefaultResources.has(engine);
}