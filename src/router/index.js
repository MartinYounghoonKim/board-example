import Vue from 'vue'
import Router from 'vue-router'
import PostListPage from '@/pages/PostListPage'
import PostViewPage from '@/pages/PostViewPage'
import Signup from '@/pages/Signup'
import Signin from '@/pages/Signin'

import AppHeader from '@/components/AppHeader'
import PostCreatePage from '@/pages/PostCreatePage'
import PostEditPage from '@/pages/PostEditPage'

Vue.use(Router)
import store from '@/store'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PostListPage',
      components: {
        header: AppHeader,
        default: PostListPage
      }
    },
    {
      path: '/post/create',
      name: 'PostCreatePage',
      components: {
        header: AppHeader,
        default: PostCreatePage
      },
      beforeEnter (to, from, next) {
        const { isAuthorized } = store.getters
        if (!isAuthorized) {
          alert('로그인이 필요합니다!')
          // 로그인이 되어있지 않다면 로그인 페이지로 이동시킨다.
          next({ name: 'Signin' })
        }
        next()
      }
    },
    {
      path: '/post/:postId',
      name: 'PostViewPage',
      components: {
        header: AppHeader,
        default: PostViewPage,
      },
      props: {
        default: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      components: {
        header: AppHeader,
        default: Signup
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      components: {
        header: AppHeader,
        default: Signin
      }
    },
    {
      path: '/post/:postId/edit',
      name: 'PostEditPage',
      components: {
        header: AppHeader,
        default: PostEditPage
      },
      props: {
        default: true
      },
      beforeEnter (to, from, next) {
        const { isAuthorized } = store.getters
        if (!isAuthorized) {
          alert('로그인이 필요합니다!')
          next({ name: 'Signin' })
        }
        store.dispatch('fetchPost', to.params.postId)
          .then(res => {
            const post = store.state.post
            const isAuthor = post.user.id === store.state.me.id
            if (isAuthor) {
              // 일치한다면 라우팅을 그대로 진행한다.
              next()
            } else {
              // 일치하지않는다면 경고 문구를 노출시키고 이전 라우트로 이동시킨다.
              alert('게시물의 작성자만 게시물을 수정할 수 있습니다.')
              next(from)
            }
          }).catch(err => {
          alert(err.response.data.msg)
          next(false)
        })
      },
    }
  ]
})
