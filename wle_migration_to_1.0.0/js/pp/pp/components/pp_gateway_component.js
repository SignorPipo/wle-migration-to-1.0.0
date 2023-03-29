import { Component, Type } from "@wonderlandengine/api";
import { AudioManagerComponent } from "../../audio/components/audio_manager_component";
import { VisualManagerComponent } from "../../cauldron/visual/components/visual_manager_component";
import { DebugManagerComponent } from "../../debug/components/debug_manager_component";
import { InputManagerComponent } from "../../input/cauldron/components/input_manager_component";

export class GatewayComponent extends Component {
    static TypeName = "pp-gateway";
    static Properties = {};

    init() {
        this._myInputManager = this.object.pp_addComponent(InputManagerComponent, false);
        this._myAudioManager = this.object.pp_addComponent(AudioManagerComponent, false);
        this._myVisualManager = this.object.pp_addComponent(VisualManagerComponent, false);
        this._myDebugManager = this.object.pp_addComponent(DebugManagerComponent, false);
    }

    start() {
        this._myInputManager.active = true;
        this._myAudioManager.active = true;
        this._myVisualManager.active = true;
        this._myDebugManager.active = true;
    }
}