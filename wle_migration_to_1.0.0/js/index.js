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

import { loadRuntime } from '@wonderlandengine/api';
import * as API from '@wonderlandengine/api'; // Deprecated: Backward compatibility.

/* wle:auto-imports:start */
import {ARCamera8thwall, Cursor, CursorTarget, DebugObject, DeviceOrientationLook, FingerCursor, FixedFoveation, HandTracking, HitTestLocation, HowlerAudioListener, HowlerAudioSource, ImageTexture, MouseLookComponent, PlayerHeight, TargetFramerate, TeleportComponent, Trail, TwoJointIkSolver, VideoTexture, VrModeActiveSwitch, Vrm, WasdControlsComponent} from '@wonderlandengine/components';
import './bundle.js';
import './pp/bundle.js';
import './pp/pp/default_resources.js';
import './pp/pp/default_resources_global.js';
import './pp/pp/init_pp.js';
import './pp/pp/player_objects.js';
import './pp/pp/player_objects_global.js';
import {GetDefaultResourcesComponent} from './pp/pp/components/get_default_resources_component.js';
import {GetPlayerObjectsComponent} from './pp/pp/components/get_player_objects_component.js';
import {GatewayComponent} from './pp/pp/components/pp_gateway_component.js';
import './pp/plugin/init_plugins.js';
import './pp/plugin/utils/extension_utils.js';
import './pp/plugin/js/init_js_plugins.js';
import './pp/plugin/js/extensions/array_extension.js';
import './pp/plugin/js/extensions/init_js_extentions.js';
import './pp/plugin/js/extensions/math_extension.js';
import './pp/plugin/wl/init_wl_plugins.js';
import './pp/plugin/wl/extensions/engine_extension.js';
import './pp/plugin/wl/extensions/init_wl_extentions.js';
import './pp/plugin/wl/extensions/object_extension.js';
import './pp/plugin/wl/extensions/scene_extension.js';
import './pp/plugin/wl/mods/init_wl_mods.js';
import './pp/plugin/wl/mods/components/component_clone_mod.js';
import './pp/plugin/wl/mods/components/cursor_component_mod.js';
import './pp/plugin/wl/mods/components/cursor_target_component_mod.js';
import './pp/plugin/wl/mods/components/init_component_mods.js';
import './pp/plugin/wl/mods/components/mouse_look_component_mod.js';
import './pp/audio/audio_manager.js';
import './pp/audio/audio_manager_global.js';
import './pp/audio/audio_player.js';
import './pp/audio/audio_setup.js';
import './pp/audio/audio_utils.js';
import './pp/audio/howler/howler_audio_player.js';
import {AudioManagerComponent} from './pp/audio/components/audio_manager_component.js';
import {MuteEverythingComponent} from './pp/audio/components/mute_everything_component.js';
import {SpatialAudioListenerComponent} from './pp/audio/components/spatial_audio_listener_component.js';
import {BenchmarkMaxPhysXComponent} from './pp/cauldron/benchmarks/benchmark_max_physx_component.js';
import {BenchmarkMaxVisibleTrianglesComponent} from './pp/cauldron/benchmarks/benchmark_max_visible_triangles_component.js';
import './pp/cauldron/cauldron/object_pool.js';
import './pp/cauldron/cauldron/object_pools_manager.js';
import './pp/cauldron/cauldron/save_manager.js';
import './pp/cauldron/cauldron/timer.js';
import {AdjustHierarchyPhysXScaleComponent} from './pp/cauldron/components/adjust_hierarchy_physx_scale_component.js';
import {ClearConsoleOnXRSessionStartComponent} from './pp/cauldron/components/clear_console_on_xr_session_start_component.js';
import {SetActiveComponent} from './pp/cauldron/components/set_active_component.js';
import {ShowFPSComponent} from './pp/cauldron/components/show_fps_component.js';
import './pp/cauldron/physics/physics_collision_collector.js';
import './pp/cauldron/physics/physics_layer_flags.js';
import './pp/cauldron/physics/physics_raycast_data.js';
import './pp/cauldron/physics/physics_utils.js';
import './pp/cauldron/utils/browser_utils.js';
import './pp/cauldron/utils/color_utils.js';
import './pp/cauldron/utils/js_utils.js';
import './pp/cauldron/utils/material_utils.js';
import './pp/cauldron/utils/mesh_utils.js';
import './pp/cauldron/utils/save_utils.js';
import './pp/cauldron/utils/text_utils.js';
import './pp/cauldron/utils/xr_utils.js';
import './pp/cauldron/visual/visual_data.js';
import './pp/cauldron/visual/visual_globals.js';
import './pp/cauldron/visual/visual_manager.js';
import {VisualManagerComponent} from './pp/cauldron/visual/components/visual_manager_component.js';
import './pp/cauldron/visual/elements/visual_arrow.js';
import './pp/cauldron/visual/elements/visual_element_types.js';
import './pp/cauldron/visual/elements/visual_line.js';
import './pp/cauldron/visual/elements/visual_mesh.js';
import './pp/cauldron/visual/elements/visual_point.js';
import './pp/cauldron/visual/elements/visual_raycast.js';
import './pp/cauldron/visual/elements/visual_text.js';
import './pp/cauldron/visual/elements/visual_torus.js';
import './pp/cauldron/visual/elements/visual_transform.js';
import './pp/debug/debug_globals.js';
import './pp/debug/debug_manager.js';
import './pp/debug/debug_visual_manager.js';
import {DebugManagerComponent} from './pp/debug/components/debug_manager_component.js';
import {DebugTransformComponent} from './pp/debug/components/debug_transform_component.js';
import './pp/input/cauldron/input_globals.js';
import './pp/input/cauldron/input_manager.js';
import './pp/input/cauldron/input_types.js';
import './pp/input/cauldron/input_utils.js';
import './pp/input/cauldron/keyboard.js';
import './pp/input/cauldron/mouse.js';
import {FingerCursorComponent} from './pp/input/cauldron/components/finger_cursor_component.js';
import {InputManagerComponent} from './pp/input/cauldron/components/input_manager_component.js';
import {SwitchHandObjectComponent} from './pp/input/cauldron/components/switch_hand_object_component.js';
import {TrackedHandDrawAllJointsComponent} from './pp/input/cauldron/components/tracked_hand_draw_all_joints_component.js';
import {TrackedHandDrawJointComponent} from './pp/input/cauldron/components/tracked_hand_draw_joint_component.js';
import {TrackedHandDrawSkinComponent} from './pp/input/cauldron/components/tracked_hand_draw_skin_component.js';
import './pp/input/gamepad/base_gamepad.js';
import './pp/input/gamepad/gamepad_buttons.js';
import './pp/input/gamepad/universal_gamepad.js';
import {GamepadControlSchemeComponent} from './pp/input/gamepad/cauldron/gamepad_control_scheme_component.js';
import {GamepadMeshAnimatorComponent} from './pp/input/gamepad/cauldron/gamepad_mesh_animator_component.js';
import './pp/input/gamepad/cauldron/gamepad_utils.js';
import './pp/input/gamepad/cauldron/gamepads_manager.js';
import './pp/input/gamepad/gamepad_cores/classic_gamepad_core.js';
import './pp/input/gamepad/gamepad_cores/gamepad_core.js';
import './pp/input/gamepad/gamepad_cores/keyboard_gamepad_core.js';
import './pp/input/gamepad/gamepad_cores/virtual_gamepad_gamepad_core.js';
import './pp/input/gamepad/gamepad_cores/xr_gamepad_core.js';
import './pp/input/pose/base_pose.js';
import './pp/input/pose/hand_pose.js';
import './pp/input/pose/head_pose.js';
import './pp/input/pose/tracked_hand_joint_pose.js';
import './pp/input/pose/tracked_hand_pose.js';
import {CopyHandTransformComponent} from './pp/input/pose/components/copy_hand_transform_component.js';
import {CopyHeadTransformComponent} from './pp/input/pose/components/copy_head_transform_component.js';
import {CopyPlayerPivotTransformComponent} from './pp/input/pose/components/copy_player_pivot_transform_component.js';
import {CopyPlayerTransformComponent} from './pp/input/pose/components/copy_player_transform_component.js';
import {SetHandLocalTransformComponent} from './pp/input/pose/components/set_hand_local_transform_component.js';
import {SetHeadLocalTransformComponent} from './pp/input/pose/components/set_head_local_transform_component.js';
import {SetNonVRHeadLocalTransformComponent} from './pp/input/pose/components/set_non_vr_head_local_transform_component.js';
import {SetPlayerHeightComponent} from './pp/input/pose/components/set_player_height_component.js';
import {SetTrackedHandJointLocalTransformComponent} from './pp/input/pose/components/set_tracked_hand_joint_local_transform_component.js';
import {SetVRHeadLocalTransformComponent} from './pp/input/pose/components/set_vr_head_local_transform_component.js';
/* wle:auto-imports:end */

import { initPP } from "./pp/pp/init_pp"

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
    const el = document.getElementById('version');
    if (el) setTimeout(() => el.remove(), 2000);
});

const arButton = document.getElementById('ar-button');
if (arButton) {
    arButton.dataset.supported = engine.arSupported;
}
const vrButton = document.getElementById('vr-button');
if (vrButton) {
    vrButton.dataset.supported = engine.vrSupported;
}

/* wle:auto-register:start */
engine.registerComponent(ARCamera8thwall, Cursor, CursorTarget, DebugObject, DeviceOrientationLook, FingerCursor, FixedFoveation, HandTracking, HitTestLocation, HowlerAudioListener, HowlerAudioSource, ImageTexture, MouseLookComponent, PlayerHeight, TargetFramerate, TeleportComponent, Trail, TwoJointIkSolver, VideoTexture, VrModeActiveSwitch, Vrm, WasdControlsComponent);
engine.registerComponent(GetDefaultResourcesComponent);
engine.registerComponent(GetPlayerObjectsComponent);
engine.registerComponent(GatewayComponent);
engine.registerComponent(AudioManagerComponent);
engine.registerComponent(MuteEverythingComponent);
engine.registerComponent(SpatialAudioListenerComponent);
engine.registerComponent(BenchmarkMaxPhysXComponent);
engine.registerComponent(BenchmarkMaxVisibleTrianglesComponent);
engine.registerComponent(AdjustHierarchyPhysXScaleComponent);
engine.registerComponent(ClearConsoleOnXRSessionStartComponent);
engine.registerComponent(SetActiveComponent);
engine.registerComponent(ShowFPSComponent);
engine.registerComponent(VisualManagerComponent);
engine.registerComponent(DebugManagerComponent);
engine.registerComponent(DebugTransformComponent);
engine.registerComponent(FingerCursorComponent);
engine.registerComponent(InputManagerComponent);
engine.registerComponent(SwitchHandObjectComponent);
engine.registerComponent(TrackedHandDrawAllJointsComponent);
engine.registerComponent(TrackedHandDrawJointComponent);
engine.registerComponent(TrackedHandDrawSkinComponent);
engine.registerComponent(GamepadControlSchemeComponent);
engine.registerComponent(GamepadMeshAnimatorComponent);
engine.registerComponent(CopyHandTransformComponent);
engine.registerComponent(CopyHeadTransformComponent);
engine.registerComponent(CopyPlayerPivotTransformComponent);
engine.registerComponent(CopyPlayerTransformComponent);
engine.registerComponent(SetHandLocalTransformComponent);
engine.registerComponent(SetHeadLocalTransformComponent);
engine.registerComponent(SetNonVRHeadLocalTransformComponent);
engine.registerComponent(SetPlayerHeightComponent);
engine.registerComponent(SetTrackedHandJointLocalTransformComponent);
engine.registerComponent(SetVRHeadLocalTransformComponent);
/* wle:auto-register:end */

initPP(engine);

engine.scene.load(`${ProjectName}.bin`);

/* wle:auto-benchmark:start */
/* wle:auto-benchmark:end */
