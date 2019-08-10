
import Assert from './Assert';
import CatchError from './CatchError';
import Callbackify from './Callbackify';
import InSeries from './InSeries';
import Promisify from './Promisify';
import Delay from './Delay';
import If from './If';

describe('If', () => {

	it('test with 0 handlers',
		Callbackify(
			InSeries(
				() => true,
				If()
			)
		)
	);

	it('catches errors', (done) => {
		const task = Callbackify(
			If(
				() => true,
				() => { throw new Error('error'); }
			)
		);

		task((err, res) => done(err != null ? null : err));
	});

	it(
		'then works',
		Callbackify(
			InSeries(
				() => 1,
				If(
					(i) => i > 0,
					() => true,
					() => false
				),
				Assert(
					(val) => val === true
				)
			)
		)
	);

	it(
		'else works',
		Callbackify(
			InSeries(
				() => -1,
				If(
					(i) => i > 0,
					() => true,
					() => false
				),
				Assert(
					(val) => val === false
				)
			)
		)
	);

});
