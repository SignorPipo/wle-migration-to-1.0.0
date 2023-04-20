import { Globals } from "../pp/globals";
import { DebugVisualManager } from "./debug_visual_manager";

export class DebugManager {

    constructor(engine = Globals.getMainEngine()) {
        this._myEngine = engine;
        this._myDebugVisualManager = new DebugVisualManager(this._myEngine);
    }

    getDebugVisualManager() {
        return this._myDebugVisualManager;
    }

    start() {
        this._myDebugVisualManager.start();
    }

    update(dt) {
        this._myDebugVisualManager.setActive(Globals.isDebugEnabled(this._myEngine));
        this._myDebugVisualManager.update(dt);
    }
}