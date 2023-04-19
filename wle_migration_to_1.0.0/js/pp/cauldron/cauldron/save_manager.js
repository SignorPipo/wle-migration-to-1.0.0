import { Emitter } from "@wonderlandengine/api";
import { SaveUtils } from "../utils/save_utils";
import { XRUtils } from "../utils/xr_utils";
import { getMainEngine } from "../wl/engine_globals";
import { Timer } from "./timer";

export class SaveManager {

    constructor(engine = getMainEngine()) {
        this._myEngine = engine;

        this._mySaveCache = new Map();
        this._myCacheEnabled = true;

        this._myCommitSavesDelayTimer = new Timer(0, false);
        this._myDelaySavesCommit = true;
        this._myIDsToCommit = [];

        this._myCacheDefaultValueOnFail = true;

        XRUtils.registerSessionStartEndEventListeners(this, this._onXRSessionStart.bind(this), this._onXRSessionEnd.bind(this), true, false, this._myEngine);

        this._myClearCallbacks = new Emitter();                 // Signature: callback()
        this._myDeleteCallbacks = new Emitter();                // Signature: callback(id)
        this._myDeleteIDCallbacks = new Map();                  // Signature: callback(id)
        this._mySaveCallbacks = new Emitter();                  // Signature: callback(id, value)
        this._mySaveValueChangedCallbacks = new Emitter();      // Signature: callback(id, value)
        this._mySaveIDCallbacks = new Map();                    // Signature: callback(id, value)
        this._mySaveValueChangedIDCallbacks = new Map();        // Signature: callback(id, value)
        this._myCommitSaveCallbacks = new Emitter();            // Signature: callback(id, value, isCommitSaveDelayed, failed)
        this._myCommitSaveIDCallbacks = new Map();              // Signature: callback(id, value, isCommitSaveDelayed, failed)
        this._myCommitSavesCallbacks = new Emitter();           // Signature: callback(isCommitSavesDelayed, failed)

        this._myLoadCallbacks = new Emitter();                      // Signature: callback(id, value, loadFromCache, failed)
        this._myLoadIDCallbacks = new Map();                    // Signature: callback(id, value, loadFromCache, failed)
    }

    setCommitSavesDelay(delay) {
        this._myCommitSavesDelayTimer.start(delay);
    }

    setDelaySavesCommit(delayed) {
        this._myDelaySavesCommit = delayed;
    }

    setCacheDefaultValueOnFail(cache) {
        this._myCacheDefaultValueOnFail = cache;
    }

    setCacheEnabled(enabled) {
        this._myCacheEnabled = enabled;
    }

    update(dt) {
        if (this._myCommitSavesDelayTimer.isRunning()) {
            this._myCommitSavesDelayTimer.update(dt);
            if (this._myCommitSavesDelayTimer.isDone()) {
                this.commitSaves();
            }
        }
    }

    save(id, value, overrideDelaySavesCommit = null, overrideCacheEnabled = null) {
        let sameValue = false;
        if (this._mySaveCache.has(id) && this._isCacheEnabled(overrideCacheEnabled)) {
            sameValue = this._mySaveCache.get(id) === value;
        }

        if (!sameValue) {
            this._mySaveCache.set(id, value);
            if ((this._myDelaySavesCommit && overrideDelaySavesCommit == null) || (overrideDelaySavesCommit != null && overrideDelaySavesCommit)) {
                this._myIDsToCommit.pp_pushUnique(id);
                if (!this._myCommitSavesDelayTimer.isRunning()) {
                    this._myCommitSavesDelayTimer.start();
                }
            } else {
                let failed = this._commitSave(id, false);

                let isCommitSaveDelayed = false;
                this._myCommitSavesCallbacks.notify(isCommitSaveDelayed, failed);
            }
        }

        this._mySaveCallbacks.notify(id, value);

        if (this._mySaveIDCallbacks.size > 0) {
            let callbacks = this._mySaveIDCallbacks.get(id);
            if (callbacks != null) {
                callbacks.notify(id, value);
            }
        }

        if (!sameValue) {
            this._mySaveValueChangedCallbacks.notify(id, value);

            if (this._mySaveValueChangedIDCallbacks.size > 0) {
                let callbacks = this._mySaveValueChangedIDCallbacks.get(id);
                if (callbacks != null) {
                    callbacks.notify(id, value);
                }
            }
        }
    }

    commitSaves() {
        if (this._myIDsToCommit.length > 0) {
            let failed = false;

            for (let id of this._myIDsToCommit) {
                if (this._mySaveCache.has(id)) {
                    let result = this._commitSave(id, true);
                    failed = failed || result;
                }
            }

            this._myIDsToCommit = [];

            let isCommitSavesDelayed = true;
            this._myCommitSavesCallbacks.notify(isCommitSavesDelayed, failed);
        }
    }

    has(id, overrideCacheEnabled = null) {
        return (this._mySaveCache.has(id) && this._isCacheEnabled(overrideCacheEnabled)) || SaveUtils.has(id);
    }

    remove(id) {
        this._mySaveCache.delete(id);
        SaveUtils.remove(id);

        this._myDeleteCallbacks.notify(id);

        if (this._myDeleteIDCallbacks.size > 0) {
            let callbacks = this._myDeleteIDCallbacks.get(id);
            if (callbacks != null) {
                callbacks.notify(id);
            }
        }
    }

    clear() {
        this._mySaveCache.clear();
        SaveUtils.clear();

        this._myClearCallbacks.notify();
    }

    load(id, defaultValue = null, overrideCacheEnabled = null) {
        return this._load(id, defaultValue, "load", overrideCacheEnabled);
    }

    loadString(id, defaultValue = null, overrideCacheEnabled = null) {
        return this._load(id, defaultValue, "loadString", overrideCacheEnabled);
    }

    loadNumber(id, defaultValue = null, overrideCacheEnabled = null) {
        return this._load(id, defaultValue, "loadNumber", overrideCacheEnabled);
    }

    loadBool(id, defaultValue = null, overrideCacheEnabled = null) {
        return this._load(id, defaultValue, "loadBool", overrideCacheEnabled);
    }

    getCommitSavesDelay() {
        return this._myCommitSavesDelayTimer.getDuration();
    }

    isDelaySavesCommit() {
        return this._myDelaySavesCommit;
    }

    isCacheDefaultValueOnFail() {
        return this._myCacheDefaultValueOnFail;
    }

    isCacheEnabled() {
        return this._myCacheEnabled;
    }

    _commitSave(id, isCommitSaveDelayed) {
        let value = this._mySaveCache.get(id);
        let failed = false;

        try {
            SaveUtils.save(id, value);
        } catch (error) {
            failed = true;
        }

        this._myCommitSaveCallbacks.notify(id, value, isCommitSaveDelayed, failed);

        if (this._myCommitSaveIDCallbacks.size > 0) {
            let callbacks = this._myCommitSaveIDCallbacks.get(id);
            if (callbacks != null) {
                callbacks.notify(id, value, isCommitSaveDelayed, failed);
            }
        }

        return failed;
    }

    _load(id, defaultValue, functionName, overrideCacheEnabled = null) {
        let value = null;
        let failed = false;
        let loadFromCache = false;

        if (this._mySaveCache.has(id) && this._isCacheEnabled(overrideCacheEnabled)) {
            value = this._mySaveCache.get(id);

            if (value == null && defaultValue != null) {
                value = defaultValue;
                if (this._myCacheDefaultValueOnFail) {
                    this._mySaveCache.set(id, value);
                }
            }

            loadFromCache = true;
        } else {
            let saveResult = null;
            try {
                saveResult = SaveUtils[functionName](id, null);
            } catch (error) {
                // Error is managed as if it worked but there was no value
                saveResult = null;
                failed = true;
            }

            if (saveResult == null) {
                value = defaultValue;
            } else {
                value = saveResult;
            }

            if (saveResult != null || this._myCacheDefaultValueOnFail) {
                this._mySaveCache.set(id, value);
            } else {
                this._mySaveCache.set(id, null);
            }
        }

        this._myLoadCallbacks.notify(id, value, loadFromCache, failed);

        if (this._myLoadIDCallbacks.size > 0) {
            let callbacks = this._myLoadIDCallbacks.get(id);
            if (callbacks != null) {
                callbacks.notify(id, value, loadFromCache, failed);
            }
        }

        return value;
    }

    _onXRSessionStart(session) {
        session.addEventListener("visibilitychange", function (event) {
            if (event.session.visibilityState != "visible") {
                this._onXRSessionInterrupt();
            }
        }.bind(this));
    }

    _onXRSessionEnd() {
        this._onXRSessionInterrupt();
    }

    _onXRSessionInterrupt() {
        this.commitSaves();
    }

    registerClearEventListener(callbackID, callback) {
        this._myClearCallbacks.add(callback, { id: callbackID });
    }

    unregisterClearEventListener(callbackID) {
        this._myClearCallbacks.remove(callbackID);
    }

    registerDeleteEventListener(callbackID, callback) {
        this._myDeleteCallbacks.add(callback, { id: callbackID });
    }

    unregisterDeleteEventListener(callbackID) {
        this._myDeleteCallbacks.remove(callbackID);
    }

    registerDeleteIDEventListener(valueID, callbackID, callback) {
        let valueIDCallbacks = this._myDeleteIDCallbacks.get(valueID);
        if (valueIDCallbacks == null) {
            this._myDeleteIDCallbacks.set(valueID, new Map());
            valueIDCallbacks = this._myDeleteIDCallbacks.get(valueID);
        }

        valueIDCallbacks.add(callback, { id: callbackID });
    }

    unregisterDeleteIDEventListener(valueID, callbackID) {
        let valueIDCallbacks = this._myDeleteIDCallbacks.get(valueID);
        if (valueIDCallbacks != null) {
            valueIDCallbacks.remove(callbackID);

            if (valueIDCallbacks.size <= 0) {
                this._myDeleteIDCallbacks.delete(valueID);
            }
        }
    }

    registerSaveEventListener(callbackID, callback) {
        this._mySaveCallbacks.add(callback, { id: callbackID });
    }

    unregisterSaveEventListener(callbackID) {
        this._mySaveCallbacks.remove(callbackID);
    }

    registerSaveIDEventListener(valueID, callbackID, callback) {
        let valueIDCallbacks = this._mySaveIDCallbacks.get(valueID);
        if (valueIDCallbacks == null) {
            this._mySaveIDCallbacks.set(valueID, new Map());
            valueIDCallbacks = this._mySaveIDCallbacks.get(valueID);
        }

        valueIDCallbacks.add(callback, { id: callbackID });
    }

    unregisterSaveIDEventListener(valueID, callbackID) {
        let valueIDCallbacks = this._mySaveIDCallbacks.get(valueID);
        if (valueIDCallbacks != null) {
            valueIDCallbacks.remove(callbackID);

            if (valueIDCallbacks.size <= 0) {
                this._mySaveIDCallbacks.delete(valueID);
            }
        }
    }

    registerSaveValueChangedEventListener(callbackID, callback) {
        this._mySaveValueChangedCallbacks.add(callback, { id: callbackID });
    }

    unregisterSaveValueChangedEventListener(callbackID) {
        this._mySaveValueChangedCallbacks.remove(callbackID);
    }

    registerSaveValueChangedIDEventListener(valueID, callbackID, callback) {
        let valueIDCallbacks = this._mySaveValueChangedIDCallbacks.get(valueID);
        if (valueIDCallbacks == null) {
            this._mySaveValueChangedIDCallbacks.set(valueID, new Map());
            valueIDCallbacks = this._mySaveValueChangedIDCallbacks.get(valueID);
        }

        valueIDCallbacks.add(callback, { id: callbackID });
    }

    unregisterSaveValueChangedIDEventListener(valueID, callbackID) {
        let valueIDCallbacks = this._mySaveValueChangedIDCallbacks.get(valueID);
        if (valueIDCallbacks != null) {
            valueIDCallbacks.remove(callbackID);

            if (valueIDCallbacks.size <= 0) {
                this._mySaveValueChangedIDCallbacks.delete(valueID);
            }
        }
    }

    registerCommitSavesEventListener(callbackID, callback) {
        this._myCommitSavesCallbacks.add(callback, { id: callbackID });
    }

    unregisterCommitSavesEventListener(callbackID) {
        this._myCommitSavesCallbacks.remove(callbackID);
    }

    registerCommitSaveEventListener(callbackID, callback) {
        this._myCommitSaveCallbacks.add(callback, { id: callbackID });
    }

    unregisterCommitSaveEventListener(callbackID) {
        this._myCommitSaveCallbacks.remove(callbackID);
    }

    registerCommitSaveIDEventListener(valueID, callbackID, callback) {
        let valueIDCallbacks = this._myCommitSaveIDCallbacks.get(valueID);
        if (valueIDCallbacks == null) {
            this._myCommitSaveIDCallbacks.set(valueID, new Map());
            valueIDCallbacks = this._myCommitSaveIDCallbacks.get(valueID);
        }

        valueIDCallbacks.add(callback, { id: callbackID });
    }

    unregisterCommitSaveIDEventListener(valueID, callbackID) {
        let valueIDCallbacks = this._myCommitSaveIDCallbacks.get(valueID);
        if (valueIDCallbacks != null) {
            valueIDCallbacks.remove(callbackID);

            if (valueIDCallbacks.size <= 0) {
                this._myCommitSaveIDCallbacks.delete(valueID);
            }
        }
    }

    registerLoadEventListener(callbackID, callback) {
        this._myLoadCallbacks.add(callback, { id: callbackID });
    }

    unregisterLoadEventListener(callbackID) {
        this._myLoadCallbacks.remove(callbackID);
    }

    registerLoadIDEventListener(valueID, callbackID, callback) {
        let valueIDCallbacks = this._myLoadIDCallbacks.get(valueID);
        if (valueIDCallbacks == null) {
            this._myLoadIDCallbacks.set(valueID, new Map());
            valueIDCallbacks = this._myLoadIDCallbacks.get(valueID);
        }

        valueIDCallbacks.add(callback, { id: callbackID });
    }

    unregisterLoadIDEventListener(valueID, callbackID) {
        let valueIDCallbacks = this._myLoadIDCallbacks.get(valueID);
        if (valueIDCallbacks != null) {
            valueIDCallbacks.remove(callbackID);

            if (valueIDCallbacks.size <= 0) {
                this._myLoadIDCallbacks.delete(valueID);
            }
        }
    }

    _isCacheEnabled(overrideCacheEnabled = null) {
        return (this._myCacheEnabled && overrideCacheEnabled == null) || (overrideCacheEnabled != null && overrideCacheEnabled);
    }
}