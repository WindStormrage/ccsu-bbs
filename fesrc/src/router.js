import Vue from 'vue'
import VueRouter from 'vue-router'

import login from './pages/login.vue'
import home from './pages/home.vue'

import list from './pages/list.vue'
import post from './pages/post.vue'

import user from './pages/user.vue'
import userPost from './components/user/post.vue'
import userComment from './components/user/comment.vue'
import userInformation from './components/user/information.vue'
import userSetting from './components/user/setting.vue'

import admin from './pages/admin.vue'
import adminUser from './components/admin/user.vue'
import adminPermission from './components/admin/permission.vue'
import adminList from './components/admin/list.vue'

import NotFoundComponent from './pages/404.vue'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/list/:label_url',
      component: list
    },
    {
      path: '/list/:label_url/:post_id',
      component: post
    },
    {
      path: '/user',
      component: user,
      redirect: '/user/post',
      children: [
        {
          path: 'post',
          component: userPost
        },
        {
          path: 'comment',
          component: userComment
        },
        {
          path: 'information',
          component: userInformation
        },
        {
          path: 'setting',
          component: userSetting
        }
      ]
    },
    {
      path: '/admin',
      component: admin,
      redirect: '/admin/user',
      children: [
        {
          path: 'user',
          component: adminUser
        },
        {
          path: 'permission',
          component: adminPermission
        },
        {
          path: 'list/:label_url',
          component: adminList
        }
      ]
    },
    { 
      path: '*', 
      component: NotFoundComponent 
    }
  ]
});
