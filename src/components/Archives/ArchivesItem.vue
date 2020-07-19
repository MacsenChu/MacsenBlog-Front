<template>
  <div id="archivesItem" class="wow fadeInDown" style="animation-duration: 600ms">
    <transition name="el-fade-in-linear">
      <el-card id="normalCard" :body-style="{ padding: '0px' }">
      <el-row>
        <router-link target="_blank" :to="/article/ + article.id">
          <el-image :src="article.cover" fit="cover"></el-image>
        </router-link>
        <el-row class="userInfo">
          <el-avatar :size="24" :src="article.avatar" />
          <span class="author">{{ article.author }}</span>
        </el-row>
      </el-row>
      <el-row>
        <div class="title">{{ article.title }}</div>
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
import { WOW } from 'wowjs'
export default {
  props: ['article'],
  data () {
    return {
      show: false
    }
  },
  mounted () {
    new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      mobile: true,
      live: false
    }).init()
  }
}
</script>

<style lang="less" scoped>
  @import './src/assets/css/variables';
  #archivesItem {
    @media (min-width: 768px) {
      padding: 0 10px;
      margin-bottom: 20px;
    }
    @media (max-width: 768px) {
      margin-bottom: 15px;
    }
    #normalCard {
      color: @articleColor;
      border-radius: 8px;
      &:hover {
        transform: scale(1.05);
      }
      div {
        font-size: 15px;
      }
      .el-row.userInfo {
        width: 100%;
        position: absolute;
        left: 20px;
        bottom: 20px;
        display: flex;
        justify-content: flex-start;
        align-content: flex-start;
        .author {
          padding-left: 10px;
          color: #F5F5F5;
        }
      }
      .title {
        color: #292525;
        height: auto;
        margin: 5px;
        font-weight: 600;
        font-size: 17px;
        line-height: 1.4;
        text-align: left;
        @media screen and (min-width: 750px) {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
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
</style>
