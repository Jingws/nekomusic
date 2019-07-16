<template>
  <van-popup v-model="show" position='bottom' class="comment-wrap" :overlay='false'>
    <p @click="close">close</p>
  </van-popup>
</template>

<script>
import { commentMusicApi } from '@/services/index'
import { mapState } from 'vuex'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {}
  },

  methods: {
    close() {
      this.$emit('offComment')
    }
  },

  computed: {
    ...mapState(['player'])
  },

  watch: {
    show(v) {
      if (v) {
        commentMusicApi.get({
          id: this.player.id,
          offset: 0
        })
      }
    }
  }
}
</script>

<style lang="scss">
  .comment-wrap { position: fixed; width: 100%; height: 100%; background: $color-normal; overflow: hidden; }
</style>
