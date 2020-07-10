import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/article/:articleId',
    name: 'Article',
    component: () => import('../views/Article'),
    props: true
  },
  {
    path: '/archives',
    name: 'Archives',
    component: () => import('../views/Archives')
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/Categories')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/Message')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
})

export default router
