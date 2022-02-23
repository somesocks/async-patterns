"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Assert_1 = __importDefault(require("./Assert"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var InSeries_1 = __importDefault(require("./InSeries"));
var ParallelMap_1 = __importDefault(require("./ParallelMap"));
describe('ParallelMap', function () {
    it('test with 0 args', function (done) {
        var task = (0, Callbackify_1.default)((0, ParallelMap_1.default)(function (item) { return true; }));
        task(done);
    });
    it('catches errors', function (done) {
        var task = (0, Callbackify_1.default)((0, ParallelMap_1.default)(function (item) { throw new Error('error'); }));
        var onDone = function (err, res) { return done(err != null ? null : err); };
        task(onDone, [1, 2, 3]);
    });
    it('works 1', function (done) {
        var task = (0, Callbackify_1.default)((0, InSeries_1.default)(function () { return [1, 2, 3]; }, (0, ParallelMap_1.default)(function (item) { return item > 1; }), (0, Assert_1.default)(function (_a) {
            var a = _a[0], b = _a[1], c = _a[2];
            return a === false && b === true && c === true;
        })));
        task(done);
    });
    it('performance', function (done) {
        var task = (0, Callbackify_1.default)((0, InSeries_1.default)((0, ParallelMap_1.default)(function (item) { return item > 0; })));
        task(done, Array(10000).fill(1));
    });
});
