<template>
  <div id="app">
    <blog-header/>
    <side-bar/>
    <vue-particles
      id="particles-js"
      :color="color"
      :particleOpacity="particleOpacity"
      :particlesNumber="particlesNumber"
      :shapeType="shapeType"
      :particleSize="particleSize"
      :linesColor="linesColor"
      :linesWidth="linesWidth"
      :lineLinked="lineLinked"
      :lineOpacity="lineOpacity"
      :linesDistance="linesDistance"
      :moveSpeed="moveSpeed"
      :hoverEffect="hoverEffect"
      :hoverMode="hoverMode"
      :clickEffect="clickEffect"
      :clickMode="clickMode"
      :style="{ display: isShow }"
    >
    </vue-particles>
    <router-view/>
    <blog-footer v-if="this.$route.path !== '/' && this.$route.path !== '/home'" />
    <el-backtop style="color:#354b60;"></el-backtop>
  </div>
</template>

<script>
import BlogHeader from './components/BlogHeader/BlogHeader'
import SideBar from './components/BlogHeader/SideBar'
import BlogFooter from './components/BlogFooter/BlogFooter'
export default {
  name: 'app',
  components: {
    SideBar,
    BlogHeader,
    BlogFooter
  },
  data () {
    return {
      // 一开始我是想后端传过来 实现主题化的
      // 结果这玩意传过来之后也不好使，我也懒得再放到标签里了
      // 就这么滴吧
      color: '#393939',
      particleOpacity: 0.6,
      particlesNumber: 80,
      shapeType: 'circle',
      particleSize: 4,
      linesColor: '#797979',
      linesWidth: 1,
      lineLinked: true,
      lineOpacity: 0.4,
      linesDistance: 150,
      moveSpeed: 3,
      hoverEffect: true,
      hoverMode: 'grab',
      clickEffect: true,
      clickMode: 'push',
      isShow: 'all',
      loading: false
    }
  },
  created () {
  },
  mounted () {
    window.addEventListener('beforeunload', _ => {
      window.scrollTo(0, 0)
    })
  }
}
</script>

<style lang="less">
  #app {
    width: 100%;
    min-height: 100%;
    .views {
      z-index: 999999;
    }
  }
  #particles-js {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 0;
  }
</style>
