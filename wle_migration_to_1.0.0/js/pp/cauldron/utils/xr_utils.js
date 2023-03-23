import { getMainEngine } from "../../plugin/wl/extensions/engine_extension";

export function isDeviceEmulated() {
    let isEmulated = ("CustomWebXRPolyfill" in window);
    return isEmulated;
}

// #ENGINE
export function isSessionActive(engine = getMainEngine()) {
    return engine.xrSession != null;
}

export function isReferenceSpaceLocalFloor() {
    return !["local", "viewer"].includes(WebXR.refSpace);
}

export let XRUtils = {
    isDeviceEmulated,
    isSessionActive,
    isReferenceSpaceLocalFloor
};