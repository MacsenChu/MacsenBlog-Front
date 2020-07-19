import axios from 'axios'
export default {
  namespaced: true,
  state: {
    swiperList: [
      {
        id: 1,
        title: 'Macsen',
        signature: '"你要藏好软弱，世界大雨滂沱。万物苟且而活，无人为你背负更多。"',
        imgUrl: require('../../assets/images/swiper1.jpg')
      },
      {
        id: 2,
        title: 'Macsen',
        signature: '"人的内心不种满鲜花就会长满杂草。"',
        imgUrl: require('../../assets/images/swiper2.jpg')
      },
      {
        id: 3,
        title: 'Macsen',
        signature: '当我走遍了1——17层地狱分毫未伤时，我走到了18层，你却对我说“欢迎来到人间”。',
        imgUrl: require('../../assets/images/swiper3.jpg')
      },
      {
        id: 4,
        title: 'Macsen',
        signature: 'When I went through 1-17 layers of hell without any harm, I went to the 18th floor, but you said "welcome to the world。"',
        imgUrl: require('../../assets/images/swiper4.jpg')
      },
      {
        id: 5,
        title: 'Macsen',
        signature: '"如果我不曾见过太阳，我本可以忍受黑暗。"',
        imgUrl: require('../../assets/images/swiper5.jpg')
      },
      {
        id: 6,
        title: 'Macsen',
        signature: '"我在人间凑数的日子。"',
        imgUrl: require('../../assets/images/swiper6.jpg')
      }
    ],
    loading: false
  },
  mutations: {
    // 初始化swiperList
    initSwiperList (state, swiperList) {
      state.swiperList = swiperList
    },
    // 手机状态下侧边栏的开启和关闭
    switchLoadingStatus (state, loading) {
      state.loading = !loading
    }
  },
  actions: {
    async getSwiperList (context) {
      try {
        const { data: res } = await axios.get('swipers')
        if (res.code === 200) {
          context.commit('initSwiperList', res.data)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
