<template>
  <div id="about">
    <cover></cover>
    <div id="container">
      <div class="aboutCard wow fadeInUp">
        <el-card id="aboutCard" data-aos="fade-down">
          <el-row class="avatar">
            <el-avatar :size="150" :src="headerInfo.avatarUrl" />
          </el-row>
          <el-row>
            <div class="title center">Macsen Chu</div>
          </el-row>
          <el-row>
            <social-link color="#303133" placement="bottom"></social-link>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <div class="description center" v-html="desc"></div>
          </el-row>
          <el-row id="aplayerCard" data-aos="zoom-in-up">
            <div id="aplayerCore"></div>
          </el-row>
          <el-row class="mySkills" data-aos="zoom-in-up">
            <!-- 我能有啥技能？我唯一的技能就是吹牛* -->
            <span class="title"><i class="iconfont icon-jineng-copy"></i>我的技能</span>
          </el-row>
          <el-row>
            <el-col :sm="24" :md="12" :lg="12" data-aos="fade-up" v-for="skill in skills" :key="skill.id">
              <div class="skillbar">
                <div class="skillbar-title" :style="{ background: skill.background, width: skill.percent }">
                  <span>{{ skill.skill }}</span>
                </div>
                <div class="skill-bar-percent">{{ skill.percent }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row class="otherSkill" data-aos="zoom-in-up">
            <span class="title"><i class="iconfont icon-jineng"></i>其它技能</span>
          </el-row>
          <el-row>
            <div class="tag-chips">
              <span class="chip center-align waves-effect waves-light chip-default"
                    data-aos="zoom-in-up"
                    v-for="(skill, index) in otherSkills" :key="skill.id"
                    :style="{ 'background-color': ++index >= colorArr.length ? colorArr[Math.abs(hashCode(skill.skill) % colorArr.length)] : colorArr[index - 1] }">
                {{ skill.skill }}
              </span>
            </div>
          </el-row>
          <el-row class="statistics" data-aos="zoom-in-up">
            <span class="title">文章统计图</span>
          </el-row>
          <el-row id="echarts">
            <el-col :lg="8" :md="12" :sm="24" data-aos="zoom-in-up" id="posts-chart"></el-col>
            <el-col :lg="8" :md="12" :sm="24" data-aos="zoom-in-up" id="categories-chart"></el-col>
            <el-col :lg="8" :md="12" :sm="24" data-aos="zoom-in-up" id="tags-chart"></el-col>
          </el-row>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import cover from '../components/common/Cover'
import socialLink from '../components/common/SocialLink'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { mapState } from 'vuex'
import APlayer from 'aplayer'
import 'aplayer/dist/APlayer.min.css'
import echarts from 'echarts'
export default {
  components: {
    cover,
    socialLink
  },
  data () {
    return {
      desc: '',
      colorArr: ['#F9EBEA', '#F5EEF8', '#D5F5E3', '#E8F8F5', '#FEF9E7', '#F8F9F9', '#82E0AA', '#D7BDE2', '#A3E4D7', '#85C1E9', '#F8C471', '#F9E79F', '#FFF'],
      skills: [],
      otherSkills: [],
      music: []
    }
  },
  created () {
    this.getDesc()
    this.getAboutInfo()
    this.getMusic()
  },
  mounted () {
    AOS.init()
  },
  methods: {
    hashCode (str) {
      if (!str && str.length === 0) {
        return 0
      }
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i)
        hash |= 0
      }
      return hash
    },
    async getDesc () {
      try {
        const { data: res } = await this.$http.get('desc')
        if (res.code === 200) {
          this.desc = res.data.desc
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getAboutInfo () {
      try {
        const { data: res } = await this.$http.get('about')
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.setSkills(res.data.skills)
        this.otherSkills = res.data.otherSkills
        this.setPublishStatistics(res.data.publishStatistics)
        this.setCategories(res.data.categories)
        this.setTopTags(res.data.topTags)
      } catch (e) {
        console.log(e)
      }
    },
    async getMusic () {
      try {
        const { data: res } = await this.$http.get('musics')
        if (res.code === 200) {
          this.music = res.data
          this.initAplayer()
        }
      } catch (e) {
        console.log(e)
      }
    },
    setSkills (skills) {
      skills.forEach(_ => {
        _.percent = parseInt(Math.random() * 30 + 60, 10) + '%'
      })
      this.skills = skills
    },
    initAplayer () {
      /* eslint-disable no-new */
      new APlayer({
        container: document.getElementById('aplayerCore'),
        mini: false,
        autoplay: false,
        theme: '#FADFA3',
        loop: 'all',
        order: 'list',
        preload: 'auto',
        volume: 0.7,
        mutex: true,
        listFolded: false,
        listMaxHeight: 90,
        lrcType: 1,
        audio: this.music
      })
    },
    setPublishStatistics (publishStatistics) {
      const month = []
      const total = []
      publishStatistics.forEach(_ => {
        month.push(_.month)
        total.push(_.total)
      })
      this.initPostsChart(month, total)
    },
    initPostsChart (month, total) {
      const postsChart = echarts.init(document.getElementById('posts-chart'))
      const postsOption = ({
        title: {
          text: '文章发布统计图',
          top: -5,
          x: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: month
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '文章篇数',
            type: 'line',
            color: ['#6772e5'],
            data: total,
            markPoint: {
              symbolSize: 45,
              color: ['#fa755a', '#3ecf8e', '#82d3f4'],
              data: [{
                type: 'max',
                itemStyle: { color: ['#3ecf8e'] },
                name: '最大值'
              }, {
                type: 'min',
                itemStyle: { color: ['#fa755a'] },
                name: '最小值'
              }]
            },
            markLine: {
              itemStyle: { color: ['#ab47bc'] },
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      })
      postsChart.setOption(postsOption)
    },
    setCategories (c) {
      const categories = []
      c.forEach(_ => {
        categories.push({
          name: _.category,
          value: _.count
        })
      })
      this.initCategoriesChart(categories)
    },
    initCategoriesChart (categories) {
      const categoriesChart = echarts.init(document.getElementById('categories-chart'))
      const categoriesOption = {
        title: {
          text: '文章分类统计图',
          top: -4,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '分类',
            type: 'pie',
            radius: '50%',
            color: ['#6772e5', '#ff9e0f', '#fa755a', '#3ecf8e', '#82d3f4', '#ab47bc', '#525f7f', '#f51c47', '#26A69A'],
            data: categories,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      categoriesChart.setOption(categoriesOption)
    },
    setTopTags (topTags) {
      const tagNames = []
      const tagCount = []
      topTags.forEach(_ => {
        tagNames.push(_.tag)
        tagCount.push(_.count)
      })
      this.initTagsChart(tagNames, tagCount)
    },
    initTagsChart (tagNames, tagCount) {
      const tagsChart = echarts.init(document.getElementById('tags-chart'))
      const tagsOption = {
        title: {
          text: 'TOP10 标签统计图',
          top: -5,
          x: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            type: 'category',
            data: tagNames
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '标签统计',
            type: 'bar',
            color: ['#82d3f4'],
            barWidth: 18,
            data: tagCount,
            markPoint: {
              symbolSize: 45,
              data: [{
                type: 'max',
                itemStyle: { color: ['#3ecf8e'] },
                name: '最大值'
              }, {
                type: 'min',
                itemStyle: { color: ['#fa755a'] },
                name: '最小值'
              }]
            },
            markLine: {
              itemStyle: { color: ['#ab47bc'] },
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      }
      tagsChart.setOption(tagsOption)
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
  #about {
    min-height: 100%;
    #container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px 0;
      position: relative;
      z-index: 2;
      .el-card {
        border-radius: 8px;
      }
      .aboutCard {
        margin-top: -75px;
        @media screen and (max-width: 750px) {
          padding: 0 10px;
        }
        @media screen and (min-width: 750px) {
          padding: 0 15px;
        }
        #aboutCard {
          .el-row {
            padding: 7px;
          }
          .el-divider {
            margin: 5px 0 0 0;
          }
          .avatar {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .title {
            font-size: 2.25rem;
          }
          .description {
            line-height: 1.6;
            font-size: 1.2rem;
          }
          .mySkills, .otherSkill, .statistics {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 2.25rem 0 1.5rem 0;
            i {
              font-size: 2rem;
              margin: 0 5px;
            }
            .title {
              font-size: 2rem;
            }
          }
          #aplayerCard {
            margin: 0 auto;
            @media screen and (min-width: 750px) {
              width: 666px;
            }
            .aplayer {
              box-shadow: 0 5px 20px 0 rgba(0, 0, 0, .2), 0 10px 20px -12px rgba(0, 0, 0, .5) !important;
            }
          }
          .skillbar {
            position: relative;
            display: block;
            max-width: 360px;
            margin: 15px auto;
            background: #eee;
            height: 30px;
            border-radius: 35px;
            -moz-border-radius: 35px;
            -webkit-border-radius: 35px;
            -webkit-transition: 0.4s linear;
            -moz-transition: 0.4s linear;
            -o-transition: 0.4s linear;
            transition: 0.4s linear;
            -webkit-transition-property: width, background-color;
            -moz-transition-property: width, background-color;
            -o-transition-property: width, background-color;
            transition-property: width, background-color;
            .skillbar-title {
              position: absolute;
              top: 0;
              left: 0;
              width: 110px;
              font-size: 0.9rem;
              color: #ffffff;
              border-radius: 35px;
              -webkit-border-radius: 35px;
              -moz-border-radius: 35px;
              span {
                display: block;
                background: rgba(0, 0, 0, 0.15);
                padding: 0 20px;
                height: 30px;
                line-height: 30px;
                border-radius: 35px;
                -webkit-border-radius: 35px;
                -moz-border-radius: 35px;
              }
            }
            .skill-bar-percent {
              position: absolute;
              right: 10px;
              top: 0;
              font-size: 12px;
              height: 30px;
              line-height: 30px;
              color: #ffffff;
              color: rgba(0, 0, 0, 0.5);
            }
          }
          .tag-chips {
              margin: 1rem auto 0.5rem;
              max-width: 800px;
              text-align: center;
              .chip {
                margin: 10px 10px;
                padding: 19px 14px;
                display: inline-flex;
                line-height: 0;
                height: 32px;
                font-size: 1rem;
                font-weight: 500;
                border-radius: 5px;
                cursor: pointer;
                box-shadow: 0 3px 5px rgba(0, 0, 0, .12);
                z-index: 0;
                .tag-length {
                  margin-left: 5px;
                  margin-right: -2px;
                  font-size: 0.5rem;
                  color: #e91e63;
                  margin-top: 1px;
                }
              }
              .chip:hover {
                color: #fff;
                background: linear-gradient(to right, #4cbf30 0%, #0f9d58 100%) !important;
              }
              .chip-active {
                color: #FFF !important;
                background: linear-gradient(to bottom right, #FF5E3A 0%, #FF2A68 100%) !important;
                box-shadow: 2px 5px 10px #aaa !important;
                .tag-length {
                  color: #FFF !important;
                }
              }
            }
          #echarts {
            margin-top: 50px;
            #posts-chart,
            #categories-chart,
            #tags-chart {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 310px;
            }
          }
        }
      }
    }
  }
</style>
