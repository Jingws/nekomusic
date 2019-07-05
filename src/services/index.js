import * as url from './urlConfig'
import { HttpService } from './HttpService'

// banner
export const bannerApi = {
  get() {
    return HttpService.get(url.banner)
  }
}

// 推荐歌单
export const rcmdmusicListApi = {
  get() {
    return HttpService.get(url.rcmdMusicList)
  }
}

// 歌单列表
export const playListInfoApi = {
  get(opt ={}) {
    return HttpService.post(url.playListInfo, opt)
  }
}

// 歌单详情
export const playListDetailApi = {
  get(opt = {}) {
    return HttpService.post(url.playListDetail, opt)
  }
}

// 歌词
export const songLyricApi = {
  get(opt = {}) {
    return HttpService.post(url.songLyric, opt)
  }
}