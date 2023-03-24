import { Component, Type } from "@wonderlandengine/api";
import { quat_create, vec3_create } from "../../../plugin/js/extensions/array_extension";

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
    let nonVRCameraRotation = quat_create();
    let nonVRCameraUp = vec3_create();
    let nonVRCameraPosition = vec3_create();
    return function update(dt) {
        nonVRCameraRotation = this._myNonVRCamera.pp_getRotationLocalQuat(nonVRCameraRotation);
        if (this._myFixForward) {
            nonVRCameraRotation.quat_rotateAxisRadians(Math.PI, nonVRCameraRotation.quat_getUp(nonVRCameraUp), nonVRCameraRotation);
        }
        this.object.pp_setPositionLocal(this._myNonVRCamera.pp_getPositionLocal(nonVRCameraPosition));
        this.object.pp_setRotationLocalQuat(nonVRCameraRotation);
    };
}();