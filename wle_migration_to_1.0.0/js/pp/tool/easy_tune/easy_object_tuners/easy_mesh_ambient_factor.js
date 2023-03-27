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
        let mesh = object.pp_getComponentHierarchy(MeshComponent);
        if (mesh) {
            material = mesh.material;
        }

        return material;
    }
};