import { Component, Type } from "@wonderlandengine/api";
import { Timer } from "../pp/cauldron/cauldron/timer";
import { vec3_create } from "../pp/plugin/js/extensions/array_extension";
import { EasingFunction } from "../pp/plugin/js/extensions/math_extension";

export class ScaleOnSpawnComponent extends Component {
    static TypeName = "scale-on-spawn";
    static Properties = {
        _myStartDelay: { type: Type.Float, default: 0.0 },
        _myScaleDuration: { type: Type.Float, default: 0.0 }
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
        let clonedComponent = targetObject.pp_addComponent(this.type);
        clonedComponent.active = this.active;

        clonedComponent._myStartDelay = this._myStartDelay;
        clonedComponent._myScaleDuration = this._myScaleDuration;

        clonedComponent.start();

        return clonedComponent;
    }
}