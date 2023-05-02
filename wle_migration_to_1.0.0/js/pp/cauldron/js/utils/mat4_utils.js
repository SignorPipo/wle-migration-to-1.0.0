
import { mat4 } from "gl-matrix";
import { quat2_create, quat_create, vec3_create } from "../../../plugin/js/extensions/array_extension";
import { MathUtils } from "./math_utils";
import { set as vec3_utils_set } from "./vec3_utils";

// glMatrix Bridge

export function create(
    m00, m01, m02, m03,
    m10, m11, m12, m13,
    m20, m21, m22, m23,
    m30, m31, m32, m33) {
    let out = mat4.create();
    if (m00 !== undefined) {
        set(
            out,
            m00, m01, m02, m03,
            m10, m11, m12, m13,
            m20, m21, m22, m23,
            m30, m31, m32, m33);
    }
    return out;
}

export function set(matrix,
    m00, m01, m02, m03,
    m10, m11, m12, m13,
    m20, m21, m22, m23,
    m30, m31, m32, m33) {
    if (m01 === undefined) {
        mat4.set(matrix,
            m00, m00, m00, m00,
            m00, m00, m00, m00,
            m00, m00, m00, m00,
            m00, m00, m00, m00);
    } else {
        mat4.set(matrix,
            m00, m01, m02, m03,
            m10, m11, m12, m13,
            m20, m21, m22, m23,
            m30, m31, m32, m33);
    }
    return matrix;
}

export function copy(from, to) {
    mat4.copy(to, from);
    return to;
}

export function identity(matrix) {
    mat4.identity(matrix);
    return matrix;
}

export function invert(matrix, out = create()) {
    mat4.invert(out, matrix);
    return out;
}

export function mul(first, second, out = create()) {
    mat4.mul(out, first, second);
    return out;
}

export function scale(matrix, vector, out = create()) {
    mat4.scale(out, matrix, vector);
    return out;
}

export function clone(matrix, out = create()) {
    copy(matrix, out);
    return out;
}

export function getPosition(matrix, out = vec3_create()) {
    mat4.getTranslation(out, matrix);
    return out;
}

export function getRotation(matrix, out = vec3_create()) {
    return getRotationDegrees(matrix, out);
}

export let getRotationDegrees = function () {
    let quat = quat_create();
    return function getRotationDegrees(matrix, out = vec3_create()) {
        getRotationQuat(matrix, quat);
        quat.quat_toDegrees(out);
        return out;
    };
}();

export let getRotationRadians = function () {
    let quat = quat_create();
    return function getRotationRadians(matrix, out = vec3_create()) {
        getRotationQuat(matrix, quat);
        quat.quat_toRadians(out);
        return out;
    };
}();

export let getRotationQuat = function () {
    let tempScale = vec3_create();
    let transformMatrixNoScale = create();
    let inverseScale = vec3_create();
    let one = vec3_create();
    vec3_utils_set(one, 1, 1, 1);
    return function getRotationQuat(matrix, out = quat_create()) {
        getScale(matrix, tempScale);
        one.vec3_div(tempScale, inverseScale);
        scale(matrix, inverseScale, transformMatrixNoScale);
        mat4.getRotation(out, transformMatrixNoScale);
        out.quat_normalize(out);
        return out;
    };
}();

export function getScale(matrix, out = vec3_create()) {
    mat4.getScaling(out, matrix);
    return out;
}

// New Functions

export function setPosition(matrix, position) {
    matrix[12] = position[0];
    matrix[13] = position[1];
    matrix[14] = position[2];
    return matrix;
}

export function setRotation(matrix, rotation) {
    setRotationDegrees(matrix, rotation);
    return matrix;
}

export let setRotationDegrees = function () {
    let quat = quat_create();
    return function setRotationDegrees(matrix, rotation) {
        setRotationQuat(matrix, rotation.vec3_degreesToQuat(quat));
        return matrix;
    };
}();

export let setRotationRadians = function () {
    let vector = vec3_create();
    return function setRotationRadians(matrix, rotation) {
        setRotationDegrees(matrix, rotation.vec3_toDegrees(vector));
        return matrix;
    };
}();

export let setRotationQuat = function () {
    let position = vec3_create();
    let scale = vec3_create();
    return function setRotationQuat(matrix, rotation) {
        getPosition(matrix, position);
        getScale(matrix, scale);
        setPositionRotationQuatScale(matrix, position, rotation, scale);
        return matrix;
    };
}();

export let setScale = function () {
    let tempScale = vec3_create();
    return function setScale(matrix, scaleToSet) {
        getScale(matrix, tempScale);
        scaleToSet.vec3_div(tempScale, tempScale);
        scale(matrix, tempScale, matrix);
        return matrix;
    };
}();

export function setPositionRotationScale(matrix, position, rotation, scale) {
    setPositionRotationDegreesScale(matrix, position, rotation, scale);
    return matrix;
}

export let setPositionRotationDegreesScale = function () {
    let quat = quat_create();
    return function setPositionRotationDegreesScale(matrix, position, rotation, scale) {
        setPositionRotationQuatScale(matrix, position, rotation.vec3_degreesToQuat(quat), scale);
        return matrix;
    };
}();

export let setPositionRotationRadiansScale = function () {
    let vector = vec3_create();
    return function setPositionRotationRadiansScale(matrix, position, rotation, scale) {
        setPositionRotationDegreesScale(matrix, position, rotation.vec3_toDegrees(vector), scale);
        return matrix;
    };
}();

export function setPositionRotationQuatScale(matrix, position, rotation, scale) {
    mat4.fromRotationTranslationScale(matrix, rotation, position, scale);
    return matrix;
}

export function setPositionRotation(matrix, position, rotation) {
    setPositionRotationDegrees(matrix, position, rotation);
    return matrix;
}

export let setPositionRotationDegrees = function () {
    let quat = quat_create();
    return function setPositionRotationDegrees(matrix, position, rotation) {
        setPositionRotationQuat(matrix, position, rotation.vec3_degreesToQuat(quat));
        return matrix;
    };
}();

export let setPositionRotationRadians = function () {
    let vector = vec3_create();
    return function setPositionRotationRadians(matrix, position, rotation) {
        setPositionRotationDegrees(matrix, position, rotation.vec3_toDegrees(vector));
        return matrix;
    };
}();

export function setPositionRotationQuat(matrix, position, rotation) {
    mat4.fromRotationTranslation(matrix, rotation, position);
    return matrix;
}

export function getAxes(matrix, out = [vec3_create(), vec3_create(), vec3_create()]) {
    getLeft(matrix, out[0]);
    getUp(matrix, out[1]);
    getForward(matrix, out[2]);

    return out;
}

export function getForward(matrix, out = vec3_create()) {
    out.vec3_set(matrix[8], matrix[9], matrix[10]);
    out.vec3_normalize(out);
    return out;
}

export function getBackward(matrix, out) {
    out = getForward(matrix, out);
    out.vec3_negate(out);
    return out;
}

export function getLeft(matrix, out = vec3_create()) {
    out.vec3_set(matrix[0], matrix[1], matrix[2]);
    out.vec3_normalize(out);
    return out;
}

export function getRight(matrix, out) {
    out = getLeft(matrix, out);
    out.vec3_negate(out);
    return out;
}

export function getUp(matrix, out = vec3_create()) {
    out.vec3_set(matrix[4], matrix[5], matrix[6]);
    out.vec3_normalize(out);
    return out;
}

export function getDown(matrix, out) {
    out = getUp(matrix, out);
    out.vec3_negate(out);
    return out;
}

export let toWorld = function () {
    let convertTransform = create();
    let position = vec3_create();
    let tempScale = vec3_create();
    let inverseScale = vec3_create();
    let one = vec3_create();
    vec3_utils_set(one, 1, 1, 1);
    return function toWorld(matrix, parentTransformMatrix, out = create()) {
        if (hasUniformScale(parentTransformMatrix)) {
            mul(parentTransformMatrix, matrix, out);
        } else {
            position.vec3_set(matrix[12], matrix[13], matrix[14]);
            position.vec3_convertPositionToWorldMatrix(parentTransformMatrix, position);

            getScale(parentTransformMatrix, tempScale);
            one.vec3_div(tempScale, inverseScale);
            scale(parentTransformMatrix, inverseScale, convertTransform);

            mul(convertTransform, matrix, out);
            scale(out, tempScale, out);

            out[12] = position[0];
            out[13] = position[1];
            out[14] = position[2];
            out[15] = 1;
        }
        return out;
    };
}();

export let toLocal = function () {
    let convertTransform = create();
    let position = vec3_create();
    let tempScale = vec3_create();
    let inverseScale = vec3_create();
    let one = vec3_create();
    vec3_utils_set(one, 1, 1, 1);
    return function toLocal(matrix, parentTransformMatrix, out = create()) {
        if (hasUniformScale(parentTransformMatrix)) {
            invert(parentTransformMatrix, convertTransform);
            mul(convertTransform, matrix, out);
        } else {
            position.vec3_set(matrix[12], matrix[13], matrix[14]);
            position.vec3_convertPositionToLocalMatrix(parentTransformMatrix, position);

            getScale(parentTransformMatrix, tempScale);
            one.vec3_div(tempScale, inverseScale);
            scale(parentTransformMatrix, inverseScale, convertTransform);

            invert(convertTransform, convertTransform);
            mul(convertTransform, matrix, out);
            scale(out, inverseScale, out);

            out[12] = position[0];
            out[13] = position[1];
            out[14] = position[2];
            out[15] = 1;
        }
        return out;
    };
}();

export let hasUniformScale = function () {
    let scale = vec3_create();
    return function hasUniformScale(matrix) {
        getScale(matrix, scale);
        return Math.abs(scale[0] - scale[1]) < MathUtils.EPSILON && Math.abs(scale[1] - scale[2]) < MathUtils.EPSILON && Math.abs(scale[0] - scale[2]) < MathUtils.EPSILON;
    };
}();

export let toQuat = function () {
    let position = vec3_create();
    let rotation = quat_create();
    return function toQuat(matrix, out = quat2_create()) {
        getPosition(matrix, position);
        getRotationQuat(matrix, rotation);
        out.quat2_setPositionRotationQuat(position, rotation);
        return out;
    };
}();

export function fromQuat(quat, out = create()) {
    quat.quat2_toMatrix(out);
    return out;
}

export let Mat4Utils = {
    create,
    set,
    copy,
    identity,
    invert,
    mul,
    scale,
    clone,
    getPosition,
    getRotation,
    getRotationDegrees,
    getRotationRadians,
    getRotationQuat,
    getScale,
    setPosition,
    setRotation,
    setRotationDegrees,
    setRotationRadians,
    setRotationQuat,
    setScale,
    setPositionRotationScale,
    setPositionRotationDegreesScale,
    setPositionRotationRadiansScale,
    setPositionRotationQuatScale,
    setPositionRotation,
    setPositionRotationDegrees,
    setPositionRotationRadians,
    setPositionRotationQuat,
    getAxes,
    getForward,
    getBackward,
    getLeft,
    getRight,
    getUp,
    getDown,
    toWorld,
    toLocal,
    hasUniformScale,
    toQuat,
    fromQuat
};