export class SceneObjects {

    constructor() {
        this.myScene = null;

        this.myCauldron = null;
        this.myDynamics = null;
        this.myParticles = null;
        this.myVisualElements = null;
        this.myTools = null;

        this.myPlayerObjects = new PlayerObjects();
    }
}

export class PlayerObjects {

    constructor() {
        this.myPlayer = null;
        this.myPlayerCauldron = null;
        this.myPlayerPivot = null;

        this.myCameraNonVR = null;

        this.myEyes = [];
        this.myEyeLeft = null;
        this.myEyeRight = null;

        this.myHeadNonVR = null;
        this.myHeadVR = null;
        this.myHead = null;

        this.myHands = [];
        this.myHandLeft = null;
        this.myHandRight = null;
    }
}