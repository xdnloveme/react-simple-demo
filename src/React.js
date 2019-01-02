import ReactDOM from './ReactDOM'

const createElement = function (tagName, attr, ...children) {
    children = children.filter(item => (item != undefined && item != null))
    return {
        tagName,
        attr,
        children
    }
}

const React = {
    createElement
}

export {
    React,
    ReactDOM
}
