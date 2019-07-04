import Vue from 'vue'
import store from '../store'

export const Player = {
  open() {
    store.dispatch('openPlayer')
  },

  start(id, index) {
    store.dispatch('startPlayer', {id, index})
  },

  next() {
    const currentSong = store.state.songList.find(i => {
      return i.id === store.state.player.id
    })
    const item = store.state.songList.indexOf(currentSong)

    const nextItem = Number(item + 1)
    const nextId = Number(store.state.songList[nextItem].id)
    this.start(nextId, nextItem)
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