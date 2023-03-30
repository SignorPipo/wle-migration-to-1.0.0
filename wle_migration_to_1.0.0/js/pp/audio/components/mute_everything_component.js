import { Component, Type } from "@wonderlandengine/api";
import { Howler } from "howler";

export class MuteEverythingComponent extends Component {
    static TypeName = "pp-mute-everything";
    static Properties = {
        _myMuted: { type: Type.Bool, default: true }
    };

    start() {
        if (this._myMuted) {
            Howler.mute(true);
        }
    }
}