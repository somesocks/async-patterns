
import Assert from './Assert';
import CatchError from './CatchError';
import Callbackify from './Callbackify';
import InSeries from './InSeries';
import Promisify from './Promisify';
import Logging from './Logging';
import Delay from './Delay';
import If from './If';
import InOrder from './InOrder';
import InParallel from './InParallel';
import PassThrough from './PassThrough';
import Memoize from './Memoize';

describe('Memoize', () => {
	it('Function.length should be at least 1', () => {
		if (Memoize().length < 1) { throw new Error(); }
		if (Memoize(() => {}).length < 1) { throw new Error(); }
	});

	it('test with 0 handlers', (done) => {
		Callbackify(
			Memoize()
		)
		(done);
	});

	it('catches errors', (done) => {
		Callbackify(
			Memoize(
				() => { throw new Error('error'); }
			)
		)
		((err, res) => done(err != null ? null : err));
	});


	it('memoize works', (done) => {
		let counter = 0;
		let task = Memoize(
			() => { ++counter; return counter; }
		);

		let test = InSeries(
			() => task(),
			() => task(),
			() => task(),
			Assert(
				(val) => val === 1,
				(val) => `expected val to be 1, got ${val}`
			),
			Assert(
				() => counter === 1,
				() => `expected counter to be 1, got ${counter}`
			)
		);

		Callbackify(test)(done);
	});

  it('memoize works (with a custom cache)', (done) => {
		let counter = 0;
		let task = Memoize(
			() => { ++counter; return counter; },
      undefined,
      Memoize.ObjectCache()
		);

		let test = InSeries(
			() => task(),
			() => task(),
			() => task(),
			Assert(
				(val) => val === 1,
				(val) => `expected val to be 1, got ${val}`
			),
			Assert(
				() => counter === 1,
				() => `expected counter to be 1, got ${counter}`
			)
		);

		Callbackify(test)(done);
	});

  it('memoize works (with a custom cache 2)', (done) => {
		let counter = 0;
		let task = Memoize(
			() => { ++counter; return counter; },
      undefined,
      Memoize.LRUCache(999999)
		);

		let test = InSeries(
			() => task(),
			() => task(),
			() => task(),
			Assert(
				(val) => val === 1,
				(val) => `expected val to be 1, got ${val}`
			),
			Assert(
				() => counter === 1,
				() => `expected counter to be 1, got ${counter}`
			)
		);

		Callbackify(test)(done);
	});

	it('memoize speeds up task', (done) => {
		let slowTask = InSeries(
			PassThrough,
			Delay(1000)
		);

		let fastTask = Memoize(slowTask);

		let start;
		let finish;

		let test = InSeries(
			() => { start = Date.now() },
			() => fastTask(),
			() => fastTask(),
			() => fastTask(),
			() => fastTask(),
			() => fastTask(),
			() => fastTask(),
			() => { finish = Date.now(); },
			Assert(
				() => finish - start < 2000,
				(val) => `expected elapsed time under 2000 ms, got ${finish - start}`
			)
		);

		Callbackify(test)(done);
	});


	const MEMOIZED_TASK = Memoize(PassThrough);

	const SHORT_CHAIN =
		InSeries(
			...Array(1000).fill(MEMOIZED_TASK)
		);

	const LONG_CHAIN =
		InSeries(
			...Array(1000).fill(SHORT_CHAIN)
		);

	it('Long Chain Performance', (done) => {
		Callbackify(LONG_CHAIN)(done, 1, 2, 3);
	});


});
