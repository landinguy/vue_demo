import Main from '@/components/main/Main'
import HelloWorld from '@/components/HelloWorld'

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
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/',
    name: 'home',
    redirect: '/home',
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
          notCache: true
        },
        component: () => import('@/components/home/Home')
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      hide: true
    },
    component: Main,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          icon: 'ios-navigate',
          title: '首页'
        },
        component: () => import('@/components/home/Home')
      }
    ]
  },
  {
    path: '/account',
    name: 'account',
    meta: {
      icon: 'ios-navigate',
      title: '账户管理'
    },
    component: Main,
    children: [
      {
        path: 'account_info',
        name: 'account_info',
        meta: {
          icon: 'ios-navigate',
          title: '账户信息'
        },
        component: () => import('@/components/account/account-info.vue')
      },
      {
        path: 'child_account',
        name: 'child_account',
        meta: {
          icon: 'ios-navigate',
          title: '子账户管理'
        },
        component: () => import('@/components/account/child-account.vue')
      }
    ]
  },
]