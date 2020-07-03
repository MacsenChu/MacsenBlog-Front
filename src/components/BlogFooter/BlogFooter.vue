<template>
  <div :style="colorProps" id="footer">
    <footer id="normalFooter">
      <div id="leftFootBox">
        <div>总访问量: {{ footerInfo.visits_count }} 次 |  总访问人数: {{ footerInfo.visitors_count }} 人</div>
        <div>
          Copyright © 2020 - {{ footerInfo.copyrightYear }} {{ footerInfo.copyrightName }} | 辽ICP备{{ footerInfo.recordNumber }}号 |  {{ footerInfo.recordName }}
        </div>
        <div v-if="runtime.years === 0">
          本站已经苟延残喘运行 {{ runtime.days }}天{{ runtime.hours }}小时{{ runtime.minutes }}分钟{{ runtime.seconds }}秒
        </div>
        <div v-else>
          本站已经苟延残喘运行 {{ runtime.years }}年{{ runtime.days }}天{{ runtime.hours }}小时{{ runtime.minutes }}分钟{{ runtime.seconds }}秒
        </div>
      </div>
      <div id="rightFootBox">
        <social-link :color="headerInfo.headerColor" placement="top"></social-link>
      </div>
    </footer>
    <footer id="mobileFooter">
      <div id="footBox">
        <div>总访问量: {{ footerInfo.visits_count }} 次 |  总访问人数: {{ footerInfo.visitors_count }} 人</div>
        <div>
          辽ICP备{{ footerInfo.recordNumber }}号 |  {{ footerInfo.recordName }}
        </div>
        <div>
          Copyright © 2020 - {{ footerInfo.copyrightYear }} {{ footerInfo.copyrightName }}
        </div>
        <div v-if="runtime.years === 0">
          本站已经苟延残喘运行 {{ runtime.days }}天{{ runtime.hours }}小时{{ runtime.minutes }}分钟{{ runtime.seconds }}秒
        </div>
        <div v-else>
          本站已经苟延残喘运行 {{ runtime.years }}年{{ runtime.days }}天{{ runtime.hours }}小时{{ runtime.minutes }}分钟{{ runtime.seconds }}秒
        </div>
        <social-link :color="headerInfo.headerColor" placement="top"></social-link>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import socialLink from '../common/SocialLink'
export default {
  name: 'blog-footer',
  components: {
    socialLink
  },
  data () {
    return {
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
    this.$store.dispatch('footer/getFooterInfo')
    setInterval(this.setTime, 1000)
  },
  methods: {
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
  },
  computed: {
    ...mapState({
      footerInfo: state => state.footer.footerInfo,
      headerInfo: state => state.header.headerInfo
    }),
    colorProps () {
      return {
        '--color': this.headerInfo.headerColor,
        '--backgroundColor': this.headerInfo.headerBgColor
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./src/assets/css/variables";
  #footer {
    font-size: 13px;
    width: 100%;
    background-color: var(--backgroundColor, @headerBgColor);
    color: #C1BDBD;
    padding: 10px 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    #normalFooter {
      width: 1200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      #leftFootBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        flex: 2;
      }
      #rightFootBox {
        flex: 1;
      }
    }
    #mobileFooter {
      display: none;
    }
    @media screen and (max-width: 800px) {
      #normalFooter {
        display: none;
      }
      #mobileFooter {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        div {
          padding: 1px 0;
        }
      }
    }
  }
</style>
