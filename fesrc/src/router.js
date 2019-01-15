import VueRouter from 'vue-router'


export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
      children: [
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
          component: list,
          children: [
            {
              path: '/:post_id',
              component: post
            }
          ]
        },
        {
          path: '/user',
          redirect: '/user/post',
          children: [
            {
              path: '/post',
              component: userPost
            },
            {
              path: '/comment',
              component: comment
            },
            {
              path: '/information',
              component: information
            },
            {
              path: '/setting',
              component: setting
            }
          ]
        }
      ]
    },
    {
      path: '/admin',
      redirect: '/admin/user',
      children: [
        {
          path: '/user',
          component: adminUser
        },
        {
          path: '/permission',
          component: adminPermission
        },
        {
          path: '/list/:label_url',
          component: adminList
        }
      ]
    }
  ]
})