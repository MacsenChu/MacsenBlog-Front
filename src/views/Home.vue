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
    <div id="aplayerCore"></div>
    <div id="indexCard" ref="indexCard">
        <!-- infinite-scroll-disabled false是执行loadMore，true是不执行 -->
      <el-row>
        <el-col v-if="articleList.length > 0" :lg="18" :md="18" v-infinite-scroll="loadMore" infinite-scroll-disabled="infinite_scroll_disabled" infinite-scroll-distance="0">
          <item-card v-for="article in articleList" :key="article.id" :article="article" :delay="200"></item-card>
          <loading-card :loading="!loading"></loading-card>
        </el-col>
        <!-- 这两个元素都用scrollreveal总是有那么些问题 这里选择了又引入了wow.js, 我功力不够，这个项目的优化空间非常大 -->
        <el-col :lg="6" :md="6" class="hidden-sm-and-down sideCard">
          <!-- vue-sticky 让侧边这几个子元素滚动到一定的位置定住，左边无限滚动 -->
          <div v-sticky="sticky" ref="asideStick" id="asideStick" class="wow bounceInRight" style="animation-delay: 0s; animation-duration: 750ms;">
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
import { mapState } from 'vuex'
import { WOW } from 'wowjs'
import typed from '../components/Home/Typed'
import itemCard from '../components/common/ItemCard'
import myCard from '../components/common/MyCard'
import carouselCard from '../components/common/CarouselCard'
import loadingCard from '../components/common/LoadingCard'
import footerCard from '../components/common/FooterCard'
import socialLink from '../components/common/SocialLink'
import VueSticky from 'vue-sticky'
import APlayer from 'aplayer'
import 'aplayer/dist/APlayer.min.css'
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
      limit: 10,
      offset: 0,
      articleList: [{
        id: 1,
        title: 'Something went wrong...Please send an email to MacsenChu@gmail.com Contact me',
        cover: require('../assets/images/500.png'),
        author: 'Macsen',
        avatar: require('../assets/images/avatar.jpeg'),
        createTime: new Date(),
        tags: [{}],
        category: {},
        likesCount: 0,
        commentsCount: 0
      }],
      loading: false,
      screenHeight: document.documentElement.clientHeight,
      sticky: {
        stickyTop: 0,
        disabled: false
      },
      music: []
    }
  },
  created () {
    this.$store.dispatch('common/getSwiperList')
    this.getArticleList(this.offset)
    this.getMusic()
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
    ...mapState({
      swiperList: state => state.common.swiperList
    }),
    infinite_scroll_disabled () {
      return this.loading
    }
  },
  methods: {
    async getArticleList (offset) {
      try {
        const { data: res } = await this.$http.get('article', {
          params: {
            limit: this.limit,
            offset: offset * this.limit
          }
        })
        if (res.code === 200) {
          this.articleList.length = 0
          this.articleList.push.apply(this.articleList, res.data)
        } else {
          return this.$message.error(res.message)
        }
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
        const { data: res } = await this.$http.get('article', {
          params: {
            limit: this.limit,
            offset: ++this.offset * this.limit
          }
        })
        if (res.code === 200) {
          this.articleList.push.apply(this.articleList, res.data)
          this.loading = false
        } else {
          this.loading = true
        }
      } catch (e) {
        this.loading = true
      }
    },
    async getMusic () {
      try {
        const { data: res } = await this.$http.get('musics')
        if (res.code === 200) {
          this.music = res.data
          this.initAplayer()
        }
      } catch (e) {
        console.log(e)
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
    },
    initAplayer () {
      /* eslint-disable no-new */
      new APlayer({
        container: document.getElementById('aplayerCore'),
        fixed: true,
        autoplay: false,
        loop: 'all',
        order: 'list',
        preload: 'auto',
        volume: 0.7,
        mutex: true,
        listFolded: true,
        listMaxHeight: 90,
        lrcType: 1,
        audio: this.music
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
    /deep/ .aplayer .aplayer-lrc p {
      font-size: 12px;
      font-weight: 700;
      line-height: 16px !important;
    }
    /deep/ .aplayer .aplayer-lrc p.aplayer-lrc-current {
      font-size: 15px;
      color: #42b983;
    }
    /deep/ .aplayer.aplayer-fixed.aplayer-narrow .aplayer-body {
      left: -66px !important;
    }
    @media screen and (min-width: 750px) {
      /deep/ .aplayer.aplayer-fixed.aplayer-narrow .aplayer-body:hover {
        left: 0px !important;
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
