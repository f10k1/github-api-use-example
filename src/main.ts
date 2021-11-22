import Vue from 'vue';
import App from './App.vue';
import './assets/global.scss'
import router from './router'

const Btn = () => import(/* webpackChunkName: "Btn" */ '@/components/Btn.vue')
const Pagination = () => import(/* webpackChunkName: "Pagination" */ '@/components/Pagination.vue')

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

Vue.component("Btn", Btn)
Vue.component("Pagination", Pagination)