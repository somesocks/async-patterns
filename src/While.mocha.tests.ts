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
import While from './While';

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
