import Vue from 'vue'
import Vuex from 'vuex'

import header from './modules/header'
import footer from './modules/footer'
import common from './modules/common'
import music from './modules/music'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    header,
    footer,
    common,
    music
  }
})
