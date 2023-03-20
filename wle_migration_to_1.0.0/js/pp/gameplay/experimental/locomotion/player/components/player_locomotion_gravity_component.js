import { Component, Type } from '@wonderlandengine/api';

export class PlayerLocomotionGravityComponent extends Component {
    static TypeName = 'pp-player-locomotion-gravity';
    static Properties = {};

    init() {
    }

    start() {
        this._myPlayerLocomotionGravity = new PP.PlayerLocomotionGravity();
    }

    update(dt) {
        this._myPlayerLocomotionGravity.update(dt);
    }

    getPlayerLocomotionGravity() {
        return this._myPlayerLocomotionGravity;
    }
};