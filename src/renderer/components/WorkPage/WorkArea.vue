<template>
  <div>
    <DragArea />

    <div class="work-title">
      <label
        >页面顶部标题：
        <input type="text" ref="input-title" :value="title" @keyup.enter="modifyTitle" autocomplete="off" />
      </label>
      <Btn type="primary" @click="modifyTitle">确定</Btn>
    </div>

    <EditTool />
  </div>
</template>

<script>
import DragArea from './DragArea'
import Btn from '../UI/Btn/Btn'
import EditTool from './EditTool'

const trim = str => str.replace(/^\s*|\s*$/g, '')

export default {
  components: { DragArea, Btn, EditTool },

  computed: {
    title() {
      return this.$store.state.TitleBar.title
    }
  },

  methods: {
    modifyTitle() {
      let input = this.$refs['input-title']
      let title = trim(input.value)
      if (title) {
        this.$store.dispatch('UPDATE_TITLE', title)
        input.blur()
      }
    }
  }
}
</script>

<style lang="scss">
.work-title {
  padding: 20px 0;
  display: flex;
  align-items: center;

  label {
    cursor: pointer;
  }

  input {
    width: 300px;
    margin-right: 20px;
  }
}
</style>
