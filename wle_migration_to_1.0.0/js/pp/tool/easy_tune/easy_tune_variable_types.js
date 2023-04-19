/*
Easy Tune Variables Examples

Number:         getEasyTuneVariables().add(new EasyTuneNumber("Float", 1.00, 0.1, 3));
Number Array:   getEasyTuneVariables().add(new EasyTuneNumberArray("Float Array", [1.00, 2.00, 3.00], 0.1, 3));
Int:            getEasyTuneVariables().add(new EasyTuneInt("Int", 1, 1));
Int Array:      getEasyTuneVariables().add(new EasyTuneIntArray("Int Array", [1, 2, 3], 1));
Bool:           getEasyTuneVariables().add(new EasyTuneBool("Bool", false));
Bool Array:     getEasyTuneVariables().add(new EasyTuneBoolArray("Bool Array", [false, true, false]));
Transform:      getEasyTuneVariables().add(new EasyTuneTransform("Transform", mat4_create(), true));
*/

import { getMainEngine } from "../../cauldron/wl/engine_globals";
import { mat4_create } from "../../plugin/js/extensions/array_extension";
import { EasyTuneUtils } from "./easy_tune_utils";

export let EasyTuneVariableType = {
    NONE: 0,
    NUMBER: 1,
    BOOL: 2,
    TRANSFORM: 3
};

export class EasyTuneVariable {

    constructor(name, type, engine = getMainEngine()) {
        this._myName = name.slice(0);
        this._myType = type;

        this._myValue = null;
        this._myDefaultValue = null;

        this._myIsActive = false;

        this._myValueChangedCallbacks = new Map();      // Signature: callback(value, easyTuneVariables)

        this._myEngine = engine;
    }

    getName() {
        return this._myName;
    }

    getType() {
        return this._myType;
    }

    isActive() {
        return this._myIsActive;
    }

    getValue() {
        return this._myValue;
    }

    setValue(value, resetDefaultValue = false) {
        let valueChanged = this._myValue != value;

        this._myValue = value;

        if (resetDefaultValue) {
            EasyTuneVariable.prototype.setDefaultValue.call(this, value);
        }

        EasyTuneUtils.refreshEasyTuneWidget(this._myEngine);

        if (valueChanged) {
            this._triggerValueChangedCallback();
        }
    }

    getDefaultValue() {
        return this._myDefaultValue;
    }

    setDefaultValue(value) {
        this._myDefaultValue = value;
    }

    fromJSON(valueJSON, resetDefaultValue = false) {
        this.setValue(JSON.parse(valueJSON), resetDefaultValue);
    }

    toJSON() {
        return JSON.stringify(this.getValue());
    }

    registerValueChangedEventListener(id, callback) {
        this._myValueChangedCallbacks.set(id, callback);
    }

    unregisterValueChangedEventListener(id) {
        this._myValueChangedCallbacks.delete(id);
    }

    _triggerValueChangedCallback() {
        if (this._myValueChangedCallbacks.size > 0) {
            this._myValueChangedCallbacks.forEach(function (callback) { callback(this.getValue(), this); }.bind(this));
        }
    }
}

export class EasyTuneVariableArray extends EasyTuneVariable {

    constructor(name, type, value, engine) {
        super(name, type, engine);

        EasyTuneVariableArray.prototype.setValue.call(this, value, true);
    }

    getValue() {
        return this._myValue;
    }

    setValue(value, resetDefaultValue = false) {
        let valueChanged = this._myValue != null && !this._myValue.pp_equals(value);

        if (this._myValue == null) {
            this._myValue = value.pp_clone();
        } else {
            this._myValue.pp_copy(value);
        }

        if (resetDefaultValue) {
            EasyTuneVariableArray.prototype.setDefaultValue.call(this, value);
        }

        EasyTuneUtils.refreshEasyTuneWidget(this._myEngine);

        if (valueChanged) {
            this._triggerValueChangedCallback();
        }
    }

    setDefaultValue(value) {
        if (this._myDefaultValue == null) {
            this._myDefaultValue = value.pp_clone();
        } else {
            this._myDefaultValue.pp_copy(value);
        }
    }
}

// NUMBER

export class EasyTuneNumberArray extends EasyTuneVariableArray {

    constructor(name, value, stepPerSecond, decimalPlaces, min = null, max = null, editAllValuesTogether = false, engine) {
        super(name, EasyTuneVariableType.NUMBER, value, engine);

        this._myDecimalPlaces = decimalPlaces;
        this._myStepPerSecond = stepPerSecond;

        this._myDefaultStepPerSecond = this._myStepPerSecond;

        this._myMin = min;
        this._myMax = max;

        this._myEditAllValuesTogether = editAllValuesTogether;

        this._clampValue(true);
    }

    setMax(max) {
        this._myMax = max;
        this._clampValue(false);
    }

    setMin(min) {
        this._myMin = min;
        this._clampValue(false);
    }

    _clampValue(resetDefaultValue) {
        let clampedValue = this._myValue.vec_clamp(this._myMin, this._myMax);

        if (!resetDefaultValue) {
            let clampedDefaultValue = this.getDefaultValue().vec_clamp(this._myMin, this._myMax);
            let defaultValueChanged = !clampedDefaultValue.vec_equals(this.getDefaultValue(), 0.00001);
            if (defaultValueChanged) {
                EasyTuneVariableArray.prototype.setDefaultValue.call(this, clampedDefaultValue);
            }
        }

        EasyTuneVariableArray.prototype.setValue.call(this, clampedValue, resetDefaultValue);
    }
}

export class EasyTuneNumber extends EasyTuneNumberArray {

    constructor(name, value, stepPerSecond, decimalPlaces, min, max, engine) {
        super(name, [value], stepPerSecond, decimalPlaces, min, max, engine);
    }

    getValue() {
        return this._myValue[0];
    }

    setValue(value, resetDefaultValue = false) {
        super.setValue([value], resetDefaultValue);
    }

    setDefaultValue(value) {
        super.setDefaultValue([value]);
    }
}

export class EasyTuneInt extends EasyTuneNumber {

    constructor(name, value, stepPerSecond, min, max, engine) {
        super(name, value, stepPerSecond, 0, min, max, engine);
    }
}

export class EasyTuneIntArray extends EasyTuneNumberArray {

    constructor(name, value, stepPerSecond, min, max, editAllValuesTogether, engine) {
        let tempValue = value.pp_clone();

        for (let i = 0; i < value.length; i++) {
            tempValue[i] = Math.round(tempValue[i]);
        }

        super(name, tempValue, stepPerSecond, 0, min != null ? Math.round(min) : null, max != null ? Math.round(max) : max, editAllValuesTogether, engine);
    }
}

// BOOL

export class EasyTuneBoolArray extends EasyTuneVariableArray {

    constructor(name, value, engine) {
        super(name, EasyTuneVariableType.BOOL, value, engine);
    }
}

export class EasyTuneBool extends EasyTuneBoolArray {

    constructor(name, value, engine) {
        super(name, [value], engine);
    }

    getValue() {
        return this._myValue[0];
    }

    setValue(value, resetDefaultValue = false) {
        super.setValue([value], resetDefaultValue);
    }

    setDefaultValue(value) {
        super.setDefaultValue([value]);
    }
}

// EASY TUNE EASY TRANSFORM

export class EasyTuneTransform extends EasyTuneVariable {

    constructor(name, value, scaleAsOne = true, positionStepPerSecond = 1, rotationStepPerSecond = 50, scaleStepPerSecond = 1, engine) {
        super(name, EasyTuneVariableType.TRANSFORM, engine);

        this._myDecimalPlaces = 3;

        this._myPosition = value.mat4_getPosition();
        this._myRotation = value.mat4_getRotationDegrees();
        this._myScale = value.mat4_getScale();

        let decimalPlacesMultiplier = Math.pow(10, this._myDecimalPlaces);
        for (let i = 0; i < 3; i++) {
            this._myScale[i] = Math.max(this._myScale[i], 1 / decimalPlacesMultiplier);
        }

        this._myScaleAsOne = scaleAsOne;

        this._myPositionStepPerSecond = positionStepPerSecond;
        this._myRotationStepPerSecond = rotationStepPerSecond;
        this._myScaleStepPerSecond = scaleStepPerSecond;

        this._myDefaultPosition = this._myPosition.vec3_clone();
        this._myDefaultRotation = this._myRotation.vec3_clone();
        this._myDefaultScale = this._myScale.vec3_clone();

        this._myDefaultPositionStepPerSecond = this._myPositionStepPerSecond;
        this._myDefaultRotationStepPerSecond = this._myRotationStepPerSecond;
        this._myDefaultScaleStepPerSecond = this._myScaleStepPerSecond;

        this._myTransform = mat4_create();
        this._myTransform.mat4_setPositionRotationDegreesScale(this._myPosition, this._myRotation, this._myScale);

        this._myTempTransform = mat4_create();
    }

    getValue() {
        this._myTransform.mat4_setPositionRotationDegreesScale(this._myPosition, this._myRotation, this._myScale);
        return this._myTransform;
    }

    setValue(value, resetDefaultValue = false) {
        this._myTempTransform.mat4_setPositionRotationDegreesScale(this._myPosition, this._myRotation, this._myScale);

        value.mat4_getPosition(this._myPosition);
        value.mat4_getRotationDegrees(this._myRotation);
        value.mat4_getScale(this._myScale);

        this._myTransform.mat4_setPositionRotationDegreesScale(this._myPosition, this._myRotation, this._myScale);

        let valueChanged = !this._myTempTransform.pp_equals(this._myTransform)

        if (resetDefaultValue) {
            EasyTuneTransform.prototype.setDefaultValue.call(this, value);
        }

        EasyTuneUtils.refreshEasyTuneWidget(this._myEngine);

        if (valueChanged) {
            this._triggerValueChangedCallback();
        }
    }

    setDefaultValue(value) {
        this._myDefaultPosition = value.mat4_getPosition();
        this._myDefaultRotation = value.mat4_getRotationDegrees();
        this._myDefaultScale = value.mat4_getScale();
    }

    fromJSON(valueJSON, resetDefaultValue = false) {
        this.setValue(JSON.parse(valueJSON), resetDefaultValue);
    }

    toJSON() {
        return this.getValue().vec_toString();
    }
}