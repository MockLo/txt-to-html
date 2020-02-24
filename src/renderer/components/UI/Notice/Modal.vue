<template>
  <transition name="fade">
    <div class="modal-wrapper" v-show="!!crtType">
      <div class="alert" v-show="crtType === 'alert'">
        <div class="title">
          <span>{{ cfg_alert.title }}</span>
          <i class="btn-close" @click="clickHandler('close')"></i>
        </div>
        <div class="msg">{{ cfg_alert.msg }}</div>
        <Btn class="btn" type="primary" @click="clickHandler('btn')">{{ cfg_alert.btnText }}</Btn>
      </div>

      <div class="confirm" v-show="crtType === 'confirm'">
        <div class="title">
          <span>{{ cfg_confirm.title }}</span>
          <i class="btn-close" @click="clickHandler('close')"></i>
        </div>
        <div class="msg">{{ cfg_confirm.msg }}</div>
        <Btn class="btn" type="primary" @click="clickHandler('btnRight')">{{ cfg_confirm.btnRightText }}</Btn>
        <Btn class="btn" @click="clickHandler('btnLeft')">{{ cfg_confirm.btnLeftText }}</Btn>
      </div>

      <div class="prompt" v-show="crtType === 'prompt'">
        <div class="title">
          <span>{{ cfg_prompt.title }}</span>
          <i class="btn-close" @click="clickHandler('close')"></i>
        </div>
        <div class="msg">{{ cfg_prompt.msg }}</div>
        <input class="promptInput" type="text" v-model="promptData" :err="errPromptInput" autocomplete="off" />
        <p class="errMsg">{{ cfg_prompt.errMsg }}</p>
        <Btn class="btn" type="primary" @click="promptRight">{{ cfg_prompt.btnRightText }}</Btn>
        <Btn class="btn" @click="clickHandler('btnLeft')">{{ cfg_prompt.btnLeftText }}</Btn>
      </div>
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

  computed: {
    ...mapState({
      crtType: state => state.Modal.crtType,
      cfg_alert: state => state.Modal.cfg_alert,
      cfg_confirm: state => state.Modal.cfg_confirm,
      cfg_prompt: state => state.Modal.cfg_prompt
    })
  },

  watch: {
    promptData(v) {
      v = trim(v)
      if (!this.cfg_prompt.pattern.test(v)) {
        this.errPromptInput = true
      } else {
        this.errPromptInput = false
      }
    }
  },

  methods: {
    clickHandler(flag) {
      this[`cfg_${this.crtType}`].cb[flag]()
    },

    promptRight() {
      if (this.errPromptInput) return
      this[`cfg_prompt`].cb.btnRight(trim(this.promptData))
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin modal {
  width: 300px;
  background-color: #fff;
  border: 1px solid $color-line;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 10px;
}

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

.alert,
.confirm,
.prompt {
  @include modal;
}

.title {
  position: relative;
  font-size: 14px;
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
  font-size: 12px;
  color: #5f656b;
  overflow: hidden;
  margin: 10px 0;
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
  margin-top: 10px;
  width: 100%;

  & + .errMsg {
    visibility: hidden;
    color: $color-error;
    margin-bottom: 10px;
    padding-top: 5px;
    font-size: 10px;
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
  transition: opacity .3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
