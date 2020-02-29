<template>
  <section id="editBar">
    <ul class="editBar-group" v-for="(tools, i) in editTools" :key="i">
      <li
        class="editBar-tool"
        v-for="(tool, j) in tools"
        :key="j"
        :title="tool.name"
        :style="{ backgroundImage: `url(${tool.icon})` }"
      >
        <div class="editBar-tool-children" v-for="(child, j) in tool.children" :key="j">
          <span :title="child.name" :style="{ backgroundImage: `url(${child.icon})` }"></span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      headlineTools: [
        {
          name: '标题',
          icon: require('../../assets/icon_headline.png'),
          children: [
            { name: '一级标题', icon: require('../../assets/icon_headline_1.png') },
            { name: '二级标题', icon: require('../../assets/icon_headline_2.png') },
            { name: '三级标题', icon: require('../../assets/icon_headline_3.png') },
            { name: '四级标题', icon: require('../../assets/icon_headline_4.png') },
            { name: '五级标题', icon: require('../../assets/icon_headline_5.png') }
          ]
        }
      ],

      fontTools: [
        { name: '粗体', icon: require('../../assets/icon_bold.png') },
        { name: '斜体', icon: require('../../assets/icon_italic.png') },
        { name: '高亮', icon: require('../../assets/icon_highLight.png') },
        { name: '下划线', icon: require('../../assets/icon_underline.png') },
        { name: '删除线', icon: require('../../assets/icon_delLine.png') },
        { name: '上标', icon: require('../../assets/icon_font_up.png') },
        { name: '下标', icon: require('../../assets/icon_font_down.png') }
      ],

      listTools: [
        { name: '有序列表', icon: require('../../assets/icon_list_order.png') },
        { name: '无序列表', icon: require('../../assets/icon_list_unOrder.png') },
        { name: 'Todo', icon: require('../../assets/icon_todo.png') }
      ],

      tableTools: [
        { name: '表格', icon: require('../../assets/icon_addTable.png') },
        { name: '添加列', icon: require('../../assets/icon_table_addColumn.png') },
        { name: '添加行', icon: require('../../assets/icon_table_addRow.png') },
        { name: '删除列', icon: require('../../assets/icon_table_delColumn.png') },
        { name: '删除行', icon: require('../../assets/icon_table_delRow.png') }
      ],

      otherTools: [
        {
          name: '对齐',
          icon: require('../../assets/icon_align_center.png'),
          children: [
            { name: '左对齐', icon: require('../../assets/icon_align_left.png') },
            { name: '右对齐', icon: require('../../assets/icon_align_right.png') },
            { name: '居中对齐', icon: require('../../assets/icon_align_center.png') },
            { name: '左右对齐', icon: require('../../assets/icon_align_justified.png') }
          ]
        },
        { name: '超链接', icon: require('../../assets/icon_addLink.png') },
        { name: '图片', icon: require('../../assets/icon_addPic.png') },
        { name: '引用', icon: require('../../assets/icon_quote.png') }
      ]
    }
  },

  computed: {
    editTools() {
      return [this.headlineTools, this.fontTools, this.listTools, this.tableTools, this.otherTools]
    }
  }
}
</script>

<style lang="scss">
.editBar-group {
  list-style: none;
  margin: 2px 0;
  border: 1px solid #dedede;
  border-radius: 3px;
}

.editBar-tool {
  width: 35px;
  height: 35px;
  background: no-repeat center center / 16px;
  cursor: pointer;
}
</style>
