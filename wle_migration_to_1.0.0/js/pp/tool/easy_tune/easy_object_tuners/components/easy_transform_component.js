import { Component, Type } from "@wonderlandengine/api";
import { EasyTransform } from "../easy_transform";

export class EasyTransformComponent extends Component {
    static TypeName = "pp-easy-transform";
    static Properties = {
        _myVariableName: { type: Type.String, default: "" },
        _mySetAsDefault: { type: Type.Bool, default: false },
        _myUseTuneTarget: { type: Type.Bool, default: false },
        _myIsLocal: { type: Type.Bool, default: false },
        _myScaleAsOne: { type: Type.Bool, default: true } // Edit all scale values together
    };

    init() {
        this._myEasyObjectTuner = new EasyTransform(this._myIsLocal, this._myScaleAsOne, this.object, this._myVariableName, this._mySetAsDefault, this._myUseTuneTarget);
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
            "_myIsLocal": this._myIsLocal,
            "_myScaleAsOne": this._myScaleAsOne,
        });

        clonedComponent.active = this.active;

        return clonedComponent;
    }
}