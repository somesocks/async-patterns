/* eslint-env mocha, node */

const { Callbackify, InSeries, InParallel, PassThrough, Logging } = require('./');

describe('Logging', () => {
	it('Function.length should be at least 1', () => {
		if (Logging().length < 1) { throw new Error(); }
	});

	it('Logging with string', (done) => {
		Callbackify(Logging('test'))(done, 1, 2, 3);
	});

	it('Logging with function', (done) => {
		Callbackify(Logging((...args) => `${args}`))(done, 1, 2, 3);
	});

	it('Logging with multiple statements function', (done) => {
		Callbackify(
			Logging(
				'Logging test',
				{ test: 1 },
				1,
				false,
				(...args) => `${args[0]}`,
				(...args) => `${args[1]}`,
				(...args) => `${args[2]}`,
				(...args) => `${args}`
			)
		)(done, 1, 2, 3);
	});
});
