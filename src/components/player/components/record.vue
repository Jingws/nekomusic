<template>
  <div class="player-record" :class="{'show' : show}">
    <div class="pole" :class="{'rotate' : !isPlay}">
      <img src="@/assets/img/pole.png" width="50%" alt="">
    </div>
    <div class="record-content">
      <ul>
        <li :style="{width: clientWidth + 'px'}">
          <div :class="{'imgRotate' : isPlay}">
            <p>
              <img :src="picUrl" width="100%" alt="">
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isPlay: {
      type: Boolean,
      default: false
    },
    picUrl: {
      type: String,
      default: 'http://p2.music.126.net/GoiTB6oG3vQWntnCjKRw0g==/109951163092691594.jpg'
    },
    show: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      clientWidth: '',
      playImgWidth: ''
    }
  },

  mounted() {
    this.clientWidth = document.documentElement.clientWidth
  }
}
</script>

<style lang="scss">
  .player-record { width: 100%; height: 128.5vw; color: $color-normal; position: absolute;  transition: opacity 300ms linear; opacity: 0;
    &.show { opacity: 1; }
    .pole { position: absolute; top: 0; left: calc(50% - 12px); width: 50%; transform-origin: 4vw 4vw; transition: transform linear 300ms; z-index: 200;
      &.rotate { transform: rotate(-30deg) }
    }
    .record-content { overflow: hidden; width: 100%; height: 100%;
      >ul { height: 100%;
        >li { height: 100%; display: flex; justify-content: center; align-items: flex-start;
          >div { width: 75%; position: relative; padding-top: 74.96vw; background: url('../../../assets/img/circle_black.png')no-repeat; background-position: 50%; background-size: 100%; margin-top: 22vw;
            >p { display: inline-block; width: 47vw; height: 47vw; border-radius: 50%; overflow: hidden; position: absolute; top: 14vw; left: 14vw; }
          }
        }
      }
    }
    @-webkit-keyframes rotation{
      from {-webkit-transform: rotate(0deg);}
      to {-webkit-transform: rotate(360deg);}
    }
    .imgRotate{
      -webkit-transform: rotate(360deg);
      animation: rotation 16s linear infinite;
    }
  }

</style>
