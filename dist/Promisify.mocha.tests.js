"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Promisify_1 = __importDefault(require("./Promisify"));
describe('Promisify', function () {
    it('Promisify works', function (done) {
        new Promise(function (resolve) { return resolve(); })
            .then((0, Promisify_1.default)(function (next) { return next(); }))
            .then(function () { return done(); });
    });
    it('Promisify catches callback errors', function (done) {
        var onCatch = function (err) {
            if (err == null) {
                done(new Error('didnt catch'));
            }
            else {
                done();
            }
        };
        new Promise(function (resolve) { return resolve(); })
            .then((0, Promisify_1.default)(function (next) { return next(new Error('throw error')); }))
            .catch(onCatch);
    });
    it('Promisify catches thrown errors', function (done) {
        var onCatch = function (err) {
            if (err == null) {
                done(new Error('didnt catch'));
            }
            else {
                done();
            }
        };
        new Promise(function (resolve) { return resolve(); })
            .then((0, Promisify_1.default)(function (next) { throw new Error('throw error'); }))
            .catch(onCatch);
    });
});
