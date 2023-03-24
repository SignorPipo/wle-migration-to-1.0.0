import { vec2_create } from "../../../plugin/js/extensions/array_extension";
import { getMainEngine } from "../../../plugin/wl/extensions/engine_extension";

export class GamepadCore {

    constructor(handPose) {
        this._myHandPose = handPose;

        this._myManageHandPose = false;
    }

    getHandedness() {
        return this._myHandPose.getHandedness();
    }

    getHandPose() {
        return this._myHandPose;
    }

    getEngine() {
        return this._myHandPose.getEngine();
    }

    isGamepadCoreActive() {
        return true;
    }

    setManageHandPose(manageHandPose) {
        this._myManageHandPose = manageHandPose;
    }

    doesManageHandPose() {
        return this._myManageHandPose;
    }

    start() {
        if (this._myHandPose && this._myManageHandPose) {
            this._myHandPose.start();
        }

        this._startHook();
    }

    preUpdate(dt) {
        if (this._myHandPose && this._myManageHandPose) {
            this._myHandPose.update(dt);
        }

        this._preUpdateHook(dt);
    }

    postUpdate(dt) {
        this._postUpdateHook(dt);
    }

    getButtonData(buttonID) {
        let buttonData = this._createButtonData();
        return buttonData;
    }

    getAxesData(axesID) {
        let axesData = this._createAxesData();
        return axesData;
    }

    getHapticActuators() {
        let hapticActuators = [];
        return hapticActuators;
    }

    // Hooks

    _startHook() {

    }

    _preUpdateHook(dt) {

    }

    _postUpdateHook(dt) {

    }

    // Hooks end

    _createButtonData() {
        return { myIsPressed: false, myIsTouched: false, myValue: 0 };
    }

    _createAxesData() {
        return vec2_create(0, 0);
    }
};