import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: require('@/views/login').default
    },
    {
      path: '/main',
      name: 'main',
      component: require('@/views/main').default,
      children: [
        {
          path: 'home',
          name: 'home',
          component: require('@/views/home').default,
          meta: {
            id:1,
            requiresAuth: true,
            code: 'menu-home',
            title: '首页',
            menuIcon: require('@/assets/home_icon.svg')
          }
        },
        {
          path: 'images',
          name: 'images',
          component: require('@/views/images').default,
          meta: {
            id:2,
            requiresAuth: true,
            code: 'menu-images',
            title: '图片空间',
            menuIcon: require('@/assets/image_icon.svg')
          }
        },
        {
          path: 'task',
          name: 'task',
          component: require('@/views/task').default,
          meta: {
            id:3,
            requiresAuth: true,
            code: 'menu-task',
            title: '我的任务',
            menuIcon: require('@/assets/task_icon.svg')
          }
        },
        {
          path: 'users',
          name: 'users',
          component: require('@/views/manage').default,
          meta: {
            id:4,
            requiresAuth: true,
            code: 'menu-users',
            title: '用户管理',
            menuIcon: require('@/assets/user.svg')
          }
        }
      ]
    },

    {
      path: '*',
      redirect: '/'
    }
  ]
})
