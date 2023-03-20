import { Component, Type } from "@wonderlandengine/api";

PP.VirtualGamepadComponent = class VirtualGamepadComponent extends Component {
    static TypeName = "pp-virtual-gamepad";
    static Properties = {
        _myShowOnDesktop: { type: Type.Bool, default: false },   // you may have to enable headset too
        _myShowOnMobile: { type: Type.Bool, default: true },
        _myShowOnHeadset: { type: Type.Bool, default: false },   // not 100% reliable, this is true if the device supports vr and it is desktop
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
        _myLeftSelectButtonIconType: { type: Type.Enum, values: ["none", "label", "image", "dot", "circle", "square", "ring", "frame"], default: "frame" },
        _myLeftSelectButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myLeftSqueezeButtonVisible: { type: Type.Bool, default: true },
        _myLeftSqueezeButtonOrderIndex: { type: Type.Int, default: 0 },
        _myLeftSqueezeButtonIconType: { type: Type.Enum, values: ["none", "label", "image", "dot", "circle", "square", "ring", "frame"], default: "square" },
        _myLeftSqueezeButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myLeftThumbstickButtonVisible: { type: Type.Bool, default: true },
        _myLeftThumbstickButtonOrderIndex: { type: Type.Int, default: 4 },
        _myLeftThumbstickButtonIconType: { type: Type.Enum, values: ["none", "label", "image", "dot", "circle", "square", "ring", "frame"], default: "dot" },
        _myLeftThumbstickButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myLeftTopButtonVisible: { type: Type.Bool, default: true },
        _myLeftTopButtonOrderIndex: { type: Type.Int, default: 2 },
        _myLeftTopButtonIconType: { type: Type.Enum, values: ["none", "label", "image", "dot", "circle", "square", "ring", "frame"], default: "circle" },
        _myLeftTopButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myLeftBottomButtonVisible: { type: Type.Bool, default: true },
        _myLeftBottomButtonOrderIndex: { type: Type.Int, default: 3 },
        _myLeftBottomButtonIconType: { type: Type.Enum, values: ["none", "label", "image", "dot", "circle", "square", "ring", "frame"], default: "ring" },
        _myLeftBottomButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myRightSelectButtonVisible: { type: Type.Bool, default: true },
        _myRightSelectButtonOrderIndex: { type: Type.Int, default: 1 },
        _myRightSelectButtonIconType: { type: Type.Enum, values: ["none", "label", "image", "dot", "circle", "square", "ring", "frame"], default: "frame" },
        _myRightSelectButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myRightSqueezeButtonVisible: { type: Type.Bool, default: true },
        _myRightSqueezeButtonOrderIndex: { type: Type.Int, default: 0 },
        _myRightSqueezeButtonIconType: { type: Type.Enum, values: ["none", "label", "image", "dot", "circle", "square", "ring", "frame"], default: "square" },
        _myRightSqueezeButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myRightThumbstickButtonVisible: { type: Type.Bool, default: true },
        _myRightThumbstickButtonOrderIndex: { type: Type.Int, default: 4 },
        _myRightThumbstickButtonIconType: { type: Type.Enum, values: ["none", "label", "image", "dot", "circle", "square", "ring", "frame"], default: "dot" },
        _myRightThumbstickButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myRightTopButtonVisible: { type: Type.Bool, default: true },
        _myRightTopButtonOrderIndex: { type: Type.Int, default: 2 },
        _myRightTopButtonIconType: { type: Type.Enum, values: ["none", "label", "image", "dot", "circle", "square", "ring", "frame"], default: "circle" },
        _myRightTopButtonIconLabelOrImageUrl: { type: Type.String, default: "" },

        _myRightBottomButtonVisible: { type: Type.Bool, default: true },
        _myRightBottomButtonOrderIndex: { type: Type.Int, default: 3 },
        _myRightBottomButtonIconType: { type: Type.Enum, values: ["none", "label", "image", "dot", "circle", "square", "ring", "frame"], default: "ring" },
        _myRightBottomButtonIconLabelOrImageUrl: { type: Type.String, default: "" }
    };

    start() {
        let params = new PP.VirtualGamepadParams();
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
            let thumbstickParams = params.myThumbstickParams[handedness];
            thumbstickParams.myBackgroundColor = this._myBackgroundColor;
            thumbstickParams.myIconParams.myBackgroundColor = this._myIconColor;
            thumbstickParams.myIconParams.myBackgroundPressedColor = this._myIconColor;
            thumbstickParams.myIconParams.myIconColor = this._myBackgroundColor;
            thumbstickParams.myIconParams.myIconPressedColor = this._myBackgroundColor;
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

        this._myVirtualGamepad = new PP.VirtualGamepad(params);
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
                let leftVirtualGamepadGamepadCore = new PP.VirtualGamepadGamepadCore(this._myVirtualGamepad, PP.Handedness.LEFT, PP.myLeftGamepad.getGamepadCore("left_xr_gamepad").getHandPose());
                let rightVirtualGamepadGamepadCore = new PP.VirtualGamepadGamepadCore(this._myVirtualGamepad, PP.Handedness.RIGHT, PP.myRightGamepad.getGamepadCore("right_xr_gamepad").getHandPose());

                PP.myLeftGamepad.addGamepadCore("left_virtual_gamepad", leftVirtualGamepadGamepadCore);
                PP.myRightGamepad.addGamepadCore("right_virtual_gamepad", rightVirtualGamepadGamepadCore);
            }
        }

        this._myVirtualGamepad.update(dt);
    }

    _advancedSetup(params) {
        params.myButtonsOrder[PP.Handedness.LEFT] = [null, null, null, null, null];
        params.myButtonsOrder[PP.Handedness.RIGHT] = [null, null, null, null, null];

        {
            let buttonParams = params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT];
            buttonParams.myIconParams.myIconType = this._myLeftSelectButtonIconType;
            buttonParams.myIconParams.myLabel = this._myLeftSelectIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myLeftSelectIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myLeftSelectButtonVisible) {
                params.myButtonsOrder[PP.Handedness.LEFT][this._myLeftSelectButtonOrderIndex] = [PP.Handedness.LEFT, PP.GamepadButtonID.SELECT];
            }
        }

        {
            let buttonParams = params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SQUEEZE];
            buttonParams.myIconParams.myIconType = this._myLeftSqueezeButtonIconType;
            buttonParams.myIconParams.myLabel = this._myLeftSqueezeIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myLeftSqueezeIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myLeftSqueezeButtonVisible) {
                params.myButtonsOrder[PP.Handedness.LEFT][this._myLeftSqueezeButtonOrderIndex] = [PP.Handedness.LEFT, PP.GamepadButtonID.SQUEEZE];
            }
        }

        {
            let buttonParams = params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.THUMBSTICK];
            buttonParams.myIconParams.myIconType = this._myLeftThumbstickButtonIconType;
            buttonParams.myIconParams.myLabel = this._myLeftThumbstickButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myLeftThumbstickButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myLeftThumbstickButtonVisible) {
                params.myButtonsOrder[PP.Handedness.LEFT][this._myLeftThumbstickButtonOrderIndex] = [PP.Handedness.LEFT, PP.GamepadButtonID.THUMBSTICK];
            }
        }

        {
            let buttonParams = params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.TOP_BUTTON];
            buttonParams.myIconParams.myIconType = this._myLeftTopButtonIconType;
            buttonParams.myIconParams.myLabel = this._myLeftTopButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myLeftTopButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myLeftTopButtonVisible) {
                params.myButtonsOrder[PP.Handedness.LEFT][this._myLeftTopButtonOrderIndex] = [PP.Handedness.LEFT, PP.GamepadButtonID.TOP_BUTTON];
            }
        }

        {
            let buttonParams = params.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.BOTTOM_BUTTON];
            buttonParams.myIconParams.myIconType = this._myLeftBottomButtonIconType;
            buttonParams.myIconParams.myLabel = this._myLeftBottomButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myLeftBottomButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myLeftBottomButtonVisible) {
                params.myButtonsOrder[PP.Handedness.LEFT][this._myLeftBottomButtonOrderIndex] = [PP.Handedness.LEFT, PP.GamepadButtonID.BOTTOM_BUTTON];
            }
        }

        {
            let buttonParams = params.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SELECT];
            buttonParams.myIconParams.myIconType = this._myRightSelectButtonIconType;
            buttonParams.myIconParams.myLabel = this._myRightSelectIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myRightSelectIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myRightSelectButtonVisible) {
                params.myButtonsOrder[PP.Handedness.RIGHT][this._myRightSelectButtonOrderIndex] = [PP.Handedness.RIGHT, PP.GamepadButtonID.SELECT];
            }
        }

        {
            let buttonParams = params.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SQUEEZE];
            buttonParams.myIconParams.myIconType = this._myRightSqueezeButtonIconType;
            buttonParams.myIconParams.myLabel = this._myRightSqueezeIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myRightSqueezeIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myRightSqueezeButtonVisible) {
                params.myButtonsOrder[PP.Handedness.RIGHT][this._myRightSqueezeButtonOrderIndex] = [PP.Handedness.RIGHT, PP.GamepadButtonID.SQUEEZE];
            }
        }

        {
            let buttonParams = params.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.THUMBSTICK];
            buttonParams.myIconParams.myIconType = this._myRightThumbstickButtonIconType;
            buttonParams.myIconParams.myLabel = this._myRightThumbstickButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myRightThumbstickButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myRightThumbstickButtonVisible) {
                params.myButtonsOrder[PP.Handedness.RIGHT][this._myRightThumbstickButtonOrderIndex] = [PP.Handedness.RIGHT, PP.GamepadButtonID.THUMBSTICK];
            }
        }

        {
            let buttonParams = params.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON];
            buttonParams.myIconParams.myIconType = this._myRightTopButtonIconType;
            buttonParams.myIconParams.myLabel = this._myRightTopButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myRightTopButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myRightTopButtonVisible) {
                params.myButtonsOrder[PP.Handedness.RIGHT][this._myRightTopButtonOrderIndex] = [PP.Handedness.RIGHT, PP.GamepadButtonID.TOP_BUTTON];
            }
        }

        {
            let buttonParams = params.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.BOTTOM_BUTTON];
            buttonParams.myIconParams.myIconType = this._myRightBottomButtonIconType;
            buttonParams.myIconParams.myLabel = this._myRightBottomButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myImageURL = this._myRightBottomButtonIconLabelOrImageUrl;
            buttonParams.myIconParams.myLabelFontSize = this._myLabelFontSize;
            buttonParams.myIconParams.myLabelFontFamily = this._myLabelFontFamily;
            buttonParams.myIconParams.myLabelFontWeight = this._myLabelFontWeight;
            buttonParams.myIconParams.myImagePressedBrightness = this._myImagePressedBrightness;

            if (this._myRightBottomButtonVisible) {
                params.myButtonsOrder[PP.Handedness.RIGHT][this._myRightBottomButtonOrderIndex] = [PP.Handedness.RIGHT, PP.GamepadButtonID.BOTTOM_BUTTON];
            }
        }
    }
};