import { Component, Type } from "@wonderlandengine/api";
import { AudioManager } from "../audio_manager";
import { hasAudioManager, removeAudioManager, setAudioManager } from "../audio_manager_singleton";

export class AudioManagerComponent extends Component {
    static TypeName = "pp-audio-manager";
    static Properties = {};

    init() {
        this._myEnabled = false;

        // prevents double managers from same engine
        if (!hasAudioManager(this.engine)) {
            setAudioManager(new AudioManager(), this.engine);
            this._myEnabled = true;
        }
    }

    onDestroy() {
        if (this._myEnabled) {
            removeAudioManager(this.engine);
        }
    }
};