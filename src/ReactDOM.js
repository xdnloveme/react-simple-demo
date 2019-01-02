import { render } from './react-dom/render'

export default {
    rootElement: null,
    originialVirtualDom: null,
    virtualDom: null,
    render (element, rootElement) {
        this.rootElement = rootElement;
        // 这里把需要挂载的虚拟节点挂载到真实节点上去
        this.originialVirtualDom = element;
        let _readyCompileDom = Object.assign({}, element);

        render(_readyCompileDom, rootElement);

        this.virtualDom = _readyCompileDom;
    }
}
