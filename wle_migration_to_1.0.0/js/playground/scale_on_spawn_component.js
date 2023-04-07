import { Component, Property } from "@wonderlandengine/api";
import { EasingFunction, Timer, vec3_create } from "../pp";

export class ScaleOnSpawnComponent extends Component {
    static TypeName = "scale-on-spawn";
    static Properties = {
        _myStartDelay: Property.float(0.0),
        _myScaleDuration: Property.float(0.0)
    };

    init() {
        this._myTargetScale = vec3_create(1, 1, 1);
    }

    start() {
        this.object.pp_setScale(Math.PP_EPSILON);

        this._myDelayTimer = new Timer(this._myStartDelay);
        this._myScaleDurationTimer = new Timer(this._myScaleDuration);
    }

    update(dt) {
        if (this._myDelayTimer.isRunning()) {
            this._myDelayTimer.update(dt);
        } else if (this._myScaleDurationTimer.isRunning()) {
            this._myScaleDurationTimer.update(dt);

            this.object.pp_setScale(this._myTargetScale.vec3_scale(EasingFunction.easeOut(this._myScaleDurationTimer.getPercentage())));
        }
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