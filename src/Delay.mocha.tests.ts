/* eslint-env mocha, node */

import Assert from './Assert';
import CatchError from './CatchError';
import Callbackify from './Callbackify';
import InSeries from './InSeries';
import Promisify from './Promisify';
import Delay from './Delay';

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
