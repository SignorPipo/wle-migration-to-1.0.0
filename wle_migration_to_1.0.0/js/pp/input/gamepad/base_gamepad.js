import { Emitter } from "@wonderlandengine/api";
import { vec2_create } from "../../plugin/js/extensions/array_extension";
import { GamepadAxesEvent, GamepadAxesID, GamepadAxesInfo, GamepadButtonEvent, GamepadButtonID, GamepadButtonInfo, GamepadPulseInfo } from "./gamepad_buttons";

export class BaseGamepad {

    constructor(handedness) {
        this._myHandedness = handedness;

        this._myButtonInfos = [];
        for (let key in GamepadButtonID) {
            this._myButtonInfos[GamepadButtonID[key]] = new GamepadButtonInfo(GamepadButtonID[key], this._myHandedness);
        }

        this._myAxesInfos = [];
        for (let key in GamepadAxesID) {
            this._myAxesInfos[GamepadAxesID[key]] = new GamepadAxesInfo(GamepadAxesID[key], this._myHandedness);
        }

        this._myButtonEmitters = [];    // Signature: listener(ButtonInfo, Gamepad)
        for (let key in GamepadButtonID) {
            this._myButtonEmitters[GamepadButtonID[key]] = [];
            for (let eventKey in GamepadButtonEvent) {
                this._myButtonEmitters[GamepadButtonID[key]][GamepadButtonEvent[eventKey]] = new Emitter();
            }
        }

        this._myAxesEmitters = [];      // Signature: listener(AxesInfo, Gamepad)
        for (let key in GamepadAxesID) {
            this._myAxesEmitters[GamepadAxesID[key]] = [];
            for (let eventKey in GamepadAxesEvent) {
                this._myAxesEmitters[GamepadAxesID[key]][GamepadAxesEvent[eventKey]] = new Emitter();
            }
        }

        this._myPulseInfo = new GamepadPulseInfo();

        this._myDestroyed = false;

        // Config

        this._myMultiplePressMaxDelay = 0.4;
        this._myMultipleTouchMaxDelay = 0.4;
    }

    getHandedness() {
        return this._myHandedness;
    }

    getButtonInfo(buttonID) {
        return this._myButtonInfos[buttonID];
    }

    registerButtonEventListener(buttonID, buttonEvent, id, listener) {
        this._myButtonEmitters[buttonID][buttonEvent].add(listener, { id: id });
    }

    unregisterButtonEventListener(buttonID, buttonEvent, id) {
        this._myButtonEmitters[buttonID][buttonEvent].remove(id);
    }

    getAxesInfo(axesID) {
        return this._myAxesInfos[axesID];
    }

    registerAxesEventListener(axesID, axesEvent, id, listener) {
        this._myAxesEmitters[axesID][axesEvent].add(listener, { id: id });
    }

    unregisterAxesEventListener(axesID, axesEvent, id) {
        this._myAxesEmitters[axesID][axesEvent].remove(id);
    }

    pulse(intensity, duration = 0) {
        this._myPulseInfo.myIntensity = Math.pp_clamp(intensity, 0, 1);
        this._myPulseInfo.myDuration = Math.max(duration, 0);
    }

    stopPulse() {
        this._myPulseInfo.myIntensity = 0;
        this._myPulseInfo.myDuration = 0;
    }

    isPulsing() {
        return this._myPulseInfo.myIntensity > 0 || this._myPulseInfo.myDuration > 0;
    }

    getPulseInfo() {
        return this._myPulseInfo;
    }

    getMultiplePressMaxDelay() {
        return this._myMultiplePressMaxDelay;
    }

    setMultiplePressMaxDelay(maxDelay) {
        this._myMultiplePressMaxDelay = maxDelay;
    }

    getMultipleTouchMaxDelay() {
        return this._myMultipleTouchMaxDelay;
    }

    setMultipleTouchMaxDelay(maxDelay) {
        this._myMultipleTouchMaxDelay = maxDelay;
    }

    // Hooks

    getHandPose() {
        return null;
    }

    _startHook() {

    }

    _preUpdate(dt) {

    }

    _postUpdate(dt) {

    }

    _getButtonData(buttonID) {
        let buttonData = this._createButtonData();
        return buttonData;
    }

    _getAxesData(axesID) {
        let axesData = this._createAxesData();
        return axesData;
    }

    _getHapticActuators() {
        let hapticActuator = [];
        return hapticActuator;
    }

    _destroyHook() {

    }

    // Hooks End

    start() {
        this._startHook();
    }

    update(dt) {
        this._preUpdate(dt);

        this._preUpdateButtonInfos();
        this._updateButtonInfos();
        this._postUpdateButtonInfos(dt);

        this._preUpdateAxesInfos();
        this._updateAxesInfos();
        this._postUpdateAxesInfos();

        this._updatePulse(dt);

        this._postUpdate(dt);
    }

    _preUpdateButtonInfos() {
        this._myButtonInfos.forEach(function (item) {
            item.myPrevIsPressed = item.myIsPressed;
            item.myPrevIsTouched = item.myIsTouched;
            item.myPrevValue = item.myValue;
        });
    }

    _updateButtonInfos() {
        this._updateSingleButtonInfo(GamepadButtonID.SELECT);
        this._updateSingleButtonInfo(GamepadButtonID.SQUEEZE);
        this._updateSingleButtonInfo(GamepadButtonID.TOUCHPAD);
        this._updateSingleButtonInfo(GamepadButtonID.THUMBSTICK);
        this._updateSingleButtonInfo(GamepadButtonID.BOTTOM_BUTTON);
        this._updateSingleButtonInfo(GamepadButtonID.TOP_BUTTON);
        this._updateSingleButtonInfo(GamepadButtonID.THUMB_REST);
    }

    _updateSingleButtonInfo(buttonID) {
        let buttonInfo = this._myButtonInfos[buttonID];
        let buttonData = this._getButtonData(buttonID);

        buttonInfo.myIsPressed = buttonData.myIsPressed;
        buttonInfo.myIsTouched = buttonData.myIsTouched;
        buttonInfo.myValue = buttonData.myValue;
    }

    _postUpdateButtonInfos(dt) {
        this._myButtonInfos.forEach(function (item) {
            if (item.myIsPressed) {
                item.myTimePressed += dt;
                if (!item.myPrevIsPressed) {
                    item.myMultiplePressStartCount += 1;

                    item.myPrevTimeNotPressed = item.myTimeNotPressed;
                    item.myTimeNotPressed = 0;
                }

                if (item.myPrevTimeNotPressed + item.myTimePressed > this._myMultiplePressMaxDelay && item.myMultiplePressEndCount > 0) {
                    item.myPrevMultiplePressEndCount = item.myMultiplePressEndCount;
                    item.myMultiplePressEndCount = 0;
                }

                if (item.myTimePressed > this._myMultiplePressMaxDelay && item.myMultiplePressStartCount > 0) {
                    item.myPrevMultiplePressStartCount = item.myMultiplePressStartCount;
                    item.myMultiplePressStartCount = 0;
                }
            } else {
                item.myTimeNotPressed += dt;
                if (item.myPrevIsPressed) {
                    item.myMultiplePressEndCount += 1;

                    item.myPrevTimePressed = item.myTimePressed;
                    item.myTimePressed = 0;
                }

                if (item.myPrevTimePressed + item.myTimeNotPressed > this._myMultiplePressMaxDelay && item.myMultiplePressStartCount > 0) {
                    item.myPrevMultiplePressStartCount = item.myMultiplePressStartCount;
                    item.myMultiplePressStartCount = 0;
                }

                if (item.myTimeNotPressed > this._myMultiplePressMaxDelay && item.myMultiplePressEndCount > 0) {
                    item.myPrevMultiplePressEndCount = item.myMultiplePressEndCount;
                    item.myMultiplePressEndCount = 0;
                }
            }

            if (item.myIsTouched) {
                item.myTimeTouched += dt;
                if (!item.myPrevIsTouched) {
                    item.myMultipleTouchStartCount += 1;

                    item.myPrevTimeNotTouched = item.myTimeNotTouched;
                    item.myTimeNotTouched = 0;
                }

                if (item.myPrevTimeNotTouched + item.myTimeTouched > this._myMultipleTouchMaxDelay && item.myMultipleTouchEndCount > 0) {
                    item.myPrevMultipleTouchEndCount = item.myMultipleTouchEndCount;
                    item.myMultipleTouchEndCount = 0;
                }

                if (item.myTimeTouched > this._myMultipleTouchMaxDelay && item.myMultipleTouchStartCount > 0) {
                    item.myPrevMultipleTouchStartCount = item.myMultipleTouchStartCount;
                    item.myMultipleTouchStartCount = 0;
                }
            } else {
                item.myTimeNotTouched += dt;
                if (item.myPrevIsTouched) {
                    item.myMultipleTouchEndCount += 1;

                    item.myPrevTimeTouched = item.myTimeTouched;
                    item.myTimeTouched = 0;
                }

                if (item.myPrevTimeTouched + item.myTimeNotTouched > this._myMultipleTouchMaxDelay && item.myMultipleTouchStartCount > 0) {
                    item.myPrevMultipleTouchStartCount = item.myMultipleTouchStartCount;
                    item.myMultipleTouchStartCount = 0;
                }

                if (item.myTimeNotTouched > this._myMultipleTouchMaxDelay && item.myMultipleTouchEndCount > 0) {
                    item.myPrevMultipleTouchEndCount = item.myMultipleTouchEndCount;
                    item.myMultipleTouchEndCount = 0;
                }
            }
        }.bind(this));

        for (let key in GamepadButtonID) {
            let buttonInfo = this._myButtonInfos[GamepadButtonID[key]];
            let buttonEventEmitters = this._myButtonEmitters[GamepadButtonID[key]];

            // PRESSED
            if (buttonInfo.myIsPressed && !buttonInfo.myPrevIsPressed) {
                let emitter = buttonEventEmitters[GamepadButtonEvent.PRESS_START];
                emitter.notify(buttonInfo, this);
            }

            if (!buttonInfo.myIsPressed && buttonInfo.myPrevIsPressed) {
                let emitter = buttonEventEmitters[GamepadButtonEvent.PRESS_END];
                emitter.notify(buttonInfo, this);
            }

            if (buttonInfo.myIsPressed) {
                let emitter = buttonEventEmitters[GamepadButtonEvent.PRESSED];
                emitter.notify(buttonInfo, this);
            } else {
                let emitter = buttonEventEmitters[GamepadButtonEvent.NOT_PRESSED];
                emitter.notify(buttonInfo, this);
            }

            // TOUCHED
            if (buttonInfo.myIsTouched && !buttonInfo.myPrevIsTouched) {
                let emitter = buttonEventEmitters[GamepadButtonEvent.TOUCH_START];
                emitter.notify(buttonInfo, this);
            }

            if (!buttonInfo.myIsTouched && buttonInfo.myPrevIsTouched) {
                let emitter = buttonEventEmitters[GamepadButtonEvent.TOUCH_END];
                emitter.notify(buttonInfo, this);
            }

            if (buttonInfo.myIsTouched) {
                let emitter = buttonEventEmitters[GamepadButtonEvent.TOUCHED];
                emitter.notify(buttonInfo, this);
            } else {
                let emitter = buttonEventEmitters[GamepadButtonEvent.NOT_TOUCHED];
                emitter.notify(buttonInfo, this);
            }

            // VALUE
            if (buttonInfo.myValue != buttonInfo.myPrevValue) {
                let emitter = buttonEventEmitters[GamepadButtonEvent.VALUE_CHANGED];
                emitter.notify(buttonInfo, this);
            }

            // ALWAYS
            let emitter = buttonEventEmitters[GamepadButtonEvent.ALWAYS];
            emitter.notify(buttonInfo, this);
        }

        this._mySelectStart = false;
        this._mySelectEnd = false;
        this._mySqueezeStart = false;
        this._mySqueezeEnd = false;
    }

    _preUpdateAxesInfos() {
        this._myAxesInfos.forEach(function (item) {
            item.myPrevAxes[0] = item.myAxes[0];
            item.myPrevAxes[1] = item.myAxes[1];
        });
    }

    _updateAxesInfos() {
        this._updateSingleAxesInfo(GamepadAxesID.THUMBSTICK);
    }

    _updateSingleAxesInfo(axesID) {
        let axesInfo = this._myAxesInfos[axesID];
        let axesData = this._getAxesData(axesID);

        axesInfo.myAxes[0] = axesData[0];
        axesInfo.myAxes[1] = axesData[1];
    }

    _postUpdateAxesInfos() {
        for (let key in GamepadAxesID) {
            let axesInfo = this._myAxesInfos[GamepadAxesID[key]];
            let axesEventEmitters = this._myAxesEmitters[GamepadAxesID[key]];

            // X CHANGED
            if (axesInfo.myAxes[0] != axesInfo.myPrevAxes[0]) {
                let emitter = axesEventEmitters[GamepadAxesEvent.X_CHANGED];
                emitter.notify(axesInfo, this);
            }

            // Y CHANGED
            if (axesInfo.myAxes[1] != axesInfo.myPrevAxes[1]) {
                let emitter = axesEventEmitters[GamepadAxesEvent.Y_CHANGED];
                emitter.notify(axesInfo, this);
            }

            // AXES CHANGED
            if (axesInfo.myAxes[0] != axesInfo.myPrevAxes[0] ||
                axesInfo.myAxes[1] != axesInfo.myPrevAxes[1]) {
                let emitter = axesEventEmitters[GamepadAxesEvent.AXES_CHANGED];
                emitter.notify(axesInfo, this);
            }

            // ALWAYS        
            let emitter = axesEventEmitters[GamepadAxesEvent.ALWAYS];
            emitter.notify(axesInfo, this);
        }
    }

    _updatePulse(dt) {
        if (this._myPulseInfo.myIsDevicePulsing || this._myPulseInfo.myIntensity > 0) {
            let hapticActuators = this._getHapticActuators();
            if (hapticActuators.length > 0) {
                if (this._myPulseInfo.myIntensity > 0) {
                    for (let hapticActuator of hapticActuators) {
                        hapticActuator.pulse(this._myPulseInfo.myIntensity, 1000); // Duration is managed by this class
                    }
                    this._myPulseInfo.myIsDevicePulsing = true;
                } else if (this._myPulseInfo.myIsDevicePulsing) {
                    for (let hapticActuator of hapticActuators) {
                        hapticActuator.reset();
                    }
                    this._myPulseInfo.myIsDevicePulsing = false;
                }
            } else {
                this._myPulseInfo.myIsDevicePulsing = false;
            }
        }

        this._myPulseInfo.myDuration -= dt;
        if (this._myPulseInfo.myDuration <= 0) {
            this._myPulseInfo.myIntensity = 0;
            this._myPulseInfo.myDuration = 0;
        }
    }

    _createButtonData() {
        return { myIsPressed: false, myIsTouched: false, myValue: 0 };
    }

    _createAxesData() {
        return vec2_create(0, 0);
    }

    destroy() {
        this._myDestroyed = true;

        this._destroyHook();
    }

    isDestroyed() {
        return this._myDestroyed;
    }
}