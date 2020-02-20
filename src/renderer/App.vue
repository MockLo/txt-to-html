<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'auto_h5'
}
</script>

<style lang="scss">
@font-face {
  font-family: fzlth;
  src: url('./assets/fzlth.ttf');
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: fzlth, Arial, Helvetica, sans-serif;
  color: $color-black;
}
</style>
