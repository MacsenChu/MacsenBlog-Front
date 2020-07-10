<template>
  <div id="message">
    <cover></cover>
    <div id="container">
      <div class="messageCard">
        <el-card>
          <div class="title">
            <i class="iconfont icon-comments"></i>
            <span>留言板</span>
          </div>
        </el-card>
        <comments-card :comments="messages"  :commentsCount="messageCount" @submitComment="submitMessage">
          <template v-slot:commentsName>留言</template>
          <template v-slot:commentsCount>{{ messageCount }} <span>条留言</span></template>
        </comments-card>
      </div>
    </div>
  </div>
</template>

<script>
import cover from '../components/common/Cover'
import commentsCard from '../components/common/CommentsCard'
import dectect from '../../utils/detect'
export default {
  components: {
    cover,
    commentsCard
  },
  data () {
    return {
      messages: []
    }
  },
  created () {
    this.getMessage()
  },
  methods: {
    async getMessage () {
      try {
        const { data } = await this.$http.get('message')
        this.messages = data
      } catch (e) {
        console.log(e)
      }
    },
    async submitMessage (userInputComment, ticket, randstr) {
      try {
        await this.$http.post('message', {
          ...userInputComment,
          ...{ systemInfo: `${dectect().browser} ${dectect().version},${dectect().os} ${dectect().osVersion}` },
          ...{ ticket },
          ...{ randstr }
        })
        if (userInputComment.replyType === 'reply' || userInputComment.replyType === 'comment') {
          this.$message.success('回复' + userInputComment.toName + '成功！')
        } else {
          this.$message.success('留言成功!')
        }
        await this.getMessage()
      } catch (e) {
        if (userInputComment.replyType === 'reply' || userInputComment.replyType === 'comment') {
          this.$message.error('回复' + userInputComment.toName + '失败！')
        } else {
          this.$message.error('留言失败')
        }
        console.log(e)
      }
    }
  },
  computed: {
    messageCount () {
      let count = 0
      this.messages.forEach(message => {
        count++
        message.reply.forEach(reply => {
          count++
        })
      })
      return count
    }
  }
}
</script>

<style lang="less" scoped>
  @import './src/assets/css/variables';
  #message {
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
      .messageCard {
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
        .description {
          margin: 5px 0;
          @media screen and (min-width: 750px) {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
</style>
