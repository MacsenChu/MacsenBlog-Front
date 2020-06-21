<template>
  <div id="footerCard">
    <el-divider></el-divider>
    <el-card :body-style="{ padding: '0px' }">
      <div>
        <social-link color="#8e8787" placement="top"></social-link>
      </div>
      <div>
        总访问量: {{ footerInfo.visits_count }} 次 |  总访问人数: {{ footerInfo.visitors_count }} 人
      </div>
      <div v-if="runtime.years === 0">
        本站已经苟延残喘运行 <br>{{ runtime.days }}天{{ runtime.hours }}小时{{ runtime.minutes }}分钟{{ runtime.seconds }}秒
      </div>
      <div v-else>
        本站已经苟延残喘运行 <br>{{ runtime.years }}年{{ runtime.days }}天{{ runtime.hours }}小时{{ runtime.minutes }}分钟{{ runtime.seconds }}秒
      </div>
      <div>
        辽ICP备{{ footerInfo.recordNumber }}号  {{ footerInfo.recordName }}
        <br>
        Copyright © 2020 - {{ footerInfo.copyrightYear }} {{ footerInfo.copyrightName }}
      </div>
    </el-card>
  </div>
</template>

<script>
import VueSticky from 'vue-sticky'
import socialLink from '../common/SocialLink'
export default {
  components: {
    socialLink
  },
  directives: {
    sticky: VueSticky
  },
  data () {
    return {
      footerInfo: {},
      diffDate: {},
      TIME_CONSTANT: {
        MILLISECOND: 1000,
        MINUTES: 60000,
        HOURS: 3600000,
        DAYS: 86400000,
        YEARS: 31536000000
      },
      runtime: {
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }
  },
  created () {
    this.getFooterInfo()
  },
  methods: {
    async getFooterInfo () {
      const { data } = await this.$http.get('footer')
      this.footerInfo = data
      setInterval(this.setTime, 1000)
    },
    setTime () {
      const diff = new Date() - new Date(this.footerInfo.runtime)
      const diffYears = Math.floor(diff / this.TIME_CONSTANT.YEARS)
      const diffDays = Math.floor((diff / this.TIME_CONSTANT.DAYS) - diffYears * 365)
      const diffHours = Math.floor((diff - (diffYears * 365 + diffDays) * this.TIME_CONSTANT.DAYS) / this.TIME_CONSTANT.HOURS)
      const diffMinutes = Math.floor((diff - (diffYears * 365 + diffDays) * this.TIME_CONSTANT.DAYS - diffHours * this.TIME_CONSTANT.HOURS) / this.TIME_CONSTANT.MINUTES)
      const diffSeconds = Math.floor((diff - (diffYears * 365 + diffDays) * this.TIME_CONSTANT.DAYS - diffHours * this.TIME_CONSTANT.HOURS - diffMinutes * this.TIME_CONSTANT.MINUTES) / this.TIME_CONSTANT.MILLISECOND)
      this.runtime.years = diffYears
      this.runtime.days = diffDays
      this.runtime.hours = diffHours
      this.runtime.minutes = diffMinutes
      this.runtime.seconds = diffSeconds
    }
  }
}
</script>

<style lang="less" scoped>
  #footerCard {
    .el-card {
      height: 200px;
      background-color: transparent;
      border: none;
      box-shadow: none;
      text-align: center;
      color: #8e8787;
      font-size: 13px;
      margin-top: -20px;
      .el-card__body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: space-around;
        .cover-social-link {
          width: 100%;
          text-align: center;
          a {
            padding: 0 15px;
            color: #8e8787;
            i {
              font-size: 1.35em;
            }
          }
        }
        div {
          margin: 15px 0;
        }
      }
    }
  }
</style>
