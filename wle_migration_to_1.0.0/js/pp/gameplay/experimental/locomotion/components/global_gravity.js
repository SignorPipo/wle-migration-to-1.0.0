import { Component, Type } from "@wonderlandengine/api";

export class GlobalGravityComponent extends Component {
    static TypeName = "pp-global-gravity";
    static Properties = {};

    init() {
    }
};

PP.myGravityAcceleration = 0;
PP.myGravityDirection = PP.vec3_create();