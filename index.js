// [疑问🤔]为什么不能用ES6的import导入,而是用require导入
// const { effect, reactive } = require("@vue/reactivity");
import { effectWatch, reactive } from "./core/reactivity/index.js";
// v1:基础功能实现版本
// let a = 10;
// let b = a + 1;
// console.log(b);
// a = 20;
// b = a + 1;
// console.log(b);

// v2:把实现功能部分封装到函数里
// let a = 10;
// let b;
// function update() {
// 	b = a + 1;
// 	console.log(b);
// }
// update();
// a = 20;
// update();
/* 
v2有个问题就是必须每次都需要手动调用update函数进行更新,
但是我们希望的是当a变化时,b也跟着变化. 通过vue3的reactivity来实现
*/

// v3 reactivity
// npm init -y
// 安装一下@vue/reactivity
// let a = reactive({
// 	val: 10,
// });
// let b;
// effectWatch(() => {
// 	b = a.val;
// 	console.log(b);
// });
// a.val = 20;

// 结合UI视图更新

const App = {
	render() {
		effectWatch(() => {
			document.querySelector("#app").innerHTML = ""; // 每次都清空
			const dom = document.createElement("div");
			const textOne = document.createTextNode("num:");
			const textTwo = document.createTextNode(obj.num); // 根据num的值变动
			dom.append(textOne);
			dom.append(textTwo);
			document.querySelector("#app").append(dom);
		});
	},
	setup() {
		let obj = reactive({
			num: 0,
		});
		window.obj = obj; // 通过obj.num++修改值,而不是window.obj.num++
		return {
			obj,
		};
	},
};
App.render(App.setup());
