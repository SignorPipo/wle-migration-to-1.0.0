import { Component, Type } from "@wonderlandengine/api";

export class SetNonVRHeadLocalTransformComponent extends Component {
    static TypeName = "pp-set-non-vr-head-local-transform";
    static Properties = {
        _myNonVRCamera: { type: Type.Object },
        _myFixForward: { type: Type.Bool, default: true }
    };

    start() {
        this.update(0);
    }

    update(dt) {
        // implemented outside class definition
    }
};



// IMPLEMENTATION

SetNonVRHeadLocalTransformComponent.prototype.update = function () {
    let nonVRCameraRotation = PP.quat_create();
    let nonVRCameraUp = PP.vec3_create();
    let nonVRCameraPosition = PP.vec3_create();
    return function update(dt) {
        nonVRCameraRotation = this._myNonVRCamera.pp_getRotationLocalQuat(nonVRCameraRotation);
        if (this._myFixForward) {
            nonVRCameraRotation.quat_rotateAxisRadians(Math.PI, nonVRCameraRotation.quat_getUp(nonVRCameraUp), nonVRCameraRotation);
        }
        this.object.pp_setPositionLocal(this._myNonVRCamera.pp_getPositionLocal(nonVRCameraPosition));
        this.object.pp_setRotationLocalQuat(nonVRCameraRotation);
    };
}();