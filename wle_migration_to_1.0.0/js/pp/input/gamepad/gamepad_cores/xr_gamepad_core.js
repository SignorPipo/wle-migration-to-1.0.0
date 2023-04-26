// xr-standard mapping is assumed

import { XRUtils } from "../../../cauldron/utils/xr_utils";
import { GamepadButtonID } from "../gamepad_buttons";
import { GamepadCore } from "./gamepad_core";

export class XRGamepadCore extends GamepadCore {

    constructor(handPose) {
        super(handPose);

        this._myIsSelectPressed = false;
        this._myIsSqueezePressed = false;

        this._myXRSessionActive = false;
        this._myInputSource = null;
        this._myGamepad = null;

        this._mySelectStartEventListener = null;
        this._mySelectEndEventListener = null;
        this._mySqueezeStartEventListener = null;
        this._mySqueezeEndEventListener = null;


        // Support Variables
        this._myButtonData = this._createButtonData();
        this._myAxesData = this._createAxesData();
        this._myHapticActuators = [];
    }

    isGamepadCoreActive() {
        // connected == null is to fix webxr emulator that leaves that field undefined
        return this._myXRSessionActive && this._myGamepad != null && (this._myGamepad.connected == null || this._myGamepad.connected);
    }

    _startHook() {
        XRUtils.registerSessionStartEndEventListeners(this, this._onXRSessionStart.bind(this), this._onXRSessionEnd.bind(this), true, false, this.getEngine());
    }

    _preUpdateHook(dt) {
        this._myInputSource = this.getHandPose().getInputSource();
        if (this._myInputSource != null) {
            this._myGamepad = this._myInputSource.gamepad;
        } else {
            this._myGamepad = null;
        }
    }

    getButtonData(buttonID) {
        this._myButtonData.myIsPressed = false;
        this._myButtonData.myIsTouched = false;
        this._myButtonData.myValue = 0;

        if (this.isGamepadCoreActive()) {
            if (buttonID < this._myGamepad.buttons.length) {
                let gamepadButton = this._myGamepad.buttons[buttonID];

                if (buttonID != GamepadButtonID.SELECT && buttonID != GamepadButtonID.SQUEEZE) {
                    this._myButtonData.myIsPressed = gamepadButton.pressed;
                } else {
                    this._myButtonData.myIsPressed = this._getSpecialButtonPressed(buttonID);
                }

                this._myButtonData.myIsTouched = gamepadButton.touched;
                this._myButtonData.myValue = gamepadButton.value;
            } else if (buttonID == GamepadButtonID.TOP_BUTTON && this._myGamepad.buttons.length >= 3) {
                // This way if you are using a basic touch gamepad, top button will work anyway

                let touchButton = this._myGamepad.buttons[2];
                this._myButtonData.myIsPressed = touchButton.pressed;
                this._myButtonData.myIsTouched = touchButton.touched;
                this._myButtonData.myValue = touchButton.value;
            }
        }

        return this._myButtonData;
    }

    getAxesData(axesID) {
        this._myAxesData.vec2_zero();

        if (this.isGamepadCoreActive()) {
            let internalAxes = this._myGamepad.axes;
            if (internalAxes.length == 4) {
                // In this case it could be both touch axes or thumbstick axes, that depends on the gamepad
                // to support both I simply choose the absolute max value (unused axes will always be 0)

                // X
                if (Math.abs(internalAxes[0]) > Math.abs(internalAxes[2])) {
                    this._myAxesData[0] = internalAxes[0];
                } else {
                    this._myAxesData[0] = internalAxes[2];
                }

                // Y
                if (Math.abs(internalAxes[1]) > Math.abs(internalAxes[3])) {
                    this._myAxesData[1] = internalAxes[1];
                } else {
                    this._myAxesData[1] = internalAxes[3];
                }

            } else if (internalAxes.length == 2) {
                this._myAxesData[0] = internalAxes[0];
                this._myAxesData[1] = internalAxes[1];
            }

            // Y axis is recorded negative when thumbstick is pressed forward for weird reasons
            this._myAxesData[1] = -this._myAxesData[1];
        }

        return this._myAxesData;
    }

    getHapticActuators() {
        this._myHapticActuators.pp_clear();

        if (this.isGamepadCoreActive()) {
            if (this._myGamepad.hapticActuators != null && this._myGamepad.hapticActuators.length > 0) {
                this._myHapticActuators.push(...this._myGamepad.hapticActuators);
            }

            if (this._myGamepad.vibrationActuator != null) {
                this._myHapticActuators.push(this._myGamepad.vibrationActuator);
            }
        }

        return this._myHapticActuators;
    }

    // This is to be more compatible
    _getSpecialButtonPressed(buttonID) {
        let isPressed = false;

        if (this.isGamepadCoreActive()) {
            if (buttonID == GamepadButtonID.SELECT) {
                isPressed = this._myIsSelectPressed;
            } else if (buttonID == GamepadButtonID.SQUEEZE) {
                isPressed = this._myIsSqueezePressed;
            }
        }

        return isPressed;
    }

    _onXRSessionStart(session) {
        this._mySelectStartEventListener = this._selectStart.bind(this);
        this._mySelectEndEventListener = this._selectEnd.bind(this);
        this._mySqueezeStartEventListener = this._squeezeStart.bind(this);
        this._mySqueezeEndEventListener = this._squeezeEnd.bind(this);

        session.addEventListener("selectstart", this._mySelectStartEventListener);
        session.addEventListener("selectend", this._mySelectEndEventListener);

        session.addEventListener("squeezestart", this._mySqueezeStartEventListener);
        session.addEventListener("squeezeend", this._mySqueezeEndEventListener);

        this._myXRSessionActive = true;
    }

    _onXRSessionEnd(session) {
        this._mySelectStartEventListener = null;
        this._mySelectEndEventListener = null;
        this._mySqueezeStartEventListener = null;
        this._mySqueezeEndEventListener = null;

        this._myXRSessionActive = false;
    }

    // Select and Squeeze are managed this way to be more compatible
    _selectStart(event) {
        if (this._myInputSource != null && this._myInputSource == event.inputSource) {
            this._myIsSelectPressed = true;
        }
    }

    _selectEnd(event) {
        if (this._myInputSource != null && this._myInputSource == event.inputSource) {
            this._myIsSelectPressed = false;
        }
    }

    _squeezeStart(event) {
        if (this._myInputSource != null && this._myInputSource == event.inputSource) {
            this._myIsSqueezePressed = true;
        }
    }

    _squeezeEnd(event) {
        if (this._myInputSource != null && this._myInputSource == event.inputSource) {
            this._myIsSqueezePressed = false;
        }
    }

    _destroyHook() {
        XRUtils.getSession(this.getEngine())?.removeEventListener("selectstart", this._mySelectStartEventListener);
        XRUtils.getSession(this.getEngine())?.removeEventListener("selectend", this._mySelectEndEventListener);
        XRUtils.getSession(this.getEngine())?.removeEventListener("squeezestart", this._mySqueezeStartEventListener);
        XRUtils.getSession(this.getEngine())?.removeEventListener("squeezeend", this._mySqueezeEndEventListener);

        XRUtils.unregisterSessionStartEndEventListeners(this, this.getEngine());
    }
}