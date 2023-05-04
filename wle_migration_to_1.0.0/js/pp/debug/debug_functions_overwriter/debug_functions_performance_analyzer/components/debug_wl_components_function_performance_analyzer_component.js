import { AnimationComponent, CollisionComponent, Component, InputComponent, LightComponent, MeshComponent, PhysXComponent, Property, TextComponent, ViewComponent } from "@wonderlandengine/api";
import { Timer } from "../../../../cauldron/cauldron/timer";
import { Globals } from "../../../../pp/globals";
import { DebugFunctionsPerformanceAnalyzerComponent } from "./debug_functions_performance_analyzer_component";
import { ComponentUtils } from "../../../../cauldron/wl/utils/component_utils";

export class DebugWLComponentsFunctionsPerformanceAnalyzerComponent extends Component {
    static TypeName = "pp-debug-wl-components-functions-performance-analyzer";
    static Properties = {
        _myAnalyzeComponentTypes: Property.bool(true),
        _myAnalyzeComponentInstances: Property.bool(false),
        _myComponentInstanceID: Property.enum(["Object ID", "Object Name", "Object ID - Object Name"], "Object ID - Object Name"),
        _myDelayStart: Property.float(0.0),
        _myLogFunction: Property.enum(["Log", "Error", "Warn", "Debug"], "Log"),
        _mySecondsBetweenLogs: Property.float(1.0),
        _myLogMaxResults: Property.bool(false),
        _myLogSortOrder: Property.enum(["None", "Calls Count", "Total Execution Time", "Average Execution Time"], "None"),
        _myLogCallsCountResults: Property.bool(true),
        _myLogTotalExecutionTimeResults: Property.bool(true),
        _myLogTotalExecutionTimePercentageResults: Property.bool(true),
        _myLogAverageExecutionTimeResults: Property.bool(true),
        _myLogMaxAmountOfFunctions: Property.int(-1),
        _myLogFunctionsWithCallsCountAbove: Property.int(-1),
        _myLogFunctionsWithTotalExecutionTimePercentageAbove: Property.float(-1),
        _myFunctionPathsToInclude: Property.string(""),
        _myFunctionPathsToExclude: Property.string(""),
        _myExcludeConstructors: Property.bool(false),
        _myClearConsoleBeforeLog: Property.bool(false),
        _myResetMaxResultsShortcutEnabled: Property.bool(false)
    };

    init() {
        this._myStartTimer = new Timer(this._myDelayStart);
        if (this._myDelayStart == 0) {
            this._myStartTimer.end();
            this._start();
        }
    }

    update(dt) {
        if (this._myStartTimer.isRunning()) {
            this._myStartTimer.update(dt);
            if (this._myStartTimer.isDone()) {
                this._start();
            }
        }
    }

    _start() {

        let objectsByReference = [];

        if (this._myAnalyzeComponentInstances) {
            this._addComponentInstanceReferences(objectsByReference);
        }

        if (this._myAnalyzeComponentTypes) {
            this._addComponentTypeReferences(objectsByReference);
        }

        this._myAnalyzerComponent = this.object.pp_addComponent(DebugFunctionsPerformanceAnalyzerComponent, {
            _myObjectsByReference: objectsByReference,
            _myDelayStart: 0,
            _myLogTitle: "WL Components Performance Analysis Results",
            _myLogFunction: this._myLogFunction,
            _mySecondsBetweenLogs: this._mySecondsBetweenLogs,
            _myLogMaxResults: this._myLogMaxResults,
            _myLogSortOrder: this._myLogSortOrder,
            _myLogMaxAmountOfFunctions: this._myLogMaxAmountOfFunctions,
            _myLogFunctionsWithCallsCountAbove: this._myLogFunctionsWithCallsCountAbove,
            _myLogFunctionsWithTotalExecutionTimePercentageAbove: this._myLogFunctionsWithTotalExecutionTimePercentageAbove,
            _myLogCallsCountResults: this._myLogCallsCountResults,
            _myLogTotalExecutionTimeResults: this._myLogTotalExecutionTimeResults,
            _myLogTotalExecutionTimePercentageResults: this._myLogTotalExecutionTimePercentageResults,
            _myLogAverageExecutionTimeResults: this._myLogAverageExecutionTimeResults,
            _myFunctionPathsToInclude: this._myFunctionPathsToInclude,
            _myFunctionPathsToExclude: this._myFunctionPathsToExclude,
            _myExcludeConstructors: this._myExcludeConstructors,
            _myExcludeJSObjectFunctions: true,
            _myAddPathPrefixToFunctionID: true,
            _myObjectAddClassDescendantsDepthLevel: 0,
            _myClearConsoleBeforeLog: this._myClearConsoleBeforeLog,
            _myResetMaxResultsShortcutEnabled: this._myResetMaxResultsShortcutEnabled
        });
    }

    _addComponentTypeReferences(objectsByReference) {
        let nativeComponentTypes = [
            AnimationComponent,
            CollisionComponent,
            InputComponent,
            LightComponent,
            MeshComponent,
            PhysXComponent,
            TextComponent,
            ViewComponent
        ];

        for (let nativeComponentType of nativeComponentTypes) {
            objectsByReference.push([Object.getPrototypeOf(this.engine._wrapComponent(nativeComponentType.TypeName, Globals.getWASM(this.engine)._typeIndexFor(nativeComponentType.TypeName), 0)),
            "{\"" + nativeComponentType.TypeName + "\"}"]);
        }

        for (let componentClass of ComponentUtils.getJavascriptComponentClassesByIndex()) {
            objectsByReference.push([componentClass.prototype,
            "{\"" + componentClass.TypeName + "\"}"]);
        }
    }

    _addComponentInstanceReferences(objectsByReference) {
        for (let componentInstance of ComponentUtils.getJavascriptComponentInstances()) {
            let id = "";

            switch (this._myComponentInstanceID) {
                case 0:
                    id = componentInstance.object.pp_getID();
                    break;
                case 1:
                    id = componentInstance.object.pp_getName();
                    break;
                case 2:
                    id = componentInstance.object.pp_getID();
                    if (componentInstance.object.pp_getName().length > 0) {
                        id = id + " - " + componentInstance.object.pp_getName();
                    }
                    break;
            }

            objectsByReference.push([componentInstance,
                "{\"" + componentInstance.type + "\"}[" + id + "]"]);
        }
    }
}