<template>
  <section>
    <link v-if="theme" rel="stylesheet" :href="themeCssPath" />
    <section id="preview" v-html="originTxt" contenteditable="true"></section>
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
  },

  methods: {
    enterHandler() {
      // let range = window.getSelection().getRangeAt(0)
      // let crtNode = range.commonAncestorContainer
      // if(range.collapsed, range)
    }
  }
}
</script>

<style lang="scss">
h1,
h2,
h3,
h4,
h5 {
  text-align: center;
}

#preview {
  min-height: 580px;
  & p {
    min-height: 24px;
  }

  & ol,
  & ul {
    padding-left: 2em;
  }
}

.md-todo {
  & > input {
    cursor: pointer;
    margin: 5px 10px 0;
  }

  & > .todo-item {
    display: inline-block;
    width: 90%;
  }
}
</style>
