# async-patterns

`async-patterns` is a collection of design patterns for async/await or promise-driven async code.  The design patterns in this library are constructors that build callback-expecting functions.  Each pattern is designed to be a stand-alone piece of code, tested for performance and robustness.

## API

<a name="callback-patterns"></a>

## callback-patterns : <code>object</code>
**Kind**: global namespace  

* [callback-patterns](#callback-patterns) : <code>object</code>
    * [.Delay(delay)](#callback-patterns.Delay) ⇒ <code>taskFunction</code>
    * [.If(ifTask, thenTask, elseTask)](#callback-patterns.If) ⇒ <code>taskFunction</code>
    * [.Logging(...statements)](#callback-patterns.Logging) ⇒ <code>taskFunction</code>
    * [.Retry(task, options)](#callback-patterns.Retry) ⇒ <code>taskFunction</code>
    * [.Throttle(task, limit)](#callback-patterns.Throttle) ⇒ <code>taskFunction</code>
    * [.TimeIn(task, ms)](#callback-patterns.TimeIn) ⇒ <code>taskFunction</code>
    * [.TimeOut(task, ms)](#callback-patterns.TimeOut) ⇒ <code>taskFunction</code>
    * [.Timer(task, label)](#callback-patterns.Timer) ⇒ <code>taskFunction</code>
    * [.While(conditionTask, loopTask)](#callback-patterns.While) ⇒ <code>function</code>


* * *

<a name="callback-patterns.Delay"></a>

### callback-patterns.Delay(delay) ⇒ <code>taskFunction</code>
```javascript
  let Delay = require('callback-patterns/Delay');
  let InSeries = require('callback-patterns/InSeries');

  let task = InSeries(
    (next, num) => next(null, num),
    Delay(100),
    (next, num) => next(null, num + 1),
  );

  let onDone = (err, result) => console.log(err, result);

  task(onDone, 1); // prints null 1, after a 100 ms delay
```
Delay acts like PassThrough, but inserts a delay in the call.

**Kind**: static method of [<code>callback-patterns</code>](#callback-patterns)  
**Returns**: <code>taskFunction</code> - a delay task  
**Params**

- delay <code>number</code> - The time to delay, in ms.


* * *

<a name="callback-patterns.If"></a>

### callback-patterns.If(ifTask, thenTask, elseTask) ⇒ <code>taskFunction</code>
```javascript
  let If = require('callback-patterns/If');

  let logIfEven = If(
    (next, num) => next(null, num % 2 === 0)
    (next, num) => { console.log('is even!'); next(null, num); },
    (next, num) => { console.log('is not even!'); next(null, num); },
  );

  let onDone = (err, ...results) => console.log(results);

  logIfEven(null, 1); // prints out 'is not even!' eventually
  logIfEven(null, 2); // prints out 'is even!' eventually
```
If accepts up to three tasks,
an 'if' task, a 'then' task, and lastly an 'else' task
note: by default, the ifTask, thenTask, and elseTask are PassThrough
note: the ifTask can return multiple results,
but only the first is checked for truthiness

**Kind**: static method of [<code>callback-patterns</code>](#callback-patterns)  
**Params**

- ifTask <code>taskFunction</code> - a condition task.
- thenTask <code>taskFunction</code> - a task to run when ifTask returns a truthy value.
- elseTask <code>taskFunction</code> - a task to run when ifTask returns a falsy value.


* * *

<a name="callback-patterns.Logging"></a>

### callback-patterns.Logging(...statements) ⇒ <code>taskFunction</code>
A logging utility.
It passes the arguments received into all the statements, collects the results, and joins them together with newlines to build the final log statement

**Kind**: static method of [<code>callback-patterns</code>](#callback-patterns)  
**Returns**: <code>taskFunction</code> - a logging task  
**Params**

- ...statements <code>function</code> - any number of logging values.  Functions are called with the calling arguments, everything else is passed directly to


* * *

<a name="callback-patterns.Retry"></a>

### callback-patterns.Retry(task, options) ⇒ <code>taskFunction</code>
Wraps a task and attempts to retry if it throws an error, with an exponential backoff.

**Kind**: static method of [<code>callback-patterns</code>](#callback-patterns)  
**Returns**: <code>taskFunction</code> - a task  
**Params**

- task <code>taskFunction</code> - the task to wrap.
- options <code>object</code> - an optional set of retry options.
    - .timeout <code>object</code> - maximum time to attempt retries.
    - .retries <code>object</code> - maximum number of retries to attempt.


* * *

<a name="callback-patterns.Throttle"></a>

### callback-patterns.Throttle(task, limit) ⇒ <code>taskFunction</code>
Wraps a task and ensures that only X number of instances of the task can be run in parallel.
Requests are queued up in an unbounded FIFO queue until they can be run.

**Kind**: static method of [<code>callback-patterns</code>](#callback-patterns)  
**Returns**: <code>taskFunction</code> - a task  
**Params**

- task <code>taskFunction</code> - the task to throttle
- limit <code>number</code> - the number of instances that can run in parallel. default 1.


* * *

<a name="callback-patterns.TimeIn"></a>

### callback-patterns.TimeIn(task, ms) ⇒ <code>taskFunction</code>
```javascript
  let TimeIn = require('callback-patterns/TimeIn');

  let task = TimeIn(
    function(next, ...args) {},
			1000
  );

  task(next, ...args);
```

TimeIn wraps a single task function, and returns a function that only returns after X ms.

**Kind**: static method of [<code>callback-patterns</code>](#callback-patterns)  
**Returns**: <code>taskFunction</code> - a task  
**Params**

- task <code>taskFunction</code> - the task to wrap in a timeout.
- ms <code>number</code> - the timein in ms.


* * *

<a name="callback-patterns.TimeOut"></a>

### callback-patterns.TimeOut(task, ms) ⇒ <code>taskFunction</code>
```javascript
  let TimeOut = require('callback-patterns/TimeOut');

  let chain = TimeOut(
    function(next, ...args) {},
			1000
  );

  chain(next, ...args);
```

TimeOut wraps a single task function, and returns a function that returns early if the task fails to complete before the timeout triggers.

NOTE: the timeout being triggered will not cancel the original task.

**Kind**: static method of [<code>callback-patterns</code>](#callback-patterns)  
**Returns**: <code>taskFunction</code> - a task  
**Params**

- task <code>taskFunction</code> - the task to wrap in a timeout.
- ms <code>number</code> - the timeout in ms.


* * *

<a name="callback-patterns.Timer"></a>

### callback-patterns.Timer(task, label) ⇒ <code>taskFunction</code>
Wraps a task and logs how long it takes to finish, or fail.

**Kind**: static method of [<code>callback-patterns</code>](#callback-patterns)  
**Returns**: <code>taskFunction</code> - a task  
**Params**

- task <code>taskFunction</code> - the task to wrap.
- label <code>string</code> - an optional label to log.


* * *

<a name="callback-patterns.While"></a>

### callback-patterns.While(conditionTask, loopTask) ⇒ <code>function</code>
```javascript
  let While = require('callback-patterns/While');

  let task = While(
    (next, num) => next(null, num < 10),
    (next, num) => next(null, num + 1),
  );

  let onDone = (err, result) => console.log(result);

  task(onDone, 1); // prints 9, eventually
```
While accepts two tasks and returns a task that conditionally executes some number of times.

**Kind**: static method of [<code>callback-patterns</code>](#callback-patterns)  
**Params**

- conditionTask <code>function</code> - a condition task.
- loopTask <code>function</code> - a task to run if the condition returns a truthy value.


* * *

