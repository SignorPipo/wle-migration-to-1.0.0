import { Component, Type } from "@wonderlandengine/api";
import { getDefaultResources } from "../../../pp/default_resources_global";
import { getEasyTuneVariables, hasEasyTuneVariables, removeEasyTuneVariables, setEasyTuneVariables } from "../easy_tune_globals";
import { EasyTuneUtils } from "../easy_tune_utils";
import { EasyTuneVariables } from "../easy_tune_variables";
import { EasyTuneWidget, EasyTuneWidgetAdditionalSetup } from "../easy_tune_widgets/easy_tune_widget";

export class EasyTuneComponent extends Component {
    static TypeName = "pp-easy-tune";
    static Properties = {
        _myHandedness: { type: Type.Enum, values: ["None", "Left", "Right"], default: "None" },
        _myShowOnStart: { type: Type.Bool, default: false },
        _myShowVisibilityButton: { type: Type.Bool, default: false },
        _myEnableGamepadScrollVariable: { type: Type.Bool, default: true },
        _myEnableVariablesImportExportButtons: { type: Type.Bool, default: false },
        _myVariablesImportURL: { type: Type.String, default: "" },   // the URL can contain parameters inside brackets, like {param}
        _myVariablesExportURL: { type: Type.String, default: "" },   // those parameters will be replaced with the same one on the current page url, like www.currentpage.com/?param=2
        _myImportVariablesOnStart: { type: Type.Bool, default: false },
        _myResetVariablesDefaultValueOnImport: { type: Type.Bool, default: false }
    };

    init() {
        this._myEasyTuneVariables = null;

        // prevents double global from same engine
        if (!hasEasyTuneVariables(this.engine)) {
            this._myEasyTuneVariables = new EasyTuneVariables();

            setEasyTuneVariables(this._myEasyTuneVariables, this.engine);
        }

        this._myWidget = new EasyTuneWidget(this.engine);

        //add easy tune variables

        EasyTuneUtils.addSetEasyTuneWidgetActiveVariableCallback(this, function (variableName) {
            this._myWidget.setActiveVariable(variableName);
        }.bind(this), this.engine);

        EasyTuneUtils.addRefreshEasyTuneWidgetCallback(this, function () {
            this._myWidget.refresh();
        }.bind(this), this.engine);

        this._myStarted = false;
    }

    start() {
        let additionalSetup = new EasyTuneWidgetAdditionalSetup();
        additionalSetup.myHandedness = [null, "left", "right"][this._myHandedness];
        additionalSetup.myShowOnStart = this._myShowOnStart;
        additionalSetup.myShowVisibilityButton = this._myShowVisibilityButton;
        additionalSetup.myEnableAdditionalButtons = true;
        additionalSetup.myEnableGamepadScrollVariable = this._myEnableGamepadScrollVariable;
        additionalSetup.myPlaneMaterial = getDefaultResources(this.engine).myMaterials.myFlatOpaque.clone();
        additionalSetup.myTextMaterial = getDefaultResources(this.engine).myMaterials.myText.clone();

        additionalSetup.myEnableVariablesImportExportButtons = this._myEnableVariablesImportExportButtons;
        additionalSetup.myVariablesImportCallback = function (onSuccessCallback, onFailureCallback) {
            EasyTuneUtils.importEasyTuneVariables(this._myVariablesImportURL, this._myResetVariablesDefaultValueOnImport, onSuccessCallback, onFailureCallback, this.engine);
        }.bind(this);
        additionalSetup.myVariablesExportCallback = function (onSuccessCallback, onFailureCallback) {
            EasyTuneUtils.exportEasyTuneVariables(this._myVariablesExportURL, onSuccessCallback, onFailureCallback, this.engine);
        }.bind(this);

        this._myWidget.start(this.object, additionalSetup, getEasyTuneVariables(this.engine));

        this._myWidgetVisibleBackup = this._myWidget.isVisible();
        this._mySetVisibleNextUpdate = false;

        this._myStarted = true;
        this._myFirstUpdate = true;
    }

    update(dt) {
        if (this._myFirstUpdate) {
            this._myFirstUpdate = false;
            if (this._myImportVariablesOnStart) {
                EasyTuneUtils.importEasyTuneVariables(this._myVariablesImportURL, this._myResetVariablesDefaultValueOnImport, undefined, undefined, this.engine);
            }
        }

        if (this._mySetVisibleNextUpdate) {
            this._mySetVisibleNextUpdate = false;
            this._myWidget.setVisible(false);
            this._myWidget.setVisible(this._myWidgetVisibleBackup);
        }

        this._myWidget.update(dt);
    }

    onActivate() {
        this._mySetVisibleNextUpdate = true;
    }

    onDeactivate() {
        if (this._myStarted) {
            this._myWidgetVisibleBackup = this._myWidget.isVisible();

            this._myWidget.setVisible(false);
        }
    }

    onDestroy() {
        if (this._myEasyTuneVariables != null && getEasyTuneVariables(this.engine) == this._myEasyTuneVariables) {
            removeEasyTuneVariables(this.engine);
        }
    }
}