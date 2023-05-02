/*
    How to use

    Warning: The extension is a WIP so not all the functions are available for all kinds of vector.

    By default rotations are in Degrees and transforms are Matrix 4 (and not Quat 2)    
    For functions that work with rotations, Matrix means Matrix 3 and Quat means Quat
    For functions that work with transforms, Matrix means Matrix 4 and Quat means Quat 2
    
    For rotations u can add a suffix like Degrees/Radians/Quat/Matrix to use a specific version, example:
        - vec3_rotateAroundRadians
        - vec3_degreesAddRotationDegrees
        
    For transform u can add a suffix like Quat/Matrix to use a specific version, example:
        - vec3_convertPositionToWorldMatrix
        - vec3_convertDirectionToWorldQuat

    Some vec3 functions let u add a prefix to specify if the vec3 represent a rotation in degrees or radians, where degrees is the default:
        - vec3_toQuat
        - vec3_degreesToQuat
        - vec3_radiansToQuat
        - vec3_degreesAddRotation

    Rotation operations return a rotation of the same kind of the starting variable:
        - vec3_degreesAddRotationQuat   -> returns a rotation in degrees
        - quat_addRotationDegrees       -> returns a rotation in quat

    The functions leave u the choice of forwarding an out parameter or just get the return value, example:
        - let quat = this.vec3_toQuat()
        - this.vec3_toQuat(quat)
        - the out parameter is always the last one

    List of functions:
        Notes:
            - If a group of functions starts with ○ it means it modifies the variable itself
            - The suffixes (like Matrix or Radians) or prefixes (like degrees) are omitted 

        CREATION (u can call these functions without any object):
            - vec2_create

            - vec3_create

            - vec4_create

            - quat_create

            - quat2_create

            - mat3_create

            - mat4_create

        ARRAY:
            - pp_first      / pp_last
            - pp_has        / pp_hasEqual
            - pp_find       / pp_findIndex      / pp_findAll            / pp_findAllIndexes / pp_findEqual      / pp_findAllEqual   / pp_findIndexEqual / pp_findAllIndexesEqual
            ○ pp_remove     / pp_removeIndex    / pp_removeAllIndexes   / pp_removeAll      / pp_removeEqual    / pp_removeAllEqual
            ○ pp_pushUnique / pp_unshiftUnique
            ○ pp_copy    
            - pp_clone      
            - pp_equals      
            ○ pp_clear      

        GENERIC VECTOR (array with only numbers):
            - vec_scale
            - vec_round     / vec_floor         / vec_ceil      / vec_clamp
            - vec_log       / vec_error         / vec_warn   
            - vec_equals   

        VECTOR 2:
            ○ vec2_set      / vec2_copy     / vec2_zero
            - vec2_clone 
            - vec2_normalize
            - vec2_length
            - vec2_isZero

        VECTOR 3:
            ○ vec3_set      / vec3_copy     / vec3_zero
            - vec3_clone 
            - vec3_normalize    / vec3_negate
            - vec3_isNormalized / vec3_isZero
            - vec3_length       / vec3_lengthSquared        / vec3_lengthSigned
            - vec3_distance     / vec3_distanceSquared
            - vec3_add              / vec3_sub              / vec3_mul      / vec3_div      / vec3_scale    / vec3_dot
            - vec3_equals
            - vec3_transformQuat    / vec3_transformMat3    / vec3_transformMat4
            - vec3_componentAlongAxis           / vec3_removeComponentAlongAxis / vec3_copyComponentAlongAxis   / vec3_valueAlongAxis  
            - vec3_isConcordant
            - vec3_isFartherAlongAxis
            - vec3_isToTheRight
            - vec3_isOnAxis
            - vec3_isOnPlane
            - vec3_signTo
            - vec3_projectOnAxis                / vec3_projectOnAxisAlongAxis
            - vec3_projectOnPlane               / vec3_projectOnPlaneAlongAxis
            - vec3_convertPositionToWorld       / vec3_convertPositionToLocal 
            - vec3_convertDirectionToWorld      / vec3_convertDirectionToLocal   
            - vec3_angle
            - vec3_rotate           / vec3_rotateAxis           / vec3_rotateAround / vec3_rotateAroundAxis
            - vec3_rotationTo       / vec3_rotationToPivoted
            - vec3_toRadians        / vec3_toDegrees            / vec3_toQuat       / vec3_toMatrix
            - vec3_addRotation
            - vec3_log       / vec3_error         / vec3_warn    
            - vec3_lerp      / vec3_interpolate 
            
        VECTOR 4:
            ○ vec4_set      / vec4_copy
            - vec4_clone 

        QUAT:
            ○ quat_set          / quat_copy     / quat_identity
            - quat_clone 
            - quat_normalize    / quat_invert   / quat_conjugate
            - quat_isNormalized
            - quat_length       / quat_lengthSquared
            - quat_mul
            - quat_getAxis          / quat_getAngle         / quat_getAxisScaled
            - quat_getAxes          / quat_getRight         / quat_getUp    / quat_getForward   / quat_getLeft  / quat_getDown  / quat_getBackward
            ○ quat_setAxes          / quat_setRight         / quat_setUp    / quat_setForward   / quat_setLeft  / quat_setDown  / quat_setBackward
            - quat_toWorld          / quat_toLocal
            - quat_rotate           / quat_rotateAxis  
            - quat_rotationTo     
            - quat_getTwist         / quat_getSwing         / quat_getTwistFromSwing    / quat_getSwingFromTwist    / quat_fromTwistSwing
            ○ quat_fromRadians      / quat_fromDegrees      / quat_fromAxis / quat_fromAxes
            - quat_toRadians        / quat_toDegrees        / quat_toMatrix
            - quat_addRotation      / quat_subRotation
            - quat_lerp             / quat_interpolate      / quat_slerp    / quat_sinterpolate

        QUAT 2:
            ○ quat2_set             / quat2_copy        / quat2_identity
            - quat2_normalize       / quat2_invert      / quat2_conjugate
            - quat2_isNormalized
            - quat2_length          / quat2_lengthSquared
            - quat2_mul
            - quat2_getPosition     / quat2_getRotation
            ○ quat2_setPosition     / quat2_setRotation     / quat2_setPositionRotation
            - quat2_getAxes     / quat2_getRight    / quat2_getUp   / quat2_getForward  / quat2_getLeft    / quat2_getDown   / quat2_getBackward
            - quat2_toWorld     / quat2_toLocal
            - quat2_rotateAxis  
            - quat2_toMatrix
            ○ quat2_fromMatrix
            - quat2_lerp        / quat2_interpolate

        MATRIX 3:
            ○ mat3_set
            - mat3_toDegrees    / mat3_toRadians    / mat3_toQuat
            - mat3_fromAxes

        MATRIX 4:
            ○ mat4_set          / mat4_copy         / mat4_identity
            - mat4_clone
            - mat4_invert
            - mat_mul           / mat4_scale
            - mat4_getPosition  / mat4_getRotation  / mat4_getScale
            ○ mat4_setPosition  / mat4_setRotation  / mat4_setScale
            ○ mat4_setPositionRotation      / mat4_setPositionRotationScale
            - mat4_getAxes     / mat4_getRight    / mat4_getUp   / mat4_getForward  / mat4_getLeft    / mat4_getDown   / mat4_getBackward
            - mat4_toWorld      / mat4_toLocal
            - mat4_hasUniformScale
            - mat4_toQuat
            ○ mat4_fromQuat
*/

import * as glMatrix from "gl-matrix";
import { ArrayUtils } from "../../../cauldron/js/utils/array_utils";
import { Mat3Utils } from "../../../cauldron/js/utils/mat3_utils";
import { Mat4Utils } from "../../../cauldron/js/utils/mat4_utils";
import { Vec2Utils } from "../../../cauldron/js/utils/vec2_utils";
import { Vec3Utils } from "../../../cauldron/js/utils/vec3_utils";
import { Vec4Utils } from "../../../cauldron/js/utils/vec4_utils";
import { VecUtils } from "../../../cauldron/js/utils/vec_utils";
import { PluginUtils } from "../../utils/plugin_utils";

export function initArrayExtension() {
    initArrayExtensionProtoype();
}

export function vec2_create(x, y) {
    return Vec2Utils.create(...arguments);
};

export function vec3_create(x, y, z) {
    return Vec3Utils.create(...arguments);
};

export function vec4_create(x, y, z, w) {
    return Vec4Utils.create(...arguments);
};

export function quat_create(x, y, z, w) {
    let out = glMatrix.quat.create();
    if (x !== undefined) {
        _quat_set(out, x, y, z, w);
    }
    return out;
};

export function quat2_create(x1, y1, z1, w1, x2, y2, z2, w2) {
    let out = glMatrix.quat2.create();
    if (x1 !== undefined) {
        _quat2_set(out, x1, y1, z1, w1, x2, y2, z2, w2);
    }
    return out;
};

export function mat3_create(
    m00, m01, m02,
    m10, m11, m12,
    m20, m21, m22) {
    return Mat3Utils.create(...arguments);
};

export function mat4_create(
    m00, m01, m02, m03,
    m10, m11, m12, m13,
    m20, m21, m22, m23,
    m30, m31, m32, m33) {
    return Mat4Utils.create(...arguments);
};

export function initArrayExtensionProtoype() {

    // SETTER

    let arrayExtension = {};

    arrayExtension.quat_set = function quat_set(x, y, z, w) {
        return _quat_set(this, x, y, z, w);
    };

    arrayExtension.quat2_set = function quat2_set(x1, y1, z1, w1, x2, y2, z2, w2) {
        return _quat2_set(this, x1, y1, z1, w1, x2, y2, z2, w2);
    };

    // ARRAY

    // New Functions

    let ppExtension = {};

    ppExtension.pp_first = function pp_first() {
        return ArrayUtils.first(this, ...arguments);
    };

    ppExtension.pp_last = function pp_last() {
        return ArrayUtils.last(this, ...arguments);
    };

    ppExtension.pp_has = function pp_has(callback) {
        return ArrayUtils.has(this, ...arguments);
    };

    ppExtension.pp_hasEqual = function pp_hasEqual(elementToFind, elementsEqualCallback = null) {
        return ArrayUtils.hasEqual(this, ...arguments);
    };

    ppExtension.pp_find = function pp_find(callback) {
        return ArrayUtils.find(this, ...arguments);
    };

    ppExtension.pp_findIndex = function pp_findIndex(callback) {
        return ArrayUtils.findIndex(this, ...arguments);
    };

    ppExtension.pp_findAll = function pp_findAll(callback) {
        return ArrayUtils.findAll(this, ...arguments);
    };

    ppExtension.pp_findAllIndexes = function pp_findAllIndexes(callback) {
        return ArrayUtils.findAllIndexes(this, ...arguments);
    };

    ppExtension.pp_findEqual = function pp_findEqual(elementToFind, elementsEqualCallback = null) {
        return ArrayUtils.findEqual(this, ...arguments);
    };

    ppExtension.pp_findAllEqual = function pp_findAllEqual(elementToFind, elementsEqualCallback = null) {
        return ArrayUtils.findAllEqual(this, ...arguments);
    };

    ppExtension.pp_findIndexEqual = function pp_findIndexEqual(elementToFind, elementsEqualCallback = null) {
        return ArrayUtils.findIndexEqual(this, ...arguments);
    };

    ppExtension.pp_findAllIndexesEqual = function pp_findAllIndexesEqual(elementToFind, elementsEqualCallback = null) {
        return ArrayUtils.findAllIndexesEqual(this, ...arguments);
    };

    ppExtension.pp_removeIndex = function pp_removeIndex(index) {
        return ArrayUtils.removeIndex(this, ...arguments);
    };

    ppExtension.pp_removeAllIndexes = function pp_removeAllIndexes(indexes) {
        return ArrayUtils.removeAllIndexes(this, ...arguments);
    };

    ppExtension.pp_remove = function pp_remove(callback) {
        return ArrayUtils.remove(this, ...arguments);
    };

    ppExtension.pp_removeAll = function pp_removeAll(callback) {
        return ArrayUtils.removeAll(this, ...arguments);
    };

    ppExtension.pp_removeEqual = function pp_removeEqual(elementToRemove, elementsEqualCallback = null) {
        return ArrayUtils.removeEqual(this, ...arguments);
    };

    ppExtension.pp_removeAllEqual = function pp_removeAllEqual(elementToRemove, elementsEqualCallback = null) {
        return ArrayUtils.removeAllEqual(this, ...arguments);
    };

    ppExtension.pp_pushUnique = function pp_pushUnique(element, elementsEqualCallback = null) {
        return ArrayUtils.pushUnique(this, ...arguments);
    };

    ppExtension.pp_unshiftUnique = function pp_unshiftUnique(element, elementsEqualCallback = null) {
        return ArrayUtils.unshiftUnique(this, ...arguments);
    };

    ppExtension.pp_copy = function pp_copy(array, copyCallback = null) {
        return ArrayUtils.copy(this, ...arguments);
    };

    ppExtension.pp_clone = function pp_clone(cloneCallback = null) {
        return ArrayUtils.clone(this, ...arguments);
    };

    ppExtension.pp_equals = function pp_equals(array, elementsEqualCallback = null) {
        return ArrayUtils.equals(this, ...arguments);
    };

    ppExtension.pp_clear = function pp_clear() {
        return ArrayUtils.clear(this, ...arguments);
    };

    // GENERIC VECTOR

    // New Functions

    let vecExtension = {}

    vecExtension.vec_toString = function vec_toString(decimalPlaces = null) {
        return VecUtils.toString(this, ...arguments);
    };

    vecExtension.vec_log = function vec_log(decimalPlaces = 4) {
        return VecUtils.log(this, ...arguments);
    };

    vecExtension.vec_error = function vec_error(decimalPlaces = 4) {
        return VecUtils.error(this, ...arguments);
    };

    vecExtension.vec_warn = function vec_warn(decimalPlaces = 4) {
        return VecUtils.warn(this, ...arguments);
    };

    vecExtension.vec_scale = function vec_scale(value, out = null) {
        return VecUtils.scale(this, ...arguments);
    };

    vecExtension.vec_round = function vec_round(out = null) {
        return VecUtils.round(this, ...arguments);
    };

    vecExtension.vec_floor = function vec_floor(out = null) {
        return VecUtils.floor(this, ...arguments);
    };

    vecExtension.vec_ceil = function vec_ceil(out = null) {
        return VecUtils.ceil(this, ...arguments);
    };

    vecExtension.vec_clamp = function vec_clamp(start, end, out = null) {
        return VecUtils.clamp(this, ...arguments);
    };

    vecExtension.vec_equals = function vec_equals(vector, epsilon = 0) {
        return VecUtils.equals(this, ...arguments);
    };

    // VECTOR 2

    let vec2Extension = {};

    vec2Extension.vec2_set = function vec2_set(x, y) {
        return Vec2Utils.set(this, ...arguments);
    };

    // glMatrix Bridge

    vec2Extension.vec2_length = function vec2_length() {
        return Vec2Utils.length(this, ...arguments);
    };

    vec2Extension.vec2_normalize = function vec2_normalize(out = vec2_create()) {
        return Vec2Utils.normalize(this, ...arguments);
    };

    vec2Extension.vec2_copy = function vec2_copy(vector) {
        return Vec2Utils.copy(vector, this);
    };

    vec2Extension.vec2_clone = function vec2_clone(out = vec2_create()) {
        return Vec2Utils.clone(this, ...arguments);
    };

    vec2Extension.vec2_zero = function vec2_zero() {
        return Vec2Utils.zero(this, ...arguments);
    };

    // New Functions

    vec2Extension.vec2_isZero = function vec2_isZero(epsilon = 0) {
        return Vec2Utils.isZero(this, ...arguments);
    };

    // VECTOR 3

    let vec3Extension = {};

    // glMatrix Bridge

    vec3Extension.vec3_set = function vec3_set(x, y, z) {
        return Vec3Utils.set(this, ...arguments);
    };

    vec3Extension.vec3_normalize = function vec3_normalize(out = vec3_create()) {
        return Vec3Utils.normalize(this, ...arguments);
    };
    vec3Extension.vec3_copy = function vec3_copy(vector) {
        return Vec3Utils.copy(vector, this);
    };

    vec3Extension.vec3_clone = function vec3_clone(out = vec3_create()) {
        return Vec3Utils.clone(this, ...arguments);
    };

    vec3Extension.vec3_zero = function vec3_zero() {
        return Vec3Utils.zero(this, ...arguments);
    };

    vec3Extension.vec3_angle = function vec3_angle(vector) {
        return Vec3Utils.angle(this, ...arguments);
    };

    vec3Extension.vec3_angleDegrees = function vec3_angleDegrees(vector) {
        return Vec3Utils.angleDegrees(this, ...arguments);
    };

    vec3Extension.vec3_angleRadians = function vec3_angleRadians(vector) {
        return Vec3Utils.angleRadians(this, ...arguments);
    };

    vec3Extension.vec3_equals = function vec3_equals(vector, epsilon = 0) {
        return Vec3Utils.equals(this, ...arguments);
    };

    vec3Extension.vec3_length = function vec3_length() {
        return Vec3Utils.length(this, ...arguments);
    };

    vec3Extension.vec3_lengthSquared = function vec3_lengthSquared() {
        return Vec3Utils.lengthSquared(this, ...arguments);
    };

    vec3Extension.vec3_distance = function vec3_distance(vector) {
        return Vec3Utils.distance(this, ...arguments);
    };

    vec3Extension.vec3_distanceSquared = function vec3_distanceSquared(vector) {
        return Vec3Utils.distanceSquared(this, ...arguments);
    };

    vec3Extension.vec3_add = function vec3_add(vector, out = vec3_create()) {
        return Vec3Utils.add(this, ...arguments);
    };

    vec3Extension.vec3_sub = function vec3_sub(vector, out = vec3_create()) {
        return Vec3Utils.sub(this, ...arguments);
    };

    vec3Extension.vec3_mul = function vec3_mul(vector, out = vec3_create()) {
        return Vec3Utils.mul(this, ...arguments);
    };

    vec3Extension.vec3_div = function vec3_div(vector, out = vec3_create()) {
        return Vec3Utils.div(this, ...arguments);
    };

    vec3Extension.vec3_scale = function vec3_scale(value, out = vec3_create()) {
        return Vec3Utils.scale(this, ...arguments);
    };

    vec3Extension.vec3_dot = function vec3_dot(vector) {
        return Vec3Utils.dot(this, ...arguments);
    };

    vec3Extension.vec3_negate = function vec3_negate(out = vec3_create()) {
        return Vec3Utils.negate(this, ...arguments);
    };

    vec3Extension.vec3_cross = function vec3_cross(vector, out = vec3_create()) {
        return Vec3Utils.cross(this, ...arguments);
    };

    vec3Extension.vec3_transformQuat = function vec3_transformQuat(quat, out = vec3_create()) {
        return Vec3Utils.transformQuat(this, ...arguments);
    };

    vec3Extension.vec3_transformMat3 = function vec3_transformMat3(mat3, out = vec3_create()) {
        return Vec3Utils.transformMat3(this, ...arguments);
    };

    vec3Extension.vec3_transformMat4 = function vec3_transformMat4(mat4, out = vec3_create()) {
        return Vec3Utils.transformMat4(this, ...arguments);
    };

    // New Functions

    vec3Extension.vec3_lengthSigned = function vec3_lengthSigned(positiveDirection) {
        return Vec3Utils.lengthSigned(this, ...arguments);
    };

    vec3Extension.vec3_angleSigned = function vec3_angleSigned(vector, upAxis) {
        return Vec3Utils.angleSigned(this, ...arguments);
    };

    vec3Extension.vec3_angleSignedDegrees = function vec3_angleSignedDegrees(vector, upAxis) {
        return Vec3Utils.angleSignedDegrees(this, ...arguments);
    };

    vec3Extension.vec3_angleSignedRadians = function vec3_angleSignedRadians(vector, upAxis) {
        return Vec3Utils.angleSignedRadians(this, ...arguments);
    };

    vec3Extension.vec3_toRadians = function vec3_toRadians(out = vec3_create()) {
        return Vec3Utils.toRadians(this, ...arguments);
    };

    vec3Extension.vec3_toDegrees = function vec3_toDegrees(out = vec3_create()) {
        return Vec3Utils.toDegrees(this, ...arguments);
    };

    vec3Extension.vec3_toQuat = function vec3_toQuat(out) {
        return Vec3Utils.toQuat(this, ...arguments);
    };

    vec3Extension.vec3_radiansToQuat = function vec3_radiansToQuat(out = quat_create()) {
        return Vec3Utils.radiansToQuat(this, ...arguments);
    };

    vec3Extension.vec3_degreesToQuat = function vec3_degreesToQuat(out = quat_create()) {
        return Vec3Utils.degreesToQuat(this, ...arguments);
    };

    vec3Extension.vec3_isNormalized = function vec3_isNormalized(epsilon = Math.PP_EPSILON) {
        return Vec3Utils.isNormalized(this, ...arguments);
    };

    vec3Extension.vec3_isZero = function vec3_isZero(epsilon = 0) {
        return Vec3Utils.isZero(this, ...arguments);
    };

    vec3Extension.vec3_componentAlongAxis = function vec3_componentAlongAxis(axis, out = vec3_create()) {
        return Vec3Utils.componentAlongAxis(this, ...arguments);
    };

    vec3Extension.vec3_valueAlongAxis = function vec3_valueAlongAxis(axis) {
        return Vec3Utils.valueAlongAxis(this, ...arguments);
    };

    vec3Extension.vec3_removeComponentAlongAxis = function vec3_removeComponentAlongAxis(axis, out = vec3_create()) {
        return Vec3Utils.removeComponentAlongAxis(this, ...arguments);
    };

    vec3Extension.vec3_copyComponentAlongAxis = function vec3_copyComponentAlongAxis(vector, axis, out = vec3_create()) {
        return Vec3Utils.copyComponentAlongAxis(vector, this, axis, out);
    };

    vec3Extension.vec3_isConcordant = function vec3_isConcordant(vector) {
        return Vec3Utils.isConcordant(this, ...arguments);
    };

    vec3Extension.vec3_isFartherAlongAxis = function vec3_isFartherAlongAxis(vector, axis) {
        return Vec3Utils.isFartherAlongAxis(this, ...arguments);
    };

    vec3Extension.vec3_isToTheRight = function vec3_isToTheRight(vector, upAxis) {
        return Vec3Utils.isToTheRight(this, ...arguments);
    };

    vec3Extension.vec3_signTo = function vec3_signTo(vector, upAxis, zeroSign = 1) {
        return Vec3Utils.signTo(this, ...arguments);
    };

    vec3Extension.vec3_projectOnAxis = function vec3_projectOnAxis(axis, out = vec3_create()) {
        return Vec3Utils.projectOnAxis(this, ...arguments);
    };

    vec3Extension.vec3_projectOnAxisAlongAxis = function vec3_projectOnAxisAlongAxis(axis, projectAlongAxis, out = vec3_create()) {
        return Vec3Utils.projectOnAxisAlongAxis(this, ...arguments);
    };

    vec3Extension.vec3_projectOnPlane = function vec3_projectOnPlane(planeNormal, out = vec3_create()) {
        return Vec3Utils.projectOnPlane(this, ...arguments);
    };

    vec3Extension.vec3_projectOnPlaneAlongAxis = function vec3_projectOnPlaneAlongAxis(planeNormal, projectAlongAxis, out = vec3_create()) {
        return Vec3Utils.projectOnPlaneAlongAxis(this, ...arguments);
    };

    vec3Extension.vec3_isOnAxis = function vec3_isOnAxis(axis) {
        return Vec3Utils.isOnAxis(this, ...arguments);
    };

    vec3Extension.vec3_isOnPlane = function vec3_isOnPlane(planeNormal) {
        return Vec3Utils.isOnPlane(this, ...arguments);
    };

    vec3Extension.vec3_rotate = function vec3_rotate(rotation, out) {
        return Vec3Utils.rotate(this, ...arguments);
    };

    vec3Extension.vec3_rotateDegrees = function vec3_rotateDegrees(rotation, out) {
        return Vec3Utils.rotateDegrees(this, ...arguments);
    };

    vec3Extension.vec3_rotateRadians = function vec3_rotateRadians(rotation, out) {
        return Vec3Utils.rotateRadians(this, ...arguments);
    };

    vec3Extension.vec3_rotateQuat = function vec3_rotateQuat(rotation, out) {
        return Vec3Utils.rotateQuat(this, ...arguments);
    };

    vec3Extension.vec3_rotateAxis = function vec3_rotateAxis(angle, axis, out) {
        return Vec3Utils.rotateAxis(this, ...arguments);
    };

    vec3Extension.vec3_rotateAxisDegrees = function vec3_rotateAxisDegrees(angle, axis, out) {
        return Vec3Utils.rotateAxisDegrees(this, ...arguments);
    };

    vec3Extension.vec3_rotateAxisRadians = function vec3_rotateAxisRadians(angle, axis, out) {
        return Vec3Utils.rotateAxisRadians(this, ...arguments);
    };

    vec3Extension.vec3_rotateAround = function vec3_rotateAround(rotation, origin, out) {
        return Vec3Utils.rotateAround(this, ...arguments);
    };

    vec3Extension.vec3_rotateAroundDegrees = function vec3_rotateAroundDegrees(rotation, origin, out = vec3_create()) {
        return Vec3Utils.rotateAroundDegrees(this, ...arguments);
    };

    vec3Extension.vec3_rotateAroundRadians = function vec3_rotateAroundRadians(rotation, origin, out = vec3_create()) {
        return Vec3Utils.rotateAroundRadians(this, ...arguments);
    };

    vec3Extension.vec3_rotateAroundQuat = function vec3_rotateAroundQuat(rotation, origin, out = vec3_create()) {
        return Vec3Utils.rotateAroundQuat(this, ...arguments);
    };

    vec3Extension.vec3_rotateAroundAxis = function vec3_rotateAroundAxis(angle, axis, origin, out) {
        return Vec3Utils.rotateAroundAxis(this, ...arguments);
    };

    vec3Extension.vec3_rotateAroundAxisDegrees = function vec3_rotateAroundAxisDegrees(angle, axis, origin, out) {
        return Vec3Utils.rotateAroundAxisDegrees(this, ...arguments);
    };

    vec3Extension.vec3_rotateAroundAxisRadians = function vec3_rotateAroundAxisRadians(angle, axis, origin, out = vec3_create()) {
        return Vec3Utils.rotateAroundAxisRadians(this, ...arguments);
    };

    vec3Extension.vec3_convertPositionToWorld = function vec3_convertPositionToWorld(parentTransform, out) {
        return Vec3Utils.convertPositionToWorld(this, ...arguments);
    };

    vec3Extension.vec3_convertPositionToLocal = function vec3_convertPositionToLocal(parentTransform, out) {
        return Vec3Utils.convertPositionToLocal(this, ...arguments);
    };

    vec3Extension.vec3_convertPositionToWorldMatrix = function vec3_convertPositionToWorldMatrix(parentTransform, out = vec3_create()) {
        return Vec3Utils.convertPositionToWorldMatrix(this, ...arguments);
    };

    vec3Extension.vec3_convertPositionToLocalMatrix = function vec3_convertPositionToLocalMatrix(parentTransform, out = vec3_create()) {
        return Vec3Utils.convertPositionToLocalMatrix(this, ...arguments);
    };

    vec3Extension.vec3_convertPositionToWorldQuat = function vec3_convertPositionToWorldQuat(parentTransform, out = vec3_create()) {
        return Vec3Utils.convertPositionToWorldQuat(this, ...arguments);
    };

    vec3Extension.vec3_convertPositionToLocalQuat = function vec3_convertPositionToLocalQuat(parentTransform, out = vec3_create()) {
        return Vec3Utils.convertPositionToLocalQuat(this, ...arguments);
    };

    vec3Extension.vec3_convertDirectionToWorld = function vec3_convertDirectionToWorld(parentTransform, out) {
        return Vec3Utils.convertDirectionToWorld(this, ...arguments);
    };

    vec3Extension.vec3_convertDirectionToLocal = function vec3_convertDirectionToLocal(parentTransform, out) {
        return Vec3Utils.convertDirectionToLocal(this, ...arguments);
    };

    vec3Extension.vec3_convertDirectionToWorldMatrix = function vec3_convertDirectionToWorldMatrix(parentTransform, out = vec3_create()) {
        return Vec3Utils.convertDirectionToWorldMatrix(this, ...arguments);
    };

    vec3Extension.vec3_convertDirectionToLocalMatrix = function vec3_convertDirectionToLocalMatrix(parentTransform, out = vec3_create()) {
        return Vec3Utils.convertDirectionToLocalMatrix(this, ...arguments);
    };

    vec3Extension.vec3_convertDirectionToWorldQuat = function vec3_convertDirectionToWorldQuat(parentTransform, out = vec3_create()) {
        return Vec3Utils.convertDirectionToWorldQuat(this, ...arguments);
    };

    vec3Extension.vec3_convertDirectionToLocalQuat = function vec3_convertDirectionToLocalQuat(parentTransform, out = vec3_create()) {
        return Vec3Utils.convertDirectionToLocalQuat(this, ...arguments);
    };

    vec3Extension.vec3_log = function vec3_log(decimalPlaces = 4) {
        return Vec3Utils.log(this, ...arguments);
    };

    vec3Extension.vec3_error = function vec3_error(decimalPlaces = 4) {
        return Vec3Utils.error(this, ...arguments);
    };

    vec3Extension.vec3_warn = function vec3_warn(decimalPlaces = 4) {
        return Vec3Utils.warn(this, ...arguments);
    };

    vec3Extension.vec3_addRotation = function vec3_addRotation(rotation, out) {
        return Vec3Utils.addRotation(this, ...arguments);
    };

    vec3Extension.vec3_addRotationDegrees = function vec3_addRotationDegrees(rotation, out) {
        return Vec3Utils.addRotationDegrees(this, ...arguments);
    };

    vec3Extension.vec3_addRotationRadians = function vec3_addRotationRadians(rotation, out) {
        return Vec3Utils.addRotationRadians(this, ...arguments);
    };

    vec3Extension.vec3_addRotationQuat = function vec3_addRotationQuat(rotation, out) {
        return Vec3Utils.addRotationQuat(this, ...arguments);
    };

    vec3Extension.vec3_degreesAddRotation = function vec3_degreesAddRotation(rotation, out) {
        return Vec3Utils.degreesAddRotation(this, ...arguments);
    };

    vec3Extension.vec3_degreesAddRotationDegrees = function vec3_degreesAddRotationDegrees(rotation, out = vec3_create()) {
        return Vec3Utils.degreesAddRotationDegrees(this, ...arguments);
    };

    vec3Extension.vec3_degreesAddRotationRadians = function vec3_degreesAddRotationRadians(rotation, out = vec3_create()) {
        return Vec3Utils.degreesAddRotationRadians(this, ...arguments);
    };

    vec3Extension.vec3_degreesAddRotationQuat = function vec3_degreesAddRotationQuat(rotation, out = vec3_create()) {
        return Vec3Utils.degreesAddRotationQuat(this, ...arguments);
    };

    vec3Extension.vec3_radiansAddRotation = function vec3_radiansAddRotation(rotation, out) {
        return Vec3Utils.radiansAddRotation(this, ...arguments);
    };

    vec3Extension.vec3_radiansAddRotationDegrees = function vec3_radiansAddRotationDegrees(rotation, out = vec3_create()) {
        return Vec3Utils.radiansAddRotationDegrees(this, ...arguments);
    };

    vec3Extension.vec3_radiansAddRotationRadians = function vec3_radiansAddRotationRadians(rotation, out = vec3_create()) {
        return Vec3Utils.radiansAddRotationRadians(this, ...arguments);
    };

    vec3Extension.vec3_radiansAddRotationQuat = function vec3_radiansAddRotationQuat(rotation, out = vec3_create()) {
        return Vec3Utils.radiansAddRotationQuat(this, ...arguments);
    };

    vec3Extension.vec3_toMatrix = function vec3_toMatrix(out = mat3_create()) {
        return Vec3Utils.toMatrix(this, ...arguments);
    };

    vec3Extension.vec3_degreesToMatrix = function vec3_degreesToMatrix(out = mat3_create()) {
        return Vec3Utils.degreesToMatrix(this, ...arguments);
    };

    vec3Extension.vec3_radiansToMatrix = function vec3_radiansToMatrix(out = mat3_create()) {
        return Vec3Utils.radiansToMatrix(this, ...arguments);
    };

    vec3Extension.vec3_rotationTo = function vec3_rotationTo(direction, out) {
        return Vec3Utils.rotationTo(this, ...arguments);
    };

    vec3Extension.vec3_rotationToDegrees = function vec3_rotationToDegrees(direction, out = vec3_create()) {
        return Vec3Utils.rotationToDegrees(this, ...arguments);
    };

    vec3Extension.vec3_rotationToRadians = function vec3_rotationToRadians(direction, out = vec3_create()) {
        return Vec3Utils.rotationToRadians(this, ...arguments);
    };

    vec3Extension.vec3_rotationToQuat = function vec3_rotationToQuat(direction, out = quat_create()) {
        return Vec3Utils.rotationToQuat(this, ...arguments);
    };

    vec3Extension.vec3_rotationToPivoted = function vec3_rotationToPivoted(direction, pivotAxis, out) {
        return Vec3Utils.rotationToPivoted(this, ...arguments);
    };

    vec3Extension.vec3_rotationToPivotedDegrees = function vec3_rotationToPivotedDegrees(direction, pivotAxis, out = vec3_create()) {
        return Vec3Utils.rotationToPivotedDegrees(this, ...arguments);
    };

    vec3Extension.vec3_rotationToPivotedRadians = function vec3_rotationToPivotedRadians(direction, pivotAxis, out = vec3_create()) {
        return Vec3Utils.rotationToPivotedRadians(this, ...arguments);
    };

    vec3Extension.vec3_rotationToPivotedQuat = function vec3_rotationToPivotedQuat(direction, pivotAxis, out = quat_create()) {
        return Vec3Utils.rotationToPivotedQuat(this, ...arguments);
    };

    vec3Extension.vec3_lerp = function vec3_lerp(to, interpolationValue, out = vec3_create()) {
        return Vec3Utils.lerp(this, ...arguments);
    };

    vec3Extension.vec3_interpolate = function vec3_interpolate(to, interpolationValue, easingFunction = EasingFunction.linear, out = vec3_create()) {
        return Vec3Utils.interpolate(this, ...arguments);
    };

    // VECTOR 4

    let vec4Extension = {};

    // glMatrix Bridge

    vec4Extension.vec4_set = function vec4_set(x, y, z, w) {
        return Vec4Utils.set(this, ...arguments);
    };

    vec4Extension.vec4_copy = function vec4_copy(vector) {
        return Vec4Utils.set(vector, this);
    };

    vec4Extension.vec4_clone = function vec4_clone(out = vec4_create()) {
        return Vec4Utils.set(this, ...arguments);
    };

    // QUAT

    // glMatrix Bridge

    arrayExtension.quat_normalize = function quat_normalize(out = quat_create()) {
        glMatrix.quat.normalize(out, this);
        return out;
    };

    arrayExtension.quat_copy = function quat_copy(quat) {
        glMatrix.quat.copy(this, quat);
        return this;
    };

    arrayExtension.quat_clone = function quat_clone(out = quat_create()) {
        out.quat_copy(this);
        return out;
    };

    arrayExtension.quat_identity = function quat_identity() {
        glMatrix.quat.identity(this);
        return this;
    };

    arrayExtension.quat_length = function quat_length() {
        return glMatrix.quat.length(this);
    };

    arrayExtension.quat_lengthSquared = function quat_lengthSquared() {
        return glMatrix.quat.squaredLength(this);
    };

    arrayExtension.quat_invert = function quat_invert(out = quat_create()) {
        glMatrix.quat.invert(out, this);
        return out;
    };

    arrayExtension.quat_conjugate = function quat_conjugate(out = quat_create()) {
        glMatrix.quat.conjugate(out, this);
        return out;
    };

    arrayExtension.quat_mul = function quat_mul(rotation, out = quat_create()) {
        glMatrix.quat.mul(out, this, rotation);
        return out;
    };

    arrayExtension.quat_getAxis = function () {
        let zero = vec3_create(0, 0, 0);
        return function quat_getAxis(out = vec3_create()) {
            let angle = glMatrix.quat.getAxisAngle(out, this);
            if (angle <= Math.PP_EPSILON) {
                out.vec3_copy(zero);
            }
            return out;
        };
    }();

    arrayExtension.quat_getAngle = function quat_getAngle() {
        return this.quat_getAngleDegrees();
    };


    arrayExtension.quat_getAngleDegrees = function quat_getAngleDegrees() {
        let angle = this.quat_getAngleRadians();
        return Math.pp_toDegrees(angle);
    };

    arrayExtension.quat_getAngleRadians = function () {
        let vector = vec3_create();
        return function quat_getAngleRadians() {
            let angle = glMatrix.quat.getAxisAngle(vector, this);
            return angle;
        };
    }();

    arrayExtension.quat_getAxisScaled = function quat_getAxisScaled(out = vec3_create()) {
        return this.quat_getAxisScaledDegrees(out);
    };

    arrayExtension.quat_getAxisScaledDegrees = function quat_getAxisScaledDegrees(out = vec3_create()) {
        this.quat_getAxis(out);
        let angle = this.quat_getAngleDegrees();
        out.vec3_scale(angle, out);
        return out;
    };

    arrayExtension.quat_getAxisScaledRadians = function () {
        let zero = vec3_create(0, 0, 0);
        return function quat_getAxisScaledRadians(out = vec3_create()) {
            this.quat_getAxis(out);
            let angle = this.quat_getAngleRadians();
            if (angle <= Math.PP_EPSILON) {
                out.vec3_copy(zero);
            } else {
                out.vec3_scale(angle, out);
            }
            return out;
        };
    }();

    arrayExtension.quat_getAxes = function quat_getAxes(out = [vec3_create(), vec3_create(), vec3_create()]) {
        this.quat_getLeft(out[0]);
        this.quat_getUp(out[1]);
        this.quat_getForward(out[2]);

        return out;
    };

    arrayExtension.quat_getForward = function () {
        let rotationMatrix = mat3_create();
        return function quat_getForward(out = vec3_create()) {
            this.quat_toMatrix(rotationMatrix);

            out.vec3_set(rotationMatrix[6], rotationMatrix[7], rotationMatrix[8]);
            out.vec3_normalize(out);

            return out;
        };
    }();

    arrayExtension.quat_getBackward = function quat_getBackward(out) {
        out = this.quat_getForward(out);
        out.vec3_negate(out);
        return out;
    };

    arrayExtension.quat_getLeft = function () {
        let rotationMatrix = mat3_create();
        return function quat_getLeft(out = vec3_create()) {
            this.quat_toMatrix(rotationMatrix);

            out.vec3_set(rotationMatrix[0], rotationMatrix[1], rotationMatrix[2]);
            out.vec3_normalize(out);

            return out;
        };
    }();

    arrayExtension.quat_getRight = function quat_getRight(out) {
        out = this.quat_getLeft(out);
        out.vec3_negate(out);
        return out;
    };

    arrayExtension.quat_getUp = function () {
        let rotationMatrix = mat3_create();
        return function quat_getUp(out = vec3_create()) {
            this.quat_toMatrix(rotationMatrix);

            out.vec3_set(rotationMatrix[3], rotationMatrix[4], rotationMatrix[5]);
            out.vec3_normalize(out);

            return out;
        };
    }();

    arrayExtension.quat_getDown = function quat_getDown(out) {
        out = this.quat_getUp(out);
        out.vec3_negate(out);
        return out;
    };

    arrayExtension.quat_setAxes = function quat_setAxes(left, up, forward) {
        if (forward != null) {
            return this.quat_setForward(forward, up, left);
        } else if (up != null) {
            return this.quat_setUp(up, forward, left);
        } else {
            return this.quat_setLeft(left, up, forward);
        }
    };

    arrayExtension.quat_setForward = function quat_setForward(forward, up = null, left = null) {
        return _quat_setAxes(this, [left, up, forward], [2, 1, 0]);
    };

    arrayExtension.quat_setBackward = function () {
        let forward = vec3_create();
        return function quat_setBackward(backward, up = null, left = null) {
            backward.vec3_negate(forward);
            return _quat_setAxes(this, [left, up, forward], [2, 1, 0]);
        };
    }();

    arrayExtension.quat_setUp = function quat_setUp(up, forward = null, left = null) {
        return _quat_setAxes(this, [left, up, forward], [1, 2, 0]);
    };

    arrayExtension.quat_setDown = function () {
        let up = vec3_create();
        return function quat_setDown(down, forward = null, left = null) {
            down.vec3_negate(up);
            return _quat_setAxes(this, [left, up, forward], [1, 2, 0]);
        };
    }();

    arrayExtension.quat_setLeft = function quat_setLeft(left, up = null, forward = null) {
        return _quat_setAxes(this, [left, up, forward], [0, 1, 2]);
    };

    arrayExtension.quat_setRight = function () {
        let left = vec3_create();
        return function quat_setRight(right, up = null, forward = null) {
            right.vec3_negate(left);
            return _quat_setAxes(this, [left, up, forward], [0, 1, 2]);
        };
    }();

    arrayExtension.quat_toWorld = function quat_toWorld(parentQuat, out = quat_create()) {
        parentQuat.quat_mul(this, out);
        return out;
    };

    arrayExtension.quat_toLocal = function () {
        let invertQuat = quat_create();
        return function quat_toLocal(parentQuat, out = quat_create()) {
            parentQuat.quat_conjugate(invertQuat);
            invertQuat.quat_mul(this, out);
            return out;
        };
    }();

    arrayExtension.quat_fromAxis = function quat_fromAxis(angle, axis) {
        return this.quat_fromAxisDegrees(angle, axis);
    };

    arrayExtension.quat_fromAxisDegrees = function quat_fromAxisDegrees(angle, axis) {
        this.quat_fromAxisRadians(Math.pp_toRadians(angle), axis);
        return this;
    };

    arrayExtension.quat_fromAxisRadians = function quat_fromAxisRadians(angle, axis) {
        glMatrix.quat.setAxisAngle(this, axis, angle);
        return this;
    };

    arrayExtension.quat_fromAxes = function () {
        let mat3 = mat3_create();
        return function quat_fromAxes(leftAxis, upAxis, forwardAxis) {
            mat3.mat3_fromAxes(leftAxis, upAxis, forwardAxis);
            return mat3.mat3_toQuat(this);
        };
    }();

    // New Functions

    arrayExtension.quat_fromRadians = function () {
        let vector = vec3_create();
        return function quat_fromRadians(radiansRotation) {
            radiansRotation.vec3_toDegrees(vector);
            return this.quat_fromDegrees(vector);
        };
    }();

    arrayExtension.quat_fromDegrees = function quat_fromDegrees(degreesRotation) {
        glMatrix.quat.fromEuler(this, degreesRotation[0], degreesRotation[1], degreesRotation[2]);
        return this;
    };

    arrayExtension.quat_toRadians = function () {
        let mat3 = mat3_create();
        return function quat_toRadians(out = vec3_create()) {
            this.quat_toMatrix(mat3);

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

    arrayExtension.quat_toDegrees = function quat_toDegrees(out = vec3_create()) {
        this.quat_toRadians(out);
        out.vec3_toDegrees(out);
        return out;
    };

    arrayExtension.quat_isNormalized = function quat_isNormalized(epsilon = Math.PP_EPSILON) {
        return Math.abs(this.quat_lengthSquared() - 1) < epsilon;
    };

    arrayExtension.quat_addRotation = function quat_addRotation(rotation, out) {
        return this.quat_addRotationDegrees(rotation, out);
    };

    arrayExtension.quat_addRotationDegrees = function () {
        let quat = quat_create();
        return function quat_addRotationDegrees(rotation, out) {
            rotation.vec3_degreesToQuat(quat);
            return this.quat_addRotationQuat(quat, out);
        };
    }();

    arrayExtension.quat_addRotationRadians = function () {
        let quat = quat_create();
        return function quat_addRotationRadians(rotation, out) {
            rotation.vec3_radiansToQuat(quat);
            return this.quat_addRotationQuat(quat, out);
        };
    }();

    arrayExtension.quat_addRotationQuat = function quat_addRotationQuat(rotation, out = quat_create()) {
        rotation.quat_mul(this, out);
        return out;
    };

    arrayExtension.quat_subRotation = function quat_subRotation(rotation, out) {
        return this.quat_subRotationDegrees(rotation, out);
    };

    arrayExtension.quat_subRotationDegrees = function () {
        let quat = quat_create();
        return function quat_subRotationDegrees(rotation, out) {
            rotation.vec3_degreesToQuat(quat);
            return this.quat_subRotationQuat(quat, out);
        };
    }();

    arrayExtension.quat_subRotationRadians = function () {
        let quat = quat_create();
        return function quat_subRotationRadians(rotation, out) {
            rotation.vec3_radiansToQuat(quat);
            return this.quat_subRotationQuat(quat, out);
        };
    }();

    arrayExtension.quat_subRotationQuat = function () {
        let inverse = quat_create();
        return function quat_subRotationQuat(rotation, out = quat_create()) {
            rotation.quat_invert(inverse);
            this.quat_mul(inverse, out);

            if (this.quat_isNormalized() && rotation.quat_isNormalized()) {
                // I would normally not normalize this result since you may want the untouched sub
                // But for normalized params it should be normalized
                // It seems though that for some small error the quat will not be exactly normalized, so I fix it
                out.quat_normalize(out);
            }

            return out;
        };
    }();

    arrayExtension.quat_rotationTo = function quat_rotationTo(rotation, out) {
        return this.quat_rotationToDegrees(rotation, out);
    };

    arrayExtension.quat_rotationToDegrees = function () {
        let rotationQuat = quat_create();
        return function quat_rotationToDegrees(rotation, out) {
            rotation.vec3_degreesToQuat(rotationQuat);
            return this.quat_rotationToQuat(rotationQuat, out);
        };
    }();

    arrayExtension.quat_rotationToRadians = function () {
        let rotationQuat = quat_create();
        return function quat_rotationToRadians(rotation, out) {
            rotation.vec3_radiansToQuat(rotationQuat);
            return this.quat_rotationToQuat(rotationQuat, out);
        };
    }();

    arrayExtension.quat_rotationToQuat = function quat_rotationToQuat(rotation, out) {
        return rotation.quat_subRotationQuat(this, out);
    };

    arrayExtension.quat_getTwist = function () {
        let rotationAxis = vec3_create();
        let projection = vec3_create();
        let rotationAlongAxis = quat_create();
        return function quat_getTwist(axis, out = quat_create()) {
            rotationAxis[0] = this[0];
            rotationAxis[1] = this[1];
            rotationAxis[2] = this[2];

            let dotProd = axis.vec3_dot(rotationAxis);
            axis.vec3_scale(dotProd, projection);
            rotationAlongAxis[0] = projection[0];
            rotationAlongAxis[1] = projection[1];
            rotationAlongAxis[2] = projection[2];
            rotationAlongAxis[3] = this[3];
            rotationAlongAxis.quat_normalize(rotationAlongAxis);
            if (dotProd < 0) {
                rotationAlongAxis[0] = -rotationAlongAxis[0];
                rotationAlongAxis[1] = -rotationAlongAxis[1];
                rotationAlongAxis[2] = -rotationAlongAxis[2];
                rotationAlongAxis[3] = -rotationAlongAxis[3];
            }

            return out.quat_copy(rotationAlongAxis);
        };
    }();

    arrayExtension.quat_getSwing = function () {
        let twist = quat_create();
        return function quat_getSwing(axis, out = quat_create()) {
            this.quat_getTwist(axis, twist);
            this.quat_getSwingFromTwist(twist, out);
            return out;
        };
    }();

    arrayExtension.quat_getSwingFromTwist = function quat_getSwingFromTwist(twist, out = quat_create()) {
        return this.quat_subRotationQuat(twist, out);
    };

    arrayExtension.quat_getTwistFromSwing = function () {
        let inverse = quat_create();
        return function quat_getTwistFromSwing(swing, out = quat_create()) {
            swing.quat_invert(inverse);
            this.quat_addRotationQuat(inverse, out);
            return out;
        };
    }();

    arrayExtension.quat_fromTwistSwing = function quat_fromTwistSwing(twist, swing) {
        return twist.quat_addRotationQuat(swing, this);
    };

    arrayExtension.quat_toMatrix = function quat_toMatrix(out = mat3_create()) {
        glMatrix.mat3.fromQuat(out, this);
        return out;
    };

    arrayExtension.quat_rotate = function quat_rotate(rotation, out) {
        return this.quat_rotateDegrees(rotation, out);
    };

    arrayExtension.quat_rotateDegrees = function quat_rotateDegrees(rotation, out) {
        return this.quat_addRotationDegrees(rotation, out);
    };

    arrayExtension.quat_rotateRadians = function quat_rotateRadians(rotation, out) {
        return this.quat_addRotationRadians(rotation, out);
    };

    arrayExtension.quat_rotateQuat = function quat_rotateQuat(rotation, out) {
        return this.quat_addRotationQuat(rotation, out);
    };

    arrayExtension.quat_rotateAxis = function quat_rotateAxis(angle, axis, out) {
        return this.quat_rotateAxisDegrees(angle, axis, out);
    };

    arrayExtension.quat_rotateAxisDegrees = function () {
        let rotationQuat = quat_create();
        return function quat_rotateAxisDegrees(angle, axis, out) {
            rotationQuat.quat_fromAxisDegrees(angle, axis);
            return this.quat_rotateQuat(rotationQuat, out);
        };
    }();

    arrayExtension.quat_rotateAxisRadians = function () {
        let rotationQuat = quat_create();
        return function quat_rotateAxisRadians(angle, axis, out) {
            rotationQuat.quat_fromAxisRadians(angle, axis);
            return this.quat_rotateQuat(rotationQuat, out);
        };
    }();

    arrayExtension.quat_lerp = function quat_lerp(to, interpolationValue, out = quat_create()) {
        if (interpolationValue <= 0) {
            out.quat_copy(this);
            return out;
        } else if (interpolationValue >= 1) {
            out.quat_copy(to);
            return out;
        }

        glMatrix.quat.lerp(out, this, to, interpolationValue);
        return out;
    };

    arrayExtension.quat_interpolate = function quat_interpolate(to, interpolationValue, easingFunction = EasingFunction.linear, out = quat_create()) {
        let lerpValue = easingFunction(interpolationValue);
        return this.quat_lerp(to, lerpValue, out);
    };

    arrayExtension.quat_slerp = function quat_slerp(to, interpolationValue, out = quat_create()) {
        if (interpolationValue <= 0) {
            out.quat_copy(this);
            return out;
        } else if (interpolationValue >= 1) {
            out.quat_copy(to);
            return out;
        }

        glMatrix.quat.slerp(out, this, to, interpolationValue);
        return out;
    };

    arrayExtension.quat_sinterpolate = function quat_sinterpolate(to, interpolationValue, easingFunction = EasingFunction.linear, out = quat_create()) {
        let lerpValue = easingFunction(interpolationValue);
        return this.quat_slerp(to, lerpValue, out);
    };

    // QUAT 2

    // glMatrix Bridge

    arrayExtension.quat2_normalize = function quat2_normalize(out = quat2_create()) {
        glMatrix.quat2.normalize(out, this);
        return out;
    };

    arrayExtension.quat2_invert = function quat2_invert(out = quat2_create()) {
        glMatrix.quat2.invert(out, this);
        return out;
    };

    arrayExtension.quat2_conjugate = function quat2_conjugate(out = quat2_create()) {
        glMatrix.quat2.conjugate(out, this);
        return out;
    };

    arrayExtension.quat2_copy = function quat2_copy(quat2) {
        glMatrix.quat2.copy(this, quat2);
        return this;
    };

    arrayExtension.quat2_identity = function quat2_identity() {
        glMatrix.quat2.identity(this);
        return this;
    };

    arrayExtension.quat2_getPosition = function quat2_getPosition(out = vec3_create()) {
        glMatrix.quat2.getTranslation(out, this);
        return out;
    };

    arrayExtension.quat2_getRotation = function quat2_getRotation(out) {
        return this.quat2_getRotationDegrees(out);
    };
    arrayExtension.quat2_getRotationDegrees = function () {
        let rotationQuat = quat_create();
        return function quat2_getRotationDegrees(out = vec3_create()) {
            this.quat2_getRotationQuat(rotationQuat).quat_toDegrees(out);
            return out;
        };
    }();

    arrayExtension.quat2_getRotationRadians = function () {
        let rotationQuat = quat_create();
        return function quat2_getRotationRadians(out = vec3_create()) {
            this.quat2_getRotationQuat(rotationQuat).quat_toRadians(out);
            return out;
        };
    }();

    arrayExtension.quat2_getRotationQuat = function quat2_getRotationQuat(out = quat_create()) {
        out.quat_copy(this);
        return out;
    };

    arrayExtension.quat2_setPosition = function () {
        let rotationQuat = quat_create();
        return function quat2_setPosition(position) {
            this.quat2_getRotationQuat(rotationQuat);
            this.quat2_setPositionRotationQuat(position, rotationQuat);
            return this;
        };
    }();

    arrayExtension.quat2_setRotation = function quat2_setRotation(rotation) {
        return this.quat2_setRotationDegrees(rotation);
    };

    arrayExtension.quat2_setRotationDegrees = function () {
        let position = vec3_create();
        return function quat2_setRotationDegrees(rotation) {
            this.quat2_getPosition(position);
            this.quat2_setPositionRotationDegrees(position, rotation);
            return this;
        };
    }();

    arrayExtension.quat2_setRotationRadians = function () {
        let position = vec3_create();
        return function quat2_setRotationRadians(rotation) {
            this.quat2_getPosition(position);
            this.quat2_setPositionRotationRadians(position, rotation);
            return this;
        };
    }();

    arrayExtension.quat2_setRotationQuat = function () {
        let position = vec3_create();
        return function quat2_setRotationQuat(rotation) {
            this.quat2_getPosition(position);
            this.quat2_setPositionRotationQuat(position, rotation);
            return this;
        };
    }();

    arrayExtension.quat2_setPositionRotation = function quat2_setPositionRotation(position, rotation) {
        return this.quat2_setPositionRotationDegrees(position, rotation);
    };

    arrayExtension.quat2_setPositionRotationDegrees = function () {
        let rotationQuat = quat_create();
        return function quat2_setPositionRotationDegrees(position, rotation) {
            rotation.vec3_degreesToQuat(rotationQuat);
            this.quat2_setPositionRotationQuat(position, rotationQuat);

            return this;
        };
    }();

    arrayExtension.quat2_setPositionRotationRadians = function () {
        let rotationQuat = quat_create();
        return function quat2_setPositionRotationRadians(position, rotation) {
            rotation.vec3_radiansToQuat(rotationQuat);
            this.quat2_setPositionRotationQuat(position, rotationQuat);
            return this;
        };
    }();

    arrayExtension.quat2_setPositionRotationQuat = function quat2_setPositionRotationQuat(position, rotation) {
        glMatrix.quat2.fromRotationTranslation(this, rotation, position);
        return this;
    };

    // New Functions

    arrayExtension.quat2_isNormalized = function quat2_isNormalized(epsilon = Math.PP_EPSILON) {
        return Math.abs(this.quat2_lengthSquared() - 1) < epsilon;
    };

    arrayExtension.quat2_length = function quat2_length() {
        return glMatrix.quat2.length(this);
    };

    arrayExtension.quat2_lengthSquared = function quat2_lengthSquared() {
        return glMatrix.quat2.squaredLength(this);
    };

    arrayExtension.quat2_mul = function quat2_mul(quat2, out = quat2_create()) {
        glMatrix.quat2.mul(out, this, quat2);
        return out;
    };

    arrayExtension.quat2_getAxes = function quat2_getAxes(out = [vec3_create(), vec3_create(), vec3_create()]) {
        this.quat2_getLeft(out[0]);
        this.quat2_getUp(out[1]);
        this.quat2_getForward(out[2]);

        return out;
    };

    arrayExtension.quat2_getForward = function () {
        let rotationMatrix = mat3_create();
        return function quat2_getForward(out = vec3_create()) {
            this.quat_toMatrix(rotationMatrix);

            out.vec3_set(rotationMatrix[6], rotationMatrix[7], rotationMatrix[8]);
            out.vec3_normalize(out);

            return out;
        };
    }();

    arrayExtension.quat2_getBackward = function quat2_getBackward(out) {
        out = this.quat2_getForward(out);
        out.vec3_negate(out);
        return out;
    };

    arrayExtension.quat2_getLeft = function () {
        let rotationMatrix = mat3_create();
        return function quat2_getLeft(out = vec3_create()) {
            this.quat_toMatrix(rotationMatrix);

            out.vec3_set(rotationMatrix[0], rotationMatrix[1], rotationMatrix[2]);
            out.vec3_normalize(out);

            return out;
        };
    }();

    arrayExtension.quat2_getRight = function quat2_getRight(out) {
        out = this.quat2_getLeft(out);
        out.vec3_negate(out);
        return out;
    };

    arrayExtension.quat2_getUp = function () {
        let rotationMatrix = mat3_create();
        return function quat2_getUp(out = vec3_create()) {
            this.quat_toMatrix(rotationMatrix);

            out.vec3_set(rotationMatrix[3], rotationMatrix[4], rotationMatrix[5]);
            out.vec3_normalize(out);

            return out;
        };
    }();

    arrayExtension.quat2_getDown = function quat2_getDown(out) {
        out = this.quat2_getUp(out);
        out.vec3_negate(out);
        return out;
    };

    arrayExtension.quat2_toWorld = function quat2_toWorld(parentTransformQuat, out = quat2_create()) {
        parentTransformQuat.quat2_mul(this, out);
        return out;
    };

    arrayExtension.quat2_toLocal = function () {
        let invertQuat = quat2_create();
        return function quat2_toLocal(parentTransformQuat, out = quat2_create()) {
            parentTransformQuat.quat2_conjugate(invertQuat);
            invertQuat.quat2_mul(this, out);
            return out;
        };
    }();

    arrayExtension.quat2_rotateAxis = function quat2_rotateAxis(angle, axis, out) {
        return this.quat2_rotateAxisDegrees(angle, axis, out);
    };

    arrayExtension.quat2_rotateAxisDegrees = function quat2_rotateAxisDegrees(angle, axis, out) {
        return this.quat2_rotateAxisRadians(Math.pp_toRadians(angle), axis, out);
    };

    arrayExtension.quat2_rotateAxisRadians = function () {
        let rotationQuat = quat_create();
        return function quat2_rotateAxisRadians(angle, axis, out) {
            this.quat2_getRotationQuat(rotationQuat);
            rotationQuat.quat_rotateAxisRadians(angle, axis, rotationQuat);
            out.quat2_copy(this);
            out.quat2_setRotationQuat(rotationQuat);
            return out;
        };
    }();

    arrayExtension.quat2_toMatrix = function quat2_toMatrix(out = mat4_create()) {
        glMatrix.mat4.fromQuat2(out, this);
        return out;
    };

    arrayExtension.quat2_fromMatrix = function quat2_fromMatrix(mat4) {
        mat4.mat4_toQuat(this);
        return this;
    };

    arrayExtension.quat2_lerp = function quat2_lerp(to, interpolationValue, out = quat2_create()) {
        if (interpolationValue <= 0) {
            out.quat2_copy(this);
            return out;
        } else if (interpolationValue >= 1) {
            out.quat2_copy(to);
            return out;
        }

        glMatrix.quat2.lerp(out, this, to, interpolationValue);
        return out;
    };

    arrayExtension.quat2_interpolate = function quat2_interpolate(to, interpolationValue, easingFunction = EasingFunction.linear, out = quat2_create()) {
        let lerpValue = easingFunction(interpolationValue);
        return this.quat2_lerp(to, lerpValue, out);
    };

    // MATRIX 3

    let mat3Extension = {};

    // glMatrix Bridge

    mat3Extension.mat3_set = function mat3_set(
        m00, m01, m02,
        m10, m11, m12,
        m20, m21, m22) {
        return Mat3Utils.set(this, ...arguments);
    };

    // New Functions

    mat3Extension.mat3_toDegrees = function mat3_toDegrees(out = vec3_create()) {
        return Mat3Utils.toDegrees(this, ...arguments);
    };

    mat3Extension.mat3_toRadians = function mat3_toRadians(out = vec3_create()) {
        return Mat3Utils.toRadians(this, ...arguments);
    };

    mat3Extension.mat3_toQuat = function mat3_toQuat(out = quat_create()) {
        return Mat3Utils.toQuat(this, ...arguments);
    };
    mat3Extension.mat3_fromAxes = function mat3_fromAxes(leftAxis, upAxis, forwardAxis) {
        return Mat3Utils.fromAxes(this, ...arguments);
    };

    // MATRIX 4

    let mat4Extension = {};

    // glMatrix Bridge

    mat4Extension.mat4_set = function mat4_set(
        m00, m01, m02, m03,
        m10, m11, m12, m13,
        m20, m21, m22, m23,
        m30, m31, m32, m33) {
        return Mat4Utils.set(this, ...arguments);
    };

    mat4Extension.mat4_copy = function mat4_copy(matrix) {
        return Mat4Utils.copy(matrix, this);
    };

    mat4Extension.mat4_identity = function mat4_identity() {
        return Mat4Utils.identity(this, ...arguments);
    };

    mat4Extension.mat4_invert = function mat4_invert(out = mat4_create()) {
        return Mat4Utils.invert(this, ...arguments);
    };

    mat4Extension.mat4_mul = function mat4_mul(matrix, out = mat4_create()) {
        return Mat4Utils.mul(this, ...arguments);
    };

    mat4Extension.mat4_scale = function mat4_scale(vector, out = mat4_create()) {
        return Mat4Utils.scale(this, ...arguments);
    };

    mat4Extension.mat4_clone = function mat4_clone(out = mat4_create()) {
        return Mat4Utils.clone(this, ...arguments);
    };

    mat4Extension.mat4_getPosition = function mat4_getPosition(out = vec3_create()) {
        return Mat4Utils.getPosition(this, ...arguments);
    };

    mat4Extension.mat4_getRotation = function mat4_getRotation(out = vec3_create()) {
        return Mat4Utils.getRotation(this, ...arguments);
    };

    mat4Extension.mat4_getRotationDegrees = function mat4_getRotationDegrees(out = vec3_create()) {
        return Mat4Utils.getRotationDegrees(this, ...arguments);
    };

    mat4Extension.mat4_getRotationRadians = function mat4_getRotationRadians(out = vec3_create()) {
        return Mat4Utils.getRotationRadians(this, ...arguments);
    };

    mat4Extension.mat4_getRotationQuat = function mat4_getRotationQuat(out = quat_create()) {
        return Mat4Utils.getRotationQuat(this, ...arguments);
    };

    mat4Extension.mat4_getScale = function mat4_getScale(out = vec3_create()) {
        return Mat4Utils.getScale(this, ...arguments);
    };

    // New Functions

    mat4Extension.mat4_setPosition = function mat4_setPosition(position) {
        return Mat4Utils.setPosition(this, ...arguments);
    };

    mat4Extension.mat4_setRotation = function mat4_setRotation(rotation) {
        return Mat4Utils.setRotation(this, ...arguments);
    };

    mat4Extension.mat4_setRotationDegrees = function mat4_setRotationDegrees(rotation) {
        return Mat4Utils.setRotationDegrees(this, ...arguments);
    };

    mat4Extension.mat4_setRotationRadians = function mat4_setRotationRadians(rotation) {
        return Mat4Utils.setRotationRadians(this, ...arguments);
    };

    mat4Extension.mat4_setRotationQuat = function mat4_setRotationQuat(rotation) {
        return Mat4Utils.setRotationQuat(this, ...arguments);
    };

    mat4Extension.mat4_setScale = function mat4_setScale(scale) {
        return Mat4Utils.setScale(this, ...arguments);
    };

    mat4Extension.mat4_setPositionRotationScale = function mat4_setPositionRotationScale(position, rotation, scale) {
        return Mat4Utils.setPositionRotationScale(this, ...arguments);
    };

    mat4Extension.mat4_setPositionRotationDegreesScale = function mat4_setPositionRotationDegreesScale(position, rotation, scale) {
        return Mat4Utils.setPositionRotationDegreesScale(this, ...arguments);
    };

    mat4Extension.mat4_setPositionRotationRadiansScale = function mat4_setPositionRotationRadiansScale(position, rotation, scale) {
        return Mat4Utils.setPositionRotationRadiansScale(this, ...arguments);
    };

    mat4Extension.mat4_setPositionRotationQuatScale = function mat4_setPositionRotationQuatScale(position, rotation, scale) {
        return Mat4Utils.setPositionRotationQuatScale(this, ...arguments);
    };

    mat4Extension.mat4_setPositionRotation = function mat4_setPositionRotation(position, rotation) {
        return Mat4Utils.setPositionRotation(this, ...arguments);
    };

    mat4Extension.mat4_setPositionRotationDegrees = function mat4_setPositionRotationDegrees(position, rotation) {
        return Mat4Utils.setPositionRotationDegrees(this, ...arguments);
    };

    mat4Extension.mat4_setPositionRotationRadians = function mat4_setPositionRotationRadians(position, rotation) {
        return Mat4Utils.setPositionRotationRadians(this, ...arguments);
    };

    mat4Extension.mat4_setPositionRotationQuat = function mat4_setPositionRotationQuat(position, rotation) {
        return Mat4Utils.setPositionRotationQuat(this, ...arguments);
    };

    mat4Extension.mat4_getAxes = function mat4_getAxes(out = [vec3_create(), vec3_create(), vec3_create()]) {
        return Mat4Utils.getAxes(this, ...arguments);
    };

    mat4Extension.mat4_getForward = function mat4_getForward(out = vec3_create()) {
        return Mat4Utils.getForward(this, ...arguments);
    };

    mat4Extension.mat4_getBackward = function mat4_getBackward(out) {
        return Mat4Utils.getBackward(this, ...arguments);
    };

    mat4Extension.mat4_getLeft = function mat4_getLeft(out = vec3_create()) {
        return Mat4Utils.getLeft(this, ...arguments);
    };

    mat4Extension.mat4_getRight = function mat4_getRight(out) {
        return Mat4Utils.getRight(this, ...arguments);
    };

    mat4Extension.mat4_getUp = function mat4_getUp(out = vec3_create()) {
        return Mat4Utils.getUp(this, ...arguments);
    };

    mat4Extension.mat4_getDown = function mat4_getDown(out) {
        return Mat4Utils.getDown(this, ...arguments);
    };

    mat4Extension.mat4_toWorld = function mat4_toWorld(parentTransformMatrix, out = mat4_create()) {
        return Mat4Utils.toWorld(this, ...arguments);
    };

    mat4Extension.mat4_toLocal = function mat4_toLocal(parentTransformMatrix, out = mat4_create()) {
        return Mat4Utils.toLocal(this, ...arguments);
    };

    mat4Extension.mat4_hasUniformScale = function mat4_hasUniformScale() {
        return Mat4Utils.hasUniformScale(this, ...arguments);
    };

    mat4Extension.mat4_toQuat = function mat4_toQuat(out = quat2_create()) {
        return Mat4Utils.toQuat(this, ...arguments);
    };

    mat4Extension.mat4_fromQuat = function mat4_fromQuat(quat) {
        return Mat4Utils.fromQuat(quat, this);
    };



    let arrayPrototypesToExtend = [
        Array.prototype, Uint8ClampedArray.prototype, Uint8Array.prototype, Uint16Array.prototype, Uint32Array.prototype, Int8Array.prototype,
        Int16Array.prototype, Int32Array.prototype, Float32Array.prototype, Float64Array.prototype];

    for (let arrayPrototypeToExtend of arrayPrototypesToExtend) {
        PluginUtils.injectProperties(ppExtension, arrayPrototypeToExtend, false, true, true);

        PluginUtils.injectProperties(vecExtension, arrayPrototypeToExtend, false, true, true);

        PluginUtils.injectProperties(vec2Extension, arrayPrototypeToExtend, false, true, true);
        PluginUtils.injectProperties(vec3Extension, arrayPrototypeToExtend, false, true, true);
        PluginUtils.injectProperties(vec4Extension, arrayPrototypeToExtend, false, true, true);

        PluginUtils.injectProperties(mat3Extension, arrayPrototypeToExtend, false, true, true);
        PluginUtils.injectProperties(mat4Extension, arrayPrototypeToExtend, false, true, true);

        PluginUtils.injectProperties(arrayExtension, arrayPrototypeToExtend, false, true, true);
    }
}



function _vec_buildConsoleMessage(vector, decimalPlaces) {
    let message = "[";

    for (let i = 0; i < vector.length; i++) {
        if (i != 0) {
            message = message.concat(", ");
        }

        if (decimalPlaces != null) {
            message = message.concat(vector[i].toFixed(decimalPlaces));
        } else {
            message = message.concat(vector[i].toString());
        }
    }

    message = message.concat("]");
    return message;
};

function _vec_prepareOut(vector, out) {
    if (out == null) {
        out = vector.pp_clone();
    } else if (out != vector) {
        out.pp_copy(vector);
    }

    return out;
};

function _findAllEqualOptimized(array, elementToFind, getIndexes) {
    // Adapted from: https:// stackoverflow.com/a/20798567

    let elementsFound = [];
    let index = -1;
    while ((index = array.indexOf(elementToFind, index + 1)) >= 0) {
        elementsFound.push(getIndexes ? index : array[index]);
    }

    return elementsFound;
};

let _quat_setAxes = function () {
    let fixedAxes = [vec3_create(), vec3_create(), vec3_create()];

    let fixedAxesFixSignMap = [
        [1, -1, 1],
        [1, 1, -1],
        [-1, 1, -1]
    ];

    let fixedLeft = vec3_create();
    let fixedUp = vec3_create();
    let fixedForward = vec3_create();

    let currentAxis = vec3_create();

    let rotationAxis = vec3_create();
    let rotationMat = mat3_create();
    let rotationQuat = quat_create();
    return function _quat_setAxes(vector, axes, priority) {
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
            rotationQuat.quat_normalize(rotationQuat);

            vector.quat_copy(rotationQuat);
        } else {
            if (priority[0] == 0) {
                vector.quat_getLeft(currentAxis);
            } else if (priority[0] == 1) {
                vector.quat_getUp(currentAxis);
            } else {
                vector.quat_getForward(currentAxis);
            }

            let angleBetween = firstAxis.vec3_angleRadians(currentAxis);
            if (angleBetween > Math.PP_EPSILON) {
                currentAxis.vec3_cross(firstAxis, rotationAxis);
                rotationAxis.vec3_normalize(rotationAxis);
                rotationQuat.quat_fromAxisRadians(angleBetween, rotationAxis);

                vector.quat_rotateQuat(rotationQuat, vector);
            }
        }

        return vector;
    };
}();



function _quat_set(vector, x, y, z, w) {
    if (y === undefined) {
        glMatrix.quat.set(vector, x, x, x, x);
    } else {
        glMatrix.quat.set(vector, x, y, z, w);
    }
    return vector;
};

function _quat2_set(vector, x1, y1, z1, w1, x2, y2, z2, w2) {
    if (y1 === undefined) {
        glMatrix.quat2.set(vector, x1, x1, x1, x1, x1, x1, x1, x1);
    } else {
        glMatrix.quat2.set(vector, x1, y1, z1, w1, x2, y2, z2, w2);
    }
    return vector;
}