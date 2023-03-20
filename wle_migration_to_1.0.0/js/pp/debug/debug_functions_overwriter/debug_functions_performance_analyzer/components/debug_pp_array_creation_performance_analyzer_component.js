import { Component, Type } from "@wonderlandengine/api";

PP.DebugPPArrayCreationPerformanceAnalyzer = class DebugPPArrayCreationPerformanceAnalyzer extends Component {
    static TypeName = "pp-debug-pp-array-creation-performance-analyzer";
    static Properties = {
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
        _myClearConsoleBeforeLog: { type: Type.Bool, default: false },
        _myResetMaxResultsShortcutEnabled: { type: Type.Bool, default: false }
    };

    init() {
        this.object.pp_addComponent("pp-debug-functions-performance-analyzer", {
            _myObjectsByPath: "PP",
            _myDelayStart: this._myDelayStart,
            _myLogTitle: "PP Array Creation Performance Analysis Results",
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
            _myFunctionPathsToInclude: "vec2_create, vec3_create, vec4_create, quat_create, quat2_create, mat3_create, mat4_create",
            _myExcludeConstructors: true,
            _myExcludeJavascriptObjectFunctions: true,
            _myAddPathPrefixToFunctionID: true,
            _myClearConsoleBeforeLog: this._myClearConsoleBeforeLog,
            _myResetMaxResultsShortcutEnabled: this._myResetMaxResultsShortcutEnabled
        });
    }
};