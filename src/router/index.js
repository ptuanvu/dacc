import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import HelloWorld from '@/components/HelloWorld'
import HomePage from '@/components/HomePage'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    }
  ],
  mode: 'history'
})
