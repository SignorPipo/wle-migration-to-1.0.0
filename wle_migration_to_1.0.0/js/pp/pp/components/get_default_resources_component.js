import { Component, Type } from "@wonderlandengine/api";
import { MeshUtils } from "../../cauldron/utils/mesh_utils";
import { DefaultResources } from "../default_resources";
import { hasDefaultResources, removeDefaultResources, setDefaultResources } from "../default_resources_global";

export class GetDefaultResourcesComponent extends Component {
    static TypeName = "pp-get-default-resources";
    static Properties = {
        _myPlane: { type: Type.Mesh },
        _myCube: { type: Type.Mesh },
        _mySphere: { type: Type.Mesh },
        _myCone: { type: Type.Mesh },
        _myCylinder: { type: Type.Mesh },
        _myCircle: { type: Type.Mesh },

        _myFlatOpaque: { type: Type.Material },
        _myFlatTransparentNoDepth: { type: Type.Material },
        _myPhongOpaque: { type: Type.Material },
        _myText: { type: Type.Material }
    };

    init() {
        this._myEnabled = false;

        // prevents double managers from same engine
        if (!hasDefaultResources(this.engine)) {
            let defaultResources = new DefaultResources();
            defaultResources.myMeshes.myPlane = MeshUtils.cloneMesh(this._myPlane);
            defaultResources.myMeshes.myCube = MeshUtils.cloneMesh(this._myCube);
            defaultResources.myMeshes.mySphere = MeshUtils.cloneMesh(this._mySphere);
            defaultResources.myMeshes.myCone = MeshUtils.cloneMesh(this._myCone);
            defaultResources.myMeshes.myCylinder = MeshUtils.cloneMesh(this._myCylinder);
            defaultResources.myMeshes.myCircle = MeshUtils.cloneMesh(this._myCircle);

            defaultResources.myMeshes.myInvertedCube = MeshUtils.invertMesh(this._myCube);
            defaultResources.myMeshes.myInvertedSphere = MeshUtils.invertMesh(this._mySphere);
            defaultResources.myMeshes.myInvertedCone = MeshUtils.invertMesh(this._myCone);
            defaultResources.myMeshes.myInvertedCylinder = MeshUtils.invertMesh(this._myCylinder);

            if (this._myFlatOpaque != null) {
                defaultResources.myMaterials.myFlatOpaque = this._myFlatOpaque.clone();
            }

            if (this._myFlatTransparentNoDepth != null) {
                defaultResources.myMaterials.myFlatTransparentNoDepth = this._myFlatTransparentNoDepth.clone();
            }

            if (this._myPhongOpaque != null) {
                defaultResources.myMaterials.myPhongOpaque = this._myPhongOpaque.clone();
            }

            if (this._myText != null) {
                defaultResources.myMaterials.myText = this._myText.clone();
            }

            setDefaultResources(defaultResources, this.engine);
            this._myEnabled = true;
        }
    }

    onDestroy() {
        if (this._myEnabled) {
            removeDefaultResources(this.engine);
        }
    }
};