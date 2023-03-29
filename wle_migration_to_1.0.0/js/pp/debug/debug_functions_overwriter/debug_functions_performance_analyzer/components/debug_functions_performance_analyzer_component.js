import { Component, Type } from "@wonderlandengine/api";
import { Timer } from "../../../../cauldron/cauldron/timer";
import { getLeftGamepad } from "../../../../input/cauldron/input_globals";
import { GamepadButtonID } from "../../../../input/gamepad/gamepad_buttons";
import { DebugFunctionsPerformanceAnalysisResultsLogger, DebugFunctionsPerformanceAnalysisResultsLoggerParams } from "../debug_functions_performance_analysis_results_logger";
import { DebugFunctionsPerformanceAnalyzer, DebugFunctionsPerformanceAnalyzerParams } from "../debug_functions_performance_analyzer";

export class DebugFunctionsPerformanceAnalyzerComponent extends Component {
    static TypeName = "pp-debug-functions-performance-analyzer";
    static Properties = {
        _myObjectsByPath: { type: Type.String, default: "" },
        _myClassesByPath: { type: Type.String, default: "" },
        _myFunctionsByPath: { type: Type.String, default: "" },
        _myDelayStart: { type: Type.Float, default: 0.0 },
        _myLogTitle: { type: Type.String, default: "Functions Performance Analysis Results" },
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
        _myExcludeJSObjectFunctions: { type: Type.Bool, default: true },
        _myAddPathPrefixToFunctionID: { type: Type.Bool, default: true },
        _myObjectAddObjectDescendantsDepthLevel: { type: Type.Int, default: 0 },
        _myObjectAddClassDescendantsDepthLevel: { type: Type.Int, default: 0 },
        _myClearConsoleBeforeLog: { type: Type.Bool, default: false },
        _myResetMaxResultsShortcutEnabled: { type: Type.Bool, default: false }
    };

    init() {
        this._myFunctionsPerformanceAnalyzer = null;
        this._myFunctionsPerformanceAnalysisResultsLogger = null;

        this._mySkipFirstUpdate = true;
        this._myStartTimer = new Timer(this._myDelayStart);
        if (this._myDelayStart == 0) {
            this._myStartTimer.end();
            this._mySkipFirstUpdate = false;
            this._start();
        }
    }

    update(dt) {
        if (this._mySkipFirstUpdate) {
            this._mySkipFirstUpdate = false;
            return;
        }

        if (this._myStartTimer.isRunning()) {
            this._myStartTimer.update(dt);
            if (this._myStartTimer.isDone()) {
                this._start();
            }
        } else {
            this._myFunctionsPerformanceAnalysisResultsLogger.update(dt);
            this._myFunctionsPerformanceAnalyzer.resetResults();
        }

        if (this._myResetMaxResultsShortcutEnabled) {
            if (getLeftGamepad(this.engine).getButtonInfo(GamepadButtonID.SELECT).isPressEnd(3)) {
                this._myFunctionsPerformanceAnalyzer.resetMaxResults();
            }
        }
    }

    _start() {
        let functionsPerformanceAnalyzerParams = new DebugFunctionsPerformanceAnalyzerParams();

        if (this._myObjectsByPath.length > 0) {
            let toIncludeList = [...this._myObjectsByPath.split(",")];
            for (let i = 0; i < toIncludeList.length; i++) {
                toIncludeList[i] = toIncludeList[i].trim();
            }
            functionsPerformanceAnalyzerParams.myObjectsByPath.push(...toIncludeList);
        }

        if (this._myClassesByPath.length > 0) {
            let toIncludeList = [...this._myClassesByPath.split(",")];
            for (let i = 0; i < toIncludeList.length; i++) {
                toIncludeList[i] = toIncludeList[i].trim();
            }
            functionsPerformanceAnalyzerParams.myClassesByPath.push(...toIncludeList);
        }

        if (this._myFunctionsByPath.length > 0) {
            let toIncludeList = [...this._myFunctionsByPath.split(",")];
            for (let i = 0; i < toIncludeList.length; i++) {
                toIncludeList[i] = toIncludeList[i].trim();
            }
            functionsPerformanceAnalyzerParams.myFunctionsByPath.push(...toIncludeList);
        }

        functionsPerformanceAnalyzerParams.myExcludeConstructors = this._myExcludeConstructors;
        functionsPerformanceAnalyzerParams.myExcludeJSObjectFunctions = this._myExcludeJSObjectFunctions;
        functionsPerformanceAnalyzerParams.myAddPathPrefixToFunctionID = this._myAddPathPrefixToFunctionID;

        if (this._myFunctionPathsToInclude.length > 0) {
            let toIncludeList = [...this._myFunctionPathsToInclude.split(",")];
            for (let i = 0; i < toIncludeList.length; i++) {
                toIncludeList[i] = toIncludeList[i].trim();
            }
            functionsPerformanceAnalyzerParams.myFunctionPathsToInclude.push(...toIncludeList);
        }

        if (this._myFunctionPathsToExclude.length > 0) {
            let toExcludeList = [...this._myFunctionPathsToExclude.split(",")];
            for (let i = 0; i < toExcludeList.length; i++) {
                toExcludeList[i] = toExcludeList[i].trim();
            }
            functionsPerformanceAnalyzerParams.myFunctionPathsToExclude.push(...toExcludeList);
        }

        functionsPerformanceAnalyzerParams.myObjectAddObjectDescendantsDepthLevel = this._myObjectAddObjectDescendantsDepthLevel;
        functionsPerformanceAnalyzerParams.myObjectAddClassDescendantsDepthLevel = this._myObjectAddClassDescendantsDepthLevel;

        functionsPerformanceAnalyzerParams.myExecutionTimeAnalysisEnabled = this._myLogTotalExecutionTimeResults || this._myLogTotalExecutionTimePercentageResults || this._myLogAverageExecutionTimeResults;

        functionsPerformanceAnalyzerParams.myClassesByReference = (this._myClassesByReference != null) ? this._myClassesByReference : [];
        functionsPerformanceAnalyzerParams.myObjectsByReference = (this._myObjectsByReference != null) ? this._myObjectsByReference : [];

        this._myFunctionsPerformanceAnalyzer = new DebugFunctionsPerformanceAnalyzer(functionsPerformanceAnalyzerParams);
        this._myFunctionsPerformanceAnalyzer.overwriteFunctions();

        let functionsPerformanceAnalysisResultsLoggerParams = new DebugFunctionsPerformanceAnalysisResultsLoggerParams();
        functionsPerformanceAnalysisResultsLoggerParams.myPerformanceAnalyzer = this._myFunctionsPerformanceAnalyzer;
        functionsPerformanceAnalysisResultsLoggerParams.myLogTitle = this._myLogTitle;

        functionsPerformanceAnalysisResultsLoggerParams.mySecondsBetweenLogs = this._mySecondsBetweenLogs;
        functionsPerformanceAnalysisResultsLoggerParams.myLogFunction = ["log", "error", "warn", "debug"][this._myLogFunction];
        functionsPerformanceAnalysisResultsLoggerParams.myLogMaxAmountOfFunctions = (this._myLogMaxAmountOfFunctions >= 0) ? this._myLogMaxAmountOfFunctions : null;
        functionsPerformanceAnalysisResultsLoggerParams.myLogFunctionsWithCallsCountAbove = (this._myLogFunctionsWithCallsCountAbove >= 0) ? this._myLogFunctionsWithCallsCountAbove : null;
        functionsPerformanceAnalysisResultsLoggerParams.myLogFunctionsWithTotalExecutionTimePercentageAbove = (this._myLogFunctionsWithTotalExecutionTimePercentageAbove >= 0) ? this._myLogFunctionsWithTotalExecutionTimePercentageAbove : null;
        functionsPerformanceAnalysisResultsLoggerParams.myLogMaxResults = this._myLogMaxResults;
        functionsPerformanceAnalysisResultsLoggerParams.myClearConsoleBeforeLog = this._myClearConsoleBeforeLog;

        functionsPerformanceAnalysisResultsLoggerParams.myLogSortOrder = this._myLogSortOrder;

        functionsPerformanceAnalysisResultsLoggerParams.myLogCallsCountResults = this._myLogCallsCountResults;
        functionsPerformanceAnalysisResultsLoggerParams.myLogTotalExecutionTimeResults = this._myLogTotalExecutionTimeResults;
        functionsPerformanceAnalysisResultsLoggerParams.myLogTotalExecutionTimePercentageResults = this._myLogTotalExecutionTimePercentageResults;
        functionsPerformanceAnalysisResultsLoggerParams.myLogAverageExecutionTimeResults = this._myLogAverageExecutionTimeResults;

        this._myFunctionsPerformanceAnalysisResultsLogger = new DebugFunctionsPerformanceAnalysisResultsLogger(functionsPerformanceAnalysisResultsLoggerParams);
    }
};