import { Component, Type } from "@wonderlandengine/api";

export class EasySetTuneTargeetGrabComponent extends Component {
    static TypeName = "pp-easy-set-tune-target-grab";
    static Properties = {};

    init() {
    }

    start() {
        this._myGrabber = this.object.pp_getComponent("pp-grabber-hand");
    }

    update() {
    }

    _onRelease(grabber, grabbable) {
        PP.myEasyTuneTarget = grabbable.object;
    }

    _onGrab(grabber, grabbable) {
        //PP.myEasyTuneTarget = null;
    }

    onActivate() {
        this._myGrabber.registerGrabEventListener(this, this._onGrab.bind(this));
        this._myGrabber.registerThrowEventListener(this, this._onRelease.bind(this));
    }

    onDeactivate() {
        this._myGrabber.unregisterGrabEventListener(this);
        this._myGrabber.unregisterThrowEventListener(this);
    }
};