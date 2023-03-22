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
        
        - pp_toString / pp_toStringCompact / pp_toStringExtended

        - pp_getComponentsAmountMap
        
    GLOBAL FUNCTIONS:
        - getScene
*/

import { Scene } from "@wonderlandengine/api";
import { ExtensionUtils } from "../../utils/extension_utils";

let myMainScene = null;
let myScenes = [];

export function initSceneExtension(engine) {
    if (engine != null) {
        engine.onSceneLoaded.push(() => {
            let newScene = engine.scene;
            if (!hasScene(newScene)) {
                myScenes.push(newScene);
                if (getMainScene() == null) {
                    setMainScene(newScene);
                }
            }
        });
    }

    initSceneExtensionPrototype();
}

export function getMainScene() {
    return myMainScene;
}

export function setMainScene(scene) {
    if (hasScene(scene)) {
        myMainScene = scene;
    }
}

export function getScenes() {
    return myScenes;
}

export function hasScene(scene) {
    return myScenes.indexOf(scene) >= 0;
}

export function initSceneExtensionPrototype() {

    let sceneExtension = {};

    sceneExtension.pp_getRoot = function pp_getRoot() {
        return this.engine.wrapObject(0);
    }

    sceneExtension.pp_getObjects = function pp_getObjects() {
        return this.pp_getObjectsBreadth();
    }

    sceneExtension.pp_getObjectsBreadth = function pp_getObjectsBreadth() {
        return this.pp_getRoot().pp_getHierarchyBreadth();
    }

    sceneExtension.pp_getObjectsDepth = function pp_getObjectsDepth() {
        return this.pp_getRoot().pp_getHierarchyDepth();
    }

    //Get Component    

    sceneExtension.pp_getComponent = function pp_getComponent(type, index = 0) {
        return this.pp_getComponentBreadth(type, index);
    }

    sceneExtension.pp_getComponentBreadth = function pp_getComponentBreadth(type, index = 0) {
        return this.pp_getRoot().pp_getComponentHierarchyBreadth(type, index);
    }

    sceneExtension.pp_getComponentDepth = function pp_getComponentDepth(type, index = 0) {
        return this.pp_getRoot().pp_getComponentHierarchyDepth(type, index);
    }

    sceneExtension.pp_getComponents = function pp_getComponents(type) {
        return this.pp_getComponentsBreadth(type);
    }

    sceneExtension.pp_getComponentsBreadth = function pp_getComponentsBreadth(type) {
        return this.pp_getRoot().pp_getComponentsHierarchyBreadth(type);
    }

    sceneExtension.pp_getComponentsDepth = function pp_getComponentsDepth(type) {
        return this.pp_getRoot().pp_getComponentsHierarchyDepth(type);
    }

    //Get By Name

    sceneExtension.pp_getObjectByName = function pp_getObjectByName(name) {
        return this.pp_getObjectByNameBreadth(name);
    }

    sceneExtension.pp_getObjectByNameBreadth = function pp_getObjectByNameBreadth(name) {
        return this.pp_getRoot().pp_getObjectByNameHierarchyBreadth(name);
    }

    sceneExtension.pp_getObjectByNameDepth = function pp_getObjectByNameDepth(name) {
        return this.pp_getRoot().pp_getObjectByNameHierarchyDepth(name);
    }

    sceneExtension.pp_getObjectsByName = function pp_getObjectsByName(name) {
        return this.pp_getObjectsByNameBreadth(name);
    }

    sceneExtension.pp_getObjectsByNameBreadth = function pp_getObjectsByNameBreadth(name) {
        return this.pp_getRoot().pp_getObjectsByNameHierarchyBreadth(name);
    }

    sceneExtension.pp_getObjectsByNameDepth = function pp_getObjectsByNameDepth(name) {
        return this.pp_getRoot().pp_getObjectsByNameHierarchyDepth(name);
    }

    //To String

    sceneExtension.pp_toString = function pp_toString() {
        return this.pp_toStringCompact();
    }

    sceneExtension.pp_toStringCompact = function pp_toStringCompact() {
        return this.pp_getRoot().pp_toStringCompact();
    }

    sceneExtension.pp_toStringExtended = function pp_toStringExtended() {
        return this.pp_getRoot().pp_toStringExtended();
    }

    //Cauldron

    sceneExtension.pp_getComponentsAmountMap = function pp_getComponentsAmountMap(amountMap = new Map()) {
        return this.pp_getRoot().pp_getComponentsAmountMapHierarchy(amountMap);
    }



    ExtensionUtils.assignProperties(sceneExtension, Scene.prototype, false, true, true);

}