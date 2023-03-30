import { Component, Type } from "@wonderlandengine/api";
import { getEasyTuneVariables, hasEasyTuneVariables, removeEasyTuneVariables, setEasyTuneVariables } from "../easy_tune_globals";
import { EasyTuneVariables } from "../easy_tune_variables";

export class InitEasyTuneVariablesComponent extends Component {
    static TypeName = "pp-init-easy-tune-variables";
    static Properties = {};

    init() {
        this._myEasyTuneVariables = null;

        // Prevents double global from same engine
        if (!hasEasyTuneVariables(this.engine)) {
            this._myEasyTuneVariables = new EasyTuneVariables();

            setEasyTuneVariables(this._myEasyTuneVariables, this.engine);
        }
    }

    onDestroy() {
        if (this._myEasyTuneVariables != null && getEasyTuneVariables(this.engine) == this._myEasyTuneVariables) {
            removeEasyTuneVariables(this.engine);
        }
    }
}