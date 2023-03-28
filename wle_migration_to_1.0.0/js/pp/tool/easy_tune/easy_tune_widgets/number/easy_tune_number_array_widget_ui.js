import { CollisionComponent, MeshComponent, TextComponent } from "@wonderlandengine/api";
import { CursorTarget } from "@wonderlandengine/components";
import { EasyTuneBaseWidgetUI } from "../base/easy_tune_base_widget_ui";

export class EasyTuneNumberArrayWidgetUI extends EasyTuneBaseWidgetUI {

    constructor(engine) {
        super(engine);
    }

    setAdditionalButtonsActive(active) {
        this._myAdditionalButtonsActive = active;

        for (let i = 0; i < this._mySetup.myArraySize; i++) {
            this.myValueIncreaseButtonPanels[i].pp_setActive(this._myAdditionalButtonsActive);
            this.myValueDecreaseButtonPanels[i].pp_setActive(this._myAdditionalButtonsActive);
        }

        this.myStepIncreaseButtonPanel.pp_setActive(this._myAdditionalButtonsActive);
        this.myStepDecreaseButtonPanel.pp_setActive(this._myAdditionalButtonsActive);
    }

    _buildHook() {
        this._myAdditionalButtonsActive = true;
    }

    _createSkeletonHook() {
        this.myValuesPanel = this.myDisplayPanel.pp_addObject();

        this.myValuePanels = [];
        this.myValueTexts = [];
        this.myValueCursorTargets = [];

        this.myValueIncreaseButtonPanels = [];
        this.myValueIncreaseButtonBackgrounds = [];
        this.myValueIncreaseButtonTexts = [];
        this.myValueIncreaseButtonCursorTargets = [];

        this.myValueDecreaseButtonPanels = [];
        this.myValueDecreaseButtonBackgrounds = [];
        this.myValueDecreaseButtonTexts = [];
        this.myValueDecreaseButtonCursorTargets = [];

        for (let i = 0; i < this._mySetup.myArraySize; i++) {
            this.myValuePanels[i] = this.myValuesPanel.pp_addObject();
            this.myValueTexts[i] = this.myValuePanels[i].pp_addObject();
            this.myValueCursorTargets[i] = this.myValuePanels[i].pp_addObject();

            this.myValueIncreaseButtonPanels[i] = this.myValuePanels[i].pp_addObject();
            this.myValueIncreaseButtonBackgrounds[i] = this.myValueIncreaseButtonPanels[i].pp_addObject();
            this.myValueIncreaseButtonTexts[i] = this.myValueIncreaseButtonPanels[i].pp_addObject();
            this.myValueIncreaseButtonCursorTargets[i] = this.myValueIncreaseButtonPanels[i].pp_addObject();

            this.myValueDecreaseButtonPanels[i] = this.myValuePanels[i].pp_addObject();
            this.myValueDecreaseButtonBackgrounds[i] = this.myValueDecreaseButtonPanels[i].pp_addObject();
            this.myValueDecreaseButtonTexts[i] = this.myValueDecreaseButtonPanels[i].pp_addObject();
            this.myValueDecreaseButtonCursorTargets[i] = this.myValueDecreaseButtonPanels[i].pp_addObject();
        }

        this.myStepPanel = this.myPivotObject.pp_addObject();
        this.myStepText = this.myStepPanel.pp_addObject();
        this.myStepCursorTarget = this.myStepPanel.pp_addObject();

        this.myStepIncreaseButtonPanel = this.myStepPanel.pp_addObject();
        this.myStepIncreaseButtonBackground = this.myStepIncreaseButtonPanel.pp_addObject();
        this.myStepIncreaseButtonText = this.myStepIncreaseButtonPanel.pp_addObject();
        this.myStepIncreaseButtonCursorTarget = this.myStepIncreaseButtonPanel.pp_addObject();

        this.myStepDecreaseButtonPanel = this.myStepPanel.pp_addObject();
        this.myStepDecreaseButtonBackground = this.myStepDecreaseButtonPanel.pp_addObject();
        this.myStepDecreaseButtonText = this.myStepDecreaseButtonPanel.pp_addObject();
        this.myStepDecreaseButtonCursorTarget = this.myStepDecreaseButtonPanel.pp_addObject();
    }

    _setTransformHook() {
        this.myValuesPanel.setTranslationLocal(this._mySetup.myValuesPanelPosition);

        for (let i = 0; i < this._mySetup.myArraySize; i++) {
            this.myValuePanels[i].setTranslationLocal(this._mySetup.myValuePanelsPositions[i]);
            this.myValueTexts[i].pp_scaleObject(this._mySetup.myValueTextScale);
            this.myValueCursorTargets[i].setTranslationLocal(this._mySetup.myValueCursorTargetPosition);

            this.myValueIncreaseButtonPanels[i].setTranslationLocal(this._mySetup.myRightSideButtonPosition);
            this.myValueIncreaseButtonBackgrounds[i].pp_scaleObject(this._mySetup.mySideButtonBackgroundScale);
            this.myValueIncreaseButtonTexts[i].setTranslationLocal(this._mySetup.mySideButtonTextPosition);
            this.myValueIncreaseButtonTexts[i].pp_scaleObject(this._mySetup.mySideButtonTextScale);
            this.myValueIncreaseButtonCursorTargets[i].setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

            this.myValueDecreaseButtonPanels[i].setTranslationLocal(this._mySetup.myLeftSideButtonPosition);
            this.myValueDecreaseButtonBackgrounds[i].pp_scaleObject(this._mySetup.mySideButtonBackgroundScale);
            this.myValueDecreaseButtonTexts[i].setTranslationLocal(this._mySetup.mySideButtonTextPosition);
            this.myValueDecreaseButtonTexts[i].pp_scaleObject(this._mySetup.mySideButtonTextScale);
            this.myValueDecreaseButtonCursorTargets[i].setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);
        }

        this.myStepPanel.setTranslationLocal(this._mySetup.myStepPanelPosition);
        this.myStepText.pp_scaleObject(this._mySetup.myStepTextScale);
        this.myStepCursorTarget.setTranslationLocal(this._mySetup.myStepCursorTargetPosition);

        this.myStepIncreaseButtonPanel.setTranslationLocal(this._mySetup.myRightSideButtonPosition);
        this.myStepIncreaseButtonBackground.pp_scaleObject(this._mySetup.mySideButtonBackgroundScale);
        this.myStepIncreaseButtonText.setTranslationLocal(this._mySetup.mySideButtonTextPosition);
        this.myStepIncreaseButtonText.pp_scaleObject(this._mySetup.mySideButtonTextScale);
        this.myStepIncreaseButtonCursorTarget.setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

        this.myStepDecreaseButtonPanel.setTranslationLocal(this._mySetup.myLeftSideButtonPosition);
        this.myStepDecreaseButtonBackground.pp_scaleObject(this._mySetup.mySideButtonBackgroundScale);
        this.myStepDecreaseButtonText.setTranslationLocal(this._mySetup.mySideButtonTextPosition);
        this.myStepDecreaseButtonText.pp_scaleObject(this._mySetup.mySideButtonTextScale);
        this.myStepDecreaseButtonCursorTarget.setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);
    }

    _addComponentsHook() {
        this.myValueTextComponents = [];
        this.myValueCursorTargetComponents = [];
        this.myValueCollisionComponents = [];

        this.myValueIncreaseButtonBackgroundComponents = [];
        this.myValueIncreaseButtonTextComponents = [];
        this.myValueIncreaseButtonCursorTargetComponents = [];
        this.myValueIncreaseButtonCollisionComponents = [];

        this.myValueDecreaseButtonBackgroundComponents = [];
        this.myValueDecreaseButtonTextComponents = [];
        this.myValueDecreaseButtonCursorTargetComponents = [];
        this.myValueDecreaseButtonCollisionComponents = [];


        for (let i = 0; i < this._mySetup.myArraySize; i++) {
            this.myValueTextComponents[i] = this.myValueTexts[i].pp_addComponent(TextComponent);
            this._setupTextComponent(this.myValueTextComponents[i]);
            this.myValueTextComponents[i].text = " ";

            this.myValueCursorTargetComponents[i] = this.myValueCursorTargets[i].pp_addComponent(CursorTarget);
            this.myValueCollisionComponents[i] = this.myValueCursorTargets[i].pp_addComponent(CollisionComponent);
            this.myValueCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myValueCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myValueCollisionComponents[i].extents = this._mySetup.myValueCollisionExtents;

            this.myValueIncreaseButtonBackgroundComponents[i] = this.myValueIncreaseButtonBackgrounds[i].pp_addComponent(MeshComponent);
            this.myValueIncreaseButtonBackgroundComponents[i].mesh = this._myPlaneMesh;
            this.myValueIncreaseButtonBackgroundComponents[i].material = this._myAdditionalSetup.myPlaneMaterial.clone();
            this.myValueIncreaseButtonBackgroundComponents[i].material.color = this._mySetup.myBackgroundColor;

            this.myValueIncreaseButtonTextComponents[i] = this.myValueIncreaseButtonTexts[i].pp_addComponent(TextComponent);
            this._setupTextComponent(this.myValueIncreaseButtonTextComponents[i]);
            this.myValueIncreaseButtonTextComponents[i].text = this._mySetup.myIncreaseButtonText;

            this.myValueIncreaseButtonCursorTargetComponents[i] = this.myValueIncreaseButtonCursorTargets[i].pp_addComponent(CursorTarget);
            this.myValueIncreaseButtonCollisionComponents[i] = this.myValueIncreaseButtonCursorTargets[i].pp_addComponent(CollisionComponent);
            this.myValueIncreaseButtonCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myValueIncreaseButtonCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myValueIncreaseButtonCollisionComponents[i].extents = this._mySetup.mySideButtonCollisionExtents;

            this.myValueDecreaseButtonBackgroundComponents[i] = this.myValueDecreaseButtonBackgrounds[i].pp_addComponent(MeshComponent);
            this.myValueDecreaseButtonBackgroundComponents[i].mesh = this._myPlaneMesh;
            this.myValueDecreaseButtonBackgroundComponents[i].material = this._myAdditionalSetup.myPlaneMaterial.clone();
            this.myValueDecreaseButtonBackgroundComponents[i].material.color = this._mySetup.myBackgroundColor;

            this.myValueDecreaseButtonTextComponents[i] = this.myValueDecreaseButtonTexts[i].pp_addComponent(TextComponent);
            this._setupTextComponent(this.myValueDecreaseButtonTextComponents[i]);
            this.myValueDecreaseButtonTextComponents[i].text = this._mySetup.myDecreaseButtonText;

            this.myValueDecreaseButtonCursorTargetComponents[i] = this.myValueDecreaseButtonCursorTargets[i].pp_addComponent(CursorTarget);
            this.myValueDecreaseButtonCollisionComponents[i] = this.myValueDecreaseButtonCursorTargets[i].pp_addComponent(CollisionComponent);
            this.myValueDecreaseButtonCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myValueDecreaseButtonCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myValueDecreaseButtonCollisionComponents[i].extents = this._mySetup.mySideButtonCollisionExtents;
        }

        this.myStepTextComponent = this.myStepText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myStepTextComponent);
        this.myStepTextComponent.text = " ";

        this.myStepCursorTargetComponent = this.myStepCursorTarget.pp_addComponent(CursorTarget);
        this.myStepCollisionComponent = this.myStepCursorTarget.pp_addComponent(CollisionComponent);
        this.myStepCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myStepCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myStepCollisionComponent.extents = this._mySetup.myStepCollisionExtents;

        //Increase/Decrease
        this.myStepIncreaseButtonBackgroundComponent = this.myStepIncreaseButtonBackground.pp_addComponent(MeshComponent);
        this.myStepIncreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myStepIncreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myStepIncreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myStepIncreaseButtonTextComponent = this.myStepIncreaseButtonText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myStepIncreaseButtonTextComponent);
        this.myStepIncreaseButtonTextComponent.text = this._mySetup.myIncreaseButtonText;

        this.myStepIncreaseButtonCursorTargetComponent = this.myStepIncreaseButtonCursorTarget.pp_addComponent(CursorTarget);
        this.myStepIncreaseButtonCollisionComponent = this.myStepIncreaseButtonCursorTarget.pp_addComponent(CollisionComponent);
        this.myStepIncreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myStepIncreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myStepIncreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        this.myStepDecreaseButtonBackgroundComponent = this.myStepDecreaseButtonBackground.pp_addComponent(MeshComponent);
        this.myStepDecreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myStepDecreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myStepDecreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myStepDecreaseButtonTextComponent = this.myStepDecreaseButtonText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myStepDecreaseButtonTextComponent);
        this.myStepDecreaseButtonTextComponent.text = this._mySetup.myDecreaseButtonText;

        this.myStepDecreaseButtonCursorTargetComponent = this.myStepDecreaseButtonCursorTarget.pp_addComponent(CursorTarget);
        this.myStepDecreaseButtonCollisionComponent = this.myStepDecreaseButtonCursorTarget.pp_addComponent(CollisionComponent);
        this.myStepDecreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myStepDecreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myStepDecreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;
    }

    _setVisibleHook(visible) {
        if (visible) {
            this.setAdditionalButtonsActive(this._myAdditionalButtonsActive);
        }
    }
};