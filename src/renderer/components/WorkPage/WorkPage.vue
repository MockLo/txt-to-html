<template>
  <div class="workpage">
    <section>
      <Simulator />
    </section>
    <section>
      <WorkArea />
    </section>
  </div>
</template>

<script>
import Simulator from '../Simulator/Simulator'
import WorkArea from './WorkArea'

let UP_FILE = ''

export default {
  components: { Simulator, WorkArea }
}
</script>

<style lang="scss">
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
      padding: 10px;
    }
  }
}
</style>
