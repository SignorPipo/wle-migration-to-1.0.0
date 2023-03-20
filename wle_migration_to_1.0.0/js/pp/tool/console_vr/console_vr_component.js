import { Component, Type } from "@wonderlandengine/api";

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
        this._myWidget = new PP.ConsoleVRWidget();

        this._myStarted = false;
    }

    start() {
        let additionalSetup = new PP.ConsoleVRWidget.AdditionalSetup();
        additionalSetup.myHandedness = [null, "left", "right"][this._myHandedness];
        additionalSetup.myOverrideBrowserConsole = this._myOverrideBrowserConsole;
        additionalSetup.myShowOnStart = this._myShowOnStart;
        additionalSetup.myShowVisibilityButton = this._myShowVisibilityButton;
        additionalSetup.myPulseOnNewMessage = this._myPulseOnNewMessage;
        additionalSetup.myPlaneMaterial = PP.myDefaultResources.myMaterials.myFlatOpaque.clone();
        additionalSetup.myTextMaterial = PP.myDefaultResources.myMaterials.myText.clone();

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
};
