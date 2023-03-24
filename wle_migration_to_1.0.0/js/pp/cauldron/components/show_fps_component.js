import { Component, Type } from "@wonderlandengine/api";
import { quat2_create, vec3_create, vec4_create } from "../../plugin/js/extensions/array_extension";
import { getDefaultResources } from "../../pp/default_resources_global";
import { getPlayerObjects } from "../../pp/player_objects_global";
import { Timer } from "../cauldron/timer";
import { XRUtils } from "../utils/xr_utils";
import { VisualText, VisualTextParams } from "../visual/elements/visual_text";

export class ShowFPSComponent extends Component {
    static TypeName = "pp-show-fps";
    static Properties = {
        _myRefreshSeconds: { type: Type.Float, default: 0.25 },
        _myTextMaterial: { type: Type.Material }
    };

    start() {
        this._myTimer = new Timer(this._myRefreshSeconds);
        this._myTotalDT = 0;
        this._myFrames = 0;

        this._myVisualFPSParent = this.object.pp_addObject();

        let visualParams = new VisualTextParams(this.engine);
        visualParams.myText = "00";

        visualParams.myTransform.mat4_setPositionRotationScale(vec3_create(-0.115, -0.115, 0.35), vec3_create(0, 180, 0), vec3_create(0.3, 0.3, 0.3));

        if (this._myTextMaterial != null) {
            visualParams.myMaterial = this._myTextMaterial.clone();
        } else {
            visualParams.myMaterial = getDefaultResources(this.engine).myMaterials.myText.clone();
            visualParams.myMaterial.color = vec4_create(1, 1, 1, 1);
        }

        visualParams.myParent = this._myVisualFPSParent;
        visualParams.myIsLocal = true;

        this._myVisualFPS = new VisualText(visualParams);

        //PP.myEasyTuneVariables.add(new PP.EasyTuneNumber("FPS X", -0.25, 0.1, 3));
        //PP.myEasyTuneVariables.add(new PP.EasyTuneNumber("FPS Y", -0.130, 0.1, 3));
        //PP.myEasyTuneVariables.add(new PP.EasyTuneNumber("FPS Z", 0.35, 0.1, 3));
    }

    update(dt) {
        // implemented outside class definition
    }
};



// IMPLEMENTATION

ShowFPSComponent.prototype.update = function () {
    let playerTransformQuat = quat2_create();
    return function update(dt) {
        this._myTotalDT += dt;
        this._myFrames++;

        this._myTimer.update(dt);
        if (this._myTimer.isDone()) {
            this._myTimer.start();

            let fps = Math.round(this._myFrames / this._myTotalDT);

            let visualParams = this._myVisualFPS.getParams();

            if (XRUtils.isSessionActive(this.engine)) {
                visualParams.myTransform.mat4_setPositionRotationScale(vec3_create(-0.115, -0.115, 0.35), vec3_create(0, 180, 0), vec3_create(0.3, 0.3, 0.3));
            } else {
                visualParams.myTransform.mat4_setPositionRotationScale(vec3_create(-0.25, -0.130, 0.35), vec3_create(0, 180, 0), vec3_create(0.3, 0.3, 0.3));
            }

            //visualParams.myTransform.mat4_setPositionRotationScale([PP.myEasyTuneVariables.get("FPS X"), PP.myEasyTuneVariables.get("FPS Y"), PP.myEasyTuneVariables.get("FPS Z")], vec3_create(0, 180, 0), vec3_create(0.3, 0.3, 0.3));

            visualParams.myText = fps.toFixed(0);
            this._myVisualFPS.paramsUpdated();

            this._myTotalDT = 0;
            this._myFrames = 0;
        }

        this._myVisualFPSParent.pp_setTransformQuat(getPlayerObjects(this.engine).myHead.pp_getTransformQuat(playerTransformQuat));
    };
}();