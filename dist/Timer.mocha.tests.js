"use strict";
/* eslint-env mocha, node */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Callbackify_1 = __importDefault(require("./Callbackify"));
var Promisify_1 = __importDefault(require("./Promisify"));
var Timer_1 = __importDefault(require("./Timer"));
describe('Timer', function () {
    it('test with 0 handlers', function (done) {
        (0, Callbackify_1.default)((0, Timer_1.default)())(done);
    });
    it('test with null return', function (done) {
        (0, Callbackify_1.default)((0, Timer_1.default)((0, Promisify_1.default)(function (next) { return next(); })))(done);
    });
    it('Function.length should be at least 1', function () {
        if ((0, Timer_1.default)().length < 1) {
            throw new Error();
        }
        if ((0, Timer_1.default)((0, Promisify_1.default)(function (next) { return true; })).length < 1) {
            throw new Error();
        }
    });
    it('test with null callback', function (done) {
        (0, Timer_1.default)((0, Promisify_1.default)(function (next) { return next(); }))();
        setTimeout(done, 16);
    });
    it('catches errors', function (done) {
        (0, Callbackify_1.default)((0, Timer_1.default)((0, Promisify_1.default)(function (next) { throw new Error('error'); })))(function (err, res) { return done(err != null ? null : err); });
    });
    it('returns 1', function (done) {
        (0, Callbackify_1.default)((0, Timer_1.default)((0, Promisify_1.default)(function (next) { return next(null, 1); })))(function (err, res) { return done(((err != null) && (res === 1)) ? null : err); });
    });
    it('label works', function (done) {
        (0, Callbackify_1.default)((0, Timer_1.default)((0, Promisify_1.default)(function (next) { return next(null, 1); }), 'Label'))(function (err, res) { return done(((err != null) && (res === 1)) ? null : err); });
    });
    it('measures time', function (done) {
        (0, Callbackify_1.default)((0, Timer_1.default)((0, Promisify_1.default)(function (next) { return setTimeout(next, 128); })))(done);
    });
});
