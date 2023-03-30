import { Component, Type } from "@wonderlandengine/api";
import * as PP from "../../index";

export class AddPPToWindowComponent extends Component {
    static TypeName = "pp-add-pp-to-window";
    static Properties = {
        _myAdd: { type: Type.Bool, default: true }
    };

    init() {
        if (this._myAdd) {
            window.PP = PP;
        }
    }
}