import Vue from 'vue'
import Router from 'vue-router'
import BoardListPage from '@/pages/BoardListPage'
import BoardViewPage from '@/pages/BoardViewPage'
import Signup from '@/pages/Signup'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BoardListPage',
      component: BoardListPage
    },
    {
      path: '/post/:postId',
      name: 'BoardViewPage',
      component: BoardViewPage,
      props: true
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
})
