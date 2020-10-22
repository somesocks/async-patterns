"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Assert_1 = __importDefault(require("./Assert"));
var Callbackify_1 = __importDefault(require("./Callbackify"));
var InSeries_1 = __importDefault(require("./InSeries"));
var PassThrough_1 = __importDefault(require("./PassThrough"));
var Logging_1 = __importDefault(require("./Logging"));
var t1 = InSeries_1.default(PassThrough_1.default, Logging_1.default('foo'), function (a) { return a + 1; }, PassThrough_1.default, function (b) { return b + '1'; }, PassThrough_1.default, function (c) { return Boolean(c); }, Logging_1.default('foo'), PassThrough_1.default);
var t2 = InSeries_1.default(function (a) { return a + 1; }, function (b) { return b + '1'; }, function (c) { return Boolean(c); });
var t3 = InSeries_1.default();
var t4 = InSeries_1.default(function (a) { return a + 1; }, function (b) { return b + '1'; }, function (c) { return Promise.resolve(Boolean(c)); });
var t5 = InSeries_1.default(function (val) { return val + 1; }, function (val) { return val + 1; }, function (val) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, val + 1];
}); }); });
var t6 = InSeries_1.default(InSeries_1.default(function (val) { return val + 1; }));
var t7 = InSeries_1.default(function (a) { return a + 1; }, function () { return 1; }, function () { return 1; }, function () { return 1; });
describe('InSeries tests', function () {
    it('test with 0 handlers', function (done) {
        Callbackify_1.default(InSeries_1.default())(done);
    });
    it('test with null return', function (done) {
        var task = InSeries_1.default(function (a) { return a; }, function (a) { return a + 1; });
        var task2 = InSeries_1.default(function () { return 1; }, task, function (a) { return a; });
        var p = task(1);
        Callbackify_1.default(task)(done);
    });
    it('catches errors', function (done) {
        var task = Callbackify_1.default(InSeries_1.default(function () { }, function () { throw new Error('error'); }));
        task(function (err, res) { return done(err != null ? null : err); });
    });
    it('catches errors 2', function (done) {
        var task = Callbackify_1.default(InSeries_1.default(function () { }, function () { return Promise.reject('error'); }));
        task(function (err, res) { return done(err != null ? null : err); });
    });
    it('works', Callbackify_1.default(InSeries_1.default(function () { return 1; }, InSeries_1.default(function (val) { return val + 1; }, function (val) { return val + 1; }, function (val) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, val + 1];
    }); }); }), Assert_1.default(function (val) { return val === 4; }))));
    var SHORT_CHAIN = InSeries_1.default.apply(void 0, Array(1000).fill(PassThrough_1.default));
    var LONG_CHAIN = InSeries_1.default.apply(void 0, Array(1000).fill(SHORT_CHAIN));
    it('Long Chain Performance', function (done) {
        Callbackify_1.default(LONG_CHAIN)(done, [1, 2, 3]);
    });
});
