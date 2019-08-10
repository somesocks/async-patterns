"use strict";
/* eslint-env mocha, node */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Callbackify_1 = __importDefault(require("./Callbackify"));
var InSeries_1 = __importDefault(require("./InSeries"));
var InParallel_1 = __importDefault(require("./InParallel"));
var Throttle_1 = __importDefault(require("./Throttle"));
var chai_1 = require("chai");
describe('Throttle', function () {
    it('test with 0 handlers', Callbackify_1.default(Throttle_1.default));
    it('test with null callback', function (done) {
        Throttle_1.default(function () { return null; })();
        setTimeout(done, 16);
    });
    it('throttling doesnt break', function (done) {
        var arr = [];
        var task = Throttle_1.default(function (i) {
            arr.push(i);
        });
        Callbackify_1.default(InSeries_1.default(InParallel_1.default(function () { return task(1); }, function () { return task(2); }, function () { return task(3); }, function () { return task(4); }, function () { return task(5); }, function () { return task(6); }, function () { return task(7); }, function () { return task(8); }), function () {
            chai_1.assert.deepEqual(arr, [1, 2, 3, 4, 5, 6, 7, 8]);
        }))(done);
    });
});
