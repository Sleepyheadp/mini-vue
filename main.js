import { effectWatch, reactive } from "./core/reactivity/index.js";
import { createApp } from "./core/reactivity/index.js";
// 结合UI视图更新
const App = {
	render(context) {
		effectWatch(() => {
			document.querySelector("#app").innerHTML = ""; // 每次都清空
			const dom = document.createElement("div");
			const textOne = document.createTextNode("num:");
			const textTwo = document.createTextNode(context.num); // 根据num的值变动
			const button = document.createElement("button");
			button.innerText = "add";
			button.addEventListener("click", () => {
				context.num++;
			});
			dom.append(textOne);
			dom.append(textTwo);
			dom.append(button);
			document.querySelector("#app").append(dom);
		});
	},
	setup() {
		let obj = reactive({
			num: 0,
		});
		window.obj = obj; // 通过obj.num++修改值,而不是window.obj.num++
		return obj;
	},
};
// App.render(App.setup());
createApp(App).mount(document.querySelector("#app"));
