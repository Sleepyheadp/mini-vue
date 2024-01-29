// 为什么要新创建一个变量呢?
// 因为我们的class类没法跟我们的effectWatch函数进行联系
// 但是我们创建的类又需要拿到调用effectWatch()函数时传入的值进行处理
let currentEffect;
class Dep {
	// this.val是在做什么操作? 这个constructor里面就可以接收到外面传入的值
	constructor(value) {
		this.effects = new Set(); // 无重复元素的集合,保证收集的依赖没有重复项
		this._val = value; // 我们在new Dep的时候穿入的值,并拿到这个值
	}
	// 为什么后面要带value,这个value是哪里来的?
	// 其实就是我们在外部调用的时候传入的值,get/set后面的name可以随便取,取值的时候可以通过this.name来取
	get getValue() {
		dep.depend();
		return this._val;
	}
	// set方法可以拿到最新的值
	set setValue(newVal) {
		this._val = newVal;
		dep.notice(); // 触发依赖(注意是要在值发生变更,才去触发依赖)
	}
	// 收集依赖
	depend() {
		if (currentEffect) {
			// 这里可以直接拿effects用吗?没太看懂
			// 这一步其实就是将我们的依赖关系放到effects集合中
			this.effects.add(currentEffect);
		}
	}
	// 触发依赖
	// 怎么触发呢?其实就是执行effectWatch的回调函数
	notice() {
		this.effects.forEach((effect) => {
			effect();
		});
	}
}
// 依赖收集,也就是我们处理逻辑的地方(值改变了,就要通知依赖更新)
function effectWatch(effect) {
	// 全局变量的引用 不是this.currentEffect?
	currentEffect = effect;
	effect(); // 「疑问🤔」为什么要在这里进行执行effect呢?因为跟vue的保持一致在初始化的时候就需要先执行一次
	dep.depend(); // 触发依赖
	// 触发依赖之后就将当前依赖赋空,我理解的是每次effect执行的时候都会收集一个新的依赖?当前依赖没用了,下次数值更新会有新的依赖吗?
	currentEffect = null;
}
// 这里面的10,就相当于v1创建的a,b是根据a的变化来动态更新
const dep = new Dep(10); // => 类比之前的 let a =10
let b;
// 调用effect函数,并传入回调(逻辑关系)
effectWatch(() => {
	// [疑问🤔]这里取值为什么不用dep._val?
	// 因为我们在上面创建了一个get方法,通过dep.getName触发get方法,从而拿到值
	b = dep.getValue + 1;
	console.log(b);
});
// 现在我们可以外部更新值了,从而触发依赖关系更新
dep.setValue = 20; // 值已经改了,但是我们要通知去触发依赖
dep.setValue = 30; // 现在就只需要修改dep的值,就可以触发依赖更新了
// dep.notice(); // 「疑问🤔」我们现在还是需要自己手动的去触发依赖,进行优化
