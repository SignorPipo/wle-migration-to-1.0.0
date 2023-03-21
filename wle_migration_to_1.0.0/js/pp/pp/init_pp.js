import { initArrayExtension } from "../plugin/extensions/js/array_extension"
import { initMathExtension } from "../plugin/extensions/js/math_extension"
import { initEngineExtension } from "../plugin/extensions/wle/engine_extension"
import { initObjectExtension } from "../plugin/extensions/wle/object_extension"
import { initSceneExtension } from "../plugin/extensions/wle/scene_extension"

export function initPP(engine) {
    initArrayExtension();
    initMathExtension();

    initEngineExtension(engine);
    initObjectExtension(engine);
    initSceneExtension(engine);
}