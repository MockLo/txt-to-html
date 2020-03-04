/**
 * 执行exec命令
 * @param {string} cmdName 命令名称
 * @param {*} [args] 命令参数
 */
const cmd = (cmdName, args) => {
  document.execCommand(cmdName, false, args)
}

/** 上一次保存的range对象 */
let _lastSelectionRange = null

/** 保存当前的selectionRange对象 */
const saveSelection = () => {
  let selection = window.getSelection()
  _lastSelectionRange = selection.rangeCount > 0 ? selection.getRangeAt(0) : null
}

/** 恢复上一次的selectionRange对象 */
const recoverSelection = () => {
  let selection = window.getSelection()

  if (_lastSelectionRange) {
    selection.removeAllRanges()
    selection.addRange(_lastSelectionRange)
  }
}

/**
 * 增加标签
 * @param {string} tagName 标签名称
 * @param {string} [className] 类名
 */
// const addTag = (tagName, className) => {
//   let range = window.getSelection().getRangeAt(0)
//   let span = document.createElement('span')
//   span.appendChild(range.cloneContents())

//   let classPart = className ? ` class="${className}"` : ''
//   let html = `<${tagName}${classPart}><span>${span.innerHTML || '&nbsp;<br />'}</span></${tagName}>`
//   console.log(html)
//   cmd('insertHTML', html)
// }

const getAncientNode = (node, tagName) => {
  if (node.nodeName === 'P') return null
  if (node.nodeName === tagName) return node
  return getAncientNode(node.parentNode, tagName)
}

/**
 * 高亮
 */
const mdMark = () => {
  let range = window.getSelection().getRangeAt(0)
  let crtNode = range.commonAncestorContainer

  // 光标
  if (range.collapsed) return false

  // 左标和右标恰好覆盖住了高亮部分
  if (range.startOffset === 0 && range.endOffset === range.endContainer.length) {
    let _node = null
    if (crtNode.nodeName === 'MARK') {
      _node = crtNode
    }
    if (crtNode.parentNode.nodeName === 'MARK') {
      _node = crtNode.parentNode
      range.selectNode(_node)
    }
    cmd('insertHTML', `<span>${_node.innerHTML.replace(/<mark>/g, '').replace(/<\/mark>/g, '') || '&nbsp;'}</span>`)
    return true
  }

  if (crtNode.id === 'preview') return false

  let left = getAncientNode(range.startContainer, 'MARK')
  let right = getAncientNode(range.endContainer, 'MARK')
  if (left || right) return false

  let span = document.createElement('span')
  span.appendChild(range.cloneContents())
  cmd('insertHTML', `<mark>${span.innerHTML || '&nbsp;'}</mark>`)
  return true
}

/**
 * todo列表
 */
const mdTODO = () => {
  let sel = window.getSelection()
  let range = sel.getRangeAt(0)
  let crtNode = sel.focusNode

  if (range.startOffset === 0 && range.endOffset === 0 && range.commonAncestorContainer.nodeName === 'P') {
    sel.getRangeAt(0).selectNode(crtNode)

    cmd('insertHTML', `<p class="md-todo" contenteditable="false" onkeydown="todoEnterHandler()"><input type="checkbox"></p>`)
    sel.focusNode.innerHTML += `<span class="todo-item" contenteditable="true"></span>`
  }
}

export { cmd, saveSelection, recoverSelection, mdMark, mdTODO }
