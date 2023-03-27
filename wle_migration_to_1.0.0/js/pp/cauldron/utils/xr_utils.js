import { getMainEngine } from "../../plugin/wl/extensions/engine_extension";

export function getSession(engine = getMainEngine()) {
    return engine.xrSession;
}

// #ENGINE
export function isSessionActive(engine = getMainEngine()) {
    return engine.xrSession != null;
}

// #ENGINE
export function isReferenceSpaceLocalFloor(engine = getMainEngine()) {
    return !["local", "viewer"].includes(getReferenceSpaceType(engine));
}

export function getReferenceSpaceType(engine = getMainEngine()) {
    return engine.wasm.WebXR.refSpace;
}

export function getFrame(engine = getMainEngine()) {
    return engine.xrFrame;
}

export function isVRSupported(engine = getMainEngine()) {
    return engine.vrSupported;
}

export function isARSupported(engine = getMainEngine()) {
    return engine.arSupported;
}

export function isDeviceEmulated() {
    let isEmulated = ("CustomWebXRPolyfill" in window);
    return isEmulated;
}

export let XRUtils = {
    getSession,
    isSessionActive,
    isReferenceSpaceLocalFloor,
    getReferenceSpaceType,
    getFrame,
    isVRSupported,
    isARSupported,
    isDeviceEmulated
};