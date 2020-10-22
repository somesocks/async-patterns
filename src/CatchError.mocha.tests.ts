
import Assert from './Assert';
import CatchError from './CatchError';
import Callbackify from './Callbackify';
import InSeries from './InSeries';
import Promisify from './Promisify';

const task =
CatchError(
  (a : string) => a
);

const task2 = InSeries(
  (a : number ) => a + 1,
  (a) => a + '1',
  task
);



describe('CatchError', () => {
	it('CatchError 1', (done) => {
		const task = Callbackify(
			InSeries(
				CatchError(
					() => 1
				),
				Assert(
					({ error, result }) => error == null && result === 1
				),
				() => {}
			)
		);

		task(done);
	});

	it('CatchError 2', (done) => {
		const task = Callbackify(
			InSeries(
				CatchError(
					() => { throw new Error('error'); }
				),
				Assert(
					({ error, result }) => error != null
				),
				Assert(
					({ error, result }) => result == null
				)
			)
		);

		task(done);
	});

});
