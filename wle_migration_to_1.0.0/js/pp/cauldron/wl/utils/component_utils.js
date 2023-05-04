import { AnimationComponent, CollisionComponent, InputComponent, LightComponent, MeshComponent, PhysXComponent, TextComponent, ViewComponent } from "@wonderlandengine/api";
import { ARCamera8thwall, Anchor, Cursor, CursorTarget, DebugObject, DeviceOrientationLook, FingerCursor, FixedFoveation, HandTracking, HitTestLocation, HowlerAudioListener, HowlerAudioSource, ImageTexture, MouseLookComponent, PlaneDetection, PlayerHeight, TargetFramerate, TeleportComponent, Trail, TwoJointIkSolver, VideoTexture, VrModeActiveSwitch, Vrm, WasdControlsComponent } from "@wonderlandengine/components";
import { Globals } from "../../../pp/globals";

let _myCloneCallbacks = new WeakMap();                 // Signature: callback(componentToClone, targetObject, useDefaultCloneAsFallback, deeCloneParams, customCloneParams)
let _myClonePostProcessCallbacks = new WeakMap();      // Signature: callback(componentToClone, clonedComponent, deeCloneParams, customCloneParams)

export class DeepCloneParams {

    constructor() {
        this._myDeepCloneComponents = false;
        this._myDeepCloneOverrideComponentsMap = new Map();
        this._myDeepCloneOverrideComponentsVariablesMap = new Map();
    }

    // The implementation is component dependant, not every component implements the deep clone
    setDeepCloneComponents(deepClone) {
        this._myDeepCloneComponents = deepClone;
    }

    // This value override the deep clone components value
    // The implementation is component dependant, not every component implements the deep clone
    setDeepCloneComponent(componentName, deepClone) {
        this._myDeepCloneOverrideComponentsMap.set(componentName, deepClone);
    }

    // This value override both the deep clone components value and the deep clone component override one
    // The implementation is component dependant, not every component variable override is taken into consideration
    setDeepCloneComponentVariable(componentName, variableName, deepClone) {
        let componentsVariablesMap = null;

        if (!this._myDeepCloneOverrideComponentsVariablesMap.has(componentName)) {
            this._myDeepCloneOverrideComponentsVariablesMap.set(componentName, new Map());
        }

        componentsVariablesMap = this._myDeepCloneOverrideComponentsVariablesMap.get(componentName);

        componentsVariablesMap.set(variableName, deepClone);
    }

    isDeepCloneComponent(componentName) {
        let deepCloneOverride = this._myDeepCloneOverrideComponentsMap.get(componentName);

        if (deepCloneOverride != null) {
            return deepCloneOverride;
        }

        return this._myDeepCloneComponents;
    }

    isDeepCloneComponentVariable(componentName, variableName) {
        let componentsVariablesMap = this._myDeepCloneOverrideComponentsVariablesMap.get(componentName);
        if (componentsVariablesMap != null) {
            let deepCloneOverride = componentsVariablesMap.get(variableName);
            if (deepCloneOverride != null) {
                return deepCloneOverride;
            }
        }

        return this.isDeepCloneComponent(componentName);
    }
}

export class CustomCloneParams {

    constructor() {
        this._myParams = new Map();
    }

    addParam(name, value) {
        this._myParams.set(name, value);
    }

    removeParam(name) {
        this._myParams.delete(name);
    }

    getParam(name) {
        this._myParams.get(name);
    }

    hasParam(name) {
        this._myParams.has(name);
    }
}

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

    return wlJavascript;
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

export function getClassFromType(type) {
    let classToReturn = null;

    if (ComponentUtils.isWLNativeComponent(type)) {
        switch (type) {
            case AnimationComponent.TypeName:
                classToReturn = AnimationComponent;
                break;
            case CollisionComponent.TypeName:
                classToReturn = CollisionComponent;
                break;
            case InputComponent.TypeName:
                classToReturn = InputComponent;
                break;
            case LightComponent.TypeName:
                classToReturn = LightComponent;
                break;
            case MeshComponent.TypeName:
                classToReturn = MeshComponent;
                break;
            case PhysXComponent.TypeName:
                classToReturn = PhysXComponent;
                break;
            case TextComponent.TypeName:
                classToReturn = TextComponent;
                break;
            case ViewComponent.TypeName:
                classToReturn = ViewComponent;
                break;
            default:
                classToReturn = null;
        }
    } else {
        classToReturn = ComponentUtils.getJavascriptComponentClass(type);
    }

    return classToReturn;
}

export function isTypeRegistered(typeOrClass) {
    let type = ComponentUtils.getTypeFromTypeOrClass(typeOrClass);
    return ComponentUtils.getClassFromType(type) != null;
}

export function getJavascriptComponentInstances() {
    return Globals.getWASM(this.engine)._components;
}

export function getJavascriptComponentClass(type) {
    return ComponentUtils.getJavascriptComponentClassesByIndex()[ComponentUtils.getJavascriptComponentTypeIndex(type)];
}

export function getJavascriptComponentClassesByIndex() {
    return Globals.getWASM(this.engine)._componentTypes;
}

export function getJavascriptComponentTypeIndex(typeOrClass) {
    let type = ComponentUtils.getTypeFromTypeOrClass(typeOrClass);
    return ComponentUtils.getJavascriptComponentTypeIndexes()[type];
}

export function getJavascriptComponentTypeIndexes() {
    return Globals.getWASM(this.engine)._componentTypeIndices;
}

export function getJavascriptComponentTypeFromIndex(typeIndex) {
    let type = null;

    let componentClass = ComponentUtils.getJavascriptComponentClassesByIndex()[typeIndex];
    if (componentClass != null) {
        type = componentClass.TypeName;
    }

    return type;
}

export function isCloneable(typeOrClass, defaultCloneValid = false) {
    let type = ComponentUtils.getTypeFromTypeOrClass(typeOrClass);
    return defaultCloneValid || ComponentUtils.hasCloneCallback(type) || ComponentUtils.getClassFromType(type)?.prototype.pp_clone != null;
}

export function hasClonePostProcess(typeOrClass) {
    let type = ComponentUtils.getTypeFromTypeOrClass(typeOrClass);
    return ComponentUtils.hasClonePostProcessCallback(type) || ComponentUtils.getClassFromType(type)?.prototype.pp_clonePostProcess != null;
}

export function clone(componentToClone, targetObject, deeCloneParams, customCloneParams, useDefaultCloneAsFallback = false, defaultCloneAutoStartIfNotActive = true) {
    let clonedComponent = null;

    let cloneCallback = ComponentUtils.getCloneCallback(componentToClone.type);

    if (cloneCallback != null) {
        clonedComponent = cloneCallback(componentToClone, targetObject, deeCloneParams, customCloneParams);
    } else if (componentToClone.pp_clone != null) {
        clonedComponent = componentToClone.pp_clone(targetObject, deeCloneParams, customCloneParams);
    } else if (useDefaultCloneAsFallback) {
        clonedComponent = ComponentUtils.cloneDefault(componentToClone, targetObject, defaultCloneAutoStartIfNotActive);
    }

    return clonedComponent;
}

export function clonePostProcess(componentToClone, clonedComponent, deeCloneParams, customCloneParams) {
    let clonePostProcessCallback = ComponentUtils.getClonePostProcessCallback(componentToClone.type);

    if (clonePostProcessCallback != null) {
        clonePostProcessCallback(componentToClone, clonedComponent, deeCloneParams, customCloneParams);
    } else if (componentToClone.pp_clonePostProcess != null) {
        componentToClone.pp_clonePostProcess(clonedComponent, deeCloneParams, customCloneParams);
    }

    return clonedComponent;
}

export function cloneDefault(componentToClone, targetObject, autoStartIfNotActive = true) {
    let clonedComponent = ObjectUtils.addComponent(targetObject, componentToClone.type, componentToClone);

    // Trigger start, which otherwise would be called later
    if (autoStartIfNotActive && !clonedComponent.active) {
        clonedComponent.active = true;
        clonedComponent.active = false;
    }

    return clonedComponent;
}

export function addCloneCallback(typeOrClass, callback, engine = Globals.getMainEngine()) {
    let type = ComponentUtils.getTypeFromTypeOrClass(typeOrClass);

    if (!_myCloneCallbacks.has(engine)) {
        _myCloneCallbacks.set(engine, new Map());
    }

    _myCloneCallbacks.get(engine).set(type, callback);
}

export function removeCloneCallback(typeOrClass, engine = Globals.getMainEngine()) {
    let type = ComponentUtils.getTypeFromTypeOrClass(typeOrClass);

    if (_myCloneCallbacks.has(engine)) {
        _myCloneCallbacks.get(engine).delete(type);
    }
}

export function getCloneCallback(typeOrClass, engine = Globals.getMainEngine()) {
    let callback = null;

    let type = ComponentUtils.getTypeFromTypeOrClass(typeOrClass);
    if (_myCloneCallbacks.has(engine)) {
        callback = _myCloneCallbacks.get(engine).get(type);
    }

    return callback;
}

export function hasCloneCallback(typeOrClass, engine = Globals.getMainEngine()) {
    let hasCallback = false;

    let type = ComponentUtils.getTypeFromTypeOrClass(typeOrClass);
    if (_myCloneCallbacks.has(engine)) {
        hasCallback = _myCloneCallbacks.get(engine).has(type);
    }

    return hasCallback;
}

export function addClonePostProcessCallback(typeOrClass, callback, engine = Globals.getMainEngine()) {
    let type = ComponentUtils.getTypeFromTypeOrClass(typeOrClass);

    if (!_myClonePostProcessCallbacks.has(engine)) {
        _myClonePostProcessCallbacks.set(engine, new Map());
    }

    _myClonePostProcessCallbacks.get(engine).set(type, callback);
}

export function removeClonePostProcessCallback(typeOrClass, engine = Globals.getMainEngine()) {
    let type = ComponentUtils.getTypeFromTypeOrClass(typeOrClass);

    if (_myClonePostProcessCallbacks.has(engine)) {
        _myClonePostProcessCallbacks.get(engine).delete(type);
    }
}

export function getClonePostProcessCallback(typeOrClass, engine = Globals.getMainEngine()) {
    let callback = null;

    let type = ComponentUtils.getTypeFromTypeOrClass(typeOrClass);
    if (_myClonePostProcessCallbacks.has(engine)) {
        callback = _myClonePostProcessCallbacks.get(engine).get(type);
    }

    return callback;
}

export function hasClonePostProcessCallback(typeOrClass, engine = Globals.getMainEngine()) {
    let hasCallback = false;

    let type = ComponentUtils.getTypeFromTypeOrClass(typeOrClass);
    if (_myClonePostProcessCallbacks.has(engine)) {
        hasCallback = _myClonePostProcessCallbacks.get(engine).has(type);
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
    getClassFromType,
    isTypeRegistered,

    getJavascriptComponentInstances,
    getJavascriptComponentClass,
    getJavascriptComponentClassesByIndex,
    getJavascriptComponentTypeIndex,
    getJavascriptComponentTypeIndexes,
    getJavascriptComponentTypeFromIndex,

    isCloneable,
    hasClonePostProcess,
    clone,
    clonePostProcess,
    cloneDefault,

    addCloneCallback,
    removeCloneCallback,
    getCloneCallback,
    hasCloneCallback,
    addClonePostProcessCallback,
    removeClonePostProcessCallback,
    getClonePostProcessCallback,
    hasClonePostProcessCallback
};



let _myWLNativeComponentTypes = [
    AnimationComponent.TypeName,
    CollisionComponent.TypeName,
    InputComponent.TypeName,
    LightComponent.TypeName,
    MeshComponent.TypeName,
    PhysXComponent.TypeName,
    TextComponent.TypeName,
    ViewComponent.TypeName
];

let _myWLJavascriptComponentTypes = [
    ARCamera8thwall.TypeName,
    Anchor.TypeName,
    Cursor.TypeName,
    CursorTarget.TypeName,
    DebugObject.TypeName,
    DeviceOrientationLook.TypeName,
    FingerCursor.TypeName,
    FixedFoveation.TypeName,
    HandTracking.TypeName,
    HitTestLocation.TypeName,
    HowlerAudioListener.TypeName,
    HowlerAudioSource.TypeName,
    ImageTexture.TypeName,
    MouseLookComponent.TypeName,
    PlaneDetection.TypeName,
    PlayerHeight.TypeName,
    TargetFramerate.TypeName,
    TeleportComponent.TypeName,
    Trail.TypeName,
    TwoJointIkSolver.TypeName,
    VideoTexture.TypeName,
    VrModeActiveSwitch.TypeName,
    Vrm.TypeName,
    WasdControlsComponent.TypeName
];

/*
            - addWLComponentsCloneCallbacks / remove(da fare in initPP)*/