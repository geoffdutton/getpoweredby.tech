import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Auth from './views/Auth.vue'
import Logout from './views/Logout.vue'
import store from './store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/auth')
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    }
  ]
})
