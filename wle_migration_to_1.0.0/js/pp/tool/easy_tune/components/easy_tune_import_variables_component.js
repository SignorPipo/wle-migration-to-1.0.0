import { Component, Type } from "@wonderlandengine/api";
import { EasyTuneUtils } from "../easy_tune_utils";

export class EasyTuneImportVariablesComponent extends Component {
    static TypeName = "pp-easy-tune-import-variables";
    static Properties = {
        _myVariablesImportURL: { type: Type.String, default: "" },
        _myResetVariablesDefaultValueOnImport: { type: Type.Bool, default: true }
    };

    start() {
        this._myFirstUpdate = true;
    }

    update(dt) {
        if (this._myFirstUpdate) {
            this._myFirstUpdate = false;
            EasyTuneUtils.importEasyTuneVariables(this._myVariablesImportURL, this._myResetVariablesDefaultValueOnImport, undefined, undefined, this.engine);
        }
    }
};