import { mat3_create, vec3_create } from "../../../plugin/js/extensions/array_extension";
import { create as vec3_utils_create } from "./vec3_utils";
import { create as mat3_utils_create } from "./mat3_utils";
import { quat, mat3 } from "gl-matrix";

// glMatrix Bridge

export function create(x, y, z, w) {
    let out = quat.create();

    if (x !== undefined) {
        set(out, x, y, z, w);
    }

    return out;
}

export function set(quaternion, x, y, z, w) {
    if (y === undefined) {
        quat.set(quaternion, x, x, x, x);
    } else {
        quat.set(quaternion, x, y, z, w);
    }

    return quaternion;
}

export function normalize(quaternion, out = create()) {
    quat.normalize(out, quaternion);
    return out;
}

export function copy(from, to) {
    quat.copy(to, from);
    return to;
}

export function clone(quaternion, out = create()) {
    copy(quaternion, out);
    return out;
}

export function identity(quaternion) {
    quat.identity(quaternion);
    return quaternion;
}

export function length(quaternion) {
    return quat.length(quaternion);
}

export function lengthSquared(quaternion) {
    return quat.squaredLength(quaternion);
}

export function invert(quaternion, out = create()) {
    quat.invert(out, quaternion);
    return out;
}

export function conjugate(quaternion, out = create()) {
    quat.conjugate(out, quaternion);
    return out;
}

export function mul(first, second, out = create()) {
    quat.mul(out, first, second);
    return out;
}

export let getAxis = function () {
    let zero = vec3_utils_create(0, 0, 0);
    return function getAxis(quaternion, out = vec3_create()) {
        let angle = quat.getAxisAngle(out, quaternion);
        if (angle <= Math.PP_EPSILON) {
            out.vec3_copy(zero);
        }
        return out;
    };
}();

export function getAngle(quaternion) {
    return getAngleDegrees(quaternion);
}


export function getAngleDegrees(quaternion) {
    let angle = getAngleRadians(quaternion);
    return Math.pp_toDegrees(angle);
}

export let getAngleRadians = function () {
    let vector = vec3_utils_create();
    return function getAngleRadians(quaternion) {
        let angle = quat.getAxisAngle(vector, quaternion);
        return angle;
    };
}();

export function getAxisScaled(quaternion, out = vec3_create()) {
    return getAxisScaledDegrees(quaternion, out);
}

export function getAxisScaledDegrees(quaternion, out = vec3_create()) {
    getAxis(quaternion, out);
    let angle = getAngleDegrees(quaternion);
    out.vec3_scale(angle, out);
    return out;
}

export let getAxisScaledRadians = function () {
    let zero = vec3_utils_create(0, 0, 0);
    return function getAxisScaledRadians(quaternion, out = vec3_create()) {
        getAxis(quaternion, out);
        let angle = getAngleRadians(quaternion);
        if (angle <= Math.PP_EPSILON) {
            out.vec3_copy(zero);
        } else {
            out.vec3_scale(angle, out);
        }
        return out;
    };
}();

export function getAxes(quaternion, out = [vec3_create(), vec3_create(), vec3_create()]) {
    getLeft(quaternion, out[0]);
    getUp(quaternion, out[1]);
    getForward(quaternion, out[2]);
    return out;
}

export let getForward = function () {
    let rotationMatrix = mat3_utils_create();
    return function getForward(quaternion, out = vec3_create()) {
        toMatrix(quaternion, rotationMatrix);

        out.vec3_set(rotationMatrix[6], rotationMatrix[7], rotationMatrix[8]);
        out.vec3_normalize(out);

        return out;
    };
}();

export function getBackward(quaternion, out) {
    out = getForward(quaternion, out);
    out.vec3_negate(out);
    return out;
}

export let getLeft = function () {
    let rotationMatrix = mat3_utils_create();
    return function getLeft(quaternion, out = vec3_create()) {
        toMatrix(quaternion, rotationMatrix);

        out.vec3_set(rotationMatrix[0], rotationMatrix[1], rotationMatrix[2]);
        out.vec3_normalize(out);

        return out;
    };
}();

export function getRight(quaternion, out) {
    out = getLeft(quaternion, out);
    out.vec3_negate(out);
    return out;
}

export let getUp = function () {
    let rotationMatrix = mat3_utils_create();
    return function getUp(quaternion, out = vec3_create()) {
        toMatrix(quaternion, rotationMatrix);

        out.vec3_set(rotationMatrix[3], rotationMatrix[4], rotationMatrix[5]);
        out.vec3_normalize(out);

        return out;
    };
}();

export function getDown(quaternion, out) {
    out = getUp(quaternion, out);
    out.vec3_negate(out);
    return out;
}

export function setAxes(quaternion, left, up, forward) {
    if (forward != null) {
        return setForward(quaternion, forward, up, left);
    } else if (up != null) {
        return setUp(quaternion, up, forward, left);
    } else {
        return setLeft(quaternion, left, up, forward);
    }
}

export function setForward(quaternion, forward, up = null, left = null) {
    return _setAxes(quaternion, [left, up, forward], [2, 1, 0]);
}

export let setBackward = function () {
    let forward = vec3_utils_create();
    return function setBackward(quaternion, backward, up = null, left = null) {
        backward.vec3_negate(forward);
        return _setAxes(quaternion, [left, up, forward], [2, 1, 0]);
    };
}();

export function setUp(quaternion, up, forward = null, left = null) {
    return _setAxes(quaternion, [left, up, forward], [1, 2, 0]);
}

export let setDown = function () {
    let up = vec3_utils_create();
    return function setDown(quaternion, down, forward = null, left = null) {
        down.vec3_negate(up);
        return _setAxes(quaternion, [left, up, forward], [1, 2, 0]);
    };
}();

export function setLeft(quaternion, left, up = null, forward = null) {
    return _setAxes(quaternion, [left, up, forward], [0, 1, 2]);
}

export let setRight = function () {
    let left = vec3_utils_create();
    return function setRight(quaternion, right, up = null, forward = null) {
        right.vec3_negate(left);
        return _setAxes(quaternion, [left, up, forward], [0, 1, 2]);
    };
}();

export function toWorld(quaternion, parentQuat, out = create()) {
    mul(parentQuat, quaternion, out);
    return out;
}

export let toLocal = function () {
    let invertQuat = create();
    return function toLocal(quaternion, parentQuat, out = create()) {
        conjugate(parentQuat, invertQuat);
        mul(invertQuat, quaternion, out);
        return out;
    };
}();

export function fromAxis(angle, axis, out = create()) {
    return fromAxisDegrees(angle, axis, out);
}

export function fromAxisDegrees(angle, axis, out = create()) {
    fromAxisRadians(Math.pp_toRadians(angle), axis, out);
    return out;
}

export function fromAxisRadians(angle, axis, out = create()) {
    quat.setAxisAngle(out, axis, angle);
    return out;
}

export let fromAxes = function () {
    let mat3 = mat3_utils_create();
    return function fromAxes(leftAxis, upAxis, forwardAxis, out = create()) {
        mat3.mat3_fromAxes(leftAxis, upAxis, forwardAxis);
        return mat3.mat3_toQuat(out);
    };
}();

// New Functions

export let fromRadians = function () {
    let vector = vec3_utils_create();
    return function fromRadians(radiansRotation, out = create()) {
        radiansRotation.vec3_toDegrees(vector);
        return fromDegrees(vector, out);
    };
}();

export function fromDegrees(degreesRotation, out = create()) {
    quat.fromEuler(out, degreesRotation[0], degreesRotation[1], degreesRotation[2]);
    return out;
}

export let toRadians = function () {
    let mat3 = mat3_utils_create();
    return function toRadians(quaternion, out = vec3_create()) {
        toMatrix(quaternion, mat3);

        // Rotation order is ZYX 
        out[1] = Math.asin(-Math.pp_clamp(mat3[2], -1, 1));

        if (Math.abs(mat3[2]) < (1 - Math.PP_EPSILON)) {
            out[0] = Math.atan2(mat3[5], mat3[8]);
            out[2] = Math.atan2(mat3[1], mat3[0]);
        } else {
            out[0] = 0;
            out[2] = Math.atan2(-mat3[3], mat3[4]);
        }

        return out;
    };
}();

export function toDegrees(quaternion, out = vec3_create()) {
    toRadians(quaternion, out);
    out.vec3_toDegrees(out);
    return out;
}

export function isNormalized(quaternion, epsilon = Math.PP_EPSILON) {
    return Math.abs(lengthSquared(quaternion) - 1) < epsilon;
}

export function addRotation(first, second, out) {
    return addRotationDegrees(first, second, out);
}

export let addRotationDegrees = function () {
    let secondQuat = create();
    return function addRotationDegrees(first, second, out) {
        second.vec3_degreesToQuat(secondQuat);
        return addRotationQuat(first, secondQuat, out);
    };
}();

export let addRotationRadians = function () {
    let secondQuat = create();
    return function addRotationRadians(first, second, out) {
        second.vec3_radiansToQuat(secondQuat);
        return addRotationQuat(first, secondQuat, out);
    };
}();

export function addRotationQuat(first, second, out = create()) {
    mul(second, first, out);
    return out;
}

export function subRotation(first, second, out) {
    return subRotationDegrees(first, second, out);
}

export let subRotationDegrees = function () {
    let secondQuat = create();
    return function subRotationDegrees(first, second, out) {
        second.vec3_degreesToQuat(secondQuat);
        return subRotationQuat(first, secondQuat, out);
    };
}();

export let subRotationRadians = function () {
    let secondQuat = create();
    return function subRotationRadians(first, second, out) {
        second.vec3_radiansToQuat(secondQuat);
        return subRotationQuat(first, secondQuat, out);
    };
}();

export let subRotationQuat = function () {
    let inverse = create();
    return function subRotationQuat(first, second, out = create()) {
        invert(second, inverse);
        mul(first, inverse, out);

        if (isNormalized(first) && isNormalized(second)) {
            // I would normally not normalize quaternion results since you may want the untouched sub
            // But for normalized params it should be normalized
            // It seems though that for some small error the quat will not be exactly normalized, so I fix it
            normalize(out, out);
        }

        return out;
    };
}();

export function rotationTo(first, second, out) {
    return rotationToDegrees(first, second, out);
}

export let rotationToDegrees = function () {
    let secondQuat = create();
    return function rotationToDegrees(first, second, out) {
        second.vec3_degreesToQuat(secondQuat);
        return rotationToQuat(first, secondQuat, out);
    };
}();

export let rotationToRadians = function () {
    let secondQuat = create();
    return function rotationToRadians(first, second, out) {
        second.vec3_radiansToQuat(secondQuat);
        return rotationToQuat(first, secondQuat, out);
    };
}();

export function rotationToQuat(first, second, out) {
    return subRotationQuat(second, first, out);
}

export let getTwist = function () {
    let rotationAxis = vec3_utils_create();
    let projection = vec3_utils_create();
    let rotationAlongAxis = create();
    return function getTwist(quaternion, axis, out = create()) {
        rotationAxis[0] = quaternion[0];
        rotationAxis[1] = quaternion[1];
        rotationAxis[2] = quaternion[2];

        let dotProd = axis.vec3_dot(rotationAxis);
        axis.vec3_scale(dotProd, projection);
        rotationAlongAxis[0] = projection[0];
        rotationAlongAxis[1] = projection[1];
        rotationAlongAxis[2] = projection[2];
        rotationAlongAxis[3] = quaternion[3];
        normalize(rotationAlongAxis, rotationAlongAxis);
        if (dotProd < 0) {
            rotationAlongAxis[0] = -rotationAlongAxis[0];
            rotationAlongAxis[1] = -rotationAlongAxis[1];
            rotationAlongAxis[2] = -rotationAlongAxis[2];
            rotationAlongAxis[3] = -rotationAlongAxis[3];
        }

        return copy(rotationAlongAxis, out);
    };
}();

export let getSwing = function () {
    let twist = create();
    return function getSwing(quaternion, axis, out = create()) {
        getTwist(quaternion, axis, twist);
        getSwingFromTwist(quaternion, twist, out);
        return out;
    };
}();

export function getSwingFromTwist(quaternion, twist, out = create()) {
    return subRotationQuat(quaternion, twist, out);
}

export let getTwistFromSwing = function () {
    let inverse = create();
    return function getTwistFromSwing(quaternion, swing, out = create()) {
        invert(swing, inverse);
        addRotationQuat(quaternion, inverse, out);
        return out;
    };
}();

export function fromTwistSwing(twist, swing, out = create()) {
    return addRotationQuat(twist, swing, out);
}

export function toMatrix(quaternion, out = mat3_create()) {
    mat3.fromQuat(out, quaternion);
    return out;
}

export function rotate(first, second, out) {
    return rotateDegrees(first, second, out);
}

export function rotateDegrees(first, second, out) {
    return addRotationDegrees(first, second, out);
}

export function rotateRadians(first, second, out) {
    return addRotationRadians(first, second, out);
}

export function rotateQuat(first, second, out) {
    return addRotationQuat(first, second, out);
}

export function rotateAxis(quaternion, angle, axis, out) {
    return rotateAxisDegrees(quaternion, angle, axis, out);
}

export let rotateAxisDegrees = function () {
    let secondQuat = create();
    return function rotateAxisDegrees(quaternion, angle, axis, out) {
        fromAxisDegrees(angle, axis, secondQuat);
        return rotateQuat(quaternion, secondQuat, out);
    };
}();

export let rotateAxisRadians = function () {
    let secondQuat = create();
    return function rotateAxisRadians(quaternion, angle, axis, out) {
        fromAxisRadians(angle, axis, secondQuat);
        return rotateQuat(quaternion, secondQuat, out);
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

    quat.lerp(out, from, to, interpolationValue);
    return out;
}

export function interpolate(from, to, interpolationValue, easingFunction = EasingFunction.linear, out = create()) {
    let lerpValue = easingFunction(interpolationValue);
    return lerp(from, to, lerpValue, out);
}

export function slerp(from, to, interpolationValue, out = create()) {
    if (interpolationValue <= 0) {
        copy(from, out);
        return out;
    } else if (interpolationValue >= 1) {
        copy(to, out);
        return out;
    }

    quat.slerp(out, from, to, interpolationValue);
    return out;
}

export function sinterpolate(from, to, interpolationValue, easingFunction = EasingFunction.linear, out = create()) {
    let lerpValue = easingFunction(interpolationValue);
    return slerp(from, to, lerpValue, out);
}

export let QuatUtils = {
    create,
    set,
    normalize,
    copy,
    clone,
    identity,
    length,
    lengthSquared,
    invert,
    conjugate,
    mul,
    getAxis,
    getAngle,
    getAngleDegrees,
    getAngleRadians,
    getAxisScaled,
    getAxisScaledDegrees,
    getAxisScaledRadians,
    getAxes,
    getForward,
    getBackward,
    getLeft,
    getRight,
    getUp,
    getDown,
    setAxes,
    setForward,
    setBackward,
    setUp,
    setDown,
    setLeft,
    setRight,
    toWorld,
    toLocal,
    fromAxis,
    fromAxisDegrees,
    fromAxisRadians,
    fromAxes,
    fromRadians,
    fromDegrees,
    toRadians,
    toDegrees,
    isNormalized,
    addRotation,
    addRotationDegrees,
    addRotationRadians,
    addRotationQuat,
    subRotation,
    subRotationDegrees,
    subRotationRadians,
    subRotationQuat,
    rotationTo,
    rotationToDegrees,
    rotationToRadians,
    rotationToQuat,
    getTwist,
    getSwing,
    getSwingFromTwist,
    getTwistFromSwing,
    fromTwistSwing,
    toMatrix,
    rotate,
    rotateDegrees,
    rotateRadians,
    rotateQuat,
    rotateAxis,
    rotateAxisDegrees,
    rotateAxisRadians,
    lerp,
    interpolate,
    slerp,
    sinterpolate
};



let _setAxes = function () {
    let fixedAxes = [vec3_utils_create(), vec3_utils_create(), vec3_utils_create()];

    let fixedAxesFixSignMap = [
        [1, -1, 1],
        [1, 1, -1],
        [-1, 1, -1]
    ];

    let fixedLeft = vec3_utils_create();
    let fixedUp = vec3_utils_create();
    let fixedForward = vec3_utils_create();

    let currentAxis = vec3_utils_create();

    let rotationAxis = vec3_utils_create();
    let rotationMat = mat3_utils_create();
    let rotationQuat = create();
    return function _setAxes(quaternion, axes, priority) {
        let firstAxis = axes[priority[0]];
        let secondAxis = axes[priority[1]];
        let thirdAxis = axes[priority[2]];

        if (firstAxis == null || firstAxis.vec3_isZero(Math.PP_EPSILON)) {
            return;
        }

        let secondAxisValid = false;
        if (secondAxis != null) {
            let angleBetween = firstAxis.vec3_angleRadians(secondAxis);
            if (angleBetween > Math.PP_EPSILON) {
                secondAxisValid = true;
            }
        }

        let thirdAxisValid = false;
        if (thirdAxis != null) {
            let angleBetween = firstAxis.vec3_angleRadians(thirdAxis);
            if (angleBetween > Math.PP_EPSILON) {
                thirdAxisValid = true;
            }
        }

        if (secondAxisValid || thirdAxisValid) {
            let crossAxis = null;
            let secondAxisIndex = null;
            let thirdAxisIndex = null;
            if (secondAxisValid) {
                crossAxis = secondAxis;
                secondAxisIndex = 1;
                thirdAxisIndex = 2;
            } else {
                crossAxis = thirdAxis;
                secondAxisIndex = 2;
                thirdAxisIndex = 1;
            }

            let fixSignMap = fixedAxesFixSignMap[priority[0]];

            firstAxis.vec3_cross(crossAxis, fixedAxes[thirdAxisIndex]);
            fixedAxes[thirdAxisIndex].vec3_scale(fixSignMap[priority[thirdAxisIndex]], fixedAxes[thirdAxisIndex]);

            firstAxis.vec3_cross(fixedAxes[thirdAxisIndex], fixedAxes[secondAxisIndex]);
            fixedAxes[secondAxisIndex].vec3_scale(fixSignMap[priority[secondAxisIndex]], fixedAxes[secondAxisIndex]);

            fixedAxes[1].vec3_cross(fixedAxes[2], fixedAxes[0]);
            fixedAxes[0].vec3_scale(fixSignMap[priority[0]], fixedAxes[0]);

            fixedAxes[priority.pp_findIndexEqual(0)].vec3_normalize(fixedLeft);
            fixedAxes[priority.pp_findIndexEqual(1)].vec3_normalize(fixedUp);
            fixedAxes[priority.pp_findIndexEqual(2)].vec3_normalize(fixedForward);

            rotationMat.mat3_set(
                fixedLeft[0], fixedLeft[1], fixedLeft[2],
                fixedUp[0], fixedUp[1], fixedUp[2],
                fixedForward[0], fixedForward[1], fixedForward[2]
            );

            rotationMat.mat3_toQuat(rotationQuat);
            normalize(rotationQuat, rotationQuat);

            copy(rotationQuat, quaternion);
        } else {
            if (priority[0] == 0) {
                getLeft(quaternion, currentAxis);
            } else if (priority[0] == 1) {
                getUp(quaternion, currentAxis);
            } else {
                getForward(quaternion, currentAxis);
            }

            let angleBetween = firstAxis.vec3_angleRadians(currentAxis);
            if (angleBetween > Math.PP_EPSILON) {
                currentAxis.vec3_cross(firstAxis, rotationAxis);
                rotationAxis.vec3_normalize(rotationAxis);
                fromAxisRadians(angleBetween, rotationAxis, rotationQuat);

                rotateQuat(quaternion, rotationQuat, quaternion);
            }
        }

        return quaternion;
    };
}();