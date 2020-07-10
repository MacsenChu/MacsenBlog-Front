<template>
  <el-card class="comments" id="commentsCard" ref="commentsCard" data-aos="fade-up">
    <div class="commentsTitle">
      <div class="commentsName">
        <i class="iconfont icon-comments">

        </i><span><slot name="commentsName">评论</slot></span>
      </div>
      <div class="commentsCount">
        <slot name="commentsCount">
          {{ commentsCount }}<span>条评论</span>
        </slot>
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
          <el-button type="primary" size="small" @click="submit()" plain>评论</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-row class="noComments" v-if="comments.length === 0">
      <div>来做第一个留言的人吧！</div>
    </el-row>
    <el-card :body-style="{ padding: '0px' }" class="firstLevelComments" shadow="never" v-for="firstLevelComment in comments" :key="firstLevelComment.id">
      <el-avatar v-if="firstLevelComment.isAuthor" :src="headerInfo.avatarUrl" />
      <i data-v-82768ea8="" class="iconfont icon-github" v-else></i>
      <div class="firstLevelCommentsInfo">
        <div class="firstLevelCommentsHead">
          <span class="firstLevelCommentsNickName" v-if="firstLevelComment.isAuthor">{{ firstLevelComment.name }}（作者）</span>
          <span class="firstLevelCommentsNickName" v-else>{{ firstLevelComment.name }}</span>
          <span class="firstLevelCommentsSystem hidden-xs-only" v-for="(system, index) in firstLevelComment.systemInfo.split(',')" :key="index">{{ system }}</span>
        </div>
        <div class="firstLevelCommentsDateAndReply">
          <span class="firstLevelCommentsDate">{{ firstLevelComment.createTime | dateFormat }}</span>
          <span class="firstLevelCommentsReply" @click="replyFirstLevelComment(firstLevelComment.id, firstLevelComment.name)">回复</span>
        </div>
        <div class="firstLevelCommentsContent">{{ firstLevelComment.comment }}</div>
        <div class="firstLevelCommentsRepliesInfo" v-if="firstLevelComment.reply.length !== 0">
          <el-card :body-style="{ padding: '0px' }" v-for="reply in firstLevelComment.reply" :key="reply.fromId" class="secondLevelComments" shadow="never">
            <el-avatar v-if="reply.isAuthor" :src="headerInfo.avatarUrl" />
            <i class="iconfont icon-github" v-else></i>
            <div class="secondLevelCommentsInfo">
              <div class="secondLevelCommentsHead">
                <span class="secondLevelCommentsNickName" v-if="reply.isAuthor">{{ reply.fromName }}（作者）</span>
                <span class="secondLevelCommentsNickName" v-else>{{ reply.fromName }}</span>
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
</template>

<script>
import $ from 'jquery'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { mapState } from 'vuex'
export default {
  props: ['comments', 'commentsCount'],
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
      commentPlacehodler: '说点什么吧...',
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
      }
    }
  },
  mounted () {
    AOS.init()
  },
  methods: {
    submit () {
      this.$refs.userInputComment.validate(valid => {
        if (valid) {
          // 自己申请腾讯验证码，下面的那串数字要改为自己的
          const captcha = new window.TencentCaptcha('2054549093', res => {
            if (res.ret === 0) {
              this.$emit('submitComment', this.userInputComment, res.ticket, res.randstr)
              this.resetForm()
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
      const commentsCard = document.getElementById('commentsCard')
      const total = commentsCard.offsetTop
      $('html, body').animate({ scrollTop: total + 200 }, 350, 'swing')
    }
  },
  computed: {
    ...mapState({
      headerInfo: state => state.header.headerInfo
    })
  }
}
</script>

<style lang="less" scoped>
  @import './src/assets/css/variables';
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
          line-height: 1;
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
      /deep/ .el-avatar {
        @media screen and (min-width: 800px) {
          height: 43px;
          // 我也不知道为什么 这个圆始终不圆，这个值是靠我的火眼金睛挑圆的
          width: 45.5px;
        }
        @media screen and (max-width: 800px) {
          height: 33px;
          width: 35.5px;
        }
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
</style>
