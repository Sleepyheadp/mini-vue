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
		return h("div", { id: "capoo", class: "test" }, [
			h("span", {}, "count:"),
			h("span", {}, String(context.obj.count)),
			h(
				"button",
				{
					onClick: () => {
						context.count++;
					},
				},
				"add"
			),
		]);
	},
	setup() {
		let obj = reactive({
			count: 0,
		});
		window.obj = obj; // 为了方便调试,将obj挂载到window上
		return { obj };
	},
};
export default App;
