
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
