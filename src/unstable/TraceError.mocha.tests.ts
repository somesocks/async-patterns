

import Assert from '../Assert';
import Delay from '../Delay';
import CatchError from '../CatchError';
import Callbackify from '../Callbackify';
import InSeries from '../InSeries';
import Logging from '../Logging';
import TraceError from './TraceError';

describe('TraceError tests', () => {
	it('Function.length should be at least 1', () => {
		if (TraceError().length < 1) { throw new Error(); }
		if (TraceError(() => {}).length < 1) { throw new Error(); }
	});

	it(
		'test with 0 handlers',
		Callbackify(
			TraceError()
		)
	);

	it(
		'test with null return',
		Callbackify(
			TraceError(
				() => null
			)
		)
	);

	it('passes errors', (done) => {
		Callbackify(
			TraceError(
				() => { throw new Error('error'); }
			)
		)((err, res) => done(err != null ? null : err));
	});

	it(
		'deep error stack works',
		Callbackify(
			InSeries(
				CatchError(
					TraceError(
						InSeries(
							InSeries(
								Delay(500),
								() => { throw new Error('error'); }
							)
						)
					)
				),
				Logging(
					'Error Stack\n',
					({ error }) => error
				)
			)
		)
	);

});
