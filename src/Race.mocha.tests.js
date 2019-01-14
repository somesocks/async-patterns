/* eslint-env mocha, node */

const { Callbackify, InSeries, InParallel, Race, PassThrough, Logging } = require('./');

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
