"use strict";
/* eslint-env mocha, node */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Assert_1 = __importDefault(require("./Assert"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var InSeries_1 = __importDefault(require("./InSeries"));
var While_1 = __importDefault(require("./While"));
describe('While', function () {
    it('test with 0 handlers', (0, Callbackify_1.default)((0, While_1.default)()));
    it('test with null callback', function (done) {
        (0, While_1.default)()();
        setTimeout(done, 16);
    });
    it('works correctly', (0, Callbackify_1.default)((0, InSeries_1.default)(function () { return 1; }, (0, While_1.default)(function (num) { return num < 10; }, function (num) { return num + 1; }), (0, Assert_1.default)(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args[0] === 10;
    }, 'Value not 10'))));
    it('catches errors', function (done) {
        (0, Callbackify_1.default)((0, While_1.default)(function () { return true; }, function () { throw new Error('error'); }))(function (err, res) { return done(err != null ? null : err); });
    });
    it('deep loop works correctly', (0, Callbackify_1.default)((0, InSeries_1.default)(function () { return 1; }, (0, While_1.default)(function (num) { return num < 100000; }, function (num) { return num + 1; }), (0, Assert_1.default)(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args[0] === 100000;
    }, 'Value not 100000'))));
});
