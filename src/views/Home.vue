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
          <item-card v-for="article in articleList" :key="article.id" :article="article"></item-card>
          <loading-card :loading="!loading"></loading-card>
        </el-col>
        <!-- 这两个元素都用scrollreveal总是有那么些问题 这里选择了又引入了wow.js, 我技术太差了，这个项目的优化空间非常大 -->
        <el-col :lg="6" :md="6" class="hidden-sm-and-down sideCard">
          <!-- vue-sticky 让侧边这几个子元素滚动到一定的位置定住，左边无限滚动 -->
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
        tag: '',
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
    this.$store.dispatch('common/getSwiperList')
    this.getArticleList(this.offset)
  },
  mounted () {
    new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      mobile: false,
      live: false
    }).init()
    /* eslint-disable no-new */
    new APlayer({
      container: document.getElementById('aplayerCore'),
      fixed: true,
      autoplay: false,
      theme: '#FADFA3',
      loop: 'all',
      order: 'list',
      preload: 'auto',
      volume: 0.7,
      mutex: true,
      listFolded: true,
      listMaxHeight: 90,
      lrcType: 1,
      audio: [
        {
          name: 'そばにいるね',
          artist: '青山テルマ',
          url: 'https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcUMxQkwwWkdfYnFsV0ZINVJxNUQtMzhJRzhhP2U9WFliczZO.mp3',
          cover: 'http://p2.music.126.net/GFbvZasO56D_Co6Rr31srA==/109951163089243761.jpg?param=130y130',
          lrc: '[00:00.000] 作曲 : Soulja\n' +
            '[00:01.000] 作词 : Soulja、青山テルマ\n' +
            '[00:12.200]あなたのこと 私は今でも\n' +
            '[00:14.690]思い続けているよ\n' +
            '[00:17.780]いくら時流れて行こうと\n' +
            '[00:20.620]I\'m by your side baby いつでも\n' +
            '[00:23.820]So. どんなに離れていようと\n' +
            '[00:26.710]心の中では  いつでも\n' +
            '[00:29.660]一緒にいるけど 寂しいんだよ\n' +
            '[00:32.610]So baby please ただ hurry back home\n' +
            '[00:35.170]\n' +
            '[00:35.750]Baby boy あたしはここにいるよ\n' +
            '[00:39.870]どこもいかずに待ってるよ\n' +
            '[00:42.720]You know dat I love you だからこそ\n' +
            '[00:45.720]心配しなくていいんだよ\n' +
            '[00:48.810]どんなに遠くにいても\n' +
            '[00:51.820]変わらないよこの心\n' +
            '[00:54.970]言いたい事わかるでしょ?\n' +
            '[00:57.850]あなたのこと待ってるよ\n' +
            '[00:59.400]\n' +
            '[01:00.240]BOY(SoulJa):\n' +
            '[01:01.130]んなことよりお 前の方は元気か?\n' +
            '[01:04.250]ちゃんと飯食ってるか?\n' +
            '[01:06.530]ちくしょう、やっぱ言えねぇや\n' +
            '[01:08.790]また今度送るよ 俺からの\n' +
            '[01:10.830]\n' +
            '[01:11.630]GIRL(青山テルマ)\n' +
            '[01:12.260]過ぎ去った時は戻せないけれど\n' +
            '[01:17.590]近くにいてくれた君が恋しいの\n' +
            '[01:23.790]だけど あなたとの距離が遠くなる程に\n' +
            '[01:29.410]忙しくみせていた\n' +
            '[01:32.340]あたし逃げてたの\n' +
            '[01:35.680]だけど 目を閉じる時 眠ろうとする時\n' +
            '[01:39.170]逃げきれないよ あなたの事\n' +
            '[01:43.130]思い出しては 一人泣いてたの\n' +
            '[01:47.440]\n' +
            '[01:48.000]あなたのこと  私は今でも\n' +
            '[01:50.530]思い続けているよ\n' +
            '[01:53.600]いくら時流れて行こうと\n' +
            '[01:56.490]I\'m by your side baby いつでも\n' +
            '[01:59.670]So. どんなに離れていようと\n' +
            '[02:02.550]心の中では いつでも\n' +
            '[02:05.540]一緒にいるけど 寂しいんだよ\n' +
            '[02:08.510]So baby please ただ hurry back home\n' +
            '[02:11.160]\n' +
            '[02:11.710]Baby boy あたしはここにいるよ\n' +
            '[02:15.720]どこもいかずに待ってるよ\n' +
            '[02:18.800]You know dat I love you だからこそ\n' +
            '[02:21.860]心配しなくていいんだよ\n' +
            '[02:24.670]どんなに遠くにいても\n' +
            '[02:27.830]変わらないよこの心\n' +
            '[02:30.750]言いたい事わかるでしょ?\n' +
            '[02:33.810]あなたのこと待ってるよ\n' +
            '[02:35.400]\n' +
            '[02:36.050]BOY(SoulJa):\n' +
            '[02:36.920]不器用な俺 遠くにいる君\n' +
            '[02:39.490]伝えたい気持ちそのまま言えずに\n' +
            '[02:42.340]君は行っちまった\n' +
            '[02:44.740]今じゃ殘された君はアルバムの中\n' +
            '[02:46.600]\n' +
            '[02:47.200]GIRL(青山テルマ)\n' +
            '[02:47.950]アルバムの中 納めた思い出の\n' +
            '[02:53.410]日々より 何げない一時が\n' +
            '[02:56.680]今じゃ戀しいの\n' +
            '[02:58.810]（BOY:君のぬくもり\n' +
            '[02:59.680]And now あなたからの電話待ち続けていた\n' +
            '[03:05.630]攜帯にぎりしめながら眠りについた\n' +
            '[03:10.930]（BOY:抱きしめてやりたい\n' +
            '[03:11.970]あたしは どこも行かない\n' +
            '[03:13.880]ここにいるけれど\n' +
            '[03:15.390]見つめ合いたいあなたのその瞳\n' +
            '[03:19.190]ねぇわかるでしょ? あたし待ってるよ\n' +
            '[03:24.190]\n' +
            '[03:35.680]Baby boy あたしはここにいるよ\n' +
            '[03:39.670]どこもいかずに待ってるよ\n' +
            '[03:42.720]You know dat I love you だからこそ\n' +
            '[03:46.000]心配しなくていいんだよ\n' +
            '[03:48.820]どんなに遠くにいても\n' +
            '[03:51.900]変わらないよこの心\n' +
            '[03:54.910]言いたい事わかるでしょ?\n' +
            '[03:57.760]あなたのこと待ってるよ\n' +
            '[03:59.200]\n' +
            '[03:59.700]BOY(SoulJa):\n' +
            '[04:00.200]俺はどこも行かないよ\n' +
            '[04:01.710]ここにいるけれど\n' +
            '[04:03.350]探し続けるあなたの顏\n' +
            '[04:06.000]Your 笑顏 今でも觸れそうだって\n' +
            '[04:09.300]思いながら手を伸ばせば 君は\n' +
            '[04:11.800]\n' +
            '[04:12.210]GIRL(青山テルマ)\n' +
            '[04:12.890]あなたのこと 私は今でも\n' +
            '[04:14.670]思い続けているよ\n' +
            '[04:17.630]いくら時流れて行こうと\n' +
            '[04:20.650]I\'m by your side baby いつでも\n' +
            '[04:23.590]So. どんなに離れていようと\n' +
            '[04:26.520]心の中では  いつでも\n' +
            '[04:29.590]一緒にいるけど 寂しいんだよ\n' +
            '[04:32.630]So baby please ただ hurry back home\n' +
            '[04:35.070]\n' +
            '[04:35.850]あなたのこと 私は今でも\n' +
            '[04:38.750]思い続けているよ\n' +
            '[04:41.880]いくら時流れて行こうと\n' +
            '[04:44.600]I\'m by your side baby いつでも\n' +
            '[04:47.660]So. どんなに離れていようと\n' +
            '[04:50.530]心の中では  いつでも\n' +
            '[04:53.570]一緒にいるけど 寂しいんだよ\n' +
            '[04:56.610]So baby please ただ hurry back hom',
          theme: '#46718b'
        }
      ]
    })
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
