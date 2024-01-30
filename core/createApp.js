import { effectWatch } from "./reactivity/reactive.js";
export const createApp = (rootComponent) => {
	// rootComponent: App
	return {
		// rootContainer: #app
		mount(rootContainer) {
			console.log(rootComponent, rootContainer);
			const result = rootComponent.setup();
			effectWatch(() => {
				rootContainer.innerHTML = ""; // 每次都清空
				const element = rootComponent.render(result); // dom更新
				rootContainer.append(element);
			});
		},
	};
};
