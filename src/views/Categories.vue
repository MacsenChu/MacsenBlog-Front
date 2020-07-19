<template>
  <div id="categories">
    <cover></cover>
    <div id="container">
      <div class="categoriesCard">
        <el-card  data-aos="fade-down">
          <div class="title">
            <i class="iconfont icon-book-mark"></i>
            <span>文章分类</span>
          </div>
          <div class="tag-chips">
            <span :class="['chip', 'center-align', 'waves-effect', 'waves-light', 'chip-default', { 'chip-active': category.id === selectCategory }]"
                  v-for="(category, index) in categories" :key="category.id"
                  :style="{ 'background-color': ++index >= colorArr.length ? colorArr[Math.abs(hashCode(category.category) % colorArr.length)] : colorArr[index - 1] }"
                  @click="handleSelectCategory(category.id)">
              {{ category.category }}
              <span class="tag-length">{{ category.count }}</span>
            </span>
          </div>
        </el-card>
      </div>
      <div class="tagsCard" data-aos="fade-up" v-show="articleList.length === 0">
        <el-card>
          <div class="title">
            <i class="iconfont icon-biaoqian"></i>
            <span>文章标签</span>
          </div>
          <div id="tag-wordcloud"></div>
        </el-card>
      </div>
      <el-row class="archivesItem" v-if="articleList">
        <el-col :lg="8" :md="12" :sm="24" v-for="(article, index) in articleList" :key="index">
          <archives-item :article="article" />
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="limit"
        @current-change="handleCurrentChange"
        class="pagination center"
        hide-on-single-page>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import cover from '../components/common/Cover'
import archivesItem from '../components/Archives/ArchivesItem'
import $ from 'jquery'
import 'jqcloud2/dist/jqcloud.min'
import 'jqcloud2/dist/jqcloud.min.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
export default {
  components: {
    cover,
    archivesItem
  },
  data () {
    return {
      colorArr: ['#F9EBEA', '#F5EEF8', '#D5F5E3', '#E8F8F5', '#FEF9E7', '#F8F9F9', '#82E0AA', '#D7BDE2', '#A3E4D7', '#85C1E9', '#F8C471', '#F9E79F', '#FFF'],
      categories: [],
      selectCategory: 0,
      articleList: [],
      tags: [],
      limit: 15,
      offset: 0,
      total: 0
    }
  },
  created () {
    this.getCategories()
    this.getTags()
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
    async getCategories () {
      try {
        const { data: res } = await this.$http.get('category/categories')
        if (res.code !== 200) {
          return this.$message.error('分类列表获取失败')
        }
        this.categories = res.data
      } catch (e) {
        console.log(e)
      }
    },
    async getTags () {
      try {
        const { data: res } = await this.$http.get('tag/tagsCloud')
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.tags = res.data
        this.$nextTick(_ => {
          $('#tag-wordcloud').jQCloud(this.tags, {
            autoResize: true,
            height: 300
          })
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getArticleByCategories () {
      try {
        const { data: res } = await this.$http.get('article/category', {
          params: {
            categoryId: this.selectCategory,
            limit: this.limit,
            offset: this.offset * this.limit
          }
        })
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.total = res.data.total
        this.articleList = res.data.list
      } catch (e) {
        console.log(e)
      }
    },
    handleSelectCategory (categoryId) {
      this.offset = 0
      this.selectCategory = categoryId
      this.getArticleByCategories()
    },
    handleCurrentChange (val) {
      this.offset = val - 1
      this.getArticleByCategories()
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
  @import './src/assets/css/variables';
  #categories {
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
      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 1.75rem;
          padding: 0 5px;
        }
        font-size: 1.75rem;
      }
      .categoriesCard {
        margin: -75px 0 15px 0;
        @media screen and (max-width: 750px) {
          padding: 0 10px;
        }
        @media screen and (min-width: 750px) {
          padding: 0 15px;
        }
        .tag-chips {
          margin: 1rem auto 0.5rem;
          max-width: 850px;
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
      }
      .tagsCard {
        margin: 15px 0;
        @media screen and (max-width: 750px) {
          padding: 0 10px;
        }
        @media screen and (min-width: 750px) {
          padding: 0 15px;
        }
      }
      .archivesItem {
        @media screen and (max-width: 750px) {
          padding: 0 10px;
        }
        @media screen and (min-width: 750px) {
          padding: 0 5px;
        }
      }
    }
  }
</style>
