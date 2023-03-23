import { Component, Type } from "@wonderlandengine/api";
import { vec4_create } from "../../../plugin/js/extensions/array_extension";
import { getDefaultResources } from "../../../pp/default_resources_global";
import { VisualData } from "../visual_data";
import { getVisualData, getVisualManager, hasVisualData, hasVisualManager, removeVisualData, removeVisualManager, setVisualData, setVisualManager } from "../visual_globals";
import { VisualManager } from "../visual_manager";

export class VisualManagerComponent extends Component {
    static TypeName = "pp-visual-manager";
    static Properties = {};

    init() {
        this._myVisualManager = null;

        // prevents double global from same engine
        if (!hasVisualManager(this.engine)) {
            this._myVisualManager = new VisualManager();

            setVisualManager(this._myVisualManager, this.engine);
        }

        // prevents double global from same engine
        if (!hasVisualData(this.engine)) {
            this._myVisualData = new VisualData();
            this._myVisualData.myRootObject = this.engine.scene.pp_addObject();

            setVisualData(this._myVisualData, this.engine);
        }
    }

    start() {
        if (this._myVisualData != null) {
            this._myVisualData.myDefaultMaterials.myDefaultMeshMaterial = getDefaultResources(this.engine).myMaterials.myFlatOpaque.clone();

            this._myVisualData.myDefaultMaterials.myDefaultTextMaterial = getDefaultResources(this.engine).myMaterials.myText.clone();

            this._myVisualData.myDefaultMaterials.myDefaultRightMaterial = getDefaultResources(this.engine).myMaterials.myFlatOpaque.clone();
            this._myVisualData.myDefaultMaterials.myDefaultRightMaterial.color = vec4_create(1, 0, 0, 1);
            this._myVisualData.myDefaultMaterials.myDefaultUpMaterial = getDefaultResources(this.engine).myMaterials.myFlatOpaque.clone();
            this._myVisualData.myDefaultMaterials.myDefaultUpMaterial.color = vec4_create(0, 1, 0, 1);
            this._myVisualData.myDefaultMaterials.myDefaultForwardMaterial = getDefaultResources(this.engine).myMaterials.myFlatOpaque.clone();
            this._myVisualData.myDefaultMaterials.myDefaultForwardMaterial.color = vec4_create(0, 0, 1, 1);

            this._myVisualData.myDefaultMaterials.myDefaultRayMaterial = getDefaultResources(this.engine).myMaterials.myFlatOpaque.clone();
            this._myVisualData.myDefaultMaterials.myDefaultRayMaterial.color = vec4_create(0, 1, 0, 1);
            this._myVisualData.myDefaultMaterials.myDefaultHitNormalMaterial = getDefaultResources(this.engine).myMaterials.myFlatOpaque.clone();
            this._myVisualData.myDefaultMaterials.myDefaultHitNormalMaterial.color = vec4_create(1, 0, 0, 1);
        }

        if (this.myVisualManager != null) {
            this.myVisualManager.start();
        }
    }

    update(dt) {
        if (this.myVisualManager != null) {
            this.myVisualManager.update(dt);
        }
    }

    onDestroy() {
        if (this._myVisualManager != null && getVisualManager(this.engine) == this._myVisualManager) {
            removeVisualManager(this.engine);
        }

        if (this._myVisualData != null && getVisualData(this.engine) == this._myVisualData) {
            removeVisualData(this.engine);
        }
    }
};