"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Assert_1 = __importDefault(require("./Assert"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var InSeries_1 = __importDefault(require("./InSeries"));
var InParallel_1 = __importDefault(require("./InParallel"));
var PassThrough_1 = __importDefault(require("./PassThrough"));
describe('InParallel', function () {
    var LONG_CHAIN = InParallel_1.default.apply(void 0, Array(50000).fill(PassThrough_1.default));
    it('Parallel Performance', function (done) {
        Callbackify_1.default(LONG_CHAIN)(done);
    });
    it('Parallel Performance 2', function (done) {
        Callbackify_1.default(LONG_CHAIN)(done, 1);
    });
    it('Parallel Performance 3', function (done) {
        Callbackify_1.default(LONG_CHAIN)(done, 1, 2, 3, 4, 5, 6, 7, 8);
    });
    it('test with 0 handlers', function (done) {
        Callbackify_1.default(InParallel_1.default())(done);
    });
    it('works', function (done) {
        var task = InParallel_1.default(function (a) { }, function (a) { return null; }, function () { return 1; });
        var task2 = Callbackify_1.default(InSeries_1.default(task, Assert_1.default(function (_a) {
            var r0 = _a[0], r1 = _a[1], r2 = _a[2];
            return r0 === undefined;
        }, 'empty results failed'), Assert_1.default(function (_a) {
            var r0 = _a[0], r1 = _a[1], r2 = _a[2];
            return r1 === null;
        }, function (_a) {
            var r0 = _a[0], r1 = _a[1], r2 = _a[2];
            return "null check failed " + r1;
        }), Assert_1.default(function (_a) {
            var r0 = _a[0], r1 = _a[1], r2 = _a[2];
            return r2 === 1;
        }, function (_a) {
            var r0 = _a[0], r1 = _a[1], r2 = _a[2];
            return "results failed " + r2;
        })));
        task2(done);
    });
    it('catches errors', function (done) {
        var task = Callbackify_1.default(InParallel_1.default(function () { }, function () { throw new Error('error'); }));
        task(function (err, res) { return done(err != null ? null : err); });
    });
    it('catches errors 2', function (done) {
        var task = Callbackify_1.default(InParallel_1.default(function () { }, function () { return Promise.reject('error'); }));
        task(function (err, res) { return done(err != null ? null : err); });
    });
    it('catches deep errors', function (done) {
        var task = Callbackify_1.default(InParallel_1.default(function () { }, InParallel_1.default(InParallel_1.default(function () { return Promise.reject('error'); }))));
        task(function (err, res) { return done(err != null ? null : err); });
    });
});
