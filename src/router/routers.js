import Main from '@/components/main/Main'
import HelloWorld from '@/components/HelloWorld'
import Account from '@/components/account/Account'

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
        component: () => import('@/components/account/Account.vue')
      },
      {
        path: 'child_account',
        name: 'child_account',
        meta: {
          // access:['show'],
          icon: 'ios-navigate',
          title: '子账户管理'
        },
        component: () => import('@/components/account/SubAccount.vue')
      }
    ]
  },

  {
    path: '/data',
    name: 'statistics',
    meta: {
      icon: 'ios-navigate',
      title: '数据统计'
    },
    component: Main,
    children: [
      {
        path: 'data_statistics',
        name: 'data_statistics',
        meta: {
          icon: 'ios-navigate',
          title: '发送统计'
        },
        component: () => import('@/components/statistics/Statistics.vue')
      },
      {
        path: 'data_details',
        name: 'data_details',
        meta: {
          icon: 'ios-navigate',
          title: '发送详单'
        },
        component: () => import('@/components/statistics/Details.vue')
      }
    ]
  },

  {
    path: '/template',
    name: 'template',
    meta: {
      icon: 'ios-navigate',
      title: '模板管理'
    },
    component: Main,
    children: [
      {
        path: 'create_template',
        name: 'create_template',
        meta: {
          icon: 'ios-navigate',
          title: '新建模板'
        },
        component: () => import('@/components/template/CreateTemplate')
      },
      {
        path: 'template_list',
        name: 'template_list',
        meta: {
          icon: 'ios-navigate',
          title: '我的模板'
        },
        component: () => import('@/components/template/TemplateList')
      },
      {
        path: 'sign_list',
        name: 'sign_list',
        meta: {
          icon: 'ios-navigate',
          title: '签名管理'
        },
        component: () => import('@/components/sign/SignList')
      }
    ]
  },
  {
    path: '/channel',
    name: 'channel',
    meta: {
      icon: 'ios-navigate',
      title: '通道管理'
    },
    component: Main,
    children: [
      {
        path: 'channel_access',
        name: 'channel_access',
        meta: {
          icon: 'ios-navigate',
          title: '通道接入'
        },
        component: () => import('@/components/channel/ChannelAccess')
      },
      {
        path: 'channel_manage',
        name: 'channel_manage',
        meta: {
          icon: 'ios-navigate',
          title: '通道配置'
        },
        component: () => import('@/components/channel/ChannelManage')
      }
    ]
  },
  {
    path: '/send',
    name: 'send',
    meta: {
      icon: 'ios-navigate',
      title: '发送管理'
    },
    component: Main,
    children: [
      {
        path: 'new_task',
        name: 'new_task',
        meta: {
          icon: 'ios-navigate',
          title: '新建任务'
        },
        component: () => import('@/components/task/Task.vue')
      },
      {
        path: 'send_record',
        name: 'send_record',
        meta: {
          icon: 'ios-navigate',
          title: '发送记录'
        },
        component: () => import('@/components/task/Record.vue')
      }
    ]
  },
]
