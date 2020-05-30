import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store'

import PostListPage from '@/pages/PostListPage'
import PostViewPage from '@/pages/PostViewPage'
import Signup from '@/pages/Signup'
import Signin from '@/pages/Signin'
import PostCreatePage from '@/pages/PostCreatePage'
import PostEditPage from '@/pages/PostEditPage'

import AppHeader from '@/components/AppHeader'

Vue.use(Router)

export default new Router({

  mode: "history",
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
      beforeEnter(to, from, next){
        const {isAuthorized} = store.getters
        if(!isAuthorized){
          alert('로그인이 필요합니다!')
          next({name:'Signin'})
        }
        next()
      }
    },
    {
      path: '/post/:postId/edit',
      name: 'PostEditPage',
      components:{
        header: AppHeader,
        default: PostEditPage
      },
      props: {
        default: true
      }
    },
    {
      path: '/post/:postId',
      name: 'PostViewPage',
      components: {
        header: AppHeader,
        default: PostViewPage
      },
      props:{
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
  ]
})
