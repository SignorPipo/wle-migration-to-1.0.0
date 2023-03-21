import { Component, Type } from "@wonderlandengine/api";
import { getMainEngine } from "../../plugin/extensions/wle/engine_extension"

var myAudioManagers = new WeakMap();

export function getAudioManager(engine = getMainEngine()) {
    return myAudioManagers.get(engine);
}

export class AudioManagerComponent extends Component {
    static TypeName = "pp-audio-manager";
    static Properties = {};

    init() {
        myAudioManagers.set(this.engine, new PP.AudioManager());
    }
};