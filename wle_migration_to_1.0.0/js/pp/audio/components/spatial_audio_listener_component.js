import { Component, Property } from "@wonderlandengine/api";
import { Howler } from "howler";
import { XRUtils } from "../../cauldron/utils/xr_utils";
import { vec3_create } from "../../plugin/js/extensions/array_extension";

export class SpatialAudioListenerComponent extends Component {
    static TypeName = "pp-spatial-audio-listener";
    static Properties = {
        _myXRMode: Property.enum(["All", "Non XR", "XR"], "All")
    };

    init() {
        this._myOrigin = vec3_create();
        this._myForward = vec3_create();
        this._myUp = vec3_create();
    }

    update(dt) {
        if (this._myXRMode == 0 || (this._myXRMode == 1 && !XRUtils.isSessionActive(this.engine)) || (this._myXRMode == 2 && XRUtils.isSessionActive(this.engine))) {
            this.object.pp_getPosition(this._myOrigin);
            this.object.pp_getForward(this._myForward);
            this.object.pp_getUp(this._myUp);

            Howler.pos(this._myOrigin[0], this._myOrigin[1], this._myOrigin[2]);
            Howler.orientation(this._myForward[0], this._myForward[1], this._myForward[2],
                this._myUp[0], this._myUp[1], this._myUp[2]);
        }
    }
}