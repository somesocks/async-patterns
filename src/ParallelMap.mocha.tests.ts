
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
import ParallelMap from './ParallelMap';

describe('ParallelMap', () => {

	it('test with 0 args', (done) => {
		const task = Callbackify(ParallelMap((item) => true));
		task(done);
	});

	it('catches errors', (done) => {
		const task = Callbackify(
			ParallelMap((item) => { throw new Error('error'); })
		);

		const onDone = (err, res) => done(err != null ? null : err);

		task(onDone, [ 1, 2, 3 ]);
	});

	it('works 1', (done) => {
		const task = Callbackify(
			InSeries(
				() => [ 1, 2, 3 ],
				ParallelMap((item) => item > 1),
				Assert(
					([ a, b, c ]) => a === false && b === true && c === true
				)
			)
		);

		task(done);
	});

	it('performance', (done) => {
		const task = Callbackify(
			InSeries(
				ParallelMap((item) => item > 0)
			)
		);

		task(done, Array(10000).fill(1));
	});


});
