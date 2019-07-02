<template>
  <div class="popup-title-wrap layout-display" :class="ui">
    <span @click="off()" class="layout-display"><v-icon name='angle-left' :scale="1.3"></v-icon></span>
    <p>{{title}}</p>
    <span class="layout-display"><v-icon name='align-left' :scale="1"></v-icon></span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    ui: {
      type: String,
      default: 'default'
    }
  },

  methods: {
    off() {
      this.$store.commit('OFF_POPUPS')
    }
  }
}
</script>

<style lang="scss">
  $color-transparent: rgba(240,240,240, 0.9);

  .popup-title-wrap { width: 100%; height: 45px; position: fixed; top: 0; left: 0; z-index: 2005; font-size: $font-large; justify-content: space-around;
    &.default { background: $color-normal }
    &.white { background: transparent; color: $color-normal }
    p { width: 75%; text-align: center; }
    span { width: 10%; height: 100% }
  }
</style>