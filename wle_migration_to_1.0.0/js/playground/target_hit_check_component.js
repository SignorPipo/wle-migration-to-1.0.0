import { Component, Property, PhysXComponent } from "@wonderlandengine/api";
import { getAudioManager } from "../pp/index";
import { PhysicsCollisionCollector } from "../pp/index";
import { GrabbableComponent } from "../pp/index";
import { getLeftGamepad } from "../pp/index";
import { GamepadButtonID } from "../pp/index";
import { ParticlesSpawnerComponent } from "./particles_spawner_component";

export class TargetHitCheckComponent extends Component {
    static TypeName = "target-hit-check";
    static Properties = {};

    start() {
        this._myTrigger = this.object.pp_getComponent(PhysXComponent);
        this._myParticlesSpawner = this.engine.scene.pp_getComponent(ParticlesSpawnerComponent);
        this._myCollisionsCollector = new PhysicsCollisionCollector(this._myTrigger, true);

        this._mySFX = getAudioManager(this.engine).createAudioPlayer("strike");
    }

    update(dt) {
        this._myCollisionsCollector.update(dt);

        let collisionsStart = this._myCollisionsCollector.getCollisionsStart();
        for (let collisionStart of collisionsStart) {
            if (collisionStart.pp_getComponent(GrabbableComponent) != null) {
                this._strike(collisionStart);
            }
        }

        //this._fun();
    }

    _strike(strikeSource) {
        this._mySFX.setPosition(strikeSource.pp_getPosition());
        this._mySFX.setPitch(Math.pp_random(1.25 - 0.15, 1.25 + 0.05));
        this._mySFX.play();

        this._myParticlesSpawner.spawn(strikeSource.pp_getPosition());
    }

    _fun() {
        if (getLeftGamepad(this.engine).getButtonInfo(GamepadButtonID.SELECT).isPressStart()) {
            this._myParticlesSpawner.spawn(this.object.pp_getPosition());
        }
    }
}