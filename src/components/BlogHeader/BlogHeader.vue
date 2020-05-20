<template>
  <div class="z-depth-3" :style="colorProps">
    <header id="header">
      <h1 class="logo waves-effect waves-light">{{ title }}</h1>
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" :text-color="headerColor"
               :active-text-color="headerColor" router>
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
      <h2 class="logo waves-effect waves-light">{{ title }}</h2>
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
      direction: 'ltr'
    }
  },
  methods: {
    ...mapMutations({
      switchSideBar: 'header/switchSideBar'
    }),
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    showSideBar () {
      this.switchSideBar(this.drawer)
    }
  },
  computed: {
    ...mapState({
      title: state => state.header.title,
      tabs: state => state.header.tabs,
      drawer: state => state.header.drawer,
      headerBgColor: state => state.header.headerBgColor,
      headerColor: state => state.header.headerColor || '#F5F5F5',
      headerActiveColor: state => state.header.headerActiveColor
    }),
    colorProps () {
      return {
        '--backgroundColor': this.headerBgColor,
        '--color': this.headerColor,
        '--activeColor': this.headerActiveColor
      }
    },
    activeIndex () {
      return this.$route.path.substring(1, this.$route.path.length) || 'home'
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
