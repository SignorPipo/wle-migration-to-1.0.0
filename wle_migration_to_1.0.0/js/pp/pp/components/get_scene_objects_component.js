import { Component, Property } from "@wonderlandengine/api";
import { getSceneObjects, hasSceneObjects, removeSceneObjects, setSceneObjects } from "../scene_objects_global";
import { SceneObjects } from "../scene_objects";
import { Handedness } from "../../input/cauldron/input_types";

export class GetSceneObjectsComponent extends Component {
    static TypeName = "pp-get-scene-objects";
    static Properties = {
        _myScene: Property.object(),

        _myPlayer: Property.object(),
        _myPlayerPivot: Property.object(),   // If u don't have a pivot under the player you set this to null, by default will be the same as the player
        _myCameraNonVR: Property.object(),
        _myEyeLeft: Property.object(),
        _myEyeRight: Property.object(),
        _myHead: Property.object(),
        _myHeadNonVR: Property.object(),
        _myHeadVR: Property.object(),
        _myHandLeft: Property.object(),
        _myHandRight: Property.object()
    };

    init() {
        this._mySceneObjects = null;

        // Prevents double global from same engine
        if (!hasSceneObjects(this.engine)) {
            this._mySceneObjects = new SceneObjects();

            this._mySceneObjects.myScene = this._myScene;

            this._mySceneObjects.myPlayerObjects.myPlayer = this._myPlayer;
            this._mySceneObjects.myPlayerObjects.myPlayerPivot = this._myPlayerPivot;
            this._mySceneObjects.myPlayerObjects.myCameraNonVR = this._myCameraNonVR;
            this._mySceneObjects.myPlayerObjects.myHead = this._myHead;
            this._mySceneObjects.myPlayerObjects.myHeadNonVR = this._myHeadNonVR;
            this._mySceneObjects.myPlayerObjects.myHeadVR = this._myHeadVR;
            this._mySceneObjects.myPlayerObjects.myEyeLeft = this._myEyeLeft;
            this._mySceneObjects.myPlayerObjects.myEyeRight = this._myEyeRight;
            this._mySceneObjects.myPlayerObjects.myHandLeft = this._myHandLeft;
            this._mySceneObjects.myPlayerObjects.myHandRight = this._myHandRight;

            this._mySceneObjects.myPlayerObjects.myEyes = [];
            this._mySceneObjects.myPlayerObjects.myEyes[Handedness.LEFT] = this._myEyeLeft;
            this._mySceneObjects.myPlayerObjects.myEyes[Handedness.RIGHT] = this._myEyeRight;

            this._mySceneObjects.myPlayerObjects.myHands = [];
            this._mySceneObjects.myPlayerObjects.myHands[Handedness.LEFT] = this._myHandLeft;
            this._mySceneObjects.myPlayerObjects.myHands[Handedness.RIGHT] = this._myHandRight;

            if (this._mySceneObjects.myPlayerObjects.myPlayerPivot == null) {
                this._mySceneObjects.myPlayerObjects.myPlayerPivot = this._mySceneObjects.myPlayerObjects.myPlayer;
            }

            setSceneObjects(this._mySceneObjects, this.engine);
        }
    }

    onDestroy() {
        if (this._mySceneObjects != null && getSceneObjects(this.engine) == this._mySceneObjects) {
            removeSceneObjects(this.engine);
        }
    }
}