import { effect } from "@vue/reactivity";
import { Dep } from "../reactivity/reactive.js/index.js";

describe("effect", () => {
	it("happy ref", () => {
		let a = new Dep(1);
		let b = new Dep(2);
		let add;
		effect(() => {
			add = a._val + b._val;
		});
		expect(add).toBe(3);
	});
});
