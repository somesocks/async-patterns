"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Assert_1 = __importDefault(require("./Assert"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var InSeries_1 = __importDefault(require("./InSeries"));
var optional_1 = __importDefault(require("vet/optional"));
var exists_1 = __importDefault(require("vet/exists"));
var isBoolean_1 = __importDefault(require("vet/booleans/isBoolean"));
var isNumber_1 = __importDefault(require("vet/numbers/isNumber"));
describe('Assert', function () {
    it('Assert 1', Callbackify_1.default(InSeries_1.default(function () { return true; }, Assert_1.default(function (arg) {
        console.log('assert arg', arg);
        return isBoolean_1.default(arg);
    }), function (val) { return console.log('val', val); })));
    it('Assert 2', function (done) {
        var task = Callbackify_1.default(InSeries_1.default(function () { return false; }, Assert_1.default(isNumber_1.default)));
        task(function (err) { return done(err != null ? null : new Error('expected error')); });
    });
    it('Assert 3', function (done) {
        var task = Callbackify_1.default(Assert_1.default(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return optional_1.default(exists_1.default)(args);
        }));
        task(done);
    });
});
