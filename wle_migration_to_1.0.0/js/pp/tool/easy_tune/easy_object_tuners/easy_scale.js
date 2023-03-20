import { Component, Type } from "@wonderlandengine/api";

PP.EasyScale = class EasyScale extends PP.EasyObjectTuner {
    constructor(isLocal, scaleAsOne, object, variableName, setAsDefault, useTuneTarget) {
        super(object, variableName, setAsDefault, useTuneTarget);
        this._myIsLocal = isLocal;
        this._myScaleAsOne = scaleAsOne;
    }

    _getVariableNamePrefix() {
        return "Scale ";
    }

    _createEasyTuneVariable(variableName) {
        return new PP.EasyTuneNumberArray(variableName, this._getDefaultValue(), 1, 3, 0.001, null, this._myScaleAsOne);
    }

    _getObjectValue(object) {
        return this._myIsLocal ? object.pp_getScaleLocal() : object.pp_getScaleWorld();
    }

    _getDefaultValue() {
        return PP.vec3_create(1, 1, 1);
    }

    _updateObjectValue(object, value) {
        if (this._myIsLocal) {
            object.pp_setScaleLocal(value);
        } else {
            object.pp_setScaleWorld(value);
        }
    }
};

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
        this._myEasyObjectTuner = new PP.EasyScale(this._myIsLocal, this._myScaleAsOne, this.object, this._myVariableName, this._mySetAsDefault, this._myUseTuneTarget);
    }

    start() {
        this._myEasyObjectTuner.start();
    }

    update(dt) {
        this._myEasyObjectTuner.update(dt);
    }
};