PP.EasyTransform = class EasyTransform extends PP.EasyObjectTuner {
    constructor(isLocal, scaleAsOne, object, variableName, setAsDefault, useTuneTarget) {
        super(object, variableName, setAsDefault, useTuneTarget);
        this._myIsLocal = isLocal;
        this._myScaleAsOne = scaleAsOne;
    }

    _getVariableNamePrefix() {
        return "Transform ";
    }

    _createEasyTuneVariable(variableName) {
        return new PP.EasyTuneTransform(variableName, this._getDefaultValue(), this._myScaleAsOne);
    }

    _getObjectValue(object) {
        return this._myIsLocal ? object.pp_getTransformLocal() : object.pp_getTransformWorld();
    }

    _getDefaultValue() {
        return PP.mat4_create();
    }

    _updateObjectValue(object, value) {
        if (this._myIsLocal) {
            object.pp_setTransformLocal(value);
        } else {
            object.pp_setTransformWorld(value);
        }
    }
};