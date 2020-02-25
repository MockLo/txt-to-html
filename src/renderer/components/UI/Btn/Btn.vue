<template>
  <button :class="btnClass" :round="round" @click="$emit('click')">
    <i v-if="icon"></i>
    <span><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'Btn',

  props: {
    type: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    round: {
      required: false
    }
  },

  computed: {
    btnClass() {
      return this.type ? `ah-btn-${this.type}` : 'ah-btn'
    }
  }
}
</script>

<style lang="scss">
@mixin btn {
  display: inline-block;
  padding: 7.5px 20px;
  font-family: fzlth;
  outline: none;
  -webkit-appearance: none;
  white-space: nowrap;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  color: #606266;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  transition: 0.1s;
  font-size: 14px;

  &[round] {
    border-radius: 15px;
  }
}

.ah-btn {
  @include btn;
}

.ah-btn-primary {
  @include btn;
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;

  &:hover {
    background: #66b1ff;
    border-color: #66b1ff;
  }

  &:active {
    background: #3a8ee6;
    border-color: #3a8ee6;
  }
}

.ah-btn-success {
  @include btn;
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;

  &:hover {
    background: #85ce61;
    border-color: #85ce61;
  }

  &:active {
    background: #5daf34;
    border-color: #5daf34;
  }
}

.ah-btn-info {
  @include btn;
  color: #fff;
  background-color: #909399;
  border-color: #909399;

  &:hover {
    background: #a6a9ad;
    border-color: #a6a9ad;
  }

  &:active {
    background: #82848a;
    border-color: #82848a;
  }
}

.ah-btn-warn {
  @include btn;
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;

  &:hover {
    background: #ebb563;
    border-color: #ebb563;
  }

  &:active {
    background: #cf9236;
    border-color: #cf9236;
  }
}

.ah-btn-error {
  @include btn;
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;

  &:hover {
    background: #f78989;
    border-color: #f78989;
  }

  &:active {
    background: #dd6161;
    border-color: #dd6161;
  }
}
</style>
