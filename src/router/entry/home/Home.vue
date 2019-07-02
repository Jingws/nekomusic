<template>
  <div class="homePage">
    <search-content @hidePage='hidePage($event)' :icon='searchIcon' />
    <pull-refresh :isLoading='isLoading' @onRefresh='onRefresh'>
      <div class="home-wrap">
        <swipe :list='imgList' />

        <ul class="tabs layout-display">
          <li class="layout-column" @click="openPopup('commend')">
            <span class="layout-display"><v-icon name='regular/calendar-minus' scale=1.2></v-icon></span>
            <p>每日推荐</p>
          </li>
          <li class="layout-column" @click="openPopup('songList')">
            <span class="layout-display"><v-icon name='regular/list-alt' scale=1.2></v-icon></span>
            <p>歌单</p>
          </li>
          <li class="layout-column" @click="openPopup('poll')">
            <span class="layout-display"><v-icon name='poll' scale=1.2></v-icon></span>
            <p>排行榜</p>
          </li>
          <li class="layout-column" @click="openPopup('radio')">
            <span class="layout-display"><v-icon name='music' scale=1.2></v-icon></span>
            <p>电台</p>
          </li>
          <li class="layout-column">
            <span class="layout-display"><v-icon name='headset' scale=1.2></v-icon></span>
            <p>直播</p>
          </li>
        </ul>

        <!-- 推荐歌单 -->
        <div class="rcmd-music-list">
          <div class="title">推荐歌单<span>歌单广场</span></div>
          <ul class="list-content">
            <template v-for="(item, index) of remdMusicList.list">
              <li :key="index" @click="getList(item.link)">
                <div>
                  <img :src="item.img" alt="">
                </div>
                <p>{{item.text}}</p>
                <span>
                  <v-icon name='caret-right' scale='1'></v-icon>
                  {{item.amount}}</span>
              </li>
            </template>
          </ul>
        </div>
        <span @click="themify('def')">def</span>
        <span @click="themify('red')">red</span>
      </div>
    </pull-refresh>
    <daily-commend />
    <song-list />
    <poll />
    <radio />
    <play-list v-if="playList.show" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import searchContent from '@/components/search-content.vue'
import pullRefresh from '@/components/pull-refresh.vue'
import swipe from '@/components/swipe.vue'
import dailyCommend from './components/dailyCommend.vue'
import songList from './components/songList.vue'
import poll from './components/poll.vue'
import radio from './components/radio.vue'
import playList from './components/playList'
export default {
  data() {
    return {
      showPage: true,
      searchIcon: 'microphone-alt',
      isLoading: false,
      imgList: [
        // require('../../../assets/img/banner_0.jpg'),
        // require('../../../assets/img/banner_1.jpg'),
        // require('../../../assets/img/banner_2.jpg'),
        // require('../../../assets/img/banner_3.png'),
        // require('../../../assets/img/banner_4.jpg'),
        // require('../../../assets/img/banner_5.jpg'),
        // require('../../../assets/img/banner_6.jpg'),
        // require('../../../assets/img/banner_7.png')
      ]
    }
  },

  created() {
  },

  activated() {
    this.$store.dispatch('loadEnterFace')
  },

  mounted() {
    this.imgList.push(this.banner.content.image)
    console.log(2313)
  },

  methods: {
    getList(id) {
      this.$store.dispatch('loadPlayList', id)
    },

    themify(val) {
      this.$store.dispatch('setTheme', val)
    },

    hidePage(val) {
      this.showPage = val
    },

    openPopup(val) {
      this.$store.commit('SET_POPUPS', val)
    },

    onRefresh() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    }
  },

  computed: {
    ...mapState(['Theme', 'banner', 'remdMusicList', 'player', 'Popups', 'playList']),

    ...mapGetters(['getRefreshItem'])
  },

  watch: {
    getRefreshItem(val) {
      if (val === 0) {
        this.onRefresh()
      }
    }
  },

  components: {
    searchContent,
    pullRefresh,
    swipe,
    dailyCommend,
    songList,
    poll,
    radio,
    playList
  }
}
</script>

<style lang="scss">
  .home-wrap { margin-top: 45px; padding-bottom: 55px;
    .tabs { width: 100%; padding: 10px 0 20px 0;
      >li { flex: 0 0 20%; font-size: $font-mini;
        >span { width: 45px; height: 45px; border-radius: 50%;
          >svg { color: $color-normal }
        }
        >p { margin-top: 6px }
      }
    }
    >.rcmd-music-list { width: 100%; border-top: 1px solid #ddd; padding: 0 4%;
      >.title { width: 100%; text-align: left; font-size: $font-large; padding: 20px 0;
        >span { display: inline-block; float: right; color: $color-def; font-size: $font-normal; padding: 2px 10px; border: 1px solid #ddd; border-radius: 25px; position: relative; top: -1px }
      }
      >.list-content { width: 100%; display: flex; justify-content: flex-start; align-items: flex-start; flex-wrap: wrap;
        >li { width: 30%; margin: 0 1.5% 28px 1.5%; height: 35vw; position: relative;
          >div { width: 100%; height: 80%; border-radius: 5px; overflow: hidden;
            >img { width: 100%; height: 100% }
          }
          >p { margin-top: 5px; text-align: left; font-size: $font-mini; line-height: 1.25 }
          >span { position: absolute; color: $color-normal; right: 5px; top: 5px; font-size: $font-mini;
            >svg { position: relative; top: 3px }
          }
        }
      }
    }
  }
</style>
