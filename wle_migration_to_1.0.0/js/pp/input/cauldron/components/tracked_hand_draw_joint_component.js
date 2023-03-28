import { Component, MeshComponent, Type } from "@wonderlandengine/api";
import { BasePoseParams } from "../../pose/base_pose";
import { TrackedHandJointPose } from "../../pose/tracked_hand_joint_pose";
import { InputUtils } from "../input_utils";

export class TrackedHandDrawJointComponent extends Component {
    static TypeName = "pp-tracked-hand-draw-joint";
    static Properties = {
        _myHandedness: { type: Type.Enum, values: ["left", "right"], default: "left" },
        _myFixForward: { type: Type.Bool, default: true },
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
        },
        _myJointMesh: { type: Type.Mesh },
        _myJointMaterial: { type: Type.Material }
    };

    init() {
        this._myHandednessInternal = InputUtils.getHandednessByIndex(this._myHandedness);
        this._myJointIDInternal = InputUtils.getJointIDByIndex(this._myJointID);

        this._myTrackedHandJointPose = new TrackedHandJointPose(this._myHandednessInternal, this._myJointIDInternal, new BasePoseParams(this.engine));
        this._myTrackedHandJointPose.setFixForward(this._myFixForward);
    }

    start() {
        this._myTrackedHandJointPose.start();

        this._buildTrackedHandHierarchy();
    }

    update(dt) {
        this._myTrackedHandJointPose.update(dt);
        this._myJointMeshObject.pp_setTransformLocalQuat(this._myTrackedHandJointPose.getTransformQuat());
        this._myJointMeshObject.pp_setScaleLocal(this._myTrackedHandJointPose.getJointRadius());
    }

    _buildTrackedHandHierarchy() {
        this._myJointMeshObject = this.object.pp_addObject();

        let mesh = this._myJointMeshObject.pp_addComponent(MeshComponent);
        mesh.mesh = this._myJointMesh;
        mesh.material = this._myJointMaterial;

        this._myJointMeshObject.pp_setScaleLocal(0);
    }
};