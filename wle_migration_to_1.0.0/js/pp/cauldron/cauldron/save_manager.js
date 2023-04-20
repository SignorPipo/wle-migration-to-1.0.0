import { Emitter } from "@wonderlandengine/api";
import { Globals } from "../../pp/globals";
import { SaveUtils } from "../utils/save_utils";
import { XRUtils } from "../utils/xr_utils";
import { Timer } from "./timer";

export class SaveManager {

    constructor(engine = Globals.getMainEngine()) {
        this._myEngine = engine;

        this._mySaveCache = new Map();
        this._myCacheEnabled = true;

        this._myCommitSavesDelayTimer = new Timer(0, false);
        this._myDelaySavesCommit = true;
        this._myIDsToCommit = [];

        this._myCacheDefaultValueOnFail = true;

        XRUtils.registerSessionStartEndEventListeners(this, this._onXRSessionStart.bind(this), this._onXRSessionEnd.bind(this), true, false, this._myEngine);

        this._myClearEmitter = new Emitter();                   // Signature: listener()
        this._myDeleteEmitter = new Emitter();                  // Signature: listener(id)
        this._myDeleteIDEmitters = new Map();                   // Signature: listener(id)
        this._mySaveEmitter = new Emitter();                    // Signature: listener(id, value)
        this._mySaveValueChangedEmitter = new Emitter();        // Signature: listener(id, value)
        this._mySaveIDEmitters = new Map();                     // Signature: listener(id, value)
        this._mySaveValueChangedIDEmitters = new Map();         // Signature: listener(id, value)
        this._myCommitSaveEmitter = new Emitter();              // Signature: listener(id, value, isCommitSaveDelayed, failed)
        this._myCommitSaveIDEmitters = new Map();               // Signature: listener(id, value, isCommitSaveDelayed, failed)
        this._myCommitSavesEmitter = new Emitter();             // Signature: listener(isCommitSavesDelayed, failed)

        this._myLoadEmitter = new Emitter();                    // Signature: listener(id, value, loadFromCache, failed)
        this._myLoadIDEmitters = new Map();                     // Signature: listener(id, value, loadFromCache, failed)
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
                this._myCommitSavesEmitter.notify(isCommitSaveDelayed, failed);
            }
        }

        this._mySaveEmitter.notify(id, value);

        if (this._mySaveIDEmitters.size > 0) {
            let emitter = this._mySaveIDEmitters.get(id);
            if (emitter != null) {
                emitter.notify(id, value);
            }
        }

        if (!sameValue) {
            this._mySaveValueChangedEmitter.notify(id, value);

            if (this._mySaveValueChangedIDEmitters.size > 0) {
                let emitter = this._mySaveValueChangedIDEmitters.get(id);
                if (emitter != null) {
                    emitter.notify(id, value);
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
            this._myCommitSavesEmitter.notify(isCommitSavesDelayed, failed);
        }
    }

    has(id, overrideCacheEnabled = null) {
        return (this._mySaveCache.has(id) && this._isCacheEnabled(overrideCacheEnabled)) || SaveUtils.has(id);
    }

    remove(id) {
        this._mySaveCache.delete(id);
        SaveUtils.remove(id);

        this._myDeleteEmitter.notify(id);

        if (this._myDeleteIDEmitters.size > 0) {
            let emitter = this._myDeleteIDEmitters.get(id);
            if (emitter != null) {
                emitter.notify(id);
            }
        }
    }

    clear() {
        this._mySaveCache.clear();
        SaveUtils.clear();

        this._myClearEmitter.notify();
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

        this._myCommitSaveEmitter.notify(id, value, isCommitSaveDelayed, failed);

        if (this._myCommitSaveIDEmitters.size > 0) {
            let emitter = this._myCommitSaveIDEmitters.get(id);
            if (emitter != null) {
                emitter.notify(id, value, isCommitSaveDelayed, failed);
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

        this._myLoadEmitter.notify(id, value, loadFromCache, failed);

        if (this._myLoadIDEmitters.size > 0) {
            let emitter = this._myLoadIDEmitters.get(id);
            if (emitter != null) {
                emitter.notify(id, value, loadFromCache, failed);
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

    registerClearEventListener(listenerID, listener) {
        this._myClearEmitter.add(listener, { id: listenerID });
    }

    unregisterClearEventListener(listenerID) {
        this._myClearEmitter.remove(listenerID);
    }

    registerDeleteEventListener(listenerID, listener) {
        this._myDeleteEmitter.add(listener, { id: listenerID });
    }

    unregisterDeleteEventListener(listenerID) {
        this._myDeleteEmitter.remove(listenerID);
    }

    registerDeleteIDEventListener(valueID, listenerID, listener) {
        let valueIDEmitter = this._myDeleteIDEmitters.get(valueID);
        if (valueIDEmitter == null) {
            this._myDeleteIDEmitters.set(valueID, new Map());
            valueIDEmitter = this._myDeleteIDEmitters.get(valueID);
        }

        valueIDEmitter.add(listener, { id: listenerID });
    }

    unregisterDeleteIDEventListener(valueID, listenerID) {
        let valueIDEmitter = this._myDeleteIDEmitters.get(valueID);
        if (valueIDEmitter != null) {
            valueIDEmitter.remove(listenerID);

            if (valueIDEmitter.size <= 0) {
                this._myDeleteIDEmitters.delete(valueID);
            }
        }
    }

    registerSaveEventListener(listenerID, listener) {
        this._mySaveEmitter.add(listener, { id: listenerID });
    }

    unregisterSaveEventListener(listenerID) {
        this._mySaveEmitter.remove(listenerID);
    }

    registerSaveIDEventListener(valueID, listenerID, listener) {
        let valueIDEmitter = this._mySaveIDEmitters.get(valueID);
        if (valueIDEmitter == null) {
            this._mySaveIDEmitters.set(valueID, new Map());
            valueIDEmitter = this._mySaveIDEmitters.get(valueID);
        }

        valueIDEmitter.add(listener, { id: listenerID });
    }

    unregisterSaveIDEventListener(valueID, listenerID) {
        let valueIDEmitter = this._mySaveIDEmitters.get(valueID);
        if (valueIDEmitter != null) {
            valueIDEmitter.remove(listenerID);

            if (valueIDEmitter.size <= 0) {
                this._mySaveIDEmitters.delete(valueID);
            }
        }
    }

    registerSaveValueChangedEventListener(listenerID, listener) {
        this._mySaveValueChangedEmitter.add(listener, { id: listenerID });
    }

    unregisterSaveValueChangedEventListener(listenerID) {
        this._mySaveValueChangedEmitter.remove(listenerID);
    }

    registerSaveValueChangedIDEventListener(valueID, listenerID, listener) {
        let valueIDEmitter = this._mySaveValueChangedIDEmitters.get(valueID);
        if (valueIDEmitter == null) {
            this._mySaveValueChangedIDEmitters.set(valueID, new Map());
            valueIDEmitter = this._mySaveValueChangedIDEmitters.get(valueID);
        }

        valueIDEmitter.add(listener, { id: listenerID });
    }

    unregisterSaveValueChangedIDEventListener(valueID, listenerID) {
        let valueIDEmitter = this._mySaveValueChangedIDEmitters.get(valueID);
        if (valueIDEmitter != null) {
            valueIDEmitter.remove(listenerID);

            if (valueIDEmitter.size <= 0) {
                this._mySaveValueChangedIDEmitters.delete(valueID);
            }
        }
    }

    registerCommitSavesEventListener(listenerID, listener) {
        this._myCommitSavesEmitter.add(listener, { id: listenerID });
    }

    unregisterCommitSavesEventListener(listenerID) {
        this._myCommitSavesEmitter.remove(listenerID);
    }

    registerCommitSaveEventListener(listenerID, listener) {
        this._myCommitSaveEmitter.add(listener, { id: listenerID });
    }

    unregisterCommitSaveEventListener(listenerID) {
        this._myCommitSaveEmitter.remove(listenerID);
    }

    registerCommitSaveIDEventListener(valueID, listenerID, listener) {
        let valueIDEmitter = this._myCommitSaveIDEmitters.get(valueID);
        if (valueIDEmitter == null) {
            this._myCommitSaveIDEmitters.set(valueID, new Map());
            valueIDEmitter = this._myCommitSaveIDEmitters.get(valueID);
        }

        valueIDEmitter.add(listener, { id: listenerID });
    }

    unregisterCommitSaveIDEventListener(valueID, listenerID) {
        let valueIDEmitter = this._myCommitSaveIDEmitters.get(valueID);
        if (valueIDEmitter != null) {
            valueIDEmitter.remove(listenerID);

            if (valueIDEmitter.size <= 0) {
                this._myCommitSaveIDEmitters.delete(valueID);
            }
        }
    }

    registerLoadEventListener(listenerID, listener) {
        this._myLoadEmitter.add(listener, { id: listenerID });
    }

    unregisterLoadEventListener(listenerID) {
        this._myLoadEmitter.remove(listenerID);
    }

    registerLoadIDEventListener(valueID, listenerID, listener) {
        let valueIDEmitter = this._myLoadIDEmitters.get(valueID);
        if (valueIDEmitter == null) {
            this._myLoadIDEmitters.set(valueID, new Map());
            valueIDEmitter = this._myLoadIDEmitters.get(valueID);
        }

        valueIDEmitter.add(listener, { id: listenerID });
    }

    unregisterLoadIDEventListener(valueID, listenerID) {
        let valueIDEmitter = this._myLoadIDEmitters.get(valueID);
        if (valueIDEmitter != null) {
            valueIDEmitter.remove(listenerID);

            if (valueIDEmitter.size <= 0) {
                this._myLoadIDEmitters.delete(valueID);
            }
        }
    }

    _isCacheEnabled(overrideCacheEnabled = null) {
        return (this._myCacheEnabled && overrideCacheEnabled == null) || (overrideCacheEnabled != null && overrideCacheEnabled);
    }
}