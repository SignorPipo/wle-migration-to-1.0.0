export function getRoot(scene) {
    return scene.engine.wrapObject(0);
}

export function addObject(scene) {
    return SceneUtils.getRoot(scene).pp_addObject();
}

export function getObjects(scene) {
    return SceneUtils.getObjectsBreadth(scene);
}

export function getObjectsBreadth(scene) {
    return SceneUtils.getRoot(scene).pp_getHierarchyBreadth();
}

export function getObjectsDepth(scene) {
    return SceneUtils.getRoot(scene).pp_getHierarchyDepth();
}

// Get Component    

export function getComponent(scene, type, index = 0) {
    return SceneUtils.getComponentBreadth(scene, type, index);
}

export function getComponentBreadth(scene, type, index = 0) {
    return SceneUtils.getRoot(scene).pp_getComponentHierarchyBreadth(type, index);
}

export function getComponentDepth(scene, type, index = 0) {
    return SceneUtils.getRoot(scene).pp_getComponentHierarchyDepth(type, index);
}

export function getComponents(scene, type) {
    return SceneUtils.getComponentsBreadth(scene, type);
}

export function getComponentsBreadth(scene, type) {
    return SceneUtils.getRoot(scene).pp_getComponentsHierarchyBreadth(type);
}

export function getComponentsDepth(scene, type) {
    return SceneUtils.getRoot(scene).pp_getComponentsHierarchyDepth(type);
}

// Get Object By Name

export function getObjectByName(scene, name, index = 0) {
    return SceneUtils.getObjectByNameBreadth(scene, name, index);
}

export function getObjectByNameBreadth(scene, name, index = 0) {
    return SceneUtils.getRoot(scene).pp_getObjectByNameHierarchyBreadth(name, index);
}

export function getObjectByNameDepth(scene, name, index = 0) {
    return SceneUtils.getRoot(scene).pp_getObjectByNameHierarchyDepth(name, index);
}

export function getObjectsByName(scene, name, index = 0) {
    return SceneUtils.getObjectsByNameBreadth(scene, name, index);
}

export function getObjectsByNameBreadth(scene, name, index = 0) {
    return SceneUtils.getRoot(scene).pp_getObjectsByNameHierarchyBreadth(name, index);
}

export function getObjectsByNameDepth(scene, name, index = 0) {
    return SceneUtils.getRoot(scene).pp_getObjectsByNameHierarchyDepth(name, index);
}

// Get Object By ID

export function getObjectByID(scene, id) {
    return SceneUtils.getObjectByIDBreadth(scene, id);
}

export function getObjectByIDBreadth(scene, id) {
    return SceneUtils.getRoot(scene).pp_getObjectByIDHierarchyBreadth(id);
}

export function getObjectByIDDepth(scene, id) {
    return SceneUtils.getRoot(scene).pp_getObjectByIDHierarchyDepth(id);
}

// To String

export function toString(scene) {
    return SceneUtils.toStringCompact(scene);
}

export function toStringCompact(scene) {
    return SceneUtils.getRoot(scene).pp_toStringCompact();
}

export function toStringExtended(scene) {
    return SceneUtils.getRoot(scene).pp_toStringExtended();
}

// Cauldron

export function getComponentsAmountMap(scene, amountMap = new Map()) {
    return SceneUtils.getRoot(scene).pp_getComponentsAmountMap(amountMap);
}

export let SceneUtils = {
    getRoot,
    addObject,
    getObjects,
    getObjectsBreadth,
    getObjectsDepth,
    getComponent,
    getComponentBreadth,
    getComponentDepth,
    getComponents,
    getComponentsBreadth,
    getComponentsDepth,
    getObjectByName,
    getObjectByNameBreadth,
    getObjectByNameDepth,
    getObjectsByName,
    getObjectsByNameBreadth,
    getObjectsByNameDepth,
    getObjectByID,
    getObjectByIDBreadth,
    getObjectByIDDepth,
    toString,
    toStringCompact,
    toStringExtended,
    getComponentsAmountMap
};