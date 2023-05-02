import { vec3 } from "gl-matrix";
import { mat3_create, quat_create } from "../../../plugin/js/extensions/array_extension";
import { create as mat4_utils_create } from "./mat4_utils";
import { MathUtils } from "./math_utils";
import { create as quat_utils_create } from "./quat_utils";

// glMatrix Bridge

export function create(x, y, z) {
    let out = vec3.create();

    if (x !== undefined) {
        set(out, x, y, z);
    }

    return out;
}

export function set(vector, x, y, z) {
    if (y === undefined) {
        vec3.set(vector, x, x, x);
    } else {
        vec3.set(vector, x, y, z);
    }

    return vector;
}

export function normalize(vector, out = create()) {
    vec3.normalize(out, vector);
    return out;
}

export function copy(from, to) {
    vec3.copy(to, from);
    return to;
}

export function clone(vector, out = create()) {
    copy(vector, out);
    return out;
}

export function zero(vector) {
    vec3.zero(vector);
    return vector;
}

export function angle(first, second) {
    return angleDegrees(first, second);
}

export function angleDegrees(first, second) {
    return Math.pp_toDegrees(angleRadians(first, second));
}

export function angleRadians(first, second) {
    let firstX = first[0];
    let firstY = first[1];
    let firstZ = first[2];

    let secondX = second[0];
    let secondY = second[1];
    let secondZ = second[2];

    let firstLengthSquared = (firstX * firstX + firstY * firstY + firstZ * firstZ);
    let secondLengthSquared = (secondX * secondX + secondY * secondY + secondZ * secondZ);

    let lengthSquared = firstLengthSquared * secondLengthSquared;

    let angle = 0;
    if (lengthSquared > MathUtils.EPSILON_SQUARED) {
        let length = Math.sqrt(lengthSquared);

        let cos = dot(first, second) / length;
        angle = Math.acos(Math.pp_clamp(cos, -1, 1));
    }

    return angle;
}

export function equals(first, second, epsilon = 0) {
    let equals = first.length == second.length;

    if (equals) {
        equals &&= (Math.abs(first[0] - second[0]) <= epsilon);
        equals &&= (Math.abs(first[1] - second[1]) <= epsilon);
        equals &&= (Math.abs(first[2] - second[2]) <= epsilon);
    }

    return equals;
}

export function length(vector) {
    return vec3.length(vector);
}

export function lengthSquared(vector) {
    return vec3.squaredLength(vector);
}

export function distance(first, second) {
    return vec3.dist(first, second);
}

export function distanceSquared(first, second) {
    return vec3.squaredDistance(first, second);
}

export function add(first, second, out = create()) {
    vec3.add(out, first, second);
    return out;
}

export function sub(first, second, out = create()) {
    vec3.sub(out, first, second);
    return out;
}

export function mul(first, second, out = create()) {
    vec3.mul(out, first, second);
    return out;
}

export function div(first, second, out = create()) {
    vec3.div(out, first, second);
    return out;
}

export function scale(vector, value, out = create()) {
    vec3.scale(out, vector, value);
    return out;
}

export function dot(first, second) {
    return vec3.dot(first, second);
}

export function negate(vector, out = create()) {
    vec3.negate(out, vector);
    return out;
}

export function cross(first, second, out = create()) {
    vec3.cross(out, first, second);
    return out;
}

export function transformQuat(vector, quat, out = create()) {
    vec3.transformQuat(out, vector, quat);
    return out;
}

export function transformMat3(vector, mat3, out = create()) {
    vec3.transformMat3(out, vector, mat3);
    return out;
}

export function transformMat4(vector, mat4, out = create()) {
    vec3.transformMat4(out, vector, mat4);
    return out;
}

// New Functions

export function lengthSigned(vector, positiveDirection) {
    let signedLength = length(vector);
    if (!isConcordant(vector, positiveDirection)) {
        signedLength *= -1;
    }

    return signedLength;
}

export function angleSigned(first, second, upAxis) {
    return angleSignedDegrees(first, second, upAxis);
}

export function angleSignedDegrees(first, second, upAxis) {
    return Math.pp_toDegrees(angleSignedRadians(first, second, upAxis));
}

export let angleSignedRadians = function () {
    let crossAxis = create();
    return function angleSignedRadians(first, second, upAxis) {
        cross(first, second, crossAxis);
        let angle = angleRadians(first, second);
        if (!isConcordant(crossAxis, upAxis)) {
            angle = -angle;
        }

        return angle;
    };
}();

export function toRadians(vector, out = create()) {
    set(out, Math.pp_toRadians(vector[0]), Math.pp_toRadians(vector[1]), Math.pp_toRadians(vector[2]));
    return out;
}

export function toDegrees(vector, out = create()) {
    set(out, Math.pp_toDegrees(vector[0]), Math.pp_toDegrees(vector[1]), Math.pp_toDegrees(vector[2]));
    return out;
}

export function toQuat(vector, out) {
    return degreesToQuat(vector, out);
}

export function radiansToQuat(vector, out = quat_create()) {
    out.quat_fromRadians(vector);
    return out;
}

export function degreesToQuat(vector, out = quat_create()) {
    out.quat_fromDegrees(vector);
    return out;
}

export function isNormalized(vector, epsilon = MathUtils.EPSILON) {
    return Math.abs(lengthSquared(vector) - 1) < epsilon;
}

export function isZero(vector, epsilon = 0) {
    return lengthSquared(vector) <= (epsilon * epsilon);
}

export function componentAlongAxis(vector, axis, out = create()) {
    let componentAlongAxisLength = dot(vector, axis);

    copy(axis, out);
    scale(out, componentAlongAxisLength, out);
    return out;
}

export function valueAlongAxis(vector, axis) {
    let valueAlongAxis = dot(vector, axis);
    return valueAlongAxis;
}

export let removeComponentAlongAxis = function () {
    let componentAlong = create();
    return function removeComponentAlongAxis(vector, axis, out = create()) {
        componentAlongAxis(vector, axis, componentAlong);
        sub(vector, componentAlong, out);
        return out;
    };
}();

export let copyComponentAlongAxis = function () {
    let componentAlong = create();
    return function copyComponentAlongAxis(from, to, axis, out = create()) {
        removeComponentAlongAxis(to, axis, out);
        componentAlongAxis(from, axis, componentAlong);
        add(out, componentAlong, out);

        return out;
    };
}();

export function isConcordant(first, second) {
    return dot(first, second) >= 0;
}

export function isFartherAlongAxis(first, second, axis) {
    return valueAlongAxis(first, axis) > valueAlongAxis(second, axis);
}

export function isToTheRight(first, second, upAxis) {
    return signTo(first, second, upAxis) >= 0;
}

export let signTo = function () {
    let componentAlongThis = create();
    let componentAlongVector = create();
    return function signTo(first, second, upAxis, zeroSign = 1) {
        removeComponentAlongAxis(first, upAxis, componentAlongThis);
        removeComponentAlongAxis(second, upAxis, componentAlongVector);

        let angleSignedResult = angleSigned(first, second, upAxis);
        return angleSignedResult > 0 ? 1 : (angleSignedResult == 0 ? zeroSign : -1);
    };
}();

export function projectOnAxis(vector, axis, out = create()) {
    componentAlongAxis(vector, axis, out);
    return out;
}

// The result can easily be not 100% exact due to precision errors
export let projectOnAxisAlongAxis = function () {
    let up = create();

    let thisToAxis = create();

    let fixedProjectAlongAxis = create();
    return function projectOnAxisAlongAxis(vector, axis, projectAlongAxis, out = create()) {

        if (isOnAxis(vector, axis) || isOnAxis(projectAlongAxis, axis)) {
            copy(vector, out);
        } else {
            cross(projectAlongAxis, axis, up);
            normalize(up, up);

            removeComponentAlongAxis(vector, up, out);
            if (!isOnAxis(out, axis)) {
                projectOnAxis(out, axis, thisToAxis);
                sub(thisToAxis, out, thisToAxis);

                if (isConcordant(thisToAxis, projectAlongAxis)) {
                    copy(projectAlongAxis, fixedProjectAlongAxis);
                } else {
                    negate(projectAlongAxis, fixedProjectAlongAxis);
                }

                let angleWithAlongAxis = angleRadians(fixedProjectAlongAxis, thisToAxis);
                let lengthToRemove = length(thisToAxis,) / Math.cos(angleWithAlongAxis);

                normalize(fixedProjectAlongAxis, fixedProjectAlongAxis);
                scale(fixedProjectAlongAxis, lengthToRemove, fixedProjectAlongAxis);
                add(out, fixedProjectAlongAxis, out);

                projectOnAxis(out, axis, out); // Snap on the axis, due to float precision error
            }
        }

        return out;
    };
}();

export function projectOnPlane(vector, planeNormal, out = create()) {
    removeComponentAlongAxis(vector, planeNormal, out);
    return out;
}

// The result can easily be not 100% exact due to precision errors
export let projectOnPlaneAlongAxis = function () {
    let thisToPlane = create();

    let fixedProjectAlongAxis = create();
    return function projectOnPlaneAlongAxis(vector, planeNormal, projectAlongAxis, out = create()) {
        if (isOnPlane(vector, planeNormal) || isOnPlane(projectAlongAxis, planeNormal)) {
            copy(vector, out);
        } else {
            copy(vector, out);

            projectOnPlane(out, planeNormal, thisToPlane);
            sub(thisToPlane, out, thisToPlane);

            if (isConcordant(thisToPlane, projectAlongAxis)) {
                copy(projectAlongAxis, fixedProjectAlongAxis);
            } else {
                negate(projectAlongAxis, fixedProjectAlongAxis);
            }

            let angleWithAlongAxis = angleRadians(fixedProjectAlongAxis, thisToPlane);
            let lengthToRemove = length(thisToPlane,) / Math.cos(angleWithAlongAxis);

            normalize(fixedProjectAlongAxis, fixedProjectAlongAxis);
            scale(fixedProjectAlongAxis, lengthToRemove, fixedProjectAlongAxis);
            add(out, fixedProjectAlongAxis, out);

            projectOnPlane(out, planeNormal, out); // Snap on the axis, due to float precision error
        }

        return out;
    };
}();

export function isOnAxis(vector, axis) {
    let angleResult = angle(vector, axis);
    return Math.abs(angleResult) < MathUtils.EPSILON_DEGREES || Math.abs(angleResult - 180) < MathUtils.EPSILON_DEGREES;
}

export function isOnPlane(vector, planeNormal) {
    let angleResult = angle(vector, planeNormal);
    return Math.abs(angleResult - 90) < MathUtils.EPSILON_DEGREES;
}

export function rotate(vector, rotation, out) {
    return rotateDegrees(vector, rotation, out);
}

export let rotateDegrees = function () {
    let zero = create();
    return function rotateDegrees(vector, rotation, out) {
        return rotateAroundDegrees(vector, rotation, zero, out);
    };
}();

export let rotateRadians = function () {
    let zero = create();
    return function rotateRadians(vector, rotation, out) {
        return rotateAroundRadians(vector, rotation, zero, out);
    };
}();

export let rotateQuat = function () {
    let zero = create();
    return function rotateQuat(vector, rotation, out) {
        return rotateAroundQuat(vector, rotation, zero, out);
    };
}();

export function rotateAxis(vector, angle, axis, out) {
    return rotateAxisDegrees(vector, angle, axis, out);
}

export let rotateAxisDegrees = function () {
    let zero = create();
    return function rotateAxisDegrees(vector, angle, axis, out) {
        return rotateAroundAxisDegrees(vector, angle, axis, zero, out);
    };
}();

export let rotateAxisRadians = function () {
    let zero = create();
    return function rotateAxisRadians(vector, angle, axis, out) {
        return rotateAroundAxisRadians(vector, angle, axis, zero, out);
    };
}();

export function rotateAround(vector, rotation, origin, out) {
    return rotateAroundDegrees(vector, rotation, origin, out);
}

export let rotateAroundDegrees = function () {
    let quat = quat_utils_create();
    return function rotateAroundDegrees(vector, rotation, origin, out = create()) {
        degreesToQuat(rotation, quat);
        return rotateAroundQuat(vector, quat, origin, out);
    };
}();

export let rotateAroundRadians = function () {
    let quat = quat_utils_create();
    return function rotateAroundRadians(vector, rotation, origin, out = create()) {
        radiansToQuat(rotation, quat);
        return rotateAroundQuat(vector, quat, origin, out);
    };
}();

export function rotateAroundQuat(vector, rotation, origin, out = create()) {
    sub(vector, origin, out);
    transformQuat(out, rotation, out);
    add(out, origin, out);
    return out;
}

export function rotateAroundAxis(vector, angle, axis, origin, out) {
    return rotateAroundAxisDegrees(vector, angle, axis, origin, out);
}

export function rotateAroundAxisDegrees(vector, angle, axis, origin, out) {
    return rotateAroundAxisRadians(vector, Math.pp_toRadians(angle), axis, origin, out);
}

export let rotateAroundAxisRadians = function () {
    let quat = quat_utils_create();
    return function rotateAroundAxisRadians(vector, angle, axis, origin, out = create()) {
        quat.quat_fromAxisRadians(angle, axis);
        return rotateAroundQuat(vector, quat, origin, out);
    };
}();

export function convertPositionToWorld(vector, parentTransform, out) {
    return convertPositionToWorldMatrix(vector, parentTransform, out);
}

export function convertPositionToLocal(vector, parentTransform, out) {
    return convertPositionToLocalMatrix(vector, parentTransform, out);
}

export function convertPositionToWorldMatrix(vector, parentTransform, out = create()) {
    transformMat4(vector, parentTransform, out);
    return out;
}

export let convertPositionToLocalMatrix = function () {
    let inverse = mat4_utils_create();
    return function convertPositionToLocalMatrix(vector, parentTransform, out = create()) {
        parentTransform.mat4_invert(inverse);
        transformMat4(vector, inverse, out);
        return out;
    };
}();

export let convertPositionToWorldQuat = function () {
    let parentTransformMatrix = mat4_utils_create();
    let position = create();
    let rotation = quat_utils_create();
    let one = create();
    set(one, 1, 1, 1);
    return function convertPositionToWorldQuat(vector, parentTransform, out = create()) {
        parentTransform.quat2_getPosition(position);
        parentTransform.quat2_getRotationQuat(rotation);
        parentTransformMatrix.mat4_setPositionRotationQuatScale(position, rotation, one);
        return convertPositionToWorldMatrix(vector, parentTransformMatrix, out);
    };
}();

export let convertPositionToLocalQuat = function () {
    let parentTransformMatrix = mat4_utils_create();
    let position = create();
    let rotation = quat_utils_create();
    let one = create();
    set(one, 1, 1, 1);
    return function convertPositionToLocalQuat(vector, parentTransform, out = create()) {
        parentTransform.quat2_getPosition(position);
        parentTransform.quat2_getRotationQuat(rotation);
        parentTransformMatrix.mat4_setPositionRotationQuatScale(position, rotation, one);
        return convertPositionToLocalMatrix(vector, parentTransformMatrix, out);
    };
}();

export function convertDirectionToWorld(vector, parentTransform, out) {
    return convertDirectionToWorldMatrix(vector, parentTransform, out);
}

export function convertDirectionToLocal(vector, parentTransform, out) {
    return convertDirectionToLocalMatrix(vector, parentTransform, out);
}

export let convertDirectionToWorldMatrix = function () {
    let rotation = quat_utils_create();
    return function convertDirectionToWorldMatrix(vector, parentTransform, out = create()) {
        parentTransform.mat4_getRotationQuat(rotation);
        transformQuat(vector, rotation, out);
        return out;
    };
}();

export let convertDirectionToLocalMatrix = function () {
    let rotation = quat_utils_create();
    return function convertDirectionToLocalMatrix(vector, parentTransform, out = create()) {
        parentTransform.mat4_getRotationQuat(rotation);
        rotation.quat_conjugate(rotation);
        transformQuat(vector, rotation, out);
        return out;
    };
}();


export let convertDirectionToWorldQuat = function () {
    let rotation = quat_utils_create();
    return function convertDirectionToWorldQuat(vector, parentTransform, out = create()) {
        parentTransform.quat2_getRotationQuat(rotation);
        transformQuat(vector, rotation, out);
        return out;
    };
}();

export let convertDirectionToLocalQuat = function () {
    let rotation = quat_utils_create();
    return function convertDirectionToLocalQuat(vector, parentTransform, out = create()) {
        parentTransform.quat2_getRotationQuat(rotation);
        rotation.quat_conjugate(rotation);
        transformQuat(vector, rotation, out);
        return out;
    };
}();

export function log(vector, decimalPlaces = 4) {
    vector.vec_log(decimalPlaces);
}

export function error(vector, decimalPlaces = 4) {
    vector.vec_error(decimalPlaces);
}

export function warn(vector, decimalPlaces = 4) {
    vector.vec_warn(decimalPlaces);
}

export function addRotation(vector, rotation, out) {
    return degreesAddRotation(vector, rotation, out);
}

export function addRotationDegrees(vector, rotation, out) {
    return degreesAddRotationDegrees(vector, rotation, out);
}

export function addRotationRadians(vector, rotation, out) {
    return degreesAddRotationRadians(vector, rotation, out);
}

export function addRotationQuat(vector, rotation, out) {
    return degreesAddRotationQuat(vector, rotation, out);
}

export function degreesAddRotation(vector, rotation, out) {
    return degreesAddRotationDegrees(vector, rotation, out);
}

export let degreesAddRotationDegrees = function () {
    let quat = quat_utils_create();
    return function degreesAddRotationDegrees(vector, rotation, out = create()) {
        degreesToQuat(vector, quat);
        return quat.quat_addRotationDegrees(rotation, quat).quat_toDegrees(out);
    };
}();

export let degreesAddRotationRadians = function () {
    let quat = quat_utils_create();
    return function degreesAddRotationRadians(vector, rotation, out = create()) {
        degreesToQuat(vector, quat);
        return quat.quat_addRotationRadians(rotation, quat).quat_toDegrees(out);
    };
}();

export let degreesAddRotationQuat = function () {
    let quat = quat_utils_create();
    return function degreesAddRotationQuat(vector, rotation, out = create()) {
        degreesToQuat(vector, quat);
        return quat.quat_addRotationQuat(rotation, quat).quat_toDegrees(out);
    };
}();

export function radiansAddRotation(vector, rotation, out) {
    return radiansAddRotationDegrees(vector, rotation, out);
}

export let radiansAddRotationDegrees = function () {
    let quat = quat_utils_create();
    return function radiansAddRotationDegrees(vector, rotation, out = create()) {
        radiansToQuat(vector, quat);
        return quat.quat_addRotationDegrees(rotation, quat).quat_toRadians(out);
    };
}();

export let radiansAddRotationRadians = function () {
    let quat = quat_utils_create();
    return function radiansAddRotationRadians(vector, rotation, out = create()) {
        radiansToQuat(vector, quat);
        return quat.quat_addRotationRadians(rotation, quat).quat_toRadians(out);
    };
}();

export let radiansAddRotationQuat = function () {
    let quat = quat_utils_create();
    return function radiansAddRotationQuat(vector, rotation, out = create()) {
        radiansToQuat(vector, quat);
        return quat.quat_addRotationQuat(rotation, quat).quat_toRadians(out);
    };
}();

export function toMatrix(vector, out = mat3_create()) {
    return degreesToMatrix(vector, out);
}

export let degreesToMatrix = function () {
    let quat = quat_utils_create();
    return function degreesToMatrix(vector, out = mat3_create()) {
        degreesToQuat(vector, quat);
        return quat.quat_toMatrix(out);
    };
}();

export let radiansToMatrix = function () {
    let quat = quat_utils_create();
    return function radiansToMatrix(vector, out = mat3_create()) {
        radiansToQuat(vector, quat);
        return quat.quat_toMatrix(out);
    };
}();

export function rotationTo(vector, direction, out) {
    return rotationToDegrees(vector, direction, out);
}

export let rotationToDegrees = function () {
    let rotationQuat = quat_utils_create();
    return function rotationToDegrees(vector, direction, out = create()) {
        rotationToQuat(vector, direction, rotationQuat);
        rotationQuat.quat_toDegrees(out);
        return out;
    };
}();

export let rotationToRadians = function () {
    let rotationQuat = quat_utils_create();
    return function rotationToRadians(vector, direction, out = create()) {
        rotationToQuat(vector, direction, rotationQuat);
        rotationQuat.quat_toRadians(out);
        return out;
    };
}();

export let rotationToQuat = function () {
    let rotationAxis = create();
    return function rotationToQuat(vector, direction, out = quat_create()) {
        cross(vector, direction, rotationAxis);
        normalize(rotationAxis, rotationAxis);
        let signedAngle = angleSigned(vector, direction, rotationAxis);
        out.quat_fromAxis(signedAngle, rotationAxis);
        return out;
    };
}();

export function rotationToPivoted(vector, direction, pivotAxis, out) {
    return rotationToPivotedDegrees(vector, direction, pivotAxis, out);
}

export let rotationToPivotedDegrees = function () {
    let rotationQuat = quat_utils_create();
    return function rotationToPivotedDegrees(vector, direction, pivotAxis, out = create()) {
        rotationToPivotedQuat(vector, direction, pivotAxis, rotationQuat);
        rotationQuat.quat_toDegrees(out);
        return out;
    };
}();

export let rotationToPivotedRadians = function () {
    let rotationQuat = quat_utils_create();
    return function rotationToPivotedRadians(vector, direction, pivotAxis, out = create()) {
        rotationToPivotedQuat(vector, direction, pivotAxis, rotationQuat);
        rotationQuat.quat_toRadians(out);
        return out;
    };
}();

export let rotationToPivotedQuat = function () {
    let thisFlat = create();
    let directionFlat = create();
    let rotationAxis = create();
    return function rotationToPivotedQuat(vector, direction, pivotAxis, out = quat_create()) {
        removeComponentAlongAxis(vector, pivotAxis, thisFlat);
        removeComponentAlongAxis(direction, pivotAxis, directionFlat);

        cross(thisFlat, directionFlat, rotationAxis);
        normalize(rotationAxis, rotationAxis);
        let signedAngle = angleSigned(thisFlat, directionFlat, rotationAxis);
        out.quat_fromAxis(signedAngle, rotationAxis);
        return out;
    };
}();

export function lerp(from, to, interpolationValue, out = create()) {
    if (interpolationValue <= 0) {
        copy(from, out);
        return out;
    } else if (interpolationValue >= 1) {
        copy(to, out);
        return out;
    }

    vec3.lerp(out, from, to, interpolationValue);
    return out;
}

export function interpolate(from, to, interpolationValue, easingFunction = EasingFunction.linear, out = create()) {
    let lerpValue = easingFunction(interpolationValue);
    return lerp(from, to, lerpValue, out);
}

export let Vec3Utils = {
    create,
    set,
    normalize,
    copy,
    clone,
    zero,
    angle,
    angleDegrees,
    angleRadians,
    equals,
    length,
    lengthSquared,
    distance,
    distanceSquared,
    add,
    sub,
    mul,
    div,
    scale,
    dot,
    negate,
    cross,
    transformQuat,
    transformMat3,
    transformMat4,
    lengthSigned,
    angleSigned,
    angleSignedDegrees,
    angleSignedRadians,
    toRadians,
    toDegrees,
    toQuat,
    radiansToQuat,
    degreesToQuat,
    isNormalized,
    isZero,
    componentAlongAxis,
    valueAlongAxis,
    removeComponentAlongAxis,
    copyComponentAlongAxis,
    isConcordant,
    isFartherAlongAxis,
    isToTheRight,
    signTo,
    projectOnAxis,
    projectOnAxisAlongAxis,
    projectOnPlane,
    projectOnPlaneAlongAxis,
    isOnAxis,
    isOnPlane,
    rotate,
    rotateDegrees,
    rotateRadians,
    rotateQuat,
    rotateAxis,
    rotateAxisDegrees,
    rotateAxisRadians,
    rotateAround,
    rotateAroundDegrees,
    rotateAroundRadians,
    rotateAroundQuat,
    rotateAroundAxis,
    rotateAroundAxisDegrees,
    rotateAroundAxisRadians,
    convertPositionToWorld,
    convertPositionToLocal,
    convertPositionToWorldMatrix,
    convertPositionToLocalMatrix,
    convertPositionToWorldQuat,
    convertPositionToLocalQuat,
    convertDirectionToWorld,
    convertDirectionToLocal,
    convertDirectionToWorldMatrix,
    convertDirectionToLocalMatrix,
    convertDirectionToWorldQuat,
    convertDirectionToLocalQuat,
    log,
    error,
    warn,
    addRotation,
    addRotationDegrees,
    addRotationRadians,
    addRotationQuat,
    degreesAddRotation,
    degreesAddRotationDegrees,
    degreesAddRotationRadians,
    degreesAddRotationQuat,
    radiansAddRotation,
    radiansAddRotationDegrees,
    radiansAddRotationRadians,
    radiansAddRotationQuat,
    toMatrix,
    degreesToMatrix,
    radiansToMatrix,
    rotationTo,
    rotationToDegrees,
    rotationToRadians,
    rotationToQuat,
    rotationToPivoted,
    rotationToPivotedDegrees,
    rotationToPivotedRadians,
    rotationToPivotedQuat,
    lerp,
    interpolate,
};