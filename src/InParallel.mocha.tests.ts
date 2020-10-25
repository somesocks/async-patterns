
import Assert from './Assert';
import CatchError from './CatchError';
import Callbackify from './Callbackify';
import InSeries from './InSeries';
import Promisify from './Promisify';
import Delay from './Delay';
import If from './If';
import InOrder from './InOrder';
import InParallel from './InParallel';
import PassThrough from './PassThrough';

let t1 = InParallel(
  CatchError((val) => val),
  (val : number) => val
);

let t2 = InSeries(
  CatchError(t1),
  (val) => val
);

let t3 = InParallel(
  (result : string) => result,
  (result : number) => result,
  () => 1,
);

let t4 = InParallel(
  () => 1,
  () => 1,
);

let a7 = [
  (val : { foo: number }) => val.foo + 1,
  (val : { bar: number }) => val.bar + 1,
];

let t5 = InParallel(...a7);

let t6 = InParallel(...(a7 as any[]));
let r = t6();

let t7 = InParallel(
  (result : string) => result,
  (result : string) => result,
  () => 1,
);

// t7();
t7('foo');

describe('InParallel', () => {
	const LONG_CHAIN = InParallel(
		...Array(50000).fill(PassThrough)
	);

	it('Parallel Performance', (done) => {
		Callbackify(LONG_CHAIN)(done);
	});

	it('Parallel Performance 2', (done) => {
		Callbackify(LONG_CHAIN)(done, 1);
	});

	it('Parallel Performance 3', (done) => {
		Callbackify(LONG_CHAIN)(done, 1, 2, 3, 4, 5, 6, 7, 8);
	});

	it('test with 0 handlers', (done) => {
		Callbackify(InParallel())(done);
	});

	it('works',
		Callbackify(
			InSeries(
        () => 1,
				InParallel(
					(a : number) => {},
					(a) => null,
					(a : number) => a
				),
				Assert(
					([ r0, r1, r2 ]) => r0 === undefined,
					'empty results failed'
				),
				Assert(
					([ r0, r1, r2 ]) => r1 === null,
					([ r0, r1, r2 ]) => `null check failed ${r1}`
				),
				Assert(
					([ r0, r1, r2 ]) => r2 === 1,
					([ r0, r1, r2 ]) => `results failed ${r2}`
				)
			)

		)
	);

	it('catches errors', (done) => {
		const task = Callbackify(
			InParallel(
				() => {},
				() => { throw new Error('error'); }
			)
		);

		task((err, res) => done(err != null ? null : err));
	});

	it('catches errors 2', (done) => {
		const task = Callbackify(
			InParallel(
				() => {},
				() => Promise.reject('error')
			)
		);

		task((err, res) => done(err != null ? null : err));
	});

	it('catches deep errors', (done) => {
		const task = Callbackify(
			InParallel(
				() => {},
				InParallel(
					InParallel(
						() => Promise.reject('error')
					)
				)
			)
		);

		task((err, res) => done(err != null ? null : err));
	});

});
