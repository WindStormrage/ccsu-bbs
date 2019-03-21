import VueRouter from 'vue-router'

// import login from './pages/login.vue'
// import home from './pages/home.vue'

// import list from './pages/list.vue'
// import post from './pages/post.vue'

// import user from './pages/user.vue'
// import userPost from './components/user/post.vue'
// import userComment from './components/user/comment.vue'
// import userInformation from './components/user/information.vue'
// import userSetting from './components/user/setting.vue'

// import admin from './pages/admin.vue'
// import adminUser from './components/admin/user.vue'
// import adminPermission from './components/admin/permission.vue'
// import adminList from './components/admin/list.vue'

// import NotFoundComponent from './pages/404.vue'


const login = r => require.ensure([], () => r(require('./pages/login.vue')), 'login');
const home = r => require.ensure([], () => r(require('./pages/home.vue')), 'home');

const list = r => require.ensure([], () => r(require('./pages/list.vue')), 'list');
const post = r => require.ensure([], () => r(require('./pages/post.vue')), 'post');

const user = r => require.ensure([], () => r(require('./pages/user.vue')), 'user');
const userPost = r => require.ensure([], () => r(require('./components/user/post.vue')), 'userPost');
const userComment = r => require.ensure([], () => r(require('./components/user/comment.vue')), 'userComment');
const userInformation = r => require.ensure([], () => r(require('./components/user/information.vue')), 'userInformation');
const userSetting = r => require.ensure([], () => r(require('./components/user/setting.vue')), 'userSetting');

const admin = r => require.ensure([], () => r(require('./pages/admin.vue')), 'admin');
const adminUser = r => require.ensure([], () => r(require('./components/admin/user.vue')), 'adminUser');
const adminPermission = r => require.ensure([], () => r(require('./components/admin/permission.vue')), 'adminPermission');
const adminList = r => require.ensure([], () => r(require('./components/admin/list.vue')), 'adminList');

const NotFoundComponent = r => require.ensure([], () => r(require('./pages/404.vue')), 'NotFoundComponent');

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
          component: userPost,
          name: 'userPost'
        },
        {
          path: 'comment',
          component: userComment,
          name: 'userComment'
        },
        {
          path: 'information',
          component: userInformation,
          name: 'userInformation'
        },
        {
          path: 'setting',
          component: userSetting,
          name: 'userSetting'
        }
      ]
    },
    {
      path: '/admin',
      component: admin,
      // redirect: '/admin/user',
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
