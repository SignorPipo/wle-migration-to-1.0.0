import { Component, Type } from "@wonderlandengine/api";

PP.myDebugManager = null;
PP.myDebugVisualManager = null;

PP.DebugManagerComponent = class DebugManagerComponent extends Component {
    static TypeName = "pp-debug-manager";
    static Properties = {};

    init() {
        PP.myDebugManager = new PP.DebugManager();
        PP.myDebugVisualManager = PP.myDebugManager.getDebugVisualManager();
    }

    start() {
        PP.myDebugManager.start();
    }

    update(dt) {
        PP.myDebugManager.update(dt);
    }
};