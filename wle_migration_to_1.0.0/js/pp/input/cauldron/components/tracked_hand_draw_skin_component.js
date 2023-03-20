import { Component, Type } from "@wonderlandengine/api";

export class TrackedHandDrawSkinComponent extends Component {
    static TypeName = "pp-tracked-hand-draw-skin";
    static Properties = {
        _myHandedness: { type: Type.Enum, values: ["left", "right"], default: "left" },
        _myFixForward: { type: Type.Bool, default: true },
        _myHandSkin: { type: Type.Skin, default: null }
    };

    init() {
        this._myHandednessInternal = PP.InputUtils.getHandednessByIndex(this._myHandedness);

        this._myTrackedHandPose = new PP.TrackedHandPose(this._myHandednessInternal);
        this._myTrackedHandPose.setFixForward(this._myFixForward);
    }

    start() {
        this._myTrackedHandPose.start();

        this._prepareJoints();
    }

    update(dt) {
        this._myTrackedHandPose.update(dt);

        for (let i = 0; i < this._myJoints.length; i++) {
            let jointObject = this._myJoints[i];

            let jointID = jointObject.name; // joint name must match the PP.TrackedHandJointID enum value
            let jointPose = this._myTrackedHandPose.getJointPose(jointID);

            jointObject.pp_setTransformLocalQuat(jointPose.getTransformQuat());
        }
    }

    _prepareJoints() {
        this._myJoints = [];

        let skinJointIDs = this._myHandSkin.jointIds;

        for (let i = 0; i < skinJointIDs.length; i++) {
            this._myJoints[i] = new WL.Object(skinJointIDs[i]);
        }
    }
};