<template>
  <span ref="descStr"></span>
</template>

<script>
import { init } from 'ityped'
export default {
  name: 'typed',
  props: ['signature'],
  data () {
    return {
    }
  },
  mounted () {
    // ityped
    init(this.$refs.descStr, {
      showCursor: true,
      strings: [this.signature],
      typeSpeed: 100,
      startDelay: 500,
      loop: false
    })
  }
}
</script>
