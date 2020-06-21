<template>
  <div id="carouselCard">
    <el-card :body-style="{ padding: '0px' }">
      <el-carousel :interval="4000" direction="vertical" height="300px">
        <el-carousel-item v-for="(image, index) in carouselList" :key="index">
          <el-image :src="image.url" fit="cover"></el-image>
          <el-row class="profile">
            <div class="title">{{ image.title }}</div>
            <div class="content">
              {{ image.content }}
            </div>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script>
import VueSticky from 'vue-sticky'
export default {
  directives: {
    sticky: VueSticky
  },
  data () {
    return {
      carouselList: []
    }
  },
  created () {
    this.getCarouselList()
  },
  methods: {
    async getCarouselList () {
      const { data } = await this.$http.get('carouselList')
      this.carouselList = data
    }
  }
}
</script>

<style lang="less" scoped>
  #carouselCard {
    .el-card {
      .el-carousel {
        .el-carousel__item {
          .el-image {
            position: relative;
          }
          .profile {
            width: 90%;
            position: absolute;
            bottom: 20px;
            left: 20px;
            .title {
              color: #F5F5F5;
              font-size: 2rem;
            }
            .content {
              color: #F5F5F5;
            }
          }
        }
      }
    }
  }
</style>
