<template>
  <div class="drag-area">
    <div id="upload-area" :class="{ 'drag-enter': dragEnter }" @click="openFinder">
      <div v-if="dragEnter" class="upload-tips"><i class="icon-drag"></i> 松开鼠标以导入文件</div>
      <div v-else class="upload-text"><i class="icon-add"></i> 上传文件，支持拖拽上传</div>
    </div>
    <div class="result-area" v-if="filePath">
      已读取到文件：<span class="result-name">{{ filePath }}</span>
    </div>

    <transition name="progress">
      <div v-show="loadProgress" class="upload-progress">
        <span>读取进度</span>
        <progress :value="loadProgress" max="100"></progress>
        <div :class="{ 'icon-progress': loadProgress == 100.0 }">{{ loadProgress }}%</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const { ipcRenderer } = require('electron')
const remote = require('electron').remote

let DROP_ZONE = null

export default {
  data() {
    return {
      dragEnter: false,

      loadProgress: 0
    }
  },

  computed: mapState({
    filePath: state => state.UploadFile.path
  }),

  watch: {
    loadProgress(v) {
      if (v == 100.0) {
        setTimeout(() => {
          this.loadProgress = 0
        }, 1000)
      }
    }
  },

  mounted() {
    this.disableDragEvent()

    ipcRenderer.on('async-readFile-progress', (event, percent) => {
      this.loadProgress = percent
    })
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
          this.dragEventHandler(e.dataTransfer)
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
      if (typeof file === 'object') {
        let { name, path, type } = file
        if (type !== 'text/plain' || !name.includes('.txt')) {
          this.$alert('只支持上传.txt类型文件')
          return
        }
        file = path
      }
      console.log('file:', file)
      if (this.filePath) {
        if (this.filePath === file) {
          this.$alert('请勿拖拽上传重复的文件！')
          return
        }
        this.$confirm(`已经加载了一个文件: ${this.filePath}，确定要覆盖它吗？`, {
          success: () => this.upload(file)
        })
      } else {
        this.upload(file)
      }
    },

    upload(filePath) {
      this.$store.dispatch('UPLOAD_FILE', filePath)
    },

    openFinder() {
      remote.dialog.showOpenDialog(
        remote.getCurrentWindow(),
        {
          title: '请选择文件',
          filters: [{ name: '文本文件', extensions: ['txt'] }],
          properties: ['openFile', 'createDirectory'],
          message: '请选择文件'
        },
        filePaths => {
          if (filePaths && filePaths.length === 1) {
            this.fileHandler(filePaths[0])
          }
        }
      )
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
  width: 22px;
  height: 22px;
  background: url($url) no-repeat center center / contain;
}

.drag-area {
  position: relative;
  border-radius: 5px;
  border: 2px solid $color-line;
}

#upload-area {
  width: 100%;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}

.upload-text {
  height: 35px;
  @include flex-center;
}

.upload-tips {
  height: 35px;
  border: 2px dashed #409eff;
  @include flex-center;
}

.upload-progress {
  width: 100%;
  height: 35px;
  @include flex-center;
  position: absolute;
  justify-content: space-around;
  top: 0;
  left: 0;
  z-index: 3;
  background-color: #fff;
  font-size: 12px;
}

progress {
  width: 80%;
}

.icon-add {
  margin-right: 15px;
  @include icon('../../assets/icon_add.png');
}

.icon-drag {
  margin-right: 15px;
  @include icon('../../assets/icon_dragEnter.png');
}

.icon-progress {
  transition: 0.15s;
  color: transparent;
  @include icon('../../assets/icon_success.png');
}

.result-area {
  @include flex-center;
  font-size: 10px;
}

.progress-leave-active {
  transition: opacity 0.3s;
}
.progress-leave-to {
  opacity: 0;
}
</style>
