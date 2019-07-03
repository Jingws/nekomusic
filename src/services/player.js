import Vue from 'vue'
import store from '../store'

export const Player = {
  open() {
    store.dispatch('openPlayer')
  },

  start(id, index) {
    store.dispatch('startPlayer', {id, index})
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