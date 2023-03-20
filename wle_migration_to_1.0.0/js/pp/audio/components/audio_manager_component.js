import { Component, Type } from "@wonderlandengine/api";

PP.myAudioManager = null;

export class AudioManagerComponent extends Component {
    static TypeName = "pp-audio-manager";
    static Properties = {};

    init() {
        PP.myAudioManager = new PP.AudioManager();
    }
};