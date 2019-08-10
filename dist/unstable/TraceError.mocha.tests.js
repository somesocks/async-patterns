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
        if (TraceError_1.default().length < 1) {
            throw new Error();
        }
        if (TraceError_1.default(function () { }).length < 1) {
            throw new Error();
        }
    });
    it('test with 0 handlers', Callbackify_1.default(TraceError_1.default()));
    it('test with null return', Callbackify_1.default(TraceError_1.default(function () { return null; })));
    it('passes errors', function (done) {
        Callbackify_1.default(TraceError_1.default(function () { throw new Error('error'); }))(function (err, res) { return done(err != null ? null : err); });
    });
    it('deep error stack works', Callbackify_1.default(InSeries_1.default(CatchError_1.default(TraceError_1.default(InSeries_1.default(InSeries_1.default(Delay_1.default(500), function () { throw new Error('error'); })))), Logging_1.default('Error Stack\n', function (_a) {
        var error = _a.error;
        return error;
    }))));
});
