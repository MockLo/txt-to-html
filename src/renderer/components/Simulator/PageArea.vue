<template>
  <section>
    <link v-if="theme" rel="stylesheet" :href="themeCssPath" />
    <section id="preview" v-html="originTxt"></section>
  </section>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      required: false
    }
  },

  data() {
    return {
      originTxt: ''
    }
  },

  computed: {
    themeCssPath() {
      return `/static/theme/${this.theme}/${this.theme}.css`
    }
  },

  watch: {
    themeCssPath(v) {
      console.log(v)
    }
  },

  mounted() {
    const { ipcRenderer } = require('electron')
    ipcRenderer.on('async-readFile-finish', (event, data) => {
      this.originTxt = data
    })
  }
}
</script>

<style lang="scss"></style>
