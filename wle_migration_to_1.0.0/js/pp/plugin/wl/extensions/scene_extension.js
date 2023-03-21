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
import { getMainEngine } from "./engine_extension";

export function initSceneExtension() {
    initSceneExtensionPrototype();
}

export function getScene(engine = getMainEngine()) {
    return engine.scene;
}

export function initSceneExtensionPrototype() {

    Scene.prototype.pp_getRoot = function pp_getRoot() {
        return this.engine.wrapObject(0);
    }

    Scene.prototype.pp_getObjects = function pp_getObjects() {
        return this.pp_getObjectsBreadth();
    }

    Scene.prototype.pp_getObjectsBreadth = function pp_getObjectsBreadth() {
        return this.pp_getRoot().pp_getHierarchyBreadth();
    }

    Scene.prototype.pp_getObjectsDepth = function pp_getObjectsDepth() {
        return this.pp_getRoot().pp_getHierarchyDepth();
    }

    //Get Component    

    Scene.prototype.pp_getComponent = function pp_getComponent(type, index = 0) {
        return this.pp_getComponentBreadth(type, index);
    }

    Scene.prototype.pp_getComponentBreadth = function pp_getComponentBreadth(type, index = 0) {
        return this.pp_getRoot().pp_getComponentHierarchyBreadth(type, index);
    }

    Scene.prototype.pp_getComponentDepth = function pp_getComponentDepth(type, index = 0) {
        return this.pp_getRoot().pp_getComponentHierarchyDepth(type, index);
    }

    Scene.prototype.pp_getComponents = function pp_getComponents(type) {
        return this.pp_getComponentsBreadth(type);
    }

    Scene.prototype.pp_getComponentsBreadth = function pp_getComponentsBreadth(type) {
        return this.pp_getRoot().pp_getComponentsHierarchyBreadth(type);
    }

    Scene.prototype.pp_getComponentsDepth = function pp_getComponentsDepth(type) {
        return this.pp_getRoot().pp_getComponentsHierarchyDepth(type);
    }

    //Get By Name

    Scene.prototype.pp_getObjectByName = function pp_getObjectByName(name) {
        return this.pp_getObjectByNameBreadth(name);
    }

    Scene.prototype.pp_getObjectByNameBreadth = function pp_getObjectByNameBreadth(name) {
        return this.pp_getRoot().pp_getObjectByNameHierarchyBreadth(name);
    }

    Scene.prototype.pp_getObjectByNameDepth = function pp_getObjectByNameDepth(name) {
        return this.pp_getRoot().pp_getObjectByNameHierarchyDepth(name);
    }

    Scene.prototype.pp_getObjectsByName = function pp_getObjectsByName(name) {
        return this.pp_getObjectsByNameBreadth(name);
    }

    Scene.prototype.pp_getObjectsByNameBreadth = function pp_getObjectsByNameBreadth(name) {
        return this.pp_getRoot().pp_getObjectsByNameHierarchyBreadth(name);
    }

    Scene.prototype.pp_getObjectsByNameDepth = function pp_getObjectsByNameDepth(name) {
        return this.pp_getRoot().pp_getObjectsByNameHierarchyDepth(name);
    }

    //To String

    Scene.prototype.pp_toString = function pp_toString() {
        return this.pp_toStringCompact();
    }

    Scene.prototype.pp_toStringCompact = function pp_toStringCompact() {
        return this.pp_getRoot().pp_toStringCompact();
    }

    Scene.prototype.pp_toStringExtended = function pp_toStringExtended() {
        return this.pp_getRoot().pp_toStringExtended();
    }

    //Cauldron

    Scene.prototype.pp_getComponentsAmountMap = function pp_getComponentsAmountMap(amountMap = new Map()) {
        return this.pp_getRoot().pp_getComponentsAmountMapHierarchy(amountMap);
    }



    for (let key in Scene.prototype) {
        let prefixes = ["pp_", "_pp_"];

        let found = false;
        for (let prefix of prefixes) {
            if (key.startsWith(prefix)) {
                found = true;
                break;
            }
        }

        if (found) {
            Object.defineProperty(Scene.prototype, key, { enumerable: false });
        }
    }

}