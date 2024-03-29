"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Callbackify_1 = __importDefault(require("./Callbackify"));
var Logging_1 = __importDefault(require("./Logging"));
describe('Logging', function () {
    it('Function.length should be at least 1', function () {
        if ((0, Logging_1.default)().length < 1) {
            throw new Error();
        }
    });
    it('Logging with string', function (done) {
        (0, Callbackify_1.default)((0, Logging_1.default)('test'))(done, 1, 2, 3);
    });
    it('Logging with function', function (done) {
        (0, Callbackify_1.default)((0, Logging_1.default)(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return "".concat(args);
        }))(done, 1, 2, 3);
    });
    it('Logging with multiple statements function', function (done) {
        (0, Callbackify_1.default)((0, Logging_1.default)('Logging test', { test: 1 }, 1, false, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return "".concat(args[0]);
        }, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return "".concat(args[1]);
        }, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return "".concat(args[2]);
        }, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return "".concat(args);
        }))(done, 1, 2, 3);
    });
});
