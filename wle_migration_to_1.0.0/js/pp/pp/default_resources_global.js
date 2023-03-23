import { getMainEngine } from "../plugin/wl/extensions/engine_extension";

let _myDefaultResourcesContainer = new WeakMap();

export function getDefaultResources(engine = getMainEngine()) {
    return _myDefaultResourcesContainer.get(engine);
}

export function setDefaultResources(defaultResources, engine = getMainEngine()) {
    _myDefaultResourcesContainer.set(engine, defaultResources);
}

export function removeDefaultResources(engine = getMainEngine()) {
    _myDefaultResourcesContainer.delete(engine);
}

export function hasDefaultResources(engine = getMainEngine()) {
    return _myDefaultResourcesContainer.has(engine);
}