import { Component, Type } from "@wonderlandengine/api";
import * as WL from "@wonderlandengine/api";

export class AddWLToWindowComponent extends Component {
    static TypeName = "pp-add-wl-to-window";
    static Properties = {
        _myAdd: { type: Type.Bool, default: true }
    };

    init() {
        if (this._myAdd) {
            window.WL = WL;
        }
    }
}