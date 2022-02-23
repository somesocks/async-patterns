"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Assert_1 = __importDefault(require("./Assert"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var InSeries_1 = __importDefault(require("./InSeries"));
var If_1 = __importDefault(require("./If"));
describe('If', function () {
    it('test with 0 handlers', (0, Callbackify_1.default)((0, InSeries_1.default)(function () { return true; }, (0, If_1.default)())));
    it('catches errors', function (done) {
        var task = (0, Callbackify_1.default)((0, If_1.default)(function () { return true; }, function () { throw new Error('error'); }));
        task(function (err, res) { return done(err != null ? null : err); });
    });
    it('then works', (0, Callbackify_1.default)((0, InSeries_1.default)(function () { return 1; }, (0, If_1.default)(function (i) { return i > 0; }, function () { return true; }, function () { return false; }), (0, Assert_1.default)(function (val) { return val === true; }))));
    it('else works', (0, Callbackify_1.default)((0, InSeries_1.default)(function () { return -1; }, (0, If_1.default)(function (i) { return i > 0; }, function () { return true; }, function () { return false; }), (0, Assert_1.default)(function (val) { return val === false; }))));
});
