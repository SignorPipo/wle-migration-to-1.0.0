import { Component, Type } from "@wonderlandengine/api";

export class ToolCursorComponent extends Component {
    static TypeName = "pp-tool-cursor";
    static Properties = {
        _myHandedness: { type: Type.Enum, values: ["left", "right"], default: "left" },
        _myFixForward: { type: Type.Bool, default: true },
        _myApplyDefaultCursorOffset: { type: Type.Bool, default: true },
        _myPulseOnHover: { type: Type.Bool, default: false },
        _myShowFingerCursor: { type: Type.Bool, default: false }
    }

    init() {
        this._myHandednessString = ["left", "right"][this._myHandedness];

        this._myCursorPositionDefaultOffset = PP.vec3_create(0, -0.035, -0.05);
        this._myCursorRotationDefaultOffset = PP.vec3_create(-30, 0, 0);

        this._myCursorMeshScale = PP.vec3_create(0.0025, 0.0025, 0.0025);
        this._myCursorColor = [255 / 255, 255 / 255, 255 / 255, 1];

        this._myCursorTargetCollisionGroup = 7;
    }

    start() {
        this._myToolCursorObject = this.engine.scene.addObject(this.object);
        this._myFixForwardObject = this.engine.scene.addObject(this._myToolCursorObject);

        if (this._myFixForward) {
            this._myFixForwardObject.pp_rotateObject(PP.vec3_create(0, 180, 0));
        }

        this._myCursorObjectVR = this.engine.scene.addObject(this._myFixForwardObject);

        if (this._myApplyDefaultCursorOffset) {
            this._myCursorObjectVR.pp_setPositionLocal(this._myCursorPositionDefaultOffset);
            this._myCursorObjectVR.pp_rotateObject(this._myCursorRotationDefaultOffset);
        }

        {
            this._myCursorMeshobject = this.engine.scene.addObject(this._myCursorObjectVR);
            this._myCursorMeshobject.pp_setScale(this._myCursorMeshScale);

            let cursorMeshComponent = this._myCursorMeshobject.addComponent("mesh");
            cursorMeshComponent.mesh = PP.myDefaultResources.myMeshes.mySphere;
            cursorMeshComponent.material = PP.myDefaultResources.myMaterials.myFlatOpaque.clone();
            cursorMeshComponent.material.color = this._myCursorColor;

            this._myCursorComponentVR = this._myCursorObjectVR.addComponent("cursor", { "collisionGroup": this._myCursorTargetCollisionGroup, "handedness": this._myHandedness + 1, "cursorObject": this._myCursorMeshobject });
            this._myCursorComponentVR.rayCastMode = 0; //collision
            if (this._myPulseOnHover) {
                this._myCursorComponentVR.globalTarget.addHoverFunction(this._pulseOnHover.bind(this));
            }
        }

        this._myCursorObjectNonVR = this.engine.scene.addObject(this._myToolCursorObject);

        {
            this._myCursorComponentNonVR = this._myCursorObjectNonVR.addComponent("cursor", { "collisionGroup": this._myCursorTargetCollisionGroup, "handedness": this._myHandedness + 1 });
            this._myCursorComponentNonVR.rayCastMode = 0; //collision
            if (this._myPulseOnHover) {
                this._myCursorComponentNonVR.globalTarget.addHoverFunction(this._pulseOnHover.bind(this));
            }
            this._myCursorComponentNonVR.setViewComponent(PP.myPlayerObjects.myNonVRCamera.getComponent("view"));
        }

        let fingerCursorMeshObject = null;
        let fingerCollisionSize = 0.0125;

        if (this._myShowFingerCursor) {
            fingerCursorMeshObject = this._myToolCursorObject.pp_addObject();

            let meshComponent = fingerCursorMeshObject.addComponent("mesh");
            meshComponent.mesh = PP.myDefaultResources.myMeshes.mySphere;
            meshComponent.material = PP.myDefaultResources.myMaterials.myFlatOpaque.clone();
            meshComponent.material.color = this._myCursorColor;

            fingerCursorMeshObject.pp_setScale(fingerCollisionSize);
        }

        this._myFingerCursorObject = this.engine.scene.addObject(this._myToolCursorObject);
        this._myFingerCursorComponent = this._myFingerCursorObject.addComponent("pp-finger-cursor", {
            "_myHandedness": this._myHandedness,
            "_myEnableMultipleClicks": true,
            "_myCollisionGroup": this._myCursorTargetCollisionGroup,
            "_myCollisionSize": fingerCollisionSize,
            "_myCursorObject": fingerCursorMeshObject
        });

        this._myCursorComponentVR.active = false;
        this._myCursorComponentNonVR.active = false;
        this._myFingerCursorComponent.active = false;

    }

    update(dt) {
        // implemented outside class definition
    }

    _isUsingHand() {
        let isUsingHand = false;

        if (this.engine.xrSession && this.engine.xrSession.inputSources) {
            for (let i = 0; i < this.engine.xrSession.inputSources.length; i++) {
                let input = this.engine.xrSession.inputSources[i];
                if (input.hand && input.handedness == this._myHandednessString) {
                    isUsingHand = true;
                    break;
                }
            }
        }

        return isUsingHand;
    }

    _pulseOnHover(object) {
        let targetComponent = object.getComponent("cursor-target");

        if (targetComponent && !targetComponent.isSurface) {
            if (this._myHandedness == 0) {
                if (PP.myLeftGamepad) {
                    PP.myLeftGamepad.pulse(0.4, 0);
                }
            } else {
                if (PP.myRightGamepad) {
                    PP.myRightGamepad.pulse(0.4, 0);
                }
            }
        }
    }
};



// IMPLEMENTATION

ToolCursorComponent.prototype.update = function () {
    let transformQuat = PP.quat2_create();
    return function update(dt) {
        let isUsingHand = this._isUsingHand();

        this._myFingerCursorComponent.active = isUsingHand;

        if (isUsingHand) {
            this._myCursorComponentVR.active = false;
            this._myCursorComponentNonVR.active = false;
        } else {
            if (PP.XRUtils.isSessionActive()) {
                this._myCursorComponentVR.active = !isUsingHand;
                this._myCursorComponentNonVR.active = false;
            } else {
                this._myCursorComponentNonVR.active = !isUsingHand;
                this._myCursorComponentVR.active = false;

                this._myCursorObjectNonVR.pp_setTransformQuat(PP.myPlayerObjects.myNonVRCamera.pp_getTransformQuat(transformQuat));
            }
        }
    };
}()