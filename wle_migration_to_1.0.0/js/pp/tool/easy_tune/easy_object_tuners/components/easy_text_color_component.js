import { Component, Type } from "@wonderlandengine/api";

export class EasyTextColorComponent extends Component {
    static TypeName = "pp-easy-text-color";
    static Properties = {
        _myVariableName: { type: Type.String, default: "" },
        _mySetAsDefault: { type: Type.Bool, default: false },
        _myUseTuneTarget: { type: Type.Bool, default: false },
        _myColorModel: { type: Type.Enum, values: ["rgb", "hsv"], default: "hsv" },
        _myColorType: { type: Type.Enum, values: ["color", "effect color"], default: "color" }
    };

    init() {
        this._myEasyObjectTuner = new PP.EasyTextColor(this._myColorModel, this._myColorType, this.object, this._myVariableName, this._mySetAsDefault, this._myUseTuneTarget);
    }

    start() {
        this._myEasyObjectTuner.start();
    }

    update(dt) {
        this._myEasyObjectTuner.update(dt);
    }
}