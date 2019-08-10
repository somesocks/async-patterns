"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Assert_1 = __importDefault(require("./Assert"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var InSeries_1 = __importDefault(require("./InSeries"));
var ParallelFilter_1 = __importDefault(require("./ParallelFilter"));
describe('ParallelFilter', function () {
    it('test with 0 args', function (done) {
        var task = Callbackify_1.default(ParallelFilter_1.default(function (item) { return true; }));
        task(done);
    });
    it('catches errors', function (done) {
        var task = Callbackify_1.default(ParallelFilter_1.default(function (item) { throw new Error('error'); }));
        var onDone = function (err, res) { return done(err != null ? null : err); };
        task(onDone, [1, 2, 3]);
    });
    it('works 1', function (done) {
        var task = Callbackify_1.default(InSeries_1.default(function () { return [1, 2, 3]; }, ParallelFilter_1.default(function (item) { return item > 1; }), Assert_1.default(function (_a) {
            var a = _a[0], b = _a[1], c = _a[2];
            return a === 2 && b === 3 && c === undefined;
        })));
        task(done);
    });
    it('performance', function (done) {
        var task = Callbackify_1.default(InSeries_1.default(ParallelFilter_1.default(function (item) { return item > 0; })));
        task(done, Array(10000).fill(1));
    });
});
