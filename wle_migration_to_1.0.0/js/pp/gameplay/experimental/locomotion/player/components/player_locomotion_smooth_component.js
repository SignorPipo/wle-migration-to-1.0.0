import { Component, Type } from "@wonderlandengine/api";

export class PlayerLocomotionSmoothComponent extends Component {
    static TypeName = "pp-player-locomotion-smooth";
    static Properties = {};

    init() {
    }

    start() {
        this._myPlayerLocomotionSmooth = new PP.PlayerLocomotionSmooth();
    }

    update(dt) {
        this._myPlayerLocomotionSmooth.update(dt);
    }

    getPlayerLocomotionSmooth() {
        return this._myPlayerLocomotionSmooth;
    }
};