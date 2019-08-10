"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Assert_1 = __importDefault(require("./Assert"));
var CatchError_1 = __importDefault(require("./CatchError"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var InSeries_1 = __importDefault(require("./InSeries"));
describe('CatchError', function () {
    it('CatchError 1', function (done) {
        var task = Callbackify_1.default(InSeries_1.default(CatchError_1.default(function () { return 1; }), Assert_1.default(function (_a) {
            var error = _a.error, result = _a.result;
            return error == null && result === 1;
        }), function () { }));
        task(done);
    });
    it('CatchError 2', function (done) {
        var task = Callbackify_1.default(InSeries_1.default(CatchError_1.default(function () { throw new Error('error'); }), Assert_1.default(function (_a) {
            var error = _a.error, result = _a.result;
            return error != null;
        }), Assert_1.default(function (_a) {
            var error = _a.error, result = _a.result;
            return result == null;
        })));
        task(done);
    });
});
