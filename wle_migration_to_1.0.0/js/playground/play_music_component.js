import { Component, Property } from "@wonderlandengine/api";
import { getAudioManager } from "../pp";

export class PlayMusicComponent extends Component {
    static TypeName = "play-music";
    static Properties = {};

    start() {
        this._myStarted = false;
    }

    update(dt) {
        if (!this._myStarted) {
            this._myMusic = getAudioManager(this.engine).createAudioPlayer("playground_ambient");
            this._myMusic.play();

            this._myStarted = true;
        }
    }
}