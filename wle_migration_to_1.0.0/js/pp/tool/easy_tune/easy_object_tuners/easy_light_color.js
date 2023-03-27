import { ColorUtils } from "../../../cauldron/utils/color_utils";

PP.EasyLightColor = class EasyLightColor extends PP.EasyObjectTuner {
    constructor(colorModel, object, variableName, setAsDefault, useTuneTarget) {
        super(object, variableName, setAsDefault, useTuneTarget);
        this._myColorModel = colorModel;
    }

    _getVariableNamePrefix() {
        let nameFirstPart = null;

        if (this._myColorModel == 0) {
            nameFirstPart = "Light RGB ";
        } else {
            nameFirstPart = "Light HSV ";
        }

        return nameFirstPart;
    }

    _createEasyTuneVariable(variableName) {
        return new PP.EasyTuneIntArray(variableName, this._getDefaultValue(), 100, 0, 255);
    }

    _getObjectValue(object) {
        let color = null;

        let lightColor = this._getLightColor(object);
        if (lightColor) {
            if (this._myColorModel == 0) {
                color = ColorUtils.rgbCodeToHuman(lightColor);
            } else {
                color = ColorUtils.hsvCodeToHuman(ColorUtils.rgbToHsv(lightColor));
            }
        } else {
            color = this._getDefaultValue();
        }

        return color;
    }

    _getDefaultValue() {
        return PP.vec3_create();
    }

    _updateObjectValue(object, value) {
        let color = value;

        if (this._myColorModel == 0) {
            color = ColorUtils.rgbHumanToCode(color);
        } else {
            color = ColorUtils.hsvToRgb(ColorUtils.hsvHumanToCode(color));
        }

        let light = object.pp_getComponent("light");
        if (light) {
            light.color[0] = color[0];
            light.color[1] = color[1];
            light.color[2] = color[2];
            light.color[3] = light.color[3];
        }

        if ((PP.myRightGamepad.getButtonInfo(PP.GamepadButtonID.TOP_BUTTON).isPressStart() && PP.myLeftGamepad.getButtonInfo(PP.GamepadButtonID.TOP_BUTTON).myIsPressed) ||
            (PP.myLeftGamepad.getButtonInfo(PP.GamepadButtonID.TOP_BUTTON).isPressStart() && PP.myRightGamepad.getButtonInfo(PP.GamepadButtonID.TOP_BUTTON).myIsPressed)) {

            let hsvColor = ColorUtils.color1To255(ColorUtils.rgbToHsv(color));
            let rgbColor = ColorUtils.color1To255(color);

            console.log("RGB:", rgbColor.vec_toString(0), "- HSV:", hsvColor.vec_toString(0));
        }
    }

    _getLightColor(object) {
        let color = null;
        let light = object.pp_getComponent("light");
        if (light) {
            color = light.color.slice(0, 3);
        }

        return color;
    }
};