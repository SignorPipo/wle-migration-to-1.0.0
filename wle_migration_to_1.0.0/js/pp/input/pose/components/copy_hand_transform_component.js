import { Component, Type } from "@wonderlandengine/api";
import { getPlayerObjects } from "../../../pp/player_objects_global";
import { Handedness } from "../../cauldron/input_types";

export class CopyHandTransformComponent extends Component {
    static TypeName = "pp-copy-hand-transform";
    static Properties = {
        _myHandedness: { type: Type.Enum, values: ["left", "right"], default: "left" }
    };

    init() {
        this._myHandednessType = (this._myHandedness == 0) ? Handedness.LEFT : Handedness.RIGHT;
    }

    update(dt) {
        let hand = getPlayerObjects(this.engine).myHands[this._myHandednessType];
        this.object.pp_setTransformQuat(hand.pp_getTransformQuat());
        this.object.pp_setScale(hand.pp_getScale());
    }
};