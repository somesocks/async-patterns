/* eslint-env mocha, node */

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
import ParallelMap from './ParallelMap';
import Retry from './Retry';
import Throttle from './Throttle';

import { assert } from 'chai';

describe('Throttle', () => {
	it('test with 0 handlers',
		Callbackify(
			Throttle
		)
	);

	it('test with null callback', (done) => {
		Throttle(
			() => null
		)();
		setTimeout(done, 16);
	});

	it('throttling doesnt break', (done) => {
		const arr : any[] = [];

		const task = Throttle(
			(i) => {
				arr.push(i);
			}
		);

		Callbackify(
			InSeries(
				InParallel(
					() => task(1),
					() => task(2),
					() => task(3),
					() => task(4),
					() => task(5),
					() => task(6),
					() => task(7),
					() => task(8)
				),
				() => {
					assert.deepEqual(arr, [ 1, 2, 3, 4, 5, 6, 7, 8 ]);
				}
			)
		)(done);

	});

});
