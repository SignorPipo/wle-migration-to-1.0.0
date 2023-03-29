import { Component, Type } from "@wonderlandengine/api";
import { XRUtils } from "../../../cauldron/utils/xr_utils";
import { vec3_create } from "../../../plugin/js/extensions/array_extension";

export class SetPlayerHeightComponent extends Component {
    static TypeName = "pp-set-player-height";
    static Properties = {
        _myEyesHeight: { type: Type.Float, default: 1.65 },
        _mySetOnlyOnStart: { type: Type.Bool, default: false }
    };

    start() {
        let localPosition = this.object.pp_getPositionLocal();
        this.object.pp_setPositionLocal(vec3_create(localPosition[0], this._myEyesHeight, localPosition[2]));

        this._myHeightSetOnce = false;

        if (XRUtils.getSession(this.engine)) {
            this._onXRSessionStart(XRUtils.getSession(this.engine));
        }
        this.engine.onXRSessionStart.push(this._onXRSessionStart.bind(this));
        this.engine.onXRSessionEnd.push(this._onXRSessionEnd.bind(this));
    }

    _onXRSessionStart() {
        if (this.active && (!this._mySetOnlyOnStart || !this._myHeightSetOnce)) {
            let localPosition = this.object.pp_getPositionLocal();
            if (XRUtils.isReferenceSpaceLocalFloor(this.engine)) {
                this.object.pp_setPositionLocal(vec3_create(localPosition[0], 0, localPosition[2]));
            } else if (XRUtils.isDeviceEmulated()) {
                this.object.pp_setPositionLocal(vec3_create(localPosition[0], 0, localPosition[2]));
            } else {
                this.object.pp_setPositionLocal(vec3_create(localPosition[0], this._myEyesHeight, localPosition[2]));
            }

            this._myHeightSetOnce = true;
        }
    }

    _onXRSessionEnd() {
        if (this.active && !this._mySetOnlyOnStart) {
            let localPosition = this.object.pp_getPositionLocal();
            this.object.pp_setPositionLocal(vec3_create(localPosition[0], this._myEyesHeight, localPosition[2]));
        }
    }
}