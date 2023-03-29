import { Component, Type } from "@wonderlandengine/api";
import { getPlayerObjects } from "../../../pp/player_objects_global";
import { Handedness } from "../../cauldron/input_types";
import { InputUtils } from "../../cauldron/input_utils";

export class CopyHandTransformComponent extends Component {
    static TypeName = "pp-copy-hand-transform";
    static Properties = {
        _myHandedness: { type: Type.Enum, values: ["Left", "Right"], default: "Left" }
    };

    init() {
        this._myHandednessType = InputUtils.getHandednessByIndex(this._myHandedness);
    }

    update(dt) {
        let hand = getPlayerObjects(this.engine).myHands[this._myHandednessType];
        this.object.pp_setTransformQuat(hand.pp_getTransformQuat());
        this.object.pp_setScale(hand.pp_getScale());
    }
}