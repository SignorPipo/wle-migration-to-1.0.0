import { getMainEngine, getXR } from "../wl/engine_globals";

export function getSession(engine = getMainEngine()) {
    let xr = getXR(engine);
    return xr != null ? xr.session : null;
}

export function getSessionMode(engine = getMainEngine()) {
    let xr = getXR(engine);
    return xr != null ? xr.sessionMode : null;
}

export function getReferenceSpace(engine = getMainEngine()) {
    let xr = getXR(engine);
    return xr != null ? xr.currentReferenceSpace : null;
}

export function getReferenceSpaceType(engine = getMainEngine()) {
    let type = "local";

    try {
        let xr = getXR(engine);
        type = xr != null ? xr.currentReferenceSpaceType : null;
    } catch (error) {

    }

    return type;
}

export function getFrame(engine = getMainEngine()) {
    let xr = getXR(engine);
    return xr != null ? xr.frame : null;
}

export function isSessionActive(engine = getMainEngine()) {
    return getSession(engine) != null;
}

export function isReferenceSpaceFloorBased(engine = getMainEngine()) {
    return getReferenceSpaceType(engine).includes("floor");
}

export function registerSessionStartEventListener(id, listener, manuallyCallSessionStartIfSessionAlreadyActive = false, addManualCallFlagToStartListener = false, engine = getMainEngine()) {
    if (listener != null) {
        if (manuallyCallSessionStartIfSessionAlreadyActive && isSessionActive(engine)) {
            if (addManualCallFlagToStartListener) {
                listener(true, getSession(engine), getSessionMode(engine));
            } else {
                listener(getSession(engine), getSessionMode(engine));
            }
        }

        if (addManualCallFlagToStartListener) {
            engine.onXRSessionStart.add(listener.bind(undefined, false), { id: id });
        } else {
            engine.onXRSessionStart.add(listener, { id: id });
        }
    }
}

export function unregisterSessionStartEventListener(id, engine = getMainEngine()) {
    engine.onXRSessionStart.remove(id);
}

export function registerSessionEndEventListener(id, listener, engine = getMainEngine()) {
    if (listener != null) {
        engine.onXRSessionEnd.add(listener, { id: id });
    }
}

export function unregisterSessionEndEventListener(id, engine = getMainEngine()) {
    return engine.onXRSessionEnd.remove(id);
}

export function registerSessionStartEndEventListeners(id, startListener, endListener, manuallyCallSessionStartIfSessionAlreadyActive = false, addManualCallFlagToStartListener = false, engine = getMainEngine()) {
    registerSessionStartEventListener(id, startListener, manuallyCallSessionStartIfSessionAlreadyActive, addManualCallFlagToStartListener, engine);
    registerSessionEndEventListener(id, endListener, engine);
}

export function unregisterSessionStartEndEventListeners(id, engine = getMainEngine()) {
    unregisterSessionStartEventListener(id, engine);
    unregisterSessionEndEventListener(id, engine);
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
    getSessionMode,
    getReferenceSpace,
    getReferenceSpaceType,
    getFrame,
    isSessionActive,
    registerSessionStartEventListener,
    unregisterSessionStartEventListener,
    registerSessionEndEventListener,
    unregisterSessionEndEventListener,
    registerSessionStartEndEventListeners,
    unregisterSessionStartEndEventListeners,
    isReferenceSpaceFloorBased,
    isVRSupported,
    isARSupported,
    isDeviceEmulated
};