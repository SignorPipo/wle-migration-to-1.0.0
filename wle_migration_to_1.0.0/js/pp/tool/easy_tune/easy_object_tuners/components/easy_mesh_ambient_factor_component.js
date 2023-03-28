import { Component, Type } from "@wonderlandengine/api";
import { EasyMeshAmbientFactor } from "../easy_mesh_ambient_factor";

export class EasyMeshAmbientFactorComponent extends Component {
    static TypeName = "pp-easy-mesh-ambient-factor";
    static Properties = {
        _myVariableName: { type: Type.String, default: "" },
        _myUseTuneTarget: { type: Type.Bool, default: false },
        _mySetAsDefault: { type: Type.Bool, default: false }
    };

    init() {
        this._myEasyObjectTuner = new EasyMeshAmbientFactor(this.object, this._myVariableName, this._mySetAsDefault, this._myUseTuneTarget);
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
}