
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

describe('Promisify', () => {
	it('Promisify works', (done) => {
		new Promise((resolve) => resolve())
			.then(
				Promisify((next) => next())
			)
			.then(() => done());
	});

	it('Promisify catches callback errors', (done) => {
		const onCatch = (err) => {
			if (err == null) {
				done(new Error('didnt catch'));
			} else {
				done();
			}
		};

		new Promise((resolve) => resolve())
			.then(
				Promisify((next) => next(new Error('throw error')))
			)
			.catch(onCatch);
	});

	it('Promisify catches thrown errors', (done) => {
		const onCatch = (err) => {
			if (err == null) {
				done(new Error('didnt catch'));
			} else {
				done();
			}
		};

		new Promise((resolve) => resolve())
			.then(
				Promisify((next) => { throw new Error('throw error'); })
			)
			.catch(onCatch);
	});
});
