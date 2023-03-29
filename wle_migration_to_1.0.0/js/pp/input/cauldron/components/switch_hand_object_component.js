import { Component, Type } from "@wonderlandengine/api";
import { InputSourceType } from "../input_types";
import { InputUtils } from "../input_utils";

export class SwitchHandObjectComponent extends Component {
    static TypeName = "pp-switch-hand-object";
    static Properties = {
        _myHandedness: { type: Type.Enum, values: ["Left", "Right"], default: "Left" },
        _myGamepad: { type: Type.Object },
        _myTrackedHand: { type: Type.Object }
    };

    start() {
        this._myHandednessType = InputUtils.getHandednessByIndex(this._myHandedness);
        this._myFirstUpdate = true;

        this._myCurrentInputSourceType = null;
    }

    onActivate() {
        this._myFirstUpdate = true;
    }

    update(dt) {
        if (this._myFirstUpdate) {
            this._myFirstUpdate = false;
            this._start();
        }

        let inputSourceType = InputUtils.getInputSourceTypeByHandedness(this._myHandednessType);
        if (inputSourceType != null && this._myCurrentInputSourceType != inputSourceType) {
            this._myCurrentInputSourceType = inputSourceType;

            if (inputSourceType == InputSourceType.TRACKED_HAND) {
                if (this._myGamepad != null) {
                    this._myGamepad.pp_setActive(false);
                }
                if (this._myTrackedHand != null) {
                    this._myTrackedHand.pp_setActive(true);
                }
            } else if (inputSourceType == InputSourceType.GAMEPAD) {
                if (this._myTrackedHand != null) {
                    this._myTrackedHand.pp_setActive(false);
                }
                if (this._myGamepad != null) {
                    this._myGamepad.pp_setActive(true);
                }
            }
        }
    }

    _start() {
        if (this._myGamepad != null) {
            this._myGamepad.pp_setActive(false);
        }

        if (this._myTrackedHand != null) {
            this._myTrackedHand.pp_setActive(false);
        }

        this._myCurrentInputSourceType = null;
    }
}