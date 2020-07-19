<template>
  <el-drawer
    :visible="drawer"
    direction="ltr"
    :with-header="false"
    :before-close="closeSideBar"
    size="245px"
    :style="colorProps">
    <el-scrollbar class="page-component__scroll">
      <el-menu
        :default-active="activeIndex"
        :text-color="headerInfo.sideBarColor"
        @select="closeSideBar"
        router>
        <div>
          <el-avatar :size="100" :src="headerInfo.avatarUrl" />
          <h2>{{ headerInfo.title }}</h2>
          <p>{{ headerInfo.sign }}</p>
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
    }
  },
  created () {
    this.$store.dispatch('header/getHeaderInfo')
  },
  computed: {
    ...mapState({
      tabs: state => state.header.tabs,
      drawer: state => state.header.drawer,
      headerInfo: state => state.header.headerInfo
    }),
    colorProps () {
      return {
        '--color': this.headerInfo.headerColor,
        '--sideBarBgColor': this.headerInfo.sideBarBgColor,
        '--sideBarColor': this.headerInfo.sideBarColor,
        '--sideBarActiveColor': this.headerInfo.sideBarActiveColor
      }
    },
    activeIndex () {
      return this.$route.path === '/' ? '/home' : this.$route.path
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
      height: 100vh;
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
