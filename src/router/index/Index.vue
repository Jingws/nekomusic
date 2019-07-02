<template>
<div class="page-wrap">
  <div>
    <entry :regItem='indexItem' />
  </div>

  <div v-if="!player.state" class="layout-display nav-content">
    <span class="layout-column" :class="indexItem === 0 ? 'router-active' : ''" @click="navActive(0)">
      <span class="layout-display"><v-icon name='regular/compass'  :scale="indexItem === 0 ? 0.8 : 1"></v-icon></span>
      <p>发现</p>
    </span>
    <span class="layout-column" :class="indexItem === 1 ? 'router-active' : ''" @click="navActive(1)">
      <span class="layout-display"><v-icon name='regular/play-circle'  :scale="indexItem === 1 ? 0.8 : 1"></v-icon></span>
      <p>视频</p>
    </span>
    <span class="layout-column" :class="indexItem === 2 ? 'router-active' : ''" @click="navActive(2)">
      <span class="layout-display"><v-icon name='music'  :scale="indexItem === 2 ? 0.8 : 1"></v-icon></span>
      <p>我的</p>
    </span>
    <span class="layout-column" :class="indexItem === 3 ? 'router-active' : ''" @click="navActive(3)">
      <span class="layout-display"><v-icon name='user-friends' :scale="indexItem === 3 ? 1 : 1.4"></v-icon></span>
      <p>朋友</p>
    </span>
    <span class="layout-column" :class="indexItem === 4 ? 'router-active' : ''" @click="navActive(4)">
      <span class="layout-display"><v-icon name='regular/user'  :scale="indexItem === 4 ? 0.8 : 1"></v-icon></span>
      <p>账号</p>
    </span>
  </div>
</div>
</template>

<script>
import entry from '../entry/Entry.vue'
import { mapState } from 'vuex'
export default {
  beforeRouteEnter (to, from, next) {
    // ...
    next(vm => {
      let item = window.sessionStorage.getItem('indexItem')
      if (!item || item === null) {
        vm.indexItem = 0
      } else {
        vm.setItem(item)
      }
    })
  },

  data() {
    return {
      indexItem: null
    }
  },

  mounted () {
    // console.log(this.indexItem)
  },

  destroyed () {

  },

  methods: {
    navActive(item) {
      if (this.indexItem === item) {
        this.$store.commit('OFF_POPUPS')
        if (this.RefreshItem !== item) {
          this.$store.commit('SET_REFRESHITEM', item)
        } else {
          this.$store.commit('SET_REFRESHITEM', null)
        }
        return
      }
      this.$store.commit('SET_REFRESHITEM', null)
      this.setItem(item)
    },

    setItem(val) {
      this.indexItem = Number(val)
      window.sessionStorage.setItem('indexItem', val)
    }
  },

  computed: {
    ...mapState(['RefreshItem', 'player'])
  },

  components: {
    entry
  },

  watch: {
  }
}
</script>

<style lang="scss">
  $nav-height: 55px;
  $color-transparent: rgba(240,240,240, 0.9);

  .page-wrap {
    position: absolute; width: 100%; height: 100%;
      >div:first-child { height: calc(100% - #{$nav-height}) }
      .nav-content {
      position: fixed; bottom: 0; width: 100%; height: $nav-height; background: $color-transparent; z-index: 9999;
      > span { width: 20%; height: 100%; font-size: $font-tiny; color: $color-gray;
        justify-content: space-around; padding: 5px 0;
        span { width: 25px; height: 25px; border-radius: 50%; }
      }
  }
  }
</style>