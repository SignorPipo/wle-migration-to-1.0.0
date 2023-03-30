import { Component, Type } from "@wonderlandengine/api";
import { Howler } from "howler";

export class MuteEverythingComponent extends Component {
    static TypeName = "pp-mute-everything";
    static Properties = {
        _myMute: { type: Type.Bool, default: true }
    };

    start() {
        if (this._myMute) {
            Howler.mute(true);
        }
    }
}