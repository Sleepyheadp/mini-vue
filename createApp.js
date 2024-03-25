import { effectWatch } from "./core/reactivity/reactive.js";
import { mountElement } from "./core/reactivity/render.js";
export const createApp = (rootComponent) => {
	// rootComponent: App
	return {
		// rootContainer: #app
		mount(rootContainer) {
			// console.log(rootComponent, rootContainer);
			const result = rootComponent.setup();
			effectWatch(() => {
				rootContainer.innerHTML = ""; // 每次都清空
				const subTree = rootComponent.render(result); // dom更新
				// console.log(subTree);
				// 将虚拟dom转换为真实dom
				mountElement(subTree, rootContainer);
				// rootContainer.append(subTree);
			});
		},
	};
};
