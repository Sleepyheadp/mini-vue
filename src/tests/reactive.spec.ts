import { reactive, effectWatch } from "../reactivity/reactive.js/index.js";
describe("reactive", () => {
	it("happy reactive", () => {
		const user = reactive({
			age: 18,
		});
		let nextAge;
		effectWatch(() => {
			nextAge = user.age + 1;
		});
		expect(nextAge).toBe(19);
	});
});
