import { Component, Type } from "@wonderlandengine/api";

PP.DebugTransformComponent = class DebugTransformComponent extends Component {
    static TypeName = "pp-debug-transform";
    static Properties = {
        _myLength: { type: Type.Float, default: 0.1 },
        _myThickness: { type: Type.Float, default: 0.005 }
    };

    start() {
        this._myDebugTransformParams = new PP.VisualTransformParams();
        this._myDebugTransformParams.myLength = this._myLength;
        this._myDebugTransformParams.myThickness = this._myThickness;

        this._myDebugVisualTransform = new PP.VisualTransform(this._myDebugTransformParams);
    }

    update(dt) {
        this.object.pp_getTransform(this._myDebugTransformParams.myTransform);
        this._myDebugVisualTransform.paramsUpdated();
    }
};

WL.registerComponent(PP.DebugTransformComponent);