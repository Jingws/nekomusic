<template>
  <van-popup v-model="Popups.poll" position='right' class="popup-wrap" :overlay='false'>
    <popup-title :title="'排行榜'" />
    <div class="popup-content">
      榜单
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
