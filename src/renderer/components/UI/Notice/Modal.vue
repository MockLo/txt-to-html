<template>
  <transition name="fade">
    <div class="modal-wrapper" v-show="!!crtType">
      <div class="modal">
        <div class="title">
          <span>{{ cfg.title }}</span>
          <i class="btn-close" @click="clickHandler('close')"></i>
        </div>
        <div class="msg">{{ cfg.msg }}</div>
        <input
          class="promptInput"
          type="text"
          v-if="crtType === 'prompt'"
          v-model="promptData"
          :err="errPromptInput"
          @keyup.enter="clickHandler('success')"
          autocomplete="off"
        />
        <p v-if="crtType === 'prompt'" class="errMsg">{{ cfg.errMsg }}</p>
        <Btn class="btn" type="primary" @click="clickHandler('success')">{{ cfg.successText }}</Btn>
        <Btn class="btn" v-show="crtType !== 'alert'" @click="clickHandler('failure')">{{ cfg.failureText }}</Btn>
      </div>

      <!-- <div class="modal" v-show="crtType === 'confirm'">
        <div class="title">
          <span>{{ cfg.title }}</span>
          <i class="btn-close" @click="clickHandler('close')"></i>
        </div>
        <div class="msg">{{ cfg.msg }}</div>
        <Btn class="btn" type="primary" @click="clickHandler('btnRight')">{{ cfg.successText }}</Btn>
        <Btn class="btn" @click="clickHandler('btnLeft')">{{ cfg.failureText }}</Btn>
      </div> -->

      <!-- <div class="modal" v-show="crtType === 'prompt'">
        <div class="title">
          <span>{{ cfg.title }}</span>
          <i class="btn-close" @click="clickHandler('close')"></i>
        </div>
        <div class="msg">{{ cfg.msg }}</div>
        <input
          class="promptInput"
          type="text"
          v-model="promptData"
          :err="errPromptInput"
          @keyup.enter="promptRight"
          autocomplete="off"
        />
        <p class="errMsg">{{ cfg.errMsg }}</p>
        <Btn class="btn" type="primary" @click="promptRight">{{ cfg.successText }}</Btn>
        <Btn class="btn" @click="clickHandler('btnLeft')">{{ cfg.failureText }}</Btn>
      </div> -->
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
const trim = str => str.replace(/^\s*|\s*$/g, '')

export default {
  name: 'Modal',

  data() {
    return {
      promptData: '',
      errPromptInput: false
    }
  },

  computed: mapState({
    cfg: state => state.Modal.cfg,
    crtType: state => state.Modal.cfg.type,
    previewText: state => state.Modal.cfg.previewText
  }),

  watch: {
    promptData(v) {
      v = trim(v)
      let pattern = this.cfg.pattern
      if (pattern) {
        this.errPromptInput = !pattern.test(v)
      }
    },

    crtType(v) {
      if (!v) {
        this.promptData = ''
        this.errPromptInput = false
      }
    },

    previewText(v) {
      if (v) {
        this.promptData = v
      }
    }
  },

  methods: {
    clickHandler(type) {
      switch (type) {
        case 'success':
          if (this.crtType === 'prompt') {
            if (this.errPromptInput || !this.promptData) return
            this.cfg.cb.success(trim(this.promptData))
          } else {
            this.cfg.cb.success()
          }
          break
        case 'failure':
          this.cfg.cb.failure()
          break
        default:
          this.cfg.cb.close()
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
  left: 0;
  top: 0;
}

.modal {
  width: 350px;
  background-color: #fff;
  border: 1px solid $color-line;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
}

.title {
  position: relative;
  font-size: 16px;
  height: 25px;
  line-height: 25px;

  & > span {
    display: inline-block;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.msg {
  font-size: 14px;
  color: #5f656b;
  overflow: hidden;
  margin: 20px 0;
  max-height: 145px;
}

.btn-close {
  position: absolute;
  display: inline-block;
  width: 20px;
  height: 20px;
  right: 2px;
  top: 2px;
  background: url('../../../assets/icon_close.png') no-repeat center center / 13px;
  cursor: pointer;
}

.btn {
  float: right;
  margin-left: 20px;
}

.promptInput {
  display: block;
  margin-top: -10px;
  width: 100%;

  & + .errMsg {
    visibility: hidden;
    color: $color-error;
    margin-bottom: 10px;
    padding-left: 10px;
    font-size: 12px;
  }

  &[err] {
    border-color: $color-error;

    & + .errMsg {
      visibility: visible;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
