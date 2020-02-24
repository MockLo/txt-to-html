<template>
  <div id="app">
    <router-view></router-view>
    <Modal />
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
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
}

input {
  line-height: 30px;
  border: 1px solid $color-line;
  border-radius: 3px;
  outline: none;
  font-size: 13px;
  padding: 0 10px;
  letter-spacing: 0.5px;

  &:focus {
    outline: none;
    border-color: #409eff;
  }

  &::-webkit-input-placeholder {
    color: $color-grey-thin;
  }
}
</style>
