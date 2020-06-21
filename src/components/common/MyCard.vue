<template>
  <div id="myCard" ref="myCard">
    <el-card>
      <el-row class="avatar">
        <el-avatar :size="160" :src="myInfo.avatarUrl" />
      </el-row>
      <el-row>
        <h1>{{ myInfo.name }}</h1>
      </el-row>
      <el-row>
        <div class="profile" v-html="myInfo.profile">
          {{ myInfo.profile }}
        </div>
      </el-row>
      <el-row>
        <el-col :span="24">
          <social-link color="#292525" placement="bottom"></social-link>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import socialLink from '../common/SocialLink'
export default {
  components: {
    socialLink
  },
  data () {
    return {
      myInfo: {
        avatarUrl: require('../../assets/images/avatar.jpeg'),
        name: 'Macsen Chu',
        profile: '<p>一名菜鸟coder <br>折腾在 0 和 1 世界里的青年</p>\n<p>所有晦暗留给过往，<br>但愿预见未来的你，<br>凝冬散尽，星河长明</p>\n<p>我是Macsen<br>努力成为更优秀的自己</p>'
      }
    }
  },
  created () {
    this.getMyInfo()
  },
  mounted () {
  },
  methods: {
    async getMyInfo () {
      try {
        const { data } = await this.$http.get('myInfo')
        this.myInfo = data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./src/assets/css/variables";
  #myCard {
    .el-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      .avatar {
        display: flex;
        justify-content: center;
        align-content: center;
      }
      .el-row {
        display: flex;
        justify-content: center;
        align-content: center;
        h1 {
          font-weight: 500;
          margin: 5px auto;
        }
        .profile {
          text-align: center;
        }
        .cover-social-link {
          width: 100%;
          text-align: center;
          a {
            padding: 0 15px;
            color: #292525;
            i {
              font-size: 1.35em;
            }
          }
        }
      }
    }
  }
</style>
