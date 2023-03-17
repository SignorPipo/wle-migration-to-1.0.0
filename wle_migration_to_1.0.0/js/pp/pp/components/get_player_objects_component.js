import { Component, Type } from "@wonderlandengine/api";

PP.myPlayerObjects = {
    myPlayer: null,
    myPlayerPivot: null,
    myNonVRCamera: null,
    myNonVRHead: null,
    myVRHead: null,
    myHead: null,
    myEyeLeft: null,
    myEyeRight: null,
    myEyes: [],
    myHandLeft: null,
    myHandRight: null,
    myHands: [],
};

PP.GetPlayerObjectsComponent = class GetPlayerObjectsComponent extends Component {
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
        PP.myPlayerObjects.myPlayer = this._myPlayer;
        PP.myPlayerObjects.myPlayerPivot = this._myPlayerPivot;
        PP.myPlayerObjects.myNonVRCamera = this._myNonVRCamera;
        PP.myPlayerObjects.myHead = this._myHead;
        PP.myPlayerObjects.myNonVRHead = this._myNonVRHead;
        PP.myPlayerObjects.myVRHead = this._myVRHead;
        PP.myPlayerObjects.myEyeLeft = this._myEyeLeft;
        PP.myPlayerObjects.myEyeRight = this._myEyeRight;
        PP.myPlayerObjects.myHandLeft = this._myHandLeft;
        PP.myPlayerObjects.myHandRight = this._myHandRight;

        PP.myPlayerObjects.myEyes = [];
        PP.myPlayerObjects.myEyes[PP.Handedness.LEFT] = this._myEyeLeft;
        PP.myPlayerObjects.myEyes[PP.Handedness.RIGHT] = this._myEyeRight;

        PP.myPlayerObjects.myHands = [];
        PP.myPlayerObjects.myHands[PP.Handedness.LEFT] = this._myHandLeft;
        PP.myPlayerObjects.myHands[PP.Handedness.RIGHT] = this._myHandRight;

        if (PP.myPlayerObjects.myPlayerPivot == null) {
            PP.myPlayerObjects.myPlayerPivot = PP.myPlayerObjects.myPlayer;
        }
    }
};

WL.registerComponent(PP.GetPlayerObjectsComponent);