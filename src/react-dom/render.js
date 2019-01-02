import ReactElement from './element';

const setElementAttr = function (element, attrName, value) {
    // 解析className
    attrName = attrName === 'className' ?  'class' : attrName;

    // 如果是相关事件，则加入监听
    if ( /on\w+/.test( attrName ) ) {
      const eventName = attrName.replace(/on/, '').toLowerCase();
      element.addEventListener(eventName, value)
      // 如果是style对象，则解析成dom的style
    } else if (attrName === 'style') {
      if (typeof value === 'string') {
        element.style.cssText = value || '';
      } else if (typeof value === 'object' ) {
        Object.keys(value).forEach(_name => {
          const styleName = _name.replace(/([A-Z])/g,"-$1").toLowerCase();
          element.style[styleName] = value[_name]
        })
      }
      // 普通属性，直接赋值
    } else {
      value ? element.setAttribute(attrName, value) : element.removeAttribute(attrName)
    }
}

const render = function (vnode, rootElement) {
  rootElement.innerHTML = null;
  const instNode = getInstanceFromVirtualNode(vnode);
  
  const mountedNode = _MounteInstance(instNode);
  rootElement.appendChild(mountedNode);
}

function getInstanceFromVirtualNode (vnode, inst = {}) {
  let childrenNode = vnode.children;

  if (typeof vnode === 'string') {
    inst = vnode;
  }

  if (typeof vnode.tagName === 'function') {
    const currentInstance = createComponent(vnode.tagName, vnode.attr);
    const wrapper = ReactElement.ReactCompositeComponentWrapper(currentInstance);

    childrenNode = wrapper.nextLevelNode;
    Object.assign(inst, wrapper)
  }

  if (typeof vnode.tagName === 'string') {
    const elementDom = ReactElement.ReactDOMComponent(vnode);
    Object.assign(inst, {} ,elementDom)
  }

  if (childrenNode && childrenNode.length > 0) {
    childrenNode.forEach((item, index) => {
      const result = getInstanceFromVirtualNode(item);
      inst.nextLevelNode[index] = result;
    });
  }

  return inst
}

/**
 * 传入一个虚拟节点树，返回一个真实节点
 * @param {object} instance 需要解析的dom节点对象树 { tagName, attr, children }
 * @param {object} dom 根节点（如果存在的话），默认值是vnode的第一个节点
 * @returns {object} 返回dom真实节点树结构
 */
function _MounteInstance (instance, dom) {

    // 如果dom未定义，默认值为vnode的标签名，这里用作根节点的赋值
    dom = dom ||  document.createElement(instance.tagName);

    // 判断虚拟节点的类型，如果是#text类型创建text节点，如果是其他类型创建tag.name的节点
    const element = typeof instance == 'string'
    ? document.createTextNode(instance)
    : document.createElement(instance.tagName);

    if (instance.attrs) {
        Object.keys(instance.attrs).forEach(item => {
            setElementAttr(element, item, instance.attrs[item])
        })
    }

    // 如果节点还有子节点，进行递归
    if (instance.nextLevelNode && instance.nextLevelNode.length > 0) {
        instance.nextLevelNode.forEach(item => _MounteInstance(item, element))
    }

    // 返回此段节点的dom
    return dom.appendChild(element);
}

export {
    render
}
