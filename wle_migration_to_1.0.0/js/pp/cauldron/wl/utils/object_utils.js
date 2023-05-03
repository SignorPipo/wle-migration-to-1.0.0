import { MathUtils } from "../../../cauldron/js/utils/math_utils";
import { mat3_create, mat4_create, quat2_create, quat_create, vec3_create } from "../../../plugin/js/extensions/array_extension";
import { Globals } from "../../../pp/globals";
import { Mat4Utils } from "../../js/utils/mat4_utils";
import { Quat2Utils } from "../../js/utils/quat2_utils";
import { QuatUtils } from "../../js/utils/quat_utils";
import { Vec3Utils } from "../../js/utils/vec3_utils";

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
    return ObjectUtils.getPositionWorld(object, position);
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
    return ObjectUtils.getRotationWorld(object, rotation);
}

export function getRotationDegrees(object, rotation) {
    return ObjectUtils.getRotationWorldDegrees(object, rotation);
}

export function getRotationRadians(object, rotation) {
    return ObjectUtils.getRotationWorldRadians(object, rotation);
}

export function getRotationMatrix(object, rotation) {
    return ObjectUtils.getRotationWorldMatrix(object, rotation);
}

export function getRotationQuat(object, rotation) {
    return ObjectUtils.getRotationWorldQuat(object, rotation);
}

// Rotation World

export function getRotationWorld(object, rotation) {
    return ObjectUtils.getRotationWorldDegrees(object, rotation);
}

export function getRotationWorldDegrees(object, rotation) {
    rotation = ObjectUtils.getRotationWorldRadians(object, rotation);
    rotation = rotation.vec3_toDegrees(rotation);
    return rotation;
}

export let getRotationWorldRadians = function () {
    let quat = quat_create();
    return function getRotationWorldRadians(object, rotation = vec3_create()) {
        ObjectUtils.getRotationWorldQuat(object, quat);
        quat.quat_toRadians(rotation);
        return rotation;
    };
}();

export let getRotationWorldMatrix = function () {
    let quat = quat_create();
    return function getRotationWorldMatrix(object, rotation = mat3_create()) {
        ObjectUtils.getRotationWorldQuat(object, quat);
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
    return ObjectUtils.getRotationLocalDegrees(object, rotation);
}

export function getRotationLocalDegrees(object, rotation) {
    rotation = ObjectUtils.getRotationLocalRadians(object, rotation);
    rotation = rotation.vec3_toDegrees(rotation);
    return rotation;
}

export let getRotationLocalRadians = function () {
    let quat = quat_create();
    return function getRotationLocalRadians(object, rotation = vec3_create()) {
        ObjectUtils.getRotationLocalQuat(object, quat);
        quat.quat_toRadians(rotation);
        return rotation;
    };
}();

export let getRotationLocalMatrix = function () {
    let quat = quat_create();
    return function getRotationLocalMatrix(object, rotation = mat3_create()) {
        ObjectUtils.getRotationLocalQuat(object, quat);
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
    return ObjectUtils.getScaleWorld(object, scale);
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
    return ObjectUtils.getTransformWorld(object, transform);
}

export function getTransformMatrix(object, transform) {
    return ObjectUtils.getTransformWorldMatrix(object, transform);
}

export function getTransformQuat(object, transform) {
    return ObjectUtils.getTransformWorldQuat(object, transform);
}

// Transform World

export function getTransformWorld(object, transform) {
    return ObjectUtils.getTransformWorldMatrix(object, transform);
}

export let getTransformWorldMatrix = function () {
    let transformQuat = quat2_create();
    let scale = vec3_create();
    return function getTransformWorldMatrix(object, transform = mat4_create()) {
        ObjectUtils.getTransformWorldQuat(object, transformQuat);
        ObjectUtils.getScaleWorld(object, scale);
        Mat4Utils.fromQuat(transformQuat, transform);
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
    return ObjectUtils.getTransformLocalMatrix(object, transform);
}

export let getTransformLocalMatrix = function () {
    let transformQuat = quat2_create();
    let scale = vec3_create();
    return function getTransformLocalMatrix(object, transform = mat4_create()) {
        ObjectUtils.getTransformLocalQuat(object, transformQuat);
        ObjectUtils.getScaleLocal(object, scale);
        Mat4Utils.fromQuat(transformQuat, transform);
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
    return ObjectUtils.getAxesWorld(object, axes);
}

export function getAxesWorld(object, axes = [vec3_create(), vec3_create(), vec3_create()]) {
    ObjectUtils.getLeftWorld(object, axes[0]);
    ObjectUtils.getUpWorld(object, axes[1]);
    ObjectUtils.getForwardWorld(object, axes[2]);
    return axes;
}

export function getAxesLocal(object, axes = [vec3_create(), vec3_create(), vec3_create()]) {
    ObjectUtils.getLeftLocal(object, axes[0]);
    ObjectUtils.getUpLocal(object, axes[1]);
    ObjectUtils.getForwardLocal(object, axes[2]);
    return axes;
}

// Forward

export function getForward(object, forward) {
    return ObjectUtils.getForwardWorld(object, forward);
}

export let getForwardWorld = function () {
    let rotation = mat3_create();
    return function getForwardWorld(object, forward = vec3_create()) {
        ObjectUtils.getRotationWorldMatrix(object, rotation);
        forward[0] = rotation[6];
        forward[1] = rotation[7];
        forward[2] = rotation[8];
        return forward;
    };
}();

export let getForwardLocal = function () {
    let rotation = mat3_create();
    return function getForwardLocal(object, forward = vec3_create()) {
        ObjectUtils.getRotationLocalMatrix(object, rotation);
        forward[0] = rotation[6];
        forward[1] = rotation[7];
        forward[2] = rotation[8];
        return forward;
    };
}();

// Backward

export function getBackward(object, backward) {
    return ObjectUtils.getBackwardWorld(object, backward);
}

export let getBackwardWorld = function () {
    let rotation = mat3_create();
    return function getBackwardWorld(object, backward = vec3_create()) {
        ObjectUtils.getRotationWorldMatrix(object, rotation);
        backward[0] = -rotation[6];
        backward[1] = -rotation[7];
        backward[2] = -rotation[8];
        return backward;
    };
}();

export let getBackwardLocal = function () {
    let rotation = mat3_create();
    return function getBackwardLocal(object, backward = vec3_create()) {
        ObjectUtils.getRotationLocalMatrix(object, rotation);
        backward[0] = -rotation[6];
        backward[1] = -rotation[7];
        backward[2] = -rotation[8];
        return backward;
    };
}();

// Up

export function getUp(object, up) {
    return ObjectUtils.getUpWorld(object, up);
}

export let getUpWorld = function () {
    let rotation = mat3_create();
    return function getUpWorld(object, up = vec3_create()) {
        ObjectUtils.getRotationWorldMatrix(object, rotation);
        up[0] = rotation[3];
        up[1] = rotation[4];
        up[2] = rotation[5];
        return up;
    };
}();

export let getUpLocal = function () {
    let rotation = mat3_create();
    return function getUpLocal(object, up = vec3_create()) {
        ObjectUtils.getRotationLocalMatrix(object, rotation);
        up[0] = rotation[3];
        up[1] = rotation[4];
        up[2] = rotation[5];
        return up;
    };
}();

// Down

export function getDown(object, down) {
    return ObjectUtils.getDownWorld(object, down);
}

export let getDownWorld = function () {
    let rotation = mat3_create();
    return function getDownWorld(object, down = vec3_create()) {
        ObjectUtils.getRotationWorldMatrix(object, rotation);
        down[0] = -rotation[3];
        down[1] = -rotation[4];
        down[2] = -rotation[5];
        return down;
    };
}();

export let getDownLocal = function () {
    let rotation = mat3_create();
    return function getDownLocal(object, down = vec3_create()) {
        ObjectUtils.getRotationLocalMatrix(object, rotation);
        down[0] = -rotation[3];
        down[1] = -rotation[4];
        down[2] = -rotation[5];
        return down;
    };
}();

// Left

export function getLeft(object, left) {
    return ObjectUtils.getLeftWorld(object, left);
}

export let getLeftWorld = function () {
    let rotation = mat3_create();
    return function getLeftWorld(object, left = vec3_create()) {
        ObjectUtils.getRotationWorldMatrix(object, rotation);
        left[0] = rotation[0];
        left[1] = rotation[1];
        left[2] = rotation[2];
        return left;
    };
}();

export let getLeftLocal = function () {
    let rotation = mat3_create();
    return function getLeftLocal(object, left = vec3_create()) {
        ObjectUtils.getRotationLocalMatrix(object, rotation);
        left[0] = rotation[0];
        left[1] = rotation[1];
        left[2] = rotation[2];
        return left;
    };
}();

// Right

export function getRight(object, right) {
    return ObjectUtils.getRightWorld(object, right);
}

export let getRightWorld = function () {
    let rotation = mat3_create();
    return function getRightWorld(object, right = vec3_create()) {
        ObjectUtils.getRotationWorldMatrix(object, rotation);
        right[0] = -rotation[0];
        right[1] = -rotation[1];
        right[2] = -rotation[2];
        return right;
    };
}();

export let getRightLocal = function () {
    let rotation = mat3_create();
    return function getRightLocal(object, right = vec3_create()) {
        ObjectUtils.getRotationLocalMatrix(object, rotation);
        right[0] = -rotation[0];
        right[1] = -rotation[1];
        right[2] = -rotation[2];
        return right;
    };
}();

// SETTER

// Position

export function setPosition(object, position) {
    ObjectUtils.setPositionWorld(object, position);
}

export function setPositionWorld(object, position) {
    object.setTranslationWorld(position);
}

export function setPositionLocal(object, position) {
    object.setTranslationLocal(position);
}

// Rotation

export function setRotation(object, rotation) {
    ObjectUtils.setRotationWorld(object, rotation);
}

export function setRotationDegrees(object, rotation) {
    ObjectUtils.setRotationWorldDegrees(object, rotation);
}

export function setRotationRadians(object, rotation) {
    ObjectUtils.setRotationWorldRadians(object, rotation);
}

export function setRotationMatrix(object, rotation) {
    ObjectUtils.setRotationWorldMatrix(object, rotation);
}

export function setRotationQuat(object, rotation) {
    ObjectUtils.setRotationWorldQuat(object, rotation);
}

// Rotation World

export function setRotationWorld(object, rotation) {
    ObjectUtils.setRotationWorldDegrees(object, rotation);
}

export let setRotationWorldDegrees = function () {
    let quat = quat_create();
    return function setRotationWorldDegrees(object, rotation) {
        rotation.vec3_degreesToQuat(quat);
        ObjectUtils.setRotationWorldQuat(object, quat);
    };
}();

export let setRotationWorldRadians = function () {
    let degreesRotation = vec3_create();
    return function setRotationWorldRadians(object, rotation) {
        degreesRotation = rotation.vec3_toDegrees(degreesRotation);
        ObjectUtils.setRotationWorldDegrees(object, degreesRotation);
    };
}();

export let setRotationWorldMatrix = function () {
    let quat = quat_create();
    return function setRotationWorldMatrix(object, rotation) {
        rotation.mat3_toQuat(quat);
        ObjectUtils.setRotationWorldQuat(object, quat);
    };
}();

export function setRotationWorldQuat(object, rotation) {
    object.setRotationWorld(rotation);
}

// Rotation Local

export function setRotationLocal(object, rotation) {
    ObjectUtils.setRotationLocalDegrees(object, rotation);
}

export let setRotationLocalDegrees = function () {
    let quat = quat_create();
    return function setRotationLocalDegrees(object, rotation) {
        rotation.vec3_degreesToQuat(quat);
        ObjectUtils.setRotationLocalQuat(object, quat);
    };
}();

export let setRotationLocalRadians = function () {
    let degreesRotation = vec3_create();
    return function setRotationLocalRadians(object, rotation) {
        degreesRotation = rotation.vec3_toDegrees(degreesRotation);
        ObjectUtils.setRotationLocalDegrees(object, degreesRotation);
    };
}();

export let setRotationLocalMatrix = function () {
    let quat = quat_create();
    return function setRotationLocalMatrix(object, rotation) {
        rotation.mat3_toQuat(quat);
        ObjectUtils.setRotationLocalQuat(object, quat);
    };
}();

export function setRotationLocalQuat(object, rotation) {
    object.setRotationLocal(rotation);
}

// Scale

export function setScale(object, scale) {
    ObjectUtils.setScaleWorld(object, scale);
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
    ObjectUtils.setAxesWorld(object, left, up, forward);
}

export function setAxesWorld(object, left, up, forward) {
    if (forward != null) {
        ObjectUtils.setForwardWorld(object, forward, up, left);
    } else if (up != null) {
        ObjectUtils.setUpWorld(object, up, forward, left);
    } else {
        ObjectUtils.setLeftWorld(object, left, up, forward);
    }
}

export function setAxesLocal(object, left, up, forward) {
    if (forward != null) {
        ObjectUtils.setForwardLocal(object, forward, up, left);
    } else if (up != null) {
        ObjectUtils.setUpLocal(object, up, forward, left);
    } else {
        ObjectUtils.setLeftLocal(object, left, up, forward);
    }
}

// Forward

export function setForward(object, forward, up, left) {
    ObjectUtils.setForwardWorld(object, forward, up, left);
}

export let setForwardWorld = function () {
    let quat = quat_create();
    return function setForwardWorld(object, forward, up = null, left = null) {
        ObjectUtils.getRotationWorldQuat(object, quat);
        quat.quat_setForward(forward, up, left);
        ObjectUtils.setRotationWorldQuat(object, quat);
    };
}();

export let setForwardLocal = function () {
    let quat = quat_create();
    return function setForwardLocal(object, forward, up = null, left = null) {
        ObjectUtils.getRotationLocalQuat(object, quat);
        quat.quat_setForward(forward, up, left);
        ObjectUtils.setRotationLocalQuat(object, quat);
    };
}();

// Backward

export function setBackward(object, backward, up, left) {
    ObjectUtils.setBackwardWorld(object, backward, up, left);
}

export let setBackwardWorld = function () {
    let quat = quat_create();
    return function setBackwardWorld(object, backward, up = null, left = null) {
        ObjectUtils.getRotationWorldQuat(object, quat);
        quat.quat_setBackward(backward, up, left);
        ObjectUtils.setRotationWorldQuat(object, quat);
    };
}();

export let setBackwardLocal = function () {
    let quat = quat_create();
    return function setBackwardLocal(object, backward, up = null, left = null) {
        ObjectUtils.getRotationLocalQuat(object, quat);
        quat.quat_setBackward(backward, up, left);
        ObjectUtils.setRotationLocalQuat(object, quat);
    };
}();

// Up

export function setUp(object, up, forward, left) {
    ObjectUtils.setUpWorld(object, up, forward, left);
}

export let setUpWorld = function () {
    let quat = quat_create();
    return function setUpWorld(object, up, forward = null, left = null) {
        ObjectUtils.getRotationWorldQuat(object, quat);
        quat.quat_setUp(up, forward, left);
        ObjectUtils.setRotationWorldQuat(object, quat);
    };
}();

export let setUpLocal = function () {
    let quat = quat_create();
    return function setUpLocal(object, up, forward = null, left = null) {
        ObjectUtils.getRotationLocalQuat(object, quat);
        quat.quat_setUp(up, forward, left);
        ObjectUtils.setRotationLocalQuat(object, quat);
    };
}();

// Down

export function setDown(object, down, forward, left) {
    ObjectUtils.setDownWorld(object, down, forward, left);
}

export let setDownWorld = function () {
    let quat = quat_create();
    return function setDownWorld(object, down, forward = null, left = null) {
        ObjectUtils.getRotationWorldQuat(object, quat);
        quat.quat_setDown(down, forward, left);
        ObjectUtils.setRotationWorldQuat(object, quat);
    };
}();

export let setDownLocal = function () {
    let quat = quat_create();
    return function setDownLocal(object, down, forward = null, left = null) {
        ObjectUtils.getRotationLocalQuat(object, quat);
        quat.quat_setDown(down, forward, left);
        ObjectUtils.setRotationLocalQuat(object, quat);
    };
}();

// Left

export function setLeft(object, left, up, forward) {
    ObjectUtils.setLeftWorld(object, left, up, forward);
}

export let setLeftWorld = function () {
    let quat = quat_create();
    return function setLeftWorld(object, left, up = null, forward = null) {
        ObjectUtils.getRotationWorldQuat(object, quat);
        quat.quat_setLeft(left, up, forward);
        ObjectUtils.setRotationWorldQuat(object, quat);
    };
}();

export let setLeftLocal = function () {
    let quat = quat_create();
    return function setLeftLocal(object, left, up = null, forward = null) {
        ObjectUtils.getRotationLocalQuat(object, quat);
        quat.quat_setLeft(left, up, forward);
        ObjectUtils.setRotationLocalQuat(object, quat);
    };
}();

// Right

export function setRight(object, right, up, forward) {
    ObjectUtils.setRightWorld(object, right, up, forward);
}

export let setRightWorld = function () {
    let quat = quat_create();
    return function setRightWorld(object, right, up = null, forward = null) {
        ObjectUtils.getRotationWorldQuat(object, quat);
        quat.quat_setRight(right, up, forward);
        ObjectUtils.setRotationWorldQuat(object, quat);
    };
}();

export let setRightLocal = function () {
    let quat = quat_create();
    return function setRightLocal(object, right, up = null, forward = null) {
        ObjectUtils.getRotationLocalQuat(object, quat);
        quat.quat_setRight(right, up, forward);
        ObjectUtils.setRotationLocalQuat(object, quat);
    };
}();

// Transform

export function setTransform(object, transform) {
    ObjectUtils.setTransformWorld(object, transform);
}

export function setTransformMatrix(object, transform) {
    ObjectUtils.setTransformWorldMatrix(object, transform);
}

export function setTransformQuat(object, transform) {
    ObjectUtils.setTransformWorldQuat(object, transform);
}

// Transform World

export function setTransformWorld(object, transform) {
    return ObjectUtils.setTransformWorldMatrix(object, transform);
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
        ObjectUtils.setScaleWorld(object, scale);
        ObjectUtils.setRotationWorldQuat(object, rotation);
        ObjectUtils.setPositionWorld(object, position);
    };
}();

export function setTransformWorldQuat(object, transform) {
    object.setTransformWorld(transform);
}

// Transform Local

export function setTransformLocal(object, transform) {
    return ObjectUtils.setTransformLocalMatrix(object, transform);
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
        ObjectUtils.setScaleLocal(object, scale);
        ObjectUtils.setRotationLocalQuat(object, rotation);
        ObjectUtils.setPositionLocal(object, position);
    };
}();

export function setTransformLocalQuat(object, transform) {
    object.setTransformLocal(transform);
}

// RESET

// Position

export function resetPosition(object) {
    ObjectUtils.resetPositionWorld(object);
}

export let resetPositionWorld = function () {
    let zero = vec3_create();
    return function resetPositionWorld(object) {
        ObjectUtils.setPositionWorld(object, zero);
    };
}();

export let resetPositionLocal = function () {
    let zero = vec3_create();
    return function resetPositionLocal(object) {
        ObjectUtils.setPositionLocal(object, zero);
    };
}();

// Rotation

export function resetRotation(object) {
    ObjectUtils.resetRotationWorld(object);
}

export let resetRotationWorld = function () {
    let identity = quat_create();
    return function resetRotationWorld(object) {
        ObjectUtils.setRotationWorldQuat(object, identity);
    };
}();

export let resetRotationLocal = function () {
    let identity = quat_create();
    return function resetRotationLocal(object) {
        ObjectUtils.setRotationLocalQuat(object, identity);
    };
}();

// Scale

export function resetScale(object) {
    ObjectUtils.resetScaleWorld(object);
}

export let resetScaleWorld = function () {
    let one = vec3_create(1);
    return function resetScaleWorld(object) {
        ObjectUtils.setScaleWorld(object, one);
    };
}();

export let resetScaleLocal = function () {
    let one = vec3_create(1);
    return function resetScaleLocal(object) {
        ObjectUtils.setScaleLocal(object, one);
    };
}();

// Transform

export function resetTransform(object) {
    ObjectUtils.resetTransformWorld(object);
}

export function resetTransformWorld(object) {
    ObjectUtils.resetScaleWorld(object);
    ObjectUtils.resetRotationWorld(object);
    ObjectUtils.resetPositionWorld(object);
}

export function resetTransformLocal(object) {
    ObjectUtils.resetScaleLocal(object);
    ObjectUtils.resetRotationLocal(object);
    ObjectUtils.resetPositionLocal(object);
}

// TRANSFORMATIONS

// Translate

export function translate(object, translation) {
    ObjectUtils.translateWorld(object, translation);
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
    ObjectUtils.translateAxisWorld(object, amount, direction);
}

export let translateAxisWorld = function () {
    let translation = vec3_create();
    return function translateAxisWorld(object, amount, direction) {
        direction.vec3_scale(amount, translation);
        ObjectUtils.translateWorld(object, translation);
    };
}();

export let translateAxisLocal = function () {
    let translation = vec3_create();
    return function translateAxisLocal(object, amount, direction) {
        direction.vec3_scale(amount, translation);
        ObjectUtils.translateLocal(object, translation);
    };
}();

export let translateAxisObject = function () {
    let translation = vec3_create();
    return function translateAxisObject(object, amount, direction) {
        direction.vec3_scale(amount, translation);
        ObjectUtils.translateObject(object, translation);
    };
}();

// Rotate

export function rotate(object, rotation) {
    ObjectUtils.rotateWorld(object, rotation);
}

export function rotateDegrees(object, rotation) {
    ObjectUtils.rotateWorldDegrees(object, rotation);
}

export function rotateRadians(object, rotation) {
    ObjectUtils.rotateWorldRadians(object, rotation);
}

export function rotateMatrix(object, rotation) {
    ObjectUtils.rotateWorldMatrix(object, rotation);
}

export function rotateQuat(object, rotation) {
    ObjectUtils.rotateWorldQuat(object, rotation);
}

// Rotate World

export function rotateWorld(object, rotation) {
    ObjectUtils.rotateWorldDegrees(object, rotation);
}

export let rotateWorldDegrees = function () {
    let rotationQuat = quat_create();
    return function rotateWorldDegrees(object, rotation) {
        rotation.vec3_degreesToQuat(rotationQuat);
        ObjectUtils.rotateWorldQuat(object, rotationQuat);
    };
}();

export let rotateWorldRadians = function () {
    let degreesRotation = vec3_create();
    return function rotateWorldRadians(object, rotation) {
        degreesRotation = rotation.vec3_toDegrees(degreesRotation);
        ObjectUtils.rotateWorldDegrees(object, degreesRotation);
    };
}();

export let rotateWorldMatrix = function () {
    let rotationQuat = quat_create();
    return function rotateWorldMatrix(object, rotation) {
        rotation.mat3_toQuat(rotationQuat);
        rotationQuat.quat_normalize(rotationQuat);
        ObjectUtils.rotateWorldQuat(object, rotationQuat);
    };
}();

export let rotateWorldQuat = function () {
    let currentRotationQuat = quat_create();
    return function rotateWorldQuat(object, rotation) {
        ObjectUtils.getRotationWorldQuat(object, currentRotationQuat);
        rotation.quat_mul(currentRotationQuat, currentRotationQuat);
        currentRotationQuat.quat_normalize(currentRotationQuat);
        ObjectUtils.setRotationWorldQuat(object, currentRotationQuat);
    };
}();

// Rotate Local

export function rotateLocal(object, rotation) {
    ObjectUtils.rotateLocalDegrees(object, rotation);
}

export let rotateLocalDegrees = function () {
    let rotationQuat = quat_create();
    return function rotateLocalDegrees(object, rotation) {
        rotation.vec3_degreesToQuat(rotationQuat);
        ObjectUtils.rotateLocalQuat(object, rotationQuat);
    };
}();

export let rotateLocalRadians = function () {
    let degreesRotation = vec3_create();
    return function rotateLocalRadians(object, rotation) {
        degreesRotation = rotation.vec3_toDegrees(degreesRotation);
        ObjectUtils.rotateLocalDegrees(object, degreesRotation);
    };
}();

export let rotateLocalMatrix = function () {
    let rotationQuat = quat_create();
    return function rotateLocalMatrix(object, rotation) {
        rotation.mat3_toQuat(rotationQuat);
        rotationQuat.quat_normalize(rotationQuat);
        ObjectUtils.rotateLocalQuat(object, rotationQuat);
    };
}();

export let rotateLocalQuat = function () {
    let currentRotationQuat = quat_create();
    return function rotateLocalQuat(object, rotation) {
        ObjectUtils.getRotationLocalQuat(object, currentRotationQuat);
        rotation.quat_mul(currentRotationQuat, currentRotationQuat);
        currentRotationQuat.quat_normalize(currentRotationQuat);
        ObjectUtils.setRotationLocalQuat(object, currentRotationQuat);
    };
}();

// Rotate Object

export function rotateObject(object, rotation) {
    ObjectUtils.rotateObjectDegrees(object, rotation);
}

export let rotateObjectDegrees = function () {
    let rotationQuat = quat_create();
    return function rotateObjectDegrees(object, rotation) {
        rotation.vec3_degreesToQuat(rotationQuat);
        ObjectUtils.rotateObjectQuat(object, rotationQuat);
    };
}();

export let rotateObjectRadians = function () {
    let degreesRotation = vec3_create();
    return function rotateObjectRadians(object, rotation) {
        degreesRotation = rotation.vec3_toDegrees(degreesRotation);
        ObjectUtils.rotateObjectDegrees(object, degreesRotation);
    };
}();

export let rotateObjectMatrix = function () {
    let rotationQuat = quat_create();
    return function rotateObjectMatrix(object, rotation) {
        rotation.mat3_toQuat(rotationQuat);
        rotationQuat.quat_normalize(rotationQuat);
        ObjectUtils.rotateObjectQuat(object, rotationQuat);
    };
}();

export function rotateObjectQuat(object, rotation) {
    object.rotateObject(rotation);
}

// Rotate Axis

export function rotateAxis(object, angle, axis) {
    ObjectUtils.rotateAxisWorld(object, angle, axis);
}

export function rotateAxisDegrees(object, angle, axis) {
    ObjectUtils.rotateAxisWorldDegrees(object, angle, axis);
}

export function rotateAxisRadians(object, angle, axis) {
    ObjectUtils.rotateAxisWorldRadians(object, angle, axis);
}

// Rotate Axis World

export function rotateAxisWorld(object, angle, axis) {
    ObjectUtils.rotateAxisWorldDegrees(object, angle, axis);
}

export function rotateAxisWorldDegrees(object, angle, axis) {
    ObjectUtils.rotateAxisWorldRadians(object, MathUtils.toRadians(angle), axis);
}

export let rotateAxisWorldRadians = function () {
    let rotation = quat_create();
    return function rotateAxisWorldRadians(object, angle, axis) {
        QuatUtils.fromAxisRadians(angle, axis, rotation);
        ObjectUtils.rotateWorldQuat(object, rotation);
    };
}();

// Rotate Axis Local

export function rotateAxisLocal(object, angle, axis) {
    ObjectUtils.rotateAxisLocalDegrees(object, angle, axis);
}

export function rotateAxisLocalDegrees(object, angle, axis) {
    ObjectUtils.rotateAxisLocalRadians(object, MathUtils.toRadians(angle), axis);
}

export let rotateAxisLocalRadians = function () {
    let rotation = quat_create();
    return function rotateAxisLocalRadians(object, angle, axis) {
        QuatUtils.fromAxisRadians(angle, axis, rotation);
        ObjectUtils.rotateLocalQuat(object, rotation);
    };
}();

// Rotate Axis Object

export function rotateAxisObject(object, angle, axis) {
    ObjectUtils.rotateAxisObjectDegrees(object, angle, axis);
}

export function rotateAxisObjectDegrees(object, angle, axis) {
    ObjectUtils.rotateAxisObjectRadians(object, MathUtils.toRadians(angle), axis);
}

export let rotateAxisObjectRadians = function () {
    let rotation = quat_create();
    return function rotateAxisObjectRadians(object, angle, axis) {
        QuatUtils.fromAxisRadians(angle, axis, rotation);
        ObjectUtils.rotateObjectQuat(object, rotation);
    };
}();

// Rotate Around

export function rotateAround(object, rotation, origin) {
    ObjectUtils.rotateAroundWorld(object, rotation, origin);
}

export function rotateAroundDegrees(object, rotation, origin) {
    ObjectUtils.rotateAroundWorldDegrees(object, rotation, origin);
}

export function rotateAroundRadians(object, rotation, origin) {
    ObjectUtils.rotateAroundWorldRadians(object, rotation, origin);
}

export function rotateAroundMatrix(object, rotation, origin) {
    ObjectUtils.rotateAroundWorldMatrix(object, rotation, origin);
}

export function rotateAroundQuat(object, rotation, origin) {
    ObjectUtils.rotateAroundWorldQuat(object, rotation, origin);
}

// Rotate Around World

export function rotateAroundWorld(object, rotation, origin) {
    ObjectUtils.rotateAroundWorldDegrees(object, rotation, origin);
}

export let rotateAroundWorldDegrees = function () {
    let rotationQuat = quat_create();
    return function rotateAroundWorldDegrees(object, rotation, origin) {
        rotation.vec3_degreesToQuat(rotationQuat);
        ObjectUtils.rotateAroundWorldQuat(object, rotationQuat, origin);
    };
}();

export let rotateAroundWorldRadians = function () {
    let degreesRotation = vec3_create();
    return function rotateAroundWorldRadians(object, rotation, origin) {
        degreesRotation = rotation.vec3_toDegrees(degreesRotation);
        ObjectUtils.rotateAroundWorldDegrees(object, degreesRotation, origin);
    };
}();

export let rotateAroundWorldMatrix = function () {
    let rotationQuat = quat_create();
    return function rotateAroundWorldMatrix(object, rotation, origin) {
        rotation.mat3_toQuat(rotationQuat);
        rotationQuat.quat_normalize(rotationQuat);
        ObjectUtils.rotateAroundWorldQuat(object, rotationQuat, origin);
    };
}();

export let rotateAroundWorldQuat = function () {
    let axis = vec3_create();
    return function rotateAroundWorldQuat(object, rotation, origin) {
        rotation.quat_getAxis(axis);
        let angle = rotation.quat_getAngleRadians();
        ObjectUtils.rotateAroundAxisWorldRadians(object, angle, axis, origin);
    };
}();

// Rotate Around Local

export function rotateAroundLocal(object, rotation, origin) {
    ObjectUtils.rotateAroundLocalDegrees(object, rotation, origin);
}

export let rotateAroundLocalDegrees = function () {
    let rotationQuat = quat_create();
    return function rotateAroundLocalDegrees(object, rotation, origin) {
        rotation.vec3_degreesToQuat(rotationQuat);
        ObjectUtils.rotateAroundLocalQuat(object, rotationQuat, origin);
    };
}();

export let rotateAroundLocalRadians = function () {
    let degreesRotation = vec3_create();
    return function rotateAroundLocalRadians(object, rotation, origin) {
        degreesRotation = rotation.vec3_toDegrees(degreesRotation);
        ObjectUtils.rotateAroundLocalDegrees(object, degreesRotation, origin);
    };
}();

export let rotateAroundLocalMatrix = function () {
    let rotationQuat = quat_create();
    return function rotateAroundLocalMatrix(object, rotation, origin) {
        rotation.mat3_toQuat(rotationQuat);
        rotationQuat.quat_normalize(rotationQuat);
        ObjectUtils.rotateAroundLocalQuat(object, rotationQuat, origin);
    };
}();

export let rotateAroundLocalQuat = function () {
    let axis = vec3_create();
    return function rotateAroundLocalQuat(object, rotation, origin) {
        rotation.quat_getAxis(axis);
        let angle = rotation.quat_getAngleRadians();
        ObjectUtils.rotateAroundAxisLocalRadians(object, angle, axis, origin);
    };
}();

// Rotate Around Object

export function rotateAroundObject(object, rotation, origin) {
    ObjectUtils.rotateAroundObjectDegrees(object, rotation, origin);
}

export let rotateAroundObjectDegrees = function () {
    let rotationQuat = quat_create();
    return function rotateAroundObjectDegrees(object, rotation, origin) {
        rotation.vec3_degreesToQuat(rotationQuat);
        ObjectUtils.rotateAroundObjectQuat(object, rotationQuat, origin);
    };
}();

export let rotateAroundObjectRadians = function () {
    let degreesRotation = vec3_create();
    return function rotateAroundObjectRadians(object, rotation, origin) {
        degreesRotation = rotation.vec3_toDegrees(degreesRotation);
        ObjectUtils.rotateAroundObjectDegrees(object, degreesRotation, origin);
    };
}();

export let rotateAroundObjectMatrix = function () {
    let rotationQuat = quat_create();
    return function rotateAroundObjectMatrix(object, rotation, origin) {
        rotation.mat3_toQuat(rotationQuat);
        rotationQuat.quat_normalize(rotationQuat);
        ObjectUtils.rotateAroundObjectQuat(object, rotationQuat, origin);
    };
}();

export let rotateAroundObjectQuat = function () {
    let axis = vec3_create();
    return function rotateAroundObjectQuat(object, rotation, origin) {
        rotation.quat_getAxis(axis);
        let angle = rotation.quat_getAngleRadians();
        ObjectUtils.rotateAroundAxisObjectRadians(object, angle, axis, origin);
    };
}();

// Rotate Around Axis

export function rotateAroundAxis(object, angle, axis, origin) {
    ObjectUtils.rotateAroundAxisWorld(object, angle, axis, origin);
}

export function rotateAroundAxisDegrees(object, angle, axis, origin) {
    ObjectUtils.rotateAroundAxisWorldDegrees(object, angle, axis, origin);
}

export function rotateAroundAxisRadians(object, angle, axis, origin) {
    ObjectUtils.rotateAroundAxisWorldRadians(object, angle, axis, origin);
}

// Rotate Around Axis World

export function rotateAroundAxisWorld(object, angle, axis, origin) {
    ObjectUtils.rotateAroundAxisWorldDegrees(object, angle, axis, origin);
}

export function rotateAroundAxisWorldDegrees(object, angle, axis, origin) {
    ObjectUtils.rotateAroundAxisWorldRadians(object, MathUtils.toRadians(angle), axis, origin);
}

export let rotateAroundAxisWorldRadians = function () {
    let transformToRotate = quat2_create();
    let transformToRotateConjugate = quat2_create();
    let transformQuat = quat2_create();
    let defaultQuat = quat_create();
    return function rotateAroundAxisWorldRadians(object, angle, axis, origin) {
        transformToRotate.quat2_setPositionRotationQuat(origin, defaultQuat);
        ObjectUtils.getTransformWorldQuat(object, transformQuat);
        transformToRotate.quat2_conjugate(transformToRotateConjugate);
        transformToRotateConjugate.quat2_mul(transformQuat, transformQuat);
        transformToRotate.quat2_rotateAxisRadians(angle, axis, transformToRotate);
        transformToRotate.quat2_mul(transformQuat, transformQuat);
        ObjectUtils.setTransformWorldQuat(object, transformQuat);
    };
}();

// Rotate Around Axis Local

export function rotateAroundAxisLocal(object, angle, axis, origin) {
    ObjectUtils.rotateAroundAxisLocalDegrees(object, angle, axis, origin);
}

export function rotateAroundAxisLocalDegrees(object, angle, axis, origin) {
    ObjectUtils.rotateAroundAxisLocalRadians(object, MathUtils.toRadians(angle), axis, origin);
}

export let rotateAroundAxisLocalRadians = function () {
    let convertedPosition = vec3_create();
    let convertedAxis = vec3_create();
    return function rotateAroundAxisLocalRadians(object, angle, axis, origin) {
        ObjectUtils.convertPositionLocalToWorld(object, origin, convertedPosition);
        ObjectUtils.convertDirectionLocalToWorld(object, axis, convertedAxis);
        ObjectUtils.rotateAroundAxisWorldRadians(object, angle, convertedAxis, convertedPosition);
    };
}();

// Rotate Around Axis Object

export function rotateAroundAxisObject(object, angle, axis, origin) {
    ObjectUtils.rotateAroundAxisObjectDegrees(object, angle, axis, origin);
}

export function rotateAroundAxisObjectDegrees(object, angle, axis, origin) {
    ObjectUtils.rotateAroundAxisObjectRadians(object, MathUtils.toRadians(angle), axis, origin);
}

export let rotateAroundAxisObjectRadians = function () {
    let convertedPosition = vec3_create();
    let convertedAxis = vec3_create();
    return function rotateAroundAxisObjectRadians(object, angle, axis, origin) {
        ObjectUtils.convertPositionObjectToWorld(object, origin, convertedPosition);
        ObjectUtils.convertDirectionObjectToWorld(object, axis, convertedAxis);
        ObjectUtils.rotateAroundAxisWorldRadians(object, angle, convertedAxis, convertedPosition);
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
    ObjectUtils.lookAtWorld(object, position, up);
}

export let lookAtWorld = function () {
    let direction = vec3_create();
    return function lookAtWorld(object, position, up) {
        ObjectUtils.getPositionWorld(object, direction);
        position.vec3_sub(direction, direction);
        ObjectUtils.lookToWorld(object, direction, up);
    };
}();

export let lookAtLocal = function () {
    let direction = vec3_create();
    return function lookAtLocal(object, position, up) {
        ObjectUtils.getPositionLocal(object, direction);
        position.vec3_sub(direction, direction);
        ObjectUtils.lookToLocal(object, direction, up);
    };
}();

export function lookTo(object, direction, up) {
    ObjectUtils.lookToWorld(object, direction, up);
}

export let lookToWorld = function () {
    let internalUp = vec3_create();
    return function lookToWorld(object, direction, up = ObjectUtils.getUpWorld(object, internalUp)) {
        ObjectUtils.setForwardWorld(object, direction, up);
    };
}();

export let lookToLocal = function () {
    let internalUp = vec3_create();
    return function lookToLocal(object, direction, up = ObjectUtils.getUpLocal(object, internalUp)) {
        ObjectUtils.setForwardLocal(object, direction, up);
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
            ObjectUtils.getPositionWorld(object, position);
            ObjectUtils.getRotationWorldQuat(object, rotation);
            ObjectUtils.getScaleWorld(object, scale);
            object.parent = newParent;
            ObjectUtils.setScaleWorld(object, scale);
            ObjectUtils.setRotationWorldQuat(object, rotation);
            ObjectUtils.setPositionWorld(object, position);
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
        ObjectUtils.getTransformWorldMatrix(object, matrix);
        position.vec3_transformMat4(matrix, resultPosition);
        return resultPosition;
    };
}();

export let convertDirectionObjectToWorld = function () {
    let rotation = quat_create();
    return function convertDirectionObjectToWorld(object, direction, resultDirection = vec3_create()) {
        ObjectUtils.getRotationWorldQuat(object, rotation);
        direction.vec3_transformQuat(rotation, resultDirection);
        return resultDirection;
    };
}();

export let convertPositionWorldToObject = function () {
    let matrix = mat4_create();
    return function convertPositionWorldToObject(object, position, resultPosition = vec3_create()) {
        ObjectUtils.getTransformWorldMatrix(object, matrix);
        matrix.mat4_invert(matrix);
        position.vec3_transformMat4(matrix, resultPosition);
        return resultPosition;
    };
}();

export let convertDirectionWorldToObject = function () {
    let rotation = quat_create();
    return function convertDirectionWorldToObject(object, direction, resultDirection = vec3_create()) {
        ObjectUtils.getRotationWorldQuat(object, rotation);
        rotation.quat_conjugate(rotation);
        direction.vec3_transformQuat(rotation, resultDirection);
        return resultDirection;
    };
}();

// Convert Vector Local World

export function convertPositionLocalToWorld(object, position, resultPosition = vec3_create()) {
    if (ObjectUtils.getParent(object)) {
        ObjectUtils.getParent(object).pp_convertPositionObjectToWorld(position, resultPosition);
    } else {
        Vec3Utils.copy(position, resultPosition);
    }
    return resultPosition;
}

export function convertDirectionLocalToWorld(object, direction, resultDirection = vec3_create()) {
    if (ObjectUtils.getParent(object)) {
        ObjectUtils.getParent(object).pp_convertDirectionObjectToWorld(direction, resultDirection);
    } else {
        Vec3Utils.copy(direction, resultDirection);
    }
    return resultDirection;
}

export function convertPositionWorldToLocal(object, position, resultPosition = vec3_create()) {
    if (ObjectUtils.getParent(object)) {
        ObjectUtils.getParent(object).pp_convertPositionWorldToObject(position, resultPosition);
    } else {
        Vec3Utils.copy(position, resultPosition);
    }
    return resultPosition;
}

export function convertDirectionWorldToLocal(object, direction, resultDirection = vec3_create()) {
    if (ObjectUtils.getParent(object)) {
        ObjectUtils.getParent(object).pp_convertDirectionWorldToObject(direction, resultDirection);
    } else {
        Vec3Utils.copy(direction, resultDirection);
    }
    return resultDirection;
}

// Convert Vector Local Object

// I need to use the converson to world and then local also use the parent scale that changes the position in local space

export function convertPositionObjectToLocal(object, position, resultPosition = vec3_create()) {
    ObjectUtils.convertPositionObjectToWorld(object, position, resultPosition);
    ObjectUtils.convertPositionWorldToLocal(object, resultPosition, resultPosition);
    return resultPosition;
}

export function convertDirectionObjectToLocal(object, direction, resultDirection = vec3_create()) {
    ObjectUtils.convertDirectionObjectToWorld(object, direction, resultDirection);
    ObjectUtils.convertDirectionWorldToLocal(object, resultDirection, resultDirection);
    return resultDirection;
}

export function convertPositionLocalToObject(object, position, resultPosition = vec3_create()) {
    ObjectUtils.convertPositionLocalToWorld(object, position, resultPosition);
    ObjectUtils.convertPositionWorldToObject(object, resultPosition, resultPosition);
    return resultPosition;
}

export function convertDirectionLocalToObject(object, direction, resultDirection = vec3_create()) {
    ObjectUtils.convertDirectionLocalToWorld(object, direction, resultDirection);
    ObjectUtils.convertDirectionWorldToObject(object, resultDirection, resultDirection);
    return resultDirection;
}

// Convert Transform Object World

export function convertTransformObjectToWorld(object, transform, resultTransform) {
    return ObjectUtils.convertTransformObjectToWorldMatrix(object, transform, resultTransform);
}

export let convertTransformObjectToWorldMatrix = function () {
    let convertTransform = mat4_create();
    let position = vec3_create();
    let scale = vec3_create();
    let inverseScale = vec3_create();
    let one = vec3_create(1);
    return function convertTransformObjectToWorldMatrix(object, transform, resultTransform = mat4_create()) {
        ObjectUtils.getTransformWorldMatrix(object, convertTransform);
        if (ObjectUtils.hasUniformScaleWorld(object)) {
            convertTransform.mat4_mul(transform, resultTransform);
        } else {
            position.vec3_set(transform[12], transform[13], transform[14]);
            ObjectUtils.convertPositionObjectToWorld(object, position, position);

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
        ObjectUtils.getRotationWorldQuat(object, rotation);
        rotation.quat_mul(transform, rotation);
        transform.quat2_getPosition(position);
        ObjectUtils.convertPositionObjectToWorld(object, position, position);
        resultTransform.quat2_setPositionRotationQuat(position, rotation);
        return resultTransform;
    };
}();

export function convertTransformWorldToObject(object, transform, resultTransform) {
    return ObjectUtils.convertTransformWorldToObjectMatrix(object, transform, resultTransform);
}

export let convertTransformWorldToObjectMatrix = function () {
    let convertTransform = mat4_create();
    let position = vec3_create();
    let scale = vec3_create();
    let inverseScale = vec3_create();
    let one = vec3_create(1);
    return function convertTransformWorldToObjectMatrix(object, transform, resultTransform = mat4_create()) {
        ObjectUtils.getTransformWorldMatrix(object, convertTransform);
        if (ObjectUtils.hasUniformScaleWorld(object)) {
            convertTransform.mat4_invert(convertTransform);
            convertTransform.mat4_mul(transform, resultTransform);
        } else {
            position.vec3_set(transform[12], transform[13], transform[14]);
            ObjectUtils.convertPositionWorldToObject(object, position, position);

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
        ObjectUtils.getRotationWorldQuat(object, rotation);
        rotation.quat_conjugate(rotation);
        rotation.quat_mul(transform, rotation);
        transform.quat2_getPosition(position);
        ObjectUtils.convertPositionWorldToObject(object, position, position);
        resultTransform.quat2_setPositionRotationQuat(position, rotation);
        return resultTransform;
    };
}();

// Convert Transform Local World

export function convertTransformLocalToWorld(object, transform, resultTransform) {
    return ObjectUtils.convertTransformLocalToWorldMatrix(object, transform, resultTransform);
}

export function convertTransformLocalToWorldMatrix(object, transform, resultTransform = mat4_create()) {
    if (ObjectUtils.getParent(object)) {
        ObjectUtils.getParent(object).pp_convertTransformObjectToWorldMatrix(transform, resultTransform);
    } else {
        Mat4Utils.copy(transform, resultTransform);
    }
    return resultTransform;
}

export function convertTransformLocalToWorldQuat(object, transform, resultTransform = quat2_create()) {
    if (ObjectUtils.getParent(object)) {
        ObjectUtils.getParent(object).pp_convertTransformObjectToWorldQuat(transform, resultTransform);
    } else {
        Quat2Utils.copy(transform, resultTransform);
    }
    return resultTransform;
}

export function convertTransformWorldToLocal(object, transform, resultTransform) {
    return ObjectUtils.convertTransformWorldToLocalMatrix(object, transform, resultTransform);
}

export function convertTransformWorldToLocalMatrix(object, transform, resultTransform = mat4_create()) {
    if (ObjectUtils.getParent(object)) {
        ObjectUtils.getParent(object).pp_convertTransformWorldToObjectMatrix(transform, resultTransform);
    } else {
        Mat4Utils.copy(transform, resultTransform);
    }
    return resultTransform;
}

export function convertTransformWorldToLocalQuat(object, transform, resultTransform = quat2_create()) {
    if (ObjectUtils.getParent(object)) {
        ObjectUtils.getParent(object).pp_convertTransformWorldToObjectQuat(transform, resultTransform);
    } else {
        Quat2Utils.copy(transform, resultTransform);
    }
    return resultTransform;
}

// Convert Transform Object Local

// I need to use the converson to world and then local also use the parent scale that changes the position in local space

export function convertTransformObjectToLocal(object, transform, resultTransform) {
    return ObjectUtils.convertTransformObjectToLocalMatrix(object, transform, resultTransform);
}

export function convertTransformObjectToLocalMatrix(object, transform, resultTransform = mat4_create()) {
    ObjectUtils.convertTransformObjectToWorldMatrix(object, transform, resultTransform);
    ObjectUtils.convertTransformWorldToLocalMatrix(object, resultTransform, resultTransform);
    return resultTransform;
}

export function convertTransformObjectToLocalQuat(object, transform, resultTransform = quat2_create()) {
    ObjectUtils.convertTransformObjectToWorldQuat(object, transform, resultTransform);
    ObjectUtils.convertTransformWorldToLocalQuat(object, resultTransform, resultTransform);
    return resultTransform;
}

export function convertTransformLocalToObject(object, transform, resultTransform) {
    return ObjectUtils.convertTransformLocalToObjectMatrix(object, transform, resultTransform);
}

export function convertTransformLocalToObjectMatrix(object, transform, resultTransform = mat4_create()) {
    ObjectUtils.convertTransformLocalToWorldMatrix(object, transform, resultTransform);
    ObjectUtils.convertTransformWorldToObjectMatrix(object, resultTransform, resultTransform);
    return resultTransform;
}

export function convertTransformLocalToObjectQuat(object, transform, resultTransform = quat2_create()) {
    ObjectUtils.convertTransformLocalToWorldQuat(object, transform, resultTransform);
    ObjectUtils.convertTransformWorldToObjectQuat(object, resultTransform, resultTransform);
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
    return ObjectUtils.getComponentHierarchy(object, type, index);
}

export function getComponentSelf(object, type, index = 0) {
    return object.getComponent(type, index);
}

export function getComponentHierarchy(object, type, index = 0) {
    return ObjectUtils.getComponentHierarchyBreadth(object, type, index);
}

export function getComponentHierarchyBreadth(object, type, index = 0) {
    let objects = ObjectUtils.getHierarchyBreadth(object);
    return ObjectUtils.getComponentObjects(objects, type, index);
}

export function getComponentHierarchyDepth(object, type, index = 0) {
    let objects = ObjectUtils.getHierarchyDepth(object);
    return ObjectUtils.getComponentObjects(objects, type, index);
}

export function getComponentDescendants(object, type, index = 0) {
    return ObjectUtils.getComponentDescendantsBreadth(object, type, index);
}

export function getComponentDescendantsBreadth(object, type, index = 0) {
    let objects = ObjectUtils.getDescendantsBreadth(object);
    return ObjectUtils.getComponentObjects(objects, type, index);
}

export function getComponentDescendantsDepth(object, type, index = 0) {
    let objects = ObjectUtils.getDescendantsDepth(object);
    return ObjectUtils.getComponentObjects(objects, type, index);
}

export function getComponentChildren(object, type, index = 0) {
    let objects = ObjectUtils.getChildren(object);
    return ObjectUtils.getComponentObjects(objects, type, index);
}

export function getComponents(object, type) {
    return ObjectUtils.getComponentsHierarchy(object, type);
}

export function getComponentsSelf(object, type) {
    return object.getComponents(type);
}

export function getComponentsHierarchy(object, type) {
    return ObjectUtils.getComponentsHierarchyBreadth(object, type);
}

export function getComponentsHierarchyBreadth(object, type) {
    let objects = ObjectUtils.getHierarchyBreadth(object);
    return ObjectUtils.getComponentsObjects(objects, type);
}

export function getComponentsHierarchyDepth(object, type) {
    let objects = ObjectUtils.getHierarchyDepth(object);
    return ObjectUtils.getComponentsObjects(objects, type);
}

export function getComponentsDescendants(object, type) {
    return ObjectUtils.getComponentsDescendantsBreadth(object, type);
}

export function getComponentsDescendantsBreadth(object, type) {
    let objects = ObjectUtils.getDescendantsBreadth(object);
    return ObjectUtils.getComponentsObjects(objects, type);
}

export function getComponentsDescendantsDepth(object, type) {
    let objects = ObjectUtils.getDescendantsDepth(object);
    return ObjectUtils.getComponentsObjects(objects, type);
}

export function getComponentsChildren(object, type) {
    let objects = ObjectUtils.getChildren(object);
    return ObjectUtils.getComponentsObjects(objects, type);
}

// Active

export function setActive(object, active, applyToHierarchy = true) {
    if (applyToHierarchy) {
        ObjectUtils.setActiveHierarchy(object, active);
    } else {
        object.active = active;
    }
}

export function setActiveSelf(object, active) {
    ObjectUtils.setActive(object, active, false);
}

export function setActiveHierarchy(object, active) {
    ObjectUtils.setActiveHierarchyBreadth(object, active);
}

export function setActiveHierarchyBreadth(object, active) {
    let objects = ObjectUtils.getHierarchyBreadth(object);
    ObjectUtils.setActiveObjects(objects, active);
}

export function setActiveHierarchyDepth(object, active) {
    let objects = ObjectUtils.getHierarchyDepth(object);
    ObjectUtils.setActiveObjects(objects, active);
}

export function setActiveDescendants(object, active) {
    ObjectUtils.setActiveDescendantsBreadth(object, active);
}

export function setActiveDescendantsBreadth(object, active) {
    let objects = ObjectUtils.getDescendantsBreadth(object);
    ObjectUtils.setActiveObjects(objects, active);
}

export function setActiveDescendantsDepth(object, active) {
    let objects = ObjectUtils.getDescendantsDepth(object);
    ObjectUtils.setActiveObjects(objects, active);
}

export function setActiveChildren(object, active) {
    let objects = ObjectUtils.getChildren(object);
    ObjectUtils.setActiveObjects(objects, active);
}

// Uniform Scale

export function hasUniformScale(object) {
    return ObjectUtils.hasUniformScaleWorld(object);
}

export let hasUniformScaleWorld = function () {
    let scale = vec3_create();
    return function hasUniformScaleWorld(object) {
        ObjectUtils.getScaleWorld(object, scale);
        return Math.abs(scale[0] - scale[1]) < MathUtils.EPSILON && Math.abs(scale[1] - scale[2]) < MathUtils.EPSILON && Math.abs(scale[0] - scale[2]) < MathUtils.EPSILON;
    };
}();

export let hasUniformScaleLocal = function () {
    let scale = vec3_create();
    return function hasUniformScaleLocal(object) {
        ObjectUtils.getScaleLocal(object, scale);
        return Math.abs(scale[0] - scale[1]) < MathUtils.EPSILON && Math.abs(scale[1] - scale[2]) < MathUtils.EPSILON && Math.abs(scale[0] - scale[2]) < MathUtils.EPSILON;
    };
}();

// Clone

export let clone = function () {
    let scale = vec3_create();
    let transformQuat = quat2_create();
    return function clone(object, cloneParams = new CloneParams()) {
        let clonedObject = null;

        if (ObjectUtils.isCloneable(object, cloneParams)) {
            let objectsToCloneData = [];
            objectsToCloneData.push([ObjectUtils.getParent(object), object]);

            // Create the object hierarchy
            let objectsToCloneComponentsData = [];
            while (objectsToCloneData.length > 0) {
                let cloneData = objectsToCloneData.shift();
                let parent = cloneData[0];
                let objectToClone = cloneData[1];

                let currentClonedObject = (parent != null) ? ObjectUtils.addObject(parent,) : Globals.getScene(ObjectUtils.getEngine(object)).pp_addObject();
                ObjectUtils.setName(currentClonedObject, ObjectUtils.getName(objectToClone));

                ObjectUtils.setScaleLocal(currentClonedObject, ObjectUtils.getScaleLocal(objectToClone, scale));
                ObjectUtils.setTransformLocalQuat(currentClonedObject, ObjectUtils.getTransformLocalQuat(objectToClone, transformQuat));

                if (!cloneParams.myIgnoreComponents) {
                    objectsToCloneComponentsData.push([objectToClone, currentClonedObject]);
                }

                if (!cloneParams.myIgnoreChildren) {
                    for (let child of ObjectUtils.getChildren(objectToClone)) {
                        let cloneChild = false;
                        if (cloneParams.myChildrenToInclude.length > 0) {
                            cloneChild = cloneParams.myChildrenToInclude.find(childToInclude => ObjectUtils.equals(childToInclude, child)) != null;
                        } else {
                            cloneChild = cloneParams.myChildrenToIgnore.find(childToIgnore => ObjectUtils.equals(childToIgnore, child)) == null;
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

                let components = ObjectUtils.getComponentsSelf(objectToClone);
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
                    clonedComponent = ObjectUtils.addComponent(currentClonedObject, componentToClone.type, componentToClone);
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

        let components = ObjectUtils.getComponentsSelf(objectToClone);
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
            for (let child of ObjectUtils.getChildren(objectToClone)) {
                let cloneChild = false;
                if (cloneParams.myChildrenToInclude.length > 0) {
                    cloneChild = cloneParams.myChildrenToInclude.find(childToInclude => ObjectUtils.equals(childToInclude, child)) != null;
                } else {
                    cloneChild = cloneParams.myChildrenToIgnore.find(childToInclude => ObjectUtils.equals(childToInclude, child)) == null;
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
    return ObjectUtils.toStringCompact(object);
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

        let components = ObjectUtils.getComponentsSelf(object);
        let children = ObjectUtils.getChildren(object);
        let name = ObjectUtils.getName(object);

        if (components.length > 0 || children.length > 0 || name.length > 0) {
            objectString = objectString.concat(tab, idLabel, ObjectUtils.getID(object), separator, newLine);
        } else {
            objectString = objectString.concat(tab, idLabel, ObjectUtils.getID(object), newLine);
        }

        if (name.length > 0) {
            if (components.length > 0 || children.length > 0) {
                objectString = objectString.concat(tab, nameLabel, ObjectUtils.getName(object), separator, newLine);
            } else {
                objectString = objectString.concat(tab, nameLabel, ObjectUtils.getName(object), newLine);
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

                let childString = ObjectUtils.toStringExtended(child,);
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

        let name = ObjectUtils.getName(object);
        if (name.length > 0) {
            objectString = objectString.concat(nameLabel, name);
        } else {
            objectString = objectString.concat(nameLabel, emptyName);
        }

        let components = ObjectUtils.getComponentsSelf(object);
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

        let children = ObjectUtils.getChildren(object);
        if (children.length > 0) {
            objectString = objectString.concat(newLine);
            for (let i = 0; i < children.length; i++) {
                let child = children[i];

                let childString = ObjectUtils.toStringCompact(child,);
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
    return ObjectUtils.getObjectByNameHierarchy(object, name, index);
}

export function getObjectByNameHierarchy(object, name, index = 0) {
    return ObjectUtils.getObjectByNameHierarchyBreadth(object, name, index);
}

export function getObjectByNameHierarchyBreadth(object, name, index = 0) {
    let objects = ObjectUtils.getHierarchyBreadth(object);
    return ObjectUtils.getObjectByNameObjects(objects, name, index);
}

export function getObjectByNameHierarchyDepth(object, name, index = 0) {
    let objects = ObjectUtils.getHierarchyDepth(object);
    return ObjectUtils.getObjectByNameObjects(objects, name, index);
}

export function getObjectByNameDescendants(object, name, index = 0) {
    return ObjectUtils.getObjectByNameDescendantsBreadth(object, name, index);
}

export function getObjectByNameDescendantsBreadth(object, name, index = 0) {
    let objects = ObjectUtils.getDescendantsBreadth(object);
    return ObjectUtils.getObjectByNameObjects(objects, name, index);
}

export function getObjectByNameDescendantsDepth(object, name, index = 0) {
    let objects = ObjectUtils.getDescendantsDepth(object);
    return ObjectUtils.getObjectByNameObjects(objects, name, index);
}

export function getObjectByNameChildren(object, name, index = 0) {
    let objects = ObjectUtils.getChildren(object);
    return ObjectUtils.getObjectByNameObjects(objects, name, index);
}

export function getObjectsByName(object, name) {
    return ObjectUtils.getObjectsByNameHierarchy(object, name);
}

export function getObjectsByNameHierarchy(object, name) {
    return ObjectUtils.getObjectsByNameHierarchyBreadth(object, name);
}

export function getObjectsByNameHierarchyBreadth(object, name) {
    let objects = ObjectUtils.getHierarchyBreadth(object);
    return ObjectUtils.getObjectsByNameObjects(objects, name);
}

export function getObjectsByNameHierarchyDepth(object, name) {
    let objects = ObjectUtils.getHierarchyDepth(object);
    return ObjectUtils.getObjectsByNameObjects(objects, name);
}

export function getObjectsByNameDescendants(object, name) {
    return ObjectUtils.getObjectsByNameDescendantsBreadth(object, name);
}

export function getObjectsByNameDescendantsBreadth(object, name) {
    let objects = ObjectUtils.getDescendantsBreadth(object);
    return ObjectUtils.getObjectsByNameObjects(objects, name);
}

export function getObjectsByNameDescendantsDepth(object, name) {
    let objects = ObjectUtils.getDescendantsDepth(object);
    return ObjectUtils.getObjectsByNameObjects(objects, name);
}

export function getObjectsByNameChildren(object, name) {
    let objects = ObjectUtils.getChildren(object);
    return ObjectUtils.getObjectsByNameObjects(objects, name);
}

// Get Object By ID

export function getObjectByID(object, id) {
    return ObjectUtils.getObjectByIDHierarchy(object, id);
}

export function getObjectByIDHierarchy(object, id) {
    return ObjectUtils.getObjectByIDHierarchyBreadth(object, id);
}

export function getObjectByIDHierarchyBreadth(object, id) {
    let objects = ObjectUtils.getHierarchyBreadth(object);
    return ObjectUtils.getObjectByIDObjects(objects, id);
}

export function getObjectByIDHierarchyDepth(object, id) {
    let objects = ObjectUtils.getHierarchyDepth(object);
    return ObjectUtils.getObjectByIDObjects(objects, id);
}

export function getObjectByIDDescendants(object, id) {
    return ObjectUtils.getObjectByIDDescendantsBreadth(object, id);
}

export function getObjectByIDDescendantsBreadth(object, id) {
    let objects = ObjectUtils.getDescendantsBreadth(object);
    return ObjectUtils.getObjectByIDObjects(objects, id);
}

export function getObjectByIDDescendantsDepth(object, id) {
    let objects = ObjectUtils.getDescendantsDepth(object);
    return ObjectUtils.getObjectByIDObjects(objects, id);
}

export function getObjectByIDChildren(object, id) {
    let objects = ObjectUtils.getChildren(object);
    return ObjectUtils.getObjectByIDObjects(objects, id);
}

// Get Hierarchy

export function getHierarchy(object) {
    return ObjectUtils.getHierarchyBreadth(object);
}

export function getHierarchyBreadth(object) {
    let hierarchy = ObjectUtils.getDescendantsBreadth(object);

    hierarchy.unshift(object);

    return hierarchy;
}

export function getHierarchyDepth(object) {
    let hierarchy = ObjectUtils.getDescendantsDepth(object);

    hierarchy.unshift(object);

    return hierarchy;
}

export function getDescendants(object) {
    return ObjectUtils.getDescendantsBreadth(object);
}

export function getDescendantsBreadth(object) {
    let descendants = [];

    let descendantsQueue = ObjectUtils.getChildren(object);

    while (descendantsQueue.length > 0) {
        let descendant = descendantsQueue.shift();
        descendants.push(descendant);
        for (let child of ObjectUtils.getChildren(descendant,)) {
            descendantsQueue.push(child);
        }
    }

    return descendants;
}

export function getDescendantsDepth(object) {
    let descendants = [];

    let children = ObjectUtils.getChildren(object);

    for (let child of children) {
        descendants.push(child);

        let childDescendants = ObjectUtils.getDescendantsDepth(child,);
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
    return Globals.getScene(ObjectUtils.getEngine(object)).addObject(object);
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
    ObjectUtils.reserveObjectsHierarchy(object, count);
}

export function reserveObjectsSelf(object, count) {
    let componentsAmountMap = ObjectUtils.getComponentsAmountMapSelf(object);
    _reserveObjects(count, componentsAmountMap, Globals.getScene(ObjectUtils.getEngine(object)));
}

export function reserveObjectsHierarchy(object, count) {
    let componentsAmountMap = ObjectUtils.getComponentsAmountMapHierarchy(object);
    _reserveObjects(count, componentsAmountMap, Globals.getScene(ObjectUtils.getEngine(object)));
}

export function reserveObjectsDescendants(object, count) {
    let componentsAmountMap = ObjectUtils.getComponentsAmountMapDescendants(object);
    _reserveObjects(count, componentsAmountMap, Globals.getScene(ObjectUtils.getEngine(object)));
}

export function reserveObjectsChildren(object, count) {
    let componentsAmountMap = ObjectUtils.getComponentsAmountMapChildren(object);
    _reserveObjects(count, componentsAmountMap, Globals.getScene(ObjectUtils.getEngine(object)));
}

export function getComponentsAmountMap(object, amountMap = new Map()) {
    return ObjectUtils.getComponentsAmountMapHierarchy(object, amountMap);
}

export function getComponentsAmountMapSelf(object, amountMap = new Map()) {
    let objectsAmount = amountMap.get("object");
    if (objectsAmount == null) {
        objectsAmount = 0;
    }
    objectsAmount += 1;
    amountMap.set("object", objectsAmount);

    let components = ObjectUtils.getComponentsSelf(object);
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
    let hierarchy = ObjectUtils.getHierarchy(object);

    for (let hierarchyObject of hierarchy) {
        ObjectUtils.getComponentsAmountMapSelf(hierarchyObject, amountMap);
    }

    return amountMap;
}

export function getComponentsAmountMapDescendants(object, amountMap = new Map()) {
    let descendants = ObjectUtils.getDescendants(object);

    for (let descendant of descendants) {
        ObjectUtils.getComponentsAmountMapSelf(descendant, amountMap);
    }

    return amountMap;
}

export function getComponentsAmountMapChildren(object, amountMap = new Map()) {
    let children = ObjectUtils.getChildren(object);

    for (let child of children) {
        ObjectUtils.getComponentsAmountMapSelf(child, amountMap);
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
        if (ObjectUtils.getName(currentObject) == name) {
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
        if (ObjectUtils.getName(currentObject) == name) {
            objectsFound.push(currentObject);
        }
    }

    return objectsFound;
}

export function getObjectByIDObjects(objects, id, index = 0) {
    let objectFound = null;

    let currentIndex = index;
    for (let currentObject of objects) {
        if (ObjectUtils.getID(currentObject) == id) {
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
        if (ObjectUtils.getID(currentObject) == id) {
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