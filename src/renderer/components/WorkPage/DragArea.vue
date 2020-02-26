<template>
  <div class="drag-area">
    <div id="upload-area" :class="{ 'drag-enter': dragEnter }">
      <div v-if="dragEnter" class="upload-tips"><i class="icon-drag"></i> 松开鼠标以导入文件</div>
      <div v-else>
        <div class="upload-text"><i class="icon-add"></i> 文件上传区域</div>
        <div class="upload-type">支持格式：<i class="icon-txt"></i> ，支持拖拽上传</div>
      </div>
    </div>
    <div class="result-area" v-if="file.name">
      已读取到文件：<span class="result-name">{{ file.name }}</span>
      <span class="result-size">({{ file.size | getSize }})</span>
    </div>
  </div>
</template>

<script>
let DROP_ZONE = null
let UP_FILES = null

export default {
  data() {
    return {
      dragEnter: false,

      file: {
        name: '',
        path: '',
        size: 0,
        type: ''
      }
    }
  },

  mounted() {
    this.disableDragEvent()
  },

  filters: {
    getSize: size =>
      size < 1000
        ? `${size}B`
        : size < 1000000
        ? `${parseFloat(size / 1000).toFixed(2)}KB`
        : `${parseFloat(size / 1000000).toFixed(2)}MB`
  },

  methods: {
    disableDragEvent() {
      DROP_ZONE = document.getElementById('upload-area') // 这个是可拖拽的上传区

      document.addEventListener('dragover', e => {
        e.preventDefault()
        if (DROP_ZONE && DROP_ZONE.contains(e.target)) {
          if (!this.dragEnter) this.dragEnter = true
        } else {
          if (this.dragEnter) this.dragEnter = false
        }
      })
      document.addEventListener('drop', e => {
        e.preventDefault()
        e.stopPropagation()
        if (DROP_ZONE && DROP_ZONE.contains(e.target)) {
          // 处理拖拽文件的逻辑
          console.log('file drop')
          this.dragEnter = false
          UP_FILES = this.dragEventHandler(e.dataTransfer)
          console.log(UP_FILES)
        }
      })
      document.addEventListener('mousemove', e => {
        if (e.clientY > window.innerWidth || e.clientY < 0 || e.clientX < 0 || e.clientX > window.innerHeight) {
          //在这加入你想执行的代码，此条件下鼠标已经在浏览器外
          this.dragEnter = false
        }
      })
    },

    dragEventHandler(df) {
      if (!df.items) return
      if (df.items.length > 1) {
        this.$alert('每次只支持上传一个文件')
      } else {
        let item = df.items[0]
        // 用webkitGetAsEntry禁止上传目录
        if (item.kind === 'file' && item.webkitGetAsEntry().isFile) {
          this.fileHandler(item.getAsFile())
        } else {
          this.$alert('不支持上传目录')
        }
      }
    },

    fileHandler(file) {
      let { name, path, size, type } = file
      if (type !== 'text/plain' || !name.includes('.txt')) {
        this.$alert('只支持上传.txt类型文件')
        return
      }
      console.log('file:', file)
      this.file = { name, path, size, type }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin icon($url) {
  width: 30px;
  height: 30px;
  background: url($url) no-repeat center center / contain;
}

.drag-area {
  border-radius: 5px;
  border: 2px solid $color-line;
}

#upload-area {
  width: 100%;
  height: 80px;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 5px;
}

.upload-text {
  height: 50px;
  font-size: 18px;
  @include flex-center;
}

.upload-type {
  height: 30px;
  font-size: 14px;
  @include flex-center;
}

.upload-tips {
  height: 80px;
  border: 2px dashed #409eff;
  @include flex-center;
}

.icon-add {
  margin-right: 15px;
  @include icon('../../assets/icon_add.png');
}

.icon-txt {
  margin-top: -6px;
  @include icon('../../assets/icon_txt.png');
}

.icon-drag {
  margin-right: 15px;
  @include icon('../../assets/icon_dragEnter.png');
}

.result-area {
  @include flex-center;
  font-size: 12px;

  & > .result-size {
    font-size: 11px;
    margin-left: 5px;
  }
}
</style>
