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
  </section>
</template>

<script>
import { cmd, saveSelection, recoverSelection, mdMark, mdTODO } from '../../lib/EditTool/editTool'

export default {
  data() {
    return {
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
        {
          name: 'Todo',
          icon: require('../../assets/icon_todo.png'),
          tap: ['todo']
        },
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
        { name: '表格', icon: require('../../assets/icon_addTable.png'), tap: ['insertHTML', 'table'] }
        // { name: '添加列', icon: require('../../assets/icon_table_addColumn.png'), tap: ['table', ''] },
        // { name: '添加行', icon: require('../../assets/icon_table_addRow.png'), tap: ['table'] },
        // { name: '删除列', icon: require('../../assets/icon_table_delColumn.png'), tap: ['table'] },
        // { name: '删除行', icon: require('../../assets/icon_table_delRow.png'), tap: ['table'] }
      ],

      otherTools: [
        { name: '超链接', icon: require('../../assets/icon_addLink.png'), tap: ['createLink'] },
        // { name: '图片', icon: require('../../assets/icon_addPic.png'),tap:[''] },
        { name: '引用', icon: require('../../assets/icon_quote.png'), tap: ['formatBlock', '<section>'] },
        { name: '分割线', icon: require('../../assets/icon_splitline.png'), tap: ['insertHorizontalRule'] }
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
      return [this.headlineTools, this.fontTools, this.listTools, this.otherTools, this.tableTools]
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
      if (md_flag === 'createLink') {
        console.log('创建超链接')
        return
      }

      if (md_flag === 'mark') {
        mdMark()
        return
      }

      if (md_flag === 'todo') {
        mdTODO()
        return
      }

      try {
        cmd(md_flag, md_param)
        // this[`md_${md_flag}`](md_param)
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * 增加列表
     * @param {string} type 列表类型
     */
    md_list(type) {
      console.log(type)
    },

    /** 增加超链接 */
    md_hyperlink() {
      console.log('hyperlink')
    },

    /** 增加注释 */
    md_quote() {},

    /** 增加表格 */
    md_table() {}
  },

  mounted() {
    window.todoEnterHandler = function() {
      if (event.code.toLowerCase() !== 'enter') return
      event.stopPropagation()
      event.preventDefault()
      let range = window.getSelection().getRangeAt(0)
      let target = event.target
      range.selectNode(target.parentNode)
      range.collapse()
      if (!target.innerText) {
        mdMark()
      } else {
        cmd('insertHTML', `<p></p>`)
      }
    }
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
</style>
