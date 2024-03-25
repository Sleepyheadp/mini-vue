// 抽离部分操作,便于后续维护扩展
function createElement(tag) {
	return document.createElement(tag);
}
function patchProps(el, key, prevValue, nextValue) {
	el.setAttribute(key, nextValue);
}
function insert(el, parent) {
	parent.append(el);
}
function createTextNode(node) {
	return document.createTextNode(node);
}

export function mountElement(vnode, container) {
	const { tag, props, children } = vnode;
	// 分别对tag、props、children进行处理
	// tag
	const el = createElement(tag);
	// props
	for (const key in props) {
		const val = props[key];
		patchProps(el, key, null, val);
	}
	// children (将children挂载到父节点div上)
	// 分两种情况 : 1.文本节点 2.数组节点
	if (typeof children === "string") {
		insert(createTextNode(children), el);
	} else if (Array.isArray(children)) {
		children.forEach((child) => {
			mountElement(child, el);
		});
	}
	// 将div挂载到根节点#app上
	insert(el, container);
}
