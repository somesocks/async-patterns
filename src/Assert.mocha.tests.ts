
import Assert from './Assert';
import CatchError from './CatchError';
import Callbackify from './Callbackify';
import InSeries from './InSeries';

import optional from 'vet/optional';
import exists from 'vet/exists';
import isBoolean from 'vet/booleans/isBoolean';
import isNumber from 'vet/numbers/isNumber';

import isShape from 'vet/objects/isShape';

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
				(...args) => optional(exists)(args)
			)
		);
		task(done);
	});

	it(
		'Re-throws error',
		Callbackify(
			InSeries(
				CatchError(
					Assert(
						() => false, // always fail,
						() => {
							const err : any = new Error('foo');
							err.foo = true;
							return err;
						}
					)
				),
				Assert(
					({ error }) => error.foo === true,
					'incorrect error re-thrown'
				)
			)
		)
	);

});
