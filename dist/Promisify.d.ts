import AsyncTask from './types/AsyncTask';
import CallbackTask from './types/CallbackTask';
/**
* ```javascript
    const task = Promisify(
        (onDone, i) => onDone(
            i === 0 ? new Error('i cant be 0') : null,
            i + 1
        ),
    );

    const results = await task(1); // results is 2
    const results2 = await taks(0); // throws 'i cant be 0 Error
* ```
*
* @name Promisify
* @param {function} task - a callback-expecting function
* @returns {function} an async function
* @memberof async-patterns
*/
declare const Promisify: (task: CallbackTask) => AsyncTask;
export = Promisify;
