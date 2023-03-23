export class VisualData {
    constructor() {
        this.myRootObject = null;
        this.myDefaultMaterials = new VisualDataMaterials();
    }
}

export class VisualDataMaterials {
    constructor() {
        myMesh = null;
        myText = null;
        myRight = null;
        myUp = null;
        myForward = null;
        myRay = null;
        myHitNormal = null;
    }
}