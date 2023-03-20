import { Component, Type } from "@wonderlandengine/api";

export class CopyHeadTransformComponent extends Component {
    static TypeName = "pp-copy-head-transform";
    static Properties = {};

    update(dt) {
        let head = PP.myPlayerObjects.myHead;
        this.object.pp_setTransformQuat(head.pp_getTransformQuat());
        this.object.pp_setScale(head.pp_getScale());
    }
};