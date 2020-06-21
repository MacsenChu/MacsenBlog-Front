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
      myInfo: {}
    }
  },
  created () {
    this.getMyInfo()
  },
  mounted () {
  },
  methods: {
    async getMyInfo () {
      const { data } = await this.$http.get('myInfo')
      this.myInfo = data
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
