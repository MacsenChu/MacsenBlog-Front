<template>
  <div id="search">
    <cover></cover>
    <div id="container">
      <div class="searchCard">
        <el-card>
          <div class="title">
            <i class="iconfont icon-search"></i>
            <span>搜索</span>
          </div>
          <div class="description center"></div>
        </el-card>
        <el-input v-model="keyword" @keyup.enter.native="search" placeholder="请输入关键字检索...">
          <el-button type="primary" slot="append" @click="search">搜索</el-button>
        </el-input>
      </div>
      <div id="nomarlTags" v-if="articles.articleList.length === 0" data-aos="zoom-in-up">
        <span class="title"><i class="iconfont icon-biaoqian"></i>标签墙</span>
        <div class="tag-chips">
          <span  class="chip center-align waves-effect waves-light chip-default"
              v-for="(tag, index) in tags" :key="tag.id"
              :style="{ 'background-color': ++index >= colorArr.length ? colorArr[Math.abs(hashCode(tag.tag) % colorArr.length)] : colorArr[index - 1] }"
              @click="handleSelectTags(tag.id, tag.tag)">
          {{ tag.tag }}
          <span class="tag-length">{{ tag.count }}</span>
        </span>
        </div>
      </div>
      <div id="main" v-if="articles.articleList.length > 0">
        <el-row>
          <el-col :lg="18" :md="18">
            <item-card v-for="article in articles.articleList" :key="article.id" :article="article" :delay="0"></item-card>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="limit"
              @current-change="handleCurrentChange"
              class="pagination center"
              hide-on-single-page>
            </el-pagination>
          </el-col>
          <el-col :lg="6" :md="6" class="hidden-sm-and-down sideCard">
            <div v-sticky="sticky" ref="asideStick" id="asideStick" data-aos="fade-left">
              <el-card :body-style="{ padding: '0px' }" class="tags">
                <span class="iconName"><i class="iconfont icon-biaoqian"></i>标签墙</span>
                <div class="tag-chips">
                  <span :class="['chip', 'center-align', 'waves-effect', 'waves-light', 'chip-default', { 'chip-active': tag.id === selectTag }]"
                        v-for="(tag, index) in tags" :key="tag.id"
                        :style="{ 'background-color': ++index >= colorArr.length ? colorArr[Math.abs(hashCode(tag.tag) % colorArr.length)] : colorArr[index - 1] }"
                        @click="handleSelectTags(tag.id, tag.tag)">
                    {{ tag.tag }}
                    <span class="tag-length">{{ tag.count }}</span>
                  </span>
                </div>
              </el-card>
              <footer-card></footer-card>
              <div class="blank"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <blog-footer v-if="isMobile" />
  </div>
</template>

<script>
import cover from '../components/common/Cover'
import itemCard from '../components/common/ItemCard'
import footerCard from '../components/common/FooterCard'
import BlogFooter from '../components/BlogFooter/BlogFooter'
import VueSticky from 'vue-sticky'
import AOS from 'aos'
import 'aos/dist/aos.css'
export default {
  components: {
    cover,
    itemCard,
    footerCard,
    BlogFooter
  },
  directives: {
    sticky: VueSticky
  },
  data () {
    return {
      keyword: '',
      selectTag: 0,
      colorArr: ['#F9EBEA', '#F5EEF8', '#D5F5E3', '#E8F8F5', '#FEF9E7', '#F8F9F9', '#82E0AA', '#D7BDE2', '#A3E4D7', '#85C1E9', '#F8C471', '#F9E79F', '#FFF'],
      tags: [],
      articles: {
        articleList: []
      },
      loading: false,
      screenHeight: document.documentElement.clientHeight,
      limit: 10,
      offset: 0,
      total: 0,
      sticky: {
        stickyTop: 75,
        disabled: false
      },
      isMobile: false
    }
  },
  created () {
    this.getTags()
  },
  mounted () {
    AOS.init()
    if (document.documentElement.clientWidth < 768) {
      this.isMobile = true
    }
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
    async search () {
      if (this.keyword.trim() === '') {
        this.$message.error('搜索内容不能为空')
        return
      }
      try {
        const { data: res } = await this.$http.get('search', {
          params: {
            keyword: this.keyword,
            limit: this.limit,
            offset: this.offset * this.limit
          }
        })
        if (res.code === 404) {
          return this.$message.info('没有找到该文章')
        } else if (res.code === 200) {
          this.total = res.data.total
          this.articles = res.data
          this.setStickTop()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getTags () {
      try {
        const { data: res } = await this.$http.get('tag/tags')
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.tags = res.data
      } catch (e) {
        console.log(e)
      }
    },
    handleSelectTags (tagId, tag) {
      this.selectTag = tagId
      this.keyword = tag
      this.search()
    },
    setStickTop () {
      this.$nextTick(_ => {
        const clientHeight = this.$refs.asideStick.clientHeight
        // 设元素高为x，当前屏幕高为y，如果想让到底的时候固定住，那么stickTop的值为-(x-y)
        // stickTop = - (x - y)
        if (clientHeight >= this.screenHeight) {
          this.sticky.stickyTop = this.screenHeight - clientHeight
        } else {
          // 导航栏高是60
          this.sticky.stickyTop = 75
        }
      })
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.search()
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="less" scoped>
  @import './src/assets/css/variables';
  #search {
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
      .searchCard {
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
      }
      .el-input {
        margin: 20px 0;
        /deep/ .el-input__inner {
          line-height: 20px;
          border-radius: 8px 0 0 8px;
          padding: 23px 15px 23px 14px;
        }
        /deep/ .el-input-group__append {
          border-radius: 0 8px 8px 0;
          text-align: center;
          background-color: #3083FF;
          color: #FFF;
          border: none;
        }
        /deep/ .el-button {
          @media screen and (min-width: 750px) {
            width: 100px;
            font-size: 15px;
          }
        }
      }
      #nomarlTags {
        .title, i {
          font-size: 1.75rem;
          color: @articleColor;
        }
        .title {
          i {
            margin: 5px;
          }
        }
        max-width: 850px;
        text-align: center;
        @media screen and (min-width: 750px) {
          margin: 20px auto 40px auto;
        }
        @media screen and (max-width: 750px) {
          margin: 20px auto;
        }
        .iconName {
          i {
            font-size: 20px;
            padding: 5px;
          }
          font-size: 20px;
        }
        .tag-chips {
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
        }
      }
      #main {
        display:flex;
        .el-row {
          .sideCard {
            height: 100%;
          }
        }
        .tags {
          background-color: transparent;
          border: none;
          box-shadow: none;
          .iconName {
            i {
              font-size: 20px;
              margin: 5px;
            }
            font-size: 20px;
          }
          .tag-chips {
            margin: 5px 0;
            .chip {
              margin: 5px;
              display: inline-flex;
              line-height: 28px;
              height: 28px;
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
        }
        .blank {
          height: 30px;
        }
      }
    }
  }
</style>
