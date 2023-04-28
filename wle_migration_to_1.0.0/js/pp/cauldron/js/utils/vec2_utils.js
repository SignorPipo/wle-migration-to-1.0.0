import * as glMatrix from "gl-matrix";

// glMatrix Bridge

export function create(x, y) {
    let out = glMatrix.vec2.create();
    if (x !== undefined) {
        set(out, x, y);
    }
    return out;
};

export function set(vector, x, y) {
    if (y === undefined) {
        glMatrix.vec2.set(vector, x, x);
    } else {
        glMatrix.vec2.set(vector, x, y);
    }

    return vector;
};

export function length(vector) {
    return glMatrix.vec2.length(vector);
}

export function normalize(vector, out = create()) {
    glMatrix.vec2.normalize(out, vector);
    return out;
}

export function copy(vector, other) {
    glMatrix.vec2.copy(vector, other);
    return vector;
}

export function clone(vector, out = create()) {
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
    create,
    set,
    length,
    normalize,
    copy,
    clone,
    zero,
    isZero
};