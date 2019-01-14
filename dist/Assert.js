/* eslint-env node */

const nop = () => false;

const errorWrapper = (log) => {
	const wrapper =
		(typeof log === 'function' ? log : null) ||
		(() => log);
	return wrapper;
};

function Assert(validator, message) {
	validator = validator || nop;
	message = message || 'async-patterns/Assert failed';
	message = errorWrapper(message);

	return async function (request) {
		if(!validator(request)) {
			throw new Error(message(request));
		}
		return request;
	};
}

Assert.default = Assert;

module.exports = Assert;
