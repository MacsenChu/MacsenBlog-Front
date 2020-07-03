<template>
  <div id="article">
    <div id="articleCover" :style="{ 'backgroundImage': `url(${article.cover})` }" class="bgCover">
      <div id="title">{{ article.title }}</div>
    </div>
    <div id="container">
      <el-row>
        <el-col :lg="19" :md="19">
          <el-card id="articleDetail">
              <div id="articleInfo">
                <div id="tag">
                  <el-tag v-for="(tag, index) in article.tag.split(',')" :key="index" size="small" effect="plain">
                    {{ tag }}
                  </el-tag>
                </div>
                <div id="categories">
                  <i class="iconfont icon-book-mark">
                    <span>{{ article.categories }}</span>
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
            <el-card class="comments reveal-fadeInLeft" id="commentsCard" ref="commentsCard">
              <div class="commentsTitle">
                <div class="commentsName">
                  <i class="iconfont icon-comments"></i><span>评论</span>
                </div>
                <div class="commentsCount">
                  {{ article.commentsCount }}<span>条评论</span>
                </div>
              </div>
              <el-form class="commentInput" :model="userInputComment" :rules="commentRules" ref="userInputComment">
                <i class="iconfont icon-github"></i>
                  <div class="inputArea">
                    <div class="inputUserInfo">
                      <el-form-item class="inputNickName" prop="name">
                        <el-input placeholder="昵称" v-model="userInputComment.name"></el-input>
                      </el-form-item>
                      <el-form-item  class="inputMail" prop="mail">
                        <el-input placeholder="邮箱（方便联系您，不会公开）" v-model="userInputComment.mail"></el-input>
                      </el-form-item>
                    </div>
                    <el-form-item prop="content">
                      <el-input class="inputCommentArea"
                                type="textarea" :autosize="{ minRows: 6 }"
                                v-model="userInputComment.content"
                                resize="none"  maxlength="255"
                                show-word-limit
                                :placeholder="commentPlacehodler"></el-input>
                    </el-form-item>
                    <el-form-item class="submit">
                      <el-button size="small"  @click="resetForm()" style="margin: 0">重置</el-button>
                      <el-button type="primary" size="small" @click="submit('userInputComment')" plain>评论</el-button>
                    </el-form-item>
                  </div>
              </el-form>
              <el-row class="noComments" v-if="comments.length === 0">
                <div>来做第一个留言的人吧！</div>
              </el-row>
              <el-card :body-style="{ padding: '0px' }" class="firstLevelComments" shadow="never" v-for="firstLevelComment in comments" :key="firstLevelComment.id">
                <i data-v-82768ea8="" class="iconfont icon-github"></i>
                <div class="firstLevelCommentsInfo">
                  <div class="firstLevelCommentsHead">
                    <span class="firstLevelCommentsNickName">{{ firstLevelComment.name }}</span>
                    <span class="firstLevelCommentsSystem hidden-xs-only" v-for="(system, index) in firstLevelComment.systemInfo.split(',')" :key="index">{{ system }}</span>
                  </div>
                  <div class="firstLevelCommentsDateAndReply">
                    <span class="firstLevelCommentsDate">{{ firstLevelComment.createTime | dateFormat }}</span>
                    <span class="firstLevelCommentsReply" @click="replyFirstLevelComment(firstLevelComment.id, firstLevelComment.name)">回复</span>
                  </div>
                  <div class="firstLevelCommentsContent">{{ firstLevelComment.comment }}</div>
                  <div class="firstLevelCommentsRepliesInfo" v-if="firstLevelComment.reply.length !== 0">
                    <el-card :body-style="{ padding: '0px' }" v-for="reply in firstLevelComment.reply" :key="reply.fromId" class="secondLevelComments" shadow="never">
                      <i class="iconfont icon-github"></i>
                      <div class="secondLevelCommentsInfo">
                        <div class="secondLevelCommentsHead">
                          <span class="secondLevelCommentsNickName">{{ reply.fromName }}</span>
                          <span class="secondLevelCommentsSystem hidden-xs-only" v-for="(system, index) in reply.systemInfo.split(',')" :key="index">{{ system }}</span>
                        </div>
                        <div class="secondLevelCommentsDateAndReply">
                          <span class="secondLevelCommentsDate">{{ reply.createTime | dateFormat }}</span>
                          <span class="secondLevelCommentsReply" @click="replySecondLevelComment(reply.fromId, reply.fromName, firstLevelComment.id)">回复</span>
                        </div>
                        <div class="secondLevelCommentsContent">
                          <span class="secondLevelCommentsContentReply" v-if="reply.replyType === 'reply'">
                            回复&nbsp;<span class="secondLevelCommentsContentReplyName">@{{ reply.toName }}</span>:
                          </span>
                          {{ reply.comment }}
                        </div>
                      </div>
                    </el-card>
                  </div>
                </div>
              </el-card>
            </el-card>
          <div class="otherArticle reveal-fadeInLeft">
            <el-card :body-style="{ padding: '0px' }" v-for="(otherArticle, index) in otherArticles" :key="otherArticle.id">
              <el-row>
                <router-link :to="/article/ + otherArticle.id" @click.native="$router.go(0)">
                  <el-image :src="otherArticle.cover" fit="cover"></el-image>
                </router-link>
                <el-row class="userInfo">
                  <el-avatar :size="24" :src="otherArticle.avatar" />
                  <span class="author">{{ otherArticle.author }}</span>
                  <span class="date-text">{{ otherArticle.createTime | dateFormatToDate }}</span>
                </el-row>
                <span class="property" v-if="otherArticle.id < article.id"><i class="iconfont icon-shangyipian"></i>上一篇</span>
                <span class="property" v-else-if="otherArticle.id > article.id">下一篇<i class="iconfont icon-xiayipian"></i></span>
                <span class="property" v-else-if="otherArticle.id === article.id && index === 0"><i class="iconfont icon-dangqian"></i>本篇</span>
                <span class="property" v-else-if="otherArticle.id === article.id && index === 1">本篇<i class="iconfont icon-dangqian"></i></span>
              </el-row>
              <el-row>
                <router-link :to="/article/ + otherArticle.id">
                  <div class="title">{{ otherArticle.title }}</div>
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
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import * as tocbot from 'tocbot'
import VueSticky from 'vue-sticky'
import scrollReveal from 'scrollreveal'
import QRCode from 'qrcode'
import blogFooter from '../components/BlogFooter/BlogFooter'
import $ from 'jquery'
// 导入prism.js
import prismjs from 'prismjs'
import dectect from '../../utils/detect'
export default {
  components: {
    blogFooter
  },
  directives: {
    sticky: VueSticky
  },
  data () {
    const checkName = (rule, value, callback) => {
      if (value.trim().length === 0) {
        setTimeout(() => {
          callback(this.$message.error('请输入您的用户名'))
        }, 0)
      }
      return callback()
    }
    // 验证邮箱的规则
    const checkEmail = (rule, value, callback) => {
      if (value.trim().length === 0) {
        setTimeout(() => {
          callback(this.$message.error('请输入您的邮箱'))
        }, 0)
      } else {
        // 验证邮箱的正则表达式
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

        if (regEmail.test(value)) {
          // 合法的邮箱
          return callback()
        }
        setTimeout(() => {
          callback(this.$message.error('请输入合法的邮箱'))
        }, 0)
      }
    }
    const checkContent = (rule, value, callback) => {
      if (value.trim().length === 0) {
        setTimeout(() => {
          callback(this.$message.error('说点什么吧...'))
        }, 0)
      }
      return callback()
    }
    return {
      route: this.$route.params.articleId,
      scrollReveal: scrollReveal(),
      article: {
        tag: '',
        content: ''
      },
      otherArticles: [],
      commentPlacehodler: '说点什么吧',
      comments: [],
      userInputComment: {
        name: '',
        mail: '',
        content: ''
      },
      commentRules: {
        name: [
          { validator: checkName, trigger: 'blur' },
          { required: true, message: '请输入您的用户名', trigger: 'blur' }
        ],
        mail: [
          { validator: checkEmail, trigger: 'blur' },
          { required: true, message: '请输入您的邮箱', trigger: 'blur' }
        ],
        content: [
          { validator: checkContent, trigger: 'blur' },
          { required: true, message: '说点什么吧...', trigger: 'blur' }
        ]
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
    this.scrollReveal.reveal('.reveal-fadeInLeft', {
      duration: 350,
      delay: 200,
      origin: 'left',
      reset: false,
      mobile: true,
      distance: '200px',
      easing: 'ease-out',
      scale: 0.9
    })
  },
  methods: {
    async getArticleById (id) {
      const { data } = await this.$http.get(`article/${id}`)
      this.article = data
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
      await this.getComments()
      await this.getOtherArticle()
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
    async getComments () {
      try {
        const { data } = await this.$http.get('article/comment', {
          params: {
            articleId: this.article.id
          }
        })
        this.comments = data
      } catch (e) {
        console.log(e)
      }
    },
    async charge () {
      if (this.isCharge) {
        try {
          await this.$http.post('article/like', {
            articleId: this.article.id,
            isCharge: this.isCharge
          })
          this.isCharge = false
          // 点完赞也没必要再获取一遍，直接修改值
          this.article.likesCount--
          localStorage.removeItem(`article:isCharge:${this.article.id}`)
          this.$message.info('已取消充电！')
        } catch (e) {
          // 点个赞失败了又能咋地……咱也不是拼多多砍一刀
          console.log(e)
        }
      } else {
        try {
          await this.$http.post('article/like', {
            articleId: this.article.id,
            isCharge: this.isCharge
          })
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
    async submitComment (ticket, randstr) {
      try {
        await this.$http.post('article/comment', {
          ...this.userInputComment,
          ...{ articleId: this.article.id },
          ...{ systemInfo: `${dectect().browser} ${dectect().version},${dectect().os} ${dectect().osVersion}` },
          ...{ ticket },
          ...{ randstr }
        })
        if (this.userInputComment.replyType === 'reply' || this.userInputComment.replyType === 'comment') {
          this.$message.success('回复' + this.userInputComment.toName + '成功！')
        } else {
          this.$message.success('留言成功!')
        }
        // 评论数没必要特别精准，这里不准备重新请求服务器获取评论数了，直接加1
        this.article.commentsCount++
        await this.getComments()
        this.resetForm()
      } catch (e) {
        if (this.userInputComment.replyType === 'reply' || this.userInputComment.replyType === 'comment') {
          this.$message.error('回复' + this.userInputComment.toName + '失败！')
        } else {
          this.$message.error('留言失败')
        }
        console.log(e)
      }
    },
    async getOtherArticle () {
      try {
        const { data } = await this.$http.get('article/otherArticle', {
          params: {
            articleId: this.article.id
          }
        })
        this.otherArticles = data
      } catch (e) {
        console.log(e)
      }
    },
    submit () {
      this.$refs.userInputComment.validate(valid => {
        if (valid) {
          // 自己申请腾讯验证码，下面的那串数字要改为自己的
          const captcha = new window.TencentCaptcha('2054549093', res => {
            if (res.ret === 0) {
              this.submitComment(res.ticket, res.randstr)
            } else {
              this.$message.error('未通过验证')
            }
          })
          captcha.show()
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.userInputComment = {
        name: '',
        mail: '',
        content: ''
      }
      this.commentPlacehodler = '说点什么吧...'
      this.$refs.userInputComment.resetFields()
    },
    // 回复一级评论，replyType为comment
    replyFirstLevelComment (commentId, commentName) {
      this.comments.some(_ => {
        if (_.id === commentId) {
          this.userInputComment.toId = commentId
          this.userInputComment.toName = commentName
          this.userInputComment.replyType = 'comment'
          this.userInputComment.commentId = commentId
          this.commentPlacehodler = '@' + commentName
          this.replyScroll()
        }
      })
    },
    // 回复二级评论，先找到一级评论的id，replyType为reply
    replySecondLevelComment (commentId, commentName, parentId) {
      this.comments.some(_ => {
        if (_.id === parentId) {
          _.reply.some(item => {
            if (item.fromId === commentId) {
              this.userInputComment.toId = commentId
              this.userInputComment.toName = commentName
              this.userInputComment.replyType = 'reply'
              this.userInputComment.commentId = parentId
              this.commentPlacehodler = '@' + commentName
              this.replyScroll()
            }
          })
        }
      })
    },
    replyScroll () {
      // const commentsCard = this.$refs.commentsCard
      const commentsCard = document.getElementById('commentsCard')
      const total = commentsCard.offsetTop
      $('html, body').animate({ scrollTop: total + 200 }, 350, 'swing')
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
          .comments {
            color: @articleColor;
            margin: 18.75px 0;
            border-radius: 8px;
            @media screen and (min-width: 800px) {
              line-height: 1.5;
            }
            @media screen and (max-width: 800px) {
              /deep/ .el-card__body {
                padding: 10px;
              }
            }
            .commentsTitle {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid #E9E9E9;
              margin-bottom: 20px;
              padding-bottom: 8px;
              .commentsName {
                i {
                  font-size: 20px;
                }
                span {
                  margin: 0 5px;
                }
                font-weight: bold;
                font-size: 20px;
              }
              .commentsCount {
                font-size: 16px;
                span {
                  padding: 0 5px;
                }
              }
            }
            .commentInput {
              margin: 0;
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              i {
                @media screen and (min-width: 800px) {
                  font-size: 43px;
                }
                @media screen and (max-width: 800px) {
                  display: none;
                }
                margin-top: -11px;
              }
              .inputArea {
                width: 100%;
                border: 1px solid #f0f0f0;
                border-radius: 4px;
                @media screen and (min-width: 800px) {
                  margin-left: 25px;
                }
                @media screen and (max-width: 800px) {
                  margin-left: 0;
                }
                .el-form-item {
                  margin: 0;
                  padding: 0;
                }
                /deep/ .el-form-item.is-error .el-input__inner {
                  border-bottom: 2px solid #F56C6C;
                }
                /deep/ .el-form-item__error {
                  display: none;
                }
                /deep/ .el-input__inner {
                  font-weight: normal;
                  line-height: 25px;
                  border-top: none;
                  border-left: none;
                  border-right: none;
                  border-bottom: 1px dashed #dedede;
                  border-radius: 0;
                }
                /deep/ .el-input__inner:focus {
                  border-bottom: 2px solid #039BE5;
                }
                /deep/ .el-input-group__prepend {
                  color: @articleColor;
                }
                /deep/ .el-textarea__inner {
                  font-weight: normal;
                  border: none;
                }
                /deep/ .el-textarea .el-input__count {
                  @media screen and (min-width: 800px) {
                    right: 25px;
                    bottom: -20px;
                  }
                  @media screen and (max-width: 800px) {
                    right: 15px;
                    bottom: -15px;
                  }
                }
                .inputUserInfo {
                  @media screen and (min-width: 800px) {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  }
                  .inputNickName {
                    @media screen and (min-width: 800px) {
                      flex: 1;
                    }
                    @media screen and (max-width: 800px) {
                      width: 100%;
                    }
                  }
                  .inputMail {
                    @media screen and (min-width: 800px) {
                      flex: 1;
                    }
                    @media screen and (max-width: 800px) {
                      width: 100%;
                    }
                  }
                }
                .submit {
                  height: 60px;
                  .el-button {
                    margin-right: 14px;
                  }
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                }
              }
            }
            .noComments {
              padding: 20px 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .firstLevelComments {
              margin: 0;
              border: none;
              color: @articleColor;
              padding-top: 24px;
              /deep/ .el-card__body {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
              }
              i {
                @media screen and (min-width: 800px) {
                  font-size: 43px;
                  margin-top: -10px;
                }
                @media screen and (max-width: 800px) {
                  font-size: 33px;
                  margin-top: -5px;
                }
              }
              .firstLevelCommentsInfo {
                width: 100%;
                @media screen and (min-width: 800px) {
                  margin-left: 15px;
                }
                @media screen and (max-width: 800px) {
                  margin-left: 5px;
                }
                border-bottom: 1px dashed #f5f5f5;
                transition: .3s;
                .firstLevelCommentsHead {
                  .firstLevelCommentsNickName {
                    font-size: .875em;
                    font-weight: 500;
                    cursor: pointer;
                    color: #1abc9c;
                    margin-right: .875em;
                    display: inline-block;
                  }
                  .firstLevelCommentsSystem {
                    display: inline-block;
                    padding: .2em .5em;
                    margin: 0 .3em;
                    background: #ededed;
                    color: #b3b1b1;
                    font-size: .75em;
                    border-radius: .2em;
                  }
                }
                .firstLevelCommentsDateAndReply {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  .firstLevelCommentsDate {
                    color: #b3b3b3;
                    font-size: .75em;
                    margin-right: .875em;
                  }
                  .firstLevelCommentsReply {
                    font-size: .8125em;
                    color: #ef2f11;
                    cursor: pointer;
                    float: right;
                  }
                }
               .firstLevelCommentsContent {
                 word-break: break-all;
                 text-align: justify;
                 font-size: .875em;
                 line-height: 2;
                 position: relative;
                 margin-bottom: .75em;
                 padding-top: .625em;
               }
              }
            }
            .firstLevelCommentsRepliesInfo {
              margin-top: 1em;
              @media screen and (min-width: 800px) {
                padding-left: 15px;
              }
              @media screen and (max-width: 800px) {
                padding-left: 5px;
              }
              border-left: 1px dashed #F5F5F5;
              .secondLevelComments {
                margin: 0;
                border: none;
                color: @articleColor;
                /deep/ .el-card__body {
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-start;
                }
                i {
                  @media screen and (min-width: 800px) {
                    font-size: 43px;
                    margin-top: -10px;
                  }
                  @media screen and (max-width: 800px) {
                    font-size: 33px;
                    margin-top: -5px;
                  }
                }
                .secondLevelCommentsInfo {
                  width: 100%;
                  @media screen and (min-width: 800px) {
                    margin-left: 15px;
                  }
                  @media screen and (max-width: 800px) {
                    margin-left: 5px;
                  }
                  transition: .3s;
                  .secondLevelCommentsHead {
                    .secondLevelCommentsNickName {
                      font-size: .875em;
                      font-weight: 500;
                      cursor: pointer;
                      color: #1abc9c;
                      margin-right: .875em;
                      display: inline-block;
                    }
                    .secondLevelCommentsSystem {
                      display: inline-block;
                      padding: .2em .5em;
                      margin: 0 .3em;
                      background: #ededed;
                      color: #b3b1b1;
                      font-size: .75em;
                      border-radius: .2em;
                    }
                  }
                  .secondLevelCommentsDateAndReply {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .secondLevelCommentsDate {
                      color: #b3b3b3;
                      font-size: .75em;
                      margin-right: .875em;
                    }
                    .secondLevelCommentsReply {
                      font-size: .8125em;
                      color: #ef2f11;
                      cursor: pointer;
                      float: right;
                    }
                  }
                  .secondLevelCommentsContent {
                    word-break: break-all;
                    text-align: justify;
                    font-size: .875em;
                    line-height: 2;
                    position: relative;
                    margin-bottom: .75em;
                    padding-top: .625em;
                    .secondLevelCommentsContentReply {
                      color: #b3b3b3;
                      .secondLevelCommentsContentReplyName {
                        font-size: 0.875em;
                        font-weight: 500;
                        cursor: pointer;
                        color: #1abc9c;
                      }
                    }
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
