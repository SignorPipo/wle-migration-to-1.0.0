import { Component, Type } from "@wonderlandengine/api";
import { hasPlayerObjects, removePlayerObjects, setPlayerObjects } from "../player_objects_global";
import { PlayerObjects } from "../player_objects";
import { Handedness } from "../../input/cauldron/input_types";

export class GetPlayerObjectsComponent extends Component {
    static TypeName = "pp-get-player-objects";
    static Properties = {
        _myPlayer: { type: Type.Object },
        _myPlayerPivot: { type: Type.Object },   // if u don't have a pivot under the player you set this to null, by default will be the same as the player
        _myNonVRCamera: { type: Type.Object },
        _myEyeLeft: { type: Type.Object },
        _myEyeRight: { type: Type.Object },
        _myHead: { type: Type.Object },
        _myNonVRHead: { type: Type.Object },
        _myVRHead: { type: Type.Object },
        _myHandLeft: { type: Type.Object },
        _myHandRight: { type: Type.Object }
    };

    init() {
        this._myEnabled = false;

        // prevents double managers from same engine
        if (!hasPlayerObjects(this.engine)) {
            let playerObjects = new PlayerObjects();

            playerObjects.myPlayer = this._myPlayer;
            playerObjects.myPlayerPivot = this._myPlayerPivot;
            playerObjects.myNonVRCamera = this._myNonVRCamera;
            playerObjects.myHead = this._myHead;
            playerObjects.myNonVRHead = this._myNonVRHead;
            playerObjects.myVRHead = this._myVRHead;
            playerObjects.myEyeLeft = this._myEyeLeft;
            playerObjects.myEyeRight = this._myEyeRight;
            playerObjects.myHandLeft = this._myHandLeft;
            playerObjects.myHandRight = this._myHandRight;

            playerObjects.myEyes = [];
            playerObjects.myEyes[Handedness.LEFT] = this._myEyeLeft;
            playerObjects.myEyes[Handedness.RIGHT] = this._myEyeRight;

            playerObjects.myHands = [];
            playerObjects.myHands[Handedness.LEFT] = this._myHandLeft;
            playerObjects.myHands[Handedness.RIGHT] = this._myHandRight;

            if (playerObjects.myPlayerPivot == null) {
                playerObjects.myPlayerPivot = playerObjects.myPlayer;
            }

            setPlayerObjects(playerObjects, this.engine);
            this._myEnabled = true;
        }
    }

    onDestroy() {
        if (this._myEnabled) {
            removePlayerObjects(this.engine);
        }
    }
};