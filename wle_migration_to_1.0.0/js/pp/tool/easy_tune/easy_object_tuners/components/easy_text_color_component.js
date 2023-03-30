import { Component, Type } from "@wonderlandengine/api";
import { isToolEnabled } from "../../../cauldron/tool_globals";
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
        this._myEasyObjectTuner = null;

        if (isToolEnabled(this.engine)) {
            this._myEasyObjectTuner = new EasyTextColor(this._myColorModel, this._myColorType, this.object, this._myVariableName, this._mySetAsDefault, this._myUseTuneTarget);
        }
    }

    start() {
        if (isToolEnabled(this.engine)) {
            if (this._myEasyObjectTuner != null) {
                this._myEasyObjectTuner.start();
            }
        }
    }

    update(dt) {
        if (isToolEnabled(this.engine)) {
            if (this._myEasyObjectTuner != null) {
                this._myEasyObjectTuner.update(dt);
            }
        }
    }
}