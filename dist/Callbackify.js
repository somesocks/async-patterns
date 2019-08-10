"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var PassThrough_1 = __importDefault(require("./PassThrough"));
/**
* ```javascript
    const task = Callbackify(
        async (i) => i + 1
    );

    // logs 'res 1', eventually
    task(
        (err, res) => console.log('res', res),
        0
    );
* ```
*
* @name Callbackify
* @param {function} task - an async function
* @returns {function} a callback-expecting function
* @memberof async-patterns
*/
var Callbackify = function (task) {
    var task2 = task || PassThrough_1.default;
    return function (callback, request) {
        var promise = task2(request);
        promise = promise instanceof Promise ? promise : Promise.resolve(promise);
        promise
            .then(function (result) { return callback(null, result); })
            .catch(function (error) { return callback(error); });
    };
};
module.exports = Callbackify;
