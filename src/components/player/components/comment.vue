<template>
  <van-popup v-model="show" position='bottom' class="comment-wrap" :overlay='false'>
    <div class="player-comment-title layout-display">
      <span @click="off()" class="layout-display"><v-icon name='angle-left' :scale="1.3"></v-icon></span>
      <p v-if="commentList.total === null">评论</p>
      <p v-else>评论 ({{commentList.total}})</p>
      <span class="layout-display"><v-icon name='align-left' :scale="1"></v-icon></span>
    </div>

    <div class="song-breviary">
      <div><img :src="currentSong.album.blurPicUrl" width="100%" height="100%" alt=""></div>
      <div>
        <p>{{currentSong.name}}</p>
        <p>{{currentSong.album.artists[0].name}}</p>
      </div>
    </div>

    <div class="comment-list">
      <ul>
        <van-list v-model="commentList.loading" :finished="commentList.finished" @load="onRecordsLoad" :immediate-check="false">
          <template v-if="commentList.hotComments.length > 0">
            <li class="comment-tit">精彩评论</li>
            <li class="comment-item" v-for="(item, index) of commentList.hotComments" :key="index">
              <div class="layout-column">
                <div class="user">
                  <div><img :src="item.user.avatarUrl" alt="" width="100%" height="100%"></div>
                  <div>
                    <p>{{item.user.nickname}}</p>
                    <p>{{item.time | formatDate}}</p>
                  </div>
                  <div>
                    <span>{{item.likedCount}}</span>
                    <span v-if="!item.liked"><v-icon name='regular/thumbs-up' :scale='.8'></v-icon></span>
                    <span v-else><v-icon name='regular/thumbs-up' :scale='.8' color='#FF0305'></v-icon></span>
                  </div>
                </div>
                <div class="comment">{{item.content}}</div>
              </div>
            </li>
          </template>
          <li class="comment-tit">近期热评</li>
          <li class="comment-item" v-for="(item, index) of commentList.comments" :key="index">
            <div class="layout-column">
              <div class="user">
                <div><img :src="item.user.avatarUrl" alt="" width="100%" height="100%"></div>
                <div>
                  <p>{{item.user.nickname}}</p>
                  <p>{{item.time | formatDate}}</p>
                </div>
                <div>
                  <span>{{item.likedCount}}</span>
                  <span v-if="!item.liked"><v-icon name='regular/thumbs-up' :scale='.8'></v-icon></span>
                  <span v-else><v-icon name='regular/thumbs-up' :scale='.8' color='#FF0305'></v-icon></span>
                </div>
              </div>
              <div class="comment">{{item.content}}</div>
            </div>
          </li>
        </van-list>
      </ul>
    </div>
  </van-popup>
</template>

<script>
import { commentMusicApi } from '@/services/index'
import { formatDate } from '@/filters/format-date'
import { mapState } from 'vuex'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      commentList: {
        comments: [],
        hotComments: [],
        page: 0,
        loading: false,
        finished: false,
        total: null
      }
    }
  },

  methods: {
    off() {
      this.$emit('offComment')
    },

    query(page) {
      commentMusicApi.get({
        id: this.player.id,
        offset: page
      }).then(res => {
        const r = res.data
        this.commentList.loading = false
        if (r.total <= this.commentList.page * 20) {
          this.commentList.finished = true
        }
        this.commentList.total = r.total
        this.commentList.page += 1
        if (r.hotComments) {
          this.commentList.hotComments = r.hotComments
        }
        this.commentList.comments = this.commentList.comments.concat(r.comments)
      })
    },

    onRecordsLoad() {
      this.query(this.commentList.page)
    },

    resetList() {
      this.commentList.page = 0
      this.commentList.comments = []
      this.commentList.hotComments = []
      this.commentList.total = null
    }
  },

  computed: {
    ...mapState(['player', 'songList']),

    currentSong() {
      return this.songList.find(i => {
        return i.id === this.player.id
      })
    }
  },

  watch: {
    show(v) {
      if (v) {
        this.query(this.commentList.page)
      } else {
        this.resetList()
      }
    }
  },

  filters: {
    formatDate
  }
}
</script>

<style lang="scss">
  .comment-wrap { position: fixed; width: 100%; height: 100%; background: $color-gray-f8;
    .player-comment-title { width: 100%; height: 45px; z-index: 2005; font-size: $font-large; justify-content: space-around;
      p { width: 75%; text-align: center; }
      span { width: 10%; height: 100% }
    }
    .song-breviary { width: 100%; background: $color-normal; padding: 2% 4%; margin-bottom: 12px; display: flex;
      >div:first-child { width: 22vw; height: 22vw; overflow: hidden; border-radius: 5px; }
      >div:last-child { flex: 1; padding-left: 4%; display: flex; flex-direction: column; justify-content: center;
        >p { width: 100%; line-height: 2.25; text-align: left;
          &:first-child { font-size: $font-large }
          &:last-child { font-size: $font-mini; color: $color-primary }
        }
      }
    }
    .comment-list { width: 100%; background: $color-normal;
      ul { padding: 0 4%;
        .comment-tit { font-size: $font-mini; counter-reset: #000; font-weight: 600; padding: 10px 0; }
        .comment-item { width: 100%; padding: 3px 0;
          .user { width: 100%; height: 38px; display: flex; justify-content: space-between; align-items: center;
            >div { height: 100%;
              &:first-child { width: 38px; border-radius: 50%; overflow: hidden; }
              &:last-child { width: 38px; font-size: $font-mini; color: $color-gray; display: flex; justify-content: space-around; align-items: center }
              &:nth-child(2) { flex: 1; padding-left: 15px;
                >p { width: 100%; text-align: left; line-height: 19px;
                  &:first-child { font-size: $font-mini; }
                  &:last-child { font-size: $font-tiny; color: $color-gray }
                }
              }
            }
          }
          .comment { width: calc(100% - 53px); margin-left: 53px; padding: 8px 0; font-size: $font-mini; color: #000; line-height: 1.75; border-bottom: 1px solid #ddd; }
        }
      }
    }
  }
</style>
