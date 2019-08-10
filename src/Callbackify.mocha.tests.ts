/* eslint-env mocha, node */

import Assert from './Assert';
import CatchError from './CatchError';
import Callbackify from './Callbackify';
import InSeries from './InSeries';
import Promisify from './Promisify';

describe('Callbackify', () => {
	it('Function.length should be at least 1', () => {
		if (Callbackify().length < 1) { throw new Error(); }
		if (Callbackify(() => {}).length < 1) { throw new Error(); }
	});

	it(
		'Callbackify.resolve works',
		Callbackify(
			InSeries(
				() => 2,
				Promisify(
					Callbackify(
						(val) => new Promise((resolve, reject) => resolve(val))
					)
				),
				Assert((val) => val === 2, 'Callbackify failed to resolve')
			)
		)
	);

	it(
		'Callbackify.reject works',
		Callbackify(
			InSeries(
				() => 2,
				CatchError(
					Promisify(
						Callbackify(
							(val) => new Promise((resolve, reject) => reject(val))
						)
					)
				),
				Assert(
					({ error }) => error !== null,
					'Callbackify failed to reject'
				)
			)
		)
	);

	it(
		'Callbackify catches thrown error',
		Callbackify(
			InSeries(
				() => 2,
				CatchError(
					Promisify(
						Callbackify(
							(val) => { throw new Error('test error'); }
						)
					)
				),
				Assert(
					({ error }) => error !== null && error.message === 'test error',
					'Callbackify failed to catch thrown error'
				)
			)
		)
	);



	it('test with 0 handlers', (done) => {
		Callbackify()(done);
	});

});
