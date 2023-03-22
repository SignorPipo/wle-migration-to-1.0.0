import { getMainEngine } from "../../plugin/wl/extensions/engine_extension";

let _myAudioManagers = new WeakMap();

export function getAudioManager(engine = getMainEngine()) {
    return _myAudioManagers.get(engine);
}

export function setAudioManager(audioManager, engine = getMainEngine()) {
    _myAudioManagers.set(engine, audioManager);
}

export function removeAudioManager(engine = getMainEngine()) {
    _myAudioManagers.delete(engine);
}

export function hasAudioManager(engine = getMainEngine()) {
    return _myAudioManagers.has(engine);
}
