<template>
  <section id="editBar">
    <div class="editBar-group" v-for="(tools, i) in editTools" :key="i">
      <button
        class="editBar-tool"
        v-for="(tool, j) in tools"
        :key="j"
        :title="tool.name"
        :style="{ backgroundImage: `url(${tool.icon})` }"
        @click.self="toolClickHandler(tool.tap, $event.target)"
      >
        <div class="editBar-tool-children" v-if="tool.children">
          <button
            v-for="(child, j) in tool.children"
            :key="j"
            :title="child.name"
            :style="{ backgroundImage: `url(${child.icon})` }"
            @click="toolClickHandler(child.tap)"
          ></button>
        </div>
      </button>
    </div>
    <input id="editImgInput" type="file" accept="image/gif, image/jpeg, image/png" @change="insertImg" />
  </section>
</template>

<script>
import { cmd, saveSelection, mdMark, mdLink, mdTable } from '../../lib/EditTool/editTool'

export default {
  data() {
    return {
      optTools: [
        { name: '上一步', icon: require('../../assets/icon_undo.png'), tap: ['undo'] },
        { name: '下一步', icon: require('../../assets/icon_redo.png'), tap: ['redo'] }
      ],

      headlineTools: [
        {
          name: '标题',
          icon: require('../../assets/icon_headline.png'),
          children: [
            { name: '一级标题', icon: require('../../assets/icon_headline_1.png'), tap: ['formatBlock', '<H1>'] },
            { name: '二级标题', icon: require('../../assets/icon_headline_2.png'), tap: ['formatBlock', '<H2>'] },
            { name: '三级标题', icon: require('../../assets/icon_headline_3.png'), tap: ['formatBlock', '<H3>'] },
            { name: '四级标题', icon: require('../../assets/icon_headline_4.png'), tap: ['formatBlock', '<H4>'] },
            { name: '五级标题', icon: require('../../assets/icon_headline_5.png'), tap: ['formatBlock', '<H5>'] }
          ],
          tap: 'showChildren'
        }
      ],

      fontTools: [
        { name: '粗体', icon: require('../../assets/icon_bold.png'), tap: ['bold'] },
        { name: '斜体', icon: require('../../assets/icon_italic.png'), tap: ['italic'] },
        { name: '下划线', icon: require('../../assets/icon_underline.png'), tap: ['underline'] },
        { name: '删除线', icon: require('../../assets/icon_delLine.png'), tap: ['strikeThrough'] },
        { name: '上标', icon: require('../../assets/icon_font_up.png'), tap: ['superscript'] },
        { name: '下标', icon: require('../../assets/icon_font_down.png'), tap: ['subscript'] },
        {
          name: '高亮',
          icon: require('../../assets/icon_highLight.png'),
          tap: ['mark']
        }
      ],

      listTools: [
        { name: '有序列表', icon: require('../../assets/icon_list_order.png'), tap: ['insertOrderedList'] },
        { name: '无序列表', icon: require('../../assets/icon_list_unOrder.png'), tap: ['insertUnorderedList'] },
        // {
        //   name: 'Todo',
        //   icon: require('../../assets/icon_todo.png'),
        //   tap: ['todo']
        // },
        {
          name: '缩进',
          icon: require('../../assets/icon_indent.png'),
          children: [
            { name: '增加缩进', icon: require('../../assets/icon_indent.png'), tap: ['indent'] },
            { name: '减少缩进', icon: require('../../assets/icon_outdent.png'), tap: ['outdent'] }
          ],
          tap: 'showChildren'
        }
      ],

      tableTools: [
        {
          name: '表格',
          icon: require('../../assets/icon_table.png'),
          tap: 'showChildren',
          children: [
            { name: '添加表格', icon: require('../../assets/icon_addTable.png'), tap: ['table', ''] },
            { name: '向右添加列', icon: require('../../assets/icon_table_addColumn.png'), tap: ['table', 'addColumn'] },
            { name: '向下添加行', icon: require('../../assets/icon_table_addRow.png'), tap: ['table', 'addRow'] },
            { name: '删除当前列', icon: require('../../assets/icon_table_delColumn.png'), tap: ['table', 'delColumn'] },
            { name: '删除当前行', icon: require('../../assets/icon_table_delRow.png'), tap: ['table', 'delRow'] }
          ]
        }
      ],

      otherTools: [
        { name: '超链接', icon: require('../../assets/icon_addLink.png'), tap: ['createLink'] },
        { name: '分割线', icon: require('../../assets/icon_splitline.png'), tap: ['insertHorizontalRule'] },
        { name: '图片', icon: require('../../assets/icon_addPic.png'), tap: ['addPic'] }
        // { name: '引用', icon: require('../../assets/icon_quote.png'), tap: ['quote'] }
      ],

      tableAlignTools: [
        {
          name: '对齐',
          icon: require('../../assets/icon_align_center.png'),
          children: [
            { name: '左对齐', icon: require('../../assets/icon_align_left.png') },
            { name: '右对齐', icon: require('../../assets/icon_align_right.png') },
            { name: '居中对齐', icon: require('../../assets/icon_align_center.png') },
            { name: '文本对齐', icon: require('../../assets/icon_align_justified.png') }
          ],
          tap: 'showChildren'
        }
      ]
    }
  },

  computed: {
    editTools() {
      return [this.optTools, this.headlineTools, this.fontTools, this.listTools, this.otherTools, this.tableTools]
    }
  },

  methods: {
    toggleChildrenShowing(ele) {
      ele.getAttribute('showChildren') ? ele.removeAttribute('showChildren') : ele.setAttribute('showChildren', 'true')
    },

    toolClickHandler(args, ele) {
      if (!args) return
      if (args === 'showChildren') {
        this.toggleChildrenShowing(ele)
        return
      }
      let [md_flag, md_param] = args
      switch (md_flag) {
        case 'createLink': // 超链接
          saveSelection()
          this.$prompt('请输入链接：', {
            pattern: /(?:(https?|ftp|file):)?\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/,
            success: res => {
              if (res) mdLink(res)
            }
          })
          return

        case 'mark': // 高亮
          mdMark()
          return

        // case 'todo':
        //   mdTODO()
        //   return

        // case 'quote': // 引用
        //   mdQuote()
        //   return

        case 'addPic': // 增加图片
          document.getElementById('editImgInput').click()
          return

        case 'table': // 表格
          if (md_param) {
            mdTable[md_param].apply(this)
          } else {
            cmd(
              'insertHTML',
              `<table class="md-table" border="1"><tr><th></th><th></th></tr><tr><td></td><td></td></tr></table>`
            )
          }
          return

        default:
          try {
            cmd(md_flag, md_param)
          } catch (error) {
            console.log(error)
          }
          break
      }
    },

    insertImg(e) {
      let reader = new FileReader()
      let file = e.target.files[0]
      reader.onload = () => {
        let base64Img = reader.result
        cmd('insertHTML', `<p><img class="md-img" src="${base64Img}" /></p>`)
        document.getElementById('editImgInput').value = '' // 解决同一张图片上传无效的问题
      }
      reader.readAsDataURL(file)
    }
  },

  mounted() {
    // window.todoEnterHandler = function() {
    //   let code = event.code.toLowerCase()
    //   if (code === 'enter') {
    //     event.stopPropagation()
    //     event.preventDefault()
    //     if (!event.target.innerText) {
    //       // 退出todo
    //     } else {
    //       // 新增todo
    //       cmd += `<li><input type="checkbox"><span class="todo-item" contenteditable="true"></span></li>`
    //       // 使光标落在刚刚添加的span上
    //       let spans = document.querySelectorAll('span.todo-item')
    //       spans[spans.length - 1].focus()
    //     }
    // }
  }
}
</script>

<style lang="scss">
@mixin icon($width, $iconWidth) {
  width: $width;
  height: $width;
  background: no-repeat center center / $iconWidth;
  cursor: pointer;
  border: none;

  // &:hover{
  //   background-size: 16px;
  // }
}

.editBar-group {
  display: flex;
  flex-direction: column;
  margin: 2px 0;
  border: 1px solid #dedede;
  border-radius: 3px;
}

.editBar-tool {
  @include icon(35px, 16px);
  position: relative;

  &[showChildren] {
    & > .editBar-tool-children {
      opacity: 1;
    }
  }

  &[title='表格'] {
    & > .editBar-tool-children {
      top: -60px;

      &::before {
        top: 70px;
      }
    }
  }
}

.editBar-tool-children {
  position: absolute;
  display: flex;
  flex-direction: column;
  right: -125%;
  top: 0;
  border: 1px solid #dedede;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;

  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background-color: #fafafa;
    border-left: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    transform: rotate(45deg);
    left: -5px;
    position: absolute;
    top: 10px;
  }

  & > button {
    @include icon(30px, 16px);
  }
}

#editImgInput {
  width: 0;
  height: 0;
  opacity: 0;
  position: fixed;
  z-index: -3;
}
</style>
