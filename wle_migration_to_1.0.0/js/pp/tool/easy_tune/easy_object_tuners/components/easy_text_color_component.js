import { Component, Type } from "@wonderlandengine/api";
import { EasyTextColor } from "../easy_text_color";

export class EasyTextColorComponent extends Component {
    static TypeName = "pp-easy-text-color";
    static Properties = {
        _myVariableName: { type: Type.String, default: "" },
        _mySetAsDefault: { type: Type.Bool, default: false },
        _myUseTuneTarget: { type: Type.Bool, default: false },
        _myColorModel: { type: Type.Enum, values: ["RGB", "HSV"], default: "HSV" },
        _myColorType: { type: Type.Enum, values: ["Color", "Effect Color"], default: "Color" }
    };

    init() {
        this._myEasyObjectTuner = new EasyTextColor(this._myColorModel, this._myColorType, this.object, this._myVariableName, this._mySetAsDefault, this._myUseTuneTarget);
    }

    start() {
        this._myEasyObjectTuner.start();
    }

    update(dt) {
        this._myEasyObjectTuner.update(dt);
    }
}