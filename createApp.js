import { effectWatch } from "./core/reactivity/reactive.js";
import { mountElement, diff } from "./core/reactivity/render.js";
export const createApp = (rootComponent) => {
	// rootComponent: App
	return {
		// rootContainer: #app
		mount(rootContainer) {
			// 记录上一次的虚拟dom
			let prevSubTree = null;
			// 是否已经挂载
			let isMounted = false;
			// console.log(rootComponent, rootContainer);
			const result = rootComponent.setup();
			effectWatch(() => {
				if (!isMounted) {
					isMounted = true;
					const subTree = rootComponent.render(result); // dom更新
					prevSubTree = subTree; // 保存上一次的虚拟dom
					mountElement(subTree, rootContainer);
				} else {
					const subTree = rootComponent.render(result); // dom更新
					console.log(prevSubTree); // 修改前的虚拟dom
					console.log(subTree); // 修改后的虚拟dom
					// diff 算法比较哪些部分是更新了的
					diff(prevSubTree, subTree);
					prevSubTree = subTree; // 保存上一次的虚拟dom
				}

				// rootContainer.innerHTML = ""; // 每次都清空
				// const subTree = rootComponent.render(result); // dom更新
				// // console.log(subTree);
				// // 将虚拟dom转换为真实dom
				// console.log(prevSubTree); // 修改前的虚拟dom
				// console.log(subTree); // 修改后的虚拟dom
				// prevSubTree = subTree; // 保存上一次的虚拟dom
				// mountElement(subTree, rootContainer);
				// // rootContainer.append(subTree);
			});
		},
	};
};
