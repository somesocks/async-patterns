/* eslint-env mocha */

import Assert from '../Assert';
import Callbackify from '../Callbackify';
import Promisify from '../Promisify';
import Logging from '../Logging';
import InOrder from '../InOrder';

import ping from 'ping';

import AssertionTest from './AssertionTest';


const EmptyTest = AssertionTest()
	.describe('empty test works')
	.build();

const SetupTest = AssertionTest()
	.describe('test with setup works')
	.setup(
		() => 'setup'
	)
	.verify(
		Assert(
			(context) => context.setup === 'setup',
			'bad setup'
		)
	)
	.build();

const SampleTest = AssertionTest()
	.describe('sample test 1')
	.setup(
		() => ({ val: 1 })
	)
	.prepare(
		(setup) => setup.val
	)
	.execute(
		(request) => request + 1
	)
	.verify(
		Assert(
			(context) => context.setup.val === 1,
			'bad setup'
		),
		Assert(
			(context) => context.result === 2,
			'bad result'
		)
	)
	.teardown(
		Assert(
			(context) => context.setup.val === 1 && context.result === 2,
			'bad teardown'
		)
	)
	.build();


const SampleTest2 = AssertionTest()
	.describe('sample test 1')
	.setup(
		() => ({ val: 1 })
	)
	.prepare(
		(setup) => setup.val
	)
	.execute(
    InOrder(
      (request) => request + 1,
      (request) => request + 1,
    )
	)
	.verify(
		Assert(
			(context) => context.setup.val === 1,
			'bad setup'
		),
		Assert(
			(context) => context.result === 2,
			'bad result'
		)
	)
	.teardown(
		Assert(
			(context) => context.setup.val === 1 && context.result === 2,
			'bad teardown'
		)
	)
	.build();

const PingTest = AssertionTest()
	.describe('can ping internet')
	.setup(
		// build our setup
		() => {
			const setup = {
				testHosts :  [ 'google.com', 'microsoft.com', 'yahoo.com' ],
			};

			return setup;
		}
	)
	.prepare(
		// run test with first host
		(setup) => {
			const host = setup.testHosts[0];
			return host;
		}
	)
	.execute(
		Promisify(
			(next, host) => ping.sys.probe(
				host,
				(isAlive, error) => next(error, isAlive)
			)
		)
	)
	.verify(
		Logging(
			({ request, result }) => `ping result for ${request}: ${result}`
		),
		// verify no error was thrown
		Assert(
			({ error }) => error == null,
			'error was thrown'
		),
		// verify result is true
		Assert(
			({ request, result }) => result === true,
			({ request, result }) => `could not ping host ${request}`
		),
	)
	.teardown(
		// nothing to teardown
		() => null
	)
	.build();


const TESTS = [
	EmptyTest,
	SetupTest,
	SampleTest,
	PingTest,
];

describe('AssertionTest', () => {

	TESTS.forEach(
		(test, i) => it(test.label || `test ${i}`, Callbackify(test))
	);

});
