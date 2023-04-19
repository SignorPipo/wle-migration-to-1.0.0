import { Emitter } from "@wonderlandengine/api";
import { PluginUtils } from "../../utils/plugin_utils";

export function initEmitterMod() {
    initEmitterModPrototype();
}

export function initEmitterModPrototype() {
    let emitterMod = {};

    // New Functions 

    emitterMod._find = function _find(listenerOrID) {
        let listeners = this._listeners;
        let index = null;

        for (let i = 0; i < listeners.length; ++i) {
            if (listeners[i].id === listenerOrID || listeners[i].callback === listenerOrID) {
                index = i;
                break;
            }
        }

        return index;
    };



    PluginUtils.assignProperties(emitterMod, Emitter.prototype, false, true, true);
}