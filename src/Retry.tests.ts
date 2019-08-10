
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
import Retry from './Retry';

describe('Retry', () => {
	it('test with 0 handlers', (done) => {
		Retry()(done);
	});

	it('test with null return', (done) => {
		Retry(
			(next) => next()
		)(done);
	});

	it('Function.length should be at least 1', () => {
		if (Retry().length < 1) { throw new Error(); }
		if (Retry((next) => true).length < 1) { throw new Error(); }
	});

	it('test with null callback', (done) => {
		Retry(
			(next) => next()
		)();
		setTimeout(done, 16);
	});

	it('catches errors', (done) => {
		Retry(
			(next) => { throw new Error('error'); }
		)((err, res) => done(err != null ? null : err));
	});

	it('returns 1', (done) => {
		Retry(
			(next) => next(null, 1)
		)((err, res) => done(
			((err != null) && (res === 1)) ? null : err)
		);
	});
});
