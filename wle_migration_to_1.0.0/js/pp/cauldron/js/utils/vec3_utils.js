import * as glMatrix from "gl-matrix";

// glMatrix Bridge

export function create(x, y, z) {
    let out = glMatrix.vec3.create();

    if (x !== undefined) {
        set(out, x, y, z);
    }

    return out;
}

export function set(vector, x, y, z) {
    if (y === undefined) {
        glMatrix.vec3.set(vector, x, x, x);
    } else {
        glMatrix.vec3.set(vector, x, y, z);
    }

    return vector;
};

export let Vec3Utils = {
    create,
    set
};