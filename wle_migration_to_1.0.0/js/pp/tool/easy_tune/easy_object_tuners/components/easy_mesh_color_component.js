import { Component, Type } from "@wonderlandengine/api";
import { EasyMeshColor } from "../easy_mesh_color";

export class EasyMeshColorComponent extends Component {
    static TypeName = "pp-easy-mesh-color";
    static Properties = {
        _myVariableName: { type: Type.String, default: "" },
        _myUseTuneTarget: { type: Type.Bool, default: false },
        _mySetAsDefault: { type: Type.Bool, default: false },
        _myColorModel: { type: Type.Enum, values: ["RGB", "HSV"], default: "HSV" },
        _myColorType: { type: Type.Enum, values: ["Color", "Diffuse Color", "Ambient Color", "Specular Color", "Emissive Color", "Fog Color", "Ambient Factor"], default: "Color" },
    };

    init() {
        this._myEasyObjectTuner = new EasyMeshColor(this._myColorModel, this._myColorType, this.object, this._myVariableName, this._mySetAsDefault, this._myUseTuneTarget);
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
            "_myUseTuneTarget": this._myUseTuneTarget,
            "_myColorModel": this._myColorModel,
            "_myColorType": this._myColorType,
        });

        clonedComponent.active = this.active;

        return clonedComponent;
    }
}