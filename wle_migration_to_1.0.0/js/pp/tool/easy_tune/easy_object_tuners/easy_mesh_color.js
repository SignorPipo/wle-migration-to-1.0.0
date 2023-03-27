import { ColorUtils } from "../../../cauldron/utils/color_utils";

PP.EasyMeshColor = class EasyMeshColor extends PP.EasyObjectTuner {
    constructor(colorModel, colorType, object, variableName, setAsDefault, useTuneTarget) {
        super(object, variableName, setAsDefault, useTuneTarget);
        this._myColorModel = colorModel;
        this._myColorType = colorType;
        this._myColorVariableNames = ["color", "diffuseColor", "ambientColor", "specularColor", "emissiveColor", "fogColor", "ambientFactor",];
    }

    _getVariableNamePrefix() {
        let nameFirstPart = null;

        if (this._myColorModel == 0) {
            nameFirstPart = "Mesh RGB ";
        } else {
            nameFirstPart = "Mesh HSV ";
        }

        return nameFirstPart;
    }

    _createEasyTuneVariable(variableName) {
        if (this._myColorType == 6) {
            return new PP.EasyTuneNumberArray(variableName, this._getDefaultValue(), 0.1, 3, 0, 1);
        }
        return new PP.EasyTuneIntArray(variableName, this._getDefaultValue(), 100, 0, 255);
    }

    _getObjectValue(object) {
        let color = null;

        let meshMaterial = this._getMeshMaterial(object);
        if (meshMaterial) {
            if (this._myColorType != 6) {
                color = meshMaterial[this._myColorVariableNames[this._myColorType]].pp_clone();

                if (this._myColorModel == 0) {
                    color = ColorUtils.rgbCodeToHuman(color);
                } else {
                    color = ColorUtils.hsvCodeToHuman(ColorUtils.rgbToHsv(color));
                }
            } else {
                color = [meshMaterial[this._myColorVariableNames[this._myColorType]]];
            }
        } else {
            color = this._getDefaultValue();
        }

        return color;
    }

    _getDefaultValue() {
        if (this._myColorType == 6) {
            return [0];
        }

        return vec4_create();
    }

    _updateObjectValue(object, value) {
        let color = value;

        if (this._myColorType != 6) {
            if (this._myColorModel == 0) {
                color = ColorUtils.rgbHumanToCode(color);
            } else {
                color = ColorUtils.hsvToRgb(ColorUtils.hsvHumanToCode(color));
            }
        }

        let meshMaterial = this._getMeshMaterial(object);
        if (meshMaterial) {
            meshMaterial[this._myColorVariableNames[this._myColorType]] = color;
        }

        if (this._myColorType != 6) {
            if ((PP.myRightGamepad.getButtonInfo(PP.GamepadButtonID.TOP_BUTTON).isPressStart() && PP.myLeftGamepad.getButtonInfo(PP.GamepadButtonID.TOP_BUTTON).myIsPressed) ||
                (PP.myLeftGamepad.getButtonInfo(PP.GamepadButtonID.TOP_BUTTON).isPressStart() && PP.myRightGamepad.getButtonInfo(PP.GamepadButtonID.TOP_BUTTON).myIsPressed)) {

                let hsvColor = ColorUtils.color1To255(ColorUtils.rgbToHsv(color));
                let rgbColor = ColorUtils.color1To255(color);

                console.log("RGB:", rgbColor.vec_toString(0), "- HSV:", hsvColor.vec_toString(0));
            }
        }
    }

    _getMeshMaterial(object) {
        let material = null;
        let mesh = object.pp_getComponentHierarchy(MeshComponent);
        if (mesh) {
            material = mesh.material;
        }

        return material;
    }
};