import { Component, Type } from "@wonderlandengine/api";
import { getMainEngine } from "../../plugin/wl/extensions/engine_extension";

let _myAudioManagers = new WeakMap();

export function getAudioManager(engine = getMainEngine()) {
    return _myAudioManagers.get(engine);
}

export class AudioManagerComponent extends Component {
    static TypeName = "pp-audio-manager";
    static Properties = {};

    init() {
        this._myEnabled = false;

        // prevent double managers from same engine
        if (getAudioManager(this.engine) == null) {
            _myAudioManagers.set(this.engine, new PP.AudioManager());
            this._myEnabled = true;
        }
    }

    onDestroy() {
        if (this._myEnabled) {
            _myAudioManagers.delete(this.engine);

        }
    }
};