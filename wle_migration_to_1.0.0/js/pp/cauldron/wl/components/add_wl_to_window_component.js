import { Component, Type } from "@wonderlandengine/api";
import * as WL from "@wonderlandengine/api";

export class AddWLToWindowComponent extends Component {
    static TypeName = "pp-add-wl-to-window";
    static Properties = {};

    init() {
        window.WL = WL;
    }
}