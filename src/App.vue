<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/conent/maintabbar/MainTabBar.vue'

export default {
  name: "App",
  components: {
    MainTabBar
  },
};
</script>

<style scoped>
</style>
