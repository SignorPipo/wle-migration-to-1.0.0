import { initEngineExtension } from "../plugin/extensions/wle/engine_extension"
import { initArrayExtension } from "../plugin/extensions/js/array_extension"

export function initPP(engine) {
    initEngineExtension(engine);
    initArrayExtension();

    //object extension bla bla
}