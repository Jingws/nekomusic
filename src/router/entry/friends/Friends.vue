<template>
  <div>
    <pull-refresh :isLoading='isLoading' @onRefresh='onRefresh'>
      <div style="height: 300px">friends</div>
    </pull-refresh>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import pullRefresh from '@/components/pull-refresh.vue'
export default {
  data() {
    return {
      isLoading: false
    }
  },

  methods: {
    onRefresh() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    }
  },

  computed: {
    ...mapState(['']),

    ...mapGetters(['getRefreshItem'])
  },

  watch: {
    getRefreshItem(val) {
      if (val === 3) {
        this.onRefresh()
      }
    }
  },

  components: {
    pullRefresh
  }
}
</script>