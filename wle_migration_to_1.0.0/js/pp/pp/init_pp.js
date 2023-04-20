import { registerWLComponents } from "../cauldron/wl/register_wl_components";
import { initPlugins } from "../plugin/init_plugins";
import { Globals } from "./globals";
import { registerPPComponents } from "./register_pp_components";

export function initPP(engine) {
    registerWLComponents(engine);
    registerPPComponents(engine);

    Globals.initEngine(engine);

    initPlugins(engine);
}