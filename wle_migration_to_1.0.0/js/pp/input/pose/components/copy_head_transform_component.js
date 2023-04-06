import { Component, Property } from "@wonderlandengine/api";
import { XRUtils } from "../../../cauldron/utils/xr_utils";
import { getPlayerObjects } from "../../../pp/scene_objects_global";

export class CopyHeadTransformComponent extends Component {
    static TypeName = "pp-copy-head-transform";
    static Properties = {
        _myXRMode: Property.enum(["All", "Non XR", "XR"], "All")
    };

    update(dt) {
        if (XRUtils.isSessionActive(this.engine) && (this._myXRMode == 0 || this._myXRMode == 2)) {
            let head = getPlayerObjects(this.engine).myHeadXR;
            this.object.pp_setTransformQuat(head.pp_getTransformQuat());
            this.object.pp_setScale(head.pp_getScale());
        } else if (!XRUtils.isSessionActive(this.engine) && (this._myXRMode == 0 || this._myXRMode == 1)) {
            let head = getPlayerObjects(this.engine).myHeadNonXR;
            this.object.pp_setTransformQuat(head.pp_getTransformQuat());
            this.object.pp_setScale(head.pp_getScale());
        }
    }
}