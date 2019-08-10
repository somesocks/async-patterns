"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Assert_1 = __importDefault(require("./Assert"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var InSeries_1 = __importDefault(require("./InSeries"));
var Delay_1 = __importDefault(require("./Delay"));
var PassThrough_1 = __importDefault(require("./PassThrough"));
var Memoize_1 = __importDefault(require("./Memoize"));
describe('Memoize', function () {
    it('Function.length should be at least 1', function () {
        if (Memoize_1.default().length < 1) {
            throw new Error();
        }
        if (Memoize_1.default(function () { }).length < 1) {
            throw new Error();
        }
    });
    it('test with 0 handlers', function (done) {
        Callbackify_1.default(Memoize_1.default())(done);
    });
    it('catches errors', function (done) {
        Callbackify_1.default(Memoize_1.default(function () { throw new Error('error'); }))(function (err, res) { return done(err != null ? null : err); });
    });
    it('memoize works', function (done) {
        var counter = 0;
        var task = Memoize_1.default(function () { ++counter; return counter; });
        var test = InSeries_1.default(function () { return task(); }, function () { return task(); }, function () { return task(); }, Assert_1.default(function (val) { return val === 1; }, function (val) { return "expected val to be 1, got " + val; }), Assert_1.default(function () { return counter === 1; }, function () { return "expected counter to be 1, got " + counter; }));
        Callbackify_1.default(test)(done);
    });
    it('memoize speeds up task', function (done) {
        var slowTask = InSeries_1.default(PassThrough_1.default, Delay_1.default(1000));
        var fastTask = Memoize_1.default(slowTask);
        var start;
        var finish;
        var test = InSeries_1.default(function () { start = Date.now(); }, function () { return fastTask(); }, function () { return fastTask(); }, function () { return fastTask(); }, function () { return fastTask(); }, function () { return fastTask(); }, function () { return fastTask(); }, function () { finish = Date.now(); }, Assert_1.default(function () { return finish - start < 2000; }, function (val) { return "expected elapsed time under 2000 ms, got " + (finish - start); }));
        Callbackify_1.default(test)(done);
    });
    var MEMOIZED_TASK = Memoize_1.default(PassThrough_1.default);
    var SHORT_CHAIN = InSeries_1.default.apply(void 0, Array(1000).fill(MEMOIZED_TASK));
    var LONG_CHAIN = InSeries_1.default.apply(void 0, Array(1000).fill(SHORT_CHAIN));
    it('Long Chain Performance', function (done) {
        Callbackify_1.default(LONG_CHAIN)(done, 1, 2, 3);
    });
});
