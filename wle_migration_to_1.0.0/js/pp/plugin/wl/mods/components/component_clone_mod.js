import { CollisionComponent, MeshComponent, PhysXComponent, TextComponent } from "@wonderlandengine/api";
import { CloneUtils } from "../../../../cauldron/utils/clone_utils";
import { MeshUtils } from "../../../../cauldron/utils/mesh_utils";
import { DeepCloneSetup } from "../../extensions/object_extension";

export function initComponentCloneMod() {

    MeshComponent.prototype.pp_clone = function pp_clone(targetObject, deepCloneSetup = new DeepCloneSetup(), customCloneSetup = null) {
        let clonedComponent = CloneUtils.cloneComponentBase(this, targetObject);

        if (deepCloneSetup.isDeepCloneComponentVariable(MeshComponent.TypeName, "material")) {
            clonedComponent.material = this.material.clone();
        }

        if (deepCloneSetup.isDeepCloneComponentVariable(MeshComponent.TypeName, "mesh")) {
            clonedComponent.mesh = MeshUtils.cloneMesh(this.mesh);
        }

        return clonedComponent;
    };

    CollisionComponent.prototype.pp_clone = function pp_clone(targetObject, deepCloneSetup = new DeepCloneSetup(), customCloneSetup = null) {
        let clonedComponent = CloneUtils.cloneComponentBase(this, targetObject);

        return clonedComponent;
    };

    TextComponent.prototype.pp_clone = function pp_clone(targetObject, deepCloneSetup = new DeepCloneSetup(), customCloneSetup = null) {
        let clonedComponent = CloneUtils.cloneComponentBase(this, targetObject);

        if (deepCloneSetup.isDeepCloneComponent(TextComponent.TypeName)) {
            clonedComponent.text = this.text.slice(0);
        }

        if (deepCloneSetup.isDeepCloneComponentVariable(TextComponent.TypeName, "material")) {
            clonedComponent.material = this.material.clone();
        }

        return clonedComponent;
    };

    PhysXComponent.prototype.pp_clone = function pp_clone(targetObject, deepCloneSetup = new DeepCloneSetup(), customCloneSetup = null) {
        let clonedComponent = CloneUtils.cloneComponentBase(this, targetObject);

        return clonedComponent;
    };



    Object.defineProperty(MeshComponent.prototype, "pp_clone", { enumerable: false });
    Object.defineProperty(CollisionComponent.prototype, "pp_clone", { enumerable: false });
    Object.defineProperty(TextComponent.prototype, "pp_clone", { enumerable: false });
    Object.defineProperty(PhysXComponent.prototype, "pp_clone", { enumerable: false });
}