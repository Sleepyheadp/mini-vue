import { Dep, effectWatch, reactive } from "./reactive.js";
export { Dep, effectWatch, reactive };

// createApp(App).mount("#app"); -> 官方写法
export const createApp = (rootContainer) => {
	return {
		mount() {
			const result = rootContainer.setup();
			rootContainer.render(result);
		},
	};
};
