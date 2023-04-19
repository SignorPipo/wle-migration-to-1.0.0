import { Component } from "@wonderlandengine/api";
import { getAudioManager, hasAudioManager, removeAudioManager, setAudioManager } from "../audio_globals";
import { AudioManager } from "../audio_manager";

export class AudioManagerComponent extends Component {
    static TypeName = "pp-audio-manager";
    static Properties = {};

    init() {
        this._myAudioManager = null;

        // Prevents double global from same engine
        if (!hasAudioManager(this.engine)) {
            this._myAudioManager = new AudioManager();

            setAudioManager(this._myAudioManager, this.engine);
        }
    }

    onDestroy() {
        if (this._myAudioManager != null && getAudioManager(this.engine) == this._myAudioManager) {
            removeAudioManager(this.engine);
        }
    }
}