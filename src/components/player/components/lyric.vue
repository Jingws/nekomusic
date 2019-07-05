<template>
  <div class="lyric-record" :class="{'show' : show}">{{lyric}}</div>
</template>


<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    lyric: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
  .lyric-record { width: 100%; height: 128.5vw; color: $color-normal; position: absolute; transition: opacity 300ms linear; opacity: 0; overflow-y: auto;
    &.show { opacity: 1; }
  }
</style>
