<template>
  <div>
    <keep-alive>
      <home-page v-if="regItem === 0" />
    </keep-alive>
    <video-page v-if="regItem === 1"/>
    <mine-page v-if="regItem === 2"/>
    <friends-page v-if="regItem === 3"/>
    <user-page v-if="regItem === 4"/>
  </div>
</template>

<script>
import homePage from './home/Home.vue'
import videoPage from './video/Video.vue'
import minePage from './mine/Mine.vue'
import friendsPage from './friends/Friends.vue'
import userPage from './user/User.vue'
export default {
  props: {
    regItem: {
      default: 0
    }
  },

  components: {
    homePage,
    videoPage,
    minePage,
    friendsPage,
    userPage
  }
}
</script>
