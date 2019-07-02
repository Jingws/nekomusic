<template>
  <div class="search-wrap">
    <div class="search-var layout-display">
      <span>
        <v-icon v-show="!opendom" :name=icon  :scale="1"></v-icon>
      </span>
      <clean-able :class="opendom ? 'input-active' : ''">
        <input :style="opendom ? 'text-align: left' : ''" @focus='onfocus()' type="text" v-model="searchStr" placeholder="Hall Of Fame 很好听哦">
      </clean-able>
      <span @click="() => $player.open()">
        <v-icon v-show="!opendom" name='align-left' :scale="1"></v-icon>
      </span>
      <p @click="onblur()" v-show="opendom">取消</p>
    </div>

    <div v-if="opendom" class="recommend-wrap">
      <p v-if="searchStr === null || searchStr === ''" class="search-singer layout-display">按歌手搜索<v-icon name='chevron-right' :scale="0.8"></v-icon></p>
      <p v-else class="search-singer layout-display search-str">搜索 “{{searchStr}}”</p>
      <div v-if="searchStr === null || searchStr === ''" class="recommend-list">
        <p class="layout-display">热门搜索</p>
        <div class="layout-display">
          <span class="layout-display" v-for="(item, k) of searchList" :key="k">{{item}}</span>
        </div>
        <p class="layout-display">搜索历史<span @click="delHistory()"><v-icon name='trash-alt' :scale="0.8"></v-icon></span></p>
        <div class="layout-display">
          <span class="layout-display" v-for="(item, k) of searchList" :key="k">{{item}}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import cleanAble from '@/components/clean-able.vue'
export default {
  props: {
    icon: {
      default: ''
    }
  },

  data() {
    return {
      searchStr: null,
      opendom: false,
      searchList: ['文案', '文案文案', '文案', '文案文案文案', '文案', '文案文案文', '文案文', '文案文案']
    }
  },

  methods: {
    onfocus() {
      this.opendom = true
      this.$emit('hidePage', false)
    },

    onblur() {
      this.opendom = !this.opendom
      this.searchStr = null
      this.$emit('hidePage', true)
    },

    delHistory() {
      this.$popup
        .confirm('确认清空全部历史记录？')
        .then(() => {})
        .catch(() => {})
    }
  },

  components: {
    cleanAble
  }
}
</script>

<style lang="scss">
  $search-bar-height: 45px;

  .search-wrap {
    // width: 100%; height: calc(100% - #{$search-bar-height}); position: fixed; z-index: 100;
    .search-var { width: 100%; height: $search-bar-height; position: fixed; top: 0; left: 0; background: $color-normal; justify-content: space-around; color: $color-def; z-index: 200;
      >div { width: 60%; height: 100%; transition: all 300ms linear; }
      >div.input-active { width: 80%; height: 100% }
      ::input-placeholder { color: #C7C7C7; }
      ::-webkit-input-placeholder { color: #C7C7C7; }
      input { height: 50%; width: 100%; margin: 0; padding: 0 20px 0 10px; box-sizing: border-box; border: none; background: $color-info; border-radius: 25px; outline: none; position: relative; text-align: center; font-size: $font-tiny }
    }
    .recommend-wrap { width: 100%; margin-top: $search-bar-height; color: $color-gray; position: fixed; top: 0; left: 0; background: $color-normal; height: calc(100% - 45px); z-index: 200;
      .search-singer { justify-content: space-between; font-size: $font-mini; padding: 8px 16px 8px 16px; box-sizing: border-box; border-bottom: 1px solid $color-gray; }
      .search-str { color: $color-primary; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100% }
      .recommend-list { width: 100%; padding: 0 16px; box-sizing: border-box; font-size: $font-mini;
        >p { justify-content: space-between; padding: 8px 0 }
        >div { justify-content: flex-start; flex-wrap: wrap; width: 100%; margin: 8px 0 16px 0;
        span { font-size: $font-tiny; background: rgba(230, 230, 230, 0.5); padding: 4px 10px; border-radius: 10px; margin: 0 5px 10px 0 }
        }
      }
    }
  }
</style>