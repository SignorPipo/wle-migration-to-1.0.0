import { Component, Type } from "@wonderlandengine/api";
import { getDefaultResources } from "../../pp/default_resources_global";
import { ConsoleVR } from "./console_vr";
import { getConsoleVR, hasConsoleVR, removeConsoleVR, setConsoleVR } from "./console_vr_global";
import { ConsoleVRWidget, ConsoleVRWidgetAdditionalSetup } from "./console_vr_widget";

export class ConsoleVRComponent extends Component {
    static TypeName = "pp-console-vr";
    static Properties = {
        _myHandedness: { type: Type.Enum, values: ["none", "left", "right"], default: "none" },
        _myOverrideBrowserConsole: { type: Type.Bool, default: true },
        _myShowOnStart: { type: Type.Bool, default: false },
        _myShowVisibilityButton: { type: Type.Bool, default: false },
        _myPulseOnNewMessage: { type: Type.Enum, values: ["never", "always", "when hidden"], default: "never" }
    };

    init() {
        this._myConsoleVR = null;

        // prevents double global from same engine
        if (!hasConsoleVR(this.engine)) {
            this._myConsoleVR = new ConsoleVR();

            setConsoleVR(this._myConsoleVR, this.engine);
        }

        this._myWidget = new ConsoleVRWidget(this.engine);

        this._myStarted = false;
    }

    start() {
        let additionalSetup = new ConsoleVRWidgetAdditionalSetup(this.engine);
        additionalSetup.myHandedness = [null, "left", "right"][this._myHandedness];
        additionalSetup.myOverrideBrowserConsole = this._myOverrideBrowserConsole;
        additionalSetup.myShowOnStart = this._myShowOnStart;
        additionalSetup.myShowVisibilityButton = this._myShowVisibilityButton;
        additionalSetup.myPulseOnNewMessage = this._myPulseOnNewMessage;
        additionalSetup.myPlaneMaterial = getDefaultResources(this.engine).myMaterials.myFlatOpaque.clone();
        additionalSetup.myTextMaterial = getDefaultResources(this.engine).myMaterials.myText.clone();

        this._myWidget.start(this.object, additionalSetup);

        this._myWidgetVisibleBackup = this._myWidget.isVisible();
        this._mySetVisibleNextUpdate = false;

        this._myStarted = true;
    }

    update(dt) {
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
        if (this._myConsoleVR != null && getConsoleVR(this.engine) == this._myConsoleVR) {
            removeConsoleVR(this.engine);
        }
    }
};
