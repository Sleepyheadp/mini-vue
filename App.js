import { reactive, h } from "./core/reactivity/index.js";
const App = {
	render(context) {
		// const dom = document.createElement("div");
		// const textOne = document.createTextNode("num:");
		// const textTwo = document.createTextNode(context.num); // 根据num的值变动
		// const button = document.createElement("button");
		// button.innerText = "add";
		// button.addEventListener("click", () => {
		// 	context.num++;
		// });
		// dom.append(textOne);
		// dom.append(textTwo);
		// dom.append(button);
		// return dom;
		/* virtual dom => h */
		/* 当children为string类型时 */
		// return h("div", { id: "capoo" }, "hello h function");
		// [注意] 第三个值是children.
		return h("div", { id: "capoo", class: "test" }, [
			h(context.obj.tag, context.obj.propsUpdate, "count:"),
			h(context.obj.tag, context.obj.propsAdd, String(context.obj.count)),
			h(
				"button",
				{
					onClick: () => {
						context.obj.count + 1;
						console.log("addCount");
					},
					...context.obj.propsRemove,
				},
				"addCount"
			),
			h(
				"button",
				{
					onClick: () => {
						context.obj.tag = "p";
						console.log("changeTag");
					},
				},
				"changeTag"
			),
		]);
	},
	setup() {
		let obj = reactive({
			count: 0,
			tag: "span",
			propsUpdate: {
				a: "a1",
			},
			propsAdd: {
				a: "a2",
			},
			propsRemove: {
				a: "a3",
				b: "b1",
			},
		});
		window.obj = obj; // 为了方便调试,将obj挂载到window上
		return { obj };
	},
};
export default App;
