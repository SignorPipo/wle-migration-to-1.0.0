import { Component, Type } from "@wonderlandengine/api";
import { isToolEnabled } from "../../../cauldron/tool_globals";
import { EasyScale } from "../easy_scale";

export class EasyScaleComponent extends Component {
    static TypeName = "pp-easy-scale";
    static Properties = {
        _myVariableName: { type: Type.String, default: "" },
        _mySetAsDefault: { type: Type.Bool, default: false },
        _myUseTuneTarget: { type: Type.Bool, default: false },
        _myIsLocal: { type: Type.Bool, default: false },
        _myScaleAsOne: { type: Type.Bool, default: true } // Edit all scale values together
    };

    init() {
        this._myEasyObjectTuner = null;

        if (isToolEnabled(this.engine)) {
            this._myEasyObjectTuner = new EasyScale(this._myIsLocal, this._myScaleAsOne, this.object, this._myVariableName, this._mySetAsDefault, this._myUseTuneTarget);
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