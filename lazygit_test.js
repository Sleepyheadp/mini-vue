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
