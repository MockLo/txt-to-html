<template>
  <div class="HOMEPAGE">
    <TopBar />
    <div class="HOME-bottom">
      <div class="HOME-tools">
        <EditBar />
      </div>
      <div class="HOME-simulator">
        <Simulator />
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from './TopBar/TopBar'
import Simulator from './Simulator/Simulator'
import EditBar from './EditBar/EditBar'

export default {
  components: { TopBar, EditBar, Simulator }
}
</script>

<style lang="scss">
.HOMEPAGE {
  width: 100vw;
  height: 100vh;
  padding: 10px;
  background-color: #fafafa;
  overflow: hidden;
}

.HOME-bottom {
  width: 100%;
  height: 93%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.HOME-tools {
  display: flex;
  align-items: center;
}

.HOME-simulator {
  margin-left: 50px;

  & > .simulator {
    transform-origin: top center;
    transform: scale(0.9);
  }
}
</style>
