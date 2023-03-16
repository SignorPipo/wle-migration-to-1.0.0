import { Component, Type } from '@wonderlandengine/api';
import { Howler } from 'howler';

PP.MuteEverythingComponent = class MuteEverythingComponent extends Component {
    static TypeName = 'pp-mute-everything';
    static Properties = {};

    init() {
    }

    start() {
        Howler.mute(true);
    }

    update(dt) {
    }
};

WL.registerComponent(PP.MuteEverythingComponent);