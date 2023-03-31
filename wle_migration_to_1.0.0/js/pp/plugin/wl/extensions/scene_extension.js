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
        - pp_getObjectsByID
        
        - pp_toString / pp_toStringCompact / pp_toStringExtended

        - pp_getComponentsAmountMap
*/

import { Scene } from "@wonderlandengine/api";
import { ExtensionUtils } from "../../utils/extension_utils";

export function initSceneExtension(engine) {
    initSceneExtensionPrototype();
}

export function initSceneExtensionPrototype() {

    let sceneExtension = {};

    sceneExtension.pp_getRoot = function pp_getRoot() {
        return this.engine.wrapObject(0);
    }

    sceneExtension.pp_addObject = function pp_addObject() {
        return this.pp_getRoot().pp_addObject();
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

    // Get Component    

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

    // Get By Name

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

    // Get By ID

    sceneExtension.pp_getObjectByID = function pp_getObjectByID(id) {
        return this.pp_getObjectByIDBreadth(id);
    }

    sceneExtension.pp_getObjectByIDBreadth = function pp_getObjectByIDBreadth(id) {
        return this.pp_getRoot().pp_getObjectByIDHierarchyBreadth(id);
    }

    sceneExtension.pp_getObjectByIDDepth = function pp_getObjectByIDDepth(id) {
        return this.pp_getRoot().pp_getObjectByIDHierarchyDepth(id);
    }

    sceneExtension.pp_getObjectsByID = function pp_getObjectsByID(id) {
        return this.pp_getObjectsByIDBreadth(id);
    }

    sceneExtension.pp_getObjectsByIDBreadth = function pp_getObjectsByIDBreadth(id) {
        return this.pp_getRoot().pp_getObjectsByIDHierarchyBreadth(id);
    }

    sceneExtension.pp_getObjectsByIDDepth = function pp_getObjectsByIDDepth(id) {
        return this.pp_getRoot().pp_getObjectsByIDHierarchyDepth(id);
    }

    // To String

    sceneExtension.pp_toString = function pp_toString() {
        return this.pp_toStringCompact();
    }

    sceneExtension.pp_toStringCompact = function pp_toStringCompact() {
        return this.pp_getRoot().pp_toStringCompact();
    }

    sceneExtension.pp_toStringExtended = function pp_toStringExtended() {
        return this.pp_getRoot().pp_toStringExtended();
    }

    // Cauldron

    sceneExtension.pp_getComponentsAmountMap = function pp_getComponentsAmountMap(amountMap = new Map()) {
        return this.pp_getRoot().pp_getComponentsAmountMap(amountMap);
    }



    ExtensionUtils.assignProperties(sceneExtension, Scene.prototype, false, true, true);

}