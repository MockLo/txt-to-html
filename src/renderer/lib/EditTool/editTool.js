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
// const mdTODO = () => {
//   let sel = window.getSelection()
//   let range = sel.getRangeAt(0)
//   let start = range.startOffset
//   let end = range.endOffset

//   if (start === 0 && end === 0 && range.commonAncestorContainer.nodeName === 'P') {
//     // 替换之前的空p标签
//     range.selectNode(sel.focusNode)
//     cmd('insertHTML', `<p class="md-todo" contenteditable="false" onkeydown="todoEnterHandler()"></p>`)

//     // 在刚生成的ul里添加DOM
//     let p = sel.focusNode.children[range.startOffset]
//     p.innerHTML += `<ul><li><input type="checkbox"><span class="todo-item" contenteditable="true"></span></li></ul>`

//     // 使光标落在刚刚添加的span上
//     let span = p.querySelector('span.todo-item')
//     span.focus()
//   }
// }

const mdLink = url => {
  recoverSelection()
  if (!url) url = ' '
  let sel = window.getSelection()
  if (sel.isCollapsed) return
  cmd('createLink', url)
}

// const mdQuote = () => {
//   let sel = window.getSelection()
//   cmd('insertHTML', '<p class="md-quote"></p>')
//   if (sel.focusNode) sel.focusNode.focus()
// }

const mdTable = {
  getTable() {
    let target = window.getSelection().getRangeAt(0).commonAncestorContainer
    if (target.nodeType === 3) {
      target = target.parentNode
    }
    let tbody = target.parentNode.parentNode
    return {
      tbody,
      cellIndex: target.cellIndex,
      rowIndex: target.parentNode.rowIndex,
      cells: target.parentNode.childElementCount,
      rows: tbody.childElementCount
    }
  },

  addColumn: () => {
    let { tbody, cellIndex } = mdTable.getTable()
    if (typeof cellIndex === 'undefined') return
    tbody.childNodes.forEach((tr, key) => {
      let _childs = tr.childNodes
      let child = document.createElement(key ? 'td' : 'th')
      cellIndex === _childs.length - 1 ? tr.appendChild(child) : tr.insertBefore(child, _childs[cellIndex + 1])
    })
  },
  addRow: () => {
    let { tbody, rowIndex, rows } = mdTable.getTable()
    if (typeof rowIndex === 'undefined') return
    let childs = tbody.childNodes
    let child = document.createElement('tr')
    child.innerHTML = '<td></td>'.repeat(rows)
    rowIndex === childs.length - 1 ? tbody.appendChild(child) : tbody.insertBefore(child, childs[rowIndex + 1])
  },
  delColumn() {
    let { tbody, cellIndex, cells } = mdTable.getTable()
    if (typeof cellIndex === 'undefined') return
    let _do = () => {
      tbody.childNodes.forEach(tr => {
        tr.childNodes[cellIndex].remove()
      })
    }
    if (cells === 1) {
      this.$confirm('确定删除此表格吗？', {
        success: () => _do()
      })
    } else {
      _do()
    }
  },
  delRow: () => {
    // let { tbody, rowIndex, rows } = mdTable.getTable()
  }
}

export { cmd, saveSelection, mdMark, mdLink, mdTable }
