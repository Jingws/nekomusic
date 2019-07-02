<template>
  <div>
    <p @click="() => $player.open()">mine</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState(['RefefshItem'])
  }
}
</script>