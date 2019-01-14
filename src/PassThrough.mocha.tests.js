/* eslint-env mocha, node */

const {
	Assert,
	Callbackify,
	InSeries,
	InParallel,
	PassThrough,
	Logging,
	CatchError,
	Delay,
} = require('./');

const Vet = require('vet');
const { optional, exists, isBoolean, isNumber } = Vet;
const { matches } = Vet.Object;

describe('PassThrough', () => {

	it('PassThrough 1',
		Callbackify(
			InSeries(
				() => [ 1, 2, 3 ],
				async (val) => val,
				PassThrough,
				Assert(
					([ a, b, c ]) => (a === 1 && b === 2 && c === 3)
				)
			)
		)
	);

});
