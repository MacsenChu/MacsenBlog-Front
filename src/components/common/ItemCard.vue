<template>
  <div id="card" class="reveal-fadeInLeft">
    <el-card id="normalCard" :body-style="{ padding: '0px' }">
      <el-row>
        <el-col :spam="12" class="card-image">
          <el-image :src="article.cover" fit="cover" lazy></el-image>
        </el-col>
        <el-col :span="12">
          <div class="card-content">
              <div class="title">{{ article.title }}</div>
            <el-row>
              <div class="card_bottom">
                <el-col :span="2" class="userInfo">
                  <el-avatar :size="24" :src="article.avatar" />
                </el-col>
                <el-col :span="5">
                  <span class="author">{{ article.author }}</span>
                </el-col>
                <el-col :span="10">
                  <span class="date-text">{{ article.createTime | dateFormatToDate }}</span>
                </el-col>
                <el-col :span="4">
                  <i class="iconfont icon-shandian"></i>
                  <span class="article_info_count">{{ article.likes }}</span>
                  <i class="iconfont icon-pinglun"></i>
                  <span class="article_info_count">{{ article.comments }}</span>
                </el-col>
              </div>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card id="mobileCard" :body-style="{ padding: '0px' }">
      <el-row>
        <el-image :src="article.cover" fit="cover" lazy></el-image>
        <el-row class="userInfo">
          <el-avatar :size="24" :src="article.avatar" />
          <span class="author">{{ article.author }}</span>
          <span class="date-text">{{ article.createTime | dateFormatToDate }}</span>
        </el-row>
      </el-row>
      <el-row>
        <div class="title">《再见狂野之心》：合成器流行专辑与刺激竞速的碰撞</div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import scrollReveal from 'scrollreveal'
export default {
  props: ['article'],
  data () {
    return {
      scrollReveal: scrollReveal()
    }
  },
  mounted () {
    this.scrollReveal.reveal('.reveal-fadeInLeft', {
      // 动画的时长
      duration: 350,
      // 延迟时间
      delay: 200,
      // 动画开始的位置，'bottom', 'left', 'top', 'right'
      origin: 'left',
      // 回滚的时候是否再次触发动画
      reset: false,
      // 在移动端是否使用动画
      mobile: true,
      // 滚动的距离，单位可以用%，rem等
      distance: '300px',
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
      /*display: none;*/
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
            color: #8E8787;
            .el-avatar {
              cursor:pointer;
            }
            .author {
              color: #292525;
              cursor:pointer;
            }
            .article_info_count {
              padding: 5px;
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
        height: auto;
        margin: 5px;
        font-weight: 600;
        font-size: 17px;
        line-height: 1.4;
        text-align: left;
      }
      &:hover {
        transform: scale(1.05);
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
        .title {
          padding: 10px 0;
          font-size: 15px;
        }
      }
    }
  }
</style>
