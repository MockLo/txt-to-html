import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $alert: (
      msg: string,
      options?: {
        title?: string
        successText?: string
        success?: Function
        close?: Function
      }
    ) => void

    $confirm: (
      msg: string,
      options?: {
        title?: string
        successText?: string
        failureText?: string
        success?: Function
        failure?: Function
        close?: Function
      }
    ) => void

    $prompt: (
      msg: string,
      options?: {
        title: string
        successText?: string
        failureText?: string
        pattern?: RegExp
        errMsg?: string
        previewText?: string
        success?: (promptData?: string) => void
        failure?: Function
        close?: Function
      }
    ) => void
  }
}
