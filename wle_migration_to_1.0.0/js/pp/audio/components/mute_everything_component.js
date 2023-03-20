import { Component, Type } from "@wonderlandengine/api";
import { Howler } from "howler";

export class MuteEverythingComponent extends Component {
    static TypeName = "pp-mute-everything";
    static Properties = {};

    init() {
    }

    start() {
        Howler.mute(true);
    }

    update(dt) {
    }
};