/**
 * /!\ This file is auto-generated.
 *
 * This is the entry point of your standalone application.
 *
 * There are multiple tags used by the editor to inject code automatically:
 *     - `wle:auto-imports:start` and `wle:auto-imports:end`: The list of import statements
 *     - `wle:auto-register:start` and `wle:auto-register:end`: The list of component to register
 *     - `wle:auto-constants:start` and `wle:auto-constants:end`: The project"s constants,
 *        such as the project"s name, whether it should use the physx runtime, etc...
 *     - `wle:auto-benchmark:start` and `wle:auto-benchmark:end`: Append the benchmarking code
 */

import * as API from "@wonderlandengine/api"; // Deprecated: Backward compatibility.

/* wle:auto-imports:start */
import {ConsoleVRToolComponent} from './pp/index.js';
import {EasyTuneToolComponent} from './pp/index.js';
import {GamepadMeshAnimatorComponent} from './pp/index.js';
import {PPGatewayComponent} from './pp/index.js';
import {SetHandLocalTransformComponent} from './pp/index.js';
import {SetHeadLocalTransformComponent} from './pp/index.js';
import {SetHeadNonVRLocalTransformComponent} from './pp/index.js';
import {SetHeadVRLocalTransformComponent} from './pp/index.js';
import {SpatialAudioListenerComponent} from './pp/index.js';
import {SwitchHandObjectComponent} from './pp/index.js';
import {ToolCursorComponent} from './pp/index.js';
import {TrackedHandDrawAllJointsComponent} from './pp/index.js';
import {VirtualGamepadComponent} from './pp/index.js';
/* wle:auto-imports:end */

import { loadRuntime } from "@wonderlandengine/api";
import { initPP } from "./pp/index.js";
import { initPlayground } from "./playground/init_playground.js";

/* wle:auto-constants:start */
const ProjectName = 'wle_migration_to_1.0.0';
const RuntimeBaseName = 'WonderlandRuntime';
const WithPhysX = true;
const WithLoader = false;
/* wle:auto-constants:end */

const engine = await loadRuntime(RuntimeBaseName, {
    physx: WithPhysX,
    loader: WithLoader
});
Object.assign(engine, API); // Deprecated: Backward compatibility.
window.WL = engine; // Deprecated: Backward compatibility.

Object.defineProperty(API.Object.prototype, "engine", {
    get: function () { return this._engine; }
});
Object.defineProperty(API.Scene.prototype, "engine", {
    get: function () { return this._engine; }
});
Object.defineProperty(API.Mesh.prototype, "engine", {
    get: function () { return this._engine; }
});

engine.onSceneLoaded.push(() => {
    const el = document.getElementById("version");
    if (el) setTimeout(() => el.remove(), 2000);
});

const arButton = document.getElementById("ar-button");
if (arButton) {
    arButton.dataset.supported = engine.arSupported;
}
const vrButton = document.getElementById("vr-button");
if (vrButton) {
    vrButton.dataset.supported = engine.vrSupported;
}

/* wle:auto-register:start */
engine.registerComponent(ConsoleVRToolComponent);
engine.registerComponent(EasyTuneToolComponent);
engine.registerComponent(GamepadMeshAnimatorComponent);
engine.registerComponent(PPGatewayComponent);
engine.registerComponent(SetHandLocalTransformComponent);
engine.registerComponent(SetHeadLocalTransformComponent);
engine.registerComponent(SetHeadNonVRLocalTransformComponent);
engine.registerComponent(SetHeadVRLocalTransformComponent);
engine.registerComponent(SpatialAudioListenerComponent);
engine.registerComponent(SwitchHandObjectComponent);
engine.registerComponent(ToolCursorComponent);
engine.registerComponent(TrackedHandDrawAllJointsComponent);
engine.registerComponent(VirtualGamepadComponent);
/* wle:auto-register:end */

initPP(engine);
initPlayground(engine);

engine.scene.load(`${ProjectName}.bin`);

/* wle:auto-benchmark:start */
/* wle:auto-benchmark:end */