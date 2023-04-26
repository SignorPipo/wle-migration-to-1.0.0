import { Component, Property } from "@wonderlandengine/api";
import { Globals } from "../../../pp/globals";
import { TrackedHandPose, TrackedHandPoseParams } from "../../pose/tracked_hand_pose";
import { InputUtils } from "../input_utils";

export class TrackedHandDrawSkinComponent extends Component {
    static TypeName = "pp-tracked-hand-draw-skin";
    static Properties = {
        _myHandedness: Property.enum(["Left", "Right"], "Left"),
        _myHandSkin: Property.skin(null)
    };

    start() {
        this._myHandednessType = InputUtils.getHandednessByIndex(this._myHandedness);

        this._myTrackedHandPose = new TrackedHandPose(this._myHandednessType, new TrackedHandPoseParams(true, this.engine));
        this._myTrackedHandPose.setForwardFixed(Globals.isPoseForwardFixed(this.engine));
        this._myTrackedHandPose.start();

        this._prepareJoints();
    }

    update(dt) {
        this._myTrackedHandPose.setForwardFixed(Globals.isPoseForwardFixed(this.engine));
        this._myTrackedHandPose.update(dt);

        for (let i = 0; i < this._myJoints.length; i++) {
            let jointObject = this._myJoints[i];

            let jointID = jointObject.pp_getName(); // Joint name must match the TrackedHandJointID enum value
            let jointPose = this._myTrackedHandPose.getJointPose(jointID);

            jointObject.pp_setTransformLocalQuat(jointPose.getTransformQuat());
        }
    }

    _prepareJoints() {
        this._myJoints = [];

        let skinJointIDs = this._myHandSkin.jointIds;

        for (let i = 0; i < skinJointIDs.length; i++) {
            this._myJoints[i] = this.engine.wrapObject(skinJointIDs[i]);
        }
    }

    onDestroy() {
        this._myTrackedHandPose?.destroy();
    }
}