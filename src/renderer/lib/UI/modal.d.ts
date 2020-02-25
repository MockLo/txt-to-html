import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $alert: (
      msg: string,
      options?: {
        title?: string
        btnText?: string
      }
    ) => Promise<undefined>

    $confirm: (
      msg: string,
      options?: {
        title?: string
        btnRightText?: string
        btnLeftText?: string
      }
    ) => Promise<undefined>

    $prompt: (
      msg: string,
      options?: {
        title: string
        btnRightText?: string
        btnLeftText?: string
        pattern?: string
        errMsg?: string
        previewText?: string
      }
    ) => Promise<string>
  }
}
