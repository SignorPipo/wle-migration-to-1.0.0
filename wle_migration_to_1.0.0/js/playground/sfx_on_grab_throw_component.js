import { Component, Property } from "@wonderlandengine/api";
import { getAudioManager } from "../pp/index";
import { GrabberHandComponent } from "../pp/index";

export class SFXOnGrabThrowComponent extends Component {
    static TypeName = "sfx-on-grab-throw";
    static Properties = {};

    start() {
        let grabbers = this.engine.scene.pp_getComponents(GrabberHandComponent);

        for (let grabber of grabbers) {
            grabber.registerGrabEventListener(this, this._onGrab.bind(this));
            grabber.registerThrowEventListener(this, this._onThrow.bind(this));
        }

        let audioManager = getAudioManager(this.engine);
        this._myGrabSFX = audioManager.createAudioPlayer("grab");
        this._myThrowSFX = audioManager.createAudioPlayer("throw");
    }

    update(dt) {
    }

    _onGrab(grabber, grabbable) {
        this._myGrabSFX.setPosition(grabber.object.pp_getPosition());
        this._myGrabSFX.setPitch(Math.pp_random(1.25 - 0.15, 1.25 + 0.05));
        this._myGrabSFX.play();

        let intensity = 0.25;
        let pulseInfo = grabber.getGamepad().getPulseInfo();
        if (pulseInfo.myIntensity <= intensity) {
            grabber.getGamepad().pulse(intensity, 0.1);
        }
    }

    _onThrow(grabber, grabbable) {
        this._myThrowSFX.setPosition(grabber.object.pp_getPosition());
        this._myThrowSFX.setPitch(Math.pp_random(1.25 - 0.15, 1.25 + 0.05));
        this._myThrowSFX.play();

        let intensity = 0.15;
        let pulseInfo = grabber.getGamepad().getPulseInfo();
        if (pulseInfo.myIntensity <= intensity) {
            grabber.getGamepad().pulse(intensity, 0.1);
        }
    }
}