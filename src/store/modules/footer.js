import axios from 'axios'
export default {
  namespaced: true,
  state: {
    footerInfo: {
      id: 1,
      visits_count: '8888',
      visitors_count: '6666',
      runtime: '2020-05-20T05:21:00',
      recordNumber: '88888888',
      recordName: 'Macsen Chu',
      copyrightYear: new Date().getFullYear(),
      copyrightName: 'Macsen'
    }
  },
  mutations: {
    // 初始化footerInfo
    initFooterInfo (state, footerInfo) {
      state.footerInfo = footerInfo
    }
  },
  actions: {
    async getFooterInfo (context) {
      try {
        const { data } = await axios.get('footerInfo')
        context.commit('initFooterInfo', data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
