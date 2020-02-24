<template>
  <div class="workpage">
    <section>
      <Simulator />
    </section>
    <section></section>
  </div>
</template>

<script>
import Simulator from '../Simulator/Simulator'

export default {
  components: { Simulator },

  data() {
    return {
      modalCfg: {
        title: '',
        msg: '',
        rightBtnText: '',
        leftBtnText: ''
      }
    }
  },

  created() {
    // this.$alert('内容', function() {
    //   console.log(11)
    // })
  }
}
</script>

<style lang="scss" scoped>
.workpage {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;

  & > section {
    &:first-child {
      width: 50%;
      background-color: rgb(250, 250, 250);
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:last-child {
      width: 50%;
    }
  }
}
</style>
