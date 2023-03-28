import { getMainEngine } from "../../../../plugin/wl/extensions/engine_extension";
import { EasyTuneBaseWidget } from "../base/easy_tune_base_widget";
import { EasyTuneNoneWidgetSetup } from "./easy_tune_none_widget_setup";
import { EasyTuneNoneWidgetUI } from "./easy_tune_none_widget_ui";

export class EasyTuneNoneWidget extends EasyTuneBaseWidget {

    constructor(params, engine = getMainEngine()) {
        super(params);

        this._mySetup = new EasyTuneNoneWidgetSetup();
        this._myUI = new EasyTuneNoneWidgetUI(engine);
    }
}