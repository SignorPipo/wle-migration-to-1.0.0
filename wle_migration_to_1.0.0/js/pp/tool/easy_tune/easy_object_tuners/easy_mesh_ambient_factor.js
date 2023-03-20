import { Component, Type } from "@wonderlandengine/api";

PP.EasyMeshAmbientFactor = class EasyMeshAmbientFactor extends PP.EasyObjectTuner {
    constructor(object, variableName, setAsDefault, useTuneTarget) {
        super(object, variableName, setAsDefault, useTuneTarget);
    }

    _getVariableNamePrefix() {
        let nameFirstPart = null;

        if (this._myColorModel == 0) {
            nameFirstPart = "Mesh AF ";
        } else {
            nameFirstPart = "Mesh AF ";
        }

        return nameFirstPart;
    }

    _createEasyTuneVariable(variableName) {
        return new PP.EasyTuneNumber(variableName, this._getDefaultValue(), 0.1, 3, 0, 1);
    }

    _getObjectValue(object) {
        let ambientFactor = null;

        let meshMaterial = this._getMeshMaterial(object);
        if (meshMaterial) {
            ambientFactor = meshMaterial.ambientFactor;
        } else {
            ambientFactor = this._getDefaultValue();
        }

        return ambientFactor;
    }

    _getDefaultValue() {
        return 0;
    }

    _updateObjectValue(object, value) {
        let ambientFactor = value;

        let meshMaterial = this._getMeshMaterial(object);
        if (meshMaterial) {
            meshMaterial.ambientFactor = ambientFactor;
        }
    }

    _getMeshMaterial(object) {
        let material = null;
        let mesh = object.pp_getComponentHierarchy("mesh");
        if (mesh) {
            material = mesh.material;
        }

        return material;
    }
};

PP.EasyMeshAmbientFactorComponent = class EasyMeshAmbientFactorComponent extends Component {
    static TypeName = "pp-easy-mesh-ambient-factor";
    static Properties = {
        _myVariableName: { type: Type.String, default: "" },
        _myUseTuneTarget: { type: Type.Bool, default: false },
        _mySetAsDefault: { type: Type.Bool, default: false }
    };

    init() {
        this._myEasyObjectTuner = new PP.EasyMeshAmbientFactor(this.object, this._myVariableName, this._mySetAsDefault, this._myUseTuneTarget);
    }

    start() {
        this._myEasyObjectTuner.start();
    }

    update(dt) {
        this._myEasyObjectTuner.update(dt);
    }

    pp_clone(targetObject) {
        let clonedComponent = targetObject.pp_addComponent(this.type, {
            "_myVariableName": this._myVariableName,
            "_mySetAsDefault": this._mySetAsDefault,
            "_myUseTuneTarget": this._myUseTuneTarget
        });

        clonedComponent.active = this.active;

        return clonedComponent;
    }
};