import { Component, PhysXComponent } from "@wonderlandengine/api";
import { GrabbableComponent, PhysicsCollisionCollector, getAudioManager, getScene } from "../pp";
import { ParticlesSpawnerComponent } from "./particles_spawner_component";

export class TargetHitCheckComponent extends Component {
    static TypeName = "target-hit-check";
    static Properties = {};

    start() {
        this._myTrigger = this.object.pp_getComponent(PhysXComponent);
        this._myParticlesSpawner = getScene(this.engine).pp_getComponent(ParticlesSpawnerComponent);
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
    }

    _strike(strikeSource) {
        this._mySFX.setPosition(strikeSource.pp_getPosition());
        this._mySFX.setPitch(Math.pp_random(1.25 - 0.15, 1.25 + 0.05));
        this._mySFX.play();

        this._myParticlesSpawner.spawn(strikeSource.pp_getPosition());
    }
}