import { Component, Type } from "@wonderlandengine/api";
import { quat2_create } from "../../../plugin/js/extensions/array_extension";
import { InputUtils } from "../../cauldron/input_utils";
import { TrackedHandJointPose } from "../tracked_hand_joint_pose";

export class SetTrackedHandJointLocalTransformComponent extends Component {
    static TypeName = "pp-set-tracked-hand-joint-local-transform";
    static Properties = {
        _myHandedness: { type: Type.Enum, values: ["left", "right"], default: "left" },
        _myFixForward: { type: Type.Bool, default: true },
        _myUpdateOnViewReset: { type: Type.Bool, default: true },
        _mySetLocalScaleAsJointRadius: { type: Type.Bool, default: false },
        _myJointID: {
            type: Type.Enum, values:
                [
                    "wrist",
                    "thumb metacarpal", "thumb phalanx proximal", "thumb phalanx distal", "thumb tip",
                    "index metacarpal", "index phalanx proximal", "index phalanx intermediate", "index phalanx distal", "index tip",
                    "middle metacarpal", "middle phalanx proximal", "middle phalanx intermediate", "middle phalanx distal", "middle tip",
                    "ring metacarpal", "ring phalanx proximal", "ring phalanx intermediate", "ring phalanx distal", "ring tip",
                    "pinky metacarpal", "pinky phalanx proximal", "pinky phalanx intermediate", "pinky phalanx distal", "pinky tip"
                ],
            default: "wrist"
        }
    };

    init() {
        this._myHandednessInternal = InputUtils.getHandednessByIndex(this._myHandedness);
        this._myJointIDInternal = InputUtils.getJointIDByIndex(this._myJointID);

        this._myTrackedHandJointPose = new TrackedHandJointPose(this._myHandednessInternal, this._myJointIDInternal, new BasePoseParams(this.engine));
        this._myTrackedHandJointPose.setFixForward(this._myFixForward);
        this._myTrackedHandJointPose.setUpdateOnViewReset(this._myUpdateOnViewReset);
        this._myTrackedHandJointPose.registerPoseUpdatedEventListener(this, this.onPoseUpdated.bind(this));
    }

    start() {
        this._myTrackedHandJointPose.start();
        this.update(0);
    }

    update(dt) {
        this._myTrackedHandJointPose.update(dt);
    }

    onPoseUpdated() {
        // implemented outside class definition
    }
};



// IMPLEMENTATION

SetTrackedHandJointLocalTransformComponent.prototype.onPoseUpdated = function () {
    let jointPoseTransform = quat2_create()
    return function onPoseUpdated() {
        this.object.pp_setTransformLocalQuat(this._myTrackedHandJointPose.getTransformQuat(jointPoseTransform));

        if (this._mySetLocalScaleAsJointRadius) {
            this.object.pp_setScaleLocal(this._myTrackedHandJointPose.getJointRadius());
        }
    }
}();