import { Component, Type } from "@wonderlandengine/api";
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
        this._myEasyObjectTuner = new EasyScale(this._myIsLocal, this._myScaleAsOne, this.object, this._myVariableName, this._mySetAsDefault, this._myUseTuneTarget);
    }

    start() {
        this._myEasyObjectTuner.start();
    }

    update(dt) {
        this._myEasyObjectTuner.update(dt);
    }
}