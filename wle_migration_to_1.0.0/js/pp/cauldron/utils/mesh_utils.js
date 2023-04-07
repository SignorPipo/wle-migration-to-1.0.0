import { Mesh, MeshAttribute, MeshIndexType } from "@wonderlandengine/api";
import { vec2_create, vec3_create, vec4_create } from "../../plugin/js/extensions/array_extension";
import { getMainEngine } from "../wl/engine_globals";

export class MeshCreationVertexSetup {

    constructor() {
        this.myPosition = null;             // @Vec3
        this.myTextureCoordinates = null;   // @Vec2
        this.myNormal = null;               // @Vec3
        this.myColor = null;                // @Vec4
    }
}

export class MeshCreationTriangleSetup {

    constructor() {
        this.myIndexes = new Uint32Array(3);
    }
}

export class MeshCreationSetup {

    constructor() {
        this.myVertexes = [];
        this.myTriangles = [];
    }
}

export function createPlaneMesh(engine = getMainEngine()) {
    let vertexCount = 4;

    let meshSetup = new MeshCreationSetup();

    for (let i = 0; i < vertexCount; ++i) {
        let vertexSetup = new MeshCreationVertexSetup();

        vertexSetup.myPosition = new vec3_create();
        vertexSetup.myPosition[0] = -1 + (i & 1) * 2;
        vertexSetup.myPosition[1] = -1 + ((i & 2) >> 1) * 2; // This is a quick way to have positions (-1,-1) (1,-1) (1,-1) (1,1)
        vertexSetup.myPosition[2] = 0;

        vertexSetup.myTextureCoordinates = new vec2_create();
        vertexSetup.myTextureCoordinates[0] = (i & 1);
        vertexSetup.myTextureCoordinates[1] = ((i & 2) >> 1);

        vertexSetup.myNormal = new vec3_create();
        vertexSetup.myNormal[0] = 0;
        vertexSetup.myNormal[1] = 0;
        vertexSetup.myNormal[2] = 1;

        meshSetup.myVertexes.push(vertexSetup);
    }

    let firstTriangle = new MeshCreationTriangleSetup();
    firstTriangle.myIndexes[0] = 0;
    firstTriangle.myIndexes[1] = 1;
    firstTriangle.myIndexes[2] = 2;

    let secondTriangle = new MeshCreationTriangleSetup();
    secondTriangle.myIndexes[0] = 2;
    secondTriangle.myIndexes[1] = 1;
    secondTriangle.myIndexes[2] = 3;

    meshSetup.myTriangles.push(firstTriangle);
    meshSetup.myTriangles.push(secondTriangle);

    let mesh = createMesh(meshSetup, engine);

    return mesh;
}

export function createMesh(meshCreationSetup, engine = getMainEngine()) {
    let indexData = [];
    for (let triangle of meshCreationSetup.myTriangles) {
        indexData.push(triangle.myIndexes[0]);
        indexData.push(triangle.myIndexes[1]);
        indexData.push(triangle.myIndexes[2]);
    }

    let indexDataUnsignedInt = new Uint32Array(indexData.length);
    indexDataUnsignedInt.pp_copy(indexData);

    let vertexCount = meshCreationSetup.myVertexes.length;
    let mesh = new Mesh(engine, {
        vertexCount: vertexCount,
        indexData: indexDataUnsignedInt,
        indexType: MeshIndexType.UnsignedInt,
    });

    let positionAttribute = null;
    let textureCoordinatesAttribute = null;
    let normalAttribute = null;
    let colorAttribute = null;

    try {
        positionAttribute = mesh.attribute(MeshAttribute.Position);
    } catch (error) {
        positionAttribute = null;
    }

    try {
        textureCoordinatesAttribute = mesh.attribute(MeshAttribute.TextureCoordinate);
    } catch (error) {
        textureCoordinatesAttribute = null;
    }

    try {
        normalAttribute = mesh.attribute(MeshAttribute.Normal);
    } catch (error) {
        normalAttribute = null;
    }

    try {
        colorAttribute = mesh.attribute(MeshAttribute.Color);
    } catch (error) {
        colorAttribute = null;
    }

    for (let i = 0; i < meshCreationSetup.myVertexes.length; i++) {
        let vertex = meshCreationSetup.myVertexes[i];
        if (positionAttribute != null && vertex.myPosition) {
            positionAttribute.set(i, vertex.myPosition);
        }
        if (textureCoordinatesAttribute != null && vertex.myTextureCoordinates) {
            textureCoordinatesAttribute.set(i, vertex.myTextureCoordinates);
        }
        if (normalAttribute != null && vertex.myNormal) {
            normalAttribute.set(i, vertex.myNormal);
        }
        if (colorAttribute != null && vertex.myColor) {
            colorAttribute.set(i, vertex.myColor);
        }
    }

    return mesh;
}

export let cloneMesh = function () {
    let position = vec3_create();
    let textureCoordinates = vec2_create();
    let normal = vec3_create();
    let color = vec4_create();

    return function cloneMesh(mesh) {
        if (mesh == null) {
            return null;
        }

        let clonedIndexData = mesh.indexData.pp_clone();

        let clonedMesh = new Mesh(mesh.engine, {
            vertexCount: mesh.vertexCount,
            indexData: clonedIndexData,
            indexType: MeshIndexType.UnsignedInt,
        });

        let positionAttribute = null;
        let textureCoordinatesAttribute = null;
        let normalAttribute = null;
        let colorAttribute = null;

        let clonedPositionAttribute = null;
        let clonedTextureCoordinatesAttribute = null;
        let clonedNormalAttribute = null;
        let clonedColorAttribute = null;


        try {
            positionAttribute = mesh.attribute(MeshAttribute.Position);
            clonedPositionAttribute = clonedMesh.attribute(MeshAttribute.Position);
        } catch (error) {
            positionAttribute = null;
            clonedPositionAttribute = null;
        }

        try {
            textureCoordinatesAttribute = mesh.attribute(MeshAttribute.TextureCoordinate);
            clonedTextureCoordinatesAttribute = clonedMesh.attribute(MeshAttribute.TextureCoordinate);
        } catch (error) {
            textureCoordinatesAttribute = null;
            clonedTextureCoordinatesAttribute = null;
        }

        try {
            normalAttribute = mesh.attribute(MeshAttribute.Normal);
            clonedNormalAttribute = clonedMesh.attribute(MeshAttribute.Normal);
        } catch (error) {
            normalAttribute = null;
            clonedNormalAttribute = null;
        }

        try {
            colorAttribute = mesh.attribute(MeshAttribute.Color);
            clonedColorAttribute = clonedMesh.attribute(MeshAttribute.Color);
        } catch (error) {
            colorAttribute = null;
            clonedColorAttribute = null;
        }

        for (let i = 0; i < mesh.vertexCount; i++) {
            if (positionAttribute != null && clonedPositionAttribute != null) {
                clonedPositionAttribute.set(i, positionAttribute.get(i, position));
            }
            if (textureCoordinatesAttribute != null && clonedTextureCoordinatesAttribute != null) {
                clonedTextureCoordinatesAttribute.set(i, textureCoordinatesAttribute.get(i, textureCoordinates));
            }
            if (normalAttribute != null && clonedNormalAttribute != null) {
                clonedNormalAttribute.set(i, normalAttribute.get(i, normal));
            }
            if (colorAttribute != null && clonedColorAttribute != null) {
                clonedColorAttribute.set(i, colorAttribute.get(i, color));
            }
        }

        return clonedMesh;
    };
}();

export let invertMesh = function () {
    let position = vec3_create();
    let textureCoordinates = vec2_create();
    let normal = vec3_create();
    let color = vec4_create();

    return function invertMesh(mesh) {
        if (mesh == null) {
            return null;
        }

        let invertedIndexData = new Uint32Array(mesh.indexData.length);
        for (let i = 0; i < mesh.indexData.length / 3; i++) {
            invertedIndexData[i * 3 + 0] = mesh.indexData[i * 3 + 2];
            invertedIndexData[i * 3 + 1] = mesh.indexData[i * 3 + 1];
            invertedIndexData[i * 3 + 2] = mesh.indexData[i * 3 + 0];
        }

        let invertedMesh = new Mesh(mesh.engine, {
            vertexCount: mesh.vertexCount,
            indexData: invertedIndexData,
            indexType: MeshIndexType.UnsignedInt,
        });

        let positionAttribute = null;
        let textureCoordinatesAttribute = null;
        let normalAttribute = null;
        let colorAttribute = null;

        let invertedPositionAttribute = null;
        let invertedTextureCoordinatesAttribute = null;
        let invertedNormalAttribute = null;
        let invertedColorAttribute = null;


        try {
            positionAttribute = mesh.attribute(MeshAttribute.Position);
            invertedPositionAttribute = invertedMesh.attribute(MeshAttribute.Position);
        } catch (error) {
            positionAttribute = null;
            invertedPositionAttribute = null;
        }

        try {
            textureCoordinatesAttribute = mesh.attribute(MeshAttribute.TextureCoordinate);
            invertedTextureCoordinatesAttribute = invertedMesh.attribute(MeshAttribute.TextureCoordinate);
        } catch (error) {
            textureCoordinatesAttribute = null;
            invertedTextureCoordinatesAttribute = null;
        }

        try {
            normalAttribute = mesh.attribute(MeshAttribute.Normal);
            invertedNormalAttribute = invertedMesh.attribute(MeshAttribute.Normal);
        } catch (error) {
            normalAttribute = null;
            invertedNormalAttribute = null;
        }

        try {
            colorAttribute = mesh.attribute(MeshAttribute.Color);
            invertedColorAttribute = invertedMesh.attribute(MeshAttribute.Color);
        } catch (error) {
            colorAttribute = null;
            invertedColorAttribute = null;
        }

        for (let i = 0; i < mesh.vertexCount; i++) {
            if (positionAttribute != null && invertedPositionAttribute != null) {
                invertedPositionAttribute.set(i, positionAttribute.get(i, position));
            }
            if (textureCoordinatesAttribute != null && invertedTextureCoordinatesAttribute != null) {
                invertedTextureCoordinatesAttribute.set(i, textureCoordinatesAttribute.get(i, textureCoordinates));
            }
            if (normalAttribute != null && invertedNormalAttribute != null) {
                normalAttribute.get(i, normal)
                normal.vec3_negate(normal);
                invertedNormalAttribute.set(i, normal);
            }
            if (colorAttribute != null && invertedColorAttribute != null) {
                invertedColorAttribute.set(i, colorAttribute.get(i, color));
            }
        }

        return invertedMesh;
    };
}();

export let MeshUtils = {
    createPlaneMesh,
    createMesh,
    cloneMesh,
    invertMesh
};