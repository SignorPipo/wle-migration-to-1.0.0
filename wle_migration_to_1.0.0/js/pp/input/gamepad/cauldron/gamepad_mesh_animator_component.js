import { Component, Type } from "@wonderlandengine/api";

export class GamepadMeshAnimatorComponent extends Component {
    static TypeName = "pp-gamepad-mesh-animator";
    static Properties = {
        _myHandedness: { type: Type.Enum, values: ["left", "right"], default: "left" },
        _mySelect: { type: Type.Object, default: null },
        _mySqueeze: { type: Type.Object, default: null },
        _myThumbstick: { type: Type.Object, default: null },
        _myTopButton: { type: Type.Object, default: null },
        _myBottomButton: { type: Type.Object, default: null },
        _mySelectRotateAngle: { type: Type.Float, default: 15 },
        _mySqueezeRotateAngle: { type: Type.Float, default: 11 },
        _myThumbstickRotateAngle: { type: Type.Float, default: 15 },
        _myThumbstickPressOffset: { type: Type.Float, default: 0.000625 },
        _myTopButtonPressOffset: { type: Type.Float, default: 0.0015 },
        _myBottomButtonPressOffset: { type: Type.Float, default: 0.0015 },
        _myUsePressForSqueeze: { type: Type.Bool, default: false },
        _mySqueezePressOffset: { type: Type.Float, default: 0.0015 }
    };

    start() {
        let gamepad = null;
        if (this._myHandedness == 0) {
            gamepad = PP.myLeftGamepad;
        } else {
            gamepad = PP.myRightGamepad;
        }

        if (this._mySelect != null) {
            this._mySelectOriginalRotation = this._mySelect.pp_getRotationLocalQuat();
            this._mySelectOriginalLeft = this._mySelect.pp_getLeftLocal();
        }

        if (this._mySqueeze != null) {
            this._mySqueezeOriginalPosition = this._mySqueeze.pp_getPositionLocal();
            this._mySqueezeOriginalRotation = this._mySqueeze.pp_getRotationLocalQuat();
            this._mySqueezeOriginalLeft = this._mySqueeze.pp_getLeftLocal();
            this._mySqueezeOriginalForward = this._mySqueeze.pp_getForwardLocal();
        }

        if (this._myThumbstick != null) {
            this._myThumbstickOriginalPosition = this._myThumbstick.pp_getPositionLocal();
            this._myThumbstickOriginalRotation = this._myThumbstick.pp_getRotationLocalQuat();
            this._myThumbstickOriginalLeft = this._myThumbstick.pp_getLeftLocal();
            this._myThumbstickOriginalUp = this._myThumbstick.pp_getUpLocal();
            this._myThumbstickOriginalForward = this._myThumbstick.pp_getForwardLocal();
        }

        if (this._myTopButton != null) {
            this._myTopButtonOriginalPosition = this._myTopButton.pp_getPositionLocal();
            this._myTopButtonOriginalUp = this._myTopButton.pp_getUpLocal();
        }

        if (this._myBottomButton != null) {
            this._myBottomButtonOriginalPosition = this._myBottomButton.pp_getPositionLocal();
            this._myBottomButtonOriginalUp = this._myBottomButton.pp_getUpLocal();
        }

        // PRESSED
        if (this._myThumbstick != null) {
            gamepad.registerButtonEventListener(PP.GamepadButtonID.THUMBSTICK, PP.GamepadButtonEvent.PRESS_START, this, this._thumbstickPressedStart.bind(this));
            gamepad.registerButtonEventListener(PP.GamepadButtonID.THUMBSTICK, PP.GamepadButtonEvent.PRESS_END, this, this._thumbstickPressedEnd.bind(this));
        }

        if (this._myTopButton != null) {
            gamepad.registerButtonEventListener(PP.GamepadButtonID.TOP_BUTTON, PP.GamepadButtonEvent.PRESS_START, this, this._topButtonPressedStart.bind(this));
            gamepad.registerButtonEventListener(PP.GamepadButtonID.TOP_BUTTON, PP.GamepadButtonEvent.PRESS_END, this, this._topButtonPressedEnd.bind(this));
        }

        if (this._myBottomButton != null) {

            gamepad.registerButtonEventListener(PP.GamepadButtonID.BOTTOM_BUTTON, PP.GamepadButtonEvent.PRESS_START, this, this._bottomButtonPressedStart.bind(this));
            gamepad.registerButtonEventListener(PP.GamepadButtonID.BOTTOM_BUTTON, PP.GamepadButtonEvent.PRESS_END, this, this._bottomButtonPressedEnd.bind(this));
        }

        // VALUE CHANGED
        if (this._mySelect != null) {
            gamepad.registerButtonEventListener(PP.GamepadButtonID.SELECT, PP.GamepadButtonEvent.VALUE_CHANGED, this, this._selectValueChanged.bind(this));
        }

        if (this._mySqueeze != null) {
            gamepad.registerButtonEventListener(PP.GamepadButtonID.SQUEEZE, PP.GamepadButtonEvent.VALUE_CHANGED, this, this._squeezeValueChanged.bind(this));
        }

        // AXES CHANGED
        if (this._myThumbstick != null) {
            gamepad.registerAxesEventListener(PP.GamepadAxesID.THUMBSTICK, PP.GamepadAxesEvent.AXES_CHANGED, this, this._thumbstickValueChanged.bind(this));
        }
    }

    _thumbstickPressedStart() {
        // implemented outside class definition
    }

    _thumbstickPressedEnd(buttonInfo, gamepad) {
        this._myThumbstick.pp_setPositionLocal(this._myThumbstickOriginalPosition);
    }

    _topButtonPressedStart(buttonInfo, gamepad) {
        this._myTopButton.pp_translateAxisLocal(-this._myTopButtonPressOffset, this._myTopButtonOriginalUp);
    }

    _topButtonPressedEnd(buttonInfo, gamepad) {
        this._myTopButton.pp_setPositionLocal(this._myTopButtonOriginalPosition);
    }

    _bottomButtonPressedStart(buttonInfo, gamepad) {
        this._myBottomButton.pp_translateAxisLocal(-this._myBottomButtonPressOffset, this._myBottomButtonOriginalUp);
    }

    _bottomButtonPressedEnd(buttonInfo, gamepad) {
        this._myBottomButton.pp_setPositionLocal(this._myBottomButtonOriginalPosition);
    }

    _selectValueChanged(buttonInfo, gamepad) {
        this._mySelect.pp_setRotationLocalQuat(this._mySelectOriginalRotation);

        if (buttonInfo.myValue > 0.00001) {
            this._mySelect.pp_rotateAxisLocal(this._mySelectRotateAngle * buttonInfo.myValue, this._mySelectOriginalLeft);
        }
    }

    _squeezeValueChanged(buttonInfo, gamepad) {
        this._mySqueeze.pp_setPositionLocal(this._mySqueezeOriginalPosition);
        this._mySqueeze.pp_setRotationLocalQuat(this._mySqueezeOriginalRotation);

        if (buttonInfo.myValue > 0.00001) {
            if (this._myUsePressForSqueeze) {
                let translation = this._mySqueezePressOffset;
                if (this._myHandedness == 1) {
                    translation *= -1;
                }

                this._mySqueeze.pp_translateAxisLocal(translation * buttonInfo.myValue, this._mySqueezeOriginalLeft);
            } else {
                let rotation = -this._mySqueezeRotateAngle;
                if (this._myHandedness == 1) {
                    rotation *= -1;
                }

                this._mySqueeze.pp_rotateAxisLocal(rotation * buttonInfo.myValue, this._mySqueezeOriginalForward);
            }
        }
    }

    _thumbstickValueChanged(axesInfo, gamepad) {
        this._myThumbstick.pp_setRotationLocalQuat(this._myThumbstickOriginalRotation);

        let leftRotation = this._myThumbstickRotateAngle * axesInfo.myAxes[1];
        let forwardRotation = this._myThumbstickRotateAngle * axesInfo.myAxes[0];

        if (Math.abs(leftRotation) > 0.0001) {
            this._myThumbstick.pp_rotateAxisLocal(leftRotation, this._myThumbstickOriginalLeft);
        }

        if (Math.abs(forwardRotation) > 0.0001) {
            this._myThumbstick.pp_rotateAxisLocal(forwardRotation, this._myThumbstickOriginalForward);
        }
    }
};



// IMPLEMENTATION

GamepadMeshAnimatorComponent.prototype._thumbstickPressedStart = function () {
    let upTranslation = PP.vec3_create();
    return function _thumbstickPressedStart(buttonInfo, gamepad) {
        // since thumbstick object rotate you need to specifically use its original up to translate it
        this._myThumbstickOriginalUp.vec3_scale(-this._myThumbstickPressOffset, upTranslation);
        this._myThumbstick.pp_translateLocal(upTranslation);
    };
}();