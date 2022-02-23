# async-patterns

`async-patterns` is a collection of design patterns for async/await or promise-driven async code.  The design patterns in this library are constructors that build callback-expecting functions.  Each pattern is designed to be a stand-alone piece of code, tested for performance and robustness.

## API

<a name="async-patterns"></a>

## async-patterns : <code>object</code>
A namespace.

**Kind**: global namespace  

* [async-patterns](#async-patterns) : <code>object</code>
    * [.Callbackify](#async-patterns.Callbackify) ⇒ <code>function</code>
    * [.CatchError](#async-patterns.CatchError) ⇒ <code>function</code>
    * [.InOrder](#async-patterns.InOrder) ⇒ <code>function</code>
    * [.InParallel](#async-patterns.InParallel) ⇒ <code>function</code>
    * [.InSeries](#async-patterns.InSeries) ⇒ <code>function</code>
    * [.LogError](#async-patterns.LogError) ⇒ <code>function</code>
    * [.ParallelFilter](#async-patterns.ParallelFilter) ⇒ <code>function</code>
    * [.ParallelMap](#async-patterns.ParallelMap) ⇒ <code>function</code>
    * [.PassThrough](#async-patterns.PassThrough)
    * [.Promisify](#async-patterns.Promisify) ⇒ <code>function</code>
    * [.Race](#async-patterns.Race) ⇒ <code>function</code>
    * [.testing](#async-patterns.testing) : <code>object</code>
        * [.AssertionTest](#async-patterns.testing.AssertionTest)
            * [new AssertionTest()](#new_async-patterns.testing.AssertionTest_new)
            * [assertionTest.describe(description)](#async-patterns.testing.AssertionTest+describe) ⇒ <code>AssertionTest</code>
            * [assertionTest.setup(task)](#async-patterns.testing.AssertionTest+setup) ⇒ <code>AssertionTest</code>
            * [assertionTest.prepare(task)](#async-patterns.testing.AssertionTest+prepare) ⇒ <code>AssertionTest</code>
            * [assertionTest.execute(task)](#async-patterns.testing.AssertionTest+execute) ⇒ <code>AssertionTest</code>
            * [assertionTest.verify(...tasks)](#async-patterns.testing.AssertionTest+verify) ⇒ <code>AssertionTest</code>
            * [assertionTest.teardown(task)](#async-patterns.testing.AssertionTest+teardown) ⇒ <code>AssertionTest</code>
            * [assertionTest.build()](#async-patterns.testing.AssertionTest+build) ⇒ <code>function</code>
            * [AssertionTest.VerifyErrorWasNotThrown()](#async-patterns.testing.AssertionTest.VerifyErrorWasNotThrown)
            * [AssertionTest.VerifyErrorWasNotThrown()](#async-patterns.testing.AssertionTest.VerifyErrorWasNotThrown)
    * [.unstable](#async-patterns.unstable) : <code>object</code>
        * [.TraceError(task)](#async-patterns.unstable.TraceError) ⇒ <code>function</code>
    * [.Assert(validator, message)](#async-patterns.Assert) ⇒ <code>taskFunction</code>
    * [.Delay(delay)](#async-patterns.Delay) ⇒ <code>taskFunction</code>
    * [.If(ifTask, thenTask, elseTask)](#async-patterns.If) ⇒ <code>taskFunction</code>
    * [.Logging(...statements)](#async-patterns.Logging) ⇒ <code>taskFunction</code>
    * [.Memoize(task, [keyFunction])](#async-patterns.Memoize) ⇒ <code>AsyncTask</code>
    * [.Retry(task, options)](#async-patterns.Retry) ⇒ <code>taskFunction</code>
    * [.Throttle(task, limit)](#async-patterns.Throttle) ⇒ <code>taskFunction</code>
    * [.TimeIn(task, ms)](#async-patterns.TimeIn) ⇒ <code>taskFunction</code>
    * [.TimeOut(task, ms)](#async-patterns.TimeOut) ⇒ <code>taskFunction</code>
    * [.Timer(task, label)](#async-patterns.Timer) ⇒ <code>taskFunction</code>
    * [.While(conditionTask, loopTask)](#async-patterns.While) ⇒ <code>function</code>


* * *

<a name="async-patterns.Callbackify"></a>

### async-patterns.Callbackify ⇒ <code>function</code>
```javascript
    const task = Callbackify(
        async (i) => i + 1
    );

    // logs 'res 1', eventually
    task(
        (err, res) => console.log('res', res),
        0
    );
```

**Kind**: static property of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>function</code> - a callback-expecting function  
**Params**

- task <code>function</code> - an async function


* * *

<a name="async-patterns.CatchError"></a>

### async-patterns.CatchError ⇒ <code>function</code>
```javascript
  let task = CatchError(task);

  const { error, result } = await task(request);
```

**Kind**: static property of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>function</code> - an async wrapper function around the task  
**Params**

- task <code>function</code> - an async function to wrap around with a catch wrapper.


* * *

<a name="async-patterns.InOrder"></a>

### async-patterns.InOrder ⇒ <code>function</code>
```javascript

let InOrder = require('async-patterns/InOrder');

	const task = InOrder(
		async (i) => i + 1,
		async (i) => i + 1,
		async (i) => i + 1
	);

	await task(0); // returns 3

```

**Kind**: static property of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>function</code> - an async wrapper function that runs all of the tasks in order, calling each one with original request  
**Params**

- ...tasks <code>function</code> - any number of async tasks.


* * *

<a name="async-patterns.InParallel"></a>

### async-patterns.InParallel ⇒ <code>function</code>
```javascript

let InParallel = require('async-patterns/InParallel');

	const task = InParallel(
		async (i) => i + 1,
		async (i) => i + 2,
		async (i) => i + 3
	);

	const results = await task(0); // results is [1, 2, 3]

```

**Kind**: static property of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>function</code> - an async wrapper function that runs all the tasks in parallel, and returns an array of results  
**Params**

- ...tasks <code>function</code> - any number of async tasks.


* * *

<a name="async-patterns.InSeries"></a>

### async-patterns.InSeries ⇒ <code>function</code>
```javascript

let InSeries = require('async-patterns/InSeries');

	const task = InSeries(
		async (i) => i + 1,
		async (i) => i + 1,
		async (i) => i + 1
	);

	const results = await task(0); // results is 3

```

**Kind**: static property of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>function</code> - an async wrapper function that runs all of the tasks in series, calling each one with the results of the previous one  
**Params**

- ...tasks <code>function</code> - any number of async tasks.


* * *

<a name="async-patterns.LogError"></a>

### async-patterns.LogError ⇒ <code>function</code>
```javascript
  let task = LogError(task);

  // if an error occurs, it will be logged before getting re-thrown here
  const result = await task(request);
```

**Kind**: static property of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>function</code> - an async wrapper function around the task  
**Params**

- task <code>function</code> - an async function to wrap around with a error logging wrapper.


* * *

<a name="async-patterns.ParallelFilter"></a>

### async-patterns.ParallelFilter ⇒ <code>function</code>
```javascript
    const task = ParallelFilter(
        async (val, i) => val % 2 === 0
    );

    const results = await task([0, 1, 2]); // results is [0, 2]
```

**Kind**: static property of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>function</code> - an async wrapper function that takes in an array of requests, runs the task in parallel, once for each input in the array, and returns an array of results  
**Params**

- task <code>function</code> - the filtering task


* * *

<a name="async-patterns.ParallelMap"></a>

### async-patterns.ParallelMap ⇒ <code>function</code>
```javascript
    const task = ParallelMap(
        async (val, i) => val + 1
    );

    const results = await task([0, 1, 2]); // results is [1, 2, 3]
```

**Kind**: static property of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>function</code> - an async wrapper function that takes in an array of requests, runs the task in parallel, once for each input in the array, and returns an array of results  
**Params**

- task <code>function</code> - the mapping task


* * *

<a name="async-patterns.PassThrough"></a>

### async-patterns.PassThrough
```javascript
    const task = PassThrough;

    const results = await task(0); // results is 0
```

PassThrough does nothing, just passes the request through as the result

**Kind**: static property of [<code>async-patterns</code>](#async-patterns)  

* * *

<a name="async-patterns.Promisify"></a>

### async-patterns.Promisify ⇒ <code>function</code>
```javascript
    const task = Promisify(
        (onDone, i) => onDone(
            i === 0 ? new Error('i cant be 0') : null,
            i + 1
        ),
    );

    const results = await task(1); // results is 2
    const results2 = await taks(0); // throws 'i cant be 0 Error
```

**Kind**: static property of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>function</code> - an async function  
**Params**

- task <code>function</code> - a callback-expecting function


* * *

<a name="async-patterns.Race"></a>

### async-patterns.Race ⇒ <code>function</code>
```javascript
    const task = Race(
        async (i) => i + 1,
        async (i) => i + 2,
    );

    const result = await task(1); // 2
```

**Kind**: static property of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>function</code> - an async task that resolves or rejects as soon as the first one of its "children" resolves or rejects  
**Params**

- ...tasks <code>function</code> - any number of async tasks


* * *

<a name="async-patterns.testing"></a>

### async-patterns.testing : <code>object</code>
A namespace.

**Kind**: static namespace of [<code>async-patterns</code>](#async-patterns)  

* [.testing](#async-patterns.testing) : <code>object</code>
    * [.AssertionTest](#async-patterns.testing.AssertionTest)
        * [new AssertionTest()](#new_async-patterns.testing.AssertionTest_new)
        * [assertionTest.describe(description)](#async-patterns.testing.AssertionTest+describe) ⇒ <code>AssertionTest</code>
        * [assertionTest.setup(task)](#async-patterns.testing.AssertionTest+setup) ⇒ <code>AssertionTest</code>
        * [assertionTest.prepare(task)](#async-patterns.testing.AssertionTest+prepare) ⇒ <code>AssertionTest</code>
        * [assertionTest.execute(task)](#async-patterns.testing.AssertionTest+execute) ⇒ <code>AssertionTest</code>
        * [assertionTest.verify(...tasks)](#async-patterns.testing.AssertionTest+verify) ⇒ <code>AssertionTest</code>
        * [assertionTest.teardown(task)](#async-patterns.testing.AssertionTest+teardown) ⇒ <code>AssertionTest</code>
        * [assertionTest.build()](#async-patterns.testing.AssertionTest+build) ⇒ <code>function</code>
        * [AssertionTest.VerifyErrorWasNotThrown()](#async-patterns.testing.AssertionTest.VerifyErrorWasNotThrown)
        * [AssertionTest.VerifyErrorWasNotThrown()](#async-patterns.testing.AssertionTest.VerifyErrorWasNotThrown)


* * *

<a name="async-patterns.testing.AssertionTest"></a>

#### testing.AssertionTest
**Kind**: static class of [<code>testing</code>](#async-patterns.testing)  

* [.AssertionTest](#async-patterns.testing.AssertionTest)
    * [new AssertionTest()](#new_async-patterns.testing.AssertionTest_new)
    * [assertionTest.describe(description)](#async-patterns.testing.AssertionTest+describe) ⇒ <code>AssertionTest</code>
    * [assertionTest.setup(task)](#async-patterns.testing.AssertionTest+setup) ⇒ <code>AssertionTest</code>
    * [assertionTest.prepare(task)](#async-patterns.testing.AssertionTest+prepare) ⇒ <code>AssertionTest</code>
    * [assertionTest.execute(task)](#async-patterns.testing.AssertionTest+execute) ⇒ <code>AssertionTest</code>
    * [assertionTest.verify(...tasks)](#async-patterns.testing.AssertionTest+verify) ⇒ <code>AssertionTest</code>
    * [assertionTest.teardown(task)](#async-patterns.testing.AssertionTest+teardown) ⇒ <code>AssertionTest</code>
    * [assertionTest.build()](#async-patterns.testing.AssertionTest+build) ⇒ <code>function</code>
    * [AssertionTest.VerifyErrorWasNotThrown()](#async-patterns.testing.AssertionTest.VerifyErrorWasNotThrown)
    * [AssertionTest.VerifyErrorWasNotThrown()](#async-patterns.testing.AssertionTest.VerifyErrorWasNotThrown)


* * *

<a name="new_async-patterns.testing.AssertionTest_new"></a>

##### new AssertionTest()
```javascript

const PingTest = AssertionTest()
  .describe('can ping internet')
  .setup(
    // build our setup
    (next) => {
      const setup = {};
      setup.testHosts = [ 'google.com', 'microsoft.com', 'yahoo.com' ];
      next(null, setup);
    }
  )
  .prepare(
    // run test with first host
    (next, setup) => {
      const host = setup.testHosts[0];
      next(null, host);
    }
  )
  .execute(
    (next, host) => ping.sys.probe(
      host,
      (isAlive, error) => next(error, isAlive)
    )
  )
  .verify(
    // verify no error was thrown
    (next, { setup, request, result, error }) => next(error),
    // verify result is true
    (next, { setup, request, result, error }) => next(
      result !== true ? new Error(`could not ping host ${request}`) : null
    )
  )
  .teardown(
    // nothing to teardown
    (next, { setup, request, result, error }) => next()
  )
  .build();

  test( () => console.log('test done') );

```
Constructor for an AssertionTest builder.


* * *

<a name="async-patterns.testing.AssertionTest+describe"></a>

##### assertionTest.describe(description) ⇒ <code>AssertionTest</code>
`AssertionTest#describe` lets you set a description for a test case.
This description is part of the label attached to the test case when built.

**Kind**: instance method of [<code>AssertionTest</code>](#async-patterns.testing.AssertionTest)  
**Returns**: <code>AssertionTest</code> - this  
**Params**

- description <code>string</code> - a string label describing the test case


* * *

<a name="async-patterns.testing.AssertionTest+setup"></a>

##### assertionTest.setup(task) ⇒ <code>AssertionTest</code>
`AssertionTest#setup` gives you a hook to build test fixtures before execution.
This is the first step that runs in a test.
`setup` is a separate step from `prepare` because you often want to use
a common setup function to build test fixtures for multiple tests.

**Kind**: instance method of [<code>AssertionTest</code>](#async-patterns.testing.AssertionTest)  
**Returns**: <code>AssertionTest</code> - this  
**Params**

- task <code>function</code> - a setup task function - should return a setup object


* * *

<a name="async-patterns.testing.AssertionTest+prepare"></a>

##### assertionTest.prepare(task) ⇒ <code>AssertionTest</code>
`AssertionTest#prepare` gives you a hook to prepare the request that the test uses to execute.
This is the second step that runs in a test, and the last step before `execute`.
The `prepare` task is passed the results from `setup`.

**Kind**: instance method of [<code>AssertionTest</code>](#async-patterns.testing.AssertionTest)  
**Returns**: <code>AssertionTest</code> - this  
**Params**

- task <code>function</code> - a prepare task function - should accept a context containing the setup, and return a request object to be given to the executing task


* * *

<a name="async-patterns.testing.AssertionTest+execute"></a>

##### assertionTest.execute(task) ⇒ <code>AssertionTest</code>
`AssertionTest#execute` lets you specify the task that is executed in a test.
The `execute` task is passed the results from `prepare`.

**Kind**: instance method of [<code>AssertionTest</code>](#async-patterns.testing.AssertionTest)  
**Returns**: <code>AssertionTest</code> - this  
**Params**

- task <code>function</code> - the task the test should execute, and capture results and errors from


* * *

<a name="async-patterns.testing.AssertionTest+verify"></a>

##### assertionTest.verify(...tasks) ⇒ <code>AssertionTest</code>
`AssertionTest#verify` lets you specify any number of tasks to verify the test results.
Each `verify` task is passed a complete record of all test fixtures in an object,
including the setup, the request, the result, and the error (if an error was thrown)

**Kind**: instance method of [<code>AssertionTest</code>](#async-patterns.testing.AssertionTest)  
**Returns**: <code>AssertionTest</code> - this  
**Params**

- ...tasks <code>function</code> - any number of verification tasks


* * *

<a name="async-patterns.testing.AssertionTest+teardown"></a>

##### assertionTest.teardown(task) ⇒ <code>AssertionTest</code>
`AssertionTest#teardown` gives you a hook to tear down the test fixtures after execution.
The `teardown` task is passed a complete record of all test fixtures in an object,
including the setup, the request, the result, and the error (if an error was thrown)

**Kind**: instance method of [<code>AssertionTest</code>](#async-patterns.testing.AssertionTest)  
**Returns**: <code>AssertionTest</code> - this  
**Params**

- task <code>function</code> - a task to tear down the setup


* * *

<a name="async-patterns.testing.AssertionTest+build"></a>

##### assertionTest.build() ⇒ <code>function</code>
Builds the test case function.

**Kind**: instance method of [<code>AssertionTest</code>](#async-patterns.testing.AssertionTest)  
**Returns**: <code>function</code> - callback-expecting test function  

* * *

<a name="async-patterns.testing.AssertionTest.VerifyErrorWasNotThrown"></a>

##### AssertionTest.VerifyErrorWasNotThrown()
verifier function to make sure test DID NOT throw an error

**Kind**: static method of [<code>AssertionTest</code>](#async-patterns.testing.AssertionTest)  

* * *

<a name="async-patterns.testing.AssertionTest.VerifyErrorWasNotThrown"></a>

##### AssertionTest.VerifyErrorWasNotThrown()
verifier function to make sure test DID throw an error

**Kind**: static method of [<code>AssertionTest</code>](#async-patterns.testing.AssertionTest)  

* * *

<a name="async-patterns.unstable"></a>

### async-patterns.unstable : <code>object</code>
A namespace.

**Kind**: static namespace of [<code>async-patterns</code>](#async-patterns)  

* * *

<a name="async-patterns.unstable.TraceError"></a>

#### unstable.TraceError(task) ⇒ <code>function</code>
TraceError is an experimental wrapper that attempts to make errors more informative.
It does this by appending extra information to the stack of any error thrown in the task.

NOTE: TraceError is marked as 'unstable' as stack traces in JS are not standardized,
so it may not always provide useful information.

**Kind**: static method of [<code>unstable</code>](#async-patterns.unstable)  
**Returns**: <code>function</code> - a wrapper function that modifies the stack trace of any errors thrown within  
**Params**

- task <code>function</code> - a task function to wrap


* * *

<a name="async-patterns.Assert"></a>

### async-patterns.Assert(validator, message) ⇒ <code>taskFunction</code>
```javascript
  let Assert = require('async-patterns/Assert');
  let InSeries = require('async-patterns/InSeries');

  let task = InSeries(
    (num) => num,
    Assert(
      (num) => (num >= 0),
      (num) => `${num} is less than zero`
    ),
    (num) => num,
  );

  await task(1); // returns 1

  await task(-1); // throws error

```
Builds an async assertion task.

**Kind**: static method of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>taskFunction</code> - an assertion task  
**Params**

- validator <code>function</code> - a function that checks the arguments.
- message <code>string</code> - an optional error message to throw if the assertion fails, or a message builder function.


* * *

<a name="async-patterns.Delay"></a>

### async-patterns.Delay(delay) ⇒ <code>taskFunction</code>
```javascript
  let Delay = require('async-patterns/Delay');
  let InSeries = require('async-patterns/InSeries');

  let task = InSeries(
    (num) => num + 1
    Delay(100),
  );

  await task(1); // returns 2, after a 100ms delay

```
Delay acts like PassThrough, but inserts a delay in the call.

**Kind**: static method of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>taskFunction</code> - a delay task  
**Params**

- delay <code>number</code> - The time to delay, in ms.


* * *

<a name="async-patterns.If"></a>

### async-patterns.If(ifTask, thenTask, elseTask) ⇒ <code>taskFunction</code>
```javascript
  let If = require('async-patterns/If');

  let logIfEven = If(
    (num) => (num % 2 === 0),
    (num) => { console.log('is even!'); },
    (num) => { console.log('is not even!'); }
  );

  await logIfEven(1); // prints out 'is not even!' eventually
  await logIfEven(2); // prints out 'is even!' eventually

```
If accepts up to three tasks,
an 'if' task, a 'then' task, and lastly an 'else' task
note: by default, the ifTask, thenTask, and elseTask are PassThrough
note: the ifTask can return multiple results,
but only the first is checked for truthiness

**Kind**: static method of [<code>async-patterns</code>](#async-patterns)  
**Params**

- ifTask <code>taskFunction</code> - a condition task.
- thenTask <code>taskFunction</code> - a task to run when ifTask returns a truthy value.
- elseTask <code>taskFunction</code> - a task to run when ifTask returns a falsy value.


* * *

<a name="async-patterns.Logging"></a>

### async-patterns.Logging(...statements) ⇒ <code>taskFunction</code>
A logging utility.
It passes the arguments received into all the statements, collects the results, and joins them together with newlines to build the final log statement

**Kind**: static method of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>taskFunction</code> - a logging task  
**Params**

- ...statements <code>function</code> - any number of logging values.  Functions are called with the calling arguments, everything else is passed directly to


* * *

<a name="async-patterns.Memoize"></a>

### async-patterns.Memoize(task, [keyFunction]) ⇒ <code>AsyncTask</code>
Memoize builds a wrapper function that caches results of previous executions.
As a result, repeated calls to Memoize may be much faster, if the request hits the cache.

NOTE: As of now, there are no cache eviction mechanisms.
  You should try to use Memoized functions in a 'disposable' way as a result

NOTE: Memoize is not 'thread-safe' currently.  If two calls are made for the same object currently,
  two calls to the wrapped function will be made

NOTE: Memoize will cache errors as well as results.

**Kind**: static method of [<code>async-patterns</code>](#async-patterns)  
**Params**

- task <code>AsyncTask</code> - the task function to memoize.
- [keyFunction] <code>function</code> - a function that synchronously generates a key for a request.


* * *

<a name="async-patterns.Retry"></a>

### async-patterns.Retry(task, options) ⇒ <code>taskFunction</code>
Wraps a task and attempts to retry if it throws an error, with an exponential backoff.

**Kind**: static method of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>taskFunction</code> - a task  
**Params**

- task <code>taskFunction</code> - the task to wrap.
- options <code>object</code> - an optional set of retry options.
    - .timeout <code>object</code> - maximum time to attempt retries.
    - .retries <code>object</code> - maximum number of retries to attempt.


* * *

<a name="async-patterns.Throttle"></a>

### async-patterns.Throttle(task, limit) ⇒ <code>taskFunction</code>
Wraps a task and ensures that only X number of instances of the task can be run in parallel.
Requests are queued up in an unbounded FIFO queue until they can be run.

**Kind**: static method of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>taskFunction</code> - a task  
**Params**

- task <code>taskFunction</code> - the task to throttle
- limit <code>number</code> - the number of instances that can run in parallel. default 1.


* * *

<a name="async-patterns.TimeIn"></a>

### async-patterns.TimeIn(task, ms) ⇒ <code>taskFunction</code>
```javascript

  let TimeIn = require('async-patterns/TimeIn');

  let task = TimeIn(
    async function (...args) {},
			1000
  );

  await task(...args);

```

TimeIn wraps a single task function, and returns a function that only returns after X ms.

**Kind**: static method of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>taskFunction</code> - a task  
**Params**

- task <code>taskFunction</code> - the task to wrap in a timeout.
- ms <code>number</code> - the timein in ms.


* * *

<a name="async-patterns.TimeOut"></a>

### async-patterns.TimeOut(task, ms) ⇒ <code>taskFunction</code>
```javascript

  let TimeOut = require('async-patterns/TimeOut');

  let task = TimeOut(
    async function (...args) {},
			1000
  );

  await task(...args);

```

TimeOut wraps a single task function, and returns a function that returns early if the task fails to complete before the timeout triggers.

NOTE: the timeout being triggered will not cancel the original task.

**Kind**: static method of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>taskFunction</code> - a task  
**Params**

- task <code>taskFunction</code> - the task to wrap in a timeout.
- ms <code>number</code> - the timeout in ms.


* * *

<a name="async-patterns.Timer"></a>

### async-patterns.Timer(task, label) ⇒ <code>taskFunction</code>
Wraps a task and logs how long it takes to finish, or fail.

**Kind**: static method of [<code>async-patterns</code>](#async-patterns)  
**Returns**: <code>taskFunction</code> - a task  
**Params**

- task <code>taskFunction</code> - the task to wrap.
- label <code>string</code> - an optional label to log.


* * *

<a name="async-patterns.While"></a>

### async-patterns.While(conditionTask, loopTask) ⇒ <code>function</code>
```javascript

let While = require('async-patterns/While');

let task = While(
  (num) => (num < 10),
  (num) => num + 1
);

await task(1); // prints 10, eventually

```
While accepts two tasks and returns a task that conditionally executes some number of times.

**Kind**: static method of [<code>async-patterns</code>](#async-patterns)  
**Params**

- conditionTask <code>function</code> - a condition task.
- loopTask <code>function</code> - a task to run if the condition returns a truthy value.


* * *

