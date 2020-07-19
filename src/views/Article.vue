<template>
  <div id="article">
    <div id="articleCover" :style="{ 'backgroundImage': `url(${article.cover})` }" class="bgCover">
      <div id="title" class="animated fadeIn">{{ article.title }}</div>
    </div>
    <div id="container">
      <el-row>
        <el-col :lg="19" :md="19">
          <el-card id="articleDetail" class="animated fadeInDown">
              <div id="articleInfo">
                <div id="tag">
                  <el-tag v-for="(tag, index) in article.tags" :key="index" size="small" effect="plain">
                    {{ tag.tag }}
                  </el-tag>
                </div>
                <div id="categories">
                  <i class="iconfont icon-book-mark">
                    <span>{{ article.category.category }}</span>
                  </i>
                </div>
              </div>
              <div id="articleProperty">
                <i class="iconfont icon-calendar-minus">
                  <span>发布日期: {{ article.createTime | dateFormatToDate }}</span>
                </i>
                <i class="iconfont icon-calendar-check">
                  <span>更新日期: {{ article.updateTime | dateFormatToDate }}</span>
                </i>
                <i class="iconfont icon-file-word">
                  <span>文章字数: {{ article.content.length | numberOfWords }}</span>
                </i>
                <i class="iconfont icon-clock">
                  <span>阅读时长: {{ article.content.length | readingTime }}min</span>
                </i>
                <i class="iconfont icon-eye">
                  <span>阅读总量: {{ article.readCount }}</span>
                </i>
              </div>
              <el-divider></el-divider>
              <div id="content" class="typo js-toc-content" ref="content" v-html="article.content"></div>
              <el-divider></el-divider>
              <el-card shadow="hover" class="statement" :body-style="{ padding: '12px' }">
                <div>
                  <i class="iconfont icon-userfull"></i>
                  <span>文章作者:</span>
                  <a :href=article.originalUrl v-if="article.original">{{ article.author }}</a>
                </div>
                <div>
                  <i class="iconfont icon-link"></i>
                  <span>文章链接:</span>
                  <a :href="article.originalUrl + 'article/' + route" v-if="article.original">{{ article.originalUrl + 'article/' + route }}</a>
                  <a href="article.originalUrl" v-else>{{ article.originalUrl }}</a>
                </div>
                <div>
                  <i class="iconfont icon-copyright"></i>
                  <span>版本声明:</span>本站点采用 知识共享
                  <a style="padding:0 3px;" href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh" target="_blank">署名-非商业性使用-禁止演绎 4.0 国际</a>许可协议</div>
              </el-card>
              <div class="typeAndShare">
                <div class="type">
                  <el-tag type="success" size="medium" v-if="article.original">原创</el-tag>
                  <el-tag type="warning" size="medium" v-else>转载</el-tag>
                </div>
                <div class="share">
                  <el-tooltip effect="dark" content="分享到Twitter" placement="top">
                    <a :href="twitterShareUrl" target="_blank"><i class="iconfont icon-tuite"></i></a>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="分享到FaceBook" placement="top">
                    <a :href="facebookShareUrl" target="_blank"><i class="iconfont icon-facebook"></i></a>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="分享到QQ" placement="top">
                    <a :href="qqShareUrl" target="_blank"><i class="iconfont icon-qq"></i></a>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="分享到QQ空间" placement="top">
                    <a :href="qqZoneShareUrl" target="_blank"><i class="iconfont icon-QQkongjian"></i></a>
                  </el-tooltip>
                  <el-tooltip effect="dark" placement="top">
                    <div slot="content">
                      <el-row>
                        <img :src="urlQRCode" width="100px" id="qrcode" ref="qrcode">
                      </el-row>
                      <el-row>
                        <el-col class="center-align">
                          <span>分享到微信</span>
                        </el-col>
                      </el-row>
                    </div>
                    <a href="javascript:void(0);"><i class="iconfont icon-wechat"></i></a>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="分享到微博" placement="top">
                    <a :href="weiboShareUrl" target="_blank"><i class="iconfont icon-weibo"></i></a>
                  </el-tooltip>
                </div>
              </div>
              <el-card class="charge">
                <div :class="['chargeIcon', isCharge ? 'focus' : '']" @click="charge()">
                  <i class="iconfont icon-shandian-full"></i><span>{{ article.likesCount | countFilter }}</span>
                </div>
              </el-card>
            </el-card>
          <comments-card :comments="article.comments ? article.comments : []" :commentsCount="article.commentsCount" @submitComment="submitComment">
            <template v-slot:commentsName>评论</template>
            <template v-slot:commentsCount>{{ article.commentsCount }} <span>条评论</span></template>
          </comments-card>
          <div class="otherArticle">
            <el-card :body-style="{ padding: '0px' }" v-for="(preAndNextArticle, index) in article.preAndNextArticle" :key="preAndNextArticle.id" data-aos="fade-up">
              <el-row>
                <router-link :to="/article/ + preAndNextArticle.id" @click.native="$router.go(0)">
                  <el-image :src="preAndNextArticle.cover" fit="cover"></el-image>
                </router-link>
                <el-row class="userInfo">
                  <el-avatar :size="24" :src="preAndNextArticle.avatar" />
                  <span class="author">{{ preAndNextArticle.author }}</span>
                  <span class="date-text">{{ preAndNextArticle.createTime | dateFormatToDate }}</span>
                </el-row>
                <span class="property" v-if="preAndNextArticle.id < article.id"><i class="iconfont icon-shangyipian"></i>上一篇</span>
                <span class="property" v-else-if="preAndNextArticle.id > article.id">下一篇<i class="iconfont icon-xiayipian"></i></span>
                <span class="property" v-else-if="preAndNextArticle.id === article.id && index === 0"><i class="iconfont icon-dangqian"></i>本篇</span>
                <span class="property" v-else-if="preAndNextArticle.id === article.id && index === 1">本篇<i class="iconfont icon-dangqian"></i></span>
              </el-row>
              <el-row>
                <router-link :to="/article/ + preAndNextArticle.id">
                  <div class="title">{{ preAndNextArticle.title }}</div>
                </router-link>
              </el-row>
            </el-card>
          </div>
        </el-col>
        <el-col :lg="5" :md="5" class="hidden-sm-and-down sideCard">
          <div v-sticky="sticky">
            <div class="catalogTitle">
                <i class="iconfont icon-list-alt"></i><span>目录</span>
            </div>
            <div class="reveal-fadeInRight">
              <el-card id="catalog" class="js-toc"></el-card>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as tocbot from 'tocbot'
import VueSticky from 'vue-sticky'
import scrollReveal from 'scrollreveal'
import QRCode from 'qrcode'
import commentsCard from '../components/common/CommentsCard'
// 导入prism.js
import prismjs from 'prismjs'
import dectect from '../../utils/detect'
import AOS from 'aos'
import 'aos/dist/aos.css'
export default {
  components: {
    commentsCard
  },
  directives: {
    sticky: VueSticky
  },
  data () {
    return {
      route: this.$route.params.articleId,
      scrollReveal: scrollReveal(),
      article: {
        tag: '',
        content: '',
        category: {}
      },
      isCharge: false,
      urlQRCode: '',
      sticky: {
        stickyTop: 75,
        disabled: false
      }
    }
  },
  created () {
    this.getArticleById(this.route)
  },
  mounted () {
    AOS.init()
    this.scrollReveal.reveal('.reveal-fadeInRight', {
      duration: 350,
      delay: 200,
      origin: 'right',
      reset: false,
      mobile: true,
      distance: '200px',
      easing: 'ease-out',
      scale: 0.9
    })
  },
  methods: {
    async getArticleById (id) {
      const { data: res } = await this.$http.get(`article/${id}`)
      if (res.code === 404) {
        // 等我过一阵子写个404页面 直接编程式导航跳转过去
      } else if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      this.article = res.data
      this.$nextTick(_ => {
        tocbot.init({
          tocSelector: '.js-toc',
          contentSelector: '.js-toc-content',
          headingSelector: 'h1, h2, h3, h4',
          hasInnerContainers: true,
          positionFixedSelector: '.js-toc',
          positionFixedClass: 'is-position-fixed',
          fixedSidebarOffset: 'auto',
          scrollSmooth: true,
          scrollSmoothOffset: -80,
          headingsOffset: 75
        })
        prismjs.highlightAll()
      })
      if (localStorage.getItem(`article:isCharge:${this.article.id}`)) {
        this.isCharge = localStorage.getItem(`article:isCharge:${this.article.id}`)
      }
      await this.qrcode()
    },
    async qrcode () {
      try {
        this.urlQRCode = await QRCode.toDataURL(this.article.originalUrl + 'article/' + this.route, {
          errorCorrectionLevel: 'H',
          type: 'image/jpeg',
          quality: 0.3,
          margin: 1,
          color: {
            dark: '#000',
            light: '#FFF'
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async charge () {
      if (this.isCharge) {
        try {
          const { data: res } = await this.$http.post('article/like', {
            articleId: this.article.id,
            isCharge: this.isCharge
          })
          if (res.code !== 201) {
            return this.$message.error(res.message)
          }
          this.isCharge = false
          // 点完赞也没必要再获取一遍，直接修改值(就算是想获取 我也没写获取点赞数的接口 (*^▽^*))
          this.article.likesCount--
          localStorage.removeItem(`article:isCharge:${this.article.id}`)
          this.$message.info('已取消充电！')
        } catch (e) {
          // 点个赞失败了又能咋地……咱也不是拼多多砍一刀
          console.log(e)
        }
      } else {
        try {
          const { data: res } = await this.$http.post('article/like', {
            articleId: this.article.id,
            isCharge: this.isCharge
          })
          if (res.code !== 201) {
            return this.$message.error(res.message)
          }
          this.isCharge = true
          this.article.likesCount++
          // 无登录点赞，没有好的解决方式，这里采用存到localStorage
          localStorage.setItem(`article:isCharge:${this.article.id}`, true)
          this.$message.success('充电成功，感谢您的支持！')
        } catch (e) {
          // 点个赞失败了又能咋地……咱也不是拼多多砍一刀
          console.log(e)
        }
      }
    },
    async submitComment (userInputComment, ticket, randstr) {
      try {
        const { data: res } = await this.$http.post('article/comment', {
          ...userInputComment,
          ...{ articleId: this.article.id },
          ...{ systemInfo: `${dectect().browser} ${dectect().version},${dectect().os} ${dectect().osVersion}` },
          ...{ ticket },
          ...{ randstr }
        })
        if (res.code !== 201) {
          return this.$message.error(res.message)
        }
        if (userInputComment.replyType === 'reply' || userInputComment.replyType === 'comment') {
          this.$message.success('回复' + userInputComment.toName + '成功！')
        } else {
          this.$message.success('留言成功!')
        }
        // 评论数没必要特别精准（又没人数），这里不准备重新请求服务器获取评论数了，直接加1（反正我也没写接口）
        this.article.commentsCount++
        await this.getComments()
      } catch (e) {
        if (userInputComment.replyType === 'reply' || userInputComment.replyType === 'comment') {
          this.$message.error('回复' + userInputComment.toName + '失败！')
        } else {
          this.$message.error('留言失败')
        }
        console.log(e)
      }
    },
    async getComments () {
      try {
        const { data: res } = await this.$http.get('article/comments/' + this.article.id)
        this.comments = res.data
        if (res.code === 200) {
          this.article.comments = res.data
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {
    twitterShareUrl () {
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.article.title + " | Macsen's Blog")}&url=${encodeURIComponent(this.article.originalUrl + 'article/' + this.route)}/&via=${encodeURIComponent('http://wwww.macsen.xyz')}`
    },
    facebookShareUrl () {
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.article.title + " | Macsen's Blog")}`
    },
    qqShareUrl () {
      return `http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(this.article.originalUrl + 'article/' + this.route)}/&title=${encodeURIComponent(this.article.title + " | Macsen's Blog")}&source=${encodeURIComponent(this.article.title + " | Macsen's Blog")}`
    },
    qqZoneShareUrl () {
      return `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(this.article.originalUrl + 'article/' + this.route)}/&title=${encodeURIComponent(this.article.title + " | Macsen's Blog")}&source=${encodeURIComponent(this.article.title + " | Macsen's Blog")}&pics=${encodeURIComponent(this.article.cover)}`
    },
    weiboShareUrl () {
      return `https://service.weibo.com/share/share.php?url=${encodeURIComponent(this.article.originalUrl + 'article/' + this.route)}/&title=${encodeURIComponent(this.article.title + " | Macsen's Blog")}&source=${encodeURIComponent(this.article.title + " | Macsen's Blog")}&pic=${encodeURIComponent(this.article.cover)}`
    }
  }
}
</script>

<style lang="less" scoped>
  @import "~typo.css";
  @import './src/assets/css/variables';
  @import '~tocbot/dist/tocbot.css';
  #article {
    min-height: 100%;
    #articleCover {
      height: 40vh;
      width: 100%;
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

      #title {
        z-index: 2;
        font-size: 2.5rem;
        font-weight: 400;
        line-height: 1.4em;
        text-align: center;
        padding: 0 15px;
        color: @color;
      }
    }

    #container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px 0;
      position: relative;
      z-index: 2;

      .el-row {
        margin: 0 auto;
        display: flex;
        .el-col {
          @media screen and (min-width: 800px) {
            padding: 0 15px;
          }
          @media screen and (max-width: 800px) {
            padding: 0 10px;
          }
          #articleDetail {
            margin-top: -75px;
            border-radius: 8px;
            @media screen and (min-width: 800px) {
              padding: 5px 20px;
            }
            @media screen and (max-width: 800px) {
              padding: 0;
              /deep/ .el-card__body {
                padding: 15px 10px;
              }
            }
            #articleInfo {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .el-tag {
                border-radius: 15px;
                padding: 0 15px;
                margin: 1px 3px 1px 0;
              }

              #categories {
                i {
                  color: @articleColor;
                  font-weight: 500;
                  white-space: nowrap;
                }
              }
            }

            #articleProperty {
              color: @articleColor;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              flex-wrap: wrap;
              @media screen and (min-width: 800px) {
                margin-top: 30px;
              }
              @media screen and (max-width: 800px) {
                margin-top: 20px;
              }
              font-weight: 500;

              span {
                padding: 0 2px;
                font-size: 14px;
                white-space: nowrap;
              }

              @media screen and (max-width: 800px) {
                i {
                  width: 50%;
                }
              }

              @media screen and (max-width: 360px) {
                i {
                  width: 55%;
                }
              }
            }

            .el-divider {
              margin-top: 5px;
            }

            .statement {
              color: @articleColor;
              font-weight: 500;
              div {
                line-height: 30px;
                span {
                  padding: 0 5px;
                }
              }
            }
            .typeAndShare {
              padding: 6px 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .type {
                .el-tag {
                  border-radius: 20px;
                  padding: 0 20px;
                  font-size: 14px;
                }
              }
              .share {
                .el-tooltip {
                  margin-left: 10px;
                  a {
                    -webkit-tap-highlight-color: transparent;
                    outline: none !important;
                  }
                  i {
                    padding: 5px;
                    border-radius: 50%;
                  }
                  .icon-tuite {
                    color: #00a0ee;
                    border: 1px solid #00a0ee;
                    transition: all .2s;
                  }
                  .icon-tuite:hover {
                    background-color: #00a0ee;
                    color: #fff;
                  }
                  .icon-facebook {
                    color: #42609b;
                    border: 1px solid #42609b;
                    padding-left: 6px;
                    padding-right: 4px;
                    transition: all .2s;
                  }
                  .icon-facebook:hover {
                    background-color: #42609b;
                    color: #fff;
                  }
                  .icon-qq {
                    color: #4cb5e4;
                    border: 1px solid #4cb5e4;
                    transition: all .3s;
                  }
                  .icon-qq:hover {
                    background-color: #4cb5e4;
                    color: #fff;
                  }
                  .icon-QQkongjian {
                    color: #ffbf4f;
                    border: 1px solid #ffbf4f;
                    transition: all .3s;
                  }
                  .icon-QQkongjian:hover {
                    background-color: #ffbf4f;
                    color: #fff;
                  }
                  .icon-wechat {
                    color: #76c654;
                    border: 1px solid #76c654;
                    padding: 5px 3.76px 5px 3.9px;
                    transition: all .3s;
                  }
                  .icon-wechat:hover {
                    background-color: #76c654;
                    color: #fff;
                  }
                  .icon-weibo {
                    color: #ff7747;
                    border: 1px solid #ff7747;
                    transition: all .3s;
                  }
                  .icon-weibo:hover {
                    background-color: #ff7747;
                    color: #fff;
                  }
                }
              }
            }
            .charge {
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: transparent;
              height: 100px;
              border: none;
              box-shadow: none;
              .chargeIcon {
                border-radius: 50px;
                padding: 0 12px 0 8px;
                border: 1px solid #eeeded;
                background-color: #eeeded;
                box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #8E8787;
                transition: all .6s;
                i {
                  font-size: 23px;
                  transition: all .5s;
                }
                span {
                  transition: all .5s;
                }
                @media screen and (min-width: 800px) {
                  &:hover {
                    i, span {
                      color: #ffbf4f;
                    }
                  }
                }
              }
              .focus {
                border: 1px solid #f44336;
                background-color: #f44336;
                i, span {
                  color: #FFF;
                }
                &:hover {
                  i, span {
                    color: #FFF;
                  }
                }
              }
            }
          }
          .otherArticle {
            margin-bottom: 15px;
            @media screen and (min-width: 800px) {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .el-card {
                transition: transform 300ms;
                border-radius: 8px;
                .title {
                  padding: 10px 0;
                  font-size: 15px;
                }
                &:hover {
                  transform: scale(1.05);
                }
                &:first-child {
                  margin: 7.5px 11.25px 7.5px 0;
                  position: relative;
                  .property {
                    color: @articleColor;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 1;
                    background-color: #fff;
                    border-bottom-right-radius: 8px;
                    padding: 2px 5px;
                    font-weight: 500;
                  }
                }
                &:last-child {
                  margin: 7.5px 0 7.5px 11.25px;
                  position: relative;
                  .property {
                    color: @articleColor;
                    position: absolute;
                    top: 0;
                    right: 0;
                    z-index: 1;
                    background-color: #fff;
                    border-bottom-left-radius: 8px;
                    padding: 2px 5px;
                    font-weight: 500;
                  }
                }
              }
            }
            @media screen and (max-width: 800px) {
              .el-card {
                transition: transform 300ms;
                border-radius: 8px;
                .title {
                  padding: 10px 0;
                  font-size: 15px;
                }
                &:hover {
                  transform: scale(1.04);
                }
                &:first-child {
                  margin-bottom: 18.75px;
                  .property {
                    color: @articleColor;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 1;
                    background-color: #fff;
                    border-bottom-right-radius: 8px;
                    padding: 2px 5px;
                    font-weight: 500;
                  }
                }
                &:last-child {
                  margin-top: 18.75px;
                  .property {
                    color: @articleColor;
                    position: absolute;
                    top: 0;
                    right: 0;
                    z-index: 1;
                    background-color: #fff;
                    border-bottom-left-radius: 8px;
                    padding: 2px 5px;
                    font-weight: 500;
                  }
                }
              }
            }

            .el-row {
              padding: 0;
            }

            .el-image {
              position: relative;
            }

            .el-row.userInfo {
              width: 100%;
              position: absolute;
              left: 20px;
              bottom: 20px;
              display: flex;
              justify-content: flex-start;
              align-content: flex-start;

              .author, .date-text {
                padding-left: 10px;
                color: #F5F5F5;
              }
            }

            .title {
              color: #292525;
              height: auto;
              margin: 5px;
              font-weight: 600;
              font-size: 17px;
              line-height: 1.4;
              text-align: left;
            }
          }
          .sideCard {
            height: 100%;
          }
          .catalogTitle {
            font-weight: 500;
            margin-bottom: 15px;
            i {
              font-size: 25px;
              margin-right: 5px;
            }
            color: @articleColor;
            padding-left: 15px;
            font-size: 23px;
          }

          #catalog {
            background-color: transparent;
            border: none;
            box-shadow: none;
          }
        }
      }
    }
  }
</style>
