
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

describe('PassThrough', () => {

	it('PassThrough 1',
		Callbackify(
			InSeries(
				() => [ 1, 2, 3 ],
				async (val) => val,
				PassThrough,
				Assert(
					([ a, b, c ]) => (a === 1 && b === 2 && c === 3)
				)
			)
		)
	);

});
