<template>
  <div class="displayArea">
    <section class="statusBar"></section>
    <header class="header">
      <i></i>
      <span>这里是标</span>
      <i></i>
    </header>
    <PageArea class="page" />
  </div>
</template>

<script>
import PageArea from './PageArea'

export default {
  components: { PageArea }
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
    line-height: 60px;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 65%;
    text-align: center;
  }
}

.page {
  width: 100%;
  height: calc(100% - 80px);
  overflow: auto;
}
</style>
