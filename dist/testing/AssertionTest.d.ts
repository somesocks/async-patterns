export declare type TAssertionTest = {
    (): Promise<any>;
    label: string;
};
export declare type TSetupTask = {
    (): any | Promise<any>;
};
export declare type TPrepareTask = {
    (setup?: any): any | Promise<any>;
};
export declare type TExecuteTask = {
    (request?: any): any | Promise<any>;
};
export declare type TVerifyTask = {
    (test: {
        label: string;
        setup?: any;
        request?: any;
        error?: any;
        result?: any;
    }): any | Promise<any>;
};
export declare type TTeardownTask = {
    (test: {
        label: string;
        setup?: any;
        request?: any;
        error?: any;
        result?: any;
    }): any | Promise<any>;
};
export declare type TAssertionTestBuilder = {
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
    describe(description: string): TAssertionTestBuilder;
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
    setup(setupTask: TSetupTask): TAssertionTestBuilder;
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
    prepare(prepareTask: TPrepareTask): TAssertionTestBuilder;
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
    execute(executeTask: TExecuteTask): TAssertionTestBuilder;
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
    verify(...verifyTasks: TVerifyTask[]): TAssertionTestBuilder;
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
    teardown(teardownTask: TTeardownTask): TAssertionTestBuilder;
    /**
    *
    * Builds the test case function.
    *
    * @function build
    * @returns {function} callback-expecting test function
    * @memberof async-patterns.testing.AssertionTest#
    */
    build(): TAssertionTest;
};
declare type TAssertionTestBuilderImpl = TAssertionTestBuilder & {
    _description: string;
    _setup: TSetupTask;
    _prepare: TPrepareTask;
    _execute: TExecuteTask;
    _verify: TVerifyTask;
    _teardown: TTeardownTask;
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
declare function AssertionTest(this: TAssertionTestBuilderImpl | null | undefined | void): TAssertionTestBuilder;
declare namespace AssertionTest {
    var VerifyErrorWasNotThrown: import("../PassThrough.types").PassThroughTask;
    var VerifyErrorWasThrown: import("../PassThrough.types").PassThroughTask;
    var LogError: import("../types/AsyncTask").default;
    var LogSetup: import("../types/AsyncTask").default;
    var LogRequest: import("../types/AsyncTask").default;
    var LogResult: import("../types/AsyncTask").default;
}
export default AssertionTest;
