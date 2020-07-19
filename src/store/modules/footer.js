import axios from 'axios'
export default {
  namespaced: true,
  state: {
    footerInfo: {
      id: 1,
      visitsCount: '8888',
      visitorsCount: '6666',
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
        const { data: res } = await axios.get('footerInfo')
        if (res.code === 200) {
          context.commit('initFooterInfo', res.data)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
