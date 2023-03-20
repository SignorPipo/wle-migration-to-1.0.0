import { Component, Type } from '@wonderlandengine/api';

export class CharacterControllerComponent extends Component {
    static TypeName = 'pp-character-controller';
    static Properties = {};

    init() {
    }

    start() {
        this._myCharacterController = new PP.CharacterController();
    }

    update(dt) {
        this._myCharacterController.update(dt);
    }

    getCharacterController() {
        return this._myCharacterController;
    }
};