import Vue from 'vue'
import VueRouter from 'vue-router'
import GameSelect from '@/views/GameSelect.vue'
import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'gameselect',
    component: GameSelect
  },
  {
    path: '/play/:gameKey',
    name: 'play',
    component: () => import(/* webackChunkName: "play" */ '../views/Play.vue'),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if (store.getters.inGame) {
        next()
      } else {
        next("/")
      }
    }
  },
  {
    path: "*",
    // component: Home
    redirect: { name: 'gameselect' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
