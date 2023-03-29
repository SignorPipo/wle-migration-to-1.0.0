import { Component, Type } from "@wonderlandengine/api";

export class ClearConsoleOnXRSessionStartComponent extends Component {
    static TypeName = "pp-clear-console-on-xr-session-start";
    static Properties = {};

    start() {
        this._myFirstTime = true;
        this.engine.onXRSessionStart.push(function () {
            if (this._myFirstTime) {
                this._myFirstTime = false;
                console.clear();
            }
        }.bind(this));
    }
}