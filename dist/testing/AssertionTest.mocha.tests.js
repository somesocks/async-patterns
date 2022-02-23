"use strict";
/* eslint-env mocha */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Assert_1 = __importDefault(require("../Assert"));
// import Callbackify from '../Callbackify';
var Promisify_1 = __importDefault(require("../Promisify"));
var Logging_1 = __importDefault(require("../Logging"));
var InOrder_1 = __importDefault(require("../InOrder"));
var ping_1 = __importDefault(require("ping"));
var AssertionTest_1 = __importDefault(require("./AssertionTest"));
var EmptyTest = (0, AssertionTest_1.default)()
    .describe('empty test works')
    .build();
var SetupTest = (0, AssertionTest_1.default)()
    .describe('test with setup works')
    .setup(function () { return 'setup'; })
    .verify((0, Assert_1.default)(function (context) { return context.setup === 'setup'; }, 'bad setup'))
    .build();
var SampleTest = (0, AssertionTest_1.default)()
    .describe('sample test 1')
    .setup(function () { return ({ val: 1 }); })
    .prepare(function (setup) { return setup.val; })
    .execute(function (request) { return request + 1; })
    .verify((0, Assert_1.default)(function (context) { return context.setup.val === 1; }, 'bad setup'), (0, Assert_1.default)(function (context) { return context.result === 2; }, 'bad result'))
    .teardown((0, Assert_1.default)(function (context) { return context.setup.val === 1 && context.result === 2; }, 'bad teardown'))
    .build();
var SampleTest2 = (0, AssertionTest_1.default)()
    .describe('sample test 1')
    .setup(function () { return ({ val: 1 }); })
    .prepare(function (setup) { return setup.val; })
    .execute((0, InOrder_1.default)(function (request) { return request + 1; }, function (request) { return request + 1; }))
    .verify((0, Assert_1.default)(function (context) { return context.setup.val === 1; }, 'bad setup'), (0, Assert_1.default)(function (context) { return context.result === 2; }, 'bad result'))
    .teardown((0, Assert_1.default)(function (context) { return context.setup.val === 1 && context.result === 2; }, 'bad teardown'))
    .build();
var PingTest = (0, AssertionTest_1.default)()
    .describe('can ping internet')
    .setup(
// build our setup
function () {
    var setup = {
        testHosts: ['google.com', 'microsoft.com', 'yahoo.com'],
    };
    return setup;
})
    .prepare(
// run test with first host
function (setup) {
    var host = setup.testHosts[0];
    return host;
})
    .execute((0, Promisify_1.default)(function (next, host) { return ping_1.default.sys.probe(host, function (isAlive, error) { return next(error, isAlive); }); }))
    .verify((0, Logging_1.default)(function (_a) {
    var request = _a.request, result = _a.result;
    return "ping result for ".concat(request, ": ").concat(result);
}), 
// verify no error was thrown
(0, Assert_1.default)(function (_a) {
    var error = _a.error;
    return error == null;
}, 'error was thrown'), 
// verify result is true
(0, Assert_1.default)(function (_a) {
    var request = _a.request, result = _a.result;
    return result === true;
}, function (_a) {
    var request = _a.request, result = _a.result;
    return "could not ping host ".concat(request);
}))
    .teardown(
// nothing to teardown
function () { return null; })
    .build();
var LogErrorTest = (0, AssertionTest_1.default)()
    .describe('AssertionTest.LogError works')
    .execute(function () { throw new Error('test error'); })
    .verify(AssertionTest_1.default.LogError)
    .build();
var LogSetupTest = (0, AssertionTest_1.default)()
    .describe('AssertionTest.LogSetup works')
    .setup(function () { return 1; })
    .prepare(function (setup) { return setup + 1; })
    .execute(function (request) { return request + 1; })
    .verify(AssertionTest_1.default.LogSetup)
    .build();
var LogRequestTest = (0, AssertionTest_1.default)()
    .describe('AssertionTest.LogRequestTest works')
    .setup(function () { return 1; })
    .prepare(function (setup) { return setup + 1; })
    .execute(function (request) { return request + 1; })
    .verify(AssertionTest_1.default.LogRequest)
    .build();
var LogResultTest = (0, AssertionTest_1.default)()
    .describe('AssertionTest.LogResultTest works')
    .setup(function () { return 1; })
    .prepare(function (setup) { return setup + 1; })
    .execute(function (request) { return request + 1; })
    .verify(AssertionTest_1.default.LogResult)
    .build();
var TESTS = [
    EmptyTest,
    SetupTest,
    SampleTest,
    PingTest,
    LogErrorTest,
    LogSetupTest,
    LogRequestTest,
    LogResultTest,
];
describe('AssertionTest', function () {
    TESTS.forEach(function (test, i) { return it(test.label, function () { return test(); }); });
});
