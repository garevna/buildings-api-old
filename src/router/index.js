import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Buildings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/:role',
    name: 'supervisor',
    component: Home,
    params: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
