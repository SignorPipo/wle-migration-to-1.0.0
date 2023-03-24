import { Component, Type } from "@wonderlandengine/api";
import { quat2_create } from "../../../plugin/js/extensions/array_extension";
import { BasePoseParams } from "../base_pose";
import { HeadPose } from "../head_pose";

export class SetVRHeadLocalTransformComponent extends Component {
    static TypeName = "pp-set-vr-head-local-transform";
    static Properties = {
        _myFixForward: { type: Type.Bool, default: true },
        _myUpdateOnViewReset: { type: Type.Bool, default: true }
    };

    init() {
        this._myHeadPose = new HeadPose(new BasePoseParams(this.engine));
        this._myHeadPose.setFixForward(this._myFixForward);
        this._myHeadPose.setUpdateOnViewReset(this._myUpdateOnViewReset);
        this._myHeadPose.registerPoseUpdatedEventListener(this, this.onPoseUpdated.bind(this));
    }

    start() {
        this._myHeadPose.start();
        this.update(0);
    }

    update(dt) {
        this._myHeadPose.update(dt);
    }

    onPoseUpdated() {
        // implemented outside class definition
    }
};



// IMPLEMENTATION

SetVRHeadLocalTransformComponent.prototype.onPoseUpdated = function () {
    let headPoseTransform = quat2_create();
    return function onPoseUpdated() {
        this.object.pp_setTransformLocalQuat(this._myHeadPose.getTransformQuat(headPoseTransform));
    }
}();