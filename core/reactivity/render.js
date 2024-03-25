// 抽离部分操作,便于后续维护扩展
function createElement(tag) {
	return document.createElement(tag);
}
function patchProps(el, key, prevValue, nextValue) {
	if (nextValue === null) {
		el.removeAttribute(key);
	} else {
		el.setAttribute(key, nextValue);
	}
}
function insert(el, parent) {
	parent.append(el);
}
function createTextNode(node) {
	return document.createTextNode(node);
}
function removeChild(parent, el) {
	parent.removeChild(el);
}

export function mountElement(vnode, container) {
	const { tag, props, children } = vnode;
	// 分别对tag、props、children进行处理
	// tag
	const el = (vnode.el = createElement(tag));
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

export function diff(v1, v2) {
	/* tag : 如果v1和v2的tag不一样,则直接替换 */
	if (v1.tag !== v2.tag) {
		// 是把创建出来的el替换掉.  => [疑问🤔]为什么不直接替换tag的值呢? 比如将p替换为div
		v1.el.replaceWith(createElement(v2.tag));
	} else {
		// 如果tag一样,则对比props和children
		/* 	props */
		// 3. old a1.0 -> new a2.0 -> a的值更新了

		// 1. old a -> new a.b -> 添加b
		const oldProps = v1.props;
		const newProps = v2.props;
		const el = (v2.el = v1.el);
		if (newProps) {
			for (const key in newProps) {
				if (newProps[key] !== oldProps[key]) {
					patchProps(el, key, oldProps[key], newProps[key]);
				}
			}
		}
		// 2. old a,b -> new a -> 删除b
		if (oldProps) {
			for (const key in oldProps) {
				if (!(key in newProps)) {
					patchProps(el, key, oldProps[key], null);
				}
			}
		}

		/* 处理children */
		const newChildren = v2.children;
		const oldChildren = v1.children;
		if (typeof newChildren === "string") {
			// 1. old string -> new String 且不相等时进行替换
			if (typeof oldChildren === "string") {
				if (newChildren !== oldChildren) {
					el.innerText = newChildren;
				}
			}
			// 2. old array -> new string
			else if (Array.isArray(oldChildren)) {
				el.innerText = newChildren;
			}
		} else if (Array.isArray(newChildren)) {
			// 3. old array -> new string
			if (typeof oldChildren === "string") {
				el.innerText = "";
				newChildren.forEach((v) => {
					mountElement(v, el);
				});
			}
			// 4. old array -> new array
			// 4.1 依次对比 old / new children
			// 4.2 新增的部分 add
			// 4.3 删除的部分 remove
			else if (Array.isArray(oldChildren)) {
				// 获取最小长度
				const length = Math.min(newChildren, oldChildren);
				// 1. 依次对比
				for (let i = 0; i < length; i++) {
					const newVnode = newChildren[i];
					const oldVnode = oldChildren[i];
					diff(oldVnode, newVnode);
				}
				// 2. add new > old
				if (newChildren.length > length) {
					for (let i = length; i < newChildren.length; i++) {
						const vnode = newChildren[i];
						mountElement(vnode, el);
					}
				}
				// 3. remove new < old
				if (oldChildren.length > length) {
					for (let i = length; i < oldChildren.length; i++) {
						const vnode = oldChildren[i];
						removeChild(el, vnode.el);
					}
				}
			}
		}
	}
}
