<template>
  <div id="archives">
    <cover></cover>
    <div id="container">
      <div class="archivesCard">
        <el-card>
          <div class="title">
            <i class="iconfont icon-archive"></i>
            <span>归档</span>
          </div>
        </el-card>
      </div>
      <div class="archives">
        <div class="archives-wrap">
          <div class="time-line"></div>
          <div class="list-content">
            <p class="normal-node">目前共计100篇文章~</p>
            <div
              class="bold-node"
              v-for="(year, key, index) in archives.archives"
              :key="index">
              <p>{{ key }}</p>
              <div
                class="bold-node month"
                v-for="(month, key, index) in year"
                :key="index">
                <p v-if="parseInt(key) < 10">{{ '0' + key }}</p>
                <p v-else>{{ key }}</p>
                <el-row class="archivesItem">
                  <el-col :lg="8" :md="12" :sm="24" v-for="(article, index) in month" :key="index">
                    <archives-item :article="article" />
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="archives.pages * 10"
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
export default {
  components: {
    cover,
    archivesItem
  },
  data () {
    return {
      pageNum: 1,
      pageSize: 15,
      archives: {}
    }
  },
  created () {
    this.getArchives()
  },
  mounted () {
  },
  methods: {
    async getArchives () {
      try {
        const { data } = await this.$http('archives', {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        })
        this.archives = data
        window.scrollTo(0, 0)
      } catch (e) {
        console.log(e)
      }
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.getArchives()
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
  @import './src/assets/css/variables';
  #archives {
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
      .archivesCard {
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
      .archives {
        position: relative;
        .archives-wrap {
          position: relative;
          width: 100%;
          padding: 10px 20px 10px 30px;
          animation: show .8s;
          @media (max-width: 768px) {
            padding: 10px 0 10px 15px;
          }
          .time-line {
            position: absolute;
            left: 30px;
            @media (max-width: 768px) {
              left: 15px;
            }
            top: 15px;
            bottom: 0;
            width: 2px;
            background-color: #dddddd;
          }
          .list-content {
            p {
              margin: 0;
            }
            .normal-node {
              position: relative;
              color: #555555;
              padding: 0 15px;
              font-size: 16px;
              margin-bottom: 20px;
              @media (max-width: 768px) {
                font-size: 14px;
              }
              &:before {
                position: absolute;
                left: -4px;
                top: 5px;
                content: "";
                width: 10px;
                height: 10px;
                border-radius: 10px;
                background-color: #999999;
                @media (max-width: 768px) {
                  left: -3px;
                  top: 4px;
                  width: 8px;
                  height: 8px;
                  border-radius: 8px;
                }
              }
            }
            .bold-node {
              position: relative;
              color: #555555;
              @media (min-width: 768px) {
                padding: 0 0 0 15px;
              }
              @media (max-width: 768px) {
                padding: 0 7.5px;
              }
              font-size: 28px;
              margin-bottom: 20px;
              @media (max-width: 768px) {
                font-size: 22px
              }
              &:before {
                position: absolute;
                left: -4px;
                top: 10px;
                content: "";
                width: 10px;
                height: 10px;
                border-radius: 10px;
                background-color: #999999;
                @media (max-width: 768px) {
                  left: -3px;
                  top: 8px;
                  width: 8px;
                  height: 8px;
                  border-radius: 8px;
                }
              }
              > p {
                margin-bottom: 20px
              }
              .month {
                color: #666666;
                font-size: 26px;
                @media (max-width: 768px) {
                  font-size: 20px;
                }
                &:before {
                  left: -19px;
                  @media (max-width: 768px) {
                    left: -10.5px;
                  }
                }
                .archivesItem {
                  width: 100%;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  flex-wrap: wrap;
                }
              }
            }
          }
        }
        .pagination {
          width: 100%;
          padding: 10px 0;
          display: flex;
          display: -webkit-flex;
          flex-direction: row;
          justify-content: center;
        }
      }
    }
  }

  @keyframes show {
    from {
      margin-top: -10px;
      opacity: 0;
    }
    to {
      margin-top: 0px;
      opacity: 1;
    }
  }
</style>
