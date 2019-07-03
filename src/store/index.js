import Vue from 'vue'
import Vuex from 'vuex'

import * as api from '../services/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 主题
    Theme: '',

    // 刷新组件序号
    RefreshItem: null,

    // 播放器相关
    player: {
      state: false,
      url: '',
      id: null
    },

    // 首页 popup 窗口
    Popups: {
      commend: false,
      mySongList: false,
      poll: false,
      radio: false
    },

    banner: {
      last_updated: 0,
      content: {
        link: null,
        image: null
      }
    },

    // 推荐歌单
    remdMusicList: {
      last_updated: 0,
      list: []
    },

    // 歌单详情
    playList: {
      show: false,
      data: {}
    },

    // 歌单列表
    songList: []
  },

  getters: {
    getRefreshItem(state) {
      return state.RefreshItem
    },

    getPlayer(state) {
      return state.player.state
    }
  },

  mutations: {
    SET_THEME(state, data) {
      state.Theme = data
    },

    SET_REFRESHITEM(state, data) {
      state.RefreshItem = data
    },

    SET_PLAYER(state, data) {
      state.player = data
    },

    SET_POPUPS(state, data) {
      if(data === 'commend') {
        state.Popups.commend = !state.Popups.commend
      } else if(data === 'songList') {
        state.Popups.mySongList = !state.Popups.mySongList
      } else if(data === 'poll') {
        state.Popups.poll = !state.Popups.poll
      } else if(data === 'radio') {
        state.Popups.radio = !state.Popups.radio
      }
    },

    SET_PLAYLIST(state, data) {
      state.playList = data
    },

    SET_SONGLIST(state, data) {
      state.songList = data
    },

    OFF_POPUPS(state) {
      state.Popups.commend = false
      state.Popups.mySongList = false
      state.Popups.poll = false
      state.Popups.radio = false
      state.playList.show = false
    },

    SET_BANNER(state, data) {
      state.banner = data
    },

    SET_RCMDMUSICLIST(state, data) {
      state.remdMusicList = data
    }
  },

  actions: {
    loadTheme({commit}) {
      let type = localStorage.getItem('theme') !== null ? localStorage.getItem('theme') : 'def'

      commit('SET_THEME', type)
    },

    setTheme({commit}, type) {
      localStorage.setItem('theme', type)
      commit('SET_THEME', type)
    },

    loadEnterFace({dispatch}) {
      dispatch('loadBanner')
      dispatch('loadRcmdMusicList')
    },

    openPlayer({commit, state}) {
      const data = {
        state: true,
        url: state.player.url,
        id: state.player.id
      }
      commit('SET_PLAYER', data)
    },

    startPlayer({commit}, id) {
      const data = {
        state: true,
        url: 'http://music.163.com/song/media/outer/url?id=' + id + '.mp3',
        id: id
      }
      commit('SET_PLAYER', data)
    },

    closePlayer({commit, state}) {
      const data = {
        state: false,
        url: state.player.url,
        id: state.player.id
      }
      commit('SET_PLAYER', data)
    },

    loadBanner({commit, state}) {
      if (
        new Date().getTime() - state.banner.last_updated < 10 * 60 * 1000
      ) {
        return
      }

      api.bannerApi.get().then(res => {
        const r = res.data
        let list = {
          last_updated: 0,
          content: {
            link: null,
            image: null
          }
        }
        if (r.code === 0) {
          list.last_updated = new Date().getTime()
          list.content.link = r.data.link
          list.content.image = r.data.image
        }
        commit('SET_BANNER', list)
      })
    },

    loadRcmdMusicList({commit, state}) {
      if (
        new Date().getTime() - state.remdMusicList.last_updated < 10 * 60 * 1000
      ) {
        return
      }

      api.rcmdmusicListApi.get().then(res => {
        const r = res.data
        let data = {
          last_updated: 0,
          list: []
        }
        if (r.code === 0) {
          data.last_updated = new Date().getTime()
          data.list = r.data
        }
        commit('SET_RCMDMUSICLIST', data)
      })
    },

    loadPlayList({commit, state}, id) {
      api.playListInfoApi.get(
        {link: id}
      )
        .then(res => {
          const r = res.data
          let data = {
            show: true,
            data: {}
          }
          data.data = r.data
          commit('SET_PLAYLIST', data)
        })
    },

    cleanSongList({commit}) {
      let data = []
      commit('SET_SONGLIST', data)
    }
  }
})

try {
  // const user = JSON.parse(window.localStorage.getItem(USER_CACHE_KEY))
  // if (user) {
  //   store.commit('SET_USER', user)
  // }
} catch (e) {}

export default store