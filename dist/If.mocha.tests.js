/* eslint-env mocha, node */

const { Assert, InSeries, If, Callbackify } = require('./');

describe('If', () => {

	it('test with 0 handlers',
		Callbackify(
			InSeries(
				() => true,
				If()
			)
		)
	);

	it('catches errors', (done) => {
		const task = Callbackify(
			If(
				() => true,
				() => { throw new Error('error'); }
			)
		);

		task((err, res) => done(err != null ? null : err));
	});

	it(
		'then works',
		Callbackify(
			() => 1,
			InSeries(
				(i) => i > 0,
				() => true,
				() => false
			),
			Assert(
				(val) => val === true
			)
		)
	);

	it(
		'else works',
		Callbackify(
			() => -1,
			InSeries(
				(i) => i > 0,
				() => true,
				() => false
			),
			Assert(
				(val) => val === false
			)
		)
	);

});
