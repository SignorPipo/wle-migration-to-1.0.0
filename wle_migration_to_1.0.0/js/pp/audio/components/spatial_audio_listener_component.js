import { Component, Type } from "@wonderlandengine/api";
import { Howler } from "howler";
import { XRUtils } from "../../cauldron/utils/xr_utils";
import { vec3_create } from "../../plugin/js/extensions/array_extension";

export class SpatialAudioListenerComponent extends Component {
    static TypeName = "pp-spatial-audio-listener";
    static Properties = {
        _myEnabled: { type: Type.Enum, values: ["Always", "Vr", "Non Vr"], default: "Always" }
    };

    init() {
        this._myOrigin = vec3_create();
        this._myForward = vec3_create();
        this._myUp = vec3_create();
    }

    update(dt) {
        if (this._myEnabled == 0 || (this._myEnabled == 1 && XRUtils.getSession(this.engine)) || (this._myEnabled == 2 && !XRUtils.getSession(this.engine))) {
            this.object.pp_getPosition(this._myOrigin);
            this.object.pp_getForward(this._myForward);
            this.object.pp_getUp(this._myUp);

            Howler.pos(this._myOrigin[0], this._myOrigin[1], this._myOrigin[2]);
            Howler.orientation(this._myForward[0], this._myForward[1], this._myForward[2],
                this._myUp[0], this._myUp[1], this._myUp[2]);
        }
    }
}