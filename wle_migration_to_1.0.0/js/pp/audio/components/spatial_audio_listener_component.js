import { Component, Type } from "@wonderlandengine/api";
import { Howler } from "howler";

export class SpatialAudioListenerComponent extends Component {
    static TypeName = "pp-spatial-audio-listener";
    static Properties = {
        _myEnabled: { type: Type.Enum, values: ["always", "vr", "non vr"], default: "always" }
    };

    init() {
        this._myOrigin = PP.vec3_create();
        this._myForward = PP.vec3_create();
        this._myUp = PP.vec3_create();
    }

    update(dt) {
        if (this._myEnabled == 0 || (this._myEnabled == 1 && this.engine.xrSession) || (this._myEnabled == 2 && !this.engine.xrSession)) {
            this.object.pp_getPosition(this._myOrigin);
            this.object.pp_getForward(this._myForward);
            this.object.pp_getUp(this._myUp);

            Howler.pos(this._myOrigin[0], this._myOrigin[1], this._myOrigin[2]);
            Howler.orientation(this._myForward[0], this._myForward[1], this._myForward[2],
                this._myUp[0], this._myUp[1], this._myUp[2]);
        }
    }
};