import { Component, Property } from "@wonderlandengine/api";
import { XRUtils } from "../../../cauldron/utils/xr_utils";
import { getPlayerObjects } from "../../../pp/scene_objects_global";

export class CopyHeadTransformComponent extends Component {
    static TypeName = "pp-copy-head-transform";
    static Properties = {
        _myCopy: Property.enum(["Always", "Non VR", "VR"], "Always")
    };

    update(dt) {
        if (XRUtils.isSessionActive(this.engine) && (this._myCopy == 0 || this._myCopy == 2)) {
            let head = getPlayerObjects(this.engine).myHeadVR;
            this.object.pp_setTransformQuat(head.pp_getTransformQuat());
            this.object.pp_setScale(head.pp_getScale());
        } else if (!XRUtils.isSessionActive(this.engine) && (this._myCopy == 0 || this._myCopy == 1)) {
            let head = getPlayerObjects(this.engine).myHeadNonVR;
            this.object.pp_setTransformQuat(head.pp_getTransformQuat());
            this.object.pp_setScale(head.pp_getScale());
        }
    }
}