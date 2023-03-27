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
import './pp/plugin/js/extensions/number_extension.js';
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
import './pp/debug/debug_functions_overwriter/debug_functions_overwriter.js';
import './pp/debug/debug_functions_overwriter/debug_functions_performance_analyzer/debug_functions_performance_analysis_results_logger.js';
import './pp/debug/debug_functions_overwriter/debug_functions_performance_analyzer/debug_functions_performance_analyzer.js';
import {DebugArrayFunctionsPerformanceAnalyzerComponent} from './pp/debug/debug_functions_overwriter/debug_functions_performance_analyzer/components/debug_array_functions_performance_analyzer_component.js';
import {DebugFunctionsPerformanceAnalyzerComponent} from './pp/debug/debug_functions_overwriter/debug_functions_performance_analyzer/components/debug_functions_performance_analyzer_component.js';
import {DebugPPArrayCreationPerformanceAnalyzerComponent} from './pp/debug/debug_functions_overwriter/debug_functions_performance_analyzer/components/debug_pp_array_creation_performance_analyzer_component.js';
import {DebugPPFunctionsPerformanceAnalyzerComponent} from './pp/debug/debug_functions_overwriter/debug_functions_performance_analyzer/components/debug_pp_functions_performance_analyzer_component.js';
import {DebugWLComponentsFunctionsPerformanceAnalyzerComponent} from './pp/debug/debug_functions_overwriter/debug_functions_performance_analyzer/components/debug_wl_components_function_performance_analyzer_component.js';
import {DebugWLFunctionsPerformanceAnalyzerComponent} from './pp/debug/debug_functions_overwriter/debug_functions_performance_analyzer/components/debug_wl_function_performance_analyzer_component.js';
import './pp/gameplay/cauldron/cauldron/direction_2D_to_3D_converter.js';
import './pp/gameplay/cauldron/cauldron/number_over_value.js';
import './pp/gameplay/experimental/cauldron/player/player_head_controller.js';
import './pp/gameplay/experimental/cauldron/player/player_view_occlusion.js';
import {PlayerHeadControllerComponent} from './pp/gameplay/experimental/cauldron/player/components/player_head_controller_component.js';
import {PlayerViewOcclusionComponent} from './pp/gameplay/experimental/cauldron/player/components/player_view_occlusion_component.js';
import './pp/gameplay/experimental/character_controller/character_controller.js';
import './pp/gameplay/experimental/character_controller/character_controller_utils.js';
import './pp/gameplay/experimental/character_controller/synced_character_controller.js';
import './pp/gameplay/experimental/character_controller/collision/character_collider_setup.js';
import './pp/gameplay/experimental/character_controller/collision/character_collider_utils.js';
import './pp/gameplay/experimental/character_controller/collision/character_collision_results.js';
import './pp/gameplay/experimental/character_controller/collision/character_collision_system.js';
import './pp/gameplay/experimental/character_controller/collision/character_collision_system_global.js';
import './pp/gameplay/experimental/character_controller/collision/collision_check_bridge.js';
import {CharacterCollisionSystemComponent} from './pp/gameplay/experimental/character_controller/collision/components/character_collision_system_component.js';
import './pp/gameplay/experimental/character_controller/collision/legacy/collision_check/collision_check.js';
import './pp/gameplay/experimental/character_controller/collision/legacy/collision_check/collision_movement_check.js';
import './pp/gameplay/experimental/character_controller/collision/legacy/collision_check/collision_params.js';
import './pp/gameplay/experimental/character_controller/collision/legacy/collision_check/collision_position_check.js';
import './pp/gameplay/experimental/character_controller/collision/legacy/collision_check/collision_surface_check.js';
import './pp/gameplay/experimental/character_controller/collision/legacy/collision_check/collision_teleport_check.js';
import './pp/gameplay/experimental/character_controller/collision/legacy/collision_check/horizontal_collision_check.js';
import './pp/gameplay/experimental/character_controller/collision/legacy/collision_check/horizontal_collision_movement_check.js';
import './pp/gameplay/experimental/character_controller/collision/legacy/collision_check/horizontal_collision_position_check.js';
import './pp/gameplay/experimental/character_controller/collision/legacy/collision_check/horizontal_collision_sliding.js';
import './pp/gameplay/experimental/character_controller/collision/legacy/collision_check/vertical_collision_check.js';
import {CharacterControllerComponent} from './pp/gameplay/experimental/character_controller/components/character_controller_component.js';
import './pp/gameplay/experimental/character_controller/player/player_character_controller.js';
import './pp/gameplay/experimental/character_controller/player/player_hand_character_controller.js';
import './pp/gameplay/experimental/character_controller/player/player_head_character_controller.js';
import {PlayerCharacterControllerComponent} from './pp/gameplay/experimental/character_controller/player/components/player_character_controller_component.js';
import {PlayerHandCharacterControllerComponent} from './pp/gameplay/experimental/character_controller/player/components/player_hand_character_controller_component.js';
import {PlayerHeadCharacterControllerComponent} from './pp/gameplay/experimental/character_controller/player/components/player_head_character_controller_component.js';
import './pp/gameplay/experimental/locomotion/cauldron/global_gravity_globals.js';
import {GlobalGravityComponent} from './pp/gameplay/experimental/locomotion/cauldron/components/global_gravity_component.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/locomotion_utils.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/player_head_manager.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/player_locomotion.js';
import {PlayerLocomotionComponent} from './pp/gameplay/experimental/locomotion/legacy/locomotion/player_locomotion_component.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/player_locomotion_movement.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/player_locomotion_rotate.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/player_locomotion_smooth.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/player_obscure_manager.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/player_transform_manager.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/cleaned/player_locomotion_cleaned.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/cleaned/player_locomotion_smooth_cleaned.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/cleaned/player_transform_manager_cleaned.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/teleport/player_locomotion_teleport.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/teleport/player_locomotion_teleport_detection_state.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/teleport/player_locomotion_teleport_detection_state_visibility.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/teleport/player_locomotion_teleport_detection_visualizer.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/teleport/player_locomotion_teleport_parable.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/teleport/player_locomotion_teleport_state.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/teleport/player_locomotion_teleport_teleport_blink_state.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/teleport/player_locomotion_teleport_teleport_shift_state.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/teleport/player_locomotion_teleport_teleport_state.js';
import './pp/gameplay/experimental/locomotion/player/player_locomotion_gravity.js';
import './pp/gameplay/experimental/locomotion/player/player_locomotion_rotate.js';
import './pp/gameplay/experimental/locomotion/player/player_locomotion_smooth.js';
import {PlayerLocomotionGravityComponent} from './pp/gameplay/experimental/locomotion/player/components/player_locomotion_gravity_component.js';
import {PlayerLocomotionRotateComponent} from './pp/gameplay/experimental/locomotion/player/components/player_locomotion_rotate_component.js';
import {PlayerLocomotionSmoothComponent} from './pp/gameplay/experimental/locomotion/player/components/player_locomotion_smooth_component.js';
import {PlayerLocomotionTeleportComponent} from './pp/gameplay/experimental/locomotion/player/components/player_locomotion_teleport_component.js';
import './pp/gameplay/experimental/locomotion/player/teleport/player_locomotion_teleport.js';
import {GrabbableComponent} from './pp/gameplay/grab_throw/grabbable_component.js';
import {GrabberHandComponent} from './pp/gameplay/grab_throw/grabber_hand_component.js';
import {CADisplayLeaderboardComponent} from './pp/gameplay/integrations/construct_arcade/ca_display_leaderboard_component.js';
import './pp/gameplay/integrations/construct_arcade/ca_dummy_server.js';
import './pp/gameplay/integrations/construct_arcade/ca_utils.js';
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
import './pp/input/gamepad/virtual_gamepad/virtual_gamepad.js';
import {VirtualGamepadComponent} from './pp/input/gamepad/virtual_gamepad/virtual_gamepad_component.js';
import './pp/input/gamepad/virtual_gamepad/virtual_gamepad_icon.js';
import './pp/input/gamepad/virtual_gamepad/virtual_gamepad_params.js';
import './pp/input/gamepad/virtual_gamepad/virtual_gamepad_virtual_button.js';
import './pp/input/gamepad/virtual_gamepad/virtual_gamepad_virtual_thumbstick.js';
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
import './playground/bundle.js';
import {FadeViewComponent} from './playground/fade_view_component.js';
import {GrabbableSpawnerComponent} from './playground/grabbable_spawner_component.js';
import {LoadAudioComponent} from './playground/load_audio_component.js';
import {ParticleComponent} from './playground/particle_component.js';
import {ParticlesSpawnerComponent} from './playground/particles_spawner_component.js';
import {PlayMusicComponent} from './playground/play_music_component.js';
import {ScaleOnSpawnComponent} from './playground/scale_on_spawn_component.js';
import {SFXOnCollisionComponent} from './playground/sfx_on_collision_component.js';
import {SFXOnGrabThrowComponent} from './playground/sfx_on_grab_throw_component.js';
import {TargetHitCheckComponent} from './playground/target_hit_check_component.js';
import {WaveMovementComponent} from './playground/wave_movement_component.js';
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
engine.registerComponent(DebugArrayFunctionsPerformanceAnalyzerComponent);
engine.registerComponent(DebugFunctionsPerformanceAnalyzerComponent);
engine.registerComponent(DebugPPArrayCreationPerformanceAnalyzerComponent);
engine.registerComponent(DebugPPFunctionsPerformanceAnalyzerComponent);
engine.registerComponent(DebugWLComponentsFunctionsPerformanceAnalyzerComponent);
engine.registerComponent(DebugWLFunctionsPerformanceAnalyzerComponent);
engine.registerComponent(PlayerHeadControllerComponent);
engine.registerComponent(PlayerViewOcclusionComponent);
engine.registerComponent(CharacterCollisionSystemComponent);
engine.registerComponent(CharacterControllerComponent);
engine.registerComponent(PlayerCharacterControllerComponent);
engine.registerComponent(PlayerHandCharacterControllerComponent);
engine.registerComponent(PlayerHeadCharacterControllerComponent);
engine.registerComponent(GlobalGravityComponent);
engine.registerComponent(PlayerLocomotionComponent);
engine.registerComponent(PlayerLocomotionGravityComponent);
engine.registerComponent(PlayerLocomotionRotateComponent);
engine.registerComponent(PlayerLocomotionSmoothComponent);
engine.registerComponent(PlayerLocomotionTeleportComponent);
engine.registerComponent(GrabbableComponent);
engine.registerComponent(GrabberHandComponent);
engine.registerComponent(CADisplayLeaderboardComponent);
engine.registerComponent(FingerCursorComponent);
engine.registerComponent(InputManagerComponent);
engine.registerComponent(SwitchHandObjectComponent);
engine.registerComponent(TrackedHandDrawAllJointsComponent);
engine.registerComponent(TrackedHandDrawJointComponent);
engine.registerComponent(TrackedHandDrawSkinComponent);
engine.registerComponent(GamepadControlSchemeComponent);
engine.registerComponent(GamepadMeshAnimatorComponent);
engine.registerComponent(VirtualGamepadComponent);
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
engine.registerComponent(FadeViewComponent);
engine.registerComponent(GrabbableSpawnerComponent);
engine.registerComponent(LoadAudioComponent);
engine.registerComponent(ParticleComponent);
engine.registerComponent(ParticlesSpawnerComponent);
engine.registerComponent(PlayMusicComponent);
engine.registerComponent(ScaleOnSpawnComponent);
engine.registerComponent(SFXOnCollisionComponent);
engine.registerComponent(SFXOnGrabThrowComponent);
engine.registerComponent(TargetHitCheckComponent);
engine.registerComponent(WaveMovementComponent);
/* wle:auto-register:end */

initPP(engine);

engine.scene.load(`${ProjectName}.bin`);

/* wle:auto-benchmark:start */
/* wle:auto-benchmark:end */
