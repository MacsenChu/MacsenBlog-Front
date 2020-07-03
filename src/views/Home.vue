<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="swiper of swiperList" :key="swiper.id" :class="{ 'swiper-no-swiping': manualSwiping }">
        <div :style="{ backgroundImage: `url(${swiper.imgUrl})` }" class="bgCover">
          <div class="container">
            <el-row>
              <el-col :span="24">
                <div class="title center-align">{{ swiper.title }}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="signature center-align">
                  <typed :signature="swiper.signature"></typed>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="cover-btns center-align">
                  <a @click="startRead" class="waves-effect waves-light">
                    <i class="iconfont icon-angle-double-down"></i>
                    <span>开始阅读</span>
                  </a>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <social-link color="#F5F5F5" placement="top"></social-link>
              </el-col>
            </el-row>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div id="indexCard" ref="indexCard">
      <el-row>
        <!-- infinite-scroll-disabled false是执行loadMore，true是不执行 -->
        <el-col v-if="articleList.length > 0" :lg="18" :md="18" v-infinite-scroll="loadMore" infinite-scroll-disabled="infinite_scroll_disabled" infinite-scroll-distance="0">
          <item-card v-for="article in articleList" :key="article.id" :article="article"></item-card>
          <loading-card :loading="!loading"></loading-card>
        </el-col>
        <!-- 这两个元素都用scrollreveal总是有那么些问题 这里选择了又引入了wow.js, 我技术太差了，这个项目的优化空间非常大 -->
        <el-col :lg="6" :md="6" class="hidden-sm-and-down sideCard">
          <!-- vue-sticky 让侧边这几个子元素滚动到一定的位置定住，右边无限滚动 -->
          <div v-sticky="sticky" ref="asideStick" id="asideStick" class="wow bounceInRight">
             <my-card></my-card>
             <carousel-card></carousel-card>
             <footer-card></footer-card>
          </div>
        </el-col>
      </el-row>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { WOW } from 'wowjs'
import typed from '../components/Home/Typed'
import itemCard from '../components/common/ItemCard'
import myCard from '../components/common/MyCard'
import carouselCard from '../components/common/CarouselCard'
import loadingCard from '../components/common/LoadingCard'
import footerCard from '../components/common/FooterCard'
import socialLink from '../components/common/SocialLink'
import VueSticky from 'vue-sticky'
export default {
  components: {
    Swiper,
    SwiperSlide,
    typed,
    itemCard,
    myCard,
    carouselCard,
    loadingCard,
    footerCard,
    socialLink
  },
  directives: {
    sticky: VueSticky
  },
  data () {
    return {
      swiperOption: {
        // 参数选项,显示小点
        pagination: {
          el: '.swiper-pagination'
        },
        // 循环
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 10000,
          // 操作 swiper 后，不停止切换
          disableOnInteraction: false
        }
      },
      manualSwiping: true,
      swiperList: [
        {
          id: 1,
          title: 'Macsen',
          signature: '"你要藏好软弱，世界大雨滂沱。万物苟且而活，无人为你背负更多。"',
          imgUrl: require('../assets/images/swiper1.jpg')
        },
        {
          id: 2,
          title: 'Macsen',
          signature: '"人的内心不种满鲜花就会长满杂草。"',
          imgUrl: require('../assets/images/swiper2.jpg')
        },
        {
          id: 3,
          title: 'Macsen',
          signature: '当我走遍了1——17层地狱分毫未伤时，我走到了18层，你却对我说“欢迎来到人间”。',
          imgUrl: require('../assets/images/swiper3.jpg')
        },
        {
          id: 4,
          title: 'Macsen',
          signature: 'When I went through 1-17 layers of hell without any harm, I went to the 18th floor, but you said "welcome to the world。"',
          imgUrl: require('../assets/images/swiper4.jpg')
        },
        {
          id: 5,
          title: 'Macsen',
          signature: '"如果我不曾见过太阳，我本可以忍受黑暗。"',
          imgUrl: require('../assets/images/swiper5.jpg')
        },
        {
          id: 6,
          title: 'Macsen',
          signature: '"我在人间凑数的日子。"',
          imgUrl: require('../assets/images/swiper6.jpg')
        }
      ],
      limit: 10,
      offset: 0,
      articleList: [{
        id: 1,
        title: 'Something went wrong...Please send an email to MacsenChu@gmail.com Contact me',
        cover: require('../assets/images/500.png'),
        author: 'Macsen',
        avatar: require('../assets/images/avatar.jpeg'),
        createTime: new Date(),
        likesCount: 0,
        commentsCount: 0
      }],
      loading: false,
      screenHeight: document.documentElement.clientHeight,
      sticky: {
        stickyTop: 0,
        disabled: false
      }
    }
  },
  created () {
    this.getSwiperList()
    this.getArticleList(this.offset)
  },
  mounted () {
    new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      mobile: false,
      live: false
    }).init()
  },
  computed: {
    infinite_scroll_disabled () {
      return this.loading
    }
  },
  methods: {
    async getSwiperList () {
      try {
        const { data } = await this.$http.get('swiperList')
        this.swiperList = data
      } catch (e) {
        console.log(e)
      }
    },
    async getArticleList (offset) {
      try {
        // const { data } = await this.$http.get(`articleList?limit=${this.limit}&offset=${offset * this.limit}`)
        const { data } = await this.$http.get('articleList', {
          params: {
            limit: this.limit,
            offset: offset * this.limit
          }
        })
        this.articleList.length = 0
        this.articleList.push.apply(this.articleList, data)
      } catch (e) {
        console.log(e)
      }
      // 之前我是用myCard渲染完之后，触发父组件的函数，设置sticktop
      // 用后端测试时，我自己手动创建pojo类的list，没有问题，但是换成数据库查的时候，元素高度永远会大那么一些
      // 那么问题一定在这里，所以换掉之前的方式，在第一次获取文章列表的时候，此时获取到的元素高度正常
      this.setStickTop()
    },
    startRead () {
      const indexCard = this.$refs.indexCard
      const total = indexCard.offsetTop
      $('html, body').animate({ scrollTop: total - 54 }, 350, 'swing')
    },
    async loadMore () {
      this.loading = true
      try {
        // const { data } = await this.$http.get(`articleList?limit=${this.limit}&offset=${++this.offset * this.limit}`)
        const { data } = await this.$http.get('articleList', {
          params: {
            limit: this.limit,
            offset: ++this.offset * this.limit
          }
        })
        if (data.length !== 0) {
          this.articleList.push.apply(this.articleList, data)
          this.loading = false
        } else {
          this.loading = true
        }
      } catch (e) {
        this.loading = true
      }
    },
    setStickTop () {
      this.$nextTick(_ => {
        const clientHeight = this.$refs.asideStick.clientHeight
        // 设元素高为x，当前屏幕高为y，如果想让到底的时候固定住，那么stickTop的值为-(x-y)
        // stickTop = - (x - y)
        if (clientHeight >= this.screenHeight) {
          this.sticky.stickyTop = this.screenHeight - clientHeight
        } else {
          // 导航栏高是60
          this.sticky.stickyTop = 75
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
  @import './src/assets/css/variables';
  div {
    .swiper-container {
      .swiper-slide {
        div.bgCover {
          height: 100vh;
          width: 100vw;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          display: flex;
          justify-content: center;
          align-items: center;

          &:after {
            -webkit-animation: rainbow 90s infinite;
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
            .cover-btns {
              position: relative;
              top: 10vh;
              text-align: center;
              a {
                margin: 10px 15px;
                padding: 0 35px;
                height: 45px;
                line-height: 45px;
                font-size: 1rem;
                color: @color;
                border: 1px solid @color;
                background-color: transparent;
                border-radius: 30px;
                box-shadow: none;
                &:hover {
                  border: 1px solid #FC0000;
                  background-color: #FC0000;
                  box-shadow: 0 14px 26px -12px rgba(233, 30, 99, 0.42),
                  0 4px 23px 0 rgba(0, 0, 0, 0.12),
                  0 8px 10px -5px rgba(233, 30, 99, 0.2);
                }
                i {
                  font-size: 1.1rem;
                  padding-right: 5px;
                }
              }
            }
            .cover-social-link {
              position: relative;
              top: 23vh;
              width: 100%;
              text-align: center;
              a {
                padding: 0 15px;
                color:  @color;
                i {
                  font-size: 1.35em;
                }
              }
            }
          }
        }
      }
    }
    #indexCard {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px 0;
      display:flex;
      .el-row {
        margin: 0 auto;
        .sideCard {
          height: 100%;
          padding: 0 15px 0 0;
          & div > * {
            margin-bottom: 15px;
          }
        }
      }
    }
  }
</style>
