<template>
  <div id="search">
    <cover></cover>
    <div id="container">
      <div class="searchCard">
        <el-card>
          <div class="title">
            <i class="iconfont icon-search"></i>
            <span>搜索</span>
          </div>
          <div class="description center"></div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import cover from '../components/common/Cover'
export default {
  components: {
    cover
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
  @import './src/assets/css/variables';
  #search {
    min-height: 100%;
    #container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px 0;
      position: relative;
      z-index: 2;
      .el-card {
        border-radius: 8px;
        color: @articleColor;
      }
      .searchCard {
        margin-top: -75px;
        @media screen and (max-width: 750px) {
          padding: 0 10px;
        }
        @media screen and (min-width: 750px) {
          padding: 0 15px;
        }
        .title {
          display: flex;
          justify-content: center;
          align-items: center;
          i {
            font-size: 1.75rem;
            padding: 0 10px;
          }
          font-size: 1.75rem;
        }
      }
    }
  }
</style>
