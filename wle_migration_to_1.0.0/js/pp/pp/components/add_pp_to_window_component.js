import { Component, Type } from "@wonderlandengine/api";
import * as PP from "../../index";

export class AddPPToWindowComponent extends Component {
    static TypeName = "pp-add-pp-to-window";
    static Properties = {};

    init() {
        window.PP = PP;
    }
}