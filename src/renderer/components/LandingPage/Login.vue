<template>
  <div class="login">
    <div class="switchBars">
      <span @click="switchBar(0)" :crtBar="!isRegistering">登录</span>
      <span @click="switchBar(1)" :crtBar="isRegistering">注册</span>
    </div>
    <div v-if="!isRegistering" class="inputBox" @keyup.enter="login">
      <input type="text" v-model="loginCfg.account" ref="account1" placeholder="请输入账号" />
      <input type="password" v-model="loginCfg.pwd" ref="pwd1" placeholder="请输入密码" />
    </div>
    <div v-else class="inputBox" @keyup.enter="register">
      <input type="text" v-model="registerCfg.name" ref="name" placeholder="姓名" />
      <input type="email" v-model="registerCfg.email" ref="email" placeholder="邮箱" />
      <input type="text" v-model="registerCfg.account" ref="account2" placeholder="账号（登录用）" />
      <input type="password" v-model="registerCfg.pwd" ref="pwd2" placeholder="密码" />
      <input type="password" v-model="registerCfg.pwd_2" ref="pwd_2" placeholder="请再次输入密码" />
    </div>
    <div class="btn" @click="isRegistering ? register() : login()">{{ isRegistering ? '注册' : '登录' }}</div>
  </div>
</template>

<script>
function addStatus(ele) {
  ele.focus()
  ele.classList.add('wrong')
}

function removeStatus(ele) {
  ele.classList.remove('wrong')
}

export default {
  data() {
    return {
      info: {
        electron: process.versions.electron,
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version
      },

      isRegistering: false,

      /** 登录信息 */
      loginCfg: {
        account: '',
        pwd: ''
      },

      /** 注册信息 */
      registerCfg: {
        name: '',
        email: '',
        account: '',
        pwd: '',
        pwd_2: ''
      }
    }
  },

  created() {
    console.log({ ...this.info })
  },

  computed: {
    login_account_ready() {
      return !!this.trim(this.loginCfg.account)
    },
    login_pwd_ready() {
      return !!this.trim(this.loginCfg.pwd)
    },

    register_name_ready() {
      return !!this.trim(this.registerCfg.name)
    },
    register_email_ready() {
      return !!this.trim(this.registerCfg.email)
    },
    register_account_ready() {
      return !!this.trim(this.registerCfg.account)
    },
    register_pwd_ready() {
      return !!this.trim(this.registerCfg.pwd)
    },
    register_pwd2_ready() {
      return !!this.trim(this.registerCfg.pwd_2)
    },
    register_ready() {
      return (
        this.register_name_ready &&
        this.register_email_ready &&
        this.register_account_ready &&
        this.register_pwd_ready &&
        this.register_pwd2_ready
      )
    }
  },

  methods: {
    /**
     * 去除首位空格
     * @param {string} str
     */
    trim: str => str.replace(/^\s*|\s*$/g, ''),

    switchBar(flag) {
      this.isRegistering = !!flag
    },

    login() {
      if (!this.login_account_ready) {
        return addStatus(this.$refs.account1)
      } else {
        removeStatus(this.$refs.account1)
      }

      if (!this.login_pwd_ready) {
        return addStatus(this.$refs.pwd1)
      } else {
        removeStatus(this.$refs.pwd1)
      }

      console.log({ ...this.loginCfg })
    },

    register() {
      if (!this.register_name_ready) {
        return addStatus(this.$refs.name)
      } else {
        removeStatus(this.$refs.name)
      }

      if (!this.register_email_ready) {
        return addStatus(this.$refs.email)
      } else {
        removeStatus(this.$refs.email)
      }
      if (!this.register_account_ready) {
        return addStatus(this.$refs.account2)
      } else {
        removeStatus(this.$refs.account2)
      }
      if (!this.register_pwd_ready) {
        return addStatus(this.$refs.pwd2)
      } else {
        removeStatus(this.$refs.pwd2)
      }
      if (!this.register_pwd2_ready) {
        if (this.registerCfg.pwd_2 !== this.registerCfg.pwd) {
        }
        return addStatus(this.$refs.pwd_2)
      } else {
        removeStatus(this.$refs.pwd_2)
      }

      console.log({ ...this.registerCfg })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 40%;
}

.switchBars {
  position: relative;
  margin-bottom: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-around;

  &::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 20px;
    background-color: $color-line;
    left: 50%;
    top: 5px;
  }

  span {
    width: 50%;
    height: 30px;
    position: relative;
    text-align: center;
    line-height: 30px;
    color: $color-grey;
    font-size: 13px;

    &[crtBar] {
      font-size: 16px;
      color: $color-black;

      &::after {
        width: 35%;
        opacity: 1;
      }
    }

    &::after {
      content: '';
      position: absolute;
      display: block;
      width: 0;
      height: 1px;
      background-color: $color-normal;
      opacity: 0;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      transition: all 150ms ease-in-out;
    }
  }
}

.inputBox {
  display: flex;
  flex-direction: column;
}

input {
  margin: 5px 0;
  transition: border 150ms ease-in-out;

  &.wrong {
    border-color: $color-error;
    animation: shake 130ms linear 2;
  }
}

.btn {
  @include btn-primary;
  margin-top: 20px;
}

@keyframes shake {
  25% {
    transform: translateX(3px);
  }
  75% {
    transform: translateX(-3px);
  }
}
</style>
