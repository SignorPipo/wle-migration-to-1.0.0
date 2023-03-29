import { getMainEngine } from "../wl/engine_globals";

export function getSession(engine = getMainEngine()) {
    return engine.xrSession;
}

export function isSessionActive(engine = getMainEngine()) {
    return engine.xrSession != null;
}

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