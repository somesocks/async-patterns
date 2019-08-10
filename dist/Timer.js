"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Promisify_1 = __importDefault(require("./Promisify"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var Timer_1 = __importDefault(require("callback-patterns/Timer"));
// quick hack to fix a bad type declaration from callback-patterns/Timer
var _Timer2 = Timer_1.default;
var EMPTY_TASK = Promisify_1.default(function (next) { next(); });
/**
* Wraps a task and logs how long it takes to finish, or fail.
* @param {taskFunction} task - the task to wrap.
* @param {string} label - an optional label to log.
* @returns {taskFunction} a task
* @memberof async-patterns
*/
function Timer(_1, _2) {
    var task = Callbackify_1.default(_1 || EMPTY_TASK);
    var label = _2;
    return Promisify_1.default(_Timer2(task, label));
}
module.exports = Timer;
