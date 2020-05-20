<template>
  <div id="app">
    <blog-header />
    <side-bar />
    <router-view />
  </div>
</template>

<script>
import BlogHeader from './components/BlogHeader/BlogHeader'
import SideBar from './components/BlogHeader/SideBar'
export default {
  name: 'app',
  components: {
    SideBar,
    BlogHeader
  }
}
</script>

<style lang="less" scoped>

</style>
