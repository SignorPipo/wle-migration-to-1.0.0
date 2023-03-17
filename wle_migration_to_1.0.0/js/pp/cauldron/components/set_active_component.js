import { Component, Type } from "@wonderlandengine/api";

PP.SetActiveComponent = class SetActiveComponent extends Component {
    static TypeName = "pp-set-active";
    static Properties = {
        _myActive: { type: Type.Bool, default: true },
        _mySetActiveOn: { type: Type.Enum, values: ["self", "children", "descendants", "hierarchy"], default: "hierarchy" },
        _mySetActiveWhen: { type: Type.Enum, values: ["init", "start", "first_update"], default: "init" }
    };

    init() {
        if (this.active && this._mySetActiveWhen == 0) {
            this._setActive();
        }
    }

    start() {
        if (this._mySetActiveWhen == 1) {
            this._setActive();
        }
        this._myFirst = true;
    }

    update(dt) {
        if (this._mySetActiveWhen == 2 && this._myFirst) {
            this._myFirst = false;
            this._setActive();
        }
    }

    _setActive() {
        if (this._mySetActiveOn == 0) {
            this.object.pp_setActiveSelf(this._myActive);
        } else if (this._mySetActiveOn == 1) {
            this.object.pp_setActiveChildren(this._myActive);
        } else if (this._mySetActiveOn == 2) {
            this.object.pp_setActiveDescendants(this._myActive);
        } else {
            this.object.pp_setActiveHierarchy(this._myActive);
        }
    }
};

WL.registerComponent(PP.SetActiveComponent);