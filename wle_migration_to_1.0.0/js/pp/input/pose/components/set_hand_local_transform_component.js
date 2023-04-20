import { Component, Property } from "@wonderlandengine/api";
import { quat2_create } from "../../../plugin/js/extensions/array_extension";
import { Globals } from "../../../pp/globals";
import { InputUtils } from "../../cauldron/input_utils";
import { HandPose, HandPoseParams } from "../hand_pose";

export class SetHandLocalTransformComponent extends Component {
    static TypeName = "pp-set-hand-local-transform";
    static Properties = {
        _myHandedness: Property.enum(["Left", "Right"], "Left")
    };

    start() {
        this._myHandPose = new HandPose(InputUtils.getHandednessByIndex(this._myHandedness), new HandPoseParams(this.engine));
        this._myHandPose.setFixForward(Globals.isPoseForwardFixed(this.engine));
        this._myHandPose.registerPoseUpdatedEventListener(this, this.onPoseUpdated.bind(this));
        this._myHandPose.start();

        this.update(0);
    }

    update(dt) {
        this._myHandPose.setFixForward(Globals.isPoseForwardFixed(this.engine));
        this._myHandPose.update(dt);
    }

    onPoseUpdated() {
        // Implemented outside class definition
    }
}



// IMPLEMENTATION

SetHandLocalTransformComponent.prototype.onPoseUpdated = function () {
    let handPoseTransform = quat2_create()
    return function onPoseUpdated() {
        this.object.pp_setTransformLocalQuat(this._myHandPose.getTransformQuat(handPoseTransform));
    };
}();