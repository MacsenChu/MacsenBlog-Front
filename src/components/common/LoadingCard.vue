<template>
  <div id="loadingCard">
    <el-card :body-style="{ padding: '10px' }">
      <div v-if="loading">
        <i class="el-icon-loading"></i> loading...
      </div>
      <div v-else>
        <!-- &zwnj;它叫零宽不连字，全称是Zero Width Non Joiner，简称“ZWNJ”，
        是一个不打印字符，放在电子文本的两个字符之间，抑制本来会发生的连字，
        而是以这两个字符原本的字形来绘制。Unicode中的零宽不连字字符映射为“”（zero width non-joiner，U+200C），
        HTML字符值引用为： &#8204; -->
        <!-- 说了一大堆  我就是想用它占个高度 -->
        <span>&zwnj;</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['loading'],
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
  #loadingCard {
    .el-card {
      color: #606266;
      text-align: center;
      background-color: transparent;
      border: none;
      box-shadow: none;
    }
  }
</style>
