<template>
  <div class="cover-social-link" :style="colorProps">
    <a :href="socialLink.github.url" target="_blank">
      <el-tooltip effect="dark" :content="socialLink.github.message" :placement="placement">
        <i class="iconfont icon-GitHub"></i>
      </el-tooltip>
    </a>
    <a :href="socialLink.mail.url" target="_blank">
      <el-tooltip effect="dark" :content="socialLink.mail.message" :placement="placement">
        <i class="iconfont icon-envelope-open"></i>
      </el-tooltip>
    </a>
    <a :href="socialLink.qq.url" target="_blank">
      <el-tooltip effect="dark" :content="socialLink.qq.message" :placement="placement">
        <div slot="content">
          <el-row>
            <img :src="socialLink.qq.quick_response_code" width="100px">
          </el-row>
          <el-row>
            <el-col class="center-align">
              <span>{{ socialLink.qq.message }}</span>
            </el-col>
          </el-row>
        </div>
        <i class="iconfont icon-qq"></i>
      </el-tooltip>
    </a>
    <a href="javascript:void(0);">
      <el-tooltip effect="dark" :placement="placement">
        <div slot="content">
          <el-row>
            <img :src="socialLink.weChat.quick_response_code" width="100px">
          </el-row>
          <el-row>
            <el-col class="center-align">
              <span>{{ socialLink.weChat.message }}</span>
            </el-col>
          </el-row>
        </div>
        <i class="iconfont icon-wechat"></i>
      </el-tooltip>
    </a>
  </div>
</template>

<script>
export default {
  name: 'social-link',
  props: ['color', 'placement'],
  data () {
    return {
      // 三层数据会报错
      socialLink: {
        github: {
          url: 'https://github.com/MacseChu',
          message: '访问我的github'
        },
        mail: {
          url: 'mailto:7434311@qq.com',
          message: '邮件联系我'
        },
        qq: {
          url: 'tencent://message/?uin=7434311&Site=&menu=yes',
          quick_response_code: require('../../assets/images/qq.jpg'),
          message: 'QQ:7434311'
        },
        weChat: {
          quick_response_code: require('../../assets/images/WeChat.jpg'),
          message: '微信联系我'
        }
      }
    }
  },
  created () {
    this.getSocialLink()
  },
  methods: {
    async getSocialLink () {
      const { data } = await this.$http.get('socialLink')
      this.socialLink = data
    }
  },
  computed: {
    colorProps () {
      return {
        '--color': this.color
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./src/assets/css/variables";
  .cover-social-link {
    width: 100%;
    text-align: center;
    a {
      padding: 0 15px;
      color: var(--color, @color);
      i {
        font-size: 1.35em;
      }
    }
  }
</style>
