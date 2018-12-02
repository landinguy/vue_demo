import Main from '@/components/main/Main'
export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/components/login/Login')
  },
  {
    path: '/',
    name: 'index',
    redirect: '/login',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          hideInMenu: true,
          notCache: true,
        },
        component: () => import('@/components/home/Home')
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      hide: true,
    },
    component: Main,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: () => import('@/components/home/Home')
      }
    ]
  },
  {
    path: '/template',
    name: 'template',
    meta: {
      title: '模板管理',
    },
    component: Main,
    children: [
      {
        path: 'create_template',
        name: 'create_template',
        meta: {
          title: '新建模板',
          // access: ['1']
        },
        component: () => import('@/components/template/CreateTemplate')
      },
      {
        path: 'template_list',
        name: 'template_list',
        meta: {
          title: '我的模板',
        },
        component: () => import('@/components/template/TemplateList')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      title: '用户管理',
    },
    component: Main,
    children: [
      {
        path: 'user_list',
        name: 'user_list',
        meta: {
          title: '用户列表',
        },
        component: () => import('@/components/user/UserList')
      }
    ]
  },
  {
    path: '/error404',
    name: 'error404',
    component: () => import('@/components/error/error404.vue')
  }
]
