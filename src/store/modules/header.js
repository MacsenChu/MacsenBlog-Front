
import axios from 'axios'
export default {
  namespaced: true,
  state: {
    tabs: [
      {
        id: 1,
        name: '首页',
        path: 'home',
        icon: 'icon-home'
      },
      {
        id: 2,
        name: '分类/标签',
        path: 'categories',
        icon: 'icon-biaoqian'
      },
      {
        id: 3,
        name: '归档',
        path: 'archives',
        icon: 'icon-archive'
      },
      {
        id: 4,
        name: '留言板',
        path: 'message',
        icon: 'icon-comments'
      },
      {
        id: 5,
        name: '关于',
        path: 'about',
        icon: 'icon-app_about'
      },
      {
        id: 6,
        name: '搜索',
        path: 'search',
        icon: 'icon-search'
      }
    ],
    headerInfo: {},
    drawer: false
  },
  mutations: {
    // 手机状态下侧边栏的开启和关闭
    switchSideBar (state, drawer) {
      state.drawer = !drawer
    },
    switchHeaderBgColor (state, color) {
      state.headerBgColor = color
    },
    // 初始化headerInfo
    initHeaderInfo (state, headerInfo) {
      state.headerInfo = headerInfo
    }
  },
  actions: {
    async getHeaderInfo (context) {
      // const headerInfo = await this.$http.get('headerInfo')
      const { data } = await axios.get('headerInfo')
      // console.log(data)
      context.commit('initHeaderInfo', data)
    }
  }
}
