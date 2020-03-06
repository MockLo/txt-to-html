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

  & > ol,
  & > ul {
    padding-left: 2em;
  }

  & > hr {
    height: 2px;
    margin: 20px 0;
    border: none;
    background-color: $color-line;
  }

  table,
  td,
  th {
    border: 1px solid $color-line;
  }
}

.md-todo {
  padding-left: 0;
  list-style: none;

  & > li {
    & > input {
      cursor: pointer;
      margin: 5px 10px 0;
    }

    & > .todo-item {
      display: inline-block;
      width: 90%;
    }
  }
}

.md-img {
  display: inherit;
  margin: 15px auto;
  max-width: 90%;
  max-height: 300px;
}

.md-table {
  width: 93%;
  margin: 10px auto;
  border-collapse: collapse;

  & td {
    padding: 10px;
  }
}
</style>
