
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
import Race from './Race';

describe('Race', () => {
	it('test with 0 handlers', (done) => {
		Callbackify(Race())(done);
	});

	it('catches errors', (done) => {
		Callbackify(
			Race(
				() => { throw new Error('error'); }
			)
		)((err, res) => done(err != null ? null : err));
	});

	it('catches errors 2', (done) => {
		Callbackify(
			Race(
				() => Promise.reject('error')
			)
		)((err, res) => done(err != null ? null : err));
	});

	it('works 1', (done) => {
		Callbackify(
			Race(
				() => 1,
				() => {}
			)
		)((err, res) => done(
			((err != null) && (res === 1)) ? null : err)
		);
	});

});
