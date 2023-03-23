import { TextComponent } from "@wonderlandengine/api";

export function setClonedMaterials(object) {
    let textComponents = object.pp_getComponentsHierarchy(TextComponent);

    for (let textComponent of textComponents) {
        textComponent.material = textComponent.material.clone();
    }
}

export let TextUtils = {
    setClonedMaterials
};