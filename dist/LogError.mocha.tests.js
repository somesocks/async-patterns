"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CatchError_1 = __importDefault(require("./CatchError"));
var LogError_1 = __importDefault(require("./LogError"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var InSeries_1 = __importDefault(require("./InSeries"));
describe('LogError', function () {
    it('LogError 1', function (done) {
        var task = Callbackify_1.default(InSeries_1.default(LogError_1.default(function () { return 1; }), function () { }));
        task(done);
    });
    it('LogError 2', function (done) {
        var task = Callbackify_1.default(InSeries_1.default(CatchError_1.default(LogError_1.default(function () { throw new Error('error'); }))));
        task(done);
    });
});
