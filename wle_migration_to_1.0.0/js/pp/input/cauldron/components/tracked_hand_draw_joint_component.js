import { Component, MeshComponent, Property } from "@wonderlandengine/api";
import { quat2_create } from "../../../plugin/js/extensions/array_extension";
import { Globals } from "../../../pp/globals";
import { BasePoseParams } from "../../pose/base_pose";
import { TrackedHandJointPose } from "../../pose/tracked_hand_joint_pose";
import { InputUtils } from "../input_utils";

export class TrackedHandDrawJointComponent extends Component {
    static TypeName = "pp-tracked-hand-draw-joint";
    static Properties = {
        _myHandedness: Property.enum(["Left", "Right"], "Left"),
        _myJointID: Property.enum(
            [
                "Wrist",
                "Thumb Metacarpal", "Thumb Phalanx Proximal", "Thumb Phalanx Distal", "Thumb Tip",
                "Index Metacarpal", "Index Phalanx Proximal", "Index Phalanx Intermediate", "Index Phalanx Distal", "Index Tip",
                "Middle Metacarpal", "Middle Phalanx Proximal", "Middle Phalanx Intermediate", "Middle Phalanx Distal", "Middle Tip",
                "Ring Metacarpal", "Ring Phalanx Proximal", "Ring Phalanx Intermediate", "Ring Phalanx Distal", "Ring Tip",
                "Pinky Metacarpal", "Pinky Phalanx Proximal", "Pinky Phalanx Intermediate", "Pinky Phalanx Distal", "Pinky Tip"
            ],
            "Wrist"),
        _myJointMesh: Property.mesh(),
        _myJointMaterial: Property.material()
    };

    start() {
        this._myHandednessType = InputUtils.getHandednessByIndex(this._myHandedness);
        this._myJointIDInternal = InputUtils.getJointIDByIndex(this._myJointID);

        this._myTrackedHandJointPose = new TrackedHandJointPose(this._myHandednessType, this._myJointIDInternal, new BasePoseParams(this.engine));
        this._myTrackedHandJointPose.setForwardFixed(Globals.isPoseForwardFixed(this.engine));
        this._myTrackedHandJointPose.start();

        this._buildTrackedHandHierarchy();
    }

    update(dt) {
        // Implemented outside class definition
    }

    _buildTrackedHandHierarchy() {
        this._myJointMeshObject = this.object.pp_addObject();

        let mesh = this._myJointMeshObject.pp_addComponent(MeshComponent);
        mesh.mesh = this._myJointMesh;
        mesh.material = this._myJointMaterial;

        this._myJointMeshObject.pp_setScaleLocal(0);
    }

    onDestroy() {
        this._myTrackedHandJointPose?.destroy();
    }
}



// IMPLEMENTATION

TrackedHandDrawJointComponent.prototype.update = function () {
    let transformQuat = quat2_create()
    return function update(dt) {
        this._myTrackedHandJointPose.setForwardFixed(Globals.isPoseForwardFixed(this.engine));
        this._myTrackedHandJointPose.update(dt);
        this._myJointMeshObject.pp_setTransformLocalQuat(this._myTrackedHandJointPose.getTransformQuat(transformQuat, null));
        this._myJointMeshObject.pp_setScaleLocal(this._myTrackedHandJointPose.getJointRadius());
    };
}();