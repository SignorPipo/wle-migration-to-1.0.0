import { CollisionEventType, Emitter, PhysXComponent } from "@wonderlandengine/api";
import { Timer } from "../cauldron/timer";

export class PhysicsCollisionCollector {

    constructor(physXComponent, isTrigger = false) {
        this._myPhysX = physXComponent;

        this._myIsTrigger = isTrigger;

        this._myCollisions = [];

        this._myCollisionsStart = [];
        this._myCollisionsEnd = [];
        this._myUpdateActive = false;
        this._myCollisionsStartToProcess = [];
        this._myCollisionsEndToProcess = [];

        this._myCollisionCallbackID = null;

        this._myIsActive = false;
        this.setActive(true);

        this._myDebugActive = false;

        this._myTriggerDesyncFixDelay = new Timer(0.1);

        this._myCollisionCallbacks = new Emitter();          // Signature: callback(thisPhysX, otherPhysX, collisionType)
        this._myCollisionStartCallbacks = new Emitter();     // Signature: callback(thisPhysX, otherPhysX, collisionType)
        this._myCollisionEndCallbacks = new Emitter();       // Signature: callback(thisPhysX, otherPhysX, collisionType)

    }

    getPhysX() {
        return this._myPhysX;
    }

    getCollisions() {
        return this._myCollisions;
    }

    getCollisionsStart() {
        return this._myCollisionsStart;
    }

    getCollisionsEnd() {
        return this._myCollisionsEnd;
    }

    setActive(active) {
        if (this._myIsActive != active) {
            this._myIsActive = active;

            this._myCollisions = [];

            this._myCollisionsStart = [];
            this._myCollisionsEnd = [];
            this._myUpdateActive = false;
            this._myCollisionsStartToProcess = [];
            this._myCollisionsEndToProcess = [];

            if (this._myIsActive) {
                this._myCollisionCallbackID = this._myPhysX.onCollision(this._onCollision.bind(this));
            } else if (this._myCollisionCallbackID != null) {
                this._myPhysX.removeCollisionCallback(this._myCollisionCallbackID);
                this._myCollisionCallbackID = null;
            }
        }
    }

    // Set to true only if u are going to actually update this object and don't want to lose any collision start/end events prior to updating the first time after activation
    setUpdateActive(active) {
        this._myUpdateActive = active;
    }

    // Update is not mandatory, use it only if u want to access collisions start and end
    update(dt) {
        if (!this._myIsActive) {
            return;
        }

        this._myUpdateActive = true;

        this._myCollisionsStart = this._myCollisionsStartToProcess;
        this._myCollisionsStartToProcess = [];

        this._myCollisionsEnd = this._myCollisionsEndToProcess;
        this._myCollisionsEndToProcess = [];

        if (this._myIsTrigger) {
            this._triggerDesyncFix(dt);
        }
    }

    destroy() {
        if (this._myCollisionCallbackID != null) {
            this._myPhysX.removeCollisionCallback(this._myCollisionCallbackID);
            this._myCollisionCallbackID = null;
        }
    }

    setDebugActive(active) {
        this._myDebugActive = active;
    }

    registerCollisionEventListener(callbackID, callback) {
        this._myCollisionCallbacks.add(callback, { id: callbackID });
    }

    unregisterCollisionEventListener(callbackID) {
        this._myCollisionCallbacks.remove(callbackID);
    }

    registerCollisionStartEventListener(callbackID, callback) {
        this._myCollisionStartCallbacks.add(callback, { id: callbackID });
    }

    unregisterCollisionStartEventListener(callbackID) {
        this._myCollisionStartCallbacks.remove(callbackID);
    }

    registerCollisionEndEventListener(callbackID, callback) {
        this._myCollisionEndCallbacks.add(callback, { id: callbackID });
    }

    unregisterCollisionEndEventListener(callbackID) {
        this._myCollisionEndCallbacks.remove(callbackID);
    }

    _onCollision(type, physXComponent) {
        if (type == CollisionEventType.Touch || type == CollisionEventType.TriggerTouch) {
            this._onCollisionStart(type, physXComponent);
        } else if (type == CollisionEventType.TouchLost || type == CollisionEventType.TriggerTouchLost) {
            this._onCollisionEnd(type, physXComponent);
        }

        this._myCollisionCallbacks.notify(this._myPhysX, physXComponent, type);
    }

    _onCollisionStart(type, physXComponent) {
        if (this._myDebugActive) {
            let objectFound = false;
            for (let object of this._myCollisions) {
                if (object.pp_equals(physXComponent.object)) {
                    objectFound = true;
                    break;
                }
            }

            if (objectFound) {
                console.error("Collision Start on object already collected");
            }
        }

        this._myCollisions.push(physXComponent.object);

        if (this._myUpdateActive) {
            this._myCollisionsStartToProcess.push(physXComponent.object);
            this._myCollisionsEndToProcess.pp_removeAll(function (element) {
                return element.pp_equals(physXComponent.object);
            });
        }

        if (this._myDebugActive) {
            console.log("Collision Start -", this._myCollisions.length);
        }

        this._myCollisionStartCallbacks.notify(this._myPhysX, physXComponent, type);
    }

    _onCollisionEnd(type, physXComponent) {
        if (this._myDebugActive) {
            let objectFound = false;
            for (let object of this._myCollisions) {
                if (object.pp_equals(physXComponent.object)) {
                    objectFound = true;
                    break;
                }
            }

            if (!objectFound) {
                console.error("Collision End on object not collected");
            }
        }


        this._myCollisions.pp_removeAll(function (element) {
            return element.pp_equals(physXComponent.object);
        });

        if (this._myUpdateActive) {
            this._myCollisionsEndToProcess.push(physXComponent.object);
            this._myCollisionsStartToProcess.pp_removeAll(function (element) {
                return element.pp_equals(physXComponent.object);
            });
        }

        if (this._myDebugActive) {
            console.log("Collision End -", this._myCollisions.length);
        }

        this._myCollisionEndCallbacks.notify(this._myPhysX, physXComponent, type);
        if (this._myCollisionEndCallbacks.size > 0) {
            this._myCollisionEndCallbacks.forEach(function (callback) { callback(this._myPhysX, physXComponent, type); });
        }
    }

    _triggerDesyncFix(dt) {
        this._myTriggerDesyncFixDelay.update(dt);
        if (this._myTriggerDesyncFixDelay.isDone()) {
            this._myTriggerDesyncFixDelay.start();

            let collisionsToEnd = this._myCollisions.pp_findAll(function (element) {
                let physX = element.pp_getComponentSelf(PhysXComponent);
                return physX == null || !physX.active;
            });

            if (collisionsToEnd.length > 0) {
                //console.error("DESYNC RESOLVED");

                for (let collision of collisionsToEnd) {
                    let physX = collision.pp_getComponentSelf(PhysXComponent);
                    if (physX) {
                        this._onCollisionEnd(CollisionEventType.TriggerTouchLost, physX);
                    } else {
                        console.error("NO PHYSX, HOW?");
                    }
                }
            }
        }
    }
}