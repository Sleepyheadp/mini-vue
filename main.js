import { createApp } from "./core/reactivity/index.js";
// 结合UI视图更新
import App from "./App.js";
console.log("App", App);
// App.render(App.setup());
createApp(App).mount(document.querySelector("#app"));
