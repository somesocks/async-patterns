"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Delay_1 = __importDefault(require("../Delay"));
var CatchError_1 = __importDefault(require("../CatchError"));
var Callbackify_1 = __importDefault(require("../Callbackify"));
var InSeries_1 = __importDefault(require("../InSeries"));
var Logging_1 = __importDefault(require("../Logging"));
var TraceError_1 = __importDefault(require("./TraceError"));
describe('TraceError tests', function () {
    it('Function.length should be at least 1', function () {
        if ((0, TraceError_1.default)().length < 1) {
            throw new Error();
        }
        if ((0, TraceError_1.default)(function () { }).length < 1) {
            throw new Error();
        }
    });
    it('test with 0 handlers', (0, Callbackify_1.default)((0, TraceError_1.default)()));
    it('test with null return', (0, Callbackify_1.default)((0, TraceError_1.default)(function () { return null; })));
    it('passes errors', function (done) {
        (0, Callbackify_1.default)((0, TraceError_1.default)(function () { throw new Error('error'); }))(function (err, res) { return done(err != null ? null : err); });
    });
    it('deep error stack works', (0, Callbackify_1.default)((0, InSeries_1.default)((0, CatchError_1.default)((0, TraceError_1.default)((0, InSeries_1.default)((0, InSeries_1.default)((0, Delay_1.default)(500), function () { throw new Error('error'); })))), (0, Logging_1.default)('Error Stack\n', function (_a) {
        var error = _a.error;
        return error;
    }))));
});
