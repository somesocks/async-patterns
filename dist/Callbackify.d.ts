import AsyncTask from './types/AsyncTask';
import SyncTask from './types/SyncTask';
import CallbackTask from './types/CallbackTask';
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
declare const Callbackify: (task?: AsyncTask | SyncTask | undefined) => CallbackTask;
export = Callbackify;
