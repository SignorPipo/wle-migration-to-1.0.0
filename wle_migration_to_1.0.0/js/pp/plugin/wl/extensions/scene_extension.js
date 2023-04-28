/*
    How to use

    On some of the functions u can specify if the algorithm should explore by Breadth/Depth, example:
        - pp_getObjectByNameBreadth
        - pp_getComponentsDepth
    By default the functions explore by Breadth

    List of functions:
        - pp_getRoot
        - pp_getObjects
        
        - pp_getComponent
        - pp_getComponents
        
        - pp_getObjectByName
        - pp_getObjectsByName
        
        - pp_getObjectByID
        
        - pp_toString / pp_toStringCompact / pp_toStringExtended

        - pp_getComponentsAmountMap
*/

import { Scene } from "@wonderlandengine/api";
import { SceneUtils } from "../../../cauldron/wl/utils/scene_utils";
import { PluginUtils } from "../../utils/plugin_utils";

export function initSceneExtension(engine) {
    initSceneExtensionPrototype();
}

export function initSceneExtensionPrototype() {
    let sceneExtension = {};
    PluginUtils.assignProperties(SceneUtils, sceneExtension, false, true, true, true, true, "pp_");
    PluginUtils.assignProperties(sceneExtension, Scene.prototype, false, true, true);
}