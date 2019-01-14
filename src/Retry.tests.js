/* eslint-env mocha, node */

const { InSeries, InParallel, PassThrough, Logging, Retry } = require('./');

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
