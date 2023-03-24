import { Component, Type } from "@wonderlandengine/api";

export class CharacterCollisionSystemComponent extends Component {
    static TypeName = "pp-character-collision-system";
    static Properties = {};

    init() {
        PP.myCharacterCollisionSystem = new PP.CharacterCollisionSystem();
    }

    start() {
    }

    update(dt) {
        PP.myCharacterCollisionSystem.update(dt);
    }
};

PP.myCharacterCollisionSystem = null;