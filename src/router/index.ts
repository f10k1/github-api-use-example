import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'usersSearch',
    component: () => import(/* webpackChunkName: "usersSearch" */ '../views/UsersSearch.vue')
  },
  {
    path: '/user/:name',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
  },
  {
    path: '/repos/',
    name: 'reposSearch',
    component: () => import(/* webpackChunkName: "reposSearch" */ '../views/ReposSearch.vue')
  },
  {
    path: '/repo/:owner/:name',
    name: 'repo',
    component: () => import(/* webpackChunkName: "repo" */ '../views/Repo.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
