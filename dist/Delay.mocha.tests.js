/* eslint-env mocha, node */

const {
	Assert,
	Callbackify,
	InSeries,
	Delay,
} = require('./');

describe('Delay', () => {

	it('Delay 1',
		Callbackify(
			InSeries(
				() => [ 1, 2, 3 ],
				Delay(100),
				Assert(
					([ a, b, c ]) => (a === 1 && b === 2 && c === 3)
				)
			)
		)
	);

	it('Delay 2',
		Callbackify(
			InSeries(
				() => [ 1, 2, 3 ],
				Delay(),
				Assert(
					([ a, b, c ]) => (a === 1 && b === 2 && c === 3)
				)
			)
		)
	);

});
