import { Component, Type } from "@wonderlandengine/api";

export class CopyPlayerTransformComponent extends Component {
    static TypeName = "pp-copy-player-transform";
    static Properties = {};

    update(dt) {
        let player = PP.myPlayerObjects.myPlayer;
        this.object.pp_setTransformQuat(player.pp_getTransformQuat());
        this.object.pp_setScale(player.pp_getScale());
    }
};