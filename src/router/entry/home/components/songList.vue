<template>
  <van-popup v-model="Popups.songList" position='right' class="popup-wrap" :overlay='false'>
    <popup-title :title="'歌单'" />
    <div class="popup-content">
      歌单
    </div>
  </van-popup>
</template>

<script>
import { mapState } from 'vuex'
import popupTitle from './popupTitle.vue'
export default {
  data () {
    return {
    }
  },

  computed: {
    ...mapState(['Popups'])
  },

  components: {
    popupTitle
  }
}
</script>

<style lang="scss">
</style>
