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