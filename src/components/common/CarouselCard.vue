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
      carouselList: [
        {
          id: 1,
          url: require('../../assets/images/carousel1.jpg'),
          title: 'Macsen',
          content: '你可以为一个人卑微到尘埃里，但没人会爱尘埃中的你'
        },
        {
          id: 2,
          url: require('../../assets/images/carousel2.jpg'),
          title: 'Macsen',
          content: '即便无人问我粥可温，无人与我立黄昏，仍等你契合灵魂，赠与无限温存'
        },
        {
          id: 3,
          url: require('../../assets/images/carousel3.png'),
          title: 'Macsen',
          content: '且听风吟，静待花开'
        },
        {
          id: 4,
          url: require('../../assets/images/carousel4.jpg'),
          title: 'Macsen',
          content: '念念不忘，必有回响。若无回响，必有一伤'
        }
      ]
    }
  },
  created () {
    this.getCarouselList()
  },
  methods: {
    async getCarouselList () {
      try {
        const { data: res } = await this.$http.get('carousels')
        if (res.code === 200) {
          this.carouselList = res.data
        }
      } catch (e) {
        console.log(e)
      }
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
