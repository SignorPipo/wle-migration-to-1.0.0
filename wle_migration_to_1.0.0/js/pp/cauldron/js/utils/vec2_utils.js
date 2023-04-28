import * as glMatrix from "gl-matrix";

// glMatrix Bridge

export function length(vector) {
    return glMatrix.vec2.length(vector);
}

export function normalize(vector, out = vec2_create()) {
    glMatrix.vec2.normalize(out, vector);
    return out;
}

export function copy(vector, other) {
    glMatrix.vec2.copy(vector, other);
    return vector;
}

export function clone(vector, out = vec2_create()) {
    out.vec2_copy(vector);
    return out;
}

export function zero(vector) {
    glMatrix.vec2.zero(vector);
    return vector;
}

// New Functions

export function isZero(vector, epsilon = 0) {
    return length(vector) <= epsilon;
}

export let Vec2Utils = {
    length,
    normalize,
    copy,
    clone,
    zero,
    isZero
};