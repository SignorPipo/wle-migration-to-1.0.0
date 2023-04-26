import { Globals } from "../../pp/globals";
import { GamepadsManager } from "../gamepad/cauldron/gamepads_manager";
import { Keyboard } from "./keyboard";
import { Mouse } from "./mouse";

export class InputManager {

    constructor(engine = Globals.getMainEngine()) {
        this._myMouse = new Mouse(engine);
        this._myKeyboard = new Keyboard(engine);
        this._myGamepadsManager = new GamepadsManager(engine);

        this._myDestroyed = false;
    }

    start() {
        this._myMouse.start();
        this._myKeyboard.start();
        this._myGamepadsManager.start();
    }

    update(dt) {
        this._myMouse.update(dt);
        this._myKeyboard.update(dt);
        this._myGamepadsManager.update(dt);
    }

    getMouse() {
        return this._myMouse;
    }

    getKeyboard() {
        return this._myKeyboard;
    }

    getGamepadsManager() {
        return this._myGamepadsManager;
    }

    destroy() {
        this._myDestroyed = true;

        this._myMouse.destroy();
        this._myKeyboard.destroy();
        this._myGamepadsManager.destroy();
    }

    isDestroyed() {
        return this._myDestroyed;
    }
}