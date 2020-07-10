<template>
  <div :class="['z-depth-3', isTop ? 'nav-transparent': '' ]" :style="colorProps" id="headNav">
    <header id="header">
      <h1 class="logo waves-effect waves-light">{{ headerInfo.title }}</h1>
      <el-menu :default-active="activeIndex"
               mode="horizontal"
               :text-color="headerInfo.headerColor"
               :active-text-color="headerInfo.headerColor"
               :class="isTop ? 'nav-transparent': ''"  router>
        <el-menu-item :index="tab.path" v-for="tab in tabs" :key="tab.id" class="waves-effect waves-light">
          <i :class="['iconfont', tab.icon]"></i>
          {{ tab.name }}
        </el-menu-item>
      </el-menu>
    </header>
    <header id="mobileHeader">
      <span class="waves-effect waves-light" @click="showSideBar">
        <i class="iconfont icon-nav-list"></i>
      </span>
      <h2 class="logo waves-effect waves-light">{{ headerInfo.title }}</h2>
      <span class="waves-effect waves-light">
        <i class="iconfont icon-search1" style="font-size:26px"></i>
      </span>
    </header>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'blog-header',
  data () {
    return {
      isTop: true
    }
  },
  mounted () {
    // 滚动页面改变导航栏颜色，在mounted钩子window添加一个滚动滚动监听事件
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    // 由于是在整个window中添加的事件，所以要在页面离开时摧毁掉，否则会报错
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapMutations({
      switchSideBar: 'header/switchSideBar',
      switchHeaderBgColor: 'header/switchHeaderBgColor'
    }),
    showSideBar () {
      this.switchSideBar(this.drawer)
    },
    // 然后在方法中，添加这个handleScroll方法来获取滚动的位置
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const showPosition = 100
      // 设置背景颜色的透明读
      this.isTop = scrollTop < showPosition
    }
  },
  computed: {
    ...mapState({
      tabs: state => state.header.tabs,
      drawer: state => state.header.drawer,
      headerInfo: state => state.header.headerInfo
    }),
    colorProps () {
      return {
        '--backgroundColor': this.headerInfo.headerBgColor,
        '--color': this.headerInfo.headerColor,
        '--activeColor': this.headerInfo.headerActiveColor
      }
    },
    activeIndex () {
      return this.$route.path === '/' ? '/home' : this.$route.path
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./src/assets/css/variables";
  div {
    position: fixed;
    top:0;
    background-color: var(--backgroundColor, @headerBgColor);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &#headNav {
      z-index: 2000;
    }
    header {
      width: 1200px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h1 {
        display: inline;
        padding: 0 20px;
        transition: background-color 0.5s;
      }

      .logo {
        margin: 0;
        cursor: pointer;
        color: var(--color, @headerColor);
        line-height: 60px;
      }

      .el-menu.el-menu--horizontal {
        border: none;
        background-color: var(--backgroundColor, @headerBgColor);

        .el-menu-item {
          color: var(--color, @headerColor);
          i {
            color: var(--color, @headerColor);
          }

          &:hover, &.is-active {
            background-color: var(--activeColor, @headerActiveColor);
          }
        }
      }

      &#mobileHeader {
        display: none;
        height: 54px;

        span {
          display: block;
          height: 100%;
          width: 60px;

          i {
            color: var(--color, @headerColor);
            font-size: 32px;
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        h2 {
          padding: 0 10px;
          transition: background-color 0.5s;
        }
      }
    }
  }

  div {
    header {
      @media screen and (max-width: 900px) {
        font-size: 14px;
        &#header {
          display: none;
        }

        &#mobileHeader {
          display: flex;

          .logo {
            line-height: 54px;
          }
        }
      }
    }
  }
</style>
