import { Emitter } from "@wonderlandengine/api";
import { CursorTarget } from "@wonderlandengine/components";

export function initCursorTargetComponentMod() {
    initCursorTargetComponentModPrototype();
}

export function initCursorTargetComponentModPrototype() {
    // New Functions 

    CursorTarget.prototype.init = function init() {
        this.onDoubleClick = new Emitter();
        this.onTripleClick = new Emitter();
        this.onDownOnHover = new Emitter();
        this.onUpWithNoDown = new Emitter();

        this.isSurface = false; // Just a way to specify if this target is just used as a surface between buttons 
    };

    CursorTarget.prototype.start = function start() { };
    CursorTarget.prototype.update = function update(dt) { };
    CursorTarget.prototype.onActivate = function onActivate() { };
    CursorTarget.prototype.onDeactivate = function onDeactivate() { };
    CursorTarget.prototype.onDestroy = function onDestroy() { };



    Object.defineProperty(CursorTarget.prototype, "init", { enumerable: false });
    Object.defineProperty(CursorTarget.prototype, "start", { enumerable: false });
    Object.defineProperty(CursorTarget.prototype, "update", { enumerable: false });
    Object.defineProperty(CursorTarget.prototype, "onActivate", { enumerable: false });
    Object.defineProperty(CursorTarget.prototype, "onDeactivate", { enumerable: false });
    Object.defineProperty(CursorTarget.prototype, "onDestroy", { enumerable: false });
}