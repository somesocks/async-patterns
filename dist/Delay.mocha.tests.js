"use strict";
/* eslint-env mocha, node */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Assert_1 = __importDefault(require("./Assert"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var InSeries_1 = __importDefault(require("./InSeries"));
var Delay_1 = __importDefault(require("./Delay"));
describe('Delay', function () {
    it('Delay 1', Callbackify_1.default(InSeries_1.default(function () { return [1, 2, 3]; }, Delay_1.default(100), Assert_1.default(function (_a) {
        var a = _a[0], b = _a[1], c = _a[2];
        return (a === 1 && b === 2 && c === 3);
    }))));
    it('Delay 2', Callbackify_1.default(InSeries_1.default(function () { return [1, 2, 3]; }, Delay_1.default(), Assert_1.default(function (_a) {
        var a = _a[0], b = _a[1], c = _a[2];
        return (a === 1 && b === 2 && c === 3);
    }))));
});
