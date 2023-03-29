import { Component, Type } from "@wonderlandengine/api";
import { DebugFunctionsPerformanceAnalyzerComponent } from "./debug_functions_performance_analyzer_component";

export class DebugWLFunctionsPerformanceAnalyzerComponent extends Component {
    static TypeName = "pp-debug-wl-functions-performance-analyzer";
    static Properties = {
        _myAnalyzeWLObjects: { type: Type.Bool, default: false },
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
        this.object.pp_addComponent(DebugFunctionsPerformanceAnalyzerComponent, {
            _myObjectsByPath: "WL",
            _myDelayStart: this._myDelayStart,
            _myLogTitle: "WL Functions Performance Analysis Results",
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
            _myObjectAddObjectDescendantsDepthLevel: this._myAnalyzeWLObjects ? 1 : 0,
            _myObjectAddClassDescendantsDepthLevel: 3,
            _myClearConsoleBeforeLog: this._myClearConsoleBeforeLog,
            _myResetMaxResultsShortcutEnabled: this._myResetMaxResultsShortcutEnabled
        });
    }
};
