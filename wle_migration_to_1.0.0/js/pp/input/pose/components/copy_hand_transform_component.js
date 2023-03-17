import { Component, Type } from "@wonderlandengine/api";

PP.CopyHandTransformComponent = class CopyHandTransformComponent extends Component {
    static TypeName = "pp-copy-hand-transform";
    static Properties = {
        _myHandedness: { type: Type.Enum, values: ["left", "right"], default: "left" }
    };

    init() {
        this._myHandednessType = (this._myHandedness == 0) ? PP.Handedness.LEFT : PP.Handedness.RIGHT;
    }

    update(dt) {
        let hand = PP.myPlayerObjects.myHands[this._myHandednessType];
        this.object.pp_setTransformQuat(hand.pp_getTransformQuat());
        this.object.pp_setScale(hand.pp_getScale());
    }
};

WL.registerComponent(PP.CopyHandTransformComponent);