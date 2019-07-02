<template>
  <van-popup v-model="Popups.commend" position='right' class="popup-wrap" :overlay='false'>
    <popup-title :title="'每日推荐'" />
    <div class="popup-content">
      推荐内容
      <div class="text"></div>
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
  .popup-wrap { position: fixed; width: 100%; height: 100%; background: $color-normal; overflow: hidden; 
    .popup-content { width: 100%; height: 100%; overflow-y: scroll; padding-top: 45px }
  }
  .text { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; grid-template-rows: 25% 100px auto }
</style>
