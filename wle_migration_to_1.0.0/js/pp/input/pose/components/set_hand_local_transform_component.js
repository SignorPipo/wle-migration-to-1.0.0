import { Component, Type } from "@wonderlandengine/api";

PP.SetHandLocalTransformComponent = class SetHandLocalTransformComponent extends Component {
    static TypeName = "pp-set-hand-local-transform";
    static Properties = {
        _myHandedness: { type: Type.Enum, values: ["left", "right"], default: "left" },
        _myFixForward: { type: Type.Bool, default: true },
        _myUpdateOnViewReset: { type: Type.Bool, default: true }
    };

    init() {
        this._myHandPose = new PP.HandPose(PP.InputUtils.getHandednessByIndex(this._myHandedness));
        this._myHandPose.setFixForward(this._myFixForward);
        this._myHandPose.setUpdateOnViewReset(this._myUpdateOnViewReset);
        this._myHandPose.registerPoseUpdatedEventListener(this, this.onPoseUpdated.bind(this));
    }

    start() {
        this._myHandPose.start();
        this.update(0);
    }

    update(dt) {
        this._myHandPose.update(dt);
    }

    onPoseUpdated() {
        // implemented outside class definition
    }
};



// IMPLEMENTATION

PP.SetHandLocalTransformComponent.prototype.onPoseUpdated = function () {
    let handPoseTransform = PP.quat2_create()
    return function onPoseUpdated() {
        this.object.pp_setTransformLocalQuat(this._myHandPose.getTransformQuat(handPoseTransform));
    };
}();