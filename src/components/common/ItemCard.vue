<template>
  <div id="card" class="reveal-fadeInLeft">
    <transition name="el-fade-in-linear">
      <el-card id="normalCard" :body-style="{ padding: '0px' }">
        <el-row>
          <el-col :spam="12" class="card-image">
            <router-link target="_blank" :to="/article/ + article.id">
              <el-image :src="article.cover" fit="cover"></el-image>
            </router-link>
          </el-col>
          <el-col :span="12">
            <div class="card-content">
              <router-link target="_blank" :to="/article/ + article.id">
                <div class="title">{{ article.title }}</div>
              </router-link>
              <el-row>
                <div class="card_bottom">
                  <div class="userInfo">
                    <div class="userAvatar">
                      <router-link target="_blank" :to="/article/ + article.id">
                        <el-avatar :size="24" :src="article.avatar" />
                      </router-link>
                    </div>
                    <div class="userName">
                      <router-link target="_blank" :to="/article/ + article.id">
                        <span class="author">{{ article.author }}</span>
                      </router-link>
                    </div>
                    <div class="createTime">
                      <span class="date-text">{{ article.createTime | dateFormatToDate }}</span>
                    </div>
                  </div>
                  <div class="articleInFoCount">
                    <router-link target="_blank" :to="/article/ + article.id">
                      <i class="iconfont icon-shandian"></i>
                      <span class="article_info_count">{{ article.likesCount | countFilter }}</span>
                    </router-link>
                    <router-link target="_blank" :to="/article/ + article.id" class="articleCommentIcon">
                      <i class="iconfont icon-pinglun"></i>
                      <span class="article_info_count">{{ article.commentsCount | countFilter }}</span>
                    </router-link>
                  </div>
                </div>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </transition>
    <transition name="el-fade-in-linear">
      <el-card id="mobileCard" :body-style="{ padding: '0px' }">
      <el-row>
        <router-link target="_blank" :to="/article/ + article.id">
          <el-image :src="article.cover" fit="cover"></el-image>
        </router-link>
        <el-row class="userInfo">
          <el-avatar :size="24" :src="article.avatar" />
          <span class="author">{{ article.author }}</span>
          <span class="date-text">{{ article.createTime | dateFormatToDate }}</span>
        </el-row>
      </el-row>
      <el-row>
        <router-link target="_blank" :to="/article/ + article.id">
          <div class="title">{{ article.title }}</div>
        </router-link>
      </el-row>
      <div class="articleDateRow">
        <span><i class="iconfont icon-calendar-minus"></i>{{ article.updateTime | dateFormatToDate }}</span>
        <span><i class="iconfont icon-book-mark"></i>{{ article.category.category }}</span>
      </div>
      <el-divider></el-divider>
      <div class="infoCount">
        <el-tag size="small" effect="plain">
          {{ article.tags[0].tag }}
        </el-tag>
        <div class="articleInFoCount">
          <router-link target="_blank" :to="/article/ + article.id">
            <i class="iconfont icon-shandian"></i>
            <span class="article_info_count">{{ article.likesCount | countFilter }}</span>
          </router-link>
          <router-link target="_blank" :to="/article/ + article.id" class="articleCommentIcon">
            <i class="iconfont icon-pinglun"></i>
            <span class="article_info_count">{{ article.commentsCount | countFilter }}</span>
          </router-link>
        </div>
      </div>
    </el-card>
    </transition>
  </div>
</template>

<script>
import scrollReveal from 'scrollreveal'
export default {
  props: ['article', 'delay'],
  data () {
    return {
      scrollReveal: scrollReveal()
    }
  },
  mounted () {
    this.scrollReveal.reveal('.reveal-fadeInLeft', {
      // 动画的时长
      duration: 300,
      // 延迟时间
      delay: this.delay,
      // 动画开始的位置，'bottom', 'left', 'top', 'right'
      origin: 'left',
      // 回滚的时候是否再次触发动画
      reset: false,
      // 在移动端是否使用动画
      mobile: true,
      // 滚动的距离，单位可以用%，rem等
      distance: '200px',
      // 其他可用的动画效果
      easing: 'ease-out',
      scale: 0.9
    })
  }
}
</script>

<style lang="less" scoped>
  #card {
    width: 100%;
    padding: 0 15px;
    margin-bottom: 15px;
    #normalCard {
      height: 200px !important;
      border: 0;
      .card-image {
        overflow: hidden;
        width: 50%;
        transition: width 300ms;
        .el-image {
          height: 200px !important;
          cursor:pointer;
          transition: transform 300ms;
        }
      }
      .el-col {
        .card-content {
          padding: 30px;
          width: 100%;
          height: 200px;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          transition: padding-left 400ms;
          .title {
            color: #292525;
            font-weight: 600;
            font-size: 20px;
            height: 57px;
            margin-bottom: 20px;
            line-height: 1.4;
            text-align: left;
            cursor:pointer;
          }
          .card_bottom {
            height: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #8E8787;
            .userInfo {
              display: flex;
              justify-content: space-between;
              align-items: center;
              div {
                padding-right: 10px;
              }
              .userAvatar {
                margin-top: 5px;
              }
            }
            .el-avatar {
              cursor:pointer;
            }
            .author {
              color: #292525;
              cursor:pointer;
            }
            .articleInFoCount {
              a {
                color: #8e8787;
              }
              .articleCommentIcon {
                margin-left: 10px;
              }
              .icon-shandian {
                padding: 1px;
              }
              .icon-pinglun {
                padding: 5px;
              }
            }
          }
        }
      }
      &:hover {
        .card-image {
          width: 48%;
        }
        .el-image {
          transform: scale(1.1);
        }
        .card-content {
          padding-left: 15px;
        }
      }
    }

    #mobileCard {
      display: none;
      transition: transform 300ms;
      border-radius: 8px;
      .el-image {
        position: relative;
      }
      .el-row.userInfo {
        width: 100%;
        position: absolute;
        left: 20px;
        bottom: 20px;
        display: flex;
        justify-content: flex-start;
        align-content: flex-start;
        .author, .date-text {
          padding-left: 10px;
          color: #F5F5F5;
        }
      }
      .title {
        color: #292525;
        margin: 10px 5px 5px 5px;
        padding: 5px;
        font-weight: 600;
        font-size: 17px;
        line-height: 1.4;
        text-align: left;
      }
      &:hover {
        transform: scale(1.05);
      }
      .articleDateRow {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          i {
            padding-right: 1px;
          }
          padding: 10px;
        }
      }
      .el-divider {
        margin: 0;
      }
      .infoCount {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el-tag {
          border-radius: 15px;
          padding: 0 15px;
          margin: 10px;
        }
        .articleInFoCount {
          padding: 0 15px;
          a {
            color: #8e8787;
          }
          .articleCommentIcon {
            margin-left: 5px;
          }
          .icon-shandian {
            padding: 1px;
          }
          .icon-pinglun {
            padding: 5px;
          }
        }
      }
    }
  }

  #card {
    @media screen and (max-width: 750px) {
      font-size: 14px;
      #normalCard {
        display: none;
      }
      #mobileCard {
        display: block;
      }
    }
  }
</style>
