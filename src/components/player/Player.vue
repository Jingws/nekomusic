<template>
  <van-popup v-model="player.state" position='right' class="play-wrap" :overlay='false'>
    <div class="shadow shadow-top"></div>
    <div class="shadow shadow-bottom"></div>
    <canvas ref="canvas" id="canvas"></canvas>
    <div class="player-content" :class="{'nobg' : player.id}">
      <div class="title">
        <span @click="() => $player.close()"><v-icon name='angle-left' :scale="1.3"></v-icon></span>
        <template v-if="currentSong">
          <div>
            <p>{{currentSong.name}}</p>
            <p>{{currentSong.artists[0].name}}</p>
          </div>
        </template>
        <template v-else>
          <div>
            <p>歌名</p>
            <p>歌手</p>
          </div>
        </template>
        <span><v-icon name='share-alt' :scale="1"></v-icon></span>
      </div>

      <div @click="() => showLyric = !showLyric" class="play-body">
        <record v-if="currentSong" :isPlay='isPlay' :picUrl='currentSong.album.blurPicUrl' :show='!showLyric' />
        <record v-else :isPlay='isPlay' :show='!showLyric' />
        <lyric :show='showLyric' :lyric='lyric' :currentTime='palyTime' />
      </div>

      <div class="player-control">
        <ul class="handle-ctrl">
          <li><v-icon name='regular/heart' :scale="1.3"></v-icon></li>
          <li><v-icon name='arrow-circle-down' :scale="1.3"></v-icon></li>
          <li><v-icon name='cat' :scale="1.3"></v-icon></li>
          <li @click="() => showComment = true"><v-icon name='regular/comment-dots' :scale="1.3"></v-icon></li>
          <li><v-icon name='ellipsis-v' :scale="1.3"></v-icon></li>
        </ul>

        <audio ref="audio" :src="player.url"></audio>

        <div class="progress-bar">
          <span class="time-ctrl layout-display">{{palyTime | formatTime}}</span>
          <div class="progress-ctrl">
            <span ref="dot" @touchstart='dotTouchStart($event)' @touchmove='dotTouchMove($event)' @touchend="dotTouchEnd($event)" class="dot layout-display" :style="{left : moveX}">
              <v-icon name='circle' :scale='.6'></v-icon>
            </span>
            <p ref="lineBase" class="line line-base"></p>
            <p class="line line-complete" :style="{width: lineCompleteWidth + 'px'}"></p>
          </div>
          <span class="time-ctrl layout-display">{{totalTime | formatTime}}</span>
        </div>
        
        <ul class="handle-ctrl">
          <template>
            <li v-if='listStatus === 0' @click="changeStatus"><v-icon name='exchange-alt' :scale="1.3"></v-icon></li>
            <li v-if='listStatus === 1' @click="changeStatus"><v-icon name='random' :scale="1.3"></v-icon></li>
            <li v-if='listStatus === 2' @click="changeStatus"><v-icon name='sync-alt' :scale="1.3"></v-icon></li>
          </template>
          <li @click="cut('prev')"><v-icon name='step-backward' :scale="1.3"></v-icon></li>
          <li v-if="!isPlay" @click="play"><v-icon name='regular/play-circle' :scale="2.8"></v-icon></li>
          <li v-else @click="pause"><v-icon name='regular/stop-circle' :scale="2.8"></v-icon></li>
          <li @click="cut('next')"><v-icon name='step-forward' :scale="1.3"></v-icon></li>
          <li><v-icon name='indent' :scale="1.3"></v-icon></li>
        </ul>
      </div>
    </div>

    <comment :show='showComment' @offComment='() => showComment = false' />
  </van-popup>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { formatTime } from '../../filters/format-time'
import record from './components/record'
import lyric from './components/lyric'
import comment from './components/comment'
import { songLyricApi, commentMusicApi } from '@/services/index'

const StackBlur = require('stackblur-canvas')
export default {
  data() {
    return {
      isPlay: false,
      palyTime: 0,
      totalTime: 0,
      moveX: 0,
      playDur: 0,
      tranType: 'none',
      lineCompleteWidth: 0,
      listStatus: 0,
      showLyric: false,
      lyric: [],
      showComment: false,
      isMove: false
    }
  },

  mounted() {
    // 当可以开始播放时 获取总时长
  },

  methods: {
    // 播放
    play() {
      console.log(this.myAudio.volume)
      this.isPlay = true
      this.myAudio.play()
      // this.playDur = this.totalTime - this.myAudio.currentTime + 's'
      // this.tranType = 'left'
      // this.moveX = this.$refs.lineBase.getBoundingClientRect().width - 10 + 'px'
      this.setPlayTime()
    },

    pause() {
      // 暂停
      this.isPlay = false
      this.myAudio.pause()
      this.tranType = 'none'
      this.moveX = this.$refs.dot.getBoundingClientRect().x - this.$refs.lineBase.getBoundingClientRect().x + 'px'
    },

    // 设置时间
    setPlayTime() {
      this.myAudio.ontimeupdate = (e) => {
        this.palyTime = this.myAudio.currentTime
        if (!this.isMove) {
          this.moveX = (this.palyTime / this.myAudio.duration) * 98 + '%'
        }
        this.lineCompleteWidth = this.$refs.dot.getBoundingClientRect().x - this.$refs.lineBase.getBoundingClientRect().x + 5
      }
    },

    dotTouchStart(e) {
      // console.log(this.$refs.lineBase.getBoundingClientRect())
    },

    dotTouchMove(e) {
      this.isMove = true
      const distance = e.targetTouches[0].pageX - this.$refs.lineBase.getBoundingClientRect().x
      const lineWidth = this.$refs.lineBase.getBoundingClientRect().width - 5
      this.moveX = distance + 'px'
      if (distance <= 0) {
        this.moveX = 0 + 'px'
      }
      if (distance >= lineWidth) {
        this.moveX = lineWidth - 5 + 'px'
      }
      this.lineCompleteWidth = this.$refs.dot.getBoundingClientRect().x - this.$refs.lineBase.getBoundingClientRect().x + 5
    },

    dotTouchEnd(e) {
      this.isMove = false
      const st = Number(this.moveX.substring(0, this.moveX.length - 2))
      this.moveX = (st / this.$refs.lineBase.getBoundingClientRect().width) * 98 + '%'
      this.myAudio.currentTime = this.myAudio.duration * (st / this.$refs.lineBase.getBoundingClientRect().width)
      this.play()
    },

    loadBg() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      canvas.width = document.documentElement.clientWidth
      canvas.height = document.documentElement.clientHeight

      // const img = this.$refs.cover
      let img = new Image()
      img.crossOrigin = ''
      img.src = this.currentSong.album.blurPicUrl
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        StackBlur.canvasRGBA(canvas, 0, 0, canvas.width, canvas.height, 80)
      }
    },

    loadLyric() {
      songLyricApi.get({
        id: this.player.id
      }).then(res => {
        const r = res.data
        this.lyric = r.lyric.split('\n')
      })
    },

    reset() {
      this.isPlay = false
      this.tranType = 'none'
      this.moveX = 0 + 'px'
      this.palyTime = 0
      this.lineCompleteWidth = 0
    },

    cut(type) {
      this.$player.cut(type)
      this.reset()
      setTimeout(() => {
        this.totalTime = this.myAudio.duration
        this.play()
        this.loadBg()
        this.loadLyric()
      }, 500)
    },

    changeStatus() {
      this.listStatus++
      if (this.listStatus === 3) {
        this.listStatus = 0
      }
    }
  },

  watch: {
    // 当可以开始播放时 获取总时长
    getPlayer(v) {
      let _this = this
      if (v === true) {
        setTimeout(() => {
          _this.myAudio.oncanplay = function() {
            _this.loadBg()
            _this.loadLyric()
            _this.totalTime = _this.myAudio.duration
          }
          // 结束时候
          _this.myAudio.onended = (e) => {
            _this.reset()
            _this.$player.cut('next')
            _this.loadBg()
            _this.loadLyric()
            setTimeout(() => {
              _this.totalTime = _this.myAudio.duration
              _this.play()
            }, 0)
          }
        }, 0)
      } else {
      }
    }
  },

  computed: {
    ...mapState(['player', 'songList']),

    ...mapGetters(['getPlayer']),

    myAudio() {
      return this.$refs.audio
    },

    currentSong() {
      return this.songList.find(i => {
        return i.id === this.player.id
      })
    }
  },

  components: {
    record,
    lyric,
    comment
  },

  filters: {
    formatTime
  }
  
}
</script>

<style lang="scss">
  .play-wrap { position: fixed; width: 100%; height: 100%; background: $color-normal; overflow: hidden;
    .shadow { position: absolute; width: 100%; height: 15%; left: 0;
      &.shadow-top { top: 0; background-image: linear-gradient(rgba(0, 0, 0, .2), transparent); }
      &.shadow-bottom { bottom: 0; background-image: linear-gradient(transparent, rgba(0, 0, 0, .5) ) }
    }
  }
  .player-content { width: 100%; height: 100%; background: url('../../assets/img/bg_player.jpg')no-repeat; background-position: 50%; background-size: cover; display: flex; flex-direction: column; justify-content: space-between; align-items: center; position: fixed; width: 100%; height: 100%; top: 0; left: 0;
    &.nobg { width: 100%; height: 100%; background: transparent; display: flex; flex-direction: column; justify-content: space-between; align-items: center; position: fixed; width: 100%; height: 100%; top: 0; left: 0; }
    >.title { width: 100%; padding: 4%; color: $color-normal; display: flex; justify-content: space-between; align-items: center;
      >span { display: inline-block; height: 100%; width: 15%;
        &:first-child { text-align: left }
        &:last-child { text-align: right }
      }
      >div { flex: 1; padding: 0 10%;
        >p { width: 100%; text-align: center;
          &:first-child { font-size: $font-large }
          &:last-child { font-size: $font-mini }
        }
      }
    }
  }
  .play-body { flex: 1; width: 100% }
  .player-control { width: 100%; padding: 4%; z-index: 200;
    >.handle-ctrl { width: 100%; display: flex; justify-content: space-around; align-items: center;
      >li { width: 20%; text-align: center; color: rgba(255, 255, 255, 0.8) }
    }
    >.progress-bar { width: 100%; display: flex; justify-content: space-between; padding: 20px 0;
      >.time-ctrl { color: rgba(255, 255, 255, .6); font-size: $font-tiny; }
      >.progress-ctrl { flex: 1; margin: 0 5px; display: flex; align-items: center; position: relative;
        >.dot { color: $color-normal; z-index: 100; position: absolute; left: 5px; transition-timing-function: linear }
        >.line { position: absolute; left: 0px; height: 2px;
          &.line-base { width: 100%; background: rgba(255, 255, 255, .3) }
          &.line-complete { background: rgba(255, 255, 255, .7); }
        }
      }
    }
  }

   // iphone 5 5s 
  @media only screen and (min-device-width : 320px) and (max-device-width : 568px) {
    .player-control { padding: 2% 4%;
      .progress-bar { padding: 8px 0 }
    }
  }
</style>
