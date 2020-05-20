
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
        id: 5,
        name: '留言板',
        path: 'message',
        icon: 'icon-comments'
      },
      {
        id: 4,
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
    title: "Macsen's Blog",
    sign: '"其实我孤独的像条狗"',
    drawer: false,
    headerBgColor: '#354b60', // 假设后台获取的颜色
    headerColor: '#F5F5F5',
    headerActiveColor: '#273a47',
    sideBarBgColor: '#335B80',
    sideBarColor: '#354b60',
    sideBarActiveColor: 'rgba(0,0,0,0.06)'
  },
  mutations: {
    // 手机状态下侧边栏的开启和关闭
    switchSideBar (state, drawer) {
      state.drawer = !drawer
    }
  },
  actions: {
  }
}
