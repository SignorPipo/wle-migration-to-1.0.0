import { Component, Type } from "@wonderlandengine/api";
import { getPlayerObjects, hasPlayerObjects, removePlayerObjects, setPlayerObjects } from "../player_objects_global";
import { PlayerObjects } from "../player_objects";
import { Handedness } from "../../input/cauldron/input_types";

export class GetPlayerObjectsComponent extends Component {
    static TypeName = "pp-get-player-objects";
    static Properties = {
        _myPlayer: { type: Type.Object },
        _myPlayerPivot: { type: Type.Object },   // if u don't have a pivot under the player you set this to null, by default will be the same as the player
        _myCameraNonVR: { type: Type.Object },
        _myEyeLeft: { type: Type.Object },
        _myEyeRight: { type: Type.Object },
        _myHead: { type: Type.Object },
        _myHeadNonVR: { type: Type.Object },
        _myHeadVR: { type: Type.Object },
        _myHandLeft: { type: Type.Object },
        _myHandRight: { type: Type.Object }
    };

    init() {
        this._myPlayerObjects = null;

        // prevents double global from same engine
        if (!hasPlayerObjects(this.engine)) {
            this._myPlayerObjects = new PlayerObjects();

            this._myPlayerObjects.myPlayer = this._myPlayer;
            this._myPlayerObjects.myPlayerPivot = this._myPlayerPivot;
            this._myPlayerObjects.myCameraNonVR = this._myCameraNonVR;
            this._myPlayerObjects.myHead = this._myHead;
            this._myPlayerObjects.myHeadNonVR = this._myHeadNonVR;
            this._myPlayerObjects.myHeadVR = this._myHeadVR;
            this._myPlayerObjects.myEyeLeft = this._myEyeLeft;
            this._myPlayerObjects.myEyeRight = this._myEyeRight;
            this._myPlayerObjects.myHandLeft = this._myHandLeft;
            this._myPlayerObjects.myHandRight = this._myHandRight;

            this._myPlayerObjects.myEyes = [];
            this._myPlayerObjects.myEyes[Handedness.LEFT] = this._myEyeLeft;
            this._myPlayerObjects.myEyes[Handedness.RIGHT] = this._myEyeRight;

            this._myPlayerObjects.myHands = [];
            this._myPlayerObjects.myHands[Handedness.LEFT] = this._myHandLeft;
            this._myPlayerObjects.myHands[Handedness.RIGHT] = this._myHandRight;

            if (this._myPlayerObjects.myPlayerPivot == null) {
                this._myPlayerObjects.myPlayerPivot = this._myPlayerObjects.myPlayer;
            }

            setPlayerObjects(this._myPlayerObjects, this.engine);
        }
    }

    onDestroy() {
        if (this._myPlayerObjects != null && getPlayerObjects(this.engine) == this._myPlayerObjects) {
            removePlayerObjects(this.engine);
        }
    }
};