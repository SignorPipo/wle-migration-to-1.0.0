/**
 * /!\ This file is auto-generated.
 *
 * This is the entry point of your standalone application.
 *
 * There are multiple tags used by the editor to inject code automatically:
 *     - `wle:auto-imports:start` and `wle:auto-imports:end`: The list of import statements
 *     - `wle:auto-register:start` and `wle:auto-register:end`: The list of component to register
 *     - `wle:auto-constants:start` and `wle:auto-constants:end`: The project's constants,
 *        such as the project's name, whether it should use the physx runtime, etc...
 *     - `wle:auto-benchmark:start` and `wle:auto-benchmark:end`: Append the benchmarking code
 */

/* wle:auto-imports:start */
import {MouseLookComponent} from '@wonderlandengine/components';
import {FadeViewComponent} from './playground/fade_view_component.js';
import {FunComponent} from './playground/fun_component.js';
import {GrabbableSpawnerComponent} from './playground/grabbable_spawner_component.js';
import {LoadAudioComponent} from './playground/load_audio_component.js';
import {ParticlesSpawnerComponent} from './playground/particles_spawner_component.js';
import {PlayMusicComponent} from './playground/play_music_component.js';
import {ScaleOnSpawnComponent} from './playground/scale_on_spawn_component.js';
import {SFXOnCollisionComponent} from './playground/sfx_on_collision_component.js';
import {SFXOnGrabThrowComponent} from './playground/sfx_on_grab_throw_component.js';
import {TargetHitCheckComponent} from './playground/target_hit_check_component.js';
import {WaveMovementComponent} from './playground/wave_movement_component.js';
import {MuteEverythingComponent} from './pp/audio/components/mute_everything_component.js';
import {SpatialAudioListenerComponent} from './pp/audio/components/spatial_audio_listener_component.js';
import {PlayerLocomotionComponent} from './pp/gameplay/experimental/locomotion/legacy/locomotion/player_locomotion_component.js';
import {GrabbableComponent} from './pp/gameplay/grab_throw/grabbable_component.js';
import {GrabberHandComponent} from './pp/gameplay/grab_throw/grabber_hand_component.js';
import {SwitchHandObjectComponent} from './pp/input/cauldron/components/switch_hand_object_component.js';
import {TrackedHandDrawAllJointsComponent} from './pp/input/cauldron/components/tracked_hand_draw_all_joints_component.js';
import {GamepadMeshAnimatorComponent} from './pp/input/gamepad/cauldron/gamepad_mesh_animator_component.js';
import {VirtualGamepadComponent} from './pp/input/gamepad/virtual_gamepad/virtual_gamepad_component.js';
import {SetHandLocalTransformComponent} from './pp/input/pose/components/set_hand_local_transform_component.js';
import {SetHeadLocalTransformComponent} from './pp/input/pose/components/set_head_local_transform_component.js';
import {PPGatewayComponent} from './pp/pp/components/pp_gateway_component.js';
import {ToolCursorComponent} from './pp/tool/cauldron/components/tool_cursor_component.js';
import {ConsoleVRToolComponent} from './pp/tool/console_vr/components/console_vr_tool_component.js';
import {EasyTuneToolComponent} from './pp/tool/easy_tune/components/easy_tune_tool_component.js';
/* wle:auto-imports:end */

import * as API from '@wonderlandengine/api'; // Deprecated: Backward compatibility.
import { loadRuntime } from '@wonderlandengine/api';
import { initPlayground } from './playground/init_playground.js';
import { initPP } from './pp/index.js';

/* wle:auto-constants:start */
const ProjectName = 'wle_migration_to_1.0.0';
const RuntimeBaseName = 'WonderlandRuntime';
const WithPhysX = true;
const WithLoader = false;
const WebXRFramebufferScaleFactor = 1;
const WebXRRequiredFeatures = ['local',];
const WebXROptionalFeatures = ['local','hand-tracking','hit-test',];
/* wle:auto-constants:end */

const engine = await loadRuntime(RuntimeBaseName, {
    physx: WithPhysX,
    loader: WithLoader,
});
Object.assign(engine, API); // Deprecated: Backward compatibility.
window.WL = engine; // Deprecated: Backward compatibility.

engine.xrFramebufferScaleFactor = WebXRFramebufferScaleFactor;
engine.onSceneLoaded.once(() => {
    const el = document.getElementById('version');
    if (el) setTimeout(() => el.remove(), 2000);
});

/* WebXR setup. */

function requestSession(mode) {
    engine
        .requestXRSession(mode, WebXRRequiredFeatures, WebXROptionalFeatures)
        .catch((e) => console.error(e));
}

function setupButtonsXR() {
    /* Setup AR / VR buttons */
    const arButton = document.getElementById('ar-button');
    if (arButton) {
        arButton.dataset.supported = engine.arSupported;
        arButton.addEventListener('click', () => requestSession('immersive-ar'));
    }
    const vrButton = document.getElementById('vr-button');
    if (vrButton) {
        vrButton.dataset.supported = engine.vrSupported;
        vrButton.addEventListener('click', () => requestSession('immersive-vr'));
    }
}

if (document.readyState === 'loading') {
    window.addEventListener('load', setupButtonsXR);
} else {
    setupButtonsXR();
}

/* wle:auto-register:start */
engine.registerComponent(MouseLookComponent);
engine.registerComponent(FadeViewComponent);
engine.registerComponent(FunComponent);
engine.registerComponent(GrabbableSpawnerComponent);
engine.registerComponent(LoadAudioComponent);
engine.registerComponent(ParticlesSpawnerComponent);
engine.registerComponent(PlayMusicComponent);
engine.registerComponent(ScaleOnSpawnComponent);
engine.registerComponent(SFXOnCollisionComponent);
engine.registerComponent(SFXOnGrabThrowComponent);
engine.registerComponent(TargetHitCheckComponent);
engine.registerComponent(WaveMovementComponent);
engine.registerComponent(MuteEverythingComponent);
engine.registerComponent(SpatialAudioListenerComponent);
engine.registerComponent(PlayerLocomotionComponent);
engine.registerComponent(GrabbableComponent);
engine.registerComponent(GrabberHandComponent);
engine.registerComponent(SwitchHandObjectComponent);
engine.registerComponent(TrackedHandDrawAllJointsComponent);
engine.registerComponent(GamepadMeshAnimatorComponent);
engine.registerComponent(VirtualGamepadComponent);
engine.registerComponent(SetHandLocalTransformComponent);
engine.registerComponent(SetHeadLocalTransformComponent);
engine.registerComponent(PPGatewayComponent);
engine.registerComponent(ToolCursorComponent);
engine.registerComponent(ConsoleVRToolComponent);
engine.registerComponent(EasyTuneToolComponent);
/* wle:auto-register:end */

initPP(engine);
initPlayground(engine);

engine.scene.load(`${ProjectName}.bin`);

/* wle:auto-benchmark:start */
/* wle:auto-benchmark:end */
