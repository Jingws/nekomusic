<template>
  <div class="lyric-record" :class="{'show' : show}">11111111111111111111111</div>
</template>


<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
  .lyric-record { width: 100%; height: 100%; color: $color-normal; position: relative; transition: opacity 300ms linear; opacity: 0;
    &.show { opacity: 1; }
  }
</style>
