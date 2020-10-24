
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
import Logging from './Logging';


let t1 = InSeries(
  PassThrough,
  // Logging('foo'),
  (a : number) => a + 1,
  (a : number) => a + 1,
  (a : number) => a + 1,
  PassThrough,
  (b : number) => b + '1',
  PassThrough,
  (c : string) => Boolean(c),
  // Logging('foo'),
  PassThrough,
);

let t2 = InSeries(
  (a : number) => a + 1,
  (b : number) => b + '1',
  (c : string) => Boolean(c),
);

let t3 = InSeries();

let t4 = InSeries(
  (a : number) => a + 1,
  (b : number) => b + '1',
  (c : string) => Promise.resolve(Boolean(c)),
);

let t5 = InSeries(
	(val) => val + 1,
	(val) => val + 1,
	async (val : number) => val + 1
);

let t6 = InSeries(
  InSeries(
    (val : number) => val + 1,
  )
);

let t7 = InSeries(
  (a : number) => a + 1,
  () => 1,
  () => 1,
  () => 1,
);


describe('InSeries tests', () => {

	it('test with 0 handlers', (done) => {
		Callbackify(InSeries())(done);
	});

	it('test with null return', (done) => {
    const task = InSeries(
			(a : number) => a,
			(a : number) => a + 1,
		);

    const task2 = InSeries(
      () => 1,
      task,
      (a) => a
    );

    let p = task(1);


		Callbackify(task)(done);
	});

	it('catches errors', (done) => {
		const task = Callbackify(
			InSeries(
				() => {},
				() => { throw new Error('error'); }
			)
		);

		task((err, res) => done(err != null ? null : err));
	});

	it('catches errors 2', (done) => {
		const task = Callbackify(
			InSeries(
				() => {},
				() => Promise.reject('error')
			)
		);

		task((err, res) => done(err != null ? null : err));
	});

	it(
		'works',
		Callbackify(
			InSeries(
				() => 1,
				InSeries(
					(val) => val + 1,
					(val) => val + 1,
					async (val) => val + 1
				),
				Assert(
					(val) => val === 4
				)
			)
		)
	);

	const SHORT_CHAIN = InSeries(
		...Array(1000).fill(PassThrough)
	);

	const LONG_CHAIN = InSeries(
		...Array(1000).fill(SHORT_CHAIN)
	);


	it('Long Chain Performance', (done) => {
		Callbackify(LONG_CHAIN)(done, [ 1, 2, 3 ]);
	});

});
