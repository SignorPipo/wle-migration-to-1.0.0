import { Component, Property } from "@wonderlandengine/api";
import { Globals } from "../../../pp/globals";
import { ClassicGamepadCore } from "../../gamepad/gamepad_cores/classic_gamepad_core";
import { KeyboardGamepadCore } from "../../gamepad/gamepad_cores/keyboard_gamepad_core";
import { XRGamepadCore } from "../../gamepad/gamepad_cores/xr_gamepad_core";
import { HandPose, HandPoseParams } from "../../pose/hand_pose";
import { InputManager } from "../input_manager";
import { Handedness } from "../input_types";

export class InputManagerComponent extends Component {
    static TypeName = "pp-input-manager";
    static Properties = {
        _myPoseForwardFixed: Property.bool(true),
        _myMousePreventContextMenu: Property.bool(true),
        _myMousePreventMiddleButtonScroll: Property.bool(true)
    };

    init() {
        this._myInputManager = null;
        this._myPoseForwardFixedGlobal = null;

        // Prevents double global from same engine
        if (!Globals.hasInputManager(this.engine)) {
            this._myInputManager = new InputManager(this.engine);

            Globals.setInputManager(this._myInputManager, this.engine);
        }

        // Prevents double global from same engine
        if (!Globals.hasPoseForwardFixed(this.engine)) {
            this._myPoseForwardFixedGlobal = this._myPoseForwardFixed;

            Globals.setPoseForwardFixed(this._myPoseForwardFixedGlobal, this.engine);
        }

        this._myLeftHandPose = null;
        this._myRightHandPose = null;
    }

    start() {
        if (this._myInputManager != null) {
            this._myInputManager.start();

            this._setupMousePrevent();

            let handPoseParams = new HandPoseParams(this.engine);
            handPoseParams.myReferenceObject = Globals.getPlayerObjects(this.engine).myPlayerPivot;
            handPoseParams.myForwardFixed = Globals.isPoseForwardFixed(this.engine);

            this._myLeftHandPose = new HandPose(Handedness.LEFT, handPoseParams);
            this._myRightHandPose = new HandPose(Handedness.RIGHT, handPoseParams);

            this._addGamepadCores();

            this._myLeftHandPose.start();
            this._myRightHandPose.start();
        }
    }

    update(dt) {
        if (this._myInputManager != null) {
            this._myLeftHandPose.setForwardFixed(Globals.isPoseForwardFixed(this.engine));
            this._myRightHandPose.setForwardFixed(Globals.isPoseForwardFixed(this.engine));

            this._myLeftHandPose.update(dt);
            this._myRightHandPose.update(dt);

            this._myInputManager.update(dt);
        }
    }

    _setupMousePrevent() {
        if (this._myMousePreventContextMenu) {
            this._myInputManager.getMouse().setContextMenuActive(false);
        }

        if (this._myMousePreventMiddleButtonScroll) {
            this._myInputManager.getMouse().setMiddleButtonScrollActive(false);
        }
    }

    _addGamepadCores() {
        let leftXRGamepadCore = new XRGamepadCore(this._myLeftHandPose);
        let rightXRGamepadCore = new XRGamepadCore(this._myRightHandPose);

        this._myInputManager.getGamepadsManager().getLeftGamepad().addGamepadCore("pp_left_xr_gamepad", leftXRGamepadCore);
        this._myInputManager.getGamepadsManager().getRightGamepad().addGamepadCore("pp_right_xr_gamepad", rightXRGamepadCore);

        let leftKeyboardGamepadCore = new KeyboardGamepadCore(this._myLeftHandPose);
        let rightKeyboardGamepadCore = new KeyboardGamepadCore(this._myRightHandPose);

        this._myInputManager.getGamepadsManager().getLeftGamepad().addGamepadCore("pp_left_keyboard_gamepad", leftKeyboardGamepadCore);
        this._myInputManager.getGamepadsManager().getRightGamepad().addGamepadCore("pp_right_keyboard_gamepad", rightKeyboardGamepadCore);

        let leftClassicGamepadCore = new ClassicGamepadCore(null, this._myLeftHandPose);
        let rightClassicGamepadCore = new ClassicGamepadCore(null, this._myRightHandPose);

        this._myInputManager.getGamepadsManager().getLeftGamepad().addGamepadCore("pp_left_classic_gamepad", leftClassicGamepadCore);
        this._myInputManager.getGamepadsManager().getRightGamepad().addGamepadCore("pp_right_classic_gamepad", rightClassicGamepadCore);
    }

    onDestroy() {
        if (this._myInputManager != null && Globals.getInputManager(this.engine) == this._myInputManager) {
            Globals.removeInputManager(this.engine);

            this._myInputManager.destroy();
        }

        if (this._myPoseForwardFixedGlobal != null && Globals.isPoseForwardFixed(this.engine) == this._myPoseForwardFixedGlobal) {
            Globals.removePoseForwardFixed(this.engine);
        }

        this._myLeftHandPose?.destroy();
        this._myRightHandPose?.destroy();
    }
}