"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var nop = function () { return false; };
var errorWrapper = function (log) {
    var wrapper = (typeof log === 'function' ? log : null) ||
        (function () { return log; });
    return wrapper;
};
/**
*
* ```javascript
*   let Assert = require('async-patterns/Assert');
*   let InSeries = require('async-patterns/InSeries');
*
*   let task = InSeries(
*     (num) => num,
*     Assert(
*       (num) => (num >= 0),
*       (num) => `${num} is less than zero`
*     ),
*     (num) => num,
*   );
*
*   await task(1); // returns 1
*
*   await task(-1); // throws error
*
* ```
* Builds an async assertion task.
* @param {function} validator - a function that checks the arguments.
* @param {string} message - an optional error message to throw if the assertion fails, or a message builder function.
* @returns {taskFunction} an assertion task
* @memberof async-patterns
*/
function Assert(validator, message) {
    validator = validator || nop;
    message = message || 'async-patterns/Assert failed';
    message = errorWrapper(message);
    return function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var err;
            return __generator(this, function (_a) {
                if (!validator(request)) {
                    err = message(request);
                    err = err instanceof Error ? err : new Error(err);
                    throw err;
                }
                return [2 /*return*/, request];
            });
        });
    };
}
module.exports = Assert;
