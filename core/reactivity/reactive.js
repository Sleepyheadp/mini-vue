let currentEffect;
export class Dep {
	constructor(value) {
		this.effects = new Set();
		this._val = value;
	}
	get getValue() {
		dep.depend();
		return this._val;
	}
	set setValue(newVal) {
		this._val = newVal;
		dep.notice();
	}
	depend() {
		if (currentEffect) {
			this.effects.add(currentEffect);
		}
	}
	notice() {
		this.effects.forEach((effect) => {
			effect();
		});
	}
}

export function effectWatch(effect) {
	currentEffect = effect;
	effect();
	currentEffect = null;
}

const dep = new Dep();

let targetMap = new Map();
function getDep(target, key) {
	let depsMap = targetMap.get(target);
	if (!depsMap) {
		depsMap = new Map();
		targetMap.set(target, depsMap);
	}

	let dep = depsMap.get(key);
	if (!dep) {
		dep = new Dep();
		depsMap.set(key, dep);
	}
	return dep;
}

export function reactive(data) {
	return new Proxy(data, {
		get(target, key) {
			const dep = getDep(target, key);
			dep.depend();
			return Reflect.get(target, key);
		},
		set(target, key, value) {
			const dep = getDep(target, key);
			const result = Reflect.set(target, key, value);
			dep.notice();
			return result;
		},
	});
}
