import axios from 'axios'
export default {
  namespaced: true,
  state: {
    music: []
  },
  mutations: {
    initMusic (state, music) {
      state.music = music
    }
  },
  actions: {
    async getMusic (context) {
      try {
        const { data: res } = await axios.get('musics')
        if (res.code === 200) {
          context.commit('initMusic', res.data)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
