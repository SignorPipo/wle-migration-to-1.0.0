import { Component, Type } from "@wonderlandengine/api";

PP.CopyPlayerPivotTransformComponent = class CopyPlayerPivotTransformComponent extends Component {
    static TypeName = "pp-copy-player-pivot-transform";
    static Properties = {};

    update(dt) {
        let playerPivot = PP.myPlayerObjects.myPlayerPivot;
        this.object.pp_setTransformQuat(playerPivot.pp_getTransformQuat());
        this.object.pp_setScale(playerPivot.pp_getScale());
    }
};