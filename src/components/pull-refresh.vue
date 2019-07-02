<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <slot></slot>
  </van-pull-refresh>
</template>

<script>
export default {
  props: {
    isLoading: {
      default: false
    }
  },

  methods: {
    onRefresh() {
      this.$emit('onRefresh')
    }
  }
}
</script>