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
var EmptyTest = AssertionTest_1.default()
    .describe('empty test works')
    .build();
var SetupTest = AssertionTest_1.default()
    .describe('test with setup works')
    .setup(function () { return 'setup'; })
    .verify(Assert_1.default(function (context) { return context.setup === 'setup'; }, 'bad setup'))
    .build();
var SampleTest = AssertionTest_1.default()
    .describe('sample test 1')
    .setup(function () { return ({ val: 1 }); })
    .prepare(function (setup) { return setup.val; })
    .execute(function (request) { return request + 1; })
    .verify(Assert_1.default(function (context) { return context.setup.val === 1; }, 'bad setup'), Assert_1.default(function (context) { return context.result === 2; }, 'bad result'))
    .teardown(Assert_1.default(function (context) { return context.setup.val === 1 && context.result === 2; }, 'bad teardown'))
    .build();
var SampleTest2 = AssertionTest_1.default()
    .describe('sample test 1')
    .setup(function () { return ({ val: 1 }); })
    .prepare(function (setup) { return setup.val; })
    .execute(InOrder_1.default(function (request) { return request + 1; }, function (request) { return request + 1; }))
    .verify(Assert_1.default(function (context) { return context.setup.val === 1; }, 'bad setup'), Assert_1.default(function (context) { return context.result === 2; }, 'bad result'))
    .teardown(Assert_1.default(function (context) { return context.setup.val === 1 && context.result === 2; }, 'bad teardown'))
    .build();
var PingTest = AssertionTest_1.default()
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
    .execute(Promisify_1.default(function (next, host) { return ping_1.default.sys.probe(host, function (isAlive, error) { return next(error, isAlive); }); }))
    .verify(Logging_1.default(function (_a) {
    var request = _a.request, result = _a.result;
    return "ping result for " + request + ": " + result;
}), 
// verify no error was thrown
Assert_1.default(function (_a) {
    var error = _a.error;
    return error == null;
}, 'error was thrown'), 
// verify result is true
Assert_1.default(function (_a) {
    var request = _a.request, result = _a.result;
    return result === true;
}, function (_a) {
    var request = _a.request, result = _a.result;
    return "could not ping host " + request;
}))
    .teardown(
// nothing to teardown
function () { return null; })
    .build();
var LogErrorTest = AssertionTest_1.default()
    .describe('AssertionTest.LogError works')
    .execute(function () { throw new Error('test error'); })
    .verify(AssertionTest_1.default.LogError)
    .build();
var LogSetupTest = AssertionTest_1.default()
    .describe('AssertionTest.LogSetup works')
    .setup(function () { return 1; })
    .prepare(function (setup) { return setup + 1; })
    .execute(function (request) { return request + 1; })
    .verify(AssertionTest_1.default.LogSetup)
    .build();
var LogRequestTest = AssertionTest_1.default()
    .describe('AssertionTest.LogRequestTest works')
    .setup(function () { return 1; })
    .prepare(function (setup) { return setup + 1; })
    .execute(function (request) { return request + 1; })
    .verify(AssertionTest_1.default.LogRequest)
    .build();
var LogResultTest = AssertionTest_1.default()
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
