import { Component, Type } from "@wonderlandengine/api";

export class EasyMeshColorComponent extends Component {
    static TypeName = "pp-easy-mesh-color";
    static Properties = {
        _myVariableName: { type: Type.String, default: "" },
        _myUseTuneTarget: { type: Type.Bool, default: false },
        _mySetAsDefault: { type: Type.Bool, default: false },
        _myColorModel: { type: Type.Enum, values: ["rgb", "hsv"], default: "hsv" },
        _myColorType: { type: Type.Enum, values: ["color", "diffuse color", "ambient color", "specular color", "emissive color", "fog color", "ambient factor"], default: "color" },
    };

    init() {
        this._myEasyObjectTuner = new PP.EasyMeshColor(this._myColorModel, this._myColorType, this.object, this._myVariableName, this._mySetAsDefault, this._myUseTuneTarget);
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