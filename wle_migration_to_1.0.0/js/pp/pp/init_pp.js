import { initPlugins } from "../plugin/init_plugins";
import { addEngine, getMainEngine, setMainEngine } from "../cauldron/wl/engine_global";

export function initPP(engine) {
    if (engine != null) {
        addEngine(engine);
        if (getMainEngine() == null) {
            setMainEngine(engine);
        }
    }

    initPlugins(engine);
}