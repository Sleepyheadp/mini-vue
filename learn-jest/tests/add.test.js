import { add } from "../add.js";
describe("add", () => {
	it("desc -> 1+1=2", () => {
		// 运行了14ms,外部引入了add.js文件
		const a = 1;
		const b = 1;
		const result = add(a, b);
		// 断言
		// tobe 匹配器
		expect(result).toBe(2);
	});

	it("desc -> 2+2", () => {
		const a = 2;
		const b = 2;
		const result = add(a, b);
		expect(result).toBe(4);
	});
});

describe("equal", () => {
	it("desc -> 判断两个对象是否相等", () => {
		const obj1 = { a: 1 };
		const obj2 = { a: 1 };
		expect(obj1).toEqual(obj2);
	});
});
describe("contain", () => {
	it("desc -> 是否包含", () => {
		const str = "hello jest";
		expect(str).toContain("jest");
	});

	it("desc -> 是否不包含", () => {
		const str = "hello jest";
		expect(str).not.toContain("world");
	});
});
