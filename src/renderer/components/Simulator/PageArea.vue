<template>
  <section id="preview">
    <link v-if="theme" rel="stylesheet" :href="themeCssPath" />
    <h1 class="">{{ mainTitle }}</h1>
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
      mainTitle: '这里是协议标题'
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
  }
}
</script>

<style lang="scss"></style>
