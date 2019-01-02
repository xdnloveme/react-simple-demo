/**
 * 虚拟节点元素的对象属性
 * * _currentInstance: 当前节点的组件实例（如果存在）
 * nextLevelNode: 下一层级的节点组
 * tagName: 当前节点的名称
 * props: 当前节点的attribute属性值
 * _isComponent: 当前节点是否是组件容器
 * @type {Object}
 */

let elementInstance = {
  _currentInstance: null,
  nextLevelNode: [],
  tagName: null,
  attrs: null,
  _isComponent: false
}

export default {
  ReactDOMComponent (vnode) {
    return {
      ...elementInstance,
      nextLevelNode: [],
      tagName: vnode.tagName,
      attrs: vnode.attr
    }
  }
}
