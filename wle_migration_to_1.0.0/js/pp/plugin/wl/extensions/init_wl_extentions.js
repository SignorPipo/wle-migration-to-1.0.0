import { initEngineExtension } from "./engine_extension";
import { initObjectExtension } from "./object_extension";
import { initSceneExtension } from "./scene_extension";

export function initWLExtensions(engine) {
    initEngineExtension(engine);
    initObjectExtension();
    initSceneExtension();
}