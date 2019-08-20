
import Assert from './Assert';
import CatchError from './CatchError';
import LogError from './LogError';
import Callbackify from './Callbackify';
import InSeries from './InSeries';
import Promisify from './Promisify';

describe('LogError', () => {
	it('LogError 1', (done) => {
		const task = Callbackify(
			InSeries(
				LogError(
					() => 1
				),
				() => {}
			)
		);

		task(done);
	});

	it('LogError 2', (done) => {
		const task = Callbackify(
			InSeries(
				CatchError(
					LogError(
						() => { throw new Error('error'); }
					)
				)
			)
		);

		task(done);
	});

});
