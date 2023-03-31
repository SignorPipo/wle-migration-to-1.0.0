import { Component, Type } from "@wonderlandengine/api";
import { XRUtils } from "../utils/xr_utils";

export class ClearConsoleOnXRSessionStartComponent extends Component {
    static TypeName = "pp-clear-console-on-xr-session-start";
    static Properties = {
        _myClear: { type: Type.Bool, default: true },
        _myFirstTimeOnly: { type: Type.Bool, default: true }
    };

    start() {
        if (this._myClear) {
            this._myFirstTime = true;

            XRUtils.registerSessionStartEventListener(this, this._onXRSessionStart.bind(this), this.engine);
        }
    }

    _onXRSessionStart() {
        if (!this._myFirstTimeOnly || this._myFirstTime) {
            this._myFirstTime = false;
            console.clear();
        }
    }
}