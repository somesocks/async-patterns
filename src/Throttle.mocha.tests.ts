/* eslint-env mocha, node */

import isArray from 'vet/arrays/isArray';
import isAllOf from 'vet/isAllOf';
import isShape from 'vet/objects/isShape';

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

const _isRes = isAllOf(
	isArray,
	isShape({
		length: 8,
		0: 0,
		1: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		7: 7,
	})
);
const isRes : typeof _isRes = _isRes;

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
					() => task(0),
					() => task(1),
					() => task(2),
					() => task(3),
					() => task(4),
					() => task(5),
					() => task(6),
					() => task(7)
				),
				() => {
					isRes.assert(arr);
				}
			)
		)(done);

	});

});
