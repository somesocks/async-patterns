/* eslint-env mocha, node */

const { Assert, InSeries, CatchError, Callbackify } = require('./');

const Vet = require('vet');
const { optional, exists, isBoolean, isNumber } = Vet;
const { matches } = Vet.Object;

describe('Assert', () => {
	it(
		'Assert 1',
		Callbackify(
			InSeries(
				() => true,
				Assert(
					(arg) => {
						console.log('assert arg', arg);
						return isBoolean(arg);
					}
				),
				(val) => console.log('val', val)
			)
		)
	);

	it('Assert 2', (done) => {
		const task = Callbackify(
			InSeries(
				() => false,
				Assert(isNumber)
			)
		);

		task(
			(err) => done(err != null ? null : new Error('expected error'))
		);
	});


	it('Assert 3', (done) => {
		const task = Callbackify(
			Assert(
				(...args) => matches(optional(exists))(...args)
			)
		);
		task(done);
	});

});
