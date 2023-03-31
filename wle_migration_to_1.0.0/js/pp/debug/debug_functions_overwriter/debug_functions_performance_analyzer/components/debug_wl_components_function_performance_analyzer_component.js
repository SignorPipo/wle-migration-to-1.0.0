import { AnimationComponent, CollisionComponent, Component, InputComponent, LightComponent, MeshComponent, TextComponent, Type, ViewComponent } from "@wonderlandengine/api";
import { DebugFunctionsPerformanceAnalyzerComponent } from "./debug_functions_performance_analyzer_component";
import { Timer } from "../../../../cauldron/cauldron/timer";

export class DebugWLComponentsFunctionsPerformanceAnalyzerComponent extends Component {
    static TypeName = "pp-debug-wl-components-functions-performance-analyzer";
    static Properties = {
        _myAnalyzeComponentTypes: { type: Type.Bool, default: true },
        _myAnalyzeComponentInstances: { type: Type.Bool, default: false },
        _myComponentInstanceID: { type: Type.Enum, values: ["Object ID", "Object Name", "Object ID - Object Name"], default: "Object ID - Object Name" },
        _myDelayStart: { type: Type.Float, default: 0.0 },
        _myLogFunction: { type: Type.Enum, values: ["Log", "Error", "Warn", "Debug"], default: "Log" },
        _mySecondsBetweenLogs: { type: Type.Float, default: 1.0 },
        _myLogMaxResults: { type: Type.Bool, default: false },
        _myLogSortOrder: { type: Type.Enum, values: ["None", "Calls Count", "Total Execution Time", "Average Execution Time"], default: "None" },
        _myLogCallsCountResults: { type: Type.Bool, default: true },
        _myLogTotalExecutionTimeResults: { type: Type.Bool, default: true },
        _myLogTotalExecutionTimePercentageResults: { type: Type.Bool, default: true },
        _myLogAverageExecutionTimeResults: { type: Type.Bool, default: true },
        _myLogMaxAmountOfFunctions: { type: Type.Int, default: -1 },
        _myLogFunctionsWithCallsCountAbove: { type: Type.Int, default: -1 },
        _myLogFunctionsWithTotalExecutionTimePercentageAbove: { type: Type.Float, default: -1 },
        _myFunctionPathsToInclude: { type: Type.String, default: "" },
        _myFunctionPathsToExclude: { type: Type.String, default: "" },
        _myExcludeConstructors: { type: Type.Bool, default: false },
        _myClearConsoleBeforeLog: { type: Type.Bool, default: false },
        _myResetMaxResultsShortcutEnabled: { type: Type.Bool, default: false }
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
            MeshComponent,
            AnimationComponent,
            CollisionComponent,
            InputComponent,
            LightComponent,
            TextComponent,
            ViewComponent
        ];

        for (let nativeComponentType of nativeComponentTypes) {
            objectsByReference.push([Object.getPrototypeOf(this.engine._wrapComponent(nativeComponentType.TypeName, this.engine.wasm._typeIndexFor(nativeComponentType.TypeName), 0)),
            "{\"" + nativeComponentType.TypeName + "\"}"]);
        }

        for (let componentType of this.engine.wasm._componentTypes) {
            objectsByReference.push([componentType.prototype,
            "{\"" + componentType.TypeName + "\"}"]);
        }
    }

    _addComponentInstanceReferences(objectsByReference) {
        for (let component of this.engine.wasm._components) {
            let id = "";

            switch (this._myComponentInstanceID) {
                case 0:
                    id = component.object.pp_getID();
                    break;
                case 1:
                    id = component.object.pp_getName();
                    break;
                case 2:
                    id = component.object.pp_getID();
                    if (component.object.pp_getName().length > 0) {
                        id = id + " - " + component.object.pp_getName();
                    }
                    break;
            }

            objectsByReference.push([component,
                "{\"" + component.type + "\"}[" + id + "]"]);
        }
    }
}