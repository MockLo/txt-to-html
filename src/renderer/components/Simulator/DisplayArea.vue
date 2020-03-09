<template>
  <div class="displayArea">
    <section class="statusBar"></section>
    <header class="header">
      <i></i>
      <span @click="modifyTitle" title="点击修改标题">{{ TITLE }}</span>
      <i></i>
    </header>
    <PageArea class="page" />
  </div>
</template>

<script>
import PageArea from './PageArea'

export default {
  components: { PageArea },

  computed: {
    TITLE() {
      return this.$store.state.TitleBar.title
    }
  },

  methods: {
    modifyTitle() {
      this.$prompt('请输入Title：', {
        previewText: this.TITLE,
        success: res => this.$store.dispatch('UPDATE_TITLE', res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.displayArea {
  z-index: 2;
  background-color: #fff;
  width: 375px;
  left: 50%;
  height: 667px;
  transform: translate3d(-50%, -50%, 0);
  top: 50%;
}

.statusBar {
  width: 100%;
  height: 20px;
  background: url('../../assets/satusBar.png') no-repeat top center / contain;
}

.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > i {
    width: 60px;
    height: 60px;

    &:first-child {
      background: url('../../assets/icon_back.png') no-repeat center center / 20px;
    }
  }

  & > span {
    overflow: hidden;
    height: 100%;
    line-height: 60px;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 65%;
    text-align: center;
    cursor: url('/static/assets/icon_edit.ico'), pointer;

    &:hover {
      border-radius: 3px;
      box-shadow: 0 0 16px 1px rgba(0, 0, 0, 0.1);
      border: 1px solid #409eff;
    }
  }
}

.page {
  width: 100%;
  height: calc(100% - 80px);
  overflow: auto;
}
</style>
