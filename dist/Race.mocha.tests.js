"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Callbackify_1 = __importDefault(require("./Callbackify"));
var Race_1 = __importDefault(require("./Race"));
describe('Race', function () {
    it('test with 0 handlers', function (done) {
        Callbackify_1.default(Race_1.default())(done);
    });
    it('catches errors', function (done) {
        Callbackify_1.default(Race_1.default(function () { throw new Error('error'); }))(function (err, res) { return done(err != null ? null : err); });
    });
    it('catches errors 2', function (done) {
        Callbackify_1.default(Race_1.default(function () { return Promise.reject('error'); }))(function (err, res) { return done(err != null ? null : err); });
    });
    it('works 1', function (done) {
        Callbackify_1.default(Race_1.default(function () { return 1; }, function () { }))(function (err, res) { return done(((err != null) && (res === 1)) ? null : err); });
    });
});
