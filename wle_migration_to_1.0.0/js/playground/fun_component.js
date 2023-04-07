import { Component } from "@wonderlandengine/api";
import { GamepadButtonID, getLeftGamepad } from "../pp";
import { ParticlesSpawnerComponent } from "./particles_spawner_component";

export class FunComponent extends Component {
    static TypeName = "fun";
    static Properties = {};

    start() {
        this._myParticlesSpawner = this.engine.scene.pp_getComponent(ParticlesSpawnerComponent);
    }

    update(dt) {
        this._fun();
    }

    _fun() {
        if (getLeftGamepad(this.engine).getButtonInfo(GamepadButtonID.SELECT).isPressed()) {
            this._myParticlesSpawner.spawn(this.object.pp_getPosition());
        }
    }
}