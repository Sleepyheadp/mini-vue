/* 使用vue内置的reactivity实现响应式 */
// import { effect, reactive } from "@vue/reactivity";
// let a = reactive({
// 	count: 1,
// });
// let b;
// effect(() => {
// 	b = a.count + 10;
// 	console.log(a.count, b); // 初始化的时候会执行一次
// });
// a.count = 2; // a.count变化时，会重新执行effect. 所以会打印两次

/* 自己实现的响应性数据ref */
let currentEffect;
class Dep {
	constructor(val) {
		// 首先要有容器，存储依赖
		this.effects = new Set(); // Set避免依赖重复收集
		this._val = val;
	}
	get value() {
		this.depend();
		return this._val;
	}
	set value(newVal) {
		this._val = newVal;
		this.notice();
	}
	// 依赖收集
	depend() {
		if (currentEffect) {
			this.effects.add(currentEffect);
		}
	}
	// 依赖触发
	notice() {
		// effects中收集的依赖都是回调函数,所以直接循环遍历执行即可. ()=>{}
		this.effects.forEach((effect) => {
			effect();
		});
	}
}
// 为什么要单独创建一个函数,将当前的依赖赋值给currentEffect
// 因为在effect中会调用一次effectWatch,而effectWatch中会将当前的effect赋值给currentEffect
// 声明函数
function effectWatch(effect) {
	currentEffect = effect;
	effect();
	currentEffect = null;
}

const dep = new Dep(10);
let b;
// 调用函数,并传入一个箭头函数.
effectWatch(() => {
	b = dep.value + 1; // dep.getValue会触发get操作
	console.log(b);
});
// 修改值触发set操作
dep.value = 20;
