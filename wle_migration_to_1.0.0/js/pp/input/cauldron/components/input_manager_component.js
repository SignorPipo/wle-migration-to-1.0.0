import { Component, Type } from "@wonderlandengine/api";
import { getPlayerObjects } from "../../../pp/player_objects_global";
import { hasInputManager, setInputManager } from "../input_globals";
import { InputManager } from "../input_manager";
import { Handedness } from "../input_types";

export class InputManagerComponent extends Component {
    static TypeName = "pp-input-manager";
    static Properties = {
        _myGamepadFixForward: { type: Type.Bool, default: true },
        _myMousePreventContextMenu: { type: Type.Bool, default: true },
        _myMousePreventMiddleButtonScroll: { type: Type.Bool, default: true }
    };

    init() {
        this._myInputManager = null;

        // prevents double global from same engine
        if (!hasInputManager(this.engine)) {
            this._myInputManager = new InputManager(this.engine);

            setInputManager(this._myInputManager, this.engine);
        }
    }

    start() {
        if (this._myInputManager != null) {
            this._myInputManager.start();

            this._setupMousePrevent();
            this._addGamepadCores();
        }
    }

    update(dt) {
        if (this._myInputManager != null) {
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
        let handPoseParams = new PP.HandPoseParams();
        handPoseParams.myReferenceObject = getPlayerObjects(this.engine).myPlayerPivot;
        handPoseParams.myFixForward = this._myFixForward;
        handPoseParams.myForceEmulatedVelocities = false;

        let leftXRGamepadCore = new PP.XRGamepadCore(Handedness.LEFT, handPoseParams);
        let rightXRGamepadCore = new PP.XRGamepadCore(Handedness.RIGHT, handPoseParams);

        this._myInputManager.getGamepadsManager().getLeftGamepad().addGamepadCore("left_xr_gamepad", leftXRGamepadCore);
        this._myInputManager.getGamepadsManager().getRightGamepad().addGamepadCore("right_xr_gamepad", rightXRGamepadCore);

        let leftKeyboardGamepadCore = new PP.KeyboardGamepadCore(Handedness.LEFT, leftXRGamepadCore.getHandPose());
        let rightKeyboardGamepadCore = new PP.KeyboardGamepadCore(Handedness.RIGHT, rightXRGamepadCore.getHandPose());

        this._myInputManager.getGamepadsManager().getLeftGamepad().addGamepadCore("left_keyboard_gamepad", leftKeyboardGamepadCore);
        this._myInputManager.getGamepadsManager().getRightGamepad().addGamepadCore("right_keyboard_gamepad", rightKeyboardGamepadCore);

        let leftClassicGamepadCore = new PP.ClassicGamepadCore(null, Handedness.LEFT, leftXRGamepadCore.getHandPose());
        let rightClassicGamepadCore = new PP.ClassicGamepadCore(null, Handedness.RIGHT, rightXRGamepadCore.getHandPose());

        this._myInputManager.getGamepadsManager().getLeftGamepad().addGamepadCore("left_classic_gamepad", leftClassicGamepadCore);
        this._myInputManager.getGamepadsManager().getRightGamepad().addGamepadCore("right_classic_gamepad", rightClassicGamepadCore);
    }
};