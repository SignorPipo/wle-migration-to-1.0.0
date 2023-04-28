import { mat3, quat } from "gl-matrix";
import { quat_create, vec3_create } from "../../../plugin/js/extensions/array_extension";

// glMatrix Bridge

export function create(
    m00, m01, m02,
    m10, m11, m12,
    m20, m21, m22) {
    let out = mat3.create();

    if (m00 !== undefined) {
        set(out,
            m00, m01, m02,
            m10, m11, m12,
            m20, m21, m22);
    }

    return out;
}

export function set(
    matrix,
    m00, m01, m02,
    m10, m11, m12,
    m20, m21, m22) {
    if (m01 === undefined) {
        mat3.set(matrix,
            m00, m00, m00,
            m00, m00, m00,
            m00, m00, m00);
    } else {
        mat3.set(matrix,
            m00, m01, m02,
            m10, m11, m12,
            m20, m21, m22);
    }
    return matrix;
}

// New Functions

export let toDegrees = function () {
    let quat = quat_create();
    return function toDegrees(matrix, out = vec3_create()) {
        toQuat(matrix, quat);
        quat.quat_toDegrees(out);
        return out;
    };
}();

export let toRadians = function () {
    let quat = quat_create();
    return function toRadians(matrix, out = vec3_create()) {
        toQuat(matrix, quat);
        quat.quat_toRadians(out);
        return out;
    };
}();

export function toQuat(matrix, out = quat_create()) {
    quat.fromMat3(out, matrix);
    return out;
}

export function fromAxes(matrix, leftAxis, upAxis, forwardAxis) {
    set(matrix,
        leftAxis[0], leftAxis[1], leftAxis[2],
        upAxis[0], upAxis[1], upAxis[2],
        forwardAxis[0], forwardAxis[1], forwardAxis[2]);
    return matrix;
}

export let Mat3Utils = {
    create,
    set,
    toDegrees,
    toRadians,
    toQuat,
    fromAxes
};