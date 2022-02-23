"use strict";
/* eslint-env mocha, node */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isArray_1 = __importDefault(require("vet/arrays/isArray"));
var isAllOf_1 = __importDefault(require("vet/isAllOf"));
var isShape_1 = __importDefault(require("vet/objects/isShape"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var InSeries_1 = __importDefault(require("./InSeries"));
var InParallel_1 = __importDefault(require("./InParallel"));
var Throttle_1 = __importDefault(require("./Throttle"));
var _isRes = (0, isAllOf_1.default)(isArray_1.default, (0, isShape_1.default)({
    length: 8,
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
}));
var isRes = _isRes;
describe('Throttle', function () {
    it('test with 0 handlers', (0, Callbackify_1.default)(Throttle_1.default));
    it('test with null callback', function (done) {
        (0, Throttle_1.default)(function () { return null; })();
        setTimeout(done, 16);
    });
    it('throttling doesnt break', function (done) {
        var arr = [];
        var task = (0, Throttle_1.default)(function (i) {
            arr.push(i);
        });
        (0, Callbackify_1.default)((0, InSeries_1.default)((0, InParallel_1.default)(function () { return task(0); }, function () { return task(1); }, function () { return task(2); }, function () { return task(3); }, function () { return task(4); }, function () { return task(5); }, function () { return task(6); }, function () { return task(7); }), function () {
            isRes.assert(arr);
        }))(done);
    });
});
