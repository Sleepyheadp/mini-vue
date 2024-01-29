// [疑问🤔]为什么不能用ES6的import导入,而是用require导入
const { effect, reactive } = require("@vue/reactivity");
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
let a = reactive({
	// reactive对象里的属性是响应式的,是对象类型的
	val: 10,
});
let b;
// effect为什么使用的是发布订阅模式,因为effect里面的函数是在初始化的时候就执行了一次,然后当依赖的值发生改变的时候会再执行一次
effect(() => {
	b = a.val + 10;
	console.log(b);
});
a.val = 20;
