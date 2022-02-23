"use strict";
/* eslint-env mocha, node */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Assert_1 = __importDefault(require("./Assert"));
var CatchError_1 = __importDefault(require("./CatchError"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var InSeries_1 = __importDefault(require("./InSeries"));
var Promisify_1 = __importDefault(require("./Promisify"));
describe('Callbackify', function () {
    it('Function.length should be at least 1', function () {
        if ((0, Callbackify_1.default)().length < 1) {
            throw new Error();
        }
        if ((0, Callbackify_1.default)(function () { }).length < 1) {
            throw new Error();
        }
    });
    it('Callbackify.resolve works', (0, Callbackify_1.default)((0, InSeries_1.default)(function () { return 2; }, (0, Promisify_1.default)((0, Callbackify_1.default)(function (val) { return new Promise(function (resolve, reject) { return resolve(val); }); })), (0, Assert_1.default)(function (val) { return val === 2; }, 'Callbackify failed to resolve'))));
    it('Callbackify.reject works', (0, Callbackify_1.default)((0, InSeries_1.default)(function () { return 2; }, (0, CatchError_1.default)((0, Promisify_1.default)((0, Callbackify_1.default)(function (val) { return new Promise(function (resolve, reject) { return reject(val); }); }))), (0, Assert_1.default)(function (_a) {
        var error = _a.error;
        return error !== null;
    }, 'Callbackify failed to reject'))));
    it('Callbackify catches thrown error', (0, Callbackify_1.default)((0, InSeries_1.default)(function () { return 2; }, (0, CatchError_1.default)((0, Promisify_1.default)((0, Callbackify_1.default)(function (val) { throw new Error('test error'); }))), (0, Assert_1.default)(function (_a) {
        var error = _a.error;
        return error !== null && error.message === 'test error';
    }, 'Callbackify failed to catch thrown error'))));
    it('test with 0 handlers', function (done) {
        (0, Callbackify_1.default)()(done);
    });
});
