import { MathUtils } from "../../../cauldron/js/utils/math_utils";
import { mat3_create, mat4_create, quat2_create, quat_create, vec3_create } from "../../../plugin/js/extensions/array_extension";
import { Globals } from "../../../pp/globals";

export class CloneParams {

    constructor() {
        this.myIgnoreNonCloneable = false;  // Ignores components that are not clonable
        this.myIgnoreComponents = false;    // All components are ignored, cloning only the object hierarchy
        this.myIgnoreChildren = false;      // Clones only the given object without the children

        this.myComponentsToIgnore = [];     // Ignores all component types in this list (example: "mesh"), has lower priority over myComponentsToInclude
        this.myComponentsToInclude = [];    // Clones only the component types in this list (example: "mesh"), has higher priority over myComponentsToIgnore, if empty it's ignored
        this.myIgnoreComponentCallback = null; // Signature: callback(component) returns true if the component must be ignored, it is called after the previous filters

        this.myChildrenToIgnore = [];       // Ignores all the objects in this list (example: "mesh"), has lower priority over myChildrenToInclude
        this.myChildrenToInclude = [];      // Clones only the objects in this list (example: "mesh"), has higher priority over myChildrenToIgnore, if empty it's ignored
        this.myIgnoreChildCallback = null;  // Signature: callback(object) returns true if the object must be ignored, it is called after the previous filters

        this.myUseWLClone = false;               // Use the WL component clone function 
        this.myUseWLCloneAsFallback = false;     // Use the WL component clone function as fallback only if pp_clone is not found on the component

        this.myDeepCloneParams = new DeepCloneParams(); // Used to specify if the object must be deep cloned or not, you can also override the behavior for specific components and variables

        this.myCustomCloneParams = new CustomCloneParams(); // This class can be filled with whatever custom paramater the component clone function could need
    }
}

export class DeepCloneParams {

    constructor() {
        this._myDeepCloneObject = false;
        this._myDeepCloneOverrideComponentsMap = new Map();
        this._myDeepCloneOverrideComponentsVariablesMap = new Map();
    }

    // The implementation is component dependant, not every component implements the deep clone
    setDeepCloneObject(deepClone) {
        this._myDeepCloneObject = deepClone;
    }

    // This value override the deep clone object value
    // The implementation is component dependant, not every component implements the deep clone
    setDeepCloneComponent(componentName, deepClone) {
        this._myDeepCloneOverrideComponentsMap.set(componentName, deepClone);
    }

    // This value override both the deep clone object value and the deep clone component one
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

        return this._myDeepCloneObject;
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

// GETTER

// Position

export function getPosition(object, position) {
    return getPositionWorld(object, position);
}

export function getPositionWorld(object, position = vec3_create()) {
    object.getTranslationWorld(position);
    return position;
}

export function getPositionLocal(object, position = vec3_create()) {
    object.getTranslationLocal(position);
    return position;
}

// Rotation

export function getRotation(object, rotation) {
    return getRotationWorld(object, rotation);
}

export function getRotationDegrees(object, rotation) {
    return getRotationWorldDegrees(object, rotation);
}

export function getRotationRadians(object, rotation) {
    return getRotationWorldRadians(object, rotation);
}

export function getRotationMatrix(object, rotation) {
    return getRotationWorldMatrix(object, rotation);
}

export function getRotationQuat(object, rotation) {
    return getRotationWorldQuat(object, rotation);
}

// Rotation World

export function getRotationWorld(object, rotation) {
    return getRotationWorldDegrees(object, rotation);
}

export function getRotationWorldDegrees(object, rotation) {
    rotation = getRotationWorldRadians(object, rotation);
    rotation = rotation.vec3_toDegrees(rotation);
    return rotation;
}

export let getRotationWorldRadians = function () {
    let quat = quat_create();
    return function getRotationWorldRadians(object, rotation = vec3_create()) {
        getRotationWorldQuat(object, quat);
        quat.quat_toRadians(rotation);
        return rotation;
    };
}();

export let getRotationWorldMatrix = function () {
    let quat = quat_create();
    return function getRotationWorldMatrix(object, rotation = mat3_create()) {
        getRotationWorldQuat(object, quat);
        quat.quat_toMatrix(rotation);
        return rotation;
    };
}();

export function getRotationWorldQuat(object, rotation = quat_create()) {
    object.getRotationWorld(rotation);
    return rotation;
}

// Rotation Local

export function getRotationLocal(object, rotation) {
    return getRotationLocalDegrees(object, rotation);
}

export function getRotationLocalDegrees(object, rotation) {
    rotation = getRotationLocalRadians(object, rotation);
    rotation = rotation.vec3_toDegrees(rotation);
    return rotation;
}

export let getRotationLocalRadians = function () {
    let quat = quat_create();
    return function getRotationLocalRadians(object, rotation = vec3_create()) {
        getRotationLocalQuat(object, quat);
        quat.quat_toRadians(rotation);
        return rotation;
    };
}();

export let getRotationLocalMatrix = function () {
    let quat = quat_create();
    return function getRotationLocalMatrix(object, rotation = mat3_create()) {
        getRotationLocalQuat(object, quat);
        quat.quat_toMatrix(rotation);
        return rotation;
    };
}();

export function getRotationLocalQuat(object, rotation = quat_create()) {
    object.getRotationLocal(rotation);
    return rotation;
}

// Scale

export function getScale(object, scale) {
    return getScaleWorld(object, scale);
}

export function getScaleWorld(object, scale = vec3_create()) {
    object.getScalingWorld(scale);
    return scale;
}

export function getScaleLocal(object, scale = vec3_create()) {
    object.getScalingLocal(scale);
    return scale;
}

// Transform

export function getTransform(object, transform) {
    return getTransformWorld(object, transform);
}

export function getTransformMatrix(object, transform) {
    return getTransformWorldMatrix(object, transform);
}

export function getTransformQuat(object, transform) {
    return getTransformWorldQuat(object, transform);
}

// Transform World

export function getTransformWorld(object, transform) {
    return getTransformWorldMatrix(object, transform);
}

export let getTransformWorldMatrix = function () {
    let transformQuat = quat2_create();
    let scale = vec3_create();
    return function getTransformWorldMatrix(object, transform = mat4_create()) {
        getTransformWorldQuat(object, transformQuat);
        getScaleWorld(object, scale);
        transform.mat4_fromQuat(transformQuat);
        transform.mat4_scale(scale, transform);
        return transform;
    };
}();

export function getTransformWorldQuat(object, transform = quat2_create()) {
    object.getTransformWorld(transform);
    return transform;
}

// Transform Local

export function getTransformLocal(object, transform) {
    return getTransformLocalMatrix(object, transform);
}

export let getTransformLocalMatrix = function () {
    let transformQuat = quat2_create();
    let scale = vec3_create();
    return function getTransformLocalMatrix(object, transform = mat4_create()) {
        getTransformLocalQuat(object, transformQuat);
        getScaleLocal(object, scale);
        transform.mat4_fromQuat(transformQuat);
        transform.mat4_scale(scale, transform);
        return transform;
    };
}();

export function getTransformLocalQuat(object, transform = quat2_create()) {
    object.getTransformLocal(transform);
    return transform;
}

// Axes

export function getAxes(object, axes) {
    return getAxesWorld(object, axes);
}

export function getAxesWorld(object, axes = [vec3_create(), vec3_create(), vec3_create()]) {
    getLeftWorld(object, axes[0]);
    getUpWorld(object, axes[1]);
    getForwardWorld(object, axes[2]);
    return axes;
}

export function getAxesLocal(object, axes = [vec3_create(), vec3_create(), vec3_create()]) {
    getLeftLocal(object, axes[0]);
    getUpLocal(object, axes[1]);
    getForwardLocal(object, axes[2]);
    return axes;
}

// Forward

export function getForward(object, forward) {
    return getForwardWorld(object, forward);
}

export let getForwardWorld = function () {
    let rotation = mat3_create();
    return function getForwardWorld(object, forward = vec3_create()) {
        getRotationWorldMatrix(object, rotation);
        forward[0] = rotation[6];
        forward[1] = rotation[7];
        forward[2] = rotation[8];
        return forward;
    };
}();

export let getForwardLocal = function () {
    let rotation = mat3_create();
    return function getForwardLocal(object, forward = vec3_create()) {
        getRotationLocalMatrix(object, rotation);
        forward[0] = rotation[6];
        forward[1] = rotation[7];
        forward[2] = rotation[8];
        return forward;
    };
}();

// Backward

export function getBackward(object, backward) {
    return getBackwardWorld(object, backward);
}

export let getBackwardWorld = function () {
    let rotation = mat3_create();
    return function getBackwardWorld(object, backward = vec3_create()) {
        getRotationWorldMatrix(object, rotation);
        backward[0] = -rotation[6];
        backward[1] = -rotation[7];
        backward[2] = -rotation[8];
        return backward;
    };
}();

export let getBackwardLocal = function () {
    let rotation = mat3_create();
    return function getBackwardLocal(object, backward = vec3_create()) {
        getRotationLocalMatrix(object, rotation);
        backward[0] = -rotation[6];
        backward[1] = -rotation[7];
        backward[2] = -rotation[8];
        return backward;
    };
}();

// Up

export function getUp(object, up) {
    return getUpWorld(object, up);
}

export let getUpWorld = function () {
    let rotation = mat3_create();
    return function getUpWorld(object, up = vec3_create()) {
        getRotationWorldMatrix(object, rotation);
        up[0] = rotation[3];
        up[1] = rotation[4];
        up[2] = rotation[5];
        return up;
    };
}();

export let getUpLocal = function () {
    let rotation = mat3_create();
    return function getUpLocal(object, up = vec3_create()) {
        getRotationLocalMatrix(object, rotation);
        up[0] = rotation[3];
        up[1] = rotation[4];
        up[2] = rotation[5];
        return up;
    };
}();

// Down

export function getDown(object, down) {
    return getDownWorld(object, down);
}

export let getDownWorld = function () {
    let rotation = mat3_create();
    return function getDownWorld(object, down = vec3_create()) {
        getRotationWorldMatrix(object, rotation);
        down[0] = -rotation[3];
        down[1] = -rotation[4];
        down[2] = -rotation[5];
        return down;
    };
}();

export let getDownLocal = function () {
    let rotation = mat3_create();
    return function getDownLocal(object, down = vec3_create()) {
        getRotationLocalMatrix(object, rotation);
        down[0] = -rotation[3];
        down[1] = -rotation[4];
        down[2] = -rotation[5];
        return down;
    };
}();

// Left

export function getLeft(object, left) {
    return getLeftWorld(object, left);
}

export let getLeftWorld = function () {
    let rotation = mat3_create();
    return function getLeftWorld(object, left = vec3_create()) {
        getRotationWorldMatrix(object, rotation);
        left[0] = rotation[0];
        left[1] = rotation[1];
        left[2] = rotation[2];
        return left;
    };
}();

export let getLeftLocal = function () {
    let rotation = mat3_create();
    return function getLeftLocal(object, left = vec3_create()) {
        getRotationLocalMatrix(object, rotation);
        left[0] = rotation[0];
        left[1] = rotation[1];
        left[2] = rotation[2];
        return left;
    };
}();

// Right

export function getRight(object, right) {
    return getRightWorld(object, right);
}

export let getRightWorld = function () {
    let rotation = mat3_create();
    return function getRightWorld(object, right = vec3_create()) {
        getRotationWorldMatrix(object, rotation);
        right[0] = -rotation[0];
        right[1] = -rotation[1];
        right[2] = -rotation[2];
        return right;
    };
}();

export let getRightLocal = function () {
    let rotation = mat3_create();
    return function getRightLocal(object, right = vec3_create()) {
        getRotationLocalMatrix(object, rotation);
        right[0] = -rotation[0];
        right[1] = -rotation[1];
        right[2] = -rotation[2];
        return right;
    };
}();

// SETTER

// Position

export function setPosition(object, position) {
    setPositionWorld(object, position);
}

export function setPositionWorld(object, position) {
    object.setTranslationWorld(position);
}

export function setPositionLocal(object, position) {
    object.setTranslationLocal(position);
}

// Rotation

export function setRotation(object, rotation) {
    setRotationWorld(object, rotation);
}

export function setRotationDegrees(object, rotation) {
    setRotationWorldDegrees(object, rotation);
}

export function setRotationRadians(object, rotation) {
    setRotationWorldRadians(object, rotation);
}

export function setRotationMatrix(object, rotation) {
    setRotationWorldMatrix(object, rotation);
}

export function setRotationQuat(object, rotation) {
    setRotationWorldQuat(object, rotation);
}

// Rotation World

export function setRotationWorld(object, rotation) {
    setRotationWorldDegrees(object, rotation);
}

export let setRotationWorldDegrees = function () {
    let quat = quat_create();
    return function setRotationWorldDegrees(object, rotation) {
        rotation.vec3_degreesToQuat(quat);
        setRotationWorldQuat(object, quat);
    };
}();

export let setRotationWorldRadians = function () {
    let degreesRotation = vec3_create();
    return function setRotationWorldRadians(object, rotation) {
        degreesRotation = rotation.vec3_toDegrees(degreesRotation);
        setRotationWorldDegrees(object, degreesRotation);
    };
}();

export let setRotationWorldMatrix = function () {
    let quat = quat_create();
    return function setRotationWorldMatrix(object, rotation) {
        rotation.mat3_toQuat(quat);
        setRotationWorldQuat(object, quat);
    };
}();

export function setRotationWorldQuat(object, rotation) {
    object.setRotationWorld(rotation);
}

// Rotation Local

export function setRotationLocal(object, rotation) {
    setRotationLocalDegrees(object, rotation);
}

export let setRotationLocalDegrees = function () {
    let quat = quat_create();
    return function setRotationLocalDegrees(object, rotation) {
        rotation.vec3_degreesToQuat(quat);
        setRotationLocalQuat(object, quat);
    };
}();

export let setRotationLocalRadians = function () {
    let degreesRotation = vec3_create();
    return function setRotationLocalRadians(object, rotation) {
        degreesRotation = rotation.vec3_toDegrees(degreesRotation);
        setRotationLocalDegrees(object, degreesRotation);
    };
}();

export let setRotationLocalMatrix = function () {
    let quat = quat_create();
    return function setRotationLocalMatrix(object, rotation) {
        rotation.mat3_toQuat(quat);
        setRotationLocalQuat(object, quat);
    };
}();

export function setRotationLocalQuat(object, rotation) {
    object.setRotationLocal(rotation);
}

// Scale

export function setScale(object, scale) {
    setScaleWorld(object, scale);
}

export let setScaleWorld = function () {
    let vector = vec3_create();
    return function setScaleWorld(object, scale) {
        if (isNaN(scale)) {
            object.setScalingWorld(scale);
        } else {
            vector.vec3_set(scale);
            object.setScalingWorld(vector);
        }
    };
}();

export let setScaleLocal = function () {
    let vector = vec3_create();
    return function setScaleLocal(object, scale) {
        if (isNaN(scale)) {
            object.setScalingLocal(scale);
        } else {
            vector.vec3_set(scale);
            object.setScalingLocal(vector);
        }
    };
}();

// Axes    

export function setAxes(object, left, up, forward) {
    setAxesWorld(object, left, up, forward);
}

export function setAxesWorld(object, left, up, forward) {
    if (forward != null) {
        setForwardWorld(object, forward, up, left);
    } else if (up != null) {
        setUpWorld(object, up, forward, left);
    } else {
        setLeftWorld(object, left, up, forward);
    }
}

export function setAxesLocal(object, left, up, forward) {
    if (forward != null) {
        setForwardLocal(object, forward, up, left);
    } else if (up != null) {
        setUpLocal(object, up, forward, left);
    } else {
        setLeftLocal(object, left, up, forward);
    }
}

// Forward

export function setForward(object, forward, up, left) {
    setForwardWorld(object, forward, up, left);
}

export let setForwardWorld = function () {
    let quat = quat_create();
    return function setForwardWorld(object, forward, up = null, left = null) {
        getRotationWorldQuat(object, quat);
        quat.quat_setForward(forward, up, left);
        setRotationWorldQuat(object, quat);
    };
}();

export let setForwardLocal = function () {
    let quat = quat_create();
    return function setForwardLocal(object, forward, up = null, left = null) {
        getRotationLocalQuat(object, quat);
        quat.quat_setForward(forward, up, left);
        setRotationLocalQuat(object, quat);
    };
}();

// Backward

export function setBackward(object, backward, up, left) {
    setBackwardWorld(object, backward, up, left);
}

export let setBackwardWorld = function () {
    let quat = quat_create();
    return function setBackwardWorld(object, backward, up = null, left = null) {
        getRotationWorldQuat(object, quat);
        quat.quat_setBackward(backward, up, left);
        setRotationWorldQuat(object, quat);
    };
}();

export let setBackwardLocal = function () {
    let quat = quat_create();
    return function setBackwardLocal(object, backward, up = null, left = null) {
        getRotationLocalQuat(object, quat);
        quat.quat_setBackward(backward, up, left);
        setRotationLocalQuat(object, quat);
    };
}();

// Up

export function setUp(object, up, forward, left) {
    setUpWorld(object, up, forward, left);
}

export let setUpWorld = function () {
    let quat = quat_create();
    return function setUpWorld(object, up, forward = null, left = null) {
        getRotationWorldQuat(object, quat);
        quat.quat_setUp(up, forward, left);
        setRotationWorldQuat(object, quat);
    };
}();

export let setUpLocal = function () {
    let quat = quat_create();
    return function setUpLocal(object, up, forward = null, left = null) {
        getRotationLocalQuat(object, quat);
        quat.quat_setUp(up, forward, left);
        setRotationLocalQuat(object, quat);
    };
}();

// Down

export function setDown(object, down, forward, left) {
    setDownWorld(object, down, forward, left);
}

export let setDownWorld = function () {
    let quat = quat_create();
    return function setDownWorld(object, down, forward = null, left = null) {
        getRotationWorldQuat(object, quat);
        quat.quat_setDown(down, forward, left);
        setRotationWorldQuat(object, quat);
    };
}();

export let setDownLocal = function () {
    let quat = quat_create();
    return function setDownLocal(object, down, forward = null, left = null) {
        getRotationLocalQuat(object, quat);
        quat.quat_setDown(down, forward, left);
        setRotationLocalQuat(object, quat);
    };
}();

// Left

export function setLeft(object, left, up, forward) {
    setLeftWorld(object, left, up, forward);
}

export let setLeftWorld = function () {
    let quat = quat_create();
    return function setLeftWorld(object, left, up = null, forward = null) {
        getRotationWorldQuat(object, quat);
        quat.quat_setLeft(left, up, forward);
        setRotationWorldQuat(object, quat);
    };
}();

export let setLeftLocal = function () {
    let quat = quat_create();
    return function setLeftLocal(object, left, up = null, forward = null) {
        getRotationLocalQuat(object, quat);
        quat.quat_setLeft(left, up, forward);
        setRotationLocalQuat(object, quat);
    };
}();

// Right

export function setRight(object, right, up, forward) {
    setRightWorld(object, right, up, forward);
}

export let setRightWorld = function () {
    let quat = quat_create();
    return function setRightWorld(object, right, up = null, forward = null) {
        getRotationWorldQuat(object, quat);
        quat.quat_setRight(right, up, forward);
        setRotationWorldQuat(object, quat);
    };
}();

export let setRightLocal = function () {
    let quat = quat_create();
    return function setRightLocal(object, right, up = null, forward = null) {
        getRotationLocalQuat(object, quat);
        quat.quat_setRight(right, up, forward);
        setRotationLocalQuat(object, quat);
    };
}();

// Transform

export function setTransform(object, transform) {
    setTransformWorld(object, transform);
}

export function setTransformMatrix(object, transform) {
    setTransformWorldMatrix(object, transform);
}

export function setTransformQuat(object, transform) {
    setTransformWorldQuat(object, transform);
}

// Transform World

export function setTransformWorld(object, transform) {
    return setTransformWorldMatrix(object, transform);
}

export let setTransformWorldMatrix = function () {
    let position = vec3_create();
    let rotation = quat_create();
    let scale = vec3_create();
    let transformMatrixNoScale = mat4_create();
    let inverseScale = vec3_create();
    let one = vec3_create(1);
    return function setTransformWorldMatrix(object, transform) {
        transform.mat4_getPosition(position);
        transform.mat4_getScale(scale);
        one.vec3_div(scale, inverseScale);
        transform.mat4_scale(inverseScale, transformMatrixNoScale);
        transformMatrixNoScale.mat4_getRotationQuat(rotation);
        rotation.quat_normalize(rotation);
        setScaleWorld(object, scale);
        setRotationWorldQuat(object, rotation);
        setPositionWorld(object, position);
    };
}();

export function setTransformWorldQuat(object, transform) {
    object.setTransformWorld(transform);
}

// Transform Local

export function setTransformLocal(object, transform) {
    return setTransformLocalMatrix(object, transform);
}

export let setTransformLocalMatrix = function () {
    let position = vec3_create();
    let rotation = quat_create();
    let scale = vec3_create();
    let transformMatrixNoScale = mat4_create();
    let inverseScale = vec3_create();
    let one = vec3_create(1);
    return function setTransformLocalMatrix(object, transform) {
        transform.mat4_getPosition(position);
        transform.mat4_getScale(scale);
        one.vec3_div(scale, inverseScale);
        transform.mat4_scale(inverseScale, transformMatrixNoScale);
        transformMatrixNoScale.mat4_getRotationQuat(rotation);
        rotation.quat_normalize(rotation);
        setScaleLocal(object, scale);
        setRotationLocalQuat(object, rotation);
        setPositionLocal(object, position);
    };
}();

export function setTransformLocalQuat(object, transform) {
    object.setTransformLocal(transform);
}

// RESET

// Position

export function resetPosition(object) {
    resetPositionWorld(object);
}

export let resetPositionWorld = function () {
    let zero = vec3_create();
    return function resetPositionWorld(object) {
        setPositionWorld(object, zero);
    };
}();

export let resetPositionLocal = function () {
    let zero = vec3_create();
    return function resetPositionLocal(object) {
        setPositionLocal(object, zero);
    };
}();

// Rotation

export function resetRotation(object) {
    resetRotationWorld(object);
}

export let resetRotationWorld = function () {
    let identity = quat_create();
    return function resetRotationWorld(object) {
        setRotationWorldQuat(object, identity);
    };
}();

export let resetRotationLocal = function () {
    let identity = quat_create();
    return function resetRotationLocal(object) {
        setRotationLocalQuat(object, identity);
    };
}();

// Scale

export function resetScale(object) {
    resetScaleWorld(object);
}

export let resetScaleWorld = function () {
    let one = vec3_create(1);
    return function resetScaleWorld(object) {
        setScaleWorld(object, one);
    };
}();

export let resetScaleLocal = function () {
    let one = vec3_create(1);
    return function resetScaleLocal(object) {
        setScaleLocal(object, one);
    };
}();

// Transform

export function resetTransform(object) {
    resetTransformWorld(object);
}

export function resetTransformWorld(object) {
    resetScaleWorld(object);
    resetRotationWorld(object);
    resetPositionWorld(object);
}

export function resetTransformLocal(object) {
    resetScaleLocal(object);
    resetRotationLocal(object);
    resetPositionLocal(object);
}

// TRANSFORMATIONS

// Translate

export function translate(object, translation) {
    translateWorld(object, translation);
}

export function translateWorld(object, translation) {
    object.translateWorld(translation);
}

export function translateLocal(object, translation) {
    object.translate(translation);
}

export function translateObject(object, translation) {
    object.translateObject(translation);
}

// Translate Axis

export function translateAxis(object, amount, direction) {
    translateAxisWorld(object, amount, direction);
}

export let translateAxisWorld = function () {
    let translation = vec3_create();
    return function translateAxisWorld(object, amount, direction) {
        direction.vec3_scale(amount, translation);
        translateWorld(object, translation);
    };
}();

export let translateAxisLocal = function () {
    let translation = vec3_create();
    return function translateAxisLocal(object, amount, direction) {
        direction.vec3_scale(amount, translation);
        translateLocal(object, translation);
    };
}();

export let translateAxisObject = function () {
    let translation = vec3_create();
    return function translateAxisObject(object, amount, direction) {
        direction.vec3_scale(amount, translation);
        translateObject(object, translation);
    };
}();

// Rotate

export function rotate(object, rotation) {
    rotateWorld(object, rotation);
}

export function rotateDegrees(object, rotation) {
    rotateWorldDegrees(object, rotation);
}

export function rotateRadians(object, rotation) {
    rotateWorldRadians(object, rotation);
}

export function rotateMatrix(object, rotation) {
    rotateWorldMatrix(object, rotation);
}

export function rotateQuat(object, rotation) {
    rotateWorldQuat(object, rotation);
}

// Rotate World

export function rotateWorld(object, rotation) {
    rotateWorldDegrees(object, rotation);
}

export let rotateWorldDegrees = function () {
    let rotationQuat = quat_create();
    return function rotateWorldDegrees(object, rotation) {
        rotation.vec3_degreesToQuat(rotationQuat);
        rotateWorldQuat(object, rotationQuat);
    };
}();

export let rotateWorldRadians = function () {
    let degreesRotation = vec3_create();
    return function rotateWorldRadians(object, rotation) {
        degreesRotation = rotation.vec3_toDegrees(degreesRotation);
        rotateWorldDegrees(object, degreesRotation);
    };
}();

export let rotateWorldMatrix = function () {
    let rotationQuat = quat_create();
    return function rotateWorldMatrix(object, rotation) {
        rotation.mat3_toQuat(rotationQuat);
        rotationQuat.quat_normalize(rotationQuat);
        rotateWorldQuat(object, rotationQuat);
    };
}();

export let rotateWorldQuat = function () {
    let currentRotationQuat = quat_create();
    return function rotateWorldQuat(object, rotation) {
        getRotationWorldQuat(object, currentRotationQuat);
        rotation.quat_mul(currentRotationQuat, currentRotationQuat);
        currentRotationQuat.quat_normalize(currentRotationQuat);
        setRotationWorldQuat(object, currentRotationQuat);
    };
}();

// Rotate Local

export function rotateLocal(object, rotation) {
    rotateLocalDegrees(object, rotation);
}

export let rotateLocalDegrees = function () {
    let rotationQuat = quat_create();
    return function rotateLocalDegrees(object, rotation) {
        rotation.vec3_degreesToQuat(rotationQuat);
        rotateLocalQuat(object, rotationQuat);
    };
}();

export let rotateLocalRadians = function () {
    let degreesRotation = vec3_create();
    return function rotateLocalRadians(object, rotation) {
        degreesRotation = rotation.vec3_toDegrees(degreesRotation);
        rotateLocalDegrees(object, degreesRotation);
    };
}();

export let rotateLocalMatrix = function () {
    let rotationQuat = quat_create();
    return function rotateLocalMatrix(object, rotation) {
        rotation.mat3_toQuat(rotationQuat);
        rotationQuat.quat_normalize(rotationQuat);
        rotateLocalQuat(object, rotationQuat);
    };
}();

export let rotateLocalQuat = function () {
    let currentRotationQuat = quat_create();
    return function rotateLocalQuat(object, rotation) {
        getRotationLocalQuat(object, currentRotationQuat);
        rotation.quat_mul(currentRotationQuat, currentRotationQuat);
        currentRotationQuat.quat_normalize(currentRotationQuat);
        setRotationLocalQuat(object, currentRotationQuat);
    };
}();

// Rotate Object

export function rotateObject(object, rotation) {
    rotateObjectDegrees(object, rotation);
}

export let rotateObjectDegrees = function () {
    let rotationQuat = quat_create();
    return function rotateObjectDegrees(object, rotation) {
        rotation.vec3_degreesToQuat(rotationQuat);
        rotateObjectQuat(object, rotationQuat);
    };
}();

export let rotateObjectRadians = function () {
    let degreesRotation = vec3_create();
    return function rotateObjectRadians(object, rotation) {
        degreesRotation = rotation.vec3_toDegrees(degreesRotation);
        rotateObjectDegrees(object, degreesRotation);
    };
}();

export let rotateObjectMatrix = function () {
    let rotationQuat = quat_create();
    return function rotateObjectMatrix(object, rotation) {
        rotation.mat3_toQuat(rotationQuat);
        rotationQuat.quat_normalize(rotationQuat);
        rotateObjectQuat(object, rotationQuat);
    };
}();

export function rotateObjectQuat(object, rotation) {
    object.rotateObject(rotation);
}

// Rotate Axis

export function rotateAxis(object, angle, axis) {
    rotateAxisWorld(object, angle, axis);
}

export function rotateAxisDegrees(object, angle, axis) {
    rotateAxisWorldDegrees(object, angle, axis);
}

export function rotateAxisRadians(object, angle, axis) {
    rotateAxisWorldRadians(object, angle, axis);
}

// Rotate Axis World

export function rotateAxisWorld(object, angle, axis) {
    rotateAxisWorldDegrees(object, angle, axis);
}

export function rotateAxisWorldDegrees(object, angle, axis) {
    rotateAxisWorldRadians(object, MathUtils.toRadians(angle), axis);
}

export let rotateAxisWorldRadians = function () {
    let rotation = quat_create();
    return function rotateAxisWorldRadians(object, angle, axis) {
        rotation.quat_fromAxisRadians(angle, axis);
        rotateWorldQuat(object, rotation);
    };
}();

// Rotate Axis Local

export function rotateAxisLocal(object, angle, axis) {
    rotateAxisLocalDegrees(object, angle, axis);
}

export function rotateAxisLocalDegrees(object, angle, axis) {
    rotateAxisLocalRadians(object, MathUtils.toRadians(angle), axis);
}

export let rotateAxisLocalRadians = function () {
    let rotation = quat_create();
    return function rotateAxisLocalRadians(object, angle, axis) {
        rotation.quat_fromAxisRadians(angle, axis);
        rotateLocalQuat(object, rotation);
    };
}();

// Rotate Axis Object

export function rotateAxisObject(object, angle, axis) {
    rotateAxisObjectDegrees(object, angle, axis);
}

export function rotateAxisObjectDegrees(object, angle, axis) {
    rotateAxisObjectRadians(object, MathUtils.toRadians(angle), axis);
}

export let rotateAxisObjectRadians = function () {
    let rotation = quat_create();
    return function rotateAxisObjectRadians(object, angle, axis) {
        rotation.quat_fromAxisRadians(angle, axis);
        rotateObjectQuat(object, rotation);
    };
}();

// Rotate Around

export function rotateAround(object, rotation, origin) {
    rotateAroundWorld(object, rotation, origin);
}

export function rotateAroundDegrees(object, rotation, origin) {
    rotateAroundWorldDegrees(object, rotation, origin);
}

export function rotateAroundRadians(object, rotation, origin) {
    rotateAroundWorldRadians(object, rotation, origin);
}

export function rotateAroundMatrix(object, rotation, origin) {
    rotateAroundWorldMatrix(object, rotation, origin);
}

export function rotateAroundQuat(object, rotation, origin) {
    rotateAroundWorldQuat(object, rotation, origin);
}

// Rotate Around World

export function rotateAroundWorld(object, rotation, origin) {
    rotateAroundWorldDegrees(object, rotation, origin);
}

export let rotateAroundWorldDegrees = function () {
    let rotationQuat = quat_create();
    return function rotateAroundWorldDegrees(object, rotation, origin) {
        rotation.vec3_degreesToQuat(rotationQuat);
        rotateAroundWorldQuat(object, rotationQuat, origin);
    };
}();

export let rotateAroundWorldRadians = function () {
    let degreesRotation = vec3_create();
    return function rotateAroundWorldRadians(object, rotation, origin) {
        degreesRotation = rotation.vec3_toDegrees(degreesRotation);
        rotateAroundWorldDegrees(object, degreesRotation, origin);
    };
}();

export let rotateAroundWorldMatrix = function () {
    let rotationQuat = quat_create();
    return function rotateAroundWorldMatrix(object, rotation, origin) {
        rotation.mat3_toQuat(rotationQuat);
        rotationQuat.quat_normalize(rotationQuat);
        rotateAroundWorldQuat(object, rotationQuat, origin);
    };
}();

export let rotateAroundWorldQuat = function () {
    let axis = vec3_create();
    return function rotateAroundWorldQuat(object, rotation, origin) {
        rotation.quat_getAxis(axis);
        let angle = rotation.quat_getAngleRadians();
        rotateAroundAxisWorldRadians(object, angle, axis, origin);
    };
}();

// Rotate Around Local

export function rotateAroundLocal(object, rotation, origin) {
    rotateAroundLocalDegrees(object, rotation, origin);
}

export let rotateAroundLocalDegrees = function () {
    let rotationQuat = quat_create();
    return function rotateAroundLocalDegrees(object, rotation, origin) {
        rotation.vec3_degreesToQuat(rotationQuat);
        rotateAroundLocalQuat(object, rotationQuat, origin);
    };
}();

export let rotateAroundLocalRadians = function () {
    let degreesRotation = vec3_create();
    return function rotateAroundLocalRadians(object, rotation, origin) {
        degreesRotation = rotation.vec3_toDegrees(degreesRotation);
        rotateAroundLocalDegrees(object, degreesRotation, origin);
    };
}();

export let rotateAroundLocalMatrix = function () {
    let rotationQuat = quat_create();
    return function rotateAroundLocalMatrix(object, rotation, origin) {
        rotation.mat3_toQuat(rotationQuat);
        rotationQuat.quat_normalize(rotationQuat);
        rotateAroundLocalQuat(object, rotationQuat, origin);
    };
}();

export let rotateAroundLocalQuat = function () {
    let axis = vec3_create();
    return function rotateAroundLocalQuat(object, rotation, origin) {
        rotation.quat_getAxis(axis);
        let angle = rotation.quat_getAngleRadians();
        rotateAroundAxisLocalRadians(object, angle, axis, origin);
    };
}();

// Rotate Around Object

export function rotateAroundObject(object, rotation, origin) {
    rotateAroundObjectDegrees(object, rotation, origin);
}

export let rotateAroundObjectDegrees = function () {
    let rotationQuat = quat_create();
    return function rotateAroundObjectDegrees(object, rotation, origin) {
        rotation.vec3_degreesToQuat(rotationQuat);
        rotateAroundObjectQuat(object, rotationQuat, origin);
    };
}();

export let rotateAroundObjectRadians = function () {
    let degreesRotation = vec3_create();
    return function rotateAroundObjectRadians(object, rotation, origin) {
        degreesRotation = rotation.vec3_toDegrees(degreesRotation);
        rotateAroundObjectDegrees(object, degreesRotation, origin);
    };
}();

export let rotateAroundObjectMatrix = function () {
    let rotationQuat = quat_create();
    return function rotateAroundObjectMatrix(object, rotation, origin) {
        rotation.mat3_toQuat(rotationQuat);
        rotationQuat.quat_normalize(rotationQuat);
        rotateAroundObjectQuat(object, rotationQuat, origin);
    };
}();

export let rotateAroundObjectQuat = function () {
    let axis = vec3_create();
    return function rotateAroundObjectQuat(object, rotation, origin) {
        rotation.quat_getAxis(axis);
        let angle = rotation.quat_getAngleRadians();
        rotateAroundAxisObjectRadians(object, angle, axis, origin);
    };
}();

// Rotate Around Axis

export function rotateAroundAxis(object, angle, axis, origin) {
    rotateAroundAxisWorld(object, angle, axis, origin);
}

export function rotateAroundAxisDegrees(object, angle, axis, origin) {
    rotateAroundAxisWorldDegrees(object, angle, axis, origin);
}

export function rotateAroundAxisRadians(object, angle, axis, origin) {
    rotateAroundAxisWorldRadians(object, angle, axis, origin);
}

// Rotate Around Axis World

export function rotateAroundAxisWorld(object, angle, axis, origin) {
    rotateAroundAxisWorldDegrees(object, angle, axis, origin);
}

export function rotateAroundAxisWorldDegrees(object, angle, axis, origin) {
    rotateAroundAxisWorldRadians(object, MathUtils.toRadians(angle), axis, origin);
}

export let rotateAroundAxisWorldRadians = function () {
    let transformToRotate = quat2_create();
    let transformToRotateConjugate = quat2_create();
    let transformQuat = quat2_create();
    let defaultQuat = quat_create();
    return function rotateAroundAxisWorldRadians(object, angle, axis, origin) {
        transformToRotate.quat2_setPositionRotationQuat(origin, defaultQuat);
        getTransformWorldQuat(object, transformQuat);
        transformToRotate.quat2_conjugate(transformToRotateConjugate);
        transformToRotateConjugate.quat2_mul(transformQuat, transformQuat);
        transformToRotate.quat2_rotateAxisRadians(angle, axis, transformToRotate);
        transformToRotate.quat2_mul(transformQuat, transformQuat);
        setTransformWorldQuat(object, transformQuat);
    };
}();

// Rotate Around Axis Local

export function rotateAroundAxisLocal(object, angle, axis, origin) {
    rotateAroundAxisLocalDegrees(object, angle, axis, origin);
}

export function rotateAroundAxisLocalDegrees(object, angle, axis, origin) {
    rotateAroundAxisLocalRadians(object, MathUtils.toRadians(angle), axis, origin);
}

export let rotateAroundAxisLocalRadians = function () {
    let convertedPosition = vec3_create();
    let convertedAxis = vec3_create();
    return function rotateAroundAxisLocalRadians(object, angle, axis, origin) {
        convertPositionLocalToWorld(object, origin, convertedPosition);
        convertDirectionLocalToWorld(object, axis, convertedAxis);
        rotateAroundAxisWorldRadians(object, angle, convertedAxis, convertedPosition);
    };
}();

// Rotate Around Axis Object

export function rotateAroundAxisObject(object, angle, axis, origin) {
    rotateAroundAxisObjectDegrees(object, angle, axis, origin);
}

export function rotateAroundAxisObjectDegrees(object, angle, axis, origin) {
    rotateAroundAxisObjectRadians(object, MathUtils.toRadians(angle), axis, origin);
}

export let rotateAroundAxisObjectRadians = function () {
    let convertedPosition = vec3_create();
    let convertedAxis = vec3_create();
    return function rotateAroundAxisObjectRadians(object, angle, axis, origin) {
        convertPositionObjectToWorld(object, origin, convertedPosition);
        convertDirectionObjectToWorld(object, axis, convertedAxis);
        rotateAroundAxisWorldRadians(object, angle, convertedAxis, convertedPosition);
    };
}();

// Scale

// For now it does not really make sense in WL to scale in world space or parent space
// so there is no pp_scale default function

export let scaleObject = function () {
    let vector = vec3_create();
    return function scaleObject(object, scale) {
        if (isNaN(scale)) {
            object.scale(scale);
        } else {
            vector.vec3_set(scale);
            object.scale(vector);
        }
    };
}();

// Look At

export function lookAt(object, position, up) {
    lookAtWorld(object, position, up);
}

export let lookAtWorld = function () {
    let direction = vec3_create();
    return function lookAtWorld(object, position, up) {
        getPositionWorld(object, direction);
        position.vec3_sub(direction, direction);
        lookToWorld(object, direction, up);
    };
}();

export let lookAtLocal = function () {
    let direction = vec3_create();
    return function lookAtLocal(object, position, up) {
        getPositionLocal(object, direction);
        position.vec3_sub(direction, direction);
        lookToLocal(object, direction, up);
    };
}();

export function lookTo(object, direction, up) {
    lookToWorld(object, direction, up);
}

export let lookToWorld = function () {
    let internalUp = vec3_create();
    return function lookToWorld(object, direction, up = getUpWorld(object, internalUp)) {
        setForwardWorld(object, direction, up);
    };
}();

export let lookToLocal = function () {
    let internalUp = vec3_create();
    return function lookToLocal(object, direction, up = getUpLocal(object, internalUp)) {
        setForwardLocal(object, direction, up);
    };
}();

// EXTRA

// Parent

export let setParent = function () {
    let position = vec3_create();
    let rotation = quat_create();
    let scale = vec3_create();
    return function setParent(object, newParent, keepTransformWorld = true) {
        if (!keepTransformWorld) {
            object.parent = newParent;
        } else {
            getPositionWorld(object, position);
            getRotationWorldQuat(object, rotation);
            getScaleWorld(object, scale);
            object.parent = newParent;
            setScaleWorld(object, scale);
            setRotationWorldQuat(object, rotation);
            setPositionWorld(object, position);
        }
    };
}();

export function getParent(object) {
    return object.parent;
}

// Convert Vector Object World

export let convertPositionObjectToWorld = function () {
    let matrix = mat4_create();
    return function convertPositionObjectToWorld(object, position, resultPosition = vec3_create()) {
        getTransformWorldMatrix(object, matrix);
        position.vec3_transformMat4(matrix, resultPosition);
        return resultPosition;
    };
}();

export let convertDirectionObjectToWorld = function () {
    let rotation = quat_create();
    return function convertDirectionObjectToWorld(object, direction, resultDirection = vec3_create()) {
        getRotationWorldQuat(object, rotation);
        direction.vec3_transformQuat(rotation, resultDirection);
        return resultDirection;
    };
}();

export let convertPositionWorldToObject = function () {
    let matrix = mat4_create();
    return function convertPositionWorldToObject(object, position, resultPosition = vec3_create()) {
        getTransformWorldMatrix(object, matrix);
        matrix.mat4_invert(matrix);
        position.vec3_transformMat4(matrix, resultPosition);
        return resultPosition;
    };
}();

export let convertDirectionWorldToObject = function () {
    let rotation = quat_create();
    return function convertDirectionWorldToObject(object, direction, resultDirection = vec3_create()) {
        getRotationWorldQuat(object, rotation);
        rotation.quat_conjugate(rotation);
        direction.vec3_transformQuat(rotation, resultDirection);
        return resultDirection;
    };
}();

// Convert Vector Local World

export function convertPositionLocalToWorld(object, position, resultPosition = vec3_create()) {
    if (getParent(object)) {
        getParent(object).pp_convertPositionObjectToWorld(position, resultPosition);
    } else {
        resultPosition.vec3_copy(position);
    }
    return resultPosition;
}

export function convertDirectionLocalToWorld(object, direction, resultDirection = vec3_create()) {
    if (getParent(object)) {
        getParent(object).pp_convertDirectionObjectToWorld(direction, resultDirection);
    } else {
        resultDirection.vec3_copy(direction);
    }
    return resultDirection;
}

export function convertPositionWorldToLocal(object, position, resultPosition = vec3_create()) {
    if (getParent(object)) {
        getParent(object).pp_convertPositionWorldToObject(position, resultPosition);
    } else {
        resultPosition.vec3_copy(position);
    }
    return resultPosition;
}

export function convertDirectionWorldToLocal(object, direction, resultDirection = vec3_create()) {
    if (getParent(object)) {
        getParent(object).pp_convertDirectionWorldToObject(direction, resultDirection);
    } else {
        resultDirection.vec3_copy(direction);
    }
    return resultDirection;
}

// Convert Vector Local Object

// I need to use the converson to world and then local also use the parent scale that changes the position in local space

export function convertPositionObjectToLocal(object, position, resultPosition = vec3_create()) {
    convertPositionObjectToWorld(object, position, resultPosition);
    convertPositionWorldToLocal(object, resultPosition, resultPosition);
    return resultPosition;
}

export function convertDirectionObjectToLocal(object, direction, resultDirection = vec3_create()) {
    convertDirectionObjectToWorld(object, direction, resultDirection);
    convertDirectionWorldToLocal(object, resultDirection, resultDirection);
    return resultDirection;
}

export function convertPositionLocalToObject(object, position, resultPosition = vec3_create()) {
    convertPositionLocalToWorld(object, position, resultPosition);
    convertPositionWorldToObject(object, resultPosition, resultPosition);
    return resultPosition;
}

export function convertDirectionLocalToObject(object, direction, resultDirection = vec3_create()) {
    convertDirectionLocalToWorld(object, direction, resultDirection);
    convertDirectionWorldToObject(object, resultDirection, resultDirection);
    return resultDirection;
}

// Convert Transform Object World

export function convertTransformObjectToWorld(object, transform, resultTransform) {
    return convertTransformObjectToWorldMatrix(object, transform, resultTransform);
}

export let convertTransformObjectToWorldMatrix = function () {
    let convertTransform = mat4_create();
    let position = vec3_create();
    let scale = vec3_create();
    let inverseScale = vec3_create();
    let one = vec3_create(1);
    return function convertTransformObjectToWorldMatrix(object, transform, resultTransform = mat4_create()) {
        getTransformWorldMatrix(object, convertTransform);
        if (hasUniformScaleWorld(object)) {
            convertTransform.mat4_mul(transform, resultTransform);
        } else {
            position.vec3_set(transform[12], transform[13], transform[14]);
            convertPositionObjectToWorld(object, position, position);

            convertTransform.mat4_getScale(scale);
            one.vec3_div(scale, inverseScale);
            convertTransform.mat4_scale(inverseScale, convertTransform);

            convertTransform.mat4_mul(transform, resultTransform);
            resultTransform.mat4_scale(scale, resultTransform);

            resultTransform[12] = position[0];
            resultTransform[13] = position[1];
            resultTransform[14] = position[2];
            resultTransform[15] = 1;
        }
        return resultTransform;
    };
}();

export let convertTransformObjectToWorldQuat = function () {
    let position = vec3_create();
    let rotation = quat_create();
    return function convertTransformObjectToWorldQuat(object, transform, resultTransform = quat2_create()) {
        getRotationWorldQuat(object, rotation);
        rotation.quat_mul(transform, rotation);
        transform.quat2_getPosition(position);
        convertPositionObjectToWorld(object, position, position);
        resultTransform.quat2_setPositionRotationQuat(position, rotation);
        return resultTransform;
    };
}();

export function convertTransformWorldToObject(object, transform, resultTransform) {
    return convertTransformWorldToObjectMatrix(object, transform, resultTransform);
}

export let convertTransformWorldToObjectMatrix = function () {
    let convertTransform = mat4_create();
    let position = vec3_create();
    let scale = vec3_create();
    let inverseScale = vec3_create();
    let one = vec3_create(1);
    return function convertTransformWorldToObjectMatrix(object, transform, resultTransform = mat4_create()) {
        getTransformWorldMatrix(object, convertTransform);
        if (hasUniformScaleWorld(object)) {
            convertTransform.mat4_invert(convertTransform);
            convertTransform.mat4_mul(transform, resultTransform);
        } else {
            position.vec3_set(transform[12], transform[13], transform[14]);
            convertPositionWorldToObject(object, position, position);

            convertTransform.mat4_getScale(scale);
            one.vec3_div(scale, inverseScale);
            convertTransform.mat4_scale(inverseScale, convertTransform);

            convertTransform.mat4_invert(convertTransform);
            convertTransform.mat4_mul(transform, resultTransform);
            resultTransform.mat4_scale(inverseScale, resultTransform);

            resultTransform[12] = position[0];
            resultTransform[13] = position[1];
            resultTransform[14] = position[2];
            resultTransform[15] = 1;
        }
        return resultTransform;
    };
}();

export let convertTransformWorldToObjectQuat = function () {
    let position = vec3_create();
    let rotation = quat_create();
    return function convertTransformWorldToObjectQuat(object, transform, resultTransform = quat2_create()) {
        getRotationWorldQuat(object, rotation);
        rotation.quat_conjugate(rotation);
        rotation.quat_mul(transform, rotation);
        transform.quat2_getPosition(position);
        convertPositionWorldToObject(object, position, position);
        resultTransform.quat2_setPositionRotationQuat(position, rotation);
        return resultTransform;
    };
}();

// Convert Transform Local World

export function convertTransformLocalToWorld(object, transform, resultTransform) {
    return convertTransformLocalToWorldMatrix(object, transform, resultTransform);
}

export function convertTransformLocalToWorldMatrix(object, transform, resultTransform = mat4_create()) {
    if (getParent(object)) {
        getParent(object).pp_convertTransformObjectToWorldMatrix(transform, resultTransform);
    } else {
        resultTransform.mat4_copy(transform);
    }
    return resultTransform;
}

export function convertTransformLocalToWorldQuat(object, transform, resultTransform = quat2_create()) {
    if (getParent(object)) {
        getParent(object).pp_convertTransformObjectToWorldQuat(transform, resultTransform);
    } else {
        resultTransform.quat2_copy(transform);
    }
    return resultTransform;
}

export function convertTransformWorldToLocal(object, transform, resultTransform) {
    return convertTransformWorldToLocalMatrix(object, transform, resultTransform);
}

export function convertTransformWorldToLocalMatrix(object, transform, resultTransform = mat4_create()) {
    if (getParent(object)) {
        getParent(object).pp_convertTransformWorldToObjectMatrix(transform, resultTransform);
    } else {
        resultTransform.mat4_copy(transform);
    }
    return resultTransform;
}

export function convertTransformWorldToLocalQuat(object, transform, resultTransform = quat2_create()) {
    if (getParent(object)) {
        getParent(object).pp_convertTransformWorldToObjectQuat(transform, resultTransform);
    } else {
        resultTransform.quat2_copy(transform);
    }
    return resultTransform;
}

// Convert Transform Object Local

// I need to use the converson to world and then local also use the parent scale that changes the position in local space

export function convertTransformObjectToLocal(object, transform, resultTransform) {
    return convertTransformObjectToLocalMatrix(object, transform, resultTransform);
}

export function convertTransformObjectToLocalMatrix(object, transform, resultTransform = mat4_create()) {
    convertTransformObjectToWorldMatrix(object, transform, resultTransform);
    convertTransformWorldToLocalMatrix(object, resultTransform, resultTransform);
    return resultTransform;
}

export function convertTransformObjectToLocalQuat(object, transform, resultTransform = quat2_create()) {
    convertTransformObjectToWorldQuat(object, transform, resultTransform);
    convertTransformWorldToLocalQuat(object, resultTransform, resultTransform);
    return resultTransform;
}

export function convertTransformLocalToObject(object, transform, resultTransform) {
    return convertTransformLocalToObjectMatrix(object, transform, resultTransform);
}

export function convertTransformLocalToObjectMatrix(object, transform, resultTransform = mat4_create()) {
    convertTransformLocalToWorldMatrix(object, transform, resultTransform);
    convertTransformWorldToObjectMatrix(object, resultTransform, resultTransform);
    return resultTransform;
}

export function convertTransformLocalToObjectQuat(object, transform, resultTransform = quat2_create()) {
    convertTransformLocalToWorldQuat(object, transform, resultTransform);
    convertTransformWorldToObjectQuat(object, resultTransform, resultTransform);
    return resultTransform;
}

// Component

export function addComponent(object, type, paramsOrActive, active = null) {
    let params = null;

    if (typeof paramsOrActive == "boolean") {
        params = {};
        params["active"] = paramsOrActive;
    } else {
        params = paramsOrActive;

        if (active != null) {
            if (params == null) {
                params = {};
            }
            params["active"] = active;
        }
    }

    return object.addComponent(type, params);
}

export function getComponent(object, type, index = 0) {
    return getComponentHierarchy(object, type, index);
}

export function getComponentSelf(object, type, index = 0) {
    return object.getComponent(type, index);
}

export function getComponentHierarchy(object, type, index = 0) {
    return getComponentHierarchyBreadth(object, type, index);
}

export function getComponentHierarchyBreadth(object, type, index = 0) {
    let objects = getHierarchyBreadth(object);
    return getComponentObjects(objects, type, index);
}

export function getComponentHierarchyDepth(object, type, index = 0) {
    let objects = getHierarchyDepth(object);
    return getComponentObjects(objects, type, index);
}

export function getComponentDescendants(object, type, index = 0) {
    return getComponentDescendantsBreadth(object, type, index);
}

export function getComponentDescendantsBreadth(object, type, index = 0) {
    let objects = getDescendantsBreadth(object);
    return getComponentObjects(objects, type, index);
}

export function getComponentDescendantsDepth(object, type, index = 0) {
    let objects = getDescendantsDepth(object);
    return getComponentObjects(objects, type, index);
}

export function getComponentChildren(object, type, index = 0) {
    let objects = getChildren(object);
    return getComponentObjects(objects, type, index);
}

export function getComponents(object, type) {
    return getComponentsHierarchy(object, type);
}

export function getComponentsSelf(object, type) {
    return object.getComponents(type);
}

export function getComponentsHierarchy(object, type) {
    return getComponentsHierarchyBreadth(object, type);
}

export function getComponentsHierarchyBreadth(object, type) {
    let objects = getHierarchyBreadth(object);
    return getComponentsObjects(objects, type);
}

export function getComponentsHierarchyDepth(object, type) {
    let objects = getHierarchyDepth(object);
    return getComponentsObjects(objects, type);
}

export function getComponentsDescendants(object, type) {
    return getComponentsDescendantsBreadth(object, type);
}

export function getComponentsDescendantsBreadth(object, type) {
    let objects = getDescendantsBreadth(object);
    return getComponentsObjects(objects, type);
}

export function getComponentsDescendantsDepth(object, type) {
    let objects = getDescendantsDepth(object);
    return getComponentsObjects(objects, type);
}

export function getComponentsChildren(object, type) {
    let objects = getChildren(object);
    return getComponentsObjects(objects, type);
}

// Active

export function setActive(object, active, applyToHierarchy = true) {
    if (applyToHierarchy) {
        setActiveHierarchy(object, active);
    } else {
        object.active = active;
    }
}

export function setActiveSelf(object, active) {
    setActive(object, active, false);
}

export function setActiveHierarchy(object, active) {
    setActiveHierarchyBreadth(object, active);
}

export function setActiveHierarchyBreadth(object, active) {
    let objects = getHierarchyBreadth(object);
    setActiveObjects(objects, active);
}

export function setActiveHierarchyDepth(object, active) {
    let objects = getHierarchyDepth(object);
    setActiveObjects(objects, active);
}

export function setActiveDescendants(object, active) {
    setActiveDescendantsBreadth(object, active);
}

export function setActiveDescendantsBreadth(object, active) {
    let objects = getDescendantsBreadth(object);
    setActiveObjects(objects, active);
}

export function setActiveDescendantsDepth(object, active) {
    let objects = getDescendantsDepth(object);
    setActiveObjects(objects, active);
}

export function setActiveChildren(object, active) {
    let objects = getChildren(object);
    setActiveObjects(objects, active);
}

// Uniform Scale

export function hasUniformScale(object) {
    return hasUniformScaleWorld(object);
}

export let hasUniformScaleWorld = function () {
    let scale = vec3_create();
    return function hasUniformScaleWorld(object) {
        getScaleWorld(object, scale);
        return Math.abs(scale[0] - scale[1]) < MathUtils.EPSILON && Math.abs(scale[1] - scale[2]) < MathUtils.EPSILON && Math.abs(scale[0] - scale[2]) < MathUtils.EPSILON;
    };
}();

export let hasUniformScaleLocal = function () {
    let scale = vec3_create();
    return function hasUniformScaleLocal(object) {
        getScaleLocal(object, scale);
        return Math.abs(scale[0] - scale[1]) < MathUtils.EPSILON && Math.abs(scale[1] - scale[2]) < MathUtils.EPSILON && Math.abs(scale[0] - scale[2]) < MathUtils.EPSILON;
    };
}();

// Clone

export let clone = function () {
    let scale = vec3_create();
    let transformQuat = quat2_create();
    return function clone(object, cloneParams = new CloneParams()) {
        let clonedObject = null;

        if (isCloneable(object, cloneParams)) {
            let objectsToCloneData = [];
            objectsToCloneData.push([getParent(object), object]);

            // Create the object hierarchy
            let objectsToCloneComponentsData = [];
            while (objectsToCloneData.length > 0) {
                let cloneData = objectsToCloneData.shift();
                let parent = cloneData[0];
                let objectToClone = cloneData[1];

                let currentClonedObject = (parent != null) ? addObject(parent,) : Globals.getScene(getEngine(object)).pp_addObject();
                setName(currentClonedObject, getName(objectToClone));

                setScaleLocal(currentClonedObject, getScaleLocal(objectToClone, scale));
                setTransformLocalQuat(currentClonedObject, getTransformLocalQuat(objectToClone, transformQuat));

                if (!cloneParams.myIgnoreComponents) {
                    objectsToCloneComponentsData.push([objectToClone, currentClonedObject]);
                }

                if (!cloneParams.myIgnoreChildren) {
                    for (let child of getChildren(objectToClone)) {
                        let cloneChild = false;
                        if (cloneParams.myChildrenToInclude.length > 0) {
                            cloneChild = cloneParams.myChildrenToInclude.find(childToInclude => equals(childToInclude, child)) != null;
                        } else {
                            cloneChild = cloneParams.myChildrenToIgnore.find(childToIgnore => equals(childToIgnore, child)) == null;
                        }

                        if (cloneChild && cloneParams.myIgnoreChildCallback != null) {
                            cloneChild = !cloneParams.myIgnoreChildCallback(child);
                        }

                        if (cloneChild) {
                            objectsToCloneData.push([currentClonedObject, child]);
                        }
                    }
                }

                if (clonedObject == null) {
                    clonedObject = currentClonedObject;
                }
            }

            // Get the components to clone
            let componentsToCloneData = [];
            while (objectsToCloneComponentsData.length > 0) {
                let cloneData = objectsToCloneComponentsData.shift();
                let objectToClone = cloneData[0];
                let currentClonedObject = cloneData[1];

                let components = getComponentsSelf(objectToClone);
                for (let component of components) {
                    if (component.pp_clone != null || cloneParams.myUseWLClone || cloneParams.myUseWLCloneAsFallback) {
                        let cloneComponent = false;
                        if (cloneParams.myComponentsToInclude.length > 0) {
                            cloneComponent = cloneParams.myComponentsToInclude.indexOf(component.type) != -1;
                        } else {
                            cloneComponent = cloneParams.myComponentsToIgnore.indexOf(component.type) == -1;
                        }

                        if (cloneComponent && cloneParams.myIgnoreComponentCallback != null) {
                            cloneComponent = !cloneParams.myIgnoreComponentCallback(component);
                        }

                        if (cloneComponent) {
                            componentsToCloneData.push([component, currentClonedObject]);
                        }
                    }
                }
            }

            // Clone the components
            let componentsToPostProcessData = [];
            while (componentsToCloneData.length > 0) {
                let cloneData = componentsToCloneData.shift();
                let componentToClone = cloneData[0];
                let currentClonedObject = cloneData[1];
                let clonedComponent = null;

                if (!cloneParams.myUseWLClone && componentToClone.pp_clone != null) {
                    clonedComponent = componentToClone.pp_clone(currentClonedObject, cloneParams.myDeepCloneParams, cloneParams.myCustomCloneParams);
                } else if (cloneParams.myUseWLClone || cloneParams.myUseWLCloneAsFallback) {
                    clonedComponent = addComponent(currentClonedObject, componentToClone.type, componentToClone);
                }

                if (clonedComponent != null) {
                    if (componentToClone.pp_clonePostProcess != null) {
                        componentsToPostProcessData.push([componentToClone, clonedComponent]);
                    }
                }
            }

            // Clone post process
            // Can be useful if you have to get some data from other components in the hierarchy which have now been created
            while (componentsToPostProcessData.length > 0) {
                let cloneData = componentsToPostProcessData.shift();
                let componentToClone = cloneData[0];
                let currentClonedComponent = cloneData[1];

                componentToClone.pp_clonePostProcess(currentClonedComponent, cloneParams.myDeepCloneParams, cloneParams.myCustomCloneParams);
            }
        }

        return clonedObject;
    };
}();

export function isCloneable(object, cloneParams = new CloneParams()) {
    if (cloneParams.myIgnoreNonCloneable || cloneParams.myIgnoreComponents || cloneParams.myUseWLClone || cloneParams.myUseWLCloneAsFallback) {
        return true;
    }

    let cloneable = true;

    let objectsToClone = [];
    objectsToClone.push(object);

    while (cloneable && objectsToClone.length > 0) {
        let objectToClone = objectsToClone.shift();

        let components = getComponentsSelf(objectToClone);
        for (let component of components) {
            let cloneComponent = false;
            if (cloneParams.myComponentsToInclude.length > 0) {
                cloneComponent = cloneParams.myComponentsToInclude.indexOf(component.type) != -1;
            } else {
                cloneComponent = cloneParams.myComponentsToIgnore.indexOf(component.type) == -1;
            }

            if (cloneComponent && cloneParams.myIgnoreComponentCallback != null) {
                cloneComponent = !cloneParams.myIgnoreComponentCallback(component);
            }

            if (cloneComponent && component.pp_clone == null) {
                cloneable = false;
                break;
            }
        }

        if (cloneable && !cloneParams.myIgnoreChildren) {
            for (let child of getChildren(objectToClone)) {
                let cloneChild = false;
                if (cloneParams.myChildrenToInclude.length > 0) {
                    cloneChild = cloneParams.myChildrenToInclude.find(childToInclude => equals(childToInclude, child)) != null;
                } else {
                    cloneChild = cloneParams.myChildrenToIgnore.find(childToInclude => equals(childToInclude, child)) == null;
                }

                if (cloneChild && cloneParams.myIgnoreChildCallback != null) {
                    cloneChild = !cloneParams.myIgnoreChildCallback(child);
                }

                if (cloneChild) {
                    objectsToClone.push(child);
                }
            }
        }
    }

    return cloneable;
}

// To String

export function toString(object) {
    return toStringCompact(object);
}

export let toStringExtended = function () {
    let tab = "    ";
    let newLine = "\n";
    let startObject = "{";
    let endObject = "}";
    let nameLabel = "name: ";
    let idLabel = "id: ";
    let componentsLabel = "components: ";
    let typeLabel = "type: ";
    let childrenLabel = "children: ";
    let startComponents = "[";
    let endComponents = "]";
    let startChildren = startComponents;
    let endChildren = endComponents;
    let separator = ",";
    let newLineTab = newLine.concat(tab, tab);
    return function toStringExtended(object) {
        let objectString = "";
        objectString = objectString.concat(startObject, newLine);

        let components = getComponentsSelf(object);
        let children = getChildren(object);
        let name = getName(object);

        if (components.length > 0 || children.length > 0 || name.length > 0) {
            objectString = objectString.concat(tab, idLabel, getID(object), separator, newLine);
        } else {
            objectString = objectString.concat(tab, idLabel, getID(object), newLine);
        }

        if (name.length > 0) {
            if (components.length > 0 || children.length > 0) {
                objectString = objectString.concat(tab, nameLabel, getName(object), separator, newLine);
            } else {
                objectString = objectString.concat(tab, nameLabel, getName(object), newLine);
            }
        }

        if (components.length > 0) {
            objectString = objectString.concat(tab, componentsLabel, newLine, tab, startComponents, newLine);
            for (let i = 0; i < components.length; i++) {
                let component = components[i];

                objectString = objectString.concat(tab, tab, startObject, newLine);
                objectString = objectString.concat(tab, tab, tab, typeLabel, component.type, separator, newLine);
                objectString = objectString.concat(tab, tab, tab, idLabel, component._id, separator, newLine);
                objectString = objectString.concat(tab, tab, endObject);

                if (i != components.length - 1) {
                    objectString = objectString.concat(separator, newLine);
                } else {
                    objectString = objectString.concat(newLine);
                }
            }

            if (children.length > 0) {
                objectString = objectString.concat(tab, endComponents, separator, newLine);
            } else {
                objectString = objectString.concat(tab, endComponents, newLine);
            }
        }

        if (children.length > 0) {
            objectString = objectString.concat(tab, childrenLabel, newLine, tab, startChildren, newLine);
            for (let i = 0; i < children.length; i++) {
                let child = children[i];

                let childString = toStringExtended(child,);
                childString = childString.replaceAll(newLine, newLineTab);
                childString = tab.concat(tab, childString);
                objectString = objectString.concat(childString);

                if (i != children.length - 1) {
                    objectString = objectString.concat(separator, newLine);
                } else {
                    objectString = objectString.concat(newLine);
                }
            }
            objectString = objectString.concat(tab, endChildren, newLine);
        }

        objectString = objectString.concat(endObject);

        return objectString;
    };
}();

export let toStringCompact = function () {
    let tab = "    ";
    let newLine = "\n";
    let emptyName = "<none>";
    let nameLabel = "name: ";
    let componentsLabel = "components: ";
    let separator = ", ";
    let newLineTab = newLine.concat(tab);
    return function toStringCompact(object) {
        let objectString = "";

        let name = getName(object);
        if (name.length > 0) {
            objectString = objectString.concat(nameLabel, name);
        } else {
            objectString = objectString.concat(nameLabel, emptyName);
        }

        let components = getComponentsSelf(object);
        if (components.length > 0) {
            objectString = objectString.concat(separator, componentsLabel);
            for (let i = 0; i < components.length; i++) {
                let component = components[i];

                objectString = objectString.concat(component.type);

                if (i != components.length - 1) {
                    objectString = objectString.concat(separator);
                }
            }
        }

        let children = getChildren(object);
        if (children.length > 0) {
            objectString = objectString.concat(newLine);
            for (let i = 0; i < children.length; i++) {
                let child = children[i];

                let childString = toStringCompact(child,);
                childString = childString.replaceAll(newLine, newLineTab);
                childString = tab.concat(childString);
                objectString = objectString.concat(childString);

                if (i != children.length - 1) {
                    objectString = objectString.concat(newLine);
                }
            }
        }

        return objectString;
    };
}();

// Get Object By Name

export function getObjectByName(object, name, index = 0) {
    return getObjectByNameHierarchy(object, name, index);
}

export function getObjectByNameHierarchy(object, name, index = 0) {
    return getObjectByNameHierarchyBreadth(object, name, index);
}

export function getObjectByNameHierarchyBreadth(object, name, index = 0) {
    let objects = getHierarchyBreadth(object);
    return getObjectByNameObjects(objects, name, index);
}

export function getObjectByNameHierarchyDepth(object, name, index = 0) {
    let objects = getHierarchyDepth(object);
    return getObjectByNameObjects(objects, name, index);
}

export function getObjectByNameDescendants(object, name, index = 0) {
    return getObjectByNameDescendantsBreadth(object, name, index);
}

export function getObjectByNameDescendantsBreadth(object, name, index = 0) {
    let objects = getDescendantsBreadth(object);
    return getObjectByNameObjects(objects, name, index);
}

export function getObjectByNameDescendantsDepth(object, name, index = 0) {
    let objects = getDescendantsDepth(object);
    return getObjectByNameObjects(objects, name, index);
}

export function getObjectByNameChildren(object, name, index = 0) {
    let objects = getChildren(object);
    return getObjectByNameObjects(objects, name, index);
}

export function getObjectsByName(object, name) {
    return getObjectsByNameHierarchy(object, name);
}

export function getObjectsByNameHierarchy(object, name) {
    return getObjectsByNameHierarchyBreadth(object, name);
}

export function getObjectsByNameHierarchyBreadth(object, name) {
    let objects = getHierarchyBreadth(object);
    return getObjectsByNameObjects(objects, name);
}

export function getObjectsByNameHierarchyDepth(object, name) {
    let objects = getHierarchyDepth(object);
    return getObjectsByNameObjects(objects, name);
}

export function getObjectsByNameDescendants(object, name) {
    return getObjectsByNameDescendantsBreadth(object, name);
}

export function getObjectsByNameDescendantsBreadth(object, name) {
    let objects = getDescendantsBreadth(object);
    return getObjectsByNameObjects(objects, name);
}

export function getObjectsByNameDescendantsDepth(object, name) {
    let objects = getDescendantsDepth(object);
    return getObjectsByNameObjects(objects, name);
}

export function getObjectsByNameChildren(object, name) {
    let objects = getChildren(object);
    return getObjectsByNameObjects(objects, name);
}

// Get Object By ID

export function getObjectByID(object, id) {
    return getObjectByIDHierarchy(object, id);
}

export function getObjectByIDHierarchy(object, id) {
    return getObjectByIDHierarchyBreadth(object, id);
}

export function getObjectByIDHierarchyBreadth(object, id) {
    let objects = getHierarchyBreadth(object);
    return getObjectByIDObjects(objects, id);
}

export function getObjectByIDHierarchyDepth(object, id) {
    let objects = getHierarchyDepth(object);
    return getObjectByIDObjects(objects, id);
}

export function getObjectByIDDescendants(object, id) {
    return getObjectByIDDescendantsBreadth(object, id);
}

export function getObjectByIDDescendantsBreadth(object, id) {
    let objects = getDescendantsBreadth(object);
    return getObjectByIDObjects(objects, id);
}

export function getObjectByIDDescendantsDepth(object, id) {
    let objects = getDescendantsDepth(object);
    return getObjectByIDObjects(objects, id);
}

export function getObjectByIDChildren(object, id) {
    let objects = getChildren(object);
    return getObjectByIDObjects(objects, id);
}

// Get Hierarchy

export function getHierarchy(object) {
    return getHierarchyBreadth(object);
}

export function getHierarchyBreadth(object) {
    let hierarchy = getDescendantsBreadth(object);

    hierarchy.unshift(object);

    return hierarchy;
}

export function getHierarchyDepth(object) {
    let hierarchy = getDescendantsDepth(object);

    hierarchy.unshift(object);

    return hierarchy;
}

export function getDescendants(object) {
    return getDescendantsBreadth(object);
}

export function getDescendantsBreadth(object) {
    let descendants = [];

    let descendantsQueue = getChildren(object);

    while (descendantsQueue.length > 0) {
        let descendant = descendantsQueue.shift();
        descendants.push(descendant);
        for (let child of getChildren(descendant,)) {
            descendantsQueue.push(child);
        }
    }

    return descendants;
}

export function getDescendantsDepth(object) {
    let descendants = [];

    let children = getChildren(object);

    for (let child of children) {
        descendants.push(child);

        let childDescendants = getDescendantsDepth(child,);
        if (childDescendants.length > 0) {
            descendants.push(...childDescendants);
        }
    }

    return descendants;
}

export function getChildren(object) {
    return object.children;
}

export function getSelf(object) {
    return object;
}

// Cauldron

export function addObject(object) {
    return Globals.getScene(getEngine(object)).addObject(object);
}

export function getName(object) {
    return object.name;
}

export function setName(object, name) {
    object.name = name;
}

export function getEngine(object) {
    return object.engine;
}

export function getID(object) {
    return object.objectId;
}

export function markDirty(object) {
    return object.setDirty();
}

export function isChangedTransform(object) {
    return object.changed;
}

export function equals(object, otherObject) {
    return object.equals(otherObject);
}

export function destroy(object) {
    return object.destroy();
}

export function reserveObjects(object, count) {
    reserveObjectsHierarchy(object, count);
}

export function reserveObjectsSelf(object, count) {
    let componentsAmountMap = getComponentsAmountMapSelf(object);
    _reserveObjects(count, componentsAmountMap, Globals.getScene(getEngine(object)));
}

export function reserveObjectsHierarchy(object, count) {
    let componentsAmountMap = getComponentsAmountMapHierarchy(object);
    _reserveObjects(count, componentsAmountMap, Globals.getScene(getEngine(object)));
}

export function reserveObjectsDescendants(object, count) {
    let componentsAmountMap = getComponentsAmountMapDescendants(object);
    _reserveObjects(count, componentsAmountMap, Globals.getScene(getEngine(object)));
}

export function reserveObjectsChildren(object, count) {
    let componentsAmountMap = getComponentsAmountMapChildren(object);
    _reserveObjects(count, componentsAmountMap, Globals.getScene(getEngine(object)));
}

export function getComponentsAmountMap(object, amountMap = new Map()) {
    return getComponentsAmountMapHierarchy(object, amountMap);
}

export function getComponentsAmountMapSelf(object, amountMap = new Map()) {
    let objectsAmount = amountMap.get("object");
    if (objectsAmount == null) {
        objectsAmount = 0;
    }
    objectsAmount += 1;
    amountMap.set("object", objectsAmount);

    let components = getComponentsSelf(object);
    for (let component of components) {
        let type = component.type;
        let typeAmount = amountMap.get(type);
        if (typeAmount == null) {
            typeAmount = 0;
        }
        typeAmount += 1;
        amountMap.set(type, typeAmount);
    }

    return amountMap;
}

export function getComponentsAmountMapHierarchy(object, amountMap = new Map()) {
    let hierarchy = getHierarchy(object);

    for (let hierarchyObject of hierarchy) {
        getComponentsAmountMapSelf(hierarchyObject, amountMap);
    }

    return amountMap;
}

export function getComponentsAmountMapDescendants(object, amountMap = new Map()) {
    let descendants = getDescendants(object);

    for (let descendant of descendants) {
        getComponentsAmountMapSelf(descendant, amountMap);
    }

    return amountMap;
}

export function getComponentsAmountMapChildren(object, amountMap = new Map()) {
    let children = getChildren(object);

    for (let child of children) {
        getComponentsAmountMapSelf(child, amountMap);
    }

    return amountMap;
}

// GLOBALS

export function getComponentObjects(objects, type, index = 0) {
    let component = null;

    for (let object of objects) {
        component = object.getComponent(type, index);
        if (component != null) {
            break;
        }
    }

    return component;
}

export function getComponentsObjects(objects, type) {
    let components = [];

    for (let currentObject of objects) {
        components.push(...currentObject.getComponents(type));
    }

    return components;
}

export function setActiveObjects(objects, active) {
    for (let currentObject of objects) {
        currentObject.active = active;
    }
}

export function getObjectByNameObjects(objects, name, index = 0) {
    let objectFound = null;

    let currentIndex = index;
    for (let currentObject of objects) {
        if (getName(currentObject) == name) {
            if (currentIndex == 0) {
                objectFound = currentObject;
                break;
            }

            currentIndex--;
        }
    }

    return objectFound;
}

export function getObjectsByNameObjects(objects, name) {
    let objectsFound = [];

    for (let currentObject of objects) {
        if (getName(currentObject) == name) {
            objectsFound.push(currentObject);
        }
    }

    return objectsFound;
}

export function getObjectByIDObjects(objects, id, index = 0) {
    let objectFound = null;

    let currentIndex = index;
    for (let currentObject of objects) {
        if (getID(currentObject) == id) {
            if (currentIndex == 0) {
                objectFound = currentObject;
                break;
            }

            currentIndex--;
        }
    }

    return objectFound;
}

export function getObjectsByIDObjects(objects, id) {
    let objectsFound = [];

    for (let currentObject of objects) {
        if (getID(currentObject) == id) {
            objectsFound.push(currentObject);
        }
    }

    return objectsFound;
}

export let ObjectUtils = {
    getPosition,
    getPositionWorld,
    getPositionLocal,
    getRotation, getRotationDegrees,
    getRotationRadians,
    getRotationMatrix,
    getRotationQuat,
    getRotationWorld,
    getRotationWorldDegrees,
    getRotationWorldRadians,
    getRotationWorldMatrix,
    getRotationWorldQuat,
    getRotationLocal,
    getRotationLocalDegrees,
    getRotationLocalRadians,
    getRotationLocalMatrix,
    getRotationLocalQuat,
    getScale,
    getScaleWorld,
    getScaleLocal,
    getTransform,
    getTransformMatrix,
    getTransformQuat,
    getTransformWorld,
    getTransformWorldMatrix,
    getTransformWorldQuat,
    getTransformLocal,
    getTransformLocalMatrix,
    getTransformLocalQuat,
    getAxes,
    getAxesWorld,
    getAxesLocal,
    getForward,
    getForwardWorld,
    getForwardLocal,
    getBackward,
    getBackwardWorld,
    getBackwardLocal,
    getUp,
    getUpWorld,
    getUpLocal,
    getDown,
    getDownWorld,
    getDownLocal,
    getLeft,
    getLeftWorld,
    getLeftLocal,
    getRight,
    getRightWorld,
    getRightLocal,
    setPosition,
    setPositionWorld,
    setPositionLocal,
    setRotation, setRotationDegrees,
    setRotationRadians,
    setRotationMatrix,
    setRotationQuat,
    setRotationWorld,
    setRotationWorldDegrees,
    setRotationWorldRadians,
    setRotationWorldMatrix,
    setRotationWorldQuat,
    setRotationLocal,
    setRotationLocalDegrees,
    setRotationLocalRadians,
    setRotationLocalMatrix,
    setRotationLocalQuat,
    setScale,
    setScaleWorld,
    setScaleLocal,
    setAxes,
    setAxesWorld,
    setAxesLocal,
    setForward,
    setForwardWorld,
    setForwardLocal,
    setBackward,
    setBackwardWorld,
    setBackwardLocal,
    setUp,
    setUpWorld,
    setUpLocal,
    setDown,
    setDownWorld,
    setDownLocal,
    setLeft,
    setLeftWorld,
    setLeftLocal,
    setRight,
    setRightWorld,
    setRightLocal,
    setTransform,
    setTransformMatrix,
    setTransformQuat,
    setTransformWorld,
    setTransformWorldMatrix,
    setTransformWorldQuat,
    setTransformLocal,
    setTransformLocalMatrix,
    setTransformLocalQuat,
    resetPosition,
    resetPositionWorld,
    resetPositionLocal,
    resetRotation,
    resetRotationWorld,
    resetRotationLocal,
    resetScale,
    resetScaleWorld,
    resetScaleLocal,
    resetTransform,
    resetTransformWorld,
    resetTransformLocal,
    translate,
    translateWorld,
    translateLocal,
    translateObject,
    translateAxis,
    translateAxisWorld,
    translateAxisLocal,
    translateAxisObject,
    rotate,
    rotateDegrees,
    rotateRadians,
    rotateMatrix,
    rotateQuat,
    rotateWorld,
    rotateWorldDegrees,
    rotateWorldRadians,
    rotateWorldMatrix,
    rotateWorldQuat,
    rotateLocal,
    rotateLocalDegrees,
    rotateLocalRadians,
    rotateLocalMatrix,
    rotateLocalQuat,
    rotateObject,
    rotateObjectDegrees,
    rotateObjectRadians,
    rotateObjectMatrix,
    rotateObjectQuat,
    rotateAxis,
    rotateAxisDegrees,
    rotateAxisRadians,
    rotateAxisWorld,
    rotateAxisWorldDegrees,
    rotateAxisWorldRadians,
    rotateAxisLocal,
    rotateAxisLocalDegrees,
    rotateAxisLocalRadians,
    rotateAxisObject,
    rotateAxisObjectDegrees,
    rotateAxisObjectRadians,
    rotateAround,
    rotateAroundDegrees,
    rotateAroundRadians,
    rotateAroundMatrix,
    rotateAroundQuat,
    rotateAroundWorld,
    rotateAroundWorldDegrees,
    rotateAroundWorldRadians,
    rotateAroundWorldMatrix,
    rotateAroundWorldQuat,
    rotateAroundLocal,
    rotateAroundLocalDegrees,
    rotateAroundLocalRadians,
    rotateAroundLocalMatrix,
    rotateAroundLocalQuat,
    rotateAroundObject,
    rotateAroundObjectDegrees,
    rotateAroundObjectRadians,
    rotateAroundObjectMatrix,
    rotateAroundObjectQuat,
    rotateAroundAxis,
    rotateAroundAxisDegrees,
    rotateAroundAxisRadians,
    rotateAroundAxisWorld,
    rotateAroundAxisWorldDegrees,
    rotateAroundAxisWorldRadians,
    rotateAroundAxisLocal,
    rotateAroundAxisLocalDegrees,
    rotateAroundAxisLocalRadians,
    rotateAroundAxisObject,
    rotateAroundAxisObjectDegrees,
    rotateAroundAxisObjectRadians,
    scaleObject,
    lookAt,
    lookAtWorld,
    lookAtLocal,
    lookTo,
    lookToWorld,
    lookToLocal,
    setParent,
    getParent,
    convertPositionObjectToWorld,
    convertDirectionObjectToWorld,
    convertPositionWorldToObject,
    convertDirectionWorldToObject,
    convertPositionLocalToWorld,
    convertDirectionLocalToWorld,
    convertPositionWorldToLocal,
    convertDirectionWorldToLocal,
    convertPositionObjectToLocal,
    convertDirectionObjectToLocal,
    convertPositionLocalToObject,
    convertDirectionLocalToObject,
    convertTransformObjectToWorld,
    convertTransformObjectToWorldMatrix,
    convertTransformObjectToWorldQuat,
    convertTransformWorldToObject,
    convertTransformWorldToObjectMatrix,
    convertTransformWorldToObjectQuat,
    convertTransformLocalToWorld,
    convertTransformLocalToWorldMatrix,
    convertTransformLocalToWorldQuat,
    convertTransformWorldToLocal,
    convertTransformWorldToLocalMatrix,
    convertTransformWorldToLocalQuat,
    convertTransformObjectToLocal,
    convertTransformObjectToLocalMatrix,
    convertTransformObjectToLocalQuat,
    convertTransformLocalToObject,
    convertTransformLocalToObjectMatrix,
    convertTransformLocalToObjectQuat,
    addComponent,
    getComponent,
    getComponentSelf,
    getComponentHierarchy,
    getComponentHierarchyBreadth,
    getComponentHierarchyDepth,
    getComponentDescendants,
    getComponentDescendantsBreadth,
    getComponentDescendantsDepth,
    getComponentChildren,
    getComponents,
    getComponentsSelf,
    getComponentsHierarchy,
    getComponentsHierarchyBreadth,
    getComponentsHierarchyDepth,
    getComponentsDescendants,
    getComponentsDescendantsBreadth,
    getComponentsDescendantsDepth,
    getComponentsChildren,
    setActive,
    setActiveSelf,
    setActiveHierarchy,
    setActiveHierarchyBreadth,
    setActiveHierarchyDepth,
    setActiveDescendants,
    setActiveDescendantsBreadth,
    setActiveDescendantsDepth,
    setActiveChildren,
    hasUniformScale,
    hasUniformScaleWorld,
    hasUniformScaleLocal,
    clone,
    isCloneable,
    toString,
    toStringExtended,
    toStringCompact,
    getObjectByName,
    getObjectByNameHierarchy,
    getObjectByNameHierarchyBreadth,
    getObjectByNameHierarchyDepth,
    getObjectByNameDescendants,
    getObjectByNameDescendantsBreadth,
    getObjectByNameDescendantsDepth,
    getObjectByNameChildren,
    getObjectsByName,
    getObjectsByNameHierarchy,
    getObjectsByNameHierarchyBreadth,
    getObjectsByNameHierarchyDepth,
    getObjectsByNameDescendants,
    getObjectsByNameDescendantsBreadth,
    getObjectsByNameDescendantsDepth,
    getObjectsByNameChildren,
    getObjectByID,
    getObjectByIDHierarchy,
    getObjectByIDHierarchyBreadth,
    getObjectByIDHierarchyDepth,
    getObjectByIDDescendants,
    getObjectByIDDescendantsBreadth,
    getObjectByIDDescendantsDepth,
    getObjectByIDChildren,
    getHierarchy,
    getHierarchyBreadth,
    getHierarchyDepth,
    getDescendants,
    getDescendantsBreadth,
    getDescendantsDepth,
    getChildren,
    getSelf,
    addObject,
    getName,
    setName,
    getEngine,
    getID,
    markDirty,
    isChangedTransform,
    equals,
    destroy,
    reserveObjects,
    reserveObjectsSelf,
    reserveObjectsHierarchy,
    reserveObjectsDescendants,
    reserveObjectsChildren,
    getComponentsAmountMap,
    getComponentsAmountMapSelf,
    getComponentsAmountMapHierarchy,
    getComponentsAmountMapDescendants,
    getComponentsAmountMapChildren,
    getComponentObjects,
    getComponentsObjects,
    setActiveObjects,
    getObjectByNameObjects,
    getObjectsByNameObjects,
    getObjectByIDObjects,
    getObjectsByIDObjects
}



function _reserveObjects(count, componentsAmountMap, scene) {
    let objectsToReserve = componentsAmountMap.get("object") * count;
    componentsAmountMap.delete("object");

    let componentsToReserve = {};
    for (let [componentName, componentCount] of componentsAmountMap.entries()) {
        componentsToReserve[componentName] = componentCount * count;
    }

    scene.reserveObjects(objectsToReserve, componentsToReserve);
}