import { Component, Type } from "@wonderlandengine/api";

PP.SetVRHeadLocalTransformComponent = class SetVRHeadLocalTransformComponent extends Component {
    static TypeName = "pp-set-vr-head-local-transform";
    static Properties = {
        _myFixForward: { type: Type.Bool, default: true },
        _myUpdateOnViewReset: { type: Type.Bool, default: true }
    };

    init() {
        this._myHeadPose = new PP.HeadPose();
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

PP.SetVRHeadLocalTransformComponent.prototype.onPoseUpdated = function () {
    let headPoseTransform = PP.quat2_create();
    return function onPoseUpdated() {
        this.object.pp_setTransformLocalQuat(this._myHeadPose.getTransformQuat(headPoseTransform));
    }
}();