import { quat2 as gl_quat2, mat4 as gl_mat4 } from "gl-matrix";
import { EasingFunction } from "./math_utils";
import { mat4_create, quat_create, vec3_create } from "../../../plugin/js/extensions/array_extension";
import { create as quat_utils_create } from "./quat_utils";
import { create as vec3_utils_create } from "./vec3_utils";
import { create as mat3_utils_create } from "./mat3_utils";

// glMatrix Bridge

export function create(x1, y1, z1, w1, x2, y2, z2, w2) {
    let out = gl_quat2.create();
    if (x1 !== undefined) {
        set(out, x1, y1, z1, w1, x2, y2, z2, w2);
    }
    return out;
}

export function set(quat, x1, y1, z1, w1, x2, y2, z2, w2) {
    if (y1 === undefined) {
        gl_quat2.set(quat, x1, x1, x1, x1, x1, x1, x1, x1);
    } else {
        gl_quat2.set(quat, x1, y1, z1, w1, x2, y2, z2, w2);
    }

    return quat;
}

export function normalize(quat, out = create()) {
    gl_quat2.normalize(out, quat);
    return out;
}

export function invert(quat, out = create()) {
    gl_quat2.invert(out, quat);
    return out;
}

export function conjugate(quat, out = create()) {
    gl_quat2.conjugate(out, quat);
    return out;
}

export function copy(from, to) {
    gl_quat2.copy(to, from);
    return to;
}

export function identity(quat) {
    gl_quat2.identity(quat);
    return quat;
}

export function getPosition(quat, out = vec3_create()) {
    gl_quat2.getTranslation(out, quat);
    return out;
}

export function getRotation(quat, out) {
    return getRotationDegrees(quat, out);
}

export let getRotationDegrees = function () {
    let rotationQuat = quat_utils_create();
    return function getRotationDegrees(quat, out = vec3_create()) {
        getRotationQuat(quat, rotationQuat).quat_toDegrees(out);
        return out;
    };
}();

export let getRotationRadians = function () {
    let rotationQuat = quat_utils_create();
    return function getRotationRadians(quat, out = vec3_create()) {
        getRotationQuat(quat, rotationQuat).quat_toRadians(out);
        return out;
    };
}();

export function getRotationQuat(quat, out = quat_create()) {
    out.quat_copy(quat);
    return out;
}

export let setPosition = function () {
    let rotationQuat = quat_utils_create();
    return function setPosition(quat, position) {
        getRotationQuat(quat, rotationQuat);
        setPositionRotationQuat(quat, position, rotationQuat);
        return quat;
    };
}();

export function setRotation(quat, rotation) {
    return setRotationDegrees(quat, rotation);
}

export let setRotationDegrees = function () {
    let position = vec3_utils_create();
    return function setRotationDegrees(quat, rotation) {
        getPosition(quat, position);
        setPositionRotationDegrees(quat, position, rotation);
        return quat;
    };
}();

export let setRotationRadians = function () {
    let position = vec3_utils_create();
    return function setRotationRadians(quat, rotation) {
        getPosition(quat, position);
        setPositionRotationRadians(quat, position, rotation);
        return quat;
    };
}();

export let setRotationQuat = function () {
    let position = vec3_utils_create();
    return function setRotationQuat(quat, rotation) {
        getPosition(quat, position);
        setPositionRotationQuat(quat, position, rotation);
        return quat;
    };
}();

export function setPositionRotation(quat, position, rotation) {
    return setPositionRotationDegrees(quat, position, rotation);
}

export let setPositionRotationDegrees = function () {
    let rotationQuat = quat_utils_create();
    return function setPositionRotationDegrees(quat, position, rotation) {
        rotation.vec3_degreesToQuat(rotationQuat);
        setPositionRotationQuat(quat, position, rotationQuat);

        return quat;
    };
}();

export let setPositionRotationRadians = function () {
    let rotationQuat = quat_utils_create();
    return function setPositionRotationRadians(quat, position, rotation) {
        rotation.vec3_radiansToQuat(rotationQuat);
        setPositionRotationQuat(quat, position, rotationQuat);
        return quat;
    };
}();

export function setPositionRotationQuat(quat, position, rotation) {
    gl_quat2.fromRotationTranslation(quat, rotation, position);
    return quat;
}

// New Functions

export function isNormalized(quat, epsilon = Math.PP_EPSILON) {
    return Math.abs(lengthSquared(quat,) - 1) < epsilon;
}

export function length(quat) {
    return gl_quat2.length(quat);
}

export function lengthSquared(quat) {
    return gl_quat2.squaredLength(quat);
}

export function mul(first, second, out = create()) {
    gl_quat2.mul(out, first, second);
    return out;
}

export function getAxes(quat, out = [vec3_create(), vec3_create(), vec3_create()]) {
    getLeft(quat, out[0]);
    getUp(quat, out[1]);
    getForward(quat, out[2]);
    return out;
}

export let getForward = function () {
    let rotationMatrix = mat3_utils_create();
    return function getForward(quat, out = vec3_create()) {
        quat.quat_toMatrix(rotationMatrix);

        out.vec3_set(rotationMatrix[6], rotationMatrix[7], rotationMatrix[8]);
        out.vec3_normalize(out);

        return out;
    };
}();

export function getBackward(quat, out) {
    getForward(quat, out);
    out.vec3_negate(out);
    return out;
}

export let getLeft = function () {
    let rotationMatrix = mat3_utils_create();
    return function getLeft(quat, out = vec3_create()) {
        quat.quat_toMatrix(rotationMatrix);

        out.vec3_set(rotationMatrix[0], rotationMatrix[1], rotationMatrix[2]);
        out.vec3_normalize(out);

        return out;
    };
}();

export function getRight(quat, out) {
    getLeft(quat, out);
    out.vec3_negate(out);
    return out;
}

export let getUp = function () {
    let rotationMatrix = mat3_utils_create();
    return function getUp(quat, out = vec3_create()) {
        quat.quat_toMatrix(rotationMatrix);

        out.vec3_set(rotationMatrix[3], rotationMatrix[4], rotationMatrix[5]);
        out.vec3_normalize(out);

        return out;
    };
}();

export function getDown(quat, out) {
    getUp(quat, out);
    out.vec3_negate(out);
    return out;
}

export function toWorld(quat, parentTransformQuat, out = create()) {
    mul(parentTransformQuat, quat, out);
    return out;
}

export let toLocal = function () {
    let invertQuat = create();
    return function toLocal(quat, parentTransformQuat, out = create()) {
        conjugate(parentTransformQuat, invertQuat);
        mul(invertQuat, quat, out);
        return out;
    };
}();

export function rotateAxis(quat, angle, axis, out) {
    return rotateAxisDegrees(quat, angle, axis, out);
}

export function rotateAxisDegrees(quat, angle, axis, out) {
    return rotateAxisRadians(quat, Math.pp_toRadians(angle), axis, out);
}

export let rotateAxisRadians = function () {
    let rotationQuat = quat_utils_create();
    return function rotateAxisRadians(quat, angle, axis, out) {
        getRotationQuat(quat, rotationQuat);
        rotationQuat.quat_rotateAxisRadians(angle, axis, rotationQuat);
        copy(quat, out);
        setRotationQuat(out, rotationQuat);
        return out;
    };
}();

export function toMatrix(quat, out = mat4_create()) {
    gl_mat4.fromQuat2(out, quat);
    return out;
}

export function fromMatrix(matrix, out = create()) {
    matrix.mat4_toQuat(out);
    return out;
}

export function lerp(from, to, interpolationValue, out = create()) {
    if (interpolationValue <= 0) {
        copy(from, out);
        return out;
    } else if (interpolationValue >= 1) {
        copy(to, out);
        return out;
    }

    gl_quat2.lerp(out, from, to, interpolationValue);
    return out;
}

export function interpolate(from, to, interpolationValue, easingFunction = EasingFunction.linear, out = create()) {
    let lerpValue = easingFunction(interpolationValue);
    return lerp(from, to, lerpValue, out);
}

export let Quat2Utils = {
    create,
    set,
    create,
    set,
    set,
    normalize,
    invert,
    conjugate,
    copy,
    identity,
    getPosition,
    getRotation,
    getRotationDegrees,
    getRotationRadians,
    getRotationQuat,
    setPosition,
    setRotation,
    setRotationDegrees,
    setRotationRadians,
    setRotationQuat,
    setPositionRotation,
    setPositionRotationDegrees,
    setPositionRotationRadians,
    setPositionRotationQuat,
    isNormalized,
    length,
    lengthSquared,
    mul,
    getAxes,
    getForward,
    getBackward,
    getLeft,
    getRight,
    getUp,
    getDown,
    toWorld,
    toLocal,
    rotateAxis,
    rotateAxisDegrees,
    rotateAxisRadians,
    toMatrix,
    fromMatrix,
    lerp,
    interpolate
};