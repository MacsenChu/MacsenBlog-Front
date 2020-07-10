<template>
  <div class="cover" :style="{ 'backgroundImage': `url(${swiperList[index].imgUrl})` }">
    <div class="container">
      <el-row>
        <el-col :span="24">
          <div class="title center-align">{{ swiperList[index].title }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="signature center-align">
            <typed :signature="swiperList[index].signature"></typed>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import typed from '../Home/Typed'
export default {
  name: 'cover',
  components: {
    typed
  },
  data () {
    return {
      // 随机换cover的背景图片
      index: 0
    }
  },
  created () {
    this.$store.dispatch('common/getSwiperList')
    this.index = parseInt(Math.random() * (this.swiperList.length), 10)
  },
  computed: {
    ...mapState({
      swiperList: state => state.common.swiperList
    })
  }
}
</script>

<style lang="less" scoped>
  @import './src/assets/css/variables';
  .cover {
    width: 100%;
    height: 60vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    &:after {
      animation: rainbow 90s infinite;
    }

    &:before,
    &:after {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      display: block;
      left: 0;
      top: 0;
      content: '';
    }

    .container {
      z-index: 2;

      .title {
        color: @color;
        font-size: 4rem;
        line-height: 1.85em;
        margin-bottom: 20px;
      }

      .signature {
        font-weight: 300;
        font-size: 1.25rem;
        line-height: 1.4em;
        color: @color;
      }
    }
  }
</style>
