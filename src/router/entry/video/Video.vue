<template>
  <div>
    <search-content @hidePage='hidePage($event)' :icon='searchIcon' />
    <pull-refresh :isLoading='isLoading' @onRefresh='onRefresh'>
      <div style="margin-top: 45px; height: 300px">video</div>
    </pull-refresh>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import searchContent from '@/components/search-content.vue'
import pullRefresh from '@/components/pull-refresh.vue'
export default {
  data() {
    return {
      showPage: true,
      searchIcon: 'video',
      isLoading: false
    }
  },

  methods: {
    hidePage(val) {
      this.showPage = val
    },

    onRefresh() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    }
  },

  computed: {
    ...mapState([]),

    ...mapGetters(['getRefreshItem'])
  },

  watch: {
    getRefreshItem(val) {
      if (val === 1) {
        this.onRefresh()
      }
    }
  },

  components: {
    searchContent,
    pullRefresh
  }
}
</script>