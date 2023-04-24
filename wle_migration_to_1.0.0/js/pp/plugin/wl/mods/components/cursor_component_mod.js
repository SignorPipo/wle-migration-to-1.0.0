import { InputComponent, ViewComponent } from "@wonderlandengine/api";
import { Cursor, CursorTarget, HitTestLocation } from "@wonderlandengine/components";
import { XRUtils } from "../../../../cauldron/utils/xr_utils";
import { InputUtils } from "../../../../input/cauldron/input_utils";
import { Globals } from "../../../../pp/globals";
import { mat4_create, quat2_create, quat_create, vec3_create } from "../../../js/extensions/array_extension";
import { PluginUtils } from "../../../utils/plugin_utils";
import { getScene } from "../../../../cauldron/wl/engine_globals";

export function initCursorComponentMod() {
    initCursorComponentModPrototype();
}

export function initCursorComponentModPrototype() {
    let cursorComponentMod = {};

    // Modified Functions

    cursorComponentMod.init = function init() {
        this.maxDistance = 100;
        this.visible = false;
        this.globalTarget = this.object.pp_addComponent(CursorTarget);
        this.hitTestTarget = this.object.pp_addComponent(CursorTarget);
        this.hoveringObject = null;
        this.hoveringObjectTarget = null;

        this._collisionMask = (1 << this.collisionGroup);

        this._doubleClickTimer = 0;
        this._tripleClickTimer = 0;
        this._multipleClickObject = null;
        this._multipleClickDelay = 0.3;

        this._onDestroyListeners = [];

        this._prevHitLocationLocalToTarget = vec3_create();

        this._pointerId = null;

        this._updatePointerStyle = false;

        this._lastClientX = null;
        this._lastClientY = null;
        this._lastWidth = null;
        this._lastHeight = null;

        this._handedness = null;

        this._transformQuat = quat2_create();
        this._origin = vec3_create();
        this._direction = vec3_create();
        this._isHovering = false;
        this._isDown = false;
        this._lastIsDown = false;
        this._isUpWithNoDown = false;
        this._isRealDown = false;

        this._cursorPos = vec3_create();
        this._tempVec = vec3_create();

        this._viewComponent = null;

        this._cursorRayOrigin = vec3_create();
        this._cursorRayScale = vec3_create();

        this._projectionMatrix = mat4_create();

        this._hitTestLocation = null;
        this._hitTestObject = null;
    };

    cursorComponentMod.start = function start() {
        if (this.handedness == 0) {
            let inputComp = this.object.pp_getComponent(InputComponent);
            if (!inputComp) {
                console.warn("cursor component on object " + this.object.pp_getName() + " was configured with handedness \"input component\", " + "but object has no input component.");
            } else {
                this._handedness = inputComp.handedness;
                this.input = inputComp;
            }
        } else {
            this._handedness = InputUtils.getHandednessByIndex(this.handedness - 1);
        }

        this.pp_setViewComponent(this.object.pp_getComponent(ViewComponent));

        XRUtils.registerSessionStartEventListener(this, this.setupXREvents.bind(this), this.engine);
        this._onDestroyListeners.push(() => {
            XRUtils.unregisterSessionStartEventListener(this, this.engine);
        });
        if (this.cursorRayObject) {
            this.cursorRayObject.pp_setActive(true);
            this._cursorRayScale.set(this.cursorRayObject.pp_getScaleLocal());

            /* Set ray to a good default distance of the cursor of 1m */
            this._setCursorRayTransform(null);
        }

        this._setCursorVisibility(false);

        if (this.useWebXRHitTest) {
            this._hitTestObject = this.object.pp_addObject();
            this._hitTestLocation = this.hitTestObject.pp_addComponent(HitTestLocation, { scaleObject: false, });
        }
    };

    cursorComponentMod.onViewportResize = function onViewportResize() {
        if (!this._viewComponent) return;
        /* Projection matrix will change if the viewport is resized, which will affect the
         * projection matrix because of the aspect ratio. */
        this._viewComponent.projectionMatrix.mat4_invert(this._projectionMatrix);
    };

    cursorComponentMod._setCursorRayTransform = function _setCursorRayTransform(hitPosition) {
        if (!this.cursorRayObject) return;
        if (this.cursorRayScalingAxis != 4) {
            this.cursorRayObject.pp_resetScaleLocal();

            if (hitPosition != null) {
                this.cursorRayObject.pp_getPosition(this._cursorRayOrigin);
                let dist = this._cursorRayOrigin.vec3_distance(hitPosition);
                this._cursorRayScale[this.cursorRayScalingAxis] = dist;
                this.cursorRayObject.pp_scaleObject(this._cursorRayScale);
            }
        }
    };

    cursorComponentMod._setCursorVisibility = function _setCursorVisibility(visible) {
        this.visible = visible;
        if (!this.cursorObject) return;

        this.cursorObject.pp_setActive(visible);
    };

    cursorComponentMod.rayCast = function rayCast() {
        let rayHit =
            this.rayCastMode == 0
                ? Globals.getScene(this.engine).rayCast(
                    this._origin,
                    this._direction,
                    this._collisionMask
                )
                : Globals.getPhysics(this.engine).rayCast(
                    this._origin,
                    this._direction,
                    this._collisionMask,
                    this.maxDistance
                );

        let hitTestResultDistance = Infinity;
        if (this._hitTestLocation != null && this._hitTestLocation.visible) {
            this._hitTestObject.pp_getPositionWorld(this._cursorPos);
            hitTestResultDistance = this._cursorPos.vec3_distance(this.object.pp_getPositionWorld(this._tempVec));
        }

        let hoveringReality = false;

        if (rayHit.hitCount > 0) {
            let rayHitDistance = rayHit.distances[0];
            if (rayHitDistance <= hitTestResultDistance) {
                // Override _cursorPos set by hit test location
                this._cursorPos.vec3_copy(rayHit.locations[0]);
            } else {
                hoveringReality = true;
            }
        } else if (hitTestResultDistance == Infinity) {
            this._cursorPos.vec3_zero();
        }

        if (hoveringReality && !this.hoveringReality) {
            this.hitTestTarget.onHover.notify(null, this);
        } else if (!hoveringReality && this.hoveringReality) {
            this.hitTestTarget.onUnhover.notify(null, this);
        }

        this.hoveringReality = hoveringReality;

        return rayHit;
    };

    cursorComponentMod.update = function update(dt) {
        if (this._doubleClickTimer > 0) {
            this._doubleClickTimer -= dt;
        }

        if (this._tripleClickTimer > 0) {
            this._tripleClickTimer -= dt;
        }

        /* If in XR, set the cursor ray based on object transform */
        if (XRUtils.isSessionActive(this.engine)) {
            /* Since Google Cardboard tap is registered as arTouchDown without a gamepad, we need to check for gamepad presence */
            if (this.arTouchDown && this.input && XRUtils.getSession(this.engine).inputSources[0].handedness === "none" && XRUtils.getSession(this.engine).inputSources[0].gamepad) {
                let axes = XRUtils.getSession(this.engine).inputSources[0].gamepad.axes;
                /* Screenspace Y is inverted */
                this._direction.vec3_set(axes[0], -axes[1], -1.0);
                this.updateDirection();
            } else {
                this.object.pp_getPosition(this._origin);
                this.object.pp_getForward(this._direction);
            }

            let rayHit = this.rayCast();
            this.hoverBehaviour(rayHit);
        } else {
            if (this._viewComponent != null && this._lastClientX != null) {
                this.updateMousePos(this._lastClientX, this._lastClientY, this._lastWidth, this._lastHeight);

                let rayHit = this.rayCast();
                this.hoverBehaviour(rayHit);
            }
        }

        if (this.cursorObject) {
            if (this.hoveringObject && (this._cursorPos[0] != 0 || this._cursorPos[1] != 0 || this._cursorPos[2] != 0)) {
                this._setCursorVisibility(true);
                this.cursorObject.pp_setPosition(this._cursorPos);
                this.cursorObject.pp_setTransformLocalQuat(this.cursorObject.pp_getTransformLocalQuat(this._transformQuat).quat2_normalize(this._transformQuat));
                this._setCursorRayTransform(this._cursorPos);
            } else {
                if (this.visible && this.cursorRayObject) {
                    this._setCursorRayTransform(null);
                }

                this._setCursorVisibility(false);
            }
        }

        if (this.cursorRayObject) {
            this.cursorRayObject.pp_setActive(true);
        }

        if (this.hoveringObject == null) {
            this._pointerId = null;
        }

        this._updatePointerStyle = false;
    };

    cursorComponentMod.hoverBehaviour = function hoverBehaviour(rayHit, forceUnhover = false) {
        if (!forceUnhover && rayHit.hitCount > 0) {
            let hoveringObjectChanged = false;
            if (!this.hoveringObject || !this.hoveringObject.pp_equals(rayHit.objects[0])) {
                /* Unhover previous, if exists */
                if (this.hoveringObject) {
                    if (this.hoveringObjectTarget) this.hoveringObjectTarget.onUnhover.notify(this.hoveringObject, this);
                    this.globalTarget.onUnhover.notify(this.hoveringObject, this);
                }

                hoveringObjectChanged = true;

                /* Hover new object */
                this.hoveringObject = rayHit.objects[0];
                this.hoveringObjectTarget = this.hoveringObject.getComponent(CursorTarget);

                if (this.hoveringObjectTarget) {
                    this.hoveringObjectTarget.onHover.notify(this.hoveringObject, this);
                }
                this.globalTarget.onHover.notify(this.hoveringObject, this);

                if (this.styleCursor && !this._isRealDown && this.hoveringObjectTarget != null && !this.hoveringObjectTarget.isSurface) {
                    document.body.style.cursor = "pointer";
                } else if (document.body.style.cursor == "pointer") {
                    document.body.style.cursor = "default";
                }

                if (!this._pp_isDownToProcess() && this._isRealDown) {
                    this._isDown = false;
                    this._lastIsDown = false;
                    this._isUpWithNoDown = false;

                    if (this.hoveringObjectTarget) this.hoveringObjectTarget.onDownOnHover.notify(this.hoveringObject, this);
                    this.globalTarget.onDownOnHover.notify(this.hoveringObject, this);
                }
            }

            if (this._updatePointerStyle) {
                if (this.styleCursor && !this._isRealDown && this.hoveringObjectTarget != null && !this.hoveringObjectTarget.isSurface) {
                    document.body.style.cursor = "pointer";
                } else if (document.body.style.cursor == "pointer") {
                    document.body.style.cursor = "default";
                }
            }

            if (!hoveringObjectChanged && this._pp_isMoving(rayHit.locations[0])) {
                if (this.hoveringObjectTarget) this.hoveringObjectTarget.onMove.notify(this.hoveringObject, this);
                this.globalTarget.onMove.notify(this.hoveringObject, this);
            }

            if (this._pp_isDownToProcess()) {
                /* Cursor down */
                if (this.hoveringObjectTarget) this.hoveringObjectTarget.onDown.notify(this.hoveringObject, this);
                this.globalTarget.onDown.notify(this.hoveringObject, this);

                /* Click */
                if (this._tripleClickTimer > 0 && this._multipleClickObject && this._multipleClickObject.pp_equals(this.hoveringObject)) {
                    if (this.hoveringObjectTarget) this.hoveringObjectTarget.onTripleClick.notify(this.hoveringObject, this);
                    this.globalTarget.onTripleClick.notify(this.hoveringObject, this);

                    this._tripleClickTimer = 0;
                } else if (this._doubleClickTimer > 0 && this._multipleClickObject && this._multipleClickObject.pp_equals(this.hoveringObject)) {
                    if (this.hoveringObjectTarget) this.hoveringObjectTarget.onDoubleClick.notify(this.hoveringObject, this);
                    this.globalTarget.onDoubleClick.notify(this.hoveringObject, this);

                    this._tripleClickTimer = this._multipleClickDelay;
                    this._doubleClickTimer = 0;
                } else {
                    if (this.hoveringObjectTarget) this.hoveringObjectTarget.onClick.notify(this.hoveringObject, this);
                    this.globalTarget.onClick.notify(this.hoveringObject, this);

                    this._tripleClickTimer = 0;
                    this._doubleClickTimer = this._multipleClickDelay;
                    this._multipleClickObject = this.hoveringObject;
                }
            } else {
                /* Cursor up */
                if (!this._isUpWithNoDown && !hoveringObjectChanged && this._pp_isUpToProcess()) {
                    if (this.hoveringObjectTarget) this.hoveringObjectTarget.onUp.notify(this.hoveringObject, this);
                    this.globalTarget.onUp.notify(this.hoveringObject, this);
                } else if (this._isUpWithNoDown || (hoveringObjectChanged && this._pp_isUpToProcess())) {
                    if (this.hoveringObjectTarget) this.hoveringObjectTarget.onUpWithNoDown.notify(this.hoveringObject, this);
                    this.globalTarget.onUpWithNoDown.notify(this.hoveringObject, this);
                }
            }

            this._prevHitLocationLocalToTarget = this.hoveringObject.pp_convertPositionWorldToLocal(rayHit.locations[0], this._prevHitLocationLocalToTarget);
        } else if (this.hoveringObject && (forceUnhover || rayHit.hitCount == 0)) {
            if (this.hoveringObjectTarget) this.hoveringObjectTarget.onUnhover.notify(this.hoveringObject, this);
            this.globalTarget.onUnhover.notify(this.hoveringObject, this);

            this.hoveringObject = null;
            this.hoveringObjectTarget = null;
            if (this.styleCursor && !this._isRealDown) {
                document.body.style.cursor = "default";
            }
        }

        if (this.hoveringObject) {
            this._lastIsDown = this._isDown;
        } else {
            this._isDown = false;
            this._lastIsDown = false;
        }

        this._isUpWithNoDown = false;
    };

    cursorComponentMod.setupXREvents = function setupXREvents(s) {
        /* If in XR, one-time bind the listener */

        let onSelect = this.onSelect.bind(this);
        s.addEventListener("select", onSelect);
        let onSelectStart = this.onSelectStart.bind(this);
        s.addEventListener("selectstart", onSelectStart);
        let onSelectEnd = this.onSelectEnd.bind(this);
        s.addEventListener("selectend", onSelectEnd);

        this._onDestroyListeners.push(() => {
            if (!XRUtils.isSessionActive(this.engine)) return;
            s.removeEventListener("select", onSelect);
            s.removeEventListener("selectstart", onSelectStart);
            s.removeEventListener("selectend", onSelectEnd);
        });

        /* After XR session was entered, the projection matrix changed */
        this.onViewportResize();
    };

    cursorComponentMod.onSelect = function onSelect(e) {
    };

    cursorComponentMod.onSelectStart = function onSelectStart(e) {
        if (this.active) {
            this.arTouchDown = true;
            if (e.inputSource.handedness == this._handedness) {
                this._isDown = true;
            }
        }

        if (e.inputSource.handedness == this._handedness) {
            this._isRealDown = true;
        }
    };

    cursorComponentMod.onSelectEnd = function onSelectEnd(e) {
        if (this.active) {
            this.arTouchDown = false;
            if (e.inputSource.handedness == this._handedness) {
                if (!this._isDown) {
                    this._isUpWithNoDown = true;
                }
                this._isDown = false;
            }
        }

        if (e.inputSource.handedness == this._handedness) {
            this._isRealDown = false;
        }
    };

    cursorComponentMod.onPointerMove = function onPointerMove(e) {
        if (this.active) {
            /* Don't care about secondary pointers */
            if (this._pointerId != null && this._pointerId != e._pointerId) return;

            let bounds = document.body.getBoundingClientRect();
            this.updateMousePos(e.clientX, e.clientY, bounds.width, bounds.height);

            let rayHit = this.rayCast();
            this.hoverBehaviour(rayHit);

            if (this.hoveringObject != null) {
                this._pointerId = e._pointerId;
            } else {
                this._pointerId = null;
            }
        }
    };

    cursorComponentMod.onClick = function onClick(e) {
    };

    cursorComponentMod.onPointerDown = function onPointerDown(e) {
        /* Don't care about secondary pointers or non-left clicks */
        if ((this._pointerId != null && this._pointerId != e._pointerId) || e.button !== 0) return;

        if (this.active) {
            let bounds = document.body.getBoundingClientRect();
            this.updateMousePos(e.clientX, e.clientY, bounds.width, bounds.height);

            this._isDown = true;
            this._isRealDown = true;

            let rayHit = this.rayCast();
            this.hoverBehaviour(rayHit);

            if (this.hoveringObject != null) {
                this._pointerId = e._pointerId;
            } else {
                this._pointerId = null;
            }
        } else {
            this._isRealDown = true;
        }
    };

    cursorComponentMod.onPointerUp = function onPointerUp(e) {
        /* Don't care about secondary pointers or non-left clicks */
        if ((this._pointerId != null && this._pointerId != e._pointerId) || e.button !== 0) return;

        if (this.active) {
            let bounds = document.body.getBoundingClientRect();
            this.updateMousePos(e.clientX, e.clientY, bounds.width, bounds.height);

            if (!this._isDown) {
                this._isUpWithNoDown = true;
            }

            this._isDown = false;
            this._isRealDown = false;

            let rayHit = this.rayCast();
            this.hoverBehaviour(rayHit);

            if (this.hoveringObject != null) {
                this._pointerId = e._pointerId;
            } else {
                this._pointerId = null;
            }

            this._updatePointerStyle = true;
        } else {
            this._isRealDown = false;
        }
    };

    cursorComponentMod.updateMousePos = function updateMousePos(clientX, clientY, w, h) {
        this._lastClientX = clientX;
        this._lastClientY = clientY;
        this._lastWidth = w;
        this._lastHeight = h;

        /* Get direction in normalized device coordinate space from mouse position */
        let left = clientX / w;
        let top = clientY / h;
        this._direction.vec3_set(left * 2 - 1, -top * 2 + 1, -1.0);

        this.updateDirection();
    };

    cursorComponentMod.updateDirection = function () {
        let transformWorld = quat2_create();
        return function updateDirection() {
            this.object.pp_getPosition(this._origin);

            /* Reverse-project the direction into view space */
            this._direction.vec3_transformMat4(this._projectionMatrix, this._direction);
            this._direction.vec3_normalize(this._direction);
            this._direction.vec3_transformQuat(this.object.pp_getTransformQuat(transformWorld), this._direction);
        };
    }();

    cursorComponentMod.onActivate = function onActivate() {
        this._isDown = false;
        this._lastIsDown = false;
        this._isUpWithNoDown = false;
    };

    cursorComponentMod.onDeactivate = function onDeactivate() {
        if (this.hoveringObject) {
            if (this.hoveringObjectTarget) this.hoveringObjectTarget.onUnhover.notify(this.hoveringObject, this);
            this.globalTarget.onUnhover.notify(this.hoveringObject, this);
        }

        this.hoveringObject = null;
        this.hoveringObjectTarget = null;
        if (this.styleCursor) {
            document.body.style.cursor = "default";
        }

        this._isDown = false;
        this._lastIsDown = false;
        this._isUpWithNoDown = false;

        this._setCursorVisibility(false);
        if (this.cursorRayObject) {
            this.cursorRayObject.pp_setActive(false);
        }

        this._pointerId = null;

        this._lastClientX = null;
        this._lastClientY = null;
        this._lastWidth = null;
        this._lastHeight = null;
    };

    cursorComponentMod.onDestroy = function onDestroy() {
        if (this._hitTestObject != null) {
            this._hitTestObject.destroy();
        }

        for (let f of this._onDestroyListeners) f();
    };


    cursorComponentMod.notify = function notify(event, originalEvent = null) {
        if (this.hoveringObject) {
            if (this.hoveringObjectTarget) {
                this.hoveringObjectTarget[event].notify(target, this, originalEvent != null ? originalEvent : undefined);
            }

            this.globalTarget[event].notify(target, this, originalEvent != null ? originalEvent : undefined);
        }
    };

    // New Functions 

    cursorComponentMod.pp_setViewComponent = function pp_setViewComponent(viewComponent) {
        this._viewComponent = viewComponent;
        /* If this object also has a view component, we will enable inverse-projected mouse clicks,
         * otherwise just use the objects transformation */
        if (this._viewComponent != null) {
            let onClick = this.onClick.bind(this);
            Globals.getCanvas(this.engine).addEventListener("click", onClick);
            let onPointerDown = this.onPointerDown.bind(this);
            Globals.getCanvas(this.engine).addEventListener("pointerdown", onPointerDown);
            let onPointerMove = this.onPointerMove.bind(this);
            Globals.getCanvas(this.engine).addEventListener("pointermove", onPointerMove);
            let onPointerUp = this.onPointerUp.bind(this);
            Globals.getCanvas(this.engine).addEventListener("pointerup", onPointerUp);
            let onPointerLeave = this._pp_onPointerLeave.bind(this);
            Globals.getCanvas(this.engine).addEventListener("pointerleave", onPointerLeave);

            this._viewComponent.projectionMatrix.mat4_invert(this._projectionMatrix);
            let onViewportResize = this.onViewportResize.bind(this);
            window.addEventListener("resize", onViewportResize);

            this._onDestroyListeners.push(() => {
                Globals.getCanvas(this.engine).removeEventListener("click", onClick);
                Globals.getCanvas(this.engine).removeEventListener("pointerdown", onPointerDown);
                Globals.getCanvas(this.engine).removeEventListener("pointermove", onPointerMove);
                Globals.getCanvas(this.engine).removeEventListener("pointerup", onPointerUp);
                Globals.getCanvas(this.engine).removeEventListener("pointerleave", onPointerLeave);
                window.removeEventListener("resize", onViewportResize);
            });
        }
    };

    cursorComponentMod._pp_onPointerLeave = function _pp_onPointerLeave(e) {
        if (this._pointerId == null || this._pointerId == e._pointerId) {
            if (this.active) {
                this.hoverBehaviour(null, true); // Trigger unhover
            }

            this._pointerId = null;

            this._lastClientX = null;
            this._lastClientY = null;
            this._lastWidth = null;
            this._lastHeight = null;
        }
    };

    cursorComponentMod._pp_isDownToProcess = function _pp_isDownToProcess() {
        return this._isDown !== this._lastIsDown && this._isDown;
    };

    cursorComponentMod._pp_isUpToProcess = function _pp_isUpToProcess() {
        return this._isDown !== this._lastIsDown && !this._isDown;
    };

    cursorComponentMod._pp_isMoving = function () {
        let hitLocationLocalToTarget = vec3_create();
        return function _pp_isMoving(hitLocation) {
            let isMoving = false;

            hitLocationLocalToTarget = this.hoveringObject.pp_convertPositionWorldToLocal(hitLocation, hitLocationLocalToTarget);

            if (!hitLocationLocalToTarget.vec_equals(this._prevHitLocationLocalToTarget, 0.0001)) {
                isMoving = true;
            }

            return isMoving;
        };
    }();



    PluginUtils.assignProperties(cursorComponentMod, Cursor.prototype, false, true, true);
}