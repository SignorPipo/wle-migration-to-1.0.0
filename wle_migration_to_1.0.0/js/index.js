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
import {ARCamera8thwall, Cursor, CursorTarget, DebugObject, DeviceOrientationLook, FingerCursor, FixedFoveation, HandTracking, HitTestLocation, HowlerAudioListener, HowlerAudioSource, ImageTexture, MouseLookComponent, PlayerHeight, TargetFramerate, TeleportComponent, Trail, TwoJointIkSolver, VideoTexture, VrModeActiveSwitch, Vrm, WasdControlsComponent} from '@wonderlandengine/components';
import {AddPPToWindowComponent, AddWLToWindowComponent, AdjustHierarchyPhysXScaleComponent, AudioManagerComponent, BenchmarkMaxPhysXComponent, BenchmarkMaxVisibleTrianglesComponent, CADisplayLeaderboardComponent, CharacterCollisionSystemComponent, CharacterControllerComponent, ClearConsoleOnXRSessionStartComponent, ConsoleVRComponent, CopyHandTransformComponent, CopyHeadTransformComponent, CopyPlayerPivotTransformComponent, CopyPlayerTransformComponent, DebugArrayFunctionsPerformanceAnalyzerComponent, DebugFunctionsPerformanceAnalyzerComponent, DebugManagerComponent, DebugPPArrayCreationPerformanceAnalyzerComponent, DebugPPFunctionsPerformanceAnalyzerComponent, DebugTransformComponent, DebugWLComponentsFunctionsPerformanceAnalyzerComponent, DebugWLFunctionsPerformanceAnalyzerComponent, EasyLightAttenuationComponent, EasyLightColorComponent, EasyMeshAmbientFactorComponent, EasyMeshColorComponent, EasyScaleComponent, EasySetTuneTargeetGrabComponent, EasySetTuneTargetChildNumberComponent, EasyTextColorComponent, EasyTransformComponent, EasyTuneComponent, EasyTuneImportVariablesComponent, EnableDebugsComponent, EnableToolsComponent, FingerCursorComponent, GamepadControlSchemeComponent, GamepadMeshAnimatorComponent, GetDefaultResourcesComponent, GetPlayerObjectsComponent, GlobalGravityComponent, GrabbableComponent, GrabberHandComponent, InputManagerComponent, MuteEverythingComponent, PPGatewayComponent, PlayerCharacterControllerComponent, PlayerHandCharacterControllerComponent, PlayerHeadCharacterControllerComponent, PlayerHeadControllerComponent, PlayerLocomotionComponent, PlayerLocomotionGravityComponent, PlayerLocomotionRotateComponent, PlayerLocomotionSmoothComponent, PlayerLocomotionTeleportComponent, PlayerViewOcclusionComponent, SetActiveComponent, SetHandLocalTransformComponent, SetHeadLocalTransformComponent, SetHeadNonVRLocalTransformComponent, SetHeadVRLocalTransformComponent, SetPlayerHeightComponent, SetTrackedHandJointLocalTransformComponent, ShowFPSComponent, SpatialAudioListenerComponent, SwitchHandObjectComponent, ToolCursorComponent, TrackedHandDrawAllJointsComponent, TrackedHandDrawJointComponent, TrackedHandDrawSkinComponent, VirtualGamepadComponent, VisualManagerComponent} from './pp/index.js';
import './pp/pp/default_resources.js';
import './pp/pp/default_resources_global.js';
import './pp/pp/init_pp.js';
import './pp/pp/player_objects.js';
import './pp/pp/player_objects_global.js';
import {WaveMovementComponent} from './playground/wave_movement_component.js';
import {GetDefaultResourcesComponent as GetDefaultResourcesComponent1} from './pp/pp/components/get_default_resources_component.js';
import {GetPlayerObjectsComponent as GetPlayerObjectsComponent1} from './pp/pp/components/get_player_objects_component.js';
import {PPGatewayComponent as PPGatewayComponent1} from './pp/pp/components/pp_gateway_component.js';
import './pp/plugin/init_plugins.js';
import './pp/plugin/utils/extension_utils.js';
import './pp/plugin/js/init_js_plugins.js';
import './pp/plugin/js/extensions/array_extension.js';
import './pp/plugin/js/extensions/init_js_extentions.js';
import './pp/plugin/js/extensions/math_extension.js';
import './pp/plugin/js/extensions/number_extension.js';
import './pp/plugin/wl/init_wl_plugins.js';
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
import {AudioManagerComponent as AudioManagerComponent1} from './pp/audio/components/audio_manager_component.js';
import {MuteEverythingComponent as MuteEverythingComponent1} from './pp/audio/components/mute_everything_component.js';
import {SpatialAudioListenerComponent as SpatialAudioListenerComponent1} from './pp/audio/components/spatial_audio_listener_component.js';
import {BenchmarkMaxPhysXComponent as BenchmarkMaxPhysXComponent1} from './pp/cauldron/benchmarks/benchmark_max_physx_component.js';
import {BenchmarkMaxVisibleTrianglesComponent as BenchmarkMaxVisibleTrianglesComponent1} from './pp/cauldron/benchmarks/benchmark_max_visible_triangles_component.js';
import './pp/cauldron/cauldron/object_pool.js';
import './pp/cauldron/cauldron/object_pools_manager.js';
import './pp/cauldron/cauldron/save_manager.js';
import './pp/cauldron/cauldron/timer.js';
import {AdjustHierarchyPhysXScaleComponent as AdjustHierarchyPhysXScaleComponent1} from './pp/cauldron/components/adjust_hierarchy_physx_scale_component.js';
import {ClearConsoleOnXRSessionStartComponent as ClearConsoleOnXRSessionStartComponent1} from './pp/cauldron/components/clear_console_on_xr_session_start_component.js';
import {SetActiveComponent as SetActiveComponent1} from './pp/cauldron/components/set_active_component.js';
import {ShowFPSComponent as ShowFPSComponent1} from './pp/cauldron/components/show_fps_component.js';
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
import {VisualManagerComponent as VisualManagerComponent1} from './pp/cauldron/visual/components/visual_manager_component.js';
import './pp/cauldron/visual/elements/visual_arrow.js';
import './pp/cauldron/visual/elements/visual_element_types.js';
import './pp/cauldron/visual/elements/visual_line.js';
import './pp/cauldron/visual/elements/visual_mesh.js';
import './pp/cauldron/visual/elements/visual_point.js';
import './pp/cauldron/visual/elements/visual_raycast.js';
import './pp/cauldron/visual/elements/visual_text.js';
import './pp/cauldron/visual/elements/visual_torus.js';
import './pp/cauldron/visual/elements/visual_transform.js';
import './pp/cauldron/wl/engine_globals.js';
import {AddWLToWindowComponent as AddWLToWindowComponent1} from './pp/cauldron/wl/components/add_wl_to_window_component.js';
import './pp/debug/debug_globals.js';
import './pp/debug/debug_manager.js';
import './pp/debug/debug_visual_manager.js';
import {DebugManagerComponent as DebugManagerComponent1} from './pp/debug/components/debug_manager_component.js';
import {DebugTransformComponent as DebugTransformComponent1} from './pp/debug/components/debug_transform_component.js';
import {EnableDebugsComponent as EnableDebugsComponent1} from './pp/debug/components/enable_debugs_component.js';
import './pp/debug/debug_functions_overwriter/debug_functions_overwriter.js';
import './pp/debug/debug_functions_overwriter/debug_functions_performance_analyzer/debug_functions_performance_analysis_results_logger.js';
import './pp/debug/debug_functions_overwriter/debug_functions_performance_analyzer/debug_functions_performance_analyzer.js';
import {DebugArrayFunctionsPerformanceAnalyzerComponent as DebugArrayFunctionsPerformanceAnalyzerComponent1} from './pp/debug/debug_functions_overwriter/debug_functions_performance_analyzer/components/debug_array_functions_performance_analyzer_component.js';
import {DebugFunctionsPerformanceAnalyzerComponent as DebugFunctionsPerformanceAnalyzerComponent1} from './pp/debug/debug_functions_overwriter/debug_functions_performance_analyzer/components/debug_functions_performance_analyzer_component.js';
import {DebugPPArrayCreationPerformanceAnalyzerComponent as DebugPPArrayCreationPerformanceAnalyzerComponent1} from './pp/debug/debug_functions_overwriter/debug_functions_performance_analyzer/components/debug_pp_array_creation_performance_analyzer_component.js';
import {DebugPPFunctionsPerformanceAnalyzerComponent as DebugPPFunctionsPerformanceAnalyzerComponent1} from './pp/debug/debug_functions_overwriter/debug_functions_performance_analyzer/components/debug_pp_functions_performance_analyzer_component.js';
import {DebugWLComponentsFunctionsPerformanceAnalyzerComponent as DebugWLComponentsFunctionsPerformanceAnalyzerComponent1} from './pp/debug/debug_functions_overwriter/debug_functions_performance_analyzer/components/debug_wl_components_function_performance_analyzer_component.js';
import {DebugWLFunctionsPerformanceAnalyzerComponent as DebugWLFunctionsPerformanceAnalyzerComponent1} from './pp/debug/debug_functions_overwriter/debug_functions_performance_analyzer/components/debug_wl_function_performance_analyzer_component.js';
import './pp/gameplay/cauldron/cauldron/direction_2D_to_3D_converter.js';
import './pp/gameplay/cauldron/cauldron/number_over_value.js';
import './pp/gameplay/experimental/cauldron/player/player_head_controller.js';
import './pp/gameplay/experimental/cauldron/player/player_view_occlusion.js';
import {PlayerHeadControllerComponent as PlayerHeadControllerComponent1} from './pp/gameplay/experimental/cauldron/player/components/player_head_controller_component.js';
import {PlayerViewOcclusionComponent as PlayerViewOcclusionComponent1} from './pp/gameplay/experimental/cauldron/player/components/player_view_occlusion_component.js';
import './pp/gameplay/experimental/character_controller/character_controller.js';
import './pp/gameplay/experimental/character_controller/character_controller_utils.js';
import './pp/gameplay/experimental/character_controller/synced_character_controller.js';
import './pp/gameplay/experimental/character_controller/collision/character_collider_setup.js';
import './pp/gameplay/experimental/character_controller/collision/character_collider_utils.js';
import './pp/gameplay/experimental/character_controller/collision/character_collision_results.js';
import './pp/gameplay/experimental/character_controller/collision/character_collision_system.js';
import './pp/gameplay/experimental/character_controller/collision/character_collision_system_global.js';
import './pp/gameplay/experimental/character_controller/collision/collision_check_bridge.js';
import {CharacterCollisionSystemComponent as CharacterCollisionSystemComponent1} from './pp/gameplay/experimental/character_controller/collision/components/character_collision_system_component.js';
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
import {CharacterControllerComponent as CharacterControllerComponent1} from './pp/gameplay/experimental/character_controller/components/character_controller_component.js';
import './pp/gameplay/experimental/character_controller/player/player_character_controller.js';
import './pp/gameplay/experimental/character_controller/player/player_hand_character_controller.js';
import './pp/gameplay/experimental/character_controller/player/player_head_character_controller.js';
import {PlayerCharacterControllerComponent as PlayerCharacterControllerComponent1} from './pp/gameplay/experimental/character_controller/player/components/player_character_controller_component.js';
import {PlayerHandCharacterControllerComponent as PlayerHandCharacterControllerComponent1} from './pp/gameplay/experimental/character_controller/player/components/player_hand_character_controller_component.js';
import {PlayerHeadCharacterControllerComponent as PlayerHeadCharacterControllerComponent1} from './pp/gameplay/experimental/character_controller/player/components/player_head_character_controller_component.js';
import './pp/gameplay/experimental/locomotion/cauldron/global_gravity_globals.js';
import {GlobalGravityComponent as GlobalGravityComponent1} from './pp/gameplay/experimental/locomotion/cauldron/components/global_gravity_component.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/locomotion_utils.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/player_head_manager.js';
import './pp/gameplay/experimental/locomotion/legacy/locomotion/player_locomotion.js';
import {PlayerLocomotionComponent as PlayerLocomotionComponent1} from './pp/gameplay/experimental/locomotion/legacy/locomotion/player_locomotion_component.js';
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
import {PlayerLocomotionGravityComponent as PlayerLocomotionGravityComponent1} from './pp/gameplay/experimental/locomotion/player/components/player_locomotion_gravity_component.js';
import {PlayerLocomotionRotateComponent as PlayerLocomotionRotateComponent1} from './pp/gameplay/experimental/locomotion/player/components/player_locomotion_rotate_component.js';
import {PlayerLocomotionSmoothComponent as PlayerLocomotionSmoothComponent1} from './pp/gameplay/experimental/locomotion/player/components/player_locomotion_smooth_component.js';
import {PlayerLocomotionTeleportComponent as PlayerLocomotionTeleportComponent1} from './pp/gameplay/experimental/locomotion/player/components/player_locomotion_teleport_component.js';
import './pp/gameplay/experimental/locomotion/player/teleport/player_locomotion_teleport.js';
import {GrabbableComponent as GrabbableComponent1} from './pp/gameplay/grab_throw/grabbable_component.js';
import {GrabberHandComponent as GrabberHandComponent1} from './pp/gameplay/grab_throw/grabber_hand_component.js';
import {CADisplayLeaderboardComponent as CADisplayLeaderboardComponent1} from './pp/gameplay/integrations/construct_arcade/ca_display_leaderboard_component.js';
import './pp/gameplay/integrations/construct_arcade/ca_dummy_server.js';
import './pp/gameplay/integrations/construct_arcade/ca_utils.js';
import './pp/input/cauldron/input_globals.js';
import './pp/input/cauldron/input_manager.js';
import './pp/input/cauldron/input_types.js';
import './pp/input/cauldron/input_utils.js';
import './pp/input/cauldron/keyboard.js';
import './pp/input/cauldron/mouse.js';
import {FingerCursorComponent as FingerCursorComponent1} from './pp/input/cauldron/components/finger_cursor_component.js';
import {InputManagerComponent as InputManagerComponent1} from './pp/input/cauldron/components/input_manager_component.js';
import {SwitchHandObjectComponent as SwitchHandObjectComponent1} from './pp/input/cauldron/components/switch_hand_object_component.js';
import {TrackedHandDrawAllJointsComponent as TrackedHandDrawAllJointsComponent1} from './pp/input/cauldron/components/tracked_hand_draw_all_joints_component.js';
import {TrackedHandDrawJointComponent as TrackedHandDrawJointComponent1} from './pp/input/cauldron/components/tracked_hand_draw_joint_component.js';
import {TrackedHandDrawSkinComponent as TrackedHandDrawSkinComponent1} from './pp/input/cauldron/components/tracked_hand_draw_skin_component.js';
import './pp/input/gamepad/base_gamepad.js';
import './pp/input/gamepad/gamepad_buttons.js';
import './pp/input/gamepad/universal_gamepad.js';
import {GamepadControlSchemeComponent as GamepadControlSchemeComponent1} from './pp/input/gamepad/cauldron/gamepad_control_scheme_component.js';
import {GamepadMeshAnimatorComponent as GamepadMeshAnimatorComponent1} from './pp/input/gamepad/cauldron/gamepad_mesh_animator_component.js';
import './pp/input/gamepad/cauldron/gamepad_utils.js';
import './pp/input/gamepad/cauldron/gamepads_manager.js';
import './pp/input/gamepad/gamepad_cores/classic_gamepad_core.js';
import './pp/input/gamepad/gamepad_cores/gamepad_core.js';
import './pp/input/gamepad/gamepad_cores/keyboard_gamepad_core.js';
import './pp/input/gamepad/gamepad_cores/virtual_gamepad_gamepad_core.js';
import './pp/input/gamepad/gamepad_cores/xr_gamepad_core.js';
import './pp/input/gamepad/virtual_gamepad/virtual_gamepad.js';
import {VirtualGamepadComponent as VirtualGamepadComponent1} from './pp/input/gamepad/virtual_gamepad/virtual_gamepad_component.js';
import './pp/input/gamepad/virtual_gamepad/virtual_gamepad_icon.js';
import './pp/input/gamepad/virtual_gamepad/virtual_gamepad_params.js';
import './pp/input/gamepad/virtual_gamepad/virtual_gamepad_virtual_button.js';
import './pp/input/gamepad/virtual_gamepad/virtual_gamepad_virtual_thumbstick.js';
import './pp/input/pose/base_pose.js';
import './pp/input/pose/hand_pose.js';
import './pp/input/pose/head_pose.js';
import './pp/input/pose/tracked_hand_joint_pose.js';
import './pp/input/pose/tracked_hand_pose.js';
import {CopyHandTransformComponent as CopyHandTransformComponent1} from './pp/input/pose/components/copy_hand_transform_component.js';
import {CopyHeadTransformComponent as CopyHeadTransformComponent1} from './pp/input/pose/components/copy_head_transform_component.js';
import {CopyPlayerPivotTransformComponent as CopyPlayerPivotTransformComponent1} from './pp/input/pose/components/copy_player_pivot_transform_component.js';
import {CopyPlayerTransformComponent as CopyPlayerTransformComponent1} from './pp/input/pose/components/copy_player_transform_component.js';
import {SetHandLocalTransformComponent as SetHandLocalTransformComponent1} from './pp/input/pose/components/set_hand_local_transform_component.js';
import {SetHeadLocalTransformComponent as SetHeadLocalTransformComponent1} from './pp/input/pose/components/set_head_local_transform_component.js';
import {SetHeadNonVRLocalTransformComponent as SetHeadNonVRLocalTransformComponent1} from './pp/input/pose/components/set_head_non_vr_local_transform_component.js';
import {SetHeadVRLocalTransformComponent as SetHeadVRLocalTransformComponent1} from './pp/input/pose/components/set_head_vr_local_transform_component.js';
import {SetPlayerHeightComponent as SetPlayerHeightComponent1} from './pp/input/pose/components/set_player_height_component.js';
import {SetTrackedHandJointLocalTransformComponent as SetTrackedHandJointLocalTransformComponent1} from './pp/input/pose/components/set_tracked_hand_joint_local_transform_component.js';
import './pp/tool/cauldron/tool_globals.js';
import './pp/tool/cauldron/tool_types.js';
import {EnableToolsComponent as EnableToolsComponent1} from './pp/tool/cauldron/components/enable_tools_component.js';
import {ToolCursorComponent as ToolCursorComponent1} from './pp/tool/cauldron/components/tool_cursor_component.js';
import './pp/tool/widget_frame/widget_frame.js';
import './pp/tool/widget_frame/widget_frame_setup.js';
import './pp/tool/widget_frame/widget_frame_ui.js';
import './pp/tool/console_vr/console_original_functions.js';
import './pp/tool/console_vr/console_vr.js';
import {ConsoleVRComponent as ConsoleVRComponent1} from './pp/tool/console_vr/console_vr_component.js';
import './pp/tool/console_vr/console_vr_global.js';
import './pp/tool/console_vr/console_vr_types.js';
import './pp/tool/console_vr/console_vr_widget.js';
import './pp/tool/console_vr/console_vr_widget_setup.js';
import './pp/tool/console_vr/console_vr_widget_ui.js';
import './pp/tool/easy_tune/easy_tune_globals.js';
import './pp/tool/easy_tune/easy_tune_utils.js';
import './pp/tool/easy_tune/easy_tune_variable_types.js';
import './pp/tool/easy_tune/easy_tune_variables.js';
import {EasyTuneComponent as EasyTuneComponent1} from './pp/tool/easy_tune/components/easy_tune_component.js';
import {EasyTuneImportVariablesComponent as EasyTuneImportVariablesComponent1} from './pp/tool/easy_tune/components/easy_tune_import_variables_component.js';
import './pp/tool/easy_tune/easy_object_tuners/easy_light_attenuation.js';
import './pp/tool/easy_tune/easy_object_tuners/easy_light_color.js';
import './pp/tool/easy_tune/easy_object_tuners/easy_mesh_ambient_factor.js';
import './pp/tool/easy_tune/easy_object_tuners/easy_mesh_color.js';
import './pp/tool/easy_tune/easy_object_tuners/easy_object_tuner.js';
import './pp/tool/easy_tune/easy_object_tuners/easy_scale.js';
import './pp/tool/easy_tune/easy_object_tuners/easy_text_color.js';
import './pp/tool/easy_tune/easy_object_tuners/easy_transform.js';
import {EasyLightAttenuationComponent as EasyLightAttenuationComponent1} from './pp/tool/easy_tune/easy_object_tuners/components/easy_light_attenuation_component.js';
import {EasyLightColorComponent as EasyLightColorComponent1} from './pp/tool/easy_tune/easy_object_tuners/components/easy_light_color_component.js';
import {EasyMeshAmbientFactorComponent as EasyMeshAmbientFactorComponent1} from './pp/tool/easy_tune/easy_object_tuners/components/easy_mesh_ambient_factor_component.js';
import {EasyMeshColorComponent as EasyMeshColorComponent1} from './pp/tool/easy_tune/easy_object_tuners/components/easy_mesh_color_component.js';
import {EasyScaleComponent as EasyScaleComponent1} from './pp/tool/easy_tune/easy_object_tuners/components/easy_scale_component.js';
import {EasySetTuneTargetChildNumberComponent as EasySetTuneTargetChildNumberComponent1} from './pp/tool/easy_tune/easy_object_tuners/components/easy_set_tune_target_child_number_component.js';
import {EasySetTuneTargeetGrabComponent as EasySetTuneTargeetGrabComponent1} from './pp/tool/easy_tune/easy_object_tuners/components/easy_set_tune_target_grab_component.js';
import {EasyTextColorComponent as EasyTextColorComponent1} from './pp/tool/easy_tune/easy_object_tuners/components/easy_text_color_component.js';
import {EasyTransformComponent as EasyTransformComponent1} from './pp/tool/easy_tune/easy_object_tuners/components/easy_transform_component.js';
import './pp/tool/easy_tune/easy_tune_widgets/easy_tune_widget.js';
import './pp/tool/easy_tune/easy_tune_widgets/easy_tune_widget_setup.js';
import './pp/tool/easy_tune/easy_tune_widgets/base/easy_tune_base_array_widget_selector.js';
import './pp/tool/easy_tune/easy_tune_widgets/base/easy_tune_base_widget.js';
import './pp/tool/easy_tune/easy_tune_widgets/base/easy_tune_base_widget_setup.js';
import './pp/tool/easy_tune/easy_tune_widgets/base/easy_tune_base_widget_ui.js';
import './pp/tool/easy_tune/easy_tune_widgets/bool/easy_tune_bool_array_widget.js';
import './pp/tool/easy_tune/easy_tune_widgets/bool/easy_tune_bool_array_widget_selector.js';
import './pp/tool/easy_tune/easy_tune_widgets/bool/easy_tune_bool_array_widget_setup.js';
import './pp/tool/easy_tune/easy_tune_widgets/bool/easy_tune_bool_array_widget_ui.js';
import './pp/tool/easy_tune/easy_tune_widgets/none/easy_tune_none_widget.js';
import './pp/tool/easy_tune/easy_tune_widgets/none/easy_tune_none_widget_setup.js';
import './pp/tool/easy_tune/easy_tune_widgets/none/easy_tune_none_widget_ui.js';
import './pp/tool/easy_tune/easy_tune_widgets/number/easy_tune_number_array_widget.js';
import './pp/tool/easy_tune/easy_tune_widgets/number/easy_tune_number_array_widget_setup.js';
import './pp/tool/easy_tune/easy_tune_widgets/number/easy_tune_number_array_widget_ui.js';
import './pp/tool/easy_tune/easy_tune_widgets/number/easy_tune_number_widget_selector.js';
import './pp/tool/easy_tune/easy_tune_widgets/transform/easy_tune_transform_widget.js';
import './pp/tool/easy_tune/easy_tune_widgets/transform/easy_tune_transform_widget_setup.js';
import './pp/tool/easy_tune/easy_tune_widgets/transform/easy_tune_transform_widget_ui.js';
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
import {AddPPToWindowComponent as AddPPToWindowComponent1} from './pp/pp/components/add_pp_to_window_component.js';
/* wle:auto-imports:end */

import { loadRuntime } from "@wonderlandengine/api";
import { initPP } from "./pp/index.js";

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
engine.registerComponent(ARCamera8thwall, Cursor, CursorTarget, DebugObject, DeviceOrientationLook, FingerCursor, FixedFoveation, HandTracking, HitTestLocation, HowlerAudioListener, HowlerAudioSource, ImageTexture, MouseLookComponent, PlayerHeight, TargetFramerate, TeleportComponent, Trail, TwoJointIkSolver, VideoTexture, VrModeActiveSwitch, Vrm, WasdControlsComponent);
engine.registerComponent(AddPPToWindowComponent, AddWLToWindowComponent, AdjustHierarchyPhysXScaleComponent, AudioManagerComponent, BenchmarkMaxPhysXComponent, BenchmarkMaxVisibleTrianglesComponent, CADisplayLeaderboardComponent, CharacterCollisionSystemComponent, CharacterControllerComponent, ClearConsoleOnXRSessionStartComponent, ConsoleVRComponent, CopyHandTransformComponent, CopyHeadTransformComponent, CopyPlayerPivotTransformComponent, CopyPlayerTransformComponent, DebugArrayFunctionsPerformanceAnalyzerComponent, DebugFunctionsPerformanceAnalyzerComponent, DebugManagerComponent, DebugPPArrayCreationPerformanceAnalyzerComponent, DebugPPFunctionsPerformanceAnalyzerComponent, DebugTransformComponent, DebugWLComponentsFunctionsPerformanceAnalyzerComponent, DebugWLFunctionsPerformanceAnalyzerComponent, EasyLightAttenuationComponent, EasyLightColorComponent, EasyMeshAmbientFactorComponent, EasyMeshColorComponent, EasyScaleComponent, EasySetTuneTargeetGrabComponent, EasySetTuneTargetChildNumberComponent, EasyTextColorComponent, EasyTransformComponent, EasyTuneComponent, EasyTuneImportVariablesComponent, EnableDebugsComponent, EnableToolsComponent, FingerCursorComponent, GamepadControlSchemeComponent, GamepadMeshAnimatorComponent, GetDefaultResourcesComponent, GetPlayerObjectsComponent, GlobalGravityComponent, GrabbableComponent, GrabberHandComponent, InputManagerComponent, MuteEverythingComponent, PPGatewayComponent, PlayerCharacterControllerComponent, PlayerHandCharacterControllerComponent, PlayerHeadCharacterControllerComponent, PlayerHeadControllerComponent, PlayerLocomotionComponent, PlayerLocomotionGravityComponent, PlayerLocomotionRotateComponent, PlayerLocomotionSmoothComponent, PlayerLocomotionTeleportComponent, PlayerViewOcclusionComponent, SetActiveComponent, SetHandLocalTransformComponent, SetHeadLocalTransformComponent, SetHeadNonVRLocalTransformComponent, SetHeadVRLocalTransformComponent, SetPlayerHeightComponent, SetTrackedHandJointLocalTransformComponent, ShowFPSComponent, SpatialAudioListenerComponent, SwitchHandObjectComponent, ToolCursorComponent, TrackedHandDrawAllJointsComponent, TrackedHandDrawJointComponent, TrackedHandDrawSkinComponent, VirtualGamepadComponent, VisualManagerComponent);
engine.registerComponent(WaveMovementComponent);
engine.registerComponent(GetDefaultResourcesComponent1);
engine.registerComponent(GetPlayerObjectsComponent1);
engine.registerComponent(PPGatewayComponent1);
engine.registerComponent(AudioManagerComponent1);
engine.registerComponent(MuteEverythingComponent1);
engine.registerComponent(SpatialAudioListenerComponent1);
engine.registerComponent(BenchmarkMaxPhysXComponent1);
engine.registerComponent(BenchmarkMaxVisibleTrianglesComponent1);
engine.registerComponent(AdjustHierarchyPhysXScaleComponent1);
engine.registerComponent(ClearConsoleOnXRSessionStartComponent1);
engine.registerComponent(SetActiveComponent1);
engine.registerComponent(ShowFPSComponent1);
engine.registerComponent(VisualManagerComponent1);
engine.registerComponent(AddWLToWindowComponent1);
engine.registerComponent(DebugManagerComponent1);
engine.registerComponent(DebugTransformComponent1);
engine.registerComponent(EnableDebugsComponent1);
engine.registerComponent(DebugArrayFunctionsPerformanceAnalyzerComponent1);
engine.registerComponent(DebugFunctionsPerformanceAnalyzerComponent1);
engine.registerComponent(DebugPPArrayCreationPerformanceAnalyzerComponent1);
engine.registerComponent(DebugPPFunctionsPerformanceAnalyzerComponent1);
engine.registerComponent(DebugWLComponentsFunctionsPerformanceAnalyzerComponent1);
engine.registerComponent(DebugWLFunctionsPerformanceAnalyzerComponent1);
engine.registerComponent(PlayerHeadControllerComponent1);
engine.registerComponent(PlayerViewOcclusionComponent1);
engine.registerComponent(CharacterCollisionSystemComponent1);
engine.registerComponent(CharacterControllerComponent1);
engine.registerComponent(PlayerCharacterControllerComponent1);
engine.registerComponent(PlayerHandCharacterControllerComponent1);
engine.registerComponent(PlayerHeadCharacterControllerComponent1);
engine.registerComponent(GlobalGravityComponent1);
engine.registerComponent(PlayerLocomotionComponent1);
engine.registerComponent(PlayerLocomotionGravityComponent1);
engine.registerComponent(PlayerLocomotionRotateComponent1);
engine.registerComponent(PlayerLocomotionSmoothComponent1);
engine.registerComponent(PlayerLocomotionTeleportComponent1);
engine.registerComponent(GrabbableComponent1);
engine.registerComponent(GrabberHandComponent1);
engine.registerComponent(CADisplayLeaderboardComponent1);
engine.registerComponent(FingerCursorComponent1);
engine.registerComponent(InputManagerComponent1);
engine.registerComponent(SwitchHandObjectComponent1);
engine.registerComponent(TrackedHandDrawAllJointsComponent1);
engine.registerComponent(TrackedHandDrawJointComponent1);
engine.registerComponent(TrackedHandDrawSkinComponent1);
engine.registerComponent(GamepadControlSchemeComponent1);
engine.registerComponent(GamepadMeshAnimatorComponent1);
engine.registerComponent(VirtualGamepadComponent1);
engine.registerComponent(CopyHandTransformComponent1);
engine.registerComponent(CopyHeadTransformComponent1);
engine.registerComponent(CopyPlayerPivotTransformComponent1);
engine.registerComponent(CopyPlayerTransformComponent1);
engine.registerComponent(SetHandLocalTransformComponent1);
engine.registerComponent(SetHeadLocalTransformComponent1);
engine.registerComponent(SetHeadNonVRLocalTransformComponent1);
engine.registerComponent(SetHeadVRLocalTransformComponent1);
engine.registerComponent(SetPlayerHeightComponent1);
engine.registerComponent(SetTrackedHandJointLocalTransformComponent1);
engine.registerComponent(EnableToolsComponent1);
engine.registerComponent(ToolCursorComponent1);
engine.registerComponent(ConsoleVRComponent1);
engine.registerComponent(EasyTuneComponent1);
engine.registerComponent(EasyTuneImportVariablesComponent1);
engine.registerComponent(EasyLightAttenuationComponent1);
engine.registerComponent(EasyLightColorComponent1);
engine.registerComponent(EasyMeshAmbientFactorComponent1);
engine.registerComponent(EasyMeshColorComponent1);
engine.registerComponent(EasyScaleComponent1);
engine.registerComponent(EasySetTuneTargetChildNumberComponent1);
engine.registerComponent(EasySetTuneTargeetGrabComponent1);
engine.registerComponent(EasyTextColorComponent1);
engine.registerComponent(EasyTransformComponent1);
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
engine.registerComponent(AddPPToWindowComponent1);
/* wle:auto-register:end */

initPP(engine);

engine.scene.load(`${ProjectName}.bin`);

/* wle:auto-benchmark:start */
/* wle:auto-benchmark:end */