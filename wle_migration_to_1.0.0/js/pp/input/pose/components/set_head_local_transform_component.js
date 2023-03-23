import { Component, Type } from "@wonderlandengine/api";
import { XRUtils } from "../../../cauldron/utils/xr_utils";

export class SetHeadLocalTransformComponent extends Component {
    static TypeName = "pp-set-head-local-transform";
    static Properties = {
        _myNonVRCamera: { type: Type.Object },
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
        // implemented outside class definition
    }

    onPoseUpdated() {
        // implemented outside class definition
    }
};



// IMPLEMENTATION

SetHeadLocalTransformComponent.prototype.update = function () {
    let nonVRCameraRotation = PP.quat_create();
    let nonVRCameraUp = PP.vec3_create();
    let nonVRCameraPosition = PP.vec3_create();
    return function update(dt) {
        if (XRUtils.isSessionActive(this.engine)) {
            this._myHeadPose.update(dt);
        } else {
            nonVRCameraRotation = this._myNonVRCamera.pp_getRotationLocalQuat(nonVRCameraRotation);
            if (this._myFixForward) {
                nonVRCameraRotation.quat_rotateAxisRadians(Math.PI, nonVRCameraRotation.quat_getUp(nonVRCameraUp), nonVRCameraRotation);
            }
            this.object.pp_setPositionLocal(this._myNonVRCamera.pp_getPositionLocal(nonVRCameraPosition));
            this.object.pp_setRotationLocalQuat(nonVRCameraRotation);
        }
    };
}();

SetHeadLocalTransformComponent.prototype.onPoseUpdated = function () {
    let headPoseTransform = PP.quat2_create();
    return function onPoseUpdated() {
        if (XRUtils.isSessionActive(this.engine)) {
            this.object.pp_setTransformLocalQuat(this._myHeadPose.getTransformQuat(headPoseTransform));
        }
    }
}();