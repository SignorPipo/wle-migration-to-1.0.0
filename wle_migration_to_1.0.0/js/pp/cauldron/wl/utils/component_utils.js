import { Globals } from "../../../pp/globals";

let _myWLNativeComponentTypes = [
    "animation",
    "collision",
    "input",
    "light",
    "mesh",
    "physx",
    "text",
    "view"
];

let _myWLJavascriptComponentTypes = [
    "8thwall-camera",
    "anchor",
    "cursor",
    "cursor-target",
    "debug-object",
    "device-orientation-look",
    "finger-cursor",
    "fixed-foveation",
    "hand-tracking",
    "hit-test-location",
    "howler-audio-listener",
    "howler-audio-source",
    "image-texture",
    "mouse-look",
    "plane-detection",
    "player-height",
    "target-framerate",
    "teleport",
    "trail",
    "two-joint-ik-solver",
    "vcomponenTypeeo-texture",
    "vr-mode-active-switch",
    "vrm",
    "wasd-controls"
];

let _myComponentCloneCallbacks = new WeakMap();                 // Signature: callback(componentToClone, targetObject, useDefaultCloneAsFallback, ...args)
let _myComponentClonePostProcessCallbacks = new WeakMap();      // Signature: callback(componentToClone, clonedComponent, ...args)

export function isWLComponent(typeOrClass) {
    return ComponentUtils.isWLNativeComponent(typeOrClass) || ComponentUtils.isWLJavascriptComponent(typeOrClass);
}

export function isWLNativeComponent(typeOrClass) {
    let wlNative = false;

    let type = ComponentUtils.getTypeFromTypeOrClass(typeOrClass);

    if (ComponentUtils.getWLNativeComponentTypes().includes(type)) {
        wlNative = true;
    }

    return wlNative;
}

export function isWLJavascriptComponent(typeOrClass) {
    let wlJavascript = false;

    let type = ComponentUtils.getTypeFromTypeOrClass(typeOrClass);

    if (ComponentUtils.getWLJavascriptComponentTypes().includes(type)) {
        wlJavascript = true;
    }

    return wlNative;
}

export function getWLNativeComponentTypes() {
    return _myWLNativeComponentTypes;
}

export function getWLJavascriptComponentTypes() {
    return _myWLJavascriptComponentTypes;
}

export function getTypeFromTypeOrClass(typeOrClass) {
    if (typeOrClass == null) return;

    let type = typeOrClass;
    if (typeOrClass.TypeName != null) {
        type = typeOrClass.TypeName;
    }

    return type;
}

export function cloneComponent(componentToClone, targetObject, useDefaultCloneAsFallback = false, ...args) {
    let clonedComponent = null;

    let cloneCallback = ComponentUtils.getComponentCloneCallback(componentToClone.type);

    if (cloneCallback != null) {
        clonedComponent = cloneCallback(componentToClone, targetObject, ...args);
    } else if (componentToClone.pp_clone != null) {
        clonedComponent = componentToClone.pp_clone(targetObject, ...args);
    } else if (useDefaultCloneAsFallback) {
        clonedComponent = ComponentUtils.cloneComponentDefault(componentToClone, targetObject);
    }

    return clonedComponent;
}

export function cloneComponentPostProcess(componentToClone, clonedComponent, ...args) {
    let clonePostProcessCallback = ComponentUtils.getComponentClonePostProcessCallback(componentToClone.type);

    if (clonePostProcessCallback != null) {
        clonePostProcessCallback(componentToClone, clonedComponent, ...args);
    } else if (componentToClone.pp_clonePostProcess != null) {
        componentToClone.pp_clonePostProcess(clonedComponent, ...args);
    }

    return clonedComponent;
}

export function cloneComponentDefault(componentToClone, targetObject) {
    let clonedComponent = ObjectUtils.addComponent(targetObject, componentToClone.type, componentToClone);

    // trigger start, which otherwise would be called later
    if (!clonedComponent.active) {
        clonedComponent.active = true;
        clonedComponent.active = false;
    }

    return clonedComponent;
}

export function addComponentCloneCallback(componenType, callback, engine = Globals.getMainEngine()) {
    if (!_myComponentCloneCallbacks.has(engine)) {
        _myComponentCloneCallbacks.set(engine, new Map());
    }

    _myComponentCloneCallbacks.get(engine).set(componenType, callback);
}

export function removeComponentCloneCallback(componenType, engine = Globals.getMainEngine()) {
    if (_myComponentCloneCallbacks.has(engine)) {
        _myComponentCloneCallbacks.get(engine).delete(componenType);
    }
}

export function getComponentCloneCallback(componenType, engine = Globals.getMainEngine()) {
    let callback = null;

    if (_myComponentCloneCallbacks.has(engine)) {
        callback = _myComponentCloneCallbacks.get(engine).get(componenType);
    }

    return callback;
}

export function hasComponentCloneCallback(componenType, engine = Globals.getMainEngine()) {
    let hasCallback = false;

    if (_myComponentCloneCallbacks.has(engine)) {
        hasCallback = _myComponentCloneCallbacks.get(engine).has(componenType);
    }

    return hasCallback;
}

export function addComponentClonePostProcessCallback(componenType, callback, engine = Globals.getMainEngine()) {
    if (!_myComponentClonePostProcessCallbacks.has(engine)) {
        _myComponentClonePostProcessCallbacks.set(engine, new Map());
    }

    _myComponentClonePostProcessCallbacks.get(engine).set(componenType, callback);
}

export function removeComponentClonePostProcessCallback(componenType, engine = Globals.getMainEngine()) {
    if (_myComponentClonePostProcessCallbacks.has(engine)) {
        _myComponentClonePostProcessCallbacks.get(engine).delete(componenType);
    }
}

export function getComponentClonePostProcessCallback(componenType, engine = Globals.getMainEngine()) {
    let callback = null;

    if (_myComponentClonePostProcessCallbacks.has(engine)) {
        callback = _myComponentClonePostProcessCallbacks.get(engine).get(componenType);
    }

    return callback;
}

export function hasComponentClonePostProcessCallback(componenType, engine = Globals.getMainEngine()) {
    let hasCallback = false;

    if (_myComponentClonePostProcessCallbacks.has(engine)) {
        hasCallback = _myComponentClonePostProcessCallbacks.get(engine).has(componenType);
    }

    return hasCallback;
}

export let ComponentUtils = {
    isWLComponent,
    isWLNativeComponent,
    isWLJavascriptComponent,
    getWLNativeComponentTypes,
    getWLJavascriptComponentTypes,
    getTypeFromTypeOrClass,

    cloneComponent,
    cloneComponentPostProcess,
    cloneComponentDefault,

    addComponentCloneCallback,
    removeComponentCloneCallback,
    getComponentCloneCallback,
    hasComponentCloneCallback,
    addComponentClonePostProcessCallback,
    removeComponentClonePostProcessCallback,
    getComponentClonePostProcessCallback,
    hasComponentClonePostProcessCallback
};

/*
            - addWLComponentsCloneCallbacks / remove(da fare in initPP)*/