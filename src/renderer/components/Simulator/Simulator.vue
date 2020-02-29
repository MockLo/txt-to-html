<template>
  <section class="simulator">
    <Mockup class="phone" />
    <DisplayArea class="phone" />
  </section>
</template>

<script>
import Mockup from './Mockup'
import DisplayArea from './DisplayArea'

export default {
  components: { Mockup, DisplayArea }
}
</script>

<style lang="scss" module>
.simulator {
  width: 445px;
  height: 877px;
  position: relative;
}

.phone {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>
