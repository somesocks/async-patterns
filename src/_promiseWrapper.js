
function _promiseWrapper(func) {
	return function _promiseWrapperInstance() {
		try {
			var result = func.apply(null, arguments);
			return result instanceof Promise ? result : Promise.resolve(result)
		} catch (err) {
			return Promise.reject(err);
		}
	};
}

module.exports = _promiseWrapper;
