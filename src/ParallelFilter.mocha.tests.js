/* eslint-env mocha, node */

const {
	Assert,
	Callbackify,
	InSeries,
	InParallel,
	PassThrough,
	ParallelFilter,
	Logging,
} = require('./');

describe('ParallelFilter', () => {

	it('test with 0 args', (done) => {
		const task = Callbackify(ParallelFilter((item) => true));
		task(done);
	});

	it('catches errors', (done) => {
		const task = Callbackify(
			ParallelFilter((item) => { throw new Error('error'); })
		);

		const onDone = (err, res) => done(err != null ? null : err);

		task(onDone, [ 1, 2, 3 ]);
	});

	it('works 1', (done) => {
		const task = Callbackify(
			InSeries(
				() => [ 1, 2, 3 ],
				ParallelFilter((item) => item > 1),
				Assert(
					([ a, b, c ]) => a === 2 && b === 3 && c === undefined
				)
			)
		);

		task(done);
	});

	it('performance', (done) => {
		const task = Callbackify(
			InSeries(
				ParallelFilter((item) => item > 0)
			)
		);

		task(done, Array(10000).fill(1));
	});


});
