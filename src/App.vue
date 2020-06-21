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
    <router-view />
    <el-backtop style="color:#354b60;"></el-backtop>
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
  },
  data () {
    return {
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
      isShow: 'all'
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="less">
  #particles-js {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 0;
  }
</style>
