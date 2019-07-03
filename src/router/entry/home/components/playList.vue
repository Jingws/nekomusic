<template>
  <van-popup v-model="playList.show" position='right' class="popup-wrap" :overlay='false'>
    <popup-title :title="'歌单'" :ui="'white'" />
    <div class="play-list-content">
      <canvas ref="canvas" id="canvas"></canvas>
      <div>
        <div class="author-ctrl">
          <div>
            <div ref="coverWrap" :style="{height: coverHeight + 'px'}"><img :src="playList.data.cover" width="100%" height="100%" alt=""></div>
            <div :style="{height: coverHeight + 'px'}">
              <h3>{{playList.data.listTit}}</h3>
              <p class="author">
                <span><img :src="playList.data.author.img" alt=""></span>
                {{playList.data.author.name}}
                <v-icon name='angle-right' :scale="1"></v-icon>
              </p>
              <div>
                <p>{{playList.data.introduce}}</p>
                <v-icon name='angle-right' :scale="1"></v-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="handle-tab">
          <div>
            <span><v-icon name='regular/comment-dots' :scale='1.4'></v-icon></span>{{playList.data.comment}}
          </div>
          <div>
            <span><v-icon name='share' :scale='1.4'></v-icon></span>{{playList.data.share}}
          </div>
          <div>
            <span><v-icon name='arrow-circle-down' :scale='1.4'></v-icon></span>下载
          </div>
          <div>
            <span><v-icon name='regular/check-circle' :scale='1.4'></v-icon></span>多选
          </div>
        </div>
        <div ref="listWrap" class="music-list" :class="{'lock-content' : lock}">
          <div class="music-list-tit" :class="{'lock-tit' : lock}">
            <p>
              <v-icon name='regular/play-circle' :scale='1'></v-icon>
              全部播放
              <span>(共{{playList.data.playList.listCount}}首)</span>
            </p>
            <a href="javascript:;">收藏 ({{playList.data.collect}})</a>
          </div>
          <p v-if="songList.length === 0" class="loadSong">
            <img src="@/assets/img/loading.gif" alt=""><br> 加载中...
          </p>
          <ul>
            <li v-for="(item, index) of songList" :key="index" @click="() => $player.start(item.id)">
              <span>{{index + 1}}</span>
              <div>
                <div>
                  <p>{{item.name}}</p>
                  <p>{{item.album.artists[0].name}} - {{item.album.name}}</p>
                </div>
                <span><v-icon name='play' :scale='.8'></v-icon></span>
              </div>
              <span><v-icon name='ellipsis-v' :scale='.8'></v-icon></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { mapState } from 'vuex'
import popupTitle from './popupTitle.vue'
import { playListDetailApi } from '@/services/index'

const StackBlur = require('stackblur-canvas')
export default {
  data () {
    return {
      coverHeight: '',
      lock: false,
      songList: []
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
    this.loadBg()
    this.loadDetail()
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll, true)
  },

  methods: {
    handleScroll() {
      let top = this.$refs.listWrap.getBoundingClientRect().top
      if (top <= 45) {
        this.lock = true
      } else {
        this.lock = false
      }
    },

    loadBg() {
      this.coverHeight = this.$refs.coverWrap.getBoundingClientRect().width
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      canvas.width = document.documentElement.clientWidth
      canvas.height = document.documentElement.clientHeight

      // const img = this.$refs.cover
      let img = new Image()
      img.crossOrigin = ''
      img.src = this.playList.data.cover
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        StackBlur.canvasRGBA(canvas, 0, 0, canvas.width, canvas.height, 60)
      }
    },

    loadDetail() {
      playListDetailApi.get(
        { id: this.playList.data.playList.id }
      ).then(res => {
        const r = res.data
        this.songList = r.result.tracks
      })
    }
  },

  computed: {
    ...mapState(['playList'])
  },

  components: {
    popupTitle
  }
}
</script>

<style lang="scss">
  .play-list-content { position: relative; width: 100%; height: 100%;
    >div { position: absolute; top: 45px; width: 100%; height: 100%; overflow-y: scroll; 
      >.author-ctrl { width: 100%; padding:6% 4%; box-sizing: border-box;
        >div:first-child { display: flex; justify-content: space-between;
          >div:first-child { width: 35vw; overflow: hidden; border-radius: 5px;}
          >div:last-child { flex: 1; padding-left: 2%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;
            >h3 { color: $color-normal; font-size: 18px }
            >.author { width: 100%; text-align: left; color: rgba(255, 255, 255, .7); font-size: $font-mini;
              >span { width: 32px; height: 32px; border-radius: 50%; overflow: hidden; margin-right: 2px; display: inline-block;
                >img { width: 100%; height: 100% }
              }
              >svg { position: relative; top: 3px }
            }
            >div { color: rgba(255, 255, 255, .7); font-size: $font-tiny; display: flex; justify-content: space-between; align-items: center;
              >p { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; width: 90%; line-height: 1.75 }
            }
          }
        }
      }
      >.handle-tab { width: 100%; padding: 6% 4%; display: flex; justify-content: space-around; align-items: center;
        >div { width: 20%; display: flex; flex-direction: column; align-items: center; font-size: $font-tiny; color: $color-normal;
          >span { margin-bottom: 3px; }
        }
      }
      >.music-list { width: 100%; height: 100%; background: $color-normal; overflow-y: hidden; overflow-x: hidden; box-sizing: border-box; border-top-left-radius: 20px; border-top-right-radius: 20px; position: relative;
        &.lock-content { overflow-y: auto; padding-top: 45px; padding-bottom: 110px }
        >.music-list-tit { width: 100%; height: 40px; z-index: 100; box-sizing: border-box; border-bottom: 1px solid #ddd; background: $color-normal; display: flex; justify-content: space-between; align-items: center; padding: 0 4%; border-top-left-radius: 20px; border-top-right-radius: 20px;
          &.lock-tit { position: fixed; top: 45px; }
          >p { font-size: $font-large; color: $color-def; display: flex; align-items: center;
            >span { color: $color-gray; font-size: $font-mini; margin-left: 5px; }
            >svg { margin-right: 5px }
          }
          >a { display: inline-block; color: $color-normal; background: #EC4A3D; height: 30px; line-height: 30px; text-align: center; font-size: $font-mini; padding: 0 12px; border-radius: 15px; }
        }
        >.loadSong { color: $color-gray; font-size: $font-mini; width: 100%; text-align: center; margin-top: 10%;
          >img { width: 30px; }
        }
        >ul { width: 100%; box-sizing: border-box;
          >li { width: 100%; height: 50px; display: flex; justify-content: space-between; align-items: center; box-sizing: border-box;
            >span { width: 12%; height: 100%; line-height: 50px; color: $color-gray; font-size: $font-mini; text-align: center;
              >svg { position: relative; top: 2px }
            }
            >div { width: 80%; height: 50px; padding: 5px 0; box-sizing: border-box; overflow: hidden;
              >div { width: 92%; height: 100%; display: flex; flex-direction: column; justify-content: space-around; align-items: flex-start; float: left;
                >p { display: inline-block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 90%;
                  &:first-child { font-size: $font-normal }
                  &:last-child { font-size: $font-tiny; color: $color-gray }
                }
              }
              >span { color: $color-gray; display: inline-block; width: 8%; height: 100%; line-height: 40px; text-align: center; float: left; }
            }
            // &:last-child { padding-bottom: 300px; }
          }
        }
      }
    }
  }
</style>
