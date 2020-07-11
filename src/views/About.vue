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
            <el-divider></el-divider>
          </el-row>
          <el-row>
            <div class="description center">
              <div>
                Hi，我叫初明泽，也是Macsen~ <br>
                出生于2000年，目前折腾在 0 和 1 世界里
              </div>
              <div style="margin-top: 20px">
                我没有高颜值的外表 <br>
                没有可以挥霍的资本 <br>
                没有人喜欢我三五年 <br>
                我就是想漫无目的的走走 <br>
                如果可以的话努努力发笔小财<br>
                然后买点自己喜欢的东西
              </div>
              <div style="margin: 20px 0">
                但即便这样，我也对未来充满愿景 <br>
                我也相信终有一天会找到我自己的神明 <br>
                那时候，神明一来，所有抑郁不欢而散 <br>
                取而代之的，是满天繁星
              </div>
              <el-divider></el-divider>
              <div style="margin-top: 20px">
                “感性的人过不了柴米油盐，理性的人过不了风花雪月。”<br>“愿你，一半烟火，一半诗意，过成自己喜欢的样子。”
              </div>
              <br>
            </div>
          </el-row>
          <el-row id="aplayerCard">
            <div id="aplayerCore"></div>
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
export default {
  components: {
    cover,
    socialLink
  },
  data () {
    return {
    }
  },
  mounted () {
    AOS.init()
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
      audio: [
        {
          name: 'そばにいるね',
          artist: '青山テルマ',
          url: 'https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcUMxQkwwWkdfYnFsV0ZINVJxNUQtMzhJRzhhP2U9WFliczZO.mp3',
          cover: 'http://p2.music.126.net/GFbvZasO56D_Co6Rr31srA==/109951163089243761.jpg?param=130y130',
          lrc: '[00:00.000] 作曲 : Soulja\n' +
            '[00:01.000] 作词 : Soulja、青山テルマ\n' +
            '[00:12.200]あなたのこと 私は今でも\n' +
            '[00:14.690]思い続けているよ\n' +
            '[00:17.780]いくら時流れて行こうと\n' +
            '[00:20.620]I\'m by your side baby いつでも\n' +
            '[00:23.820]So. どんなに離れていようと\n' +
            '[00:26.710]心の中では  いつでも\n' +
            '[00:29.660]一緒にいるけど 寂しいんだよ\n' +
            '[00:32.610]So baby please ただ hurry back home\n' +
            '[00:35.170]\n' +
            '[00:35.750]Baby boy あたしはここにいるよ\n' +
            '[00:39.870]どこもいかずに待ってるよ\n' +
            '[00:42.720]You know dat I love you だからこそ\n' +
            '[00:45.720]心配しなくていいんだよ\n' +
            '[00:48.810]どんなに遠くにいても\n' +
            '[00:51.820]変わらないよこの心\n' +
            '[00:54.970]言いたい事わかるでしょ?\n' +
            '[00:57.850]あなたのこと待ってるよ\n' +
            '[00:59.400]\n' +
            '[01:00.240]BOY(SoulJa):\n' +
            '[01:01.130]んなことよりお 前の方は元気か?\n' +
            '[01:04.250]ちゃんと飯食ってるか?\n' +
            '[01:06.530]ちくしょう、やっぱ言えねぇや\n' +
            '[01:08.790]また今度送るよ 俺からの\n' +
            '[01:10.830]\n' +
            '[01:11.630]GIRL(青山テルマ)\n' +
            '[01:12.260]過ぎ去った時は戻せないけれど\n' +
            '[01:17.590]近くにいてくれた君が恋しいの\n' +
            '[01:23.790]だけど あなたとの距離が遠くなる程に\n' +
            '[01:29.410]忙しくみせていた\n' +
            '[01:32.340]あたし逃げてたの\n' +
            '[01:35.680]だけど 目を閉じる時 眠ろうとする時\n' +
            '[01:39.170]逃げきれないよ あなたの事\n' +
            '[01:43.130]思い出しては 一人泣いてたの\n' +
            '[01:47.440]\n' +
            '[01:48.000]あなたのこと  私は今でも\n' +
            '[01:50.530]思い続けているよ\n' +
            '[01:53.600]いくら時流れて行こうと\n' +
            '[01:56.490]I\'m by your side baby いつでも\n' +
            '[01:59.670]So. どんなに離れていようと\n' +
            '[02:02.550]心の中では いつでも\n' +
            '[02:05.540]一緒にいるけど 寂しいんだよ\n' +
            '[02:08.510]So baby please ただ hurry back home\n' +
            '[02:11.160]\n' +
            '[02:11.710]Baby boy あたしはここにいるよ\n' +
            '[02:15.720]どこもいかずに待ってるよ\n' +
            '[02:18.800]You know dat I love you だからこそ\n' +
            '[02:21.860]心配しなくていいんだよ\n' +
            '[02:24.670]どんなに遠くにいても\n' +
            '[02:27.830]変わらないよこの心\n' +
            '[02:30.750]言いたい事わかるでしょ?\n' +
            '[02:33.810]あなたのこと待ってるよ\n' +
            '[02:35.400]\n' +
            '[02:36.050]BOY(SoulJa):\n' +
            '[02:36.920]不器用な俺 遠くにいる君\n' +
            '[02:39.490]伝えたい気持ちそのまま言えずに\n' +
            '[02:42.340]君は行っちまった\n' +
            '[02:44.740]今じゃ殘された君はアルバムの中\n' +
            '[02:46.600]\n' +
            '[02:47.200]GIRL(青山テルマ)\n' +
            '[02:47.950]アルバムの中 納めた思い出の\n' +
            '[02:53.410]日々より 何げない一時が\n' +
            '[02:56.680]今じゃ戀しいの\n' +
            '[02:58.810]（BOY:君のぬくもり\n' +
            '[02:59.680]And now あなたからの電話待ち続けていた\n' +
            '[03:05.630]攜帯にぎりしめながら眠りについた\n' +
            '[03:10.930]（BOY:抱きしめてやりたい\n' +
            '[03:11.970]あたしは どこも行かない\n' +
            '[03:13.880]ここにいるけれど\n' +
            '[03:15.390]見つめ合いたいあなたのその瞳\n' +
            '[03:19.190]ねぇわかるでしょ? あたし待ってるよ\n' +
            '[03:24.190]\n' +
            '[03:35.680]Baby boy あたしはここにいるよ\n' +
            '[03:39.670]どこもいかずに待ってるよ\n' +
            '[03:42.720]You know dat I love you だからこそ\n' +
            '[03:46.000]心配しなくていいんだよ\n' +
            '[03:48.820]どんなに遠くにいても\n' +
            '[03:51.900]変わらないよこの心\n' +
            '[03:54.910]言いたい事わかるでしょ?\n' +
            '[03:57.760]あなたのこと待ってるよ\n' +
            '[03:59.200]\n' +
            '[03:59.700]BOY(SoulJa):\n' +
            '[04:00.200]俺はどこも行かないよ\n' +
            '[04:01.710]ここにいるけれど\n' +
            '[04:03.350]探し続けるあなたの顏\n' +
            '[04:06.000]Your 笑顏 今でも觸れそうだって\n' +
            '[04:09.300]思いながら手を伸ばせば 君は\n' +
            '[04:11.800]\n' +
            '[04:12.210]GIRL(青山テルマ)\n' +
            '[04:12.890]あなたのこと 私は今でも\n' +
            '[04:14.670]思い続けているよ\n' +
            '[04:17.630]いくら時流れて行こうと\n' +
            '[04:20.650]I\'m by your side baby いつでも\n' +
            '[04:23.590]So. どんなに離れていようと\n' +
            '[04:26.520]心の中では  いつでも\n' +
            '[04:29.590]一緒にいるけど 寂しいんだよ\n' +
            '[04:32.630]So baby please ただ hurry back home\n' +
            '[04:35.070]\n' +
            '[04:35.850]あなたのこと 私は今でも\n' +
            '[04:38.750]思い続けているよ\n' +
            '[04:41.880]いくら時流れて行こうと\n' +
            '[04:44.600]I\'m by your side baby いつでも\n' +
            '[04:47.660]So. どんなに離れていようと\n' +
            '[04:50.530]心の中では  いつでも\n' +
            '[04:53.570]一緒にいるけど 寂しいんだよ\n' +
            '[04:56.610]So baby please ただ hurry back hom',
          theme: '#46718b'
        }
      ]
    })
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
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
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
          #aplayerCard {
            @media screen and (min-width: 750px) {
              width: 666px;
            }
            .aplayer {
              box-shadow: 0 5px 20px 0 rgba(0, 0, 0, .2), 0 10px 20px -12px rgba(0, 0, 0, .5) !important;
            }
          }
        }
      }
    }
  }
</style>
