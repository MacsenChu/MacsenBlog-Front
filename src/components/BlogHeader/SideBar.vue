<template>
  <el-drawer
    :visible="drawer"
    :direction="direction"
    :with-header="false"
    :before-close="closeSideBar"
    size="245px"
    :style="colorProps">
    <el-scrollbar class="page-component__scroll">
      <el-menu
        :default-active="activeIndex"
        :text-color="sideBarColor"
        router>
        <div>
          <el-avatar :size="100" :src="avatarUrl" />
          <h2>{{ title }}</h2>
          <p>{{ sign }}</p>
        </div>
        <el-menu-item :index="tab.path" v-for="tab in tabs" :key="tab.id">
          <i :class="['iconfont', tab.icon]" />
          <span>{{ tab.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'side-bar',
  data () {
    return {
      direction: 'ltr',
      avatarUrl: 'https://pics.images.ac.cn/image/5ec25bfca9a8d.html'
    }
  },
  computed: {
    ...mapState({
      title: state => state.header.title,
      sign: state => state.header.sign,
      tabs: state => state.header.tabs,
      drawer: state => state.header.drawer,
      headerBgColor: state => state.header.headerBgColor,
      headerColor: state => state.header.headerColor,
      sideBarBgColor: state => state.header.sideBarBgColor,
      sideBarColor: state => state.header.sideBarColor,
      sideBarActiveColor: state => state.header.sideBarActiveColor
    }),
    colorProps () {
      return {
        '--color': this.headerColor,
        '--sideBarBgColor': this.sideBarBgColor,
        '--sideBarColor': this.sideBarColor,
        '--sideBarActiveColor': this.sideBarActiveColor
      }
    },
    activeIndex () {
      return this.$route.path.substring(1, this.$route.path.length) || 'home'
    }
  },
  methods: {
    ...mapMutations({
      switchSideBar: 'header/switchSideBar'
    }),
    closeSideBar () {
      this.switchSideBar(this.drawer)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./src/assets/css/variables";
  .el-drawer {
    .el-menu {
      border: none;
      height: 500px;
      div {
        width: 100%;
        height: 200px;
        background-color: var(--sideBarBgColor, @sideBarBgColor);
        color: var(--color, @headerColor);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        .el-avatar {
        }
        h2, p {
          margin: 0!important;
        }
        h2 {
          font-size: 20px;
        }
        p {
          font-size: 13px;
        }
      }
      .el-menu-item {
        &:hover, &.is-active {
          background-color: var(--sideBarActiveBgColor, @sideBarActiveColor);
        }
        i {
          padding: 0 10px;
          font-size: 20px;
          color: var(--sideBarColor, @sideBarColor);
        }
        span {
          display: inline-block;
          width: 135px;
          text-align: center;
          font-weight: bold;
        }
      }
    }
  }
</style>
