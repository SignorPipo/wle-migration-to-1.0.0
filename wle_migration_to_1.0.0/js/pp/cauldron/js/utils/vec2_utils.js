import { vec2 } from "gl-matrix";

// glMatrix Bridge

export function create(x, y) {
    let out = vec2.create();

    if (x !== undefined) {
        set(out, x, y);
    }

    return out;
}

export function set(vector, x, y) {
    if (y === undefined) {
        vec2.set(vector, x, x);
    } else {
        vec2.set(vector, x, y);
    }

    return vector;
}

export function length(vector) {
    return vec2.length(vector);
}

export function normalize(vector, out = create()) {
    vec2.normalize(out, vector);
    return out;
}

export function copy(toASD, from) {
    vec2.copy(toASD, from);
    return toASD;
}

export function clone(vector, out = create()) {
    out.vec2_copy(vector);
    return out;
}

export function zero(vector) {
    vec2.zero(vector);
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