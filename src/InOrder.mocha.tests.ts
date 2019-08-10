
import Assert from './Assert';
import CatchError from './CatchError';
import Callbackify from './Callbackify';
import InSeries from './InSeries';
import Promisify from './Promisify';
import Delay from './Delay';
import If from './If';
import InOrder from './InOrder';
import PassThrough from './PassThrough';

describe('InOrder', () => {
	it('Long Chain Performance', (done) => {
		const chain = Callbackify(
			InOrder(
				...Array(100000).fill(PassThrough)
			)
		);

		chain(done, [ 1, 2, 3 ]);
	});

	it('test with 0 handlers', (done) => {
		Callbackify(InOrder())(done);
	});

	it('test with null return', (done) => {
		Callbackify(
			InOrder(
				() => {},
				() => {}
			)
		)(done);
	});

	it('catches errors', (done) => {
		const task = Callbackify(
			InOrder(
				() => {},
				() => { throw new Error('error'); }
			)
		);

		task((err, res) => done(err != null ? null : err));
	});

	it('catches errors 2', (done) => {
		const task = Callbackify(
			InOrder(
				() => {},
				() => Promise.reject('error')
			)
		);

		task((err, res) => done(err != null ? null : err));
	});

	it('works 1',
		Callbackify(
			InSeries(
				() => 1,
				InOrder(
					(val) => val + 1,
					(val) => val + 1,
					async (val) => val + 1
				),
				Assert(
					(val) => val === 1
				)
			)
		)
	);

	it('works 2',
		Callbackify(
			InSeries(
				() => ({ a: 1 }),
				InOrder(
					(val) => { val.a++; },
					async (val) => { val.a++; },
					(val) => { val.a++; }
				),
				Assert(
					(val) => val && val.a === 4
				)
			)
		)
	);

});
