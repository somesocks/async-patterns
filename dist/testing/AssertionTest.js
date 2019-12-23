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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Assert_1 = __importDefault(require("../Assert"));
var InOrder_1 = __importDefault(require("../InOrder"));
var CatchError_1 = __importDefault(require("../CatchError"));
var TraceError_1 = __importDefault(require("../unstable/TraceError"));
var DEFAULT_SETUP = function () { };
var DEFAULT_PREPARE = function (setup) { };
var DEFAULT_EXECUTE = function (request) { };
var DEFAULT_VERIFY = function (test) {
    if (test.error) {
        throw test.error;
    }
};
var DEFAULT_TEARDOWN = function (test) {
};
/**
*
* ```javascript
*
* const PingTest = AssertionTest()
*   .describe('can ping internet')
*   .setup(
*     // build our setup
*     (next) => {
*       const setup = {};
*       setup.testHosts = [ 'google.com', 'microsoft.com', 'yahoo.com' ];
*       next(null, setup);
*     }
*   )
*   .prepare(
*     // run test with first host
*     (next, setup) => {
*       const host = setup.testHosts[0];
*       next(null, host);
*     }
*   )
*   .execute(
*     (next, host) => ping.sys.probe(
*       host,
*       (isAlive, error) => next(error, isAlive)
*     )
*   )
*   .verify(
*     // verify no error was thrown
*     (next, { setup, request, result, error }) => next(error),
*     // verify result is true
*     (next, { setup, request, result, error }) => next(
*       result !== true ? new Error(`could not ping host ${request}`) : null
*     )
*   )
*   .teardown(
*     // nothing to teardown
*     (next, { setup, request, result, error }) => next()
*   )
*   .build();
*
*   test( () => console.log('test done') );
*
* ```
* Constructor for an AssertionTest builder.
*
* @name AssertionTest
* @class
* @constructor
* @memberof async-patterns.testing
*/
function AssertionTest() {
    var self = this instanceof AssertionTest ?
        this : Object.create(AssertionTest.prototype);
    self._description = '';
    self._setup = DEFAULT_SETUP;
    self._prepare = DEFAULT_PREPARE;
    self._execute = DEFAULT_EXECUTE;
    self._verify = [DEFAULT_VERIFY];
    self._teardown = DEFAULT_TEARDOWN;
    return self;
}
/**
*
* `AssertionTest#describe` lets you set a description for a test case.
* This description is part of the label attached to the test case when built.
*
* @function describe
* @param {string} description - a string label describing the test case
* @returns {AssertionTest} this
* @memberof async-patterns.testing.AssertionTest#
*/
AssertionTest.prototype.describe = function describe(description) {
    this._description = description;
    return this;
};
/**
*
* `AssertionTest#setup` gives you a hook to build test fixtures before execution.
* This is the first step that runs in a test.
* `setup` is a separate step from `prepare` because you often want to use
* a common setup function to build test fixtures for multiple tests.
*
* @function setup
* @param {function} task - a setup task function - should return a setup object
* @returns {AssertionTest} this
* @memberof async-patterns.testing.AssertionTest#
*/
AssertionTest.prototype.setup = function setup(_setup) {
    this._setup = _setup;
    return this;
};
/**
*
* `AssertionTest#prepare` gives you a hook to prepare the request that the test uses to execute.
* This is the second step that runs in a test, and the last step before `execute`.
* The `prepare` task is passed the results from `setup`.
*
* @function prepare
* @param {function} task - a prepare task function - should accept a context containing the setup, and return a request object to be given to the executing task
* @returns {AssertionTest} this
* @memberof async-patterns.testing.AssertionTest#
*/
AssertionTest.prototype.prepare = function prepare(_prepare) {
    this._prepare = _prepare;
    return this;
};
/**
*
* `AssertionTest#execute` lets you specify the task that is executed in a test.
* The `execute` task is passed the results from `prepare`.
*
* @function execute
* @param {function} task - the task the test should execute, and capture results and errors from
* @returns {AssertionTest} this
* @memberof async-patterns.testing.AssertionTest#
*/
AssertionTest.prototype.execute = function execute(_execute) {
    this._execute = _execute;
    return this;
};
/**
*
* `AssertionTest#verify` lets you specify any number of tasks to verify the test results.
* Each `verify` task is passed a complete record of all test fixtures in an object,
* including the setup, the request, the result, and the error (if an error was thrown)
*
* @function verify
* @param {...function} tasks - any number of verification tasks
* @returns {AssertionTest} this
* @memberof async-patterns.testing.AssertionTest#
*/
AssertionTest.prototype.verify = function verify() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    this._verify = args;
    return this;
};
/**
*
* `AssertionTest#teardown` gives you a hook to tear down the test fixtures after execution.
* The `teardown` task is passed a complete record of all test fixtures in an object,
* including the setup, the request, the result, and the error (if an error was thrown)
*
* @function teardown
* @param {function} task - a task to tear down the setup
* @returns {AssertionTest} this
* @memberof async-patterns.testing.AssertionTest#
*/
AssertionTest.prototype.teardown = function teardown(_teardown) {
    this._teardown = _teardown;
    return this;
};
/**
*
* Builds the test case function.
*
* @function build
* @returns {function} callback-expecting test function
* @memberof async-patterns.testing.AssertionTest#
*/
AssertionTest.prototype.build = function build() {
    var _a = this, _setup = _a._setup, _prepare = _a._prepare, _execute = _a._execute, _verify = _a._verify, _teardown = _a._teardown, _description = _a._description;
    _execute = CatchError_1.default(_execute);
    _verify = InOrder_1.default.apply(void 0, _verify);
    var test = function () {
        return __awaiter(this, void 0, void 0, function () {
            var test, _a, _b, _c, result, error;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        test = {};
                        _a = test;
                        return [4 /*yield*/, _setup()];
                    case 1:
                        _a.setup = _d.sent();
                        _b = test;
                        return [4 /*yield*/, _prepare(test.setup)];
                    case 2:
                        _b.request = _d.sent();
                        return [4 /*yield*/, _execute(test.request)];
                    case 3:
                        _c = _d.sent(), result = _c.result, error = _c.error;
                        test.result = result;
                        test.error = error;
                        _d.label = 4;
                    case 4:
                        _d.trys.push([4, , 6, 8]);
                        return [4 /*yield*/, _verify(test)];
                    case 5:
                        _d.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, _teardown(test)];
                    case 7:
                        _d.sent();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    test = TraceError_1.default(test);
    test.label = _description;
    return test;
};
/**
* verifier function to make sure test DID NOT throw an error
* @function VerifyErrorWasNotThrown
* @memberof async-patterns.testing.AssertionTest
*/
AssertionTest.VerifyErrorWasNotThrown = Assert_1.default(function (context) { return context.error == null; }, function (context) { return context.error; });
/**
* verifier function to make sure test DID throw an error
* @function VerifyErrorWasNotThrown
* @memberof async-patterns.testing.AssertionTest
*/
AssertionTest.VerifyErrorWasThrown = Assert_1.default(function (context) { return context.error != null; }, 'AssertionTest.VerifyErrorWasThrown: error was not thrown');
module.exports = AssertionTest;
