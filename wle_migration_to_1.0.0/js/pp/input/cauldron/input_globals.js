import { Globals } from "../../pp/globals";

let _myInputManagers = new WeakMap();
let _myPoseForwardFixeds = new WeakMap();

export function getInputManager(engine = Globals.getMainEngine()) {
    return _myInputManagers.get(engine);
}

export function setInputManager(inputManager, engine = Globals.getMainEngine()) {
    _myInputManagers.set(engine, inputManager);
}

export function removeInputManager(engine = Globals.getMainEngine()) {
    _myInputManagers.delete(engine);
}

export function hasInputManager(engine = Globals.getMainEngine()) {
    return _myInputManagers.has(engine);
}

export function getMouse(engine = Globals.getMainEngine()) {
    let inputManager = getInputManager(engine);
    if (inputManager != null) {
        return inputManager.getMouse();
    }

    return null;
}

export function getKeyboard(engine = Globals.getMainEngine()) {
    let inputManager = getInputManager(engine);
    if (inputManager != null) {
        return inputManager.getKeyboard();
    }

    return null;
}

export function getGamepadsManager(engine = Globals.getMainEngine()) {
    let inputManager = getInputManager(engine);
    if (inputManager != null) {
        return inputManager.getGamepadsManager();
    }

    return null;
}

export function getGamepads(engine = Globals.getMainEngine()) {
    let inputManager = getInputManager(engine);
    if (inputManager != null) {
        return inputManager.getGamepadsManager().getGamepads();
    }

    return null;
}

export function getLeftGamepad(engine = Globals.getMainEngine()) {
    let inputManager = getInputManager(engine);
    if (inputManager != null) {
        return inputManager.getGamepadsManager().getLeftGamepad();
    }

    return null;
}

export function getRightGamepad(engine = Globals.getMainEngine()) {
    let inputManager = getInputManager(engine);
    if (inputManager != null) {
        return inputManager.getGamepadsManager().getRightGamepad();
    }

    return null;
}

export function isPoseForwardFixed(engine = Globals.getMainEngine()) {
    return _myPoseForwardFixeds.get(engine);
}

export function setPoseForwardFixed(toolEnabled, engine = Globals.getMainEngine()) {
    _myPoseForwardFixeds.set(engine, toolEnabled);
}

export function removePoseForwardFixed(engine = Globals.getMainEngine()) {
    _myPoseForwardFixeds.delete(engine);
}

export function hasPoseForwardFixed(engine = Globals.getMainEngine()) {
    return _myPoseForwardFixeds.has(engine);
}