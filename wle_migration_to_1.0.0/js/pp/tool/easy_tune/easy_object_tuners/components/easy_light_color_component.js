import { Component, Type } from "@wonderlandengine/api";
import { EasyLightColor } from "../easy_light_color";

export class EasyLightColorComponent extends Component {
    static TypeName = "pp-easy-light-color";
    static Properties = {
        _myVariableName: { type: Type.String, default: "" },
        _mySetAsDefault: { type: Type.Bool, default: false },
        _myUseTuneTarget: { type: Type.Bool, default: false },
        _myColorModel: { type: Type.Enum, values: ["RGB", "HSV"], default: "HSV" }
    };

    init() {
        this._myEasyObjectTuner = new EasyLightColor(this._myColorModel, this.object, this._myVariableName, this._mySetAsDefault, this._myUseTuneTarget);
    }

    start() {
        this._myEasyObjectTuner.start();
    }

    update(dt) {
        this._myEasyObjectTuner.update(dt);
    }
}