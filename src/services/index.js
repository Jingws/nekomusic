import * as url from './urlConfig'
import { HttpService } from './HttpService'

// banner
export const bannerApi = {
  get() {
    return HttpService.get(url.banner)
  }
}

// 推荐歌单
export const recommendApi = {
  get() {
    return HttpService.get(url.recommend)
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

// 评论 歌曲
export const commentMusicApi = {
  get(opt = {}) {
    return HttpService.post(url.commentMusic, opt)
  }
}