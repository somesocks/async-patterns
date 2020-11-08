
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


describe('Memoize.SWR', () => {
	it('Function.length should be at least 1', () => {
		if (Memoize.SWR().length < 1) { throw new Error(); }
		if (Memoize.SWR(() => {}).length < 1) { throw new Error(); }
	});

	it('test with 0 handlers', (done) => {
		Callbackify(
			Memoize.SWR()
		)
		(done);
	});

	it('catches errors', (done) => {
		Callbackify(
			Memoize.SWR(
				() => { throw new Error('error'); }
			)
		)
		((err, res) => done(err != null ? null : err));
	});


	it('memoize works', (done) => {
		let counter = 0;
		let task = Memoize.SWR(
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
		let task = Memoize.SWR(
			() => { ++counter; return counter; },
      {
        staleCache: Memoize.ObjectCache()
      }
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
		let task = Memoize.SWR(
			() => { ++counter; return counter; },
      {
        staleCache: Memoize.LRUCache(999999)
      }
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
			),
      () => console.log('counter', counter)
		);

		Callbackify(test)(done);
	});

	it('memoize speeds up task', (done) => {
		let slowTask = InSeries(
			PassThrough,
			Delay(1000)
		);

		let fastTask = Memoize.SWR(slowTask);

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


	const MEMOIZED_TASK = Memoize.SWR(PassThrough);

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
