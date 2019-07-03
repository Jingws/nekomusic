import Vue from 'vue'
import store from '../store'

export const Player = {
  open() {
    store.dispatch('openPlayer')
  },

  start(id) {
    store.dispatch('startPlayer', id)
  },

  close() {
    store.dispatch('closePlayer')
  }
}

export const PlayerPlugin = {
  install() {
    Vue.prototype.$player = Player
  }
}