/* eslint-env mocha, node */

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
import Timer from './Timer';

describe('Timer', () => {
	it('test with 0 handlers', (done) => {
		Callbackify(
			Timer()
		)(done);
	});

	it('test with null return', (done) => {
		Callbackify(
			Timer(
				Promisify((next) => next())
			)
		)(done);
	});

	it('Function.length should be at least 1', () => {
		if (Timer().length < 1) { throw new Error(); }
		if (Timer(Promisify((next) => true)).length < 1) { throw new Error(); }
	});

	it('test with null callback', (done) => {
		Timer(
			Promisify(
				(next) => next()
			)
		)();
		setTimeout(done, 16);
	});

	it('catches errors', (done) => {
		Callbackify(
			Timer(
				Promisify(
					(next) => { throw new Error('error'); }
				)
			)
		)((err, res) => done(err != null ? null : err));
	});

	it('returns 1', (done) => {
		Callbackify(
			Timer(
				Promisify(
					(next) => next(null, 1)
				)
			)
		)((err, res) => done(
			((err != null) && (res === 1)) ? null : err)
		);
	});

	it('label works', (done) => {
		Callbackify(
			Timer(
				Promisify(
					(next) => next(null, 1)
				),
				'Label'
			)
		)((err, res) => done(
			((err != null) && (res === 1)) ? null : err)
		);
	});

	it('measures time', (done) => {
		Callbackify(
			Timer(
				Promisify(
					(next) => setTimeout(next, 128)
				)
			)
		)(done);
	});
});
