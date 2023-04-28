/*
    How to use

    By default the rotations are in Degrees

    For rotations u can add a suffix like Degrees/Radians to use a specific version, example:
        - pp_angleDistanceSignedDegrees
        - pp_isInsideAngleRangeRadians
        
    List of constants:
        - PP_EPSILON / PP_EPSILON_SQUARED / PP_EPSILON_DEGREES

    List of functions:
        Notes:
            - The suffixes (like Degrees or Radians) are omitted 

        - pp_clamp
        - pp_sign
        - pp_toDegrees      / pp_toRadians
        - pp_roundDecimal
        - pp_mapToRange
        - pp_random         / pp_randomInt    / pp_randomInt        / pp_randomSign / pp_randomPick
        - pp_lerp           / pp_interpolate
        - pp_angleDistance  / pp_angleDistanceSigned
        - pp_angleClamp
        - pp_isInsideAngleRange
*/

import { MathUtils } from "../../../cauldron/js/utils/math_utils";
import { PluginUtils } from "../../utils/plugin_utils";

export function initMathExtension() {
    initMathExtensionStatic();
}

export function initMathExtensionStatic() {
    let mathExtension = {};
    PluginUtils.assignProperties(MathUtils, mathExtension, false, true, true, true, false, "pp_");
    PluginUtils.assignProperties(mathExtension, Math, false, true, true);
}