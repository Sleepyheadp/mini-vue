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
		return h("div", {}, [
			h("span", {}, "num:"),
			h("span", {}, context.num),
			h(
				"button",
				{
					onClick: () => {
						context.num++;
					},
				},
				"add"
			),
		]);
	},
	setup() {
		let obj = reactive({
			num: 0,
		});
		return obj;
	},
};
export default App;
