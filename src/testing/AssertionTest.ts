
import Assert from '../Assert';
import InOrder from '../InOrder';
import CatchError from '../CatchError';
import Logging from '../Logging';
import If from '../If';

import TraceError from '../unstable/TraceError';

export type TAssertionTest = {
	() : Promise<any>;
	label : string,
};

export type TSetupTask = {
	() : any | Promise<any>
};

export type TPrepareTask = {
	(setup ?: any) : any | Promise<any>
};

export type TExecuteTask = {
	(request ?: any) : any | Promise<any>
};

export type TVerifyTask = {
	(test : { label : string, setup ?: any, request ?: any, error ?: any, result ?: any }) : any | Promise<any>
};

export type TTeardownTask = {
	(test : { label : string, setup ?: any, request ?: any, error ?: any, result ?: any }) : any | Promise<any>
};

const DEFAULT_SETUP : TSetupTask = function () {};

const DEFAULT_PREPARE : TPrepareTask = function (setup) {};

const DEFAULT_EXECUTE : TExecuteTask = function (request) {};

const DEFAULT_VERIFY : TVerifyTask = function (test) {
	if (test.error) {
		throw test.error;
	}
};

const DEFAULT_TEARDOWN : TTeardownTask = function (test) { };

export type TAssertionTestBuilder = {

	/**
	*
	* `AssertionTest#describe` lets you set a description for a test case.
	* This description is part of the label attached to the test case when built.
	*
	* @function describe
	* @param {string} description - a string label describing the test case
	* @returns {AssertionTest} this
	* @memberof async-patterns.testing.AssertionTest#
	*/
	describe(description : string) : TAssertionTestBuilder;

	/**
	*
	* `AssertionTest#setup` gives you a hook to build test fixtures before execution.
	* This is the first step that runs in a test.
	* `setup` is a separate step from `prepare` because you often want to use
	* a common setup function to build test fixtures for multiple tests.
	*
	* @function setup
	* @param {function} task - a setup task function - should return a setup object
	* @returns {AssertionTest} this
	* @memberof async-patterns.testing.AssertionTest#
	*/
	setup(setupTask : TSetupTask) : TAssertionTestBuilder;

	/**
	*
	* `AssertionTest#prepare` gives you a hook to prepare the request that the test uses to execute.
	* This is the second step that runs in a test, and the last step before `execute`.
	* The `prepare` task is passed the results from `setup`.
	*
	* @function prepare
	* @param {function} task - a prepare task function - should accept a context containing the setup, and return a request object to be given to the executing task
	* @returns {AssertionTest} this
	* @memberof async-patterns.testing.AssertionTest#
	*/
	prepare(prepareTask : TPrepareTask) : TAssertionTestBuilder;

	/**
	*
	* `AssertionTest#execute` lets you specify the task that is executed in a test.
	* The `execute` task is passed the results from `prepare`.
	*
	* @function execute
	* @param {function} task - the task the test should execute, and capture results and errors from
	* @returns {AssertionTest} this
	* @memberof async-patterns.testing.AssertionTest#
	*/
	execute(executeTask : TExecuteTask) : TAssertionTestBuilder;

	/**
	*
	* `AssertionTest#verify` lets you specify any number of tasks to verify the test results.
	* Each `verify` task is passed a complete record of all test fixtures in an object,
	* including the setup, the request, the result, and the error (if an error was thrown)
	*
	* @function verify
	* @param {...function} tasks - any number of verification tasks
	* @returns {AssertionTest} this
	* @memberof async-patterns.testing.AssertionTest#
	*/
	verify(...verifyTasks : TVerifyTask[]) : TAssertionTestBuilder;

	/**
	*
	* `AssertionTest#teardown` gives you a hook to tear down the test fixtures after execution.
	* The `teardown` task is passed a complete record of all test fixtures in an object,
	* including the setup, the request, the result, and the error (if an error was thrown)
	*
	* @function teardown
	* @param {function} task - a task to tear down the setup
	* @returns {AssertionTest} this
	* @memberof async-patterns.testing.AssertionTest#
	*/
	teardown(teardownTask: TTeardownTask) : TAssertionTestBuilder;

	/**
	*
	* Builds the test case function.
	*
	* @function build
	* @returns {function} callback-expecting test function
	* @memberof async-patterns.testing.AssertionTest#
	*/
	build() : TAssertionTest;

}

type TAssertionTestBuilderImpl = TAssertionTestBuilder & {
	_description : string,
	_setup : TSetupTask,
	_prepare : TPrepareTask,
	_execute : TExecuteTask,
	_verify : TVerifyTask,
	_teardown : TTeardownTask,
};

/**
*
* ```javascript
*
* const PingTest = AssertionTest()
*   .describe('can ping internet')
*   .setup(
*     // build our setup
*     (next) => {
*       const setup = {};
*       setup.testHosts = [ 'google.com', 'microsoft.com', 'yahoo.com' ];
*       next(null, setup);
*     }
*   )
*   .prepare(
*     // run test with first host
*     (next, setup) => {
*       const host = setup.testHosts[0];
*       next(null, host);
*     }
*   )
*   .execute(
*     (next, host) => ping.sys.probe(
*       host,
*       (isAlive, error) => next(error, isAlive)
*     )
*   )
*   .verify(
*     // verify no error was thrown
*     (next, { setup, request, result, error }) => next(error),
*     // verify result is true
*     (next, { setup, request, result, error }) => next(
*       result !== true ? new Error(`could not ping host ${request}`) : null
*     )
*   )
*   .teardown(
*     // nothing to teardown
*     (next, { setup, request, result, error }) => next()
*   )
*   .build();
*
*   test( () => console.log('test done') );
*
* ```
* Constructor for an AssertionTest builder.
*
* @name AssertionTest
* @class
* @constructor
* @memberof async-patterns.testing
*/
function AssertionTest(this : TAssertionTestBuilderImpl | null | undefined | void) : TAssertionTestBuilder {
	const self : TAssertionTestBuilderImpl =
		this instanceof AssertionTest ?
		this : Object.create(AssertionTest.prototype);

	self._description = '';
	self._setup = DEFAULT_SETUP;
	self._prepare = DEFAULT_PREPARE;
	self._execute = DEFAULT_EXECUTE;
	self._verify = DEFAULT_VERIFY;
	self._teardown = DEFAULT_TEARDOWN;

	return self;
}

/**
*
* `AssertionTest#describe` lets you set a description for a test case.
* This description is part of the label attached to the test case when built.
*
* @function describe
* @param {string} description - a string label describing the test case
* @returns {AssertionTest} this
* @memberof async-patterns.testing.AssertionTest#
*/
AssertionTest.prototype.describe = function describe(this : TAssertionTestBuilderImpl, description : string) {
	this._description = description;
	return this;
};

/**
*
* `AssertionTest#setup` gives you a hook to build test fixtures before execution.
* This is the first step that runs in a test.
* `setup` is a separate step from `prepare` because you often want to use
* a common setup function to build test fixtures for multiple tests.
*
* @function setup
* @param {function} task - a setup task function - should return a setup object
* @returns {AssertionTest} this
* @memberof async-patterns.testing.AssertionTest#
*/
AssertionTest.prototype.setup = function setup(this : TAssertionTestBuilderImpl, _setup : TSetupTask) {
	this._setup = _setup;
	return this;
};

/**
*
* `AssertionTest#prepare` gives you a hook to prepare the request that the test uses to execute.
* This is the second step that runs in a test, and the last step before `execute`.
* The `prepare` task is passed the results from `setup`.
*
* @function prepare
* @param {function} task - a prepare task function - should accept a context containing the setup, and return a request object to be given to the executing task
* @returns {AssertionTest} this
* @memberof async-patterns.testing.AssertionTest#
*/
AssertionTest.prototype.prepare = function prepare(this : TAssertionTestBuilderImpl, _prepare : TPrepareTask) {
	this._prepare = _prepare;
	return this;
};

/**
*
* `AssertionTest#execute` lets you specify the task that is executed in a test.
* The `execute` task is passed the results from `prepare`.
*
* @function execute
* @param {function} task - the task the test should execute, and capture results and errors from
* @returns {AssertionTest} this
* @memberof async-patterns.testing.AssertionTest#
*/
AssertionTest.prototype.execute = function execute(this : TAssertionTestBuilderImpl, _execute : TExecuteTask) {
	this._execute = _execute;
	return this;
};

/**
*
* `AssertionTest#verify` lets you specify any number of tasks to verify the test results.
* Each `verify` task is passed a complete record of all test fixtures in an object,
* including the setup, the request, the result, and the error (if an error was thrown)
*
* @function verify
* @param {...function} tasks - any number of verification tasks
* @returns {AssertionTest} this
* @memberof async-patterns.testing.AssertionTest#
*/
AssertionTest.prototype.verify = function verify(this : TAssertionTestBuilderImpl, ...args: TVerifyTask[]) {
	this._verify = InOrder(...args);
	return this;
};

/**
*
* `AssertionTest#teardown` gives you a hook to tear down the test fixtures after execution.
* The `teardown` task is passed a complete record of all test fixtures in an object,
* including the setup, the request, the result, and the error (if an error was thrown)
*
* @function teardown
* @param {function} task - a task to tear down the setup
* @returns {AssertionTest} this
* @memberof async-patterns.testing.AssertionTest#
*/
AssertionTest.prototype.teardown = function teardown(this : TAssertionTestBuilderImpl, _teardown : TTeardownTask) {
	this._teardown = _teardown;
	return this;
};

/**
*
* Builds the test case function.
*
* @function build
* @returns {function} callback-expecting test function
* @memberof async-patterns.testing.AssertionTest#
*/
AssertionTest.prototype.build = function build(this : TAssertionTestBuilderImpl) : TAssertionTest {
	let {
		_setup,
		_prepare,
		_execute,
		_verify,
		_teardown,
		_description,
	} = this;

	_execute = CatchError(_execute);

	let test : TAssertionTest = async function () {
		const test : { label : string, setup ?: any, request ?: any, result ?: any, error ?: any } = {
			label : _description
		};

		test.setup = await _setup();
		test.request = await _prepare(test.setup);
		const { result, error } = await _execute(test.request);
		test.result = result;
		test.error = error;

		try {
			await _verify(test);
		} catch (err) {
			throw err;
		} finally {
			await _teardown(test);
		}
	} as TAssertionTest;
	test = TraceError(test) as TAssertionTest;

	// this wrapper is to enforce a function.length of 0,
	// without changing the underlying Promisify implementation
	let wrapper = (() => test()) as TAssertionTest;
	wrapper.label = _description;

	return wrapper;
};

/**
* verifier function to make sure test DID NOT throw an error
* @function VerifyErrorWasNotThrown
* @memberof async-patterns.testing.AssertionTest
*/
AssertionTest.VerifyErrorWasNotThrown = Assert(
	function (context) { return context.error == null; },
	function (context) { return context.error; }
);

/**
* verifier function to make sure test DID throw an error
* @function VerifyErrorWasNotThrown
* @memberof async-patterns.testing.AssertionTest
*/
AssertionTest.VerifyErrorWasThrown = Assert(
	function (context) { return context.error != null; },
	'AssertionTest.VerifyErrorWasThrown: error was not thrown'
);

AssertionTest.LogError = If(
	(context) => context.error != null,
	Logging(
		(context) => `(${context.label}) test error:`,
		(context) => context.error
	)
);

AssertionTest.LogSetup = If(
	Logging(
		(context) => `(${context.label}) test setup:`,
		(context) => context.setup
	)
);

AssertionTest.LogRequest = If(
	Logging(
		(context) => `(${context.label}) test request:`,
		(context) => context.request
	)
);

AssertionTest.LogResult = If(
	Logging(
		(context) => `(${context.label}) test result:`,
		(context) => context.result
	)
);


export default AssertionTest;
