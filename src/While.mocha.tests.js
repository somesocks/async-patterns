/* eslint-env mocha, node */

const { Callbackify, Promisify, Assert, While, InSeries, InParallel, PassThrough, CatchError, Logging } = require('./');

describe('While', () => {
	it(
		'test with 0 handlers',
		Callbackify(While())
	);

	it('test with null callback', (done) => {
		While()();
		setTimeout(done, 16);
	});

	it('works correctly',
		Callbackify(
			InSeries(
				() => 1,
				While(
					(num) => num < 10,
					(num) => num + 1
				),
				Assert((...args) => args[0] === 10, 'Value not 10')
			)
		)
	);

	it('catches errors', (done) => {
		Callbackify(
			While(
				() => true,
				() => { throw new Error('error'); }
			)
		)((err, res) => done(err != null ? null : err));
	});

	it('deep loop works correctly',
		Callbackify(
			InSeries(
				() => 1,
				While(
					(num) => num < 100000,
					(num) => num + 1
				),
				Assert((...args) => args[0] === 100000, 'Value not 100000')
			)
		)
	);

});
