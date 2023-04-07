import { Component, PhysXComponent } from "@wonderlandengine/api";
import { GrabbableComponent, PhysicsCollisionCollector, getAudioManager } from "../pp";

export class SFXOnCollisionComponent extends Component {
    static TypeName = "sfx-on-collision";
    static Properties = {};

    start() {
        this._myPhysX = this.object.pp_getComponent(PhysXComponent);
        this._myCollisionsCollector = new PhysicsCollisionCollector(this._myPhysX);

        this._mySFX = getAudioManager(this.engine).createAudioPlayer("collision");

        this._myGrabbable = this.object.pp_getComponent(GrabbableComponent);
        this._myLastLastGrabbed = this._myGrabbable.isGrabbed();
        this._myLastGrabbed = this._myGrabbable.isGrabbed();
    }

    update(dt) {
        this._myCollisionsCollector.update(dt);

        if (this._myCollisionsCollector.getCollisionsStart().length > 0 && this._myLastLastGrabbed == this._myGrabbable.isGrabbed()) {
            this._mySFX.setPosition(this.object.pp_getPosition());
            this._mySFX.setPitch(Math.pp_random(1.25 - 0.15, 1.25 + 0.05));
            this._mySFX.play();
        }

        this._myLastLastGrabbed = this._myLastGrabbed;
        this._myLastGrabbed = this._myGrabbable.isGrabbed(); // Fix a physX bug that trigger a collision start when kinematic is changed
    }

    pp_clone(targetObject) {
        let clonedComponent = targetObject.pp_addComponent(this.type, this);

        // trigger start, which otherwise would be called later
        if (!clonedComponent.active) {
            clonedComponent.active = true;
            clonedComponent.active = false;
        }

        return clonedComponent;
    }
}