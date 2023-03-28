import { Component, Type } from "@wonderlandengine/api";
import { GrabberHandComponent } from "../../../../gameplay/grab_throw/grabber_hand_component";
import { getEasyTuneTarget, removeEasyTuneTarget, setEasyTuneTarget } from "../../easy_tune_globals";

export class EasySetTuneTargeetGrabComponent extends Component {
    static TypeName = "pp-easy-set-tune-target-grab";
    static Properties = {};

    start() {
        this._myGrabber = this.object.pp_getComponent(GrabberHandComponent);
        this._myEasyTuneTarget = null;
    }

    _onRelease(grabber, grabbable) {
        this._myEasyTuneTarget = grabbable.object;
        setEasyTuneTarget(this._myEasyTuneTarget, this.engine);
    }

    _onGrab(grabber, grabbable) {
        if (getEasyTuneTarget(this.engine) == this._myEasyTuneTarget) {
            removeEasyTuneTarget(this.engine);
        }
        this._myEasyTuneTarget = null;
    }

    onActivate() {
        //this._myGrabber.registerGrabEventListener(this, this._onGrab.bind(this));
        this._myGrabber.registerThrowEventListener(this, this._onRelease.bind(this));
    }

    onDeactivate() {
        //this._myGrabber.unregisterGrabEventListener(this);
        this._myGrabber.unregisterThrowEventListener(this);
    }
};