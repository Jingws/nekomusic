<template>
  <van-swipe :autoplay="3500">
    <van-swipe-item v-for="(item, index) of list" :key="index">
      <div class="banner-wrap"><img :src="item.pic" alt=""></div>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: {
    list: {
      default: []
    }
  },
  
  data() {
    return {}
  },

  mounted() {
  },

  methods: {
  }
}
</script>

<style lang="scss">
  .banner-wrap { width: 88%; margin: 3% 6%; border-radius: 15px; overflow: hidden;
    >img { width: 100%; }
  }
  .van-swipe__indicators { bottom: calc(10px + 6%) }
</style>