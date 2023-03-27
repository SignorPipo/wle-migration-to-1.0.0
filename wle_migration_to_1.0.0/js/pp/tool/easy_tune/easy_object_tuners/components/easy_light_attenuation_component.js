import { Component, Type } from "@wonderlandengine/api";

export class EasyLightAttenuationComponent extends Component {
    static TypeName = "pp-easy-light-attenuation";
    static Properties = {
        _myVariableName: { type: Type.String, default: "" },
        _mySetAsDefault: { type: Type.Bool, default: false },
        _myUseTuneTarget: { type: Type.Bool, default: false }
    };

    init() {
        this._myEasyObjectTuner = new PP.EasyLightAttenuation(this.object, this._myVariableName, this._mySetAsDefault, this._myUseTuneTarget);
    }

    start() {
        this._myEasyObjectTuner.start();
    }

    update(dt) {
        this._myEasyObjectTuner.update(dt);
    }
};