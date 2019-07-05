<template>
  <div class="lyric-record" :class="{'show' : show}">
    <div ref="lyricWrap" class="lyric">
      <p v-for="(item, index) of lyric" :key="index" :class='{"active" : scrollCtrl(item, index)}'>{{item | splitText}}</p>
    </div>
  </div>
</template>


<script>
import { splitTime, splitText } from '@/filters/format-lyric'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    lyric: {
      type: Array,
      default: []
    },
    currentTime: {
      type: Number,
      default: 0
    }
  },

  mounted() {
    // this.$refs.lyricWrap.scrollTo(0, 0)
    // console.log(123)
  },

  methods: {
    scrollCtrl(item, index) {
      return this.currentTime >= splitTime(item)
    }
  },

  filters: {
    splitTime,
    splitText
  }
}
</script>

<style lang="scss">
  .lyric-record { width: 100%; height: 128.5vw; color: $color-normal; position: absolute; transition: opacity 300ms linear; opacity: 0; overflow-y: auto;
    &.show { opacity: 1; }
    >.lyric { width: 100%; box-sizing: border-box; padding: calc(50% + 50px) 6% calc(50% + 50px) 6%;
      >p { width: 100%; text-align: center; padding: 4% 0; color: rgba(255, 255, 255, .4); transition: color 300ms linear;
        &.active { color: $color-normal }
      }
    }
  }
</style>
