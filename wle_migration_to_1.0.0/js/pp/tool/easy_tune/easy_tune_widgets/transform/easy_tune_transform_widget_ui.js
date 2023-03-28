import { CollisionComponent, MeshComponent, TextComponent } from "@wonderlandengine/api";
import { CursorTarget } from "@wonderlandengine/components";
import { EasyTuneBaseWidgetUI } from "../base/easy_tune_base_widget_ui";

export class EasyTuneTransformWidgetUI extends EasyTuneBaseWidgetUI {

    constructor(engine) {
        super(engine);
    }

    setAdditionalButtonsActive(active) {
        this._myAdditionalButtonsActive = active;

        for (let i = 0; i < 3; i++) {
            this.myPositionIncreaseButtonPanels[i].pp_setActive(this._myAdditionalButtonsActive);
            this.myPositionDecreaseButtonPanels[i].pp_setActive(this._myAdditionalButtonsActive);
        }
        this.myPositionStepIncreaseButtonPanel.pp_setActive(this._myAdditionalButtonsActive);
        this.myPositionStepDecreaseButtonPanel.pp_setActive(this._myAdditionalButtonsActive);

        for (let i = 0; i < 3; i++) {
            this.myRotationIncreaseButtonPanels[i].pp_setActive(this._myAdditionalButtonsActive);
            this.myRotationDecreaseButtonPanels[i].pp_setActive(this._myAdditionalButtonsActive);
        }
        this.myRotationStepIncreaseButtonPanel.pp_setActive(this._myAdditionalButtonsActive);
        this.myRotationStepDecreaseButtonPanel.pp_setActive(this._myAdditionalButtonsActive);

        for (let i = 0; i < 3; i++) {
            this.myScaleIncreaseButtonPanels[i].pp_setActive(this._myAdditionalButtonsActive);
            this.myScaleDecreaseButtonPanels[i].pp_setActive(this._myAdditionalButtonsActive);
        }
        this.myScaleStepIncreaseButtonPanel.pp_setActive(this._myAdditionalButtonsActive);
        this.myScaleStepDecreaseButtonPanel.pp_setActive(this._myAdditionalButtonsActive);
    }

    _buildHook() {
        this._myAdditionalButtonsActive = true;
    }

    _createSkeletonHook() {
        // Position

        this.myPositionPanel = this.myDisplayPanel.pp_addObject();
        this.myPositionLabelText = this.myPositionPanel.pp_addObject();
        this.myPositionLabelCursorTarget = this.myPositionPanel.pp_addObject();

        this.myPositionPanels = [];
        this.myPositionTexts = [];
        this.myPositionCursorTargets = [];

        this.myPositionIncreaseButtonPanels = [];
        this.myPositionIncreaseButtonBackgrounds = [];
        this.myPositionIncreaseButtonTexts = [];
        this.myPositionIncreaseButtonCursorTargets = [];

        this.myPositionDecreaseButtonPanels = [];
        this.myPositionDecreaseButtonBackgrounds = [];
        this.myPositionDecreaseButtonTexts = [];
        this.myPositionDecreaseButtonCursorTargets = [];

        for (let i = 0; i < 3; i++) {
            this.myPositionPanels[i] = this.myPositionPanel.pp_addObject();
            this.myPositionTexts[i] = this.myPositionPanels[i].pp_addObject();
            this.myPositionCursorTargets[i] = this.myPositionPanels[i].pp_addObject();

            this.myPositionIncreaseButtonPanels[i] = this.myPositionPanels[i].pp_addObject();
            this.myPositionIncreaseButtonBackgrounds[i] = this.myPositionIncreaseButtonPanels[i].pp_addObject();
            this.myPositionIncreaseButtonTexts[i] = this.myPositionIncreaseButtonPanels[i].pp_addObject();
            this.myPositionIncreaseButtonCursorTargets[i] = this.myPositionIncreaseButtonPanels[i].pp_addObject();

            this.myPositionDecreaseButtonPanels[i] = this.myPositionPanels[i].pp_addObject();
            this.myPositionDecreaseButtonBackgrounds[i] = this.myPositionDecreaseButtonPanels[i].pp_addObject();
            this.myPositionDecreaseButtonTexts[i] = this.myPositionDecreaseButtonPanels[i].pp_addObject();
            this.myPositionDecreaseButtonCursorTargets[i] = this.myPositionDecreaseButtonPanels[i].pp_addObject();
        }

        // Rotation

        this.myRotationPanel = this.myDisplayPanel.pp_addObject();
        this.myRotationLabelText = this.myRotationPanel.pp_addObject();
        this.myRotationLabelCursorTarget = this.myRotationPanel.pp_addObject();

        this.myRotationPanels = [];
        this.myRotationTexts = [];
        this.myRotationCursorTargets = [];

        this.myRotationIncreaseButtonPanels = [];
        this.myRotationIncreaseButtonBackgrounds = [];
        this.myRotationIncreaseButtonTexts = [];
        this.myRotationIncreaseButtonCursorTargets = [];

        this.myRotationDecreaseButtonPanels = [];
        this.myRotationDecreaseButtonBackgrounds = [];
        this.myRotationDecreaseButtonTexts = [];
        this.myRotationDecreaseButtonCursorTargets = [];

        for (let i = 0; i < 3; i++) {
            this.myRotationPanels[i] = this.myRotationPanel.pp_addObject();
            this.myRotationTexts[i] = this.myRotationPanels[i].pp_addObject();
            this.myRotationCursorTargets[i] = this.myRotationPanels[i].pp_addObject();

            this.myRotationIncreaseButtonPanels[i] = this.myRotationPanels[i].pp_addObject();
            this.myRotationIncreaseButtonBackgrounds[i] = this.myRotationIncreaseButtonPanels[i].pp_addObject();
            this.myRotationIncreaseButtonTexts[i] = this.myRotationIncreaseButtonPanels[i].pp_addObject();
            this.myRotationIncreaseButtonCursorTargets[i] = this.myRotationIncreaseButtonPanels[i].pp_addObject();

            this.myRotationDecreaseButtonPanels[i] = this.myRotationPanels[i].pp_addObject();
            this.myRotationDecreaseButtonBackgrounds[i] = this.myRotationDecreaseButtonPanels[i].pp_addObject();
            this.myRotationDecreaseButtonTexts[i] = this.myRotationDecreaseButtonPanels[i].pp_addObject();
            this.myRotationDecreaseButtonCursorTargets[i] = this.myRotationDecreaseButtonPanels[i].pp_addObject();
        }

        // Scale

        this.myScalePanel = this.myDisplayPanel.pp_addObject();
        this.myScaleLabelText = this.myScalePanel.pp_addObject();
        this.myScaleLabelCursorTarget = this.myScalePanel.pp_addObject();

        this.myScalePanels = [];
        this.myScaleTexts = [];
        this.myScaleCursorTargets = [];

        this.myScaleIncreaseButtonPanels = [];
        this.myScaleIncreaseButtonBackgrounds = [];
        this.myScaleIncreaseButtonTexts = [];
        this.myScaleIncreaseButtonCursorTargets = [];

        this.myScaleDecreaseButtonPanels = [];
        this.myScaleDecreaseButtonBackgrounds = [];
        this.myScaleDecreaseButtonTexts = [];
        this.myScaleDecreaseButtonCursorTargets = [];

        for (let i = 0; i < 3; i++) {
            this.myScalePanels[i] = this.myScalePanel.pp_addObject();
            this.myScaleTexts[i] = this.myScalePanels[i].pp_addObject();
            this.myScaleCursorTargets[i] = this.myScalePanels[i].pp_addObject();

            this.myScaleIncreaseButtonPanels[i] = this.myScalePanels[i].pp_addObject();
            this.myScaleIncreaseButtonBackgrounds[i] = this.myScaleIncreaseButtonPanels[i].pp_addObject();
            this.myScaleIncreaseButtonTexts[i] = this.myScaleIncreaseButtonPanels[i].pp_addObject();
            this.myScaleIncreaseButtonCursorTargets[i] = this.myScaleIncreaseButtonPanels[i].pp_addObject();

            this.myScaleDecreaseButtonPanels[i] = this.myScalePanels[i].pp_addObject();
            this.myScaleDecreaseButtonBackgrounds[i] = this.myScaleDecreaseButtonPanels[i].pp_addObject();
            this.myScaleDecreaseButtonTexts[i] = this.myScaleDecreaseButtonPanels[i].pp_addObject();
            this.myScaleDecreaseButtonCursorTargets[i] = this.myScaleDecreaseButtonPanels[i].pp_addObject();
        }

        // Steps

        // Position

        this.myPositionStepPanel = this.myPositionPanel.pp_addObject();
        this.myPositionStepText = this.myPositionStepPanel.pp_addObject();
        this.myPositionStepCursorTarget = this.myPositionStepPanel.pp_addObject();

        this.myPositionStepIncreaseButtonPanel = this.myPositionStepPanel.pp_addObject();
        this.myPositionStepIncreaseButtonBackground = this.myPositionStepIncreaseButtonPanel.pp_addObject();
        this.myPositionStepIncreaseButtonText = this.myPositionStepIncreaseButtonPanel.pp_addObject();
        this.myPositionStepIncreaseButtonCursorTarget = this.myPositionStepIncreaseButtonPanel.pp_addObject();

        this.myPositionStepDecreaseButtonPanel = this.myPositionStepPanel.pp_addObject();
        this.myPositionStepDecreaseButtonBackground = this.myPositionStepDecreaseButtonPanel.pp_addObject();
        this.myPositionStepDecreaseButtonText = this.myPositionStepDecreaseButtonPanel.pp_addObject();
        this.myPositionStepDecreaseButtonCursorTarget = this.myPositionStepDecreaseButtonPanel.pp_addObject();

        // Rotation

        this.myRotationStepPanel = this.myRotationPanel.pp_addObject();
        this.myRotationStepText = this.myRotationStepPanel.pp_addObject();
        this.myRotationStepCursorTarget = this.myRotationStepPanel.pp_addObject();

        this.myRotationStepIncreaseButtonPanel = this.myRotationStepPanel.pp_addObject();
        this.myRotationStepIncreaseButtonBackground = this.myRotationStepIncreaseButtonPanel.pp_addObject();
        this.myRotationStepIncreaseButtonText = this.myRotationStepIncreaseButtonPanel.pp_addObject();
        this.myRotationStepIncreaseButtonCursorTarget = this.myRotationStepIncreaseButtonPanel.pp_addObject();

        this.myRotationStepDecreaseButtonPanel = this.myRotationStepPanel.pp_addObject();
        this.myRotationStepDecreaseButtonBackground = this.myRotationStepDecreaseButtonPanel.pp_addObject();
        this.myRotationStepDecreaseButtonText = this.myRotationStepDecreaseButtonPanel.pp_addObject();
        this.myRotationStepDecreaseButtonCursorTarget = this.myRotationStepDecreaseButtonPanel.pp_addObject();

        // Scale

        this.myScaleStepPanel = this.myScalePanel.pp_addObject();
        this.myScaleStepText = this.myScaleStepPanel.pp_addObject();
        this.myScaleStepCursorTarget = this.myScaleStepPanel.pp_addObject();

        this.myScaleStepIncreaseButtonPanel = this.myScaleStepPanel.pp_addObject();
        this.myScaleStepIncreaseButtonBackground = this.myScaleStepIncreaseButtonPanel.pp_addObject();
        this.myScaleStepIncreaseButtonText = this.myScaleStepIncreaseButtonPanel.pp_addObject();
        this.myScaleStepIncreaseButtonCursorTarget = this.myScaleStepIncreaseButtonPanel.pp_addObject();

        this.myScaleStepDecreaseButtonPanel = this.myScaleStepPanel.pp_addObject();
        this.myScaleStepDecreaseButtonBackground = this.myScaleStepDecreaseButtonPanel.pp_addObject();
        this.myScaleStepDecreaseButtonText = this.myScaleStepDecreaseButtonPanel.pp_addObject();
        this.myScaleStepDecreaseButtonCursorTarget = this.myScaleStepDecreaseButtonPanel.pp_addObject();
    }

    _setTransformHook() {
        //Position

        this.myPositionPanel.setTranslationLocal(this._mySetup.myPositionPanelPosition);
        this.myPositionLabelText.pp_scaleObject(this._mySetup.myComponentLabelTextScale);
        this.myPositionLabelCursorTarget.setTranslationLocal(this._mySetup.myComponentLabelCursorTargetPosition);

        for (let i = 0; i < 3; i++) {
            this.myPositionPanels[i].setTranslationLocal(this._mySetup.myValuePanelsPositions[i]);
            this.myPositionTexts[i].pp_scaleObject(this._mySetup.myValueTextScale);
            this.myPositionCursorTargets[i].setTranslationLocal(this._mySetup.myValueCursorTargetPosition);

            this.myPositionIncreaseButtonPanels[i].setTranslationLocal(this._mySetup.myIncreaseButtonPosition);
            this.myPositionIncreaseButtonBackgrounds[i].pp_scaleObject(this._mySetup.mySideButtonBackgroundScale);
            this.myPositionIncreaseButtonTexts[i].setTranslationLocal(this._mySetup.mySideButtonTextPosition);
            this.myPositionIncreaseButtonTexts[i].pp_scaleObject(this._mySetup.mySideButtonTextScale);
            this.myPositionIncreaseButtonCursorTargets[i].setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

            this.myPositionDecreaseButtonPanels[i].setTranslationLocal(this._mySetup.myDecreaseButtonPosition);
            this.myPositionDecreaseButtonBackgrounds[i].pp_scaleObject(this._mySetup.mySideButtonBackgroundScale);
            this.myPositionDecreaseButtonTexts[i].setTranslationLocal(this._mySetup.mySideButtonTextPosition);
            this.myPositionDecreaseButtonTexts[i].pp_scaleObject(this._mySetup.mySideButtonTextScale);
            this.myPositionDecreaseButtonCursorTargets[i].setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);
        }

        // Rotation

        this.myRotationPanel.setTranslationLocal(this._mySetup.myRotationPanelPosition);
        this.myRotationLabelText.pp_scaleObject(this._mySetup.myComponentLabelTextScale);
        this.myRotationLabelCursorTarget.setTranslationLocal(this._mySetup.myComponentLabelCursorTargetPosition);

        for (let i = 0; i < 3; i++) {
            this.myRotationPanels[i].setTranslationLocal(this._mySetup.myValuePanelsPositions[i]);
            this.myRotationTexts[i].pp_scaleObject(this._mySetup.myValueTextScale);
            this.myRotationCursorTargets[i].setTranslationLocal(this._mySetup.myValueCursorTargetPosition);

            this.myRotationIncreaseButtonPanels[i].setTranslationLocal(this._mySetup.myIncreaseButtonPosition);
            this.myRotationIncreaseButtonBackgrounds[i].pp_scaleObject(this._mySetup.mySideButtonBackgroundScale);
            this.myRotationIncreaseButtonTexts[i].setTranslationLocal(this._mySetup.mySideButtonTextPosition);
            this.myRotationIncreaseButtonTexts[i].pp_scaleObject(this._mySetup.mySideButtonTextScale);
            this.myRotationIncreaseButtonCursorTargets[i].setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

            this.myRotationDecreaseButtonPanels[i].setTranslationLocal(this._mySetup.myDecreaseButtonPosition);
            this.myRotationDecreaseButtonBackgrounds[i].pp_scaleObject(this._mySetup.mySideButtonBackgroundScale);
            this.myRotationDecreaseButtonTexts[i].setTranslationLocal(this._mySetup.mySideButtonTextPosition);
            this.myRotationDecreaseButtonTexts[i].pp_scaleObject(this._mySetup.mySideButtonTextScale);
            this.myRotationDecreaseButtonCursorTargets[i].setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);
        }

        // Scale

        this.myScalePanel.setTranslationLocal(this._mySetup.myScalePanelPosition);
        this.myScaleLabelText.pp_scaleObject(this._mySetup.myComponentLabelTextScale);
        this.myScaleLabelCursorTarget.setTranslationLocal(this._mySetup.myComponentLabelCursorTargetPosition);

        for (let i = 0; i < 3; i++) {
            this.myScalePanels[i].setTranslationLocal(this._mySetup.myValuePanelsPositions[i]);
            this.myScaleTexts[i].pp_scaleObject(this._mySetup.myValueTextScale);
            this.myScaleCursorTargets[i].setTranslationLocal(this._mySetup.myValueCursorTargetPosition);

            this.myScaleIncreaseButtonPanels[i].setTranslationLocal(this._mySetup.myIncreaseButtonPosition);
            this.myScaleIncreaseButtonBackgrounds[i].pp_scaleObject(this._mySetup.mySideButtonBackgroundScale);
            this.myScaleIncreaseButtonTexts[i].setTranslationLocal(this._mySetup.mySideButtonTextPosition);
            this.myScaleIncreaseButtonTexts[i].pp_scaleObject(this._mySetup.mySideButtonTextScale);
            this.myScaleIncreaseButtonCursorTargets[i].setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

            this.myScaleDecreaseButtonPanels[i].setTranslationLocal(this._mySetup.myDecreaseButtonPosition);
            this.myScaleDecreaseButtonBackgrounds[i].pp_scaleObject(this._mySetup.mySideButtonBackgroundScale);
            this.myScaleDecreaseButtonTexts[i].setTranslationLocal(this._mySetup.mySideButtonTextPosition);
            this.myScaleDecreaseButtonTexts[i].pp_scaleObject(this._mySetup.mySideButtonTextScale);
            this.myScaleDecreaseButtonCursorTargets[i].setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);
        }

        // Steps

        // Position

        this.myPositionStepPanel.setTranslationLocal(this._mySetup.myStepPanelPosition);
        this.myPositionStepText.pp_scaleObject(this._mySetup.myStepTextScale);
        this.myPositionStepCursorTarget.setTranslationLocal(this._mySetup.myStepCursorTargetPosition);

        this.myPositionStepIncreaseButtonPanel.setTranslationLocal(this._mySetup.myIncreaseButtonPosition);
        this.myPositionStepIncreaseButtonBackground.pp_scaleObject(this._mySetup.mySideButtonBackgroundScale);
        this.myPositionStepIncreaseButtonText.setTranslationLocal(this._mySetup.mySideButtonTextPosition);
        this.myPositionStepIncreaseButtonText.pp_scaleObject(this._mySetup.mySideButtonTextScale);
        this.myPositionStepIncreaseButtonCursorTarget.setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

        this.myPositionStepDecreaseButtonPanel.setTranslationLocal(this._mySetup.myDecreaseButtonPosition);
        this.myPositionStepDecreaseButtonBackground.pp_scaleObject(this._mySetup.mySideButtonBackgroundScale);
        this.myPositionStepDecreaseButtonText.setTranslationLocal(this._mySetup.mySideButtonTextPosition);
        this.myPositionStepDecreaseButtonText.pp_scaleObject(this._mySetup.mySideButtonTextScale);
        this.myPositionStepDecreaseButtonCursorTarget.setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

        // Rotation

        this.myRotationStepPanel.setTranslationLocal(this._mySetup.myStepPanelPosition);
        this.myRotationStepText.pp_scaleObject(this._mySetup.myStepTextScale);
        this.myRotationStepCursorTarget.setTranslationLocal(this._mySetup.myStepCursorTargetPosition);

        this.myRotationStepIncreaseButtonPanel.setTranslationLocal(this._mySetup.myIncreaseButtonPosition);
        this.myRotationStepIncreaseButtonBackground.pp_scaleObject(this._mySetup.mySideButtonBackgroundScale);
        this.myRotationStepIncreaseButtonText.setTranslationLocal(this._mySetup.mySideButtonTextPosition);
        this.myRotationStepIncreaseButtonText.pp_scaleObject(this._mySetup.mySideButtonTextScale);
        this.myRotationStepIncreaseButtonCursorTarget.setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

        this.myRotationStepDecreaseButtonPanel.setTranslationLocal(this._mySetup.myDecreaseButtonPosition);
        this.myRotationStepDecreaseButtonBackground.pp_scaleObject(this._mySetup.mySideButtonBackgroundScale);
        this.myRotationStepDecreaseButtonText.setTranslationLocal(this._mySetup.mySideButtonTextPosition);
        this.myRotationStepDecreaseButtonText.pp_scaleObject(this._mySetup.mySideButtonTextScale);
        this.myRotationStepDecreaseButtonCursorTarget.setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

        // Scale

        this.myScaleStepPanel.setTranslationLocal(this._mySetup.myStepPanelPosition);
        this.myScaleStepText.pp_scaleObject(this._mySetup.myStepTextScale);
        this.myScaleStepCursorTarget.setTranslationLocal(this._mySetup.myStepCursorTargetPosition);

        this.myScaleStepIncreaseButtonPanel.setTranslationLocal(this._mySetup.myIncreaseButtonPosition);
        this.myScaleStepIncreaseButtonBackground.pp_scaleObject(this._mySetup.mySideButtonBackgroundScale);
        this.myScaleStepIncreaseButtonText.setTranslationLocal(this._mySetup.mySideButtonTextPosition);
        this.myScaleStepIncreaseButtonText.pp_scaleObject(this._mySetup.mySideButtonTextScale);
        this.myScaleStepIncreaseButtonCursorTarget.setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

        this.myScaleStepDecreaseButtonPanel.setTranslationLocal(this._mySetup.myDecreaseButtonPosition);
        this.myScaleStepDecreaseButtonBackground.pp_scaleObject(this._mySetup.mySideButtonBackgroundScale);
        this.myScaleStepDecreaseButtonText.setTranslationLocal(this._mySetup.mySideButtonTextPosition);
        this.myScaleStepDecreaseButtonText.pp_scaleObject(this._mySetup.mySideButtonTextScale);
        this.myScaleStepDecreaseButtonCursorTarget.setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);
    }

    _addComponentsHook() {
        // Position

        this.myPositionLabelTextComponent = this.myPositionLabelText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myPositionLabelTextComponent);
        this.myPositionLabelTextComponent.text = this._mySetup.myPositionText;

        this.myPositionLabelCursorTargetComponent = this.myPositionLabelCursorTarget.pp_addComponent(CursorTarget);
        this.myPositionLabelCollisionComponent = this.myPositionLabelCursorTarget.pp_addComponent(CollisionComponent);
        this.myPositionLabelCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myPositionLabelCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myPositionLabelCollisionComponent.extents = this._mySetup.myComponentLabelCollisionExtents;

        this.myPositionTextComponents = [];
        this.myPositionCursorTargetComponents = [];
        this.myPositionCollisionComponents = [];

        this.myPositionIncreaseButtonBackgroundComponents = [];
        this.myPositionIncreaseButtonTextComponents = [];
        this.myPositionIncreaseButtonCursorTargetComponents = [];
        this.myPositionIncreaseButtonCollisionComponents = [];

        this.myPositionDecreaseButtonBackgroundComponents = [];
        this.myPositionDecreaseButtonTextComponents = [];
        this.myPositionDecreaseButtonCursorTargetComponents = [];
        this.myPositionDecreaseButtonCollisionComponents = [];

        for (let i = 0; i < 3; i++) {
            this.myPositionTextComponents[i] = this.myPositionTexts[i].pp_addComponent(TextComponent);
            this._setupTextComponent(this.myPositionTextComponents[i]);
            this.myPositionTextComponents[i].text = " ";

            this.myPositionCursorTargetComponents[i] = this.myPositionCursorTargets[i].pp_addComponent(CursorTarget);
            this.myPositionCollisionComponents[i] = this.myPositionCursorTargets[i].pp_addComponent(CollisionComponent);
            this.myPositionCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myPositionCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myPositionCollisionComponents[i].extents = this._mySetup.myValueCollisionExtents;

            this.myPositionIncreaseButtonBackgroundComponents[i] = this.myPositionIncreaseButtonBackgrounds[i].pp_addComponent(MeshComponent);
            this.myPositionIncreaseButtonBackgroundComponents[i].mesh = this._myPlaneMesh;
            this.myPositionIncreaseButtonBackgroundComponents[i].material = this._myAdditionalSetup.myPlaneMaterial.clone();
            this.myPositionIncreaseButtonBackgroundComponents[i].material.color = this._mySetup.myBackgroundColor;

            this.myPositionIncreaseButtonTextComponents[i] = this.myPositionIncreaseButtonTexts[i].pp_addComponent(TextComponent);
            this._setupTextComponent(this.myPositionIncreaseButtonTextComponents[i]);
            this.myPositionIncreaseButtonTextComponents[i].text = this._mySetup.myIncreaseButtonText;

            this.myPositionIncreaseButtonCursorTargetComponents[i] = this.myPositionIncreaseButtonCursorTargets[i].pp_addComponent(CursorTarget);
            this.myPositionIncreaseButtonCollisionComponents[i] = this.myPositionIncreaseButtonCursorTargets[i].pp_addComponent(CollisionComponent);
            this.myPositionIncreaseButtonCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myPositionIncreaseButtonCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myPositionIncreaseButtonCollisionComponents[i].extents = this._mySetup.mySideButtonCollisionExtents;

            this.myPositionDecreaseButtonBackgroundComponents[i] = this.myPositionDecreaseButtonBackgrounds[i].pp_addComponent(MeshComponent);
            this.myPositionDecreaseButtonBackgroundComponents[i].mesh = this._myPlaneMesh;
            this.myPositionDecreaseButtonBackgroundComponents[i].material = this._myAdditionalSetup.myPlaneMaterial.clone();
            this.myPositionDecreaseButtonBackgroundComponents[i].material.color = this._mySetup.myBackgroundColor;

            this.myPositionDecreaseButtonTextComponents[i] = this.myPositionDecreaseButtonTexts[i].pp_addComponent(TextComponent);
            this._setupTextComponent(this.myPositionDecreaseButtonTextComponents[i]);
            this.myPositionDecreaseButtonTextComponents[i].text = this._mySetup.myDecreaseButtonText;

            this.myPositionDecreaseButtonCursorTargetComponents[i] = this.myPositionDecreaseButtonCursorTargets[i].pp_addComponent(CursorTarget);
            this.myPositionDecreaseButtonCollisionComponents[i] = this.myPositionDecreaseButtonCursorTargets[i].pp_addComponent(CollisionComponent);
            this.myPositionDecreaseButtonCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myPositionDecreaseButtonCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myPositionDecreaseButtonCollisionComponents[i].extents = this._mySetup.mySideButtonCollisionExtents;
        }

        // Rotation

        this.myRotationLabelTextComponent = this.myRotationLabelText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myRotationLabelTextComponent);
        this.myRotationLabelTextComponent.text = this._mySetup.myRotationText;

        this.myRotationLabelCursorTargetComponent = this.myRotationLabelCursorTarget.pp_addComponent(CursorTarget);
        this.myRotationLabelCollisionComponent = this.myRotationLabelCursorTarget.pp_addComponent(CollisionComponent);
        this.myRotationLabelCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myRotationLabelCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myRotationLabelCollisionComponent.extents = this._mySetup.myComponentLabelCollisionExtents;

        this.myRotationTextComponents = [];
        this.myRotationCursorTargetComponents = [];
        this.myRotationCollisionComponents = [];

        this.myRotationIncreaseButtonBackgroundComponents = [];
        this.myRotationIncreaseButtonTextComponents = [];
        this.myRotationIncreaseButtonCursorTargetComponents = [];
        this.myRotationIncreaseButtonCollisionComponents = [];

        this.myRotationDecreaseButtonBackgroundComponents = [];
        this.myRotationDecreaseButtonTextComponents = [];
        this.myRotationDecreaseButtonCursorTargetComponents = [];
        this.myRotationDecreaseButtonCollisionComponents = [];

        for (let i = 0; i < 3; i++) {
            this.myRotationTextComponents[i] = this.myRotationTexts[i].pp_addComponent(TextComponent);
            this._setupTextComponent(this.myRotationTextComponents[i]);
            this.myRotationTextComponents[i].text = " ";

            this.myRotationCursorTargetComponents[i] = this.myRotationCursorTargets[i].pp_addComponent(CursorTarget);
            this.myRotationCollisionComponents[i] = this.myRotationCursorTargets[i].pp_addComponent(CollisionComponent);
            this.myRotationCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myRotationCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myRotationCollisionComponents[i].extents = this._mySetup.myValueCollisionExtents;

            this.myRotationIncreaseButtonBackgroundComponents[i] = this.myRotationIncreaseButtonBackgrounds[i].pp_addComponent(MeshComponent);
            this.myRotationIncreaseButtonBackgroundComponents[i].mesh = this._myPlaneMesh;
            this.myRotationIncreaseButtonBackgroundComponents[i].material = this._myAdditionalSetup.myPlaneMaterial.clone();
            this.myRotationIncreaseButtonBackgroundComponents[i].material.color = this._mySetup.myBackgroundColor;

            this.myRotationIncreaseButtonTextComponents[i] = this.myRotationIncreaseButtonTexts[i].pp_addComponent(TextComponent);
            this._setupTextComponent(this.myRotationIncreaseButtonTextComponents[i]);
            this.myRotationIncreaseButtonTextComponents[i].text = this._mySetup.myIncreaseButtonText;

            this.myRotationIncreaseButtonCursorTargetComponents[i] = this.myRotationIncreaseButtonCursorTargets[i].pp_addComponent(CursorTarget);
            this.myRotationIncreaseButtonCollisionComponents[i] = this.myRotationIncreaseButtonCursorTargets[i].pp_addComponent(CollisionComponent);
            this.myRotationIncreaseButtonCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myRotationIncreaseButtonCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myRotationIncreaseButtonCollisionComponents[i].extents = this._mySetup.mySideButtonCollisionExtents;

            this.myRotationDecreaseButtonBackgroundComponents[i] = this.myRotationDecreaseButtonBackgrounds[i].pp_addComponent(MeshComponent);
            this.myRotationDecreaseButtonBackgroundComponents[i].mesh = this._myPlaneMesh;
            this.myRotationDecreaseButtonBackgroundComponents[i].material = this._myAdditionalSetup.myPlaneMaterial.clone();
            this.myRotationDecreaseButtonBackgroundComponents[i].material.color = this._mySetup.myBackgroundColor;

            this.myRotationDecreaseButtonTextComponents[i] = this.myRotationDecreaseButtonTexts[i].pp_addComponent(TextComponent);
            this._setupTextComponent(this.myRotationDecreaseButtonTextComponents[i]);
            this.myRotationDecreaseButtonTextComponents[i].text = this._mySetup.myDecreaseButtonText;

            this.myRotationDecreaseButtonCursorTargetComponents[i] = this.myRotationDecreaseButtonCursorTargets[i].pp_addComponent(CursorTarget);
            this.myRotationDecreaseButtonCollisionComponents[i] = this.myRotationDecreaseButtonCursorTargets[i].pp_addComponent(CollisionComponent);
            this.myRotationDecreaseButtonCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myRotationDecreaseButtonCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myRotationDecreaseButtonCollisionComponents[i].extents = this._mySetup.mySideButtonCollisionExtents;
        }

        // Scale

        this.myScaleLabelTextComponent = this.myScaleLabelText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myScaleLabelTextComponent);
        this.myScaleLabelTextComponent.text = this._mySetup.myScaleText;

        this.myScaleLabelCursorTargetComponent = this.myScaleLabelCursorTarget.pp_addComponent(CursorTarget);
        this.myScaleLabelCollisionComponent = this.myScaleLabelCursorTarget.pp_addComponent(CollisionComponent);
        this.myScaleLabelCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myScaleLabelCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myScaleLabelCollisionComponent.extents = this._mySetup.myComponentLabelCollisionExtents;

        this.myScaleTextComponents = [];
        this.myScaleCursorTargetComponents = [];
        this.myScaleCollisionComponents = [];

        this.myScaleIncreaseButtonBackgroundComponents = [];
        this.myScaleIncreaseButtonTextComponents = [];
        this.myScaleIncreaseButtonCursorTargetComponents = [];
        this.myScaleIncreaseButtonCollisionComponents = [];

        this.myScaleDecreaseButtonBackgroundComponents = [];
        this.myScaleDecreaseButtonTextComponents = [];
        this.myScaleDecreaseButtonCursorTargetComponents = [];
        this.myScaleDecreaseButtonCollisionComponents = [];

        for (let i = 0; i < 3; i++) {
            this.myScaleTextComponents[i] = this.myScaleTexts[i].pp_addComponent(TextComponent);
            this._setupTextComponent(this.myScaleTextComponents[i]);
            this.myScaleTextComponents[i].text = " ";

            this.myScaleCursorTargetComponents[i] = this.myScaleCursorTargets[i].pp_addComponent(CursorTarget);
            this.myScaleCollisionComponents[i] = this.myScaleCursorTargets[i].pp_addComponent(CollisionComponent);
            this.myScaleCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myScaleCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myScaleCollisionComponents[i].extents = this._mySetup.myValueCollisionExtents;

            this.myScaleIncreaseButtonBackgroundComponents[i] = this.myScaleIncreaseButtonBackgrounds[i].pp_addComponent(MeshComponent);
            this.myScaleIncreaseButtonBackgroundComponents[i].mesh = this._myPlaneMesh;
            this.myScaleIncreaseButtonBackgroundComponents[i].material = this._myAdditionalSetup.myPlaneMaterial.clone();
            this.myScaleIncreaseButtonBackgroundComponents[i].material.color = this._mySetup.myBackgroundColor;

            this.myScaleIncreaseButtonTextComponents[i] = this.myScaleIncreaseButtonTexts[i].pp_addComponent(TextComponent);
            this._setupTextComponent(this.myScaleIncreaseButtonTextComponents[i]);
            this.myScaleIncreaseButtonTextComponents[i].text = this._mySetup.myIncreaseButtonText;

            this.myScaleIncreaseButtonCursorTargetComponents[i] = this.myScaleIncreaseButtonCursorTargets[i].pp_addComponent(CursorTarget);
            this.myScaleIncreaseButtonCollisionComponents[i] = this.myScaleIncreaseButtonCursorTargets[i].pp_addComponent(CollisionComponent);
            this.myScaleIncreaseButtonCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myScaleIncreaseButtonCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myScaleIncreaseButtonCollisionComponents[i].extents = this._mySetup.mySideButtonCollisionExtents;

            this.myScaleDecreaseButtonBackgroundComponents[i] = this.myScaleDecreaseButtonBackgrounds[i].pp_addComponent(MeshComponent);
            this.myScaleDecreaseButtonBackgroundComponents[i].mesh = this._myPlaneMesh;
            this.myScaleDecreaseButtonBackgroundComponents[i].material = this._myAdditionalSetup.myPlaneMaterial.clone();
            this.myScaleDecreaseButtonBackgroundComponents[i].material.color = this._mySetup.myBackgroundColor;

            this.myScaleDecreaseButtonTextComponents[i] = this.myScaleDecreaseButtonTexts[i].pp_addComponent(TextComponent);
            this._setupTextComponent(this.myScaleDecreaseButtonTextComponents[i]);
            this.myScaleDecreaseButtonTextComponents[i].text = this._mySetup.myDecreaseButtonText;

            this.myScaleDecreaseButtonCursorTargetComponents[i] = this.myScaleDecreaseButtonCursorTargets[i].pp_addComponent(CursorTarget);
            this.myScaleDecreaseButtonCollisionComponents[i] = this.myScaleDecreaseButtonCursorTargets[i].pp_addComponent(CollisionComponent);
            this.myScaleDecreaseButtonCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myScaleDecreaseButtonCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myScaleDecreaseButtonCollisionComponents[i].extents = this._mySetup.mySideButtonCollisionExtents;
        }

        // Steps

        // Position 
        this.myPositionStepTextComponent = this.myPositionStepText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myPositionStepTextComponent);
        this.myPositionStepTextComponent.text = " ";

        this.myPositionStepCursorTargetComponent = this.myPositionStepCursorTarget.pp_addComponent(CursorTarget);
        this.myPositionStepCollisionComponent = this.myPositionStepCursorTarget.pp_addComponent(CollisionComponent);
        this.myPositionStepCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myPositionStepCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myPositionStepCollisionComponent.extents = this._mySetup.myStepCollisionExtents;

        this.myPositionStepIncreaseButtonBackgroundComponent = this.myPositionStepIncreaseButtonBackground.pp_addComponent(MeshComponent);
        this.myPositionStepIncreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myPositionStepIncreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myPositionStepIncreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myPositionStepIncreaseButtonTextComponent = this.myPositionStepIncreaseButtonText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myPositionStepIncreaseButtonTextComponent);
        this.myPositionStepIncreaseButtonTextComponent.text = this._mySetup.myIncreaseButtonText;

        this.myPositionStepIncreaseButtonCursorTargetComponent = this.myPositionStepIncreaseButtonCursorTarget.pp_addComponent(CursorTarget);
        this.myPositionStepIncreaseButtonCollisionComponent = this.myPositionStepIncreaseButtonCursorTarget.pp_addComponent(CollisionComponent);
        this.myPositionStepIncreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myPositionStepIncreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myPositionStepIncreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        this.myPositionStepDecreaseButtonBackgroundComponent = this.myPositionStepDecreaseButtonBackground.pp_addComponent(MeshComponent);
        this.myPositionStepDecreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myPositionStepDecreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myPositionStepDecreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myPositionStepDecreaseButtonTextComponent = this.myPositionStepDecreaseButtonText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myPositionStepDecreaseButtonTextComponent);
        this.myPositionStepDecreaseButtonTextComponent.text = this._mySetup.myDecreaseButtonText;

        this.myPositionStepDecreaseButtonCursorTargetComponent = this.myPositionStepDecreaseButtonCursorTarget.pp_addComponent(CursorTarget);
        this.myPositionStepDecreaseButtonCollisionComponent = this.myPositionStepDecreaseButtonCursorTarget.pp_addComponent(CollisionComponent);
        this.myPositionStepDecreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myPositionStepDecreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myPositionStepDecreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        // Rotation

        this.myRotationStepTextComponent = this.myRotationStepText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myRotationStepTextComponent);
        this.myRotationStepTextComponent.text = " ";

        this.myRotationStepCursorTargetComponent = this.myRotationStepCursorTarget.pp_addComponent(CursorTarget);
        this.myRotationStepCollisionComponent = this.myRotationStepCursorTarget.pp_addComponent(CollisionComponent);
        this.myRotationStepCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myRotationStepCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myRotationStepCollisionComponent.extents = this._mySetup.myStepCollisionExtents;

        this.myRotationStepIncreaseButtonBackgroundComponent = this.myRotationStepIncreaseButtonBackground.pp_addComponent(MeshComponent);
        this.myRotationStepIncreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myRotationStepIncreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myRotationStepIncreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myRotationStepIncreaseButtonTextComponent = this.myRotationStepIncreaseButtonText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myRotationStepIncreaseButtonTextComponent);
        this.myRotationStepIncreaseButtonTextComponent.text = this._mySetup.myIncreaseButtonText;

        this.myRotationStepIncreaseButtonCursorTargetComponent = this.myRotationStepIncreaseButtonCursorTarget.pp_addComponent(CursorTarget);
        this.myRotationStepIncreaseButtonCollisionComponent = this.myRotationStepIncreaseButtonCursorTarget.pp_addComponent(CollisionComponent);
        this.myRotationStepIncreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myRotationStepIncreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myRotationStepIncreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        this.myRotationStepDecreaseButtonBackgroundComponent = this.myRotationStepDecreaseButtonBackground.pp_addComponent(MeshComponent);
        this.myRotationStepDecreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myRotationStepDecreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myRotationStepDecreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myRotationStepDecreaseButtonTextComponent = this.myRotationStepDecreaseButtonText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myRotationStepDecreaseButtonTextComponent);
        this.myRotationStepDecreaseButtonTextComponent.text = this._mySetup.myDecreaseButtonText;

        this.myRotationStepDecreaseButtonCursorTargetComponent = this.myRotationStepDecreaseButtonCursorTarget.pp_addComponent(CursorTarget);
        this.myRotationStepDecreaseButtonCollisionComponent = this.myRotationStepDecreaseButtonCursorTarget.pp_addComponent(CollisionComponent);
        this.myRotationStepDecreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myRotationStepDecreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myRotationStepDecreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        // Scale

        this.myScaleStepTextComponent = this.myScaleStepText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myScaleStepTextComponent);
        this.myScaleStepTextComponent.text = " ";

        this.myScaleStepCursorTargetComponent = this.myScaleStepCursorTarget.pp_addComponent(CursorTarget);
        this.myScaleStepCollisionComponent = this.myScaleStepCursorTarget.pp_addComponent(CollisionComponent);
        this.myScaleStepCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myScaleStepCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myScaleStepCollisionComponent.extents = this._mySetup.myStepCollisionExtents;

        this.myScaleStepIncreaseButtonBackgroundComponent = this.myScaleStepIncreaseButtonBackground.pp_addComponent(MeshComponent);
        this.myScaleStepIncreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myScaleStepIncreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myScaleStepIncreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myScaleStepIncreaseButtonTextComponent = this.myScaleStepIncreaseButtonText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myScaleStepIncreaseButtonTextComponent);
        this.myScaleStepIncreaseButtonTextComponent.text = this._mySetup.myIncreaseButtonText;

        this.myScaleStepIncreaseButtonCursorTargetComponent = this.myScaleStepIncreaseButtonCursorTarget.pp_addComponent(CursorTarget);
        this.myScaleStepIncreaseButtonCollisionComponent = this.myScaleStepIncreaseButtonCursorTarget.pp_addComponent(CollisionComponent);
        this.myScaleStepIncreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myScaleStepIncreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myScaleStepIncreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        this.myScaleStepDecreaseButtonBackgroundComponent = this.myScaleStepDecreaseButtonBackground.pp_addComponent(MeshComponent);
        this.myScaleStepDecreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myScaleStepDecreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myScaleStepDecreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myScaleStepDecreaseButtonTextComponent = this.myScaleStepDecreaseButtonText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myScaleStepDecreaseButtonTextComponent);
        this.myScaleStepDecreaseButtonTextComponent.text = this._mySetup.myDecreaseButtonText;

        this.myScaleStepDecreaseButtonCursorTargetComponent = this.myScaleStepDecreaseButtonCursorTarget.pp_addComponent(CursorTarget);
        this.myScaleStepDecreaseButtonCollisionComponent = this.myScaleStepDecreaseButtonCursorTarget.pp_addComponent(CollisionComponent);
        this.myScaleStepDecreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myScaleStepDecreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myScaleStepDecreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;
    }

    _addStepComponents() {
        //Position
        this.myPositionStepTextComponent = this.myPositionStepText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myPositionStepTextComponent);
        this.myPositionStepTextComponent.text = " ";

        this.myPositionStepCursorTargetComponent = this.myPositionStepCursorTarget.pp_addComponent(CursorTarget);
        this.myPositionStepCollisionComponent = this.myPositionStepCursorTarget.pp_addComponent(CollisionComponent);
        this.myPositionStepCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myPositionStepCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myPositionStepCollisionComponent.extents = this._mySetup.myStepCollisionExtents;

        //Increase/Decrease
        this.myPositionStepIncreaseButtonBackgroundComponent = this.myPositionStepIncreaseButtonBackground.pp_addComponent(MeshComponent);
        this.myPositionStepIncreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myPositionStepIncreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myPositionStepIncreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myPositionStepIncreaseButtonTextComponent = this.myPositionStepIncreaseButtonText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myPositionStepIncreaseButtonTextComponent);
        this.myPositionStepIncreaseButtonTextComponent.text = this._mySetup.myIncreaseButtonText;

        this.myPositionStepIncreaseButtonCursorTargetComponent = this.myPositionStepIncreaseButtonCursorTarget.pp_addComponent(CursorTarget);
        this.myPositionStepIncreaseButtonCollisionComponent = this.myPositionStepIncreaseButtonCursorTarget.pp_addComponent(CollisionComponent);
        this.myPositionStepIncreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myPositionStepIncreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myPositionStepIncreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        this.myPositionStepDecreaseButtonBackgroundComponent = this.myPositionStepDecreaseButtonBackground.pp_addComponent(MeshComponent);
        this.myPositionStepDecreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myPositionStepDecreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myPositionStepDecreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myPositionStepDecreaseButtonTextComponent = this.myPositionStepDecreaseButtonText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myPositionStepDecreaseButtonTextComponent);
        this.myPositionStepDecreaseButtonTextComponent.text = this._mySetup.myDecreaseButtonText;

        this.myPositionStepDecreaseButtonCursorTargetComponent = this.myPositionStepDecreaseButtonCursorTarget.pp_addComponent(CursorTarget);
        this.myPositionStepDecreaseButtonCollisionComponent = this.myPositionStepDecreaseButtonCursorTarget.pp_addComponent(CollisionComponent);
        this.myPositionStepDecreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myPositionStepDecreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myPositionStepDecreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        //Rotation
        this.myRotationStepTextComponent = this.myRotationStepText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myRotationStepTextComponent);
        this.myRotationStepTextComponent.text = " ";

        this.myRotationStepCursorTargetComponent = this.myRotationStepCursorTarget.pp_addComponent(CursorTarget);
        this.myRotationStepCollisionComponent = this.myRotationStepCursorTarget.pp_addComponent(CollisionComponent);
        this.myRotationStepCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myRotationStepCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myRotationStepCollisionComponent.extents = this._mySetup.myStepCollisionExtents;

        //Increase/Decrease
        this.myRotationStepIncreaseButtonBackgroundComponent = this.myRotationStepIncreaseButtonBackground.pp_addComponent(MeshComponent);
        this.myRotationStepIncreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myRotationStepIncreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myRotationStepIncreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myRotationStepIncreaseButtonTextComponent = this.myRotationStepIncreaseButtonText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myRotationStepIncreaseButtonTextComponent);
        this.myRotationStepIncreaseButtonTextComponent.text = this._mySetup.myIncreaseButtonText;

        this.myRotationStepIncreaseButtonCursorTargetComponent = this.myRotationStepIncreaseButtonCursorTarget.pp_addComponent(CursorTarget);
        this.myRotationStepIncreaseButtonCollisionComponent = this.myRotationStepIncreaseButtonCursorTarget.pp_addComponent(CollisionComponent);
        this.myRotationStepIncreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myRotationStepIncreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myRotationStepIncreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        this.myRotationStepDecreaseButtonBackgroundComponent = this.myRotationStepDecreaseButtonBackground.pp_addComponent(MeshComponent);
        this.myRotationStepDecreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myRotationStepDecreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myRotationStepDecreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myRotationStepDecreaseButtonTextComponent = this.myRotationStepDecreaseButtonText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myRotationStepDecreaseButtonTextComponent);
        this.myRotationStepDecreaseButtonTextComponent.text = this._mySetup.myDecreaseButtonText;

        this.myRotationStepDecreaseButtonCursorTargetComponent = this.myRotationStepDecreaseButtonCursorTarget.pp_addComponent(CursorTarget);
        this.myRotationStepDecreaseButtonCollisionComponent = this.myRotationStepDecreaseButtonCursorTarget.pp_addComponent(CollisionComponent);
        this.myRotationStepDecreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myRotationStepDecreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myRotationStepDecreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        //Scale
        this.myScaleStepTextComponent = this.myScaleStepText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myScaleStepTextComponent);
        this.myScaleStepTextComponent.text = " ";

        this.myScaleStepCursorTargetComponent = this.myScaleStepCursorTarget.pp_addComponent(CursorTarget);
        this.myScaleStepCollisionComponent = this.myScaleStepCursorTarget.pp_addComponent(CollisionComponent);
        this.myScaleStepCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myScaleStepCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myScaleStepCollisionComponent.extents = this._mySetup.myStepCollisionExtents;

        //Increase/Decrease
        this.myScaleStepIncreaseButtonBackgroundComponent = this.myScaleStepIncreaseButtonBackground.pp_addComponent(MeshComponent);
        this.myScaleStepIncreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myScaleStepIncreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myScaleStepIncreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myScaleStepIncreaseButtonTextComponent = this.myScaleStepIncreaseButtonText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myScaleStepIncreaseButtonTextComponent);
        this.myScaleStepIncreaseButtonTextComponent.text = this._mySetup.myIncreaseButtonText;

        this.myScaleStepIncreaseButtonCursorTargetComponent = this.myScaleStepIncreaseButtonCursorTarget.pp_addComponent(CursorTarget);
        this.myScaleStepIncreaseButtonCollisionComponent = this.myScaleStepIncreaseButtonCursorTarget.pp_addComponent(CollisionComponent);
        this.myScaleStepIncreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myScaleStepIncreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myScaleStepIncreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        this.myScaleStepDecreaseButtonBackgroundComponent = this.myScaleStepDecreaseButtonBackground.pp_addComponent(MeshComponent);
        this.myScaleStepDecreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myScaleStepDecreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myScaleStepDecreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myScaleStepDecreaseButtonTextComponent = this.myScaleStepDecreaseButtonText.pp_addComponent(TextComponent);
        this._setupTextComponent(this.myScaleStepDecreaseButtonTextComponent);
        this.myScaleStepDecreaseButtonTextComponent.text = this._mySetup.myDecreaseButtonText;

        this.myScaleStepDecreaseButtonCursorTargetComponent = this.myScaleStepDecreaseButtonCursorTarget.pp_addComponent(CursorTarget);
        this.myScaleStepDecreaseButtonCollisionComponent = this.myScaleStepDecreaseButtonCursorTarget.pp_addComponent(CollisionComponent);
        this.myScaleStepDecreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myScaleStepDecreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myScaleStepDecreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;
    }
}