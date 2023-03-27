import { Component, Type } from "@wonderlandengine/api";
import { DebugFunctionsPerformanceAnalyzerComponent } from "./debug_functions_performance_analyzer_component";

export class DebugWLComponentsFunctionsPerformanceAnalyzerComponent extends Component {
    static TypeName = "pp-debug-wl-components-functions-performance-analyzer";
    static Properties = {
        _myAnalyzeComponentTypes: { type: Type.Bool, default: true },
        _myAnalyzeComponentInstances: { type: Type.Bool, default: false },
        _myDelayStart: { type: Type.Float, default: 0.0 },
        _myLogFunction: { type: Type.Enum, values: ["log", "error", "warn", "debug"], default: "log" },
        _mySecondsBetweenLogs: { type: Type.Float, default: 1.0 },
        _myLogMaxResults: { type: Type.Bool, default: false },
        _myLogSortOrder: { type: Type.Enum, values: ["none", "calls count", "total execution time", "average execution time"], default: "none" },
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
        let objectsByPath = "";

        if (this._myAnalyzeComponentTypes) {
            objectsByPath += "_WL._componentTypes";
        }

        if (this._myAnalyzeComponentInstances) {
            if (objectsByPath.length > 0) {
                objectsByPath += ", ";
            }
            objectsByPath += "_WL._components";
        }

        let objectByReference = [];
        let nativeComponentTypes = ["mesh", "physx", "animation", "collision", "input", "light", "text", "view"];
        for (let nativeComponentType of nativeComponentTypes) {
            objectByReference.push([Object.getPrototypeOf(WL._wrapComponent(nativeComponentType, WL.Object._typeIndexFor(nativeComponentType), 0)), "_WL._componentTypes[\"" + nativeComponentType + "\"]"]);
        }

        this._myAnalyzerComponent = this.object.pp_addComponent(DebugFunctionsPerformanceAnalyzerComponent, {
            _myObjectsByReference: objectByReference,
            _myObjectsByPath: objectsByPath,
            _myDelayStart: this._myDelayStart + 0.001,
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
            _myFunctionPathsToExclude: this._myFunctionPathsToExclude + (this._myFunctionPathsToExclude.length > 0 ? ", " : "") + "_WL\\._components\\., _WL\\._componentTypes\\., functions-performance-analyzer",
            _myExcludeConstructors: this._myExcludeConstructors,
            _myExcludeJSObjectFunctions: true,
            _myAddPathPrefixToFunctionID: true,
            _myObjectAddObjectDescendantsDepthLevel: 1,
            _myObjectAddClassDescendantsDepthLevel: 1,
            _myClearConsoleBeforeLog: this._myClearConsoleBeforeLog,
            _myResetMaxResultsShortcutEnabled: this._myResetMaxResultsShortcutEnabled
        });
    }
};