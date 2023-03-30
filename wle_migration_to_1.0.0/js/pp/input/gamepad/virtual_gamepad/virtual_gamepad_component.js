import { Component, Type } from "@wonderlandengine/api";
import { getLeftGamepad, getRightGamepad } from "../../cauldron/input_globals";
import { Handedness } from "../../cauldron/input_types";
import { GamepadButtonID } from "../gamepad_buttons";
import { VirtualGamepadGamepadCore } from "../gamepad_cores/virtual_gamepad_gamepad_core";
import { VirtualGamepad } from "./virtual_gamepad";
import { VirtualGamepadParams } from "./virtual_gamepad_params";

export class VirtualGamepadComponent extends Component {
    static TypeName = "pp-virtual-gamepad";
    static Properties = {
        _myShowOnDesktop: { type: Type.Bool, default: false },   // You may have to enable headset too
        _myShowOnMobile: { type: Type.Bool, default: true },
        _myShowOnHeadset: { type: Type.Bool, default: false },   // Not 100% reliable, this is true if the device supports VR and it is Desktop
        _myAddToUniversalGamepad: { type: Type.Bool, default: true },
        _myOpacity: { type: Type.Float, default: 0.5 },
        _myIconColor: { type: Type.String, default: "#e0e0e0" },
        _myBackgroundColor: { type: Type.String, default: "#616161" },
        _myInterfaceScale: { type: Type.Float, default: 1 },
        _myMarginScale: { type: Type.Float, default: 1 },

        ADVANCED_PARAMS_BELOW: { type: Type.String, default: "" },

        _myLabelFontSize: { type: Type.Float, default: 2 },
        _myLabelFontFamily: { type: Type.String, default: "sans-serif" },
        _myLabelFontWeight: { type: Type.String, default: "bold" },
        _myImagePressedBrightness: { type: Type.Float, default: 0.5 },

        _myLeftSelectButtonVisible: { type: Type.Bool, default: true },
        _myLeftSelectButtonOrderIndex: { type: Type.Int, default: 1 },
        _myLeftSelectButtonIconType: { type: Type.Enum, values: ["None", "Label", "Image", "Dot", "Circle", "Square", "Ring", "Frame"], default: "Frame" },
        _myLeftSelectButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myLeftSqueezeButtonVisible: { type: Type.Bool, default: true },
        _myLeftSqueezeButtonOrderIndex: { type: Type.Int, default: 0 },
        _myLeftSqueezeButtonIconType: { type: Type.Enum, values: ["None", "Label", "Image", "Dot", "Circle", "Square", "Ring", "Frame"], default: "Square" },
        _myLeftSqueezeButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myLeftThumbstickButtonVisible: { type: Type.Bool, default: true },
        _myLeftThumbstickButtonOrderIndex: { type: Type.Int, default: 4 },
        _myLeftThumbstickButtonIconType: { type: Type.Enum, values: ["None", "Label", "Image", "Dot", "Circle", "Square", "Ring", "Frame"], default: "Dot" },
        _myLeftThumbstickButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myLeftTopButtonVisible: { type: Type.Bool, default: true },
        _myLeftTopButtonOrderIndex: { type: Type.Int, default: 2 },
        _myLeftTopButtonIconType: { type: Type.Enum, values: ["None", "Label", "Image", "Dot", "Circle", "Square", "Ring", "Frame"], default: "Circle" },
        _myLeftTopButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myLeftBottomButtonVisible: { type: Type.Bool, default: true },
        _myLeftBottomButtonOrderIndex: { type: Type.Int, default: 3 },
        _myLeftBottomButtonIconType: { type: Type.Enum, values: ["None", "Label", "Image", "Dot", "Circle", "Square", "Ring", "Frame"], default: "Ring" },
        _myLeftBottomButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myRightSelectButtonVisible: { type: Type.Bool, default: true },
        _myRightSelectButtonOrderIndex: { type: Type.Int, default: 1 },
        _myRightSelectButtonIconType: { type: Type.Enum, values: ["None", "Label", "Image", "Dot", "Circle", "Square", "Ring", "Frame"], default: "Frame" },
        _myRightSelectButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myRightSqueezeButtonVisible: { type: Type.Bool, default: true },
        _myRightSqueezeButtonOrderIndex: { type: Type.Int, default: 0 },
        _myRightSqueezeButtonIconType: { type: Type.Enum, values: ["None", "Label", "Image", "Dot", "Circle", "Square", "Ring", "Frame"], default: "Square" },
        _myRightSqueezeButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myRightThumbstickButtonVisible: { type: Type.Bool, default: true },
        _myRightThumbstickButtonOrderIndex: { type: Type.Int, default: 4 },
        _myRightThumbstickButtonIconType: { type: Type.Enum, values: ["None", "Label", "Image", "Dot", "Circle", "Square", "Ring", "Frame"], default: "Dot" },
        _myRightThumbstickButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myRightTopButtonVisible: { type: Type.Bool, default: true },
        _myRightTopButtonOrderIndex: { type: Type.Int, default: 2 },
        _myRightTopButtonIconType: { type: Type.Enum, values: ["None", "Label", "Image", "Dot", "Circle", "Square", "Ring", "Frame"], default: "Circle" },
        _myRightTopButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myRightBottomButtonVisible: { type: Type.Bool, default: true },
        _myRightBottomButtonOrderIndex: { type: Type.Int, default: 3 },
        _myRightBottomButtonIconType: { type: Type.Enum, values: ["None", "Label", "Image", "Dot", "Circle", "Square", "Ring", "Frame"], default: "Ring" },
        _myRightBottomButtonIconLabelOrImageUrl: { type: Type.String, default: "" }
    };

    start() {
        let params = new VirtualGamepadParams(this.engine);
        params.defaultSetup();

        for (let handedness in params.myButtonParams) {
            for (let gamepadButtonID in params.myButtonParams[handedness]) {
                let buttonParams = params.myButtonParams[handedness][gamepadButtonID];
                buttonParams.myIconParams.myBackgroundColor = this._myBackgroundColor;
                buttonParams.myIconParams.myBackgroundPressedColor = this._myIconColor;
                buttonParams.myIconParams.myIconColor = this._myIconColor;
                buttonParams.myIconParams.myIconPressedColor = this._myBackgroundColor;
            }
        }

        for (let handedness in params.myThumbstickParams) {
            for (let gamepadAxesID in params.myThumbstickParams[handedness]) {
                let thumbstickParams = params.myThumbstickParams[handedness][gamepadAxesID];
                thumbstickParams.myBackgroundColor = this._myBackgroundColor;
                thumbstickParams.myIconParams.myBackgroundColor = this._myIconColor;
                thumbstickParams.myIconParams.myBackgroundPressedColor = this._myIconColor;
                thumbstickParams.myIconParams.myIconColor = this._myBackgroundColor;
                thumbstickParams.myIconParams.myIconPressedColor = this._myBackgroundColor;
            }
        }

        params.myOpacity = this._myOpacity;

        params.myInterfaceScale = this._myInterfaceScale;
        params.myMarginScale = this._myMarginScale;

        params.myShowOnDesktop = this._myShowOnDesktop;
        params.myShowOnMobile = this._myShowOnMobile;
        params.myShowOnHeadset = this._myShowOnHeadset;

        if (params.myShowOnDesktop || params.myShowOnMobile || params.myShowOnHeadset) {
            params.myAutoUpdateVisibility = true;
        } else {
            params.myAutoUpdateVisibility = false;
        }

        this._advancedSetup(params);

        this._myVirtualGamepad = new VirtualGamepad(params);
        if (!params.myAutoUpdateVisibility) {
            this._myVirtualGamepad.setVisible(false);
        }

        this._myVirtualGamepad.start();

        this._myFirstUpdate = true;
    }

    update(dt) {
        if (this._myFirstUpdate) {
            this._myFirstUpdate = false;

            if (this._myAddToUniversalGamepad) {
                let leftVirtualGamepadGamepadCore = new VirtualGamepadGamepadCore(this._myVirtualGamepad, getLeftGamepad(this.engine).getGamepadCore("pp_left_xr_gamepad").getHandPose());
                let rightVirtualGamepadGamepadCore = new VirtualGamepadGamepadCore(this._myVirtualGamepad, getRightGamepad(this.engine).getGamepadCore("pp_right_xr_gamepad").getHandPose());

                getLeftGamepad(this.engine).addGamepadCore("pp_left_virtual_gamepad", leftVirtualGamepadGamepadCore);
                getRightGamepad(this.engine).addGamepadCore("pp_right_virtual_gamepad", rightVirtualGamepadGamepadCore);
            }
        }

        this._myVirtualGamepad.update(dt);
    }

    _advancedSetup(params) {
        params.myButtonsOrder[Handedness.LEFT] = [null, null, null, null, null];
        params.myButtonsOrder[Handedness.RIGHT] = [null, null, null, null, null];

        {
            let buttonParams = params.myButtonParams[Handedness.LEFT][GamepadButtonID.SELECT];
            buttonParams.myIconParams.myIconType = this._myLeftSelectButtonIconType;
            buttonParams.myIconParams.myLabel = this._myLeftSelectIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myLeftSelectIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myLeftSelectButtonVisible) {
                params.myButtonsOrder[Handedness.LEFT][this._myLeftSelectButtonOrderIndex] = [Handedness.LEFT, GamepadButtonID.SELECT];
            }
        }

        {
            let buttonParams = params.myButtonParams[Handedness.LEFT][GamepadButtonID.SQUEEZE];
            buttonParams.myIconParams.myIconType = this._myLeftSqueezeButtonIconType;
            buttonParams.myIconParams.myLabel = this._myLeftSqueezeIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myLeftSqueezeIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myLeftSqueezeButtonVisible) {
                params.myButtonsOrder[Handedness.LEFT][this._myLeftSqueezeButtonOrderIndex] = [Handedness.LEFT, GamepadButtonID.SQUEEZE];
            }
        }

        {
            let buttonParams = params.myButtonParams[Handedness.LEFT][GamepadButtonID.THUMBSTICK];
            buttonParams.myIconParams.myIconType = this._myLeftThumbstickButtonIconType;
            buttonParams.myIconParams.myLabel = this._myLeftThumbstickButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myLeftThumbstickButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myLeftThumbstickButtonVisible) {
                params.myButtonsOrder[Handedness.LEFT][this._myLeftThumbstickButtonOrderIndex] = [Handedness.LEFT, GamepadButtonID.THUMBSTICK];
            }
        }

        {
            let buttonParams = params.myButtonParams[Handedness.LEFT][GamepadButtonID.TOP_BUTTON];
            buttonParams.myIconParams.myIconType = this._myLeftTopButtonIconType;
            buttonParams.myIconParams.myLabel = this._myLeftTopButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myLeftTopButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myLeftTopButtonVisible) {
                params.myButtonsOrder[Handedness.LEFT][this._myLeftTopButtonOrderIndex] = [Handedness.LEFT, GamepadButtonID.TOP_BUTTON];
            }
        }

        {
            let buttonParams = params.myButtonParams[Handedness.LEFT][GamepadButtonID.BOTTOM_BUTTON];
            buttonParams.myIconParams.myIconType = this._myLeftBottomButtonIconType;
            buttonParams.myIconParams.myLabel = this._myLeftBottomButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myLeftBottomButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myLeftBottomButtonVisible) {
                params.myButtonsOrder[Handedness.LEFT][this._myLeftBottomButtonOrderIndex] = [Handedness.LEFT, GamepadButtonID.BOTTOM_BUTTON];
            }
        }

        {
            let buttonParams = params.myButtonParams[Handedness.RIGHT][GamepadButtonID.SELECT];
            buttonParams.myIconParams.myIconType = this._myRightSelectButtonIconType;
            buttonParams.myIconParams.myLabel = this._myRightSelectIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myRightSelectIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myRightSelectButtonVisible) {
                params.myButtonsOrder[Handedness.RIGHT][this._myRightSelectButtonOrderIndex] = [Handedness.RIGHT, GamepadButtonID.SELECT];
            }
        }

        {
            let buttonParams = params.myButtonParams[Handedness.RIGHT][GamepadButtonID.SQUEEZE];
            buttonParams.myIconParams.myIconType = this._myRightSqueezeButtonIconType;
            buttonParams.myIconParams.myLabel = this._myRightSqueezeIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myRightSqueezeIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myRightSqueezeButtonVisible) {
                params.myButtonsOrder[Handedness.RIGHT][this._myRightSqueezeButtonOrderIndex] = [Handedness.RIGHT, GamepadButtonID.SQUEEZE];
            }
        }

        {
            let buttonParams = params.myButtonParams[Handedness.RIGHT][GamepadButtonID.THUMBSTICK];
            buttonParams.myIconParams.myIconType = this._myRightThumbstickButtonIconType;
            buttonParams.myIconParams.myLabel = this._myRightThumbstickButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myRightThumbstickButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myRightThumbstickButtonVisible) {
                params.myButtonsOrder[Handedness.RIGHT][this._myRightThumbstickButtonOrderIndex] = [Handedness.RIGHT, GamepadButtonID.THUMBSTICK];
            }
        }

        {
            let buttonParams = params.myButtonParams[Handedness.RIGHT][GamepadButtonID.TOP_BUTTON];
            buttonParams.myIconParams.myIconType = this._myRightTopButtonIconType;
            buttonParams.myIconParams.myLabel = this._myRightTopButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myRightTopButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myRightTopButtonVisible) {
                params.myButtonsOrder[Handedness.RIGHT][this._myRightTopButtonOrderIndex] = [Handedness.RIGHT, GamepadButtonID.TOP_BUTTON];
            }
        }

        {
            let buttonParams = params.myButtonParams[Handedness.RIGHT][GamepadButtonID.BOTTOM_BUTTON];
            buttonParams.myIconParams.myIconType = this._myRightBottomButtonIconType;
            buttonParams.myIconParams.myLabel = this._myRightBottomButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myRightBottomButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myRightBottomButtonVisible) {
                params.myButtonsOrder[Handedness.RIGHT][this._myRightBottomButtonOrderIndex] = [Handedness.RIGHT, GamepadButtonID.BOTTOM_BUTTON];
            }
        }
    }
}