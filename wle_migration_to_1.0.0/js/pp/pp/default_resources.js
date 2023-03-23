export class DefaultResources {
    constructor() {
        this.myMeshes = new DefaultMeshes();
        this.myMaterials = new DefaultMaterials();
    }
}

export class DefaultMeshes {
    constructor() {
        this.myPlane = null;
        this.myCube = null;
        this.mySphere = null;
        this.myCone = null;
        this.myCylinder = null;
        this.myCircle = null;

        this.myInvertedCube = null;
        this.myInvertedSphere = null;
        this.myInvertedCone = null;
        this.myInvertedCylinder = null;
    }
}

export class DefaultMaterials {
    constructor() {
        this.myFlatOpaque = null;
        this.myFlatTransparentNoDepth = null; // for now the pipeline needs to be the last one to make this work properly
        this.myPhongOpaque = null;
        this.myText = null;
    }
}