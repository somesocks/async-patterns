/* eslint-env mocha, node */

const { Assert, InSeries, CatchError, Callbackify } = require('./');

describe('CatchError', () => {
	it('CatchError 1', (done) => {
		const task = Callbackify(
			InSeries(
				CatchError(
					() => 1
				),
				Assert(
					({ error, result }) => error == null && result === 1
				),
				() => {}
			)
		);

		task(done);
	});

	it('CatchError 2', (done) => {
		const task = Callbackify(
			InSeries(
				CatchError(
					() => { throw new Error('error'); }
				),
				Assert(
					({ error, result }) => error != null
				),
				Assert(
					({ error, result }) => result == null
				)
			)
		);

		task(done);
	});

});
