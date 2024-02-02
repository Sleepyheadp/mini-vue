// change one
Array.prototype.reduce = function (callback, initialValue) {
	let accumulator = initialValue !== undefined ? initialValue : this[0];
	for (let i = initialValue !== undefined ? 0 : 1; i < this.length; i++) {
		accumulator = callback(accumulator, this[i], i, this);
	}
	return accumulator;
};
// change two
Array.prototype.unique = function () {
	const seen = new Set();
	const result = [];
	for (let i = 0; i < this.length; i++) {
		const item = this[i];
		if (!seen.has(item)) {
			seen.add(item);
			result.push(item);
		}
	}
	return result;
};
