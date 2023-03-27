
PP.EasyTuneTransformWidgetUI = class EasyTuneTransformWidgetUI extends PP.EasyTuneBaseWidgetUI {

    setAdditionalButtonsActive(active) {
        this._myAdditionalButtonsActive = active;

        for (let i = 0; i < 3; i++) {
            this.myPositionIncreaseButtonPanels[i].pp_setActiveHierarchy(this._myAdditionalButtonsActive);
            this.myPositionDecreaseButtonPanels[i].pp_setActiveHierarchy(this._myAdditionalButtonsActive);
        }
        this.myPositionStepIncreaseButtonPanel.pp_setActiveHierarchy(this._myAdditionalButtonsActive);
        this.myPositionStepDecreaseButtonPanel.pp_setActiveHierarchy(this._myAdditionalButtonsActive);

        for (let i = 0; i < 3; i++) {
            this.myRotationIncreaseButtonPanels[i].pp_setActiveHierarchy(this._myAdditionalButtonsActive);
            this.myRotationDecreaseButtonPanels[i].pp_setActiveHierarchy(this._myAdditionalButtonsActive);
        }
        this.myRotationStepIncreaseButtonPanel.pp_setActiveHierarchy(this._myAdditionalButtonsActive);
        this.myRotationStepDecreaseButtonPanel.pp_setActiveHierarchy(this._myAdditionalButtonsActive);

        for (let i = 0; i < 3; i++) {
            this.myScaleIncreaseButtonPanels[i].pp_setActiveHierarchy(this._myAdditionalButtonsActive);
            this.myScaleDecreaseButtonPanels[i].pp_setActiveHierarchy(this._myAdditionalButtonsActive);
        }
        this.myScaleStepIncreaseButtonPanel.pp_setActiveHierarchy(this._myAdditionalButtonsActive);
        this.myScaleStepDecreaseButtonPanel.pp_setActiveHierarchy(this._myAdditionalButtonsActive);
    }

    _buildHook() {
        this._myAdditionalButtonsActive = true;
    }

    _createSkeletonHook() {
        // Position

        this.myPositionPanel = WL.scene.addObject(this.myDisplayPanel);
        this.myPositionLabelText = WL.scene.addObject(this.myPositionPanel);
        this.myPositionLabelCursorTarget = WL.scene.addObject(this.myPositionPanel);

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
            this.myPositionPanels[i] = WL.scene.addObject(this.myPositionPanel);
            this.myPositionTexts[i] = WL.scene.addObject(this.myPositionPanels[i]);
            this.myPositionCursorTargets[i] = WL.scene.addObject(this.myPositionPanels[i]);

            this.myPositionIncreaseButtonPanels[i] = WL.scene.addObject(this.myPositionPanels[i]);
            this.myPositionIncreaseButtonBackgrounds[i] = WL.scene.addObject(this.myPositionIncreaseButtonPanels[i]);
            this.myPositionIncreaseButtonTexts[i] = WL.scene.addObject(this.myPositionIncreaseButtonPanels[i]);
            this.myPositionIncreaseButtonCursorTargets[i] = WL.scene.addObject(this.myPositionIncreaseButtonPanels[i]);

            this.myPositionDecreaseButtonPanels[i] = WL.scene.addObject(this.myPositionPanels[i]);
            this.myPositionDecreaseButtonBackgrounds[i] = WL.scene.addObject(this.myPositionDecreaseButtonPanels[i]);
            this.myPositionDecreaseButtonTexts[i] = WL.scene.addObject(this.myPositionDecreaseButtonPanels[i]);
            this.myPositionDecreaseButtonCursorTargets[i] = WL.scene.addObject(this.myPositionDecreaseButtonPanels[i]);
        }

        // Rotation

        this.myRotationPanel = WL.scene.addObject(this.myDisplayPanel);
        this.myRotationLabelText = WL.scene.addObject(this.myRotationPanel);
        this.myRotationLabelCursorTarget = WL.scene.addObject(this.myRotationPanel);

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
            this.myRotationPanels[i] = WL.scene.addObject(this.myRotationPanel);
            this.myRotationTexts[i] = WL.scene.addObject(this.myRotationPanels[i]);
            this.myRotationCursorTargets[i] = WL.scene.addObject(this.myRotationPanels[i]);

            this.myRotationIncreaseButtonPanels[i] = WL.scene.addObject(this.myRotationPanels[i]);
            this.myRotationIncreaseButtonBackgrounds[i] = WL.scene.addObject(this.myRotationIncreaseButtonPanels[i]);
            this.myRotationIncreaseButtonTexts[i] = WL.scene.addObject(this.myRotationIncreaseButtonPanels[i]);
            this.myRotationIncreaseButtonCursorTargets[i] = WL.scene.addObject(this.myRotationIncreaseButtonPanels[i]);

            this.myRotationDecreaseButtonPanels[i] = WL.scene.addObject(this.myRotationPanels[i]);
            this.myRotationDecreaseButtonBackgrounds[i] = WL.scene.addObject(this.myRotationDecreaseButtonPanels[i]);
            this.myRotationDecreaseButtonTexts[i] = WL.scene.addObject(this.myRotationDecreaseButtonPanels[i]);
            this.myRotationDecreaseButtonCursorTargets[i] = WL.scene.addObject(this.myRotationDecreaseButtonPanels[i]);
        }

        // Scale

        this.myScalePanel = WL.scene.addObject(this.myDisplayPanel);
        this.myScaleLabelText = WL.scene.addObject(this.myScalePanel);
        this.myScaleLabelCursorTarget = WL.scene.addObject(this.myScalePanel);

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
            this.myScalePanels[i] = WL.scene.addObject(this.myScalePanel);
            this.myScaleTexts[i] = WL.scene.addObject(this.myScalePanels[i]);
            this.myScaleCursorTargets[i] = WL.scene.addObject(this.myScalePanels[i]);

            this.myScaleIncreaseButtonPanels[i] = WL.scene.addObject(this.myScalePanels[i]);
            this.myScaleIncreaseButtonBackgrounds[i] = WL.scene.addObject(this.myScaleIncreaseButtonPanels[i]);
            this.myScaleIncreaseButtonTexts[i] = WL.scene.addObject(this.myScaleIncreaseButtonPanels[i]);
            this.myScaleIncreaseButtonCursorTargets[i] = WL.scene.addObject(this.myScaleIncreaseButtonPanels[i]);

            this.myScaleDecreaseButtonPanels[i] = WL.scene.addObject(this.myScalePanels[i]);
            this.myScaleDecreaseButtonBackgrounds[i] = WL.scene.addObject(this.myScaleDecreaseButtonPanels[i]);
            this.myScaleDecreaseButtonTexts[i] = WL.scene.addObject(this.myScaleDecreaseButtonPanels[i]);
            this.myScaleDecreaseButtonCursorTargets[i] = WL.scene.addObject(this.myScaleDecreaseButtonPanels[i]);
        }

        // Steps

        // Position

        this.myPositionStepPanel = WL.scene.addObject(this.myPositionPanel);
        this.myPositionStepText = WL.scene.addObject(this.myPositionStepPanel);
        this.myPositionStepCursorTarget = WL.scene.addObject(this.myPositionStepPanel);

        this.myPositionStepIncreaseButtonPanel = WL.scene.addObject(this.myPositionStepPanel);
        this.myPositionStepIncreaseButtonBackground = WL.scene.addObject(this.myPositionStepIncreaseButtonPanel);
        this.myPositionStepIncreaseButtonText = WL.scene.addObject(this.myPositionStepIncreaseButtonPanel);
        this.myPositionStepIncreaseButtonCursorTarget = WL.scene.addObject(this.myPositionStepIncreaseButtonPanel);

        this.myPositionStepDecreaseButtonPanel = WL.scene.addObject(this.myPositionStepPanel);
        this.myPositionStepDecreaseButtonBackground = WL.scene.addObject(this.myPositionStepDecreaseButtonPanel);
        this.myPositionStepDecreaseButtonText = WL.scene.addObject(this.myPositionStepDecreaseButtonPanel);
        this.myPositionStepDecreaseButtonCursorTarget = WL.scene.addObject(this.myPositionStepDecreaseButtonPanel);

        // Rotation

        this.myRotationStepPanel = WL.scene.addObject(this.myRotationPanel);
        this.myRotationStepText = WL.scene.addObject(this.myRotationStepPanel);
        this.myRotationStepCursorTarget = WL.scene.addObject(this.myRotationStepPanel);

        this.myRotationStepIncreaseButtonPanel = WL.scene.addObject(this.myRotationStepPanel);
        this.myRotationStepIncreaseButtonBackground = WL.scene.addObject(this.myRotationStepIncreaseButtonPanel);
        this.myRotationStepIncreaseButtonText = WL.scene.addObject(this.myRotationStepIncreaseButtonPanel);
        this.myRotationStepIncreaseButtonCursorTarget = WL.scene.addObject(this.myRotationStepIncreaseButtonPanel);

        this.myRotationStepDecreaseButtonPanel = WL.scene.addObject(this.myRotationStepPanel);
        this.myRotationStepDecreaseButtonBackground = WL.scene.addObject(this.myRotationStepDecreaseButtonPanel);
        this.myRotationStepDecreaseButtonText = WL.scene.addObject(this.myRotationStepDecreaseButtonPanel);
        this.myRotationStepDecreaseButtonCursorTarget = WL.scene.addObject(this.myRotationStepDecreaseButtonPanel);

        // Scale

        this.myScaleStepPanel = WL.scene.addObject(this.myScalePanel);
        this.myScaleStepText = WL.scene.addObject(this.myScaleStepPanel);
        this.myScaleStepCursorTarget = WL.scene.addObject(this.myScaleStepPanel);

        this.myScaleStepIncreaseButtonPanel = WL.scene.addObject(this.myScaleStepPanel);
        this.myScaleStepIncreaseButtonBackground = WL.scene.addObject(this.myScaleStepIncreaseButtonPanel);
        this.myScaleStepIncreaseButtonText = WL.scene.addObject(this.myScaleStepIncreaseButtonPanel);
        this.myScaleStepIncreaseButtonCursorTarget = WL.scene.addObject(this.myScaleStepIncreaseButtonPanel);

        this.myScaleStepDecreaseButtonPanel = WL.scene.addObject(this.myScaleStepPanel);
        this.myScaleStepDecreaseButtonBackground = WL.scene.addObject(this.myScaleStepDecreaseButtonPanel);
        this.myScaleStepDecreaseButtonText = WL.scene.addObject(this.myScaleStepDecreaseButtonPanel);
        this.myScaleStepDecreaseButtonCursorTarget = WL.scene.addObject(this.myScaleStepDecreaseButtonPanel);
    }

    _setTransformHook() {
        //Position

        this.myPositionPanel.setTranslationLocal(this._mySetup.myPositionPanelPosition);
        this.myPositionLabelText.scale(this._mySetup.myComponentLabelTextScale);
        this.myPositionLabelCursorTarget.setTranslationLocal(this._mySetup.myComponentLabelCursorTargetPosition);

        for (let i = 0; i < 3; i++) {
            this.myPositionPanels[i].setTranslationLocal(this._mySetup.myValuePanelsPositions[i]);
            this.myPositionTexts[i].scale(this._mySetup.myValueTextScale);
            this.myPositionCursorTargets[i].setTranslationLocal(this._mySetup.myValueCursorTargetPosition);

            this.myPositionIncreaseButtonPanels[i].setTranslationLocal(this._mySetup.myIncreaseButtonPosition);
            this.myPositionIncreaseButtonBackgrounds[i].scale(this._mySetup.mySideButtonBackgroundScale);
            this.myPositionIncreaseButtonTexts[i].setTranslationLocal(this._mySetup.mySideButtonTextPosition);
            this.myPositionIncreaseButtonTexts[i].scale(this._mySetup.mySideButtonTextScale);
            this.myPositionIncreaseButtonCursorTargets[i].setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

            this.myPositionDecreaseButtonPanels[i].setTranslationLocal(this._mySetup.myDecreaseButtonPosition);
            this.myPositionDecreaseButtonBackgrounds[i].scale(this._mySetup.mySideButtonBackgroundScale);
            this.myPositionDecreaseButtonTexts[i].setTranslationLocal(this._mySetup.mySideButtonTextPosition);
            this.myPositionDecreaseButtonTexts[i].scale(this._mySetup.mySideButtonTextScale);
            this.myPositionDecreaseButtonCursorTargets[i].setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);
        }

        // Rotation

        this.myRotationPanel.setTranslationLocal(this._mySetup.myRotationPanelPosition);
        this.myRotationLabelText.scale(this._mySetup.myComponentLabelTextScale);
        this.myRotationLabelCursorTarget.setTranslationLocal(this._mySetup.myComponentLabelCursorTargetPosition);

        for (let i = 0; i < 3; i++) {
            this.myRotationPanels[i].setTranslationLocal(this._mySetup.myValuePanelsPositions[i]);
            this.myRotationTexts[i].scale(this._mySetup.myValueTextScale);
            this.myRotationCursorTargets[i].setTranslationLocal(this._mySetup.myValueCursorTargetPosition);

            this.myRotationIncreaseButtonPanels[i].setTranslationLocal(this._mySetup.myIncreaseButtonPosition);
            this.myRotationIncreaseButtonBackgrounds[i].scale(this._mySetup.mySideButtonBackgroundScale);
            this.myRotationIncreaseButtonTexts[i].setTranslationLocal(this._mySetup.mySideButtonTextPosition);
            this.myRotationIncreaseButtonTexts[i].scale(this._mySetup.mySideButtonTextScale);
            this.myRotationIncreaseButtonCursorTargets[i].setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

            this.myRotationDecreaseButtonPanels[i].setTranslationLocal(this._mySetup.myDecreaseButtonPosition);
            this.myRotationDecreaseButtonBackgrounds[i].scale(this._mySetup.mySideButtonBackgroundScale);
            this.myRotationDecreaseButtonTexts[i].setTranslationLocal(this._mySetup.mySideButtonTextPosition);
            this.myRotationDecreaseButtonTexts[i].scale(this._mySetup.mySideButtonTextScale);
            this.myRotationDecreaseButtonCursorTargets[i].setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);
        }

        // Scale

        this.myScalePanel.setTranslationLocal(this._mySetup.myScalePanelPosition);
        this.myScaleLabelText.scale(this._mySetup.myComponentLabelTextScale);
        this.myScaleLabelCursorTarget.setTranslationLocal(this._mySetup.myComponentLabelCursorTargetPosition);

        for (let i = 0; i < 3; i++) {
            this.myScalePanels[i].setTranslationLocal(this._mySetup.myValuePanelsPositions[i]);
            this.myScaleTexts[i].scale(this._mySetup.myValueTextScale);
            this.myScaleCursorTargets[i].setTranslationLocal(this._mySetup.myValueCursorTargetPosition);

            this.myScaleIncreaseButtonPanels[i].setTranslationLocal(this._mySetup.myIncreaseButtonPosition);
            this.myScaleIncreaseButtonBackgrounds[i].scale(this._mySetup.mySideButtonBackgroundScale);
            this.myScaleIncreaseButtonTexts[i].setTranslationLocal(this._mySetup.mySideButtonTextPosition);
            this.myScaleIncreaseButtonTexts[i].scale(this._mySetup.mySideButtonTextScale);
            this.myScaleIncreaseButtonCursorTargets[i].setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

            this.myScaleDecreaseButtonPanels[i].setTranslationLocal(this._mySetup.myDecreaseButtonPosition);
            this.myScaleDecreaseButtonBackgrounds[i].scale(this._mySetup.mySideButtonBackgroundScale);
            this.myScaleDecreaseButtonTexts[i].setTranslationLocal(this._mySetup.mySideButtonTextPosition);
            this.myScaleDecreaseButtonTexts[i].scale(this._mySetup.mySideButtonTextScale);
            this.myScaleDecreaseButtonCursorTargets[i].setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);
        }

        // Steps

        // Position

        this.myPositionStepPanel.setTranslationLocal(this._mySetup.myStepPanelPosition);
        this.myPositionStepText.scale(this._mySetup.myStepTextScale);
        this.myPositionStepCursorTarget.setTranslationLocal(this._mySetup.myStepCursorTargetPosition);

        this.myPositionStepIncreaseButtonPanel.setTranslationLocal(this._mySetup.myIncreaseButtonPosition);
        this.myPositionStepIncreaseButtonBackground.scale(this._mySetup.mySideButtonBackgroundScale);
        this.myPositionStepIncreaseButtonText.setTranslationLocal(this._mySetup.mySideButtonTextPosition);
        this.myPositionStepIncreaseButtonText.scale(this._mySetup.mySideButtonTextScale);
        this.myPositionStepIncreaseButtonCursorTarget.setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

        this.myPositionStepDecreaseButtonPanel.setTranslationLocal(this._mySetup.myDecreaseButtonPosition);
        this.myPositionStepDecreaseButtonBackground.scale(this._mySetup.mySideButtonBackgroundScale);
        this.myPositionStepDecreaseButtonText.setTranslationLocal(this._mySetup.mySideButtonTextPosition);
        this.myPositionStepDecreaseButtonText.scale(this._mySetup.mySideButtonTextScale);
        this.myPositionStepDecreaseButtonCursorTarget.setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

        // Rotation

        this.myRotationStepPanel.setTranslationLocal(this._mySetup.myStepPanelPosition);
        this.myRotationStepText.scale(this._mySetup.myStepTextScale);
        this.myRotationStepCursorTarget.setTranslationLocal(this._mySetup.myStepCursorTargetPosition);

        this.myRotationStepIncreaseButtonPanel.setTranslationLocal(this._mySetup.myIncreaseButtonPosition);
        this.myRotationStepIncreaseButtonBackground.scale(this._mySetup.mySideButtonBackgroundScale);
        this.myRotationStepIncreaseButtonText.setTranslationLocal(this._mySetup.mySideButtonTextPosition);
        this.myRotationStepIncreaseButtonText.scale(this._mySetup.mySideButtonTextScale);
        this.myRotationStepIncreaseButtonCursorTarget.setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

        this.myRotationStepDecreaseButtonPanel.setTranslationLocal(this._mySetup.myDecreaseButtonPosition);
        this.myRotationStepDecreaseButtonBackground.scale(this._mySetup.mySideButtonBackgroundScale);
        this.myRotationStepDecreaseButtonText.setTranslationLocal(this._mySetup.mySideButtonTextPosition);
        this.myRotationStepDecreaseButtonText.scale(this._mySetup.mySideButtonTextScale);
        this.myRotationStepDecreaseButtonCursorTarget.setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

        // Scale

        this.myScaleStepPanel.setTranslationLocal(this._mySetup.myStepPanelPosition);
        this.myScaleStepText.scale(this._mySetup.myStepTextScale);
        this.myScaleStepCursorTarget.setTranslationLocal(this._mySetup.myStepCursorTargetPosition);

        this.myScaleStepIncreaseButtonPanel.setTranslationLocal(this._mySetup.myIncreaseButtonPosition);
        this.myScaleStepIncreaseButtonBackground.scale(this._mySetup.mySideButtonBackgroundScale);
        this.myScaleStepIncreaseButtonText.setTranslationLocal(this._mySetup.mySideButtonTextPosition);
        this.myScaleStepIncreaseButtonText.scale(this._mySetup.mySideButtonTextScale);
        this.myScaleStepIncreaseButtonCursorTarget.setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);

        this.myScaleStepDecreaseButtonPanel.setTranslationLocal(this._mySetup.myDecreaseButtonPosition);
        this.myScaleStepDecreaseButtonBackground.scale(this._mySetup.mySideButtonBackgroundScale);
        this.myScaleStepDecreaseButtonText.setTranslationLocal(this._mySetup.mySideButtonTextPosition);
        this.myScaleStepDecreaseButtonText.scale(this._mySetup.mySideButtonTextScale);
        this.myScaleStepDecreaseButtonCursorTarget.setTranslationLocal(this._mySetup.mySideButtonCursorTargetPosition);
    }

    _addComponentsHook() {
        // Position

        this.myPositionLabelTextComponent = this.myPositionLabelText.addComponent(TextComponent);
        this._setupTextComponent(this.myPositionLabelTextComponent);
        this.myPositionLabelTextComponent.text = this._mySetup.myPositionText;

        this.myPositionLabelCursorTargetComponent = this.myPositionLabelCursorTarget.addComponent(CursorTarget);
        this.myPositionLabelCollisionComponent = this.myPositionLabelCursorTarget.addComponent(CollisionComponent);
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
            this.myPositionTextComponents[i] = this.myPositionTexts[i].addComponent(TextComponent);
            this._setupTextComponent(this.myPositionTextComponents[i]);
            this.myPositionTextComponents[i].text = " ";

            this.myPositionCursorTargetComponents[i] = this.myPositionCursorTargets[i].addComponent(CursorTarget);
            this.myPositionCollisionComponents[i] = this.myPositionCursorTargets[i].addComponent(CollisionComponent);
            this.myPositionCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myPositionCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myPositionCollisionComponents[i].extents = this._mySetup.myValueCollisionExtents;

            this.myPositionIncreaseButtonBackgroundComponents[i] = this.myPositionIncreaseButtonBackgrounds[i].addComponent(MeshComponent);
            this.myPositionIncreaseButtonBackgroundComponents[i].mesh = this._myPlaneMesh;
            this.myPositionIncreaseButtonBackgroundComponents[i].material = this._myAdditionalSetup.myPlaneMaterial.clone();
            this.myPositionIncreaseButtonBackgroundComponents[i].material.color = this._mySetup.myBackgroundColor;

            this.myPositionIncreaseButtonTextComponents[i] = this.myPositionIncreaseButtonTexts[i].addComponent(TextComponent);
            this._setupTextComponent(this.myPositionIncreaseButtonTextComponents[i]);
            this.myPositionIncreaseButtonTextComponents[i].text = this._mySetup.myIncreaseButtonText;

            this.myPositionIncreaseButtonCursorTargetComponents[i] = this.myPositionIncreaseButtonCursorTargets[i].addComponent(CursorTarget);
            this.myPositionIncreaseButtonCollisionComponents[i] = this.myPositionIncreaseButtonCursorTargets[i].addComponent(CollisionComponent);
            this.myPositionIncreaseButtonCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myPositionIncreaseButtonCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myPositionIncreaseButtonCollisionComponents[i].extents = this._mySetup.mySideButtonCollisionExtents;

            this.myPositionDecreaseButtonBackgroundComponents[i] = this.myPositionDecreaseButtonBackgrounds[i].addComponent(MeshComponent);
            this.myPositionDecreaseButtonBackgroundComponents[i].mesh = this._myPlaneMesh;
            this.myPositionDecreaseButtonBackgroundComponents[i].material = this._myAdditionalSetup.myPlaneMaterial.clone();
            this.myPositionDecreaseButtonBackgroundComponents[i].material.color = this._mySetup.myBackgroundColor;

            this.myPositionDecreaseButtonTextComponents[i] = this.myPositionDecreaseButtonTexts[i].addComponent(TextComponent);
            this._setupTextComponent(this.myPositionDecreaseButtonTextComponents[i]);
            this.myPositionDecreaseButtonTextComponents[i].text = this._mySetup.myDecreaseButtonText;

            this.myPositionDecreaseButtonCursorTargetComponents[i] = this.myPositionDecreaseButtonCursorTargets[i].addComponent(CursorTarget);
            this.myPositionDecreaseButtonCollisionComponents[i] = this.myPositionDecreaseButtonCursorTargets[i].addComponent(CollisionComponent);
            this.myPositionDecreaseButtonCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myPositionDecreaseButtonCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myPositionDecreaseButtonCollisionComponents[i].extents = this._mySetup.mySideButtonCollisionExtents;
        }

        // Rotation

        this.myRotationLabelTextComponent = this.myRotationLabelText.addComponent(TextComponent);
        this._setupTextComponent(this.myRotationLabelTextComponent);
        this.myRotationLabelTextComponent.text = this._mySetup.myRotationText;

        this.myRotationLabelCursorTargetComponent = this.myRotationLabelCursorTarget.addComponent(CursorTarget);
        this.myRotationLabelCollisionComponent = this.myRotationLabelCursorTarget.addComponent(CollisionComponent);
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
            this.myRotationTextComponents[i] = this.myRotationTexts[i].addComponent(TextComponent);
            this._setupTextComponent(this.myRotationTextComponents[i]);
            this.myRotationTextComponents[i].text = " ";

            this.myRotationCursorTargetComponents[i] = this.myRotationCursorTargets[i].addComponent(CursorTarget);
            this.myRotationCollisionComponents[i] = this.myRotationCursorTargets[i].addComponent(CollisionComponent);
            this.myRotationCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myRotationCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myRotationCollisionComponents[i].extents = this._mySetup.myValueCollisionExtents;

            this.myRotationIncreaseButtonBackgroundComponents[i] = this.myRotationIncreaseButtonBackgrounds[i].addComponent(MeshComponent);
            this.myRotationIncreaseButtonBackgroundComponents[i].mesh = this._myPlaneMesh;
            this.myRotationIncreaseButtonBackgroundComponents[i].material = this._myAdditionalSetup.myPlaneMaterial.clone();
            this.myRotationIncreaseButtonBackgroundComponents[i].material.color = this._mySetup.myBackgroundColor;

            this.myRotationIncreaseButtonTextComponents[i] = this.myRotationIncreaseButtonTexts[i].addComponent(TextComponent);
            this._setupTextComponent(this.myRotationIncreaseButtonTextComponents[i]);
            this.myRotationIncreaseButtonTextComponents[i].text = this._mySetup.myIncreaseButtonText;

            this.myRotationIncreaseButtonCursorTargetComponents[i] = this.myRotationIncreaseButtonCursorTargets[i].addComponent(CursorTarget);
            this.myRotationIncreaseButtonCollisionComponents[i] = this.myRotationIncreaseButtonCursorTargets[i].addComponent(CollisionComponent);
            this.myRotationIncreaseButtonCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myRotationIncreaseButtonCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myRotationIncreaseButtonCollisionComponents[i].extents = this._mySetup.mySideButtonCollisionExtents;

            this.myRotationDecreaseButtonBackgroundComponents[i] = this.myRotationDecreaseButtonBackgrounds[i].addComponent(MeshComponent);
            this.myRotationDecreaseButtonBackgroundComponents[i].mesh = this._myPlaneMesh;
            this.myRotationDecreaseButtonBackgroundComponents[i].material = this._myAdditionalSetup.myPlaneMaterial.clone();
            this.myRotationDecreaseButtonBackgroundComponents[i].material.color = this._mySetup.myBackgroundColor;

            this.myRotationDecreaseButtonTextComponents[i] = this.myRotationDecreaseButtonTexts[i].addComponent(TextComponent);
            this._setupTextComponent(this.myRotationDecreaseButtonTextComponents[i]);
            this.myRotationDecreaseButtonTextComponents[i].text = this._mySetup.myDecreaseButtonText;

            this.myRotationDecreaseButtonCursorTargetComponents[i] = this.myRotationDecreaseButtonCursorTargets[i].addComponent(CursorTarget);
            this.myRotationDecreaseButtonCollisionComponents[i] = this.myRotationDecreaseButtonCursorTargets[i].addComponent(CollisionComponent);
            this.myRotationDecreaseButtonCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myRotationDecreaseButtonCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myRotationDecreaseButtonCollisionComponents[i].extents = this._mySetup.mySideButtonCollisionExtents;
        }

        // Scale

        this.myScaleLabelTextComponent = this.myScaleLabelText.addComponent(TextComponent);
        this._setupTextComponent(this.myScaleLabelTextComponent);
        this.myScaleLabelTextComponent.text = this._mySetup.myScaleText;

        this.myScaleLabelCursorTargetComponent = this.myScaleLabelCursorTarget.addComponent(CursorTarget);
        this.myScaleLabelCollisionComponent = this.myScaleLabelCursorTarget.addComponent(CollisionComponent);
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
            this.myScaleTextComponents[i] = this.myScaleTexts[i].addComponent(TextComponent);
            this._setupTextComponent(this.myScaleTextComponents[i]);
            this.myScaleTextComponents[i].text = " ";

            this.myScaleCursorTargetComponents[i] = this.myScaleCursorTargets[i].addComponent(CursorTarget);
            this.myScaleCollisionComponents[i] = this.myScaleCursorTargets[i].addComponent(CollisionComponent);
            this.myScaleCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myScaleCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myScaleCollisionComponents[i].extents = this._mySetup.myValueCollisionExtents;

            this.myScaleIncreaseButtonBackgroundComponents[i] = this.myScaleIncreaseButtonBackgrounds[i].addComponent(MeshComponent);
            this.myScaleIncreaseButtonBackgroundComponents[i].mesh = this._myPlaneMesh;
            this.myScaleIncreaseButtonBackgroundComponents[i].material = this._myAdditionalSetup.myPlaneMaterial.clone();
            this.myScaleIncreaseButtonBackgroundComponents[i].material.color = this._mySetup.myBackgroundColor;

            this.myScaleIncreaseButtonTextComponents[i] = this.myScaleIncreaseButtonTexts[i].addComponent(TextComponent);
            this._setupTextComponent(this.myScaleIncreaseButtonTextComponents[i]);
            this.myScaleIncreaseButtonTextComponents[i].text = this._mySetup.myIncreaseButtonText;

            this.myScaleIncreaseButtonCursorTargetComponents[i] = this.myScaleIncreaseButtonCursorTargets[i].addComponent(CursorTarget);
            this.myScaleIncreaseButtonCollisionComponents[i] = this.myScaleIncreaseButtonCursorTargets[i].addComponent(CollisionComponent);
            this.myScaleIncreaseButtonCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myScaleIncreaseButtonCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myScaleIncreaseButtonCollisionComponents[i].extents = this._mySetup.mySideButtonCollisionExtents;

            this.myScaleDecreaseButtonBackgroundComponents[i] = this.myScaleDecreaseButtonBackgrounds[i].addComponent(MeshComponent);
            this.myScaleDecreaseButtonBackgroundComponents[i].mesh = this._myPlaneMesh;
            this.myScaleDecreaseButtonBackgroundComponents[i].material = this._myAdditionalSetup.myPlaneMaterial.clone();
            this.myScaleDecreaseButtonBackgroundComponents[i].material.color = this._mySetup.myBackgroundColor;

            this.myScaleDecreaseButtonTextComponents[i] = this.myScaleDecreaseButtonTexts[i].addComponent(TextComponent);
            this._setupTextComponent(this.myScaleDecreaseButtonTextComponents[i]);
            this.myScaleDecreaseButtonTextComponents[i].text = this._mySetup.myDecreaseButtonText;

            this.myScaleDecreaseButtonCursorTargetComponents[i] = this.myScaleDecreaseButtonCursorTargets[i].addComponent(CursorTarget);
            this.myScaleDecreaseButtonCollisionComponents[i] = this.myScaleDecreaseButtonCursorTargets[i].addComponent(CollisionComponent);
            this.myScaleDecreaseButtonCollisionComponents[i].collider = this._mySetup.myCursorTargetCollisionCollider;
            this.myScaleDecreaseButtonCollisionComponents[i].group = 1 << this._mySetup.myCursorTargetCollisionGroup;
            this.myScaleDecreaseButtonCollisionComponents[i].extents = this._mySetup.mySideButtonCollisionExtents;
        }

        // Steps

        // Position 
        this.myPositionStepTextComponent = this.myPositionStepText.addComponent(TextComponent);
        this._setupTextComponent(this.myPositionStepTextComponent);
        this.myPositionStepTextComponent.text = " ";

        this.myPositionStepCursorTargetComponent = this.myPositionStepCursorTarget.addComponent(CursorTarget);
        this.myPositionStepCollisionComponent = this.myPositionStepCursorTarget.addComponent(CollisionComponent);
        this.myPositionStepCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myPositionStepCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myPositionStepCollisionComponent.extents = this._mySetup.myStepCollisionExtents;

        this.myPositionStepIncreaseButtonBackgroundComponent = this.myPositionStepIncreaseButtonBackground.addComponent(MeshComponent);
        this.myPositionStepIncreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myPositionStepIncreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myPositionStepIncreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myPositionStepIncreaseButtonTextComponent = this.myPositionStepIncreaseButtonText.addComponent(TextComponent);
        this._setupTextComponent(this.myPositionStepIncreaseButtonTextComponent);
        this.myPositionStepIncreaseButtonTextComponent.text = this._mySetup.myIncreaseButtonText;

        this.myPositionStepIncreaseButtonCursorTargetComponent = this.myPositionStepIncreaseButtonCursorTarget.addComponent(CursorTarget);
        this.myPositionStepIncreaseButtonCollisionComponent = this.myPositionStepIncreaseButtonCursorTarget.addComponent(CollisionComponent);
        this.myPositionStepIncreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myPositionStepIncreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myPositionStepIncreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        this.myPositionStepDecreaseButtonBackgroundComponent = this.myPositionStepDecreaseButtonBackground.addComponent(MeshComponent);
        this.myPositionStepDecreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myPositionStepDecreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myPositionStepDecreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myPositionStepDecreaseButtonTextComponent = this.myPositionStepDecreaseButtonText.addComponent(TextComponent);
        this._setupTextComponent(this.myPositionStepDecreaseButtonTextComponent);
        this.myPositionStepDecreaseButtonTextComponent.text = this._mySetup.myDecreaseButtonText;

        this.myPositionStepDecreaseButtonCursorTargetComponent = this.myPositionStepDecreaseButtonCursorTarget.addComponent(CursorTarget);
        this.myPositionStepDecreaseButtonCollisionComponent = this.myPositionStepDecreaseButtonCursorTarget.addComponent(CollisionComponent);
        this.myPositionStepDecreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myPositionStepDecreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myPositionStepDecreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        // Rotation

        this.myRotationStepTextComponent = this.myRotationStepText.addComponent(TextComponent);
        this._setupTextComponent(this.myRotationStepTextComponent);
        this.myRotationStepTextComponent.text = " ";

        this.myRotationStepCursorTargetComponent = this.myRotationStepCursorTarget.addComponent(CursorTarget);
        this.myRotationStepCollisionComponent = this.myRotationStepCursorTarget.addComponent(CollisionComponent);
        this.myRotationStepCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myRotationStepCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myRotationStepCollisionComponent.extents = this._mySetup.myStepCollisionExtents;

        this.myRotationStepIncreaseButtonBackgroundComponent = this.myRotationStepIncreaseButtonBackground.addComponent(MeshComponent);
        this.myRotationStepIncreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myRotationStepIncreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myRotationStepIncreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myRotationStepIncreaseButtonTextComponent = this.myRotationStepIncreaseButtonText.addComponent(TextComponent);
        this._setupTextComponent(this.myRotationStepIncreaseButtonTextComponent);
        this.myRotationStepIncreaseButtonTextComponent.text = this._mySetup.myIncreaseButtonText;

        this.myRotationStepIncreaseButtonCursorTargetComponent = this.myRotationStepIncreaseButtonCursorTarget.addComponent(CursorTarget);
        this.myRotationStepIncreaseButtonCollisionComponent = this.myRotationStepIncreaseButtonCursorTarget.addComponent(CollisionComponent);
        this.myRotationStepIncreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myRotationStepIncreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myRotationStepIncreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        this.myRotationStepDecreaseButtonBackgroundComponent = this.myRotationStepDecreaseButtonBackground.addComponent(MeshComponent);
        this.myRotationStepDecreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myRotationStepDecreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myRotationStepDecreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myRotationStepDecreaseButtonTextComponent = this.myRotationStepDecreaseButtonText.addComponent(TextComponent);
        this._setupTextComponent(this.myRotationStepDecreaseButtonTextComponent);
        this.myRotationStepDecreaseButtonTextComponent.text = this._mySetup.myDecreaseButtonText;

        this.myRotationStepDecreaseButtonCursorTargetComponent = this.myRotationStepDecreaseButtonCursorTarget.addComponent(CursorTarget);
        this.myRotationStepDecreaseButtonCollisionComponent = this.myRotationStepDecreaseButtonCursorTarget.addComponent(CollisionComponent);
        this.myRotationStepDecreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myRotationStepDecreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myRotationStepDecreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        // Scale

        this.myScaleStepTextComponent = this.myScaleStepText.addComponent(TextComponent);
        this._setupTextComponent(this.myScaleStepTextComponent);
        this.myScaleStepTextComponent.text = " ";

        this.myScaleStepCursorTargetComponent = this.myScaleStepCursorTarget.addComponent(CursorTarget);
        this.myScaleStepCollisionComponent = this.myScaleStepCursorTarget.addComponent(CollisionComponent);
        this.myScaleStepCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myScaleStepCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myScaleStepCollisionComponent.extents = this._mySetup.myStepCollisionExtents;

        this.myScaleStepIncreaseButtonBackgroundComponent = this.myScaleStepIncreaseButtonBackground.addComponent(MeshComponent);
        this.myScaleStepIncreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myScaleStepIncreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myScaleStepIncreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myScaleStepIncreaseButtonTextComponent = this.myScaleStepIncreaseButtonText.addComponent(TextComponent);
        this._setupTextComponent(this.myScaleStepIncreaseButtonTextComponent);
        this.myScaleStepIncreaseButtonTextComponent.text = this._mySetup.myIncreaseButtonText;

        this.myScaleStepIncreaseButtonCursorTargetComponent = this.myScaleStepIncreaseButtonCursorTarget.addComponent(CursorTarget);
        this.myScaleStepIncreaseButtonCollisionComponent = this.myScaleStepIncreaseButtonCursorTarget.addComponent(CollisionComponent);
        this.myScaleStepIncreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myScaleStepIncreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myScaleStepIncreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        this.myScaleStepDecreaseButtonBackgroundComponent = this.myScaleStepDecreaseButtonBackground.addComponent(MeshComponent);
        this.myScaleStepDecreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myScaleStepDecreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myScaleStepDecreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myScaleStepDecreaseButtonTextComponent = this.myScaleStepDecreaseButtonText.addComponent(TextComponent);
        this._setupTextComponent(this.myScaleStepDecreaseButtonTextComponent);
        this.myScaleStepDecreaseButtonTextComponent.text = this._mySetup.myDecreaseButtonText;

        this.myScaleStepDecreaseButtonCursorTargetComponent = this.myScaleStepDecreaseButtonCursorTarget.addComponent(CursorTarget);
        this.myScaleStepDecreaseButtonCollisionComponent = this.myScaleStepDecreaseButtonCursorTarget.addComponent(CollisionComponent);
        this.myScaleStepDecreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myScaleStepDecreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myScaleStepDecreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;
    }

    _addStepComponents() {
        //Position
        this.myPositionStepTextComponent = this.myPositionStepText.addComponent(TextComponent);
        this._setupTextComponent(this.myPositionStepTextComponent);
        this.myPositionStepTextComponent.text = " ";

        this.myPositionStepCursorTargetComponent = this.myPositionStepCursorTarget.addComponent(CursorTarget);
        this.myPositionStepCollisionComponent = this.myPositionStepCursorTarget.addComponent(CollisionComponent);
        this.myPositionStepCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myPositionStepCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myPositionStepCollisionComponent.extents = this._mySetup.myStepCollisionExtents;

        //Increase/Decrease
        this.myPositionStepIncreaseButtonBackgroundComponent = this.myPositionStepIncreaseButtonBackground.addComponent(MeshComponent);
        this.myPositionStepIncreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myPositionStepIncreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myPositionStepIncreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myPositionStepIncreaseButtonTextComponent = this.myPositionStepIncreaseButtonText.addComponent(TextComponent);
        this._setupTextComponent(this.myPositionStepIncreaseButtonTextComponent);
        this.myPositionStepIncreaseButtonTextComponent.text = this._mySetup.myIncreaseButtonText;

        this.myPositionStepIncreaseButtonCursorTargetComponent = this.myPositionStepIncreaseButtonCursorTarget.addComponent(CursorTarget);
        this.myPositionStepIncreaseButtonCollisionComponent = this.myPositionStepIncreaseButtonCursorTarget.addComponent(CollisionComponent);
        this.myPositionStepIncreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myPositionStepIncreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myPositionStepIncreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        this.myPositionStepDecreaseButtonBackgroundComponent = this.myPositionStepDecreaseButtonBackground.addComponent(MeshComponent);
        this.myPositionStepDecreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myPositionStepDecreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myPositionStepDecreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myPositionStepDecreaseButtonTextComponent = this.myPositionStepDecreaseButtonText.addComponent(TextComponent);
        this._setupTextComponent(this.myPositionStepDecreaseButtonTextComponent);
        this.myPositionStepDecreaseButtonTextComponent.text = this._mySetup.myDecreaseButtonText;

        this.myPositionStepDecreaseButtonCursorTargetComponent = this.myPositionStepDecreaseButtonCursorTarget.addComponent(CursorTarget);
        this.myPositionStepDecreaseButtonCollisionComponent = this.myPositionStepDecreaseButtonCursorTarget.addComponent(CollisionComponent);
        this.myPositionStepDecreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myPositionStepDecreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myPositionStepDecreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        //Rotation
        this.myRotationStepTextComponent = this.myRotationStepText.addComponent(TextComponent);
        this._setupTextComponent(this.myRotationStepTextComponent);
        this.myRotationStepTextComponent.text = " ";

        this.myRotationStepCursorTargetComponent = this.myRotationStepCursorTarget.addComponent(CursorTarget);
        this.myRotationStepCollisionComponent = this.myRotationStepCursorTarget.addComponent(CollisionComponent);
        this.myRotationStepCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myRotationStepCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myRotationStepCollisionComponent.extents = this._mySetup.myStepCollisionExtents;

        //Increase/Decrease
        this.myRotationStepIncreaseButtonBackgroundComponent = this.myRotationStepIncreaseButtonBackground.addComponent(MeshComponent);
        this.myRotationStepIncreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myRotationStepIncreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myRotationStepIncreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myRotationStepIncreaseButtonTextComponent = this.myRotationStepIncreaseButtonText.addComponent(TextComponent);
        this._setupTextComponent(this.myRotationStepIncreaseButtonTextComponent);
        this.myRotationStepIncreaseButtonTextComponent.text = this._mySetup.myIncreaseButtonText;

        this.myRotationStepIncreaseButtonCursorTargetComponent = this.myRotationStepIncreaseButtonCursorTarget.addComponent(CursorTarget);
        this.myRotationStepIncreaseButtonCollisionComponent = this.myRotationStepIncreaseButtonCursorTarget.addComponent(CollisionComponent);
        this.myRotationStepIncreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myRotationStepIncreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myRotationStepIncreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        this.myRotationStepDecreaseButtonBackgroundComponent = this.myRotationStepDecreaseButtonBackground.addComponent(MeshComponent);
        this.myRotationStepDecreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myRotationStepDecreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myRotationStepDecreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myRotationStepDecreaseButtonTextComponent = this.myRotationStepDecreaseButtonText.addComponent(TextComponent);
        this._setupTextComponent(this.myRotationStepDecreaseButtonTextComponent);
        this.myRotationStepDecreaseButtonTextComponent.text = this._mySetup.myDecreaseButtonText;

        this.myRotationStepDecreaseButtonCursorTargetComponent = this.myRotationStepDecreaseButtonCursorTarget.addComponent(CursorTarget);
        this.myRotationStepDecreaseButtonCollisionComponent = this.myRotationStepDecreaseButtonCursorTarget.addComponent(CollisionComponent);
        this.myRotationStepDecreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myRotationStepDecreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myRotationStepDecreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        //Scale
        this.myScaleStepTextComponent = this.myScaleStepText.addComponent(TextComponent);
        this._setupTextComponent(this.myScaleStepTextComponent);
        this.myScaleStepTextComponent.text = " ";

        this.myScaleStepCursorTargetComponent = this.myScaleStepCursorTarget.addComponent(CursorTarget);
        this.myScaleStepCollisionComponent = this.myScaleStepCursorTarget.addComponent(CollisionComponent);
        this.myScaleStepCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myScaleStepCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myScaleStepCollisionComponent.extents = this._mySetup.myStepCollisionExtents;

        //Increase/Decrease
        this.myScaleStepIncreaseButtonBackgroundComponent = this.myScaleStepIncreaseButtonBackground.addComponent(MeshComponent);
        this.myScaleStepIncreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myScaleStepIncreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myScaleStepIncreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myScaleStepIncreaseButtonTextComponent = this.myScaleStepIncreaseButtonText.addComponent(TextComponent);
        this._setupTextComponent(this.myScaleStepIncreaseButtonTextComponent);
        this.myScaleStepIncreaseButtonTextComponent.text = this._mySetup.myIncreaseButtonText;

        this.myScaleStepIncreaseButtonCursorTargetComponent = this.myScaleStepIncreaseButtonCursorTarget.addComponent(CursorTarget);
        this.myScaleStepIncreaseButtonCollisionComponent = this.myScaleStepIncreaseButtonCursorTarget.addComponent(CollisionComponent);
        this.myScaleStepIncreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myScaleStepIncreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myScaleStepIncreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;

        this.myScaleStepDecreaseButtonBackgroundComponent = this.myScaleStepDecreaseButtonBackground.addComponent(MeshComponent);
        this.myScaleStepDecreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myScaleStepDecreaseButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myScaleStepDecreaseButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myScaleStepDecreaseButtonTextComponent = this.myScaleStepDecreaseButtonText.addComponent(TextComponent);
        this._setupTextComponent(this.myScaleStepDecreaseButtonTextComponent);
        this.myScaleStepDecreaseButtonTextComponent.text = this._mySetup.myDecreaseButtonText;

        this.myScaleStepDecreaseButtonCursorTargetComponent = this.myScaleStepDecreaseButtonCursorTarget.addComponent(CursorTarget);
        this.myScaleStepDecreaseButtonCollisionComponent = this.myScaleStepDecreaseButtonCursorTarget.addComponent(CollisionComponent);
        this.myScaleStepDecreaseButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myScaleStepDecreaseButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myScaleStepDecreaseButtonCollisionComponent.extents = this._mySetup.mySideButtonCollisionExtents;
    }
};