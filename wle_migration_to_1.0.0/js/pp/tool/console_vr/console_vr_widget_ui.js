import { getMainEngine } from "../../plugin/wl/extensions/engine_extension";

export class ConsoleVRWidgetUI {
    constructor(engine = getMainEngine()) {
        this._myEngine = engine;
    }

    build(parentObject, setup, additionalSetup) {
        this._myParentObject = parentObject;
        this._mySetup = setup;
        this._myAdditionalSetup = additionalSetup;

        this._myPlaneMesh = PP.MeshUtils.createPlaneMesh();

        this._createSkeleton();
        this._setTransforms();
        this._addComponents();

        this._setTransformForNonVR();

        if (XRUtils.isSessionActive(this._myEngine)) {
            this._onXRSessionStart(XRUtils.getSession(this._myEngine));
        }
        this._myEngine.onXRSessionStart.push(this._onXRSessionStart.bind(this));
        this._myEngine.onXRSessionEnd.push(this._onXRSessionEnd.bind(this));
    }

    setVisible(visible) {
        this.myPivotObject.pp_setActiveHierarchy(visible);
    }

    //Skeleton
    _createSkeleton() {
        this.myPivotObject = WL.scene.addObject(this._myParentObject);

        this._createMessagesSkeleton();
        this._createButtonsSkeleton();
        this._createPointerSkeleton();
    }

    _createMessagesSkeleton() {
        this.myMessagesPanel = WL.scene.addObject(this.myPivotObject);
        this.myMessagesBackground = WL.scene.addObject(this.myMessagesPanel);
        this.myMessagesTextsPanel = WL.scene.addObject(this.myMessagesPanel);

        this.myMessagesTexts = [];
        for (let key in ConsoleVRWidgetMessageType) {
            this.myMessagesTexts[ConsoleVRWidgetMessageType[key]] = WL.scene.addObject(this.myMessagesTextsPanel);
        }

        this.myNotifyIconPanel = WL.scene.addObject(this.myMessagesPanel);
        this.myNotifyIconBackground = WL.scene.addObject(this.myNotifyIconPanel);
        this.myNotifyIconCursorTarget = WL.scene.addObject(this.myNotifyIconPanel);
    }

    _createButtonsSkeleton() {
        this.myButtonsPanel = WL.scene.addObject(this.myPivotObject);

        this.myFilterButtonsPanels = [];
        this.myFilterButtonsBackgrounds = [];
        this.myFilterButtonsTexts = [];
        this.myFilterButtonsCursorTargets = [];

        for (let key in ConsoleVRWidgetMessageType) {
            this.myFilterButtonsPanels[ConsoleVRWidgetMessageType[key]] = WL.scene.addObject(this.myButtonsPanel);
            this.myFilterButtonsBackgrounds[ConsoleVRWidgetMessageType[key]] = WL.scene.addObject(this.myFilterButtonsPanels[ConsoleVRWidgetMessageType[key]]);
            this.myFilterButtonsTexts[ConsoleVRWidgetMessageType[key]] = WL.scene.addObject(this.myFilterButtonsPanels[ConsoleVRWidgetMessageType[key]]);
            this.myFilterButtonsCursorTargets[ConsoleVRWidgetMessageType[key]] = WL.scene.addObject(this.myFilterButtonsPanels[ConsoleVRWidgetMessageType[key]]);
        }

        this.myClearButtonPanel = WL.scene.addObject(this.myButtonsPanel);
        this.myClearButtonBackground = WL.scene.addObject(this.myClearButtonPanel);
        this.myClearButtonText = WL.scene.addObject(this.myClearButtonPanel);
        this.myClearButtonCursorTarget = WL.scene.addObject(this.myClearButtonPanel);

        this.myUpButtonPanel = WL.scene.addObject(this.myButtonsPanel);
        this.myUpButtonBackground = WL.scene.addObject(this.myUpButtonPanel);
        this.myUpButtonText = WL.scene.addObject(this.myUpButtonPanel);
        this.myUpButtonCursorTarget = WL.scene.addObject(this.myUpButtonPanel);

        this.myDownButtonPanel = WL.scene.addObject(this.myButtonsPanel);
        this.myDownButtonBackground = WL.scene.addObject(this.myDownButtonPanel);
        this.myDownButtonText = WL.scene.addObject(this.myDownButtonPanel);
        this.myDownButtonCursorTarget = WL.scene.addObject(this.myDownButtonPanel);
    }

    _createPointerSkeleton() {
        this.myPointerCursorTarget = WL.scene.addObject(this.myPivotObject);
    }

    //Transforms
    _setTransforms() {
        this.myPivotObject.setDirty();

        this._setMessagesTransforms();
        this._setButtonsTransforms();
        this._setPointerTransform();
    }

    _setMessagesTransforms() {
        this.myMessagesPanel.setTranslationLocal(this._mySetup.myMessagesPanelPosition);
        this.myMessagesBackground.scale(this._mySetup.myMessagesBackgroundScale);

        this.myMessagesTextsPanel.setTranslationLocal(this._mySetup.myMessagesTextsPanelPosition);
        this.myMessagesTextsPanel.scale(this._mySetup.myMessagesTextsPanelScale);
        for (let key in ConsoleVRWidgetMessageType) {
            this.myMessagesTexts[ConsoleVRWidgetMessageType[key]].setTranslationLocal(this._mySetup.myMessagesTextPositions[ConsoleVRWidgetMessageType[key]]);
        }

        this.myNotifyIconPanel.setTranslationLocal(this._mySetup.myNotifyIconPanelPositions[this._myAdditionalSetup.myHandedness]);
        this.myNotifyIconBackground.scale(this._mySetup.myNotifyIconBackgroundScale);
        this.myNotifyIconCursorTarget.setTranslationLocal(this._mySetup.myNotifyIconCursorTargetPosition);
    }

    _setButtonsTransforms() {
        this.myButtonsPanel.setTranslationLocal(this._mySetup.myButtonsPanelPosition);

        //Filter Buttons
        for (let key in ConsoleVRWidgetMessageType) {
            this.myFilterButtonsPanels[ConsoleVRWidgetMessageType[key]].setTranslationLocal(this._mySetup.myFilterButtonsPositions[ConsoleVRWidgetMessageType[key]]);

            this.myFilterButtonsBackgrounds[ConsoleVRWidgetMessageType[key]].scale(this._mySetup.myButtonBackgroundScale);

            this.myFilterButtonsTexts[ConsoleVRWidgetMessageType[key]].setTranslationLocal(this._mySetup.myButtonTextPosition);
            this.myFilterButtonsTexts[ConsoleVRWidgetMessageType[key]].scale(this._mySetup.myButtonTextScale);

            this.myFilterButtonsCursorTargets[ConsoleVRWidgetMessageType[key]].setTranslationLocal(this._mySetup.myButtonCursorTargetPosition);
        }

        //Clear
        {
            this.myClearButtonPanel.setTranslationLocal(this._mySetup.myClearButtonPosition);

            this.myClearButtonBackground.scale(this._mySetup.myButtonBackgroundScale);

            this.myClearButtonText.setTranslationLocal(this._mySetup.myButtonTextPosition);
            this.myClearButtonText.scale(this._mySetup.myButtonTextScale);

            this.myClearButtonCursorTarget.setTranslationLocal(this._mySetup.myButtonCursorTargetPosition);
        }

        //Up
        {
            this.myUpButtonPanel.setTranslationLocal(this._mySetup.myUpButtonPosition);

            this.myUpButtonBackground.scale(this._mySetup.myButtonBackgroundScale);

            this.myUpButtonText.setTranslationLocal(this._mySetup.myButtonTextPosition);
            this.myUpButtonText.scale(this._mySetup.myButtonTextScale);

            this.myUpButtonCursorTarget.setTranslationLocal(this._mySetup.myButtonCursorTargetPosition);
        }

        //Down
        {
            this.myDownButtonPanel.setTranslationLocal(this._mySetup.myDownButtonPosition);

            this.myDownButtonBackground.scale(this._mySetup.myButtonBackgroundScale);

            this.myDownButtonText.setTranslationLocal(this._mySetup.myButtonTextPosition);
            this.myDownButtonText.scale(this._mySetup.myButtonTextScale);

            this.myDownButtonCursorTarget.setTranslationLocal(this._mySetup.myButtonCursorTargetPosition);
        }
    }

    _setPointerTransform() {
        this.myPointerCursorTarget.setTranslationLocal(this._mySetup.myPointerCursorTargetPosition);
    }

    //Components
    _addComponents() {
        this._addMessagesComponents();
        this._addButtonsComponents();
        this._addPointerComponents();
    }

    _addMessagesComponents() {
        let messagesBackgroundMeshComp = this.myMessagesBackground.addComponent(MeshComponent);
        messagesBackgroundMeshComp.mesh = this._myPlaneMesh;
        messagesBackgroundMeshComp.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        messagesBackgroundMeshComp.material.color = this._mySetup.myBackgroundColor;

        this.myMessagesTextComponents = [];
        for (let key in ConsoleVRWidgetMessageType) {
            let textComp = this.myMessagesTexts[ConsoleVRWidgetMessageType[key]].addComponent(TextComponent);

            textComp.alignment = this._mySetup.myMessagesTextAlignment;
            textComp.justification = this._mySetup.myMessagesTextJustification;
            textComp.material = this._myAdditionalSetup.myTextMaterial.clone();
            textComp.material.color = this._mySetup.myMessagesTextColors[ConsoleVRWidgetMessageType[key]];
            textComp.lineSpacing = 1.2;
            textComp.text = this._mySetup.myMessagesTextStartString;

            this.myMessagesTextComponents[ConsoleVRWidgetMessageType[key]] = textComp;
        }

        this.myNotifyIconBackgroundComponent = this.myNotifyIconBackground.addComponent(MeshComponent);
        this.myNotifyIconBackgroundComponent.mesh = this._myPlaneMesh;
        this.myNotifyIconBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myNotifyIconBackgroundComponent.material.color = this._mySetup.myNotifyIconColor;

        this.myNotifyIconCursorTargetComponent = this.myNotifyIconCursorTarget.addComponent(CursorTarget);

        this.myNotifyIconCollisionComponent = this.myNotifyIconCursorTarget.addComponent(CollisionComponent);
        this.myNotifyIconCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myNotifyIconCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myNotifyIconCollisionComponent.extents = this._mySetup.myNotifyIconCollisionExtents;
    }

    _addButtonsComponents() {
        //worship the code copy pasteness

        this.myFilterButtonsBackgroundComponents = [];
        this.myFilterButtonsTextComponents = [];
        this.myFilterButtonsCursorTargetComponents = [];
        this.myFilterButtonsCollisionComponents = [];

        //Filter Buttons
        for (let key in ConsoleVRWidgetMessageType) {
            let buttonBackgroundMeshComp = this.myFilterButtonsBackgrounds[ConsoleVRWidgetMessageType[key]].addComponent(MeshComponent);
            buttonBackgroundMeshComp.mesh = this._myPlaneMesh;
            buttonBackgroundMeshComp.material = this._myAdditionalSetup.myPlaneMaterial.clone();
            buttonBackgroundMeshComp.material.color = this._mySetup.myBackgroundColor;

            let buttonTextComp = this.myFilterButtonsTexts[ConsoleVRWidgetMessageType[key]].addComponent(TextComponent);
            this._setupButtonTextComponent(buttonTextComp);
            buttonTextComp.material.color = this._mySetup.myFilterButtonsTextColors[ConsoleVRWidgetMessageType[key]];
            buttonTextComp.text = this._mySetup.myFilterButtonsTextLabel[ConsoleVRWidgetMessageType[key]];

            let buttonCursorTargetComp = this.myFilterButtonsCursorTargets[ConsoleVRWidgetMessageType[key]].addComponent(CursorTarget);

            let buttonCollisionComp = this.myFilterButtonsCursorTargets[ConsoleVRWidgetMessageType[key]].addComponent(CollisionComponent);
            buttonCollisionComp.collider = this._mySetup.myButtonsCollisionCollider;
            buttonCollisionComp.group = 1 << this._mySetup.myButtonsCollisionGroup;
            buttonCollisionComp.extents = this._mySetup.myButtonsCollisionExtents;

            this.myFilterButtonsBackgroundComponents[ConsoleVRWidgetMessageType[key]] = buttonBackgroundMeshComp;
            this.myFilterButtonsTextComponents[ConsoleVRWidgetMessageType[key]] = buttonTextComp;
            this.myFilterButtonsCursorTargetComponents[ConsoleVRWidgetMessageType[key]] = buttonCursorTargetComp;
            this.myFilterButtonsCollisionComponents[ConsoleVRWidgetMessageType[key]] = buttonCollisionComp;
        }

        //Clear 
        {
            let buttonBackgroundMeshComp = this.myClearButtonBackground.addComponent(MeshComponent);
            buttonBackgroundMeshComp.mesh = this._myPlaneMesh;
            buttonBackgroundMeshComp.material = this._myAdditionalSetup.myPlaneMaterial.clone();
            buttonBackgroundMeshComp.material.color = this._mySetup.myBackgroundColor;

            let buttonTextComp = this.myClearButtonText.addComponent(TextComponent);
            this._setupButtonTextComponent(buttonTextComp);
            buttonTextComp.text = this._mySetup.myClearButtonTextLabel;

            let buttonCursorTargetComp = this.myClearButtonCursorTarget.addComponent(CursorTarget);

            let buttonCollisionComp = this.myClearButtonCursorTarget.addComponent(CollisionComponent);
            buttonCollisionComp.collider = this._mySetup.myButtonsCollisionCollider;
            buttonCollisionComp.group = 1 << this._mySetup.myButtonsCollisionGroup;
            buttonCollisionComp.extents = this._mySetup.myButtonsCollisionExtents;

            this.myClearButtonBackgroundComponent = buttonBackgroundMeshComp;
            this.myClearButtonTextComponent = buttonTextComp;
            this.myClearButtonCursorTargetComponent = buttonCursorTargetComp;
            this.myClearButtonCollisionComponent = buttonCollisionComp;
        }

        //Up 
        {
            let buttonBackgroundMeshComp = this.myUpButtonBackground.addComponent(MeshComponent);
            buttonBackgroundMeshComp.mesh = this._myPlaneMesh;
            buttonBackgroundMeshComp.material = this._myAdditionalSetup.myPlaneMaterial.clone();
            buttonBackgroundMeshComp.material.color = this._mySetup.myBackgroundColor;

            let buttonTextComp = this.myUpButtonText.addComponent(TextComponent);
            this._setupButtonTextComponent(buttonTextComp);
            buttonTextComp.text = this._mySetup.myUpButtonTextLabel;

            let buttonCursorTargetComp = this.myUpButtonCursorTarget.addComponent(CursorTarget);

            let buttonCollisionComp = this.myUpButtonCursorTarget.addComponent(CollisionComponent);
            buttonCollisionComp.collider = this._mySetup.myButtonsCollisionCollider;
            buttonCollisionComp.group = 1 << this._mySetup.myButtonsCollisionGroup;
            buttonCollisionComp.extents = this._mySetup.myButtonsCollisionExtents;

            this.myUpButtonBackgroundComponent = buttonBackgroundMeshComp;
            this.myUpButtonTextComponent = buttonTextComp;
            this.myUpButtonCursorTargetComponent = buttonCursorTargetComp;
            this.myUpButtonCollisionComponent = buttonCollisionComp;
        }

        //Down 
        {
            let buttonBackgroundMeshComp = this.myDownButtonBackground.addComponent(MeshComponent);
            buttonBackgroundMeshComp.mesh = this._myPlaneMesh;
            buttonBackgroundMeshComp.material = this._myAdditionalSetup.myPlaneMaterial.clone();
            buttonBackgroundMeshComp.material.color = this._mySetup.myBackgroundColor;

            let buttonTextComp = this.myDownButtonText.addComponent(TextComponent);
            this._setupButtonTextComponent(buttonTextComp);
            buttonTextComp.text = this._mySetup.myDownButtonTextLabel;

            let buttonCursorTargetComp = this.myDownButtonCursorTarget.addComponent(CursorTarget);

            let buttonCollisionComp = this.myDownButtonCursorTarget.addComponent(CollisionComponent);
            buttonCollisionComp.collider = this._mySetup.myButtonsCollisionCollider;
            buttonCollisionComp.group = 1 << this._mySetup.myButtonsCollisionGroup;
            buttonCollisionComp.extents = this._mySetup.myButtonsCollisionExtents;

            this.myDownButtonBackgroundComponent = buttonBackgroundMeshComp;
            this.myDownButtonTextComponent = buttonTextComp;
            this.myDownButtonCursorTargetComponent = buttonCursorTargetComp;
            this.myDownButtonCollisionComponent = buttonCollisionComp;
        }
    }

    _addPointerComponents() {
        this.myPointerCursorTargetComponent = this.myPointerCursorTarget.addComponent(CursorTarget);
        this.myPointerCursorTargetComponent.isSurface = true;

        let collisionComp = this.myPointerCursorTarget.addComponent(CollisionComponent);
        collisionComp.collider = this._mySetup.myPointerCollisionCollider;
        collisionComp.group = 1 << this._mySetup.myPointerCollisionGroup;
        collisionComp.extents = this._mySetup.myPointerCollisionExtents;

        this.myPointerCollisionComponent = collisionComp;
    }

    _setupButtonTextComponent(textComponent) {
        textComponent.alignment = this._mySetup.myTextAlignment;
        textComponent.justification = this._mySetup.myTextJustification;
        textComponent.material = this._myAdditionalSetup.myTextMaterial.clone();
        textComponent.material.color = this._mySetup.myTextColor;
        textComponent.text = "";
    }

    _onXRSessionStart() {
        this._setTransformForVR();
    }

    _onXRSessionEnd() {
        this._setTransformForNonVR();
    }

    _setTransformForVR() {
        this.myNotifyIconPanel.setTranslationLocal(this._mySetup.myNotifyIconPanelPositions[this._myAdditionalSetup.myHandedness]);
    }

    _setTransformForNonVR() {
        this.myNotifyIconPanel.setTranslationLocal(this._mySetup.myNotifyIconPanelPositions[ToolHandedness.NONE]);
    }
};