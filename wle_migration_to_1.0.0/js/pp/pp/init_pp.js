import { initPlugins } from "../plugin/init_plugins";
import { easySetupEngineGlobal } from "../cauldron/wl/engine_globals";

export function initPP(engine) {
    easySetupEngineGlobal(engine);

    initPlugins(engine);
}