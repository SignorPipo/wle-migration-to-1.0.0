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
import {FadeViewComponent} from './playground/fade_view_component.js';
import {GrabbableSpawnerComponent} from './playground/grabbable_spawner_component.js';
import {LoadAudioComponent} from './playground/load_audio_component.js';
import {MouseLookComponent} from '@wonderlandengine/components';
import {ParticlesSpawnerComponent} from './playground/particles_spawner_component.js';
import {PlayMusicComponent} from './playground/play_music_component.js';
import {ConsoleVRToolComponent} from './pp/index.js';
import {EasyTuneToolComponent} from './pp/index.js';
import {GamepadMeshAnimatorComponent} from './pp/index.js';
import {PPGatewayComponent} from './pp/index.js';
import {GrabbableComponent} from './pp/index.js';
import {GrabberHandComponent} from './pp/index.js';
import {MuteEverythingComponent} from './pp/index.js';
import {PlayerLocomotionComponent} from './pp/index.js';
import {SetHandLocalTransformComponent} from './pp/index.js';
import {SetHeadLocalTransformComponent} from './pp/index.js';
import {SpatialAudioListenerComponent} from './pp/index.js';
import {SwitchHandObjectComponent} from './pp/index.js';
import {ToolCursorComponent} from './pp/index.js';
import {TrackedHandDrawAllJointsComponent} from './pp/index.js';
import {VirtualGamepadComponent} from './pp/index.js';
import {ScaleOnSpawnComponent} from './playground/scale_on_spawn_component.js';
import {SFXOnCollisionComponent} from './playground/sfx_on_collision_component.js';
import {SFXOnGrabThrowComponent} from './playground/sfx_on_grab_throw_component.js';
import {TargetHitCheckComponent} from './playground/target_hit_check_component.js';
import {WaveMovementComponent} from './playground/wave_movement_component.js';
/* wle:auto-imports:end */

import { loadRuntime } from "@wonderlandengine/api";
import { initPlayground } from "./playground/init_playground.js";
import { initPP } from "./pp";

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
engine.registerComponent(FadeViewComponent);
engine.registerComponent(GrabbableSpawnerComponent);
engine.registerComponent(LoadAudioComponent);
engine.registerComponent(MouseLookComponent);
engine.registerComponent(ParticlesSpawnerComponent);
engine.registerComponent(PlayMusicComponent);
engine.registerComponent(ConsoleVRToolComponent);
engine.registerComponent(EasyTuneToolComponent);
engine.registerComponent(GamepadMeshAnimatorComponent);
engine.registerComponent(PPGatewayComponent);
engine.registerComponent(GrabbableComponent);
engine.registerComponent(GrabberHandComponent);
engine.registerComponent(MuteEverythingComponent);
engine.registerComponent(PlayerLocomotionComponent);
engine.registerComponent(SetHandLocalTransformComponent);
engine.registerComponent(SetHeadLocalTransformComponent);
engine.registerComponent(SpatialAudioListenerComponent);
engine.registerComponent(SwitchHandObjectComponent);
engine.registerComponent(ToolCursorComponent);
engine.registerComponent(TrackedHandDrawAllJointsComponent);
engine.registerComponent(VirtualGamepadComponent);
engine.registerComponent(ScaleOnSpawnComponent);
engine.registerComponent(SFXOnCollisionComponent);
engine.registerComponent(SFXOnGrabThrowComponent);
engine.registerComponent(TargetHitCheckComponent);
engine.registerComponent(WaveMovementComponent);
/* wle:auto-register:end */

initPP(engine);
initPlayground(engine);

engine.scene.load(`${ProjectName}.bin`);

/* wle:auto-benchmark:start */
/* wle:auto-benchmark:end */