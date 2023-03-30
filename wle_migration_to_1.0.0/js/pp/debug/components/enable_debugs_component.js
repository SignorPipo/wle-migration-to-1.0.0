import { Component, Type } from "@wonderlandengine/api";
import { hasDebugEnabled, isDebugEnabled, removeDebugEnabled, setDebugEnabled } from "../debug_globals";

export class EnableDebugsComponent extends Component {
    static TypeName = "pp-enable-debugs";
    static Properties = {
        _myEnabled: { type: Type.Bool, default: true }
    };

    init() {
        this._myDebugEnabled = null;

        // Prevents double global from same engine
        if (!hasDebugEnabled(this.engine)) {
            this._myDebugEnabled = this._myEnabled;

            setDebugEnabled(this._myDebugEnabled, this.engine);
        }
    }

    onDestroy() {
        if (this._myDebugEnabled != null && isDebugEnabled(this.engine) == this._myDebugEnabled) {
            removeDebugEnabled(this.engine);
        }
    }
}