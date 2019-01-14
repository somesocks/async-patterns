/* eslint-env mocha, node */

const { Callbackify, Promisify, InSeries, InParallel, Race, PassThrough, Logging, Throttle } = require('../dist');

const { assert } = require('chai');

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
		const arr = [];

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
