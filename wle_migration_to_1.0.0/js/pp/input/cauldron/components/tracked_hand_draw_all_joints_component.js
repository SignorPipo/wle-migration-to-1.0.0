import { Component, Type } from "@wonderlandengine/api";

export class TrackedHandDrawAllJointsComponent extends Component {
    static TypeName = "pp-tracked-hand-draw-all-joints";
    static Properties = {
        _myHandedness: { type: Type.Enum, values: ["left", "right"], default: "left" },
        _myFixForward: { type: Type.Bool, default: true },
        _myHideMetacarpals: { type: Type.Bool, default: true },
        _myJointMesh: { type: Type.Mesh },
        _myJointMaterial: { type: Type.Material }
    };

    start() {
        this._buildTrackedHandHierarchy();
    }

    _buildTrackedHandHierarchy() {
        this._myTrackedHandMeshObject = this.object.pp_addObject();

        this._myJointMeshObjectList = [];

        for (let jointIDKey in PP.TrackedHandJointID) {
            let jointID = PP.TrackedHandJointID[jointIDKey];
            if (!this._myHideMetacarpals ||
                (jointID != PP.TrackedHandJointID.THUMB_METACARPAL &&
                    jointID != PP.TrackedHandJointID.INDEX_FINGER_METACARPAL && jointID != PP.TrackedHandJointID.MIDDLE_FINGER_METACARPAL &&
                    jointID != PP.TrackedHandJointID.RING_FINGER_METACARPAL && jointID != PP.TrackedHandJointID.PINKY_FINGER_METACARPAL)
            ) {
                let jointObject = this._myTrackedHandMeshObject.pp_addObject();
                this._myJointMeshObjectList[jointID] = jointObject;

                jointObject.pp_addComponent("pp-tracked-hand-draw-joint",
                    {
                        "_myHandedness": this._myHandedness,
                        "_myFixForward": this._myFixForward,
                        "_myJointID": PP.TrackedHandJointIDIndex[jointIDKey],
                        "_myJointMesh": this._myJointMesh,
                        "_myJointMaterial": this._myJointMaterial,
                    });

            }
        }
    }
};