export class ConsoleVR {
    constructor() {
        this._myRealLog = console.log;
        this._myRealError = console.error;
        this._myRealWarn = console.warn;
        this._myRealInfo = console.info;
        this._myRealDebug = console.debug;
        this._myRealAssert = console.assert;
        this._myRealClear = console.clear;

        this._myForwardToBrowserConsole = true;
    }

    log(...args) {
        if (this._myForwardToBrowserConsole) {
            this._myRealLog.apply(console, args);
        }
    }

    error(...args) {
        if (this._myForwardToBrowserConsole) {
            this._myRealError.apply(console, args);
        }
    }

    warn(...args) {
        if (this._myForwardToBrowserConsole) {
            this._myRealWarn.apply(console, args);
        }
    }

    info(...args) {
        if (this._myForwardToBrowserConsole) {
            this._myRealInfo.apply(console, args);
        }
    }

    debug(...args) {
        if (this._myForwardToBrowserConsole) {
            this._myRealDebug.apply(console, args);
        }
    }

    assert(...args) {
        if (this._myForwardToBrowserConsole) {
            this._myRealAssert.apply(console, args);
        }
    }

    clear() {
        if (this._myForwardToBrowserConsole) {
            this._myRealClear.apply(console);
        }
    }

    setForwardToBrowserConsole(forwardToBrowserConsole) {
        this._myForwardToBrowserConsole = forwardToBrowserConsole;
    }

    isForwardToBrowserConsole() {
        return this._myForwardToBrowserConsole;
    }
}