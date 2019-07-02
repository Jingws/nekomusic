<template>
  <div class="cleanable layout-display">
    <span class="icon-clear" @click="clean" @mousedown="clean" :class="{hide: hide}" :style="ui">
      <v-icon name='times-circle' :scale="0.7"></v-icon>
    </span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hide: true
    }
  },

  props: {
    ui: {
      default: null
    }
  },

  mounted: function() {
    this.$nextTick(function() {
      const el = this.$slots.default[0].elm
      if (el) {
        el.addEventListener('input', this.onchange)
        el.addEventListener('change', this.onchange)
        el.addEventListener('paste', this.onchange)
        el.addEventListener('blur', this.onblur)
        el.addEventListener('focus', this.onfocus)
      }
    })
  },

  destroyed: function() {
    const el = this.$slots.default[0].elm
    if (el) {
      el.removeEventListener('input', this.onchange)
      el.removeEventListener('change', this.onchange)
      el.removeEventListener('paste', this.onchange)
      el.removeEventListener('blur', this.onblur)
      el.removeEventListener('focus', this.onfocus)
    }
  },
  methods: {
    onchange(e) {
      this.hide = e.target.value.length === 0
    },

    onfocus: function(e) {
      this.hide = e.target.value.length < 1
    },

    onblur: function(e) {
      this.hide = true
    },

    clean: function() {
      var el = this.$el.querySelector('input')
      if (el) {
        el.value = null
        el.focus()
        const evt = document.createEvent('KeyboardEvent')
        evt.initEvent('input', false, true)
        el.dispatchEvent(evt)
      }
    }
  }
}
</script>

<style lang="scss">
  .cleanable { position: relative; width: fit-content;
    .icon-clear { position: absolute; right: 5px; top: 25%; z-index: 100; color: #c7c7c7;
      &.hide { display: none }
      svg { z-index: 20 }
    }
  }
</style>
