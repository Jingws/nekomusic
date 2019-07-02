import { Dialog, Toast } from 'vant'
import Vue from 'vue'

const Popup = {
  alert(message, opts = {}) {
    opts = Object.assign({ message, title: '温馨提示', confirmButtonText: '确定' }, opts)
    return Dialog.alert(opts)
  },

  confirm(message, opts = {}) {
    opts = Object.assign({ message, title: '', confirmButtonText: '确定' }, opts)
    return Dialog.confirm(opts)
  },

  close() {
    return Dialog.close()
  },

  toast: Toast
}

export const PopupPlugin = {
  install() {
    Vue.prototype.$popup = Popup
  }
}

export const PopupService = Popup
