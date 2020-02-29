<template>
  <div class="TOPBAR">
    <Btn type="primary">保存</Btn>
    <DragBar />
    <Btn type="success">导出</Btn>
  </div>
</template>

<script>
import Btn from '../UI/Btn/Btn'
import DragBar from './DragBar'

// import icon_save from '../../assets/icon_save.png'
// import icon_download from '../../assets/icon_download.png'

export default {
  components: { DragBar, Btn }

  // data() {
  //   return {
  //     icon_save,
  //     icon_download
  //   }
  // }
}
</script>

<style lang="scss">
.TOPBAR {
  display: flex;
  align-items: center;
  justify-content: space-around;

  & > button {
    height: 35px;
  }

  & > .drag-area {
    width: 570px;
  }
}
</style>
