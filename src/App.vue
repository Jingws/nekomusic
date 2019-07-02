<template>
  <div id="app" :class="themeClass" v-cloak>
    <player />
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { PopupPlugin } from './services/PopupService'
import { PlayerPlugin } from './services/player'
import player from './components/player/Player.vue'

Vue.use(PopupPlugin)
Vue.use(PlayerPlugin)

export default {
  name: 'App',

  beforeCreate() {
    this.$store.dispatch('loadTheme')
  },

  mounted() {
    // console.log(this.Theme)
  },

  methods: {
  },

  computed: {
    ...mapState(['Theme']),

    themeClass() {
      return `theme-${this.Theme}`
    }
  },

  components: {
    player
  }
}
</script>

<style lang="scss">
// @import './assets/style/mixin.scss';

.theme-def { @include theme-def }
.theme-red { @include theme-red }

.app-wrap { position: absolute; width: 100%; height: 100%; top: 0; left: 0; overflow-y: scroll }

[v-cloak] {
  display: none;
}
// body .van-dialog__message { font-size: $font-mini; color: $color-def; padding: 15px 25px; }
</style>
