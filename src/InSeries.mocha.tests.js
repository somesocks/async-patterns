/* eslint-env mocha, node */

const { Callbackify, Assert, InSeries, InParallel, CatchError, PassThrough, Logging } = require('./');

describe('InSeries tests', () => {

	it('test with 0 handlers', (done) => {
		Callbackify(InSeries())(done);
	});

	it('test with null return', (done) => {
		Callbackify(
			InSeries(
				() => {},
				() => {}
			)
		)(done);
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
