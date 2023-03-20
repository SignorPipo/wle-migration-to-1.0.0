import { Component, Type } from "@wonderlandengine/api";

PP.PlayMusicComponent = class PlayMusicComponent extends Component {
    static TypeName = "play-music";
    static Properties = {};

    start() {
        this._myStarted = false;
    }

    update(dt) {
        if (!this._myStarted) {
            this._myMusic = PP.myAudioManager.createAudioPlayer("playground_ambient");
            this._myMusic.play();

            this._myStarted = true;
        }
    }
};