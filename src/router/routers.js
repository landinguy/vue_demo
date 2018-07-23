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
  // {
  //   path: '/hello',
  //   name: 'HelloWorld',
  //   component: HelloWorld
  // },
  {
    path: '/',
    name: 'home',
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
          // icon: 'ios-navigate',
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
      // icon: 'ios-navigate',
      title: '账户管理',
      // access:['normal']
    },
    component: Main,
    children: [
      {
        path: 'account_info',
        name: 'account_info',
        meta: {
          // icon: 'ios-navigate',
          title: '账户信息',
        },
        component: () => import('@/components/account/Account.vue')
      },
      {
        path: 'child_account',
        name: 'child_account',
        meta: {
          // icon: 'ios-navigate',
          title: '子账户管理'
        },
        component: () => import('@/components/account/SubAccount.vue')
      }
    ]
  },

  {
    path: '/template',
    name: 'template',
    meta: {
      // icon: 'ios-navigate',
      title: '模板管理',
    },
    component: Main,
    children: [
      {
        path: 'create_template',
        name: 'create_template',
        meta: {
          // icon: 'ios-navigate',
          title: '新建模板'
        },
        component: () => import('@/components/template/CreateTemplate')
      },
      {
        path: 'template_list',
        name: 'template_list',
        meta: {
          // icon: 'ios-navigate',
          title: '我的模板'
        },
        component: () => import('@/components/template/TemplateList')
      },
      {
        path: 'sign_list',
        name: 'sign_list',
        meta: {
          // icon: 'ios-navigate',
          title: '签名管理'
        },
        component: () => import('@/components/sign/SignList')
      }
    ]
  },
  {
    path: '/send',
    name: 'send',
    meta: {
      // icon: 'ios-navigate',
      title: '发送管理'
    },
    component: Main,
    children: [
      {
        path: 'new_task',
        name: 'new_task',
        meta: {
          // icon: 'ios-navigate',
          title: '新建任务'
        },
        component: () => import('@/components/task/Task.vue')
      },
      {
        path: 'send_record',
        name: 'send_record',
        meta: {
          // icon: 'ios-navigate',
          title: '发送记录'
        },
        component: () => import('@/components/task/Record.vue')
      }
    ]
  },

  {
    path: '/contact',
    name: 'contact',
    meta: {
      // icon: 'ios-navigate',
      title: '联系人分组管理'
    },
    component: Main,
    children: [
      {
        path: 'add',
        name: 'add',
        meta: {
          // icon: 'ios-navigate',
          title: '添加联系人'
        },
        component: () => import('@/components/contact/AddContact.vue')
      },
      {
        path: 'group',
        name: 'group',
        meta: {
          // icon: 'ios-navigate',
          title: '我的联系人分组'
        },
        component: () => import('@/components/contact/ContactGroup.vue')
      }
    ]
  },

  {
    path: '/financial',
    name: 'financial',
    meta: {
      // icon: 'ios-navigate',
      title: '财务管理'
    },
    component: Main,
    children: [
      {
        path: 'recharge',
        name: 'recharge',
        meta: {
          // icon: 'ios-navigate',
          title: '账户充值'
        },
        component: () => import('@/components/financial/Recharge.vue')
      },
      {
        path: 'group',
        name: 'group',
        meta: {
          // icon: 'ios-navigate',
          title: '账单明细'
        },
        component: () => import('@/components/financial/Details.vue')
      }
    ]
  },

  {
    path: '/examine',
    name: 'examine',
    meta: {
      // icon: 'ios-navigate',
      title: '审核管理'
    },
    component: Main,
    children: [
      {
        path: 'template',
        name: 'template',
        meta: {
          // icon: 'ios-navigate',
          title: '模板审核'
        },
        component: () => import('@/components/examine/Template.vue')
      },
      {
        path: 'sign',
        name: 'sign',
        meta: {
          // icon: 'ios-navigate',
          title: '签名审核'
        },
        component: () => import('@/components/examine/Sign.vue')
      }
    ]
  },

  {
    path: '/data',
    name: 'statistics',
    meta: {
      // icon: 'ios-navigate',
      title: '数据统计',

    },
    component: Main,
    children: [
      {
        path: 'data_statistics',
        name: 'data_statistics',
        meta: {
          // icon: 'ios-navigate',
          title: '发送统计',
          // access:['normal']
        },
        component: () => import('@/components/statistics/Statistics.vue')
      },
      {
        path: 'data_details',
        name: 'data_details',
        meta: {
          // icon: 'ios-navigate',
          title: '发送详单'
        },
        component: () => import('@/components/statistics/Details.vue')
      }
    ]
  },

  {
    path: '/channel',
    name: 'channel',
    meta: {
      // icon: 'ios-navigate',
      title: '通道管理'
    },
    component: Main,
    children: [
      {
        path: 'channel_access',
        name: 'channel_access',
        meta: {
          // icon: 'ios-navigate',
          title: '通道接入'
        },
        component: () => import('@/components/channel/ChannelAccess')
      },
      {
        path: 'channel_manage',
        name: 'channel_manage',
        meta: {
          // icon: 'ios-navigate',
          title: '通道配置'
        },
        component: () => import('@/components/channel/ChannelManage')
      }
    ]
  },

  {
    path: '/advance',
    name: 'advance',
    meta: {
      // icon: 'ios-navigate',
      title: '高级配置'
    },
    component: Main,
    children: [
      {
        path: 'sensitive',
        name: 'sensitive',
        meta: {
          // icon: 'ios-navigate',
          title: '敏感词管理'
        },
        component: () => import('@/components/advance/Sensitive.vue')
      },
      {
        path: 'regular',
        name: 'regular',
        meta: {
          // icon: 'ios-navigate',
          title: '规则配置管理'
        },
        component: () => import('@/components/advance/Regular.vue')
      },
      {
        path: 'variable',
        name: 'variable',
        meta: {
          // icon: 'ios-navigate',
          title: '变量内容管理'
        },
        component: () => import('@/components/advance/Variable.vue')
      }
    ]
  },

  {
    path: '/system',
    name: 'system',
    meta: {
      // icon: 'ios-navigate',
      title: '系统管理'
    },
    component: Main,
    children: [
      {
        path: 'permission',
        name: 'permission',
        meta: {
          // icon: 'ios-navigate',
          title: '用户权限'
        },
        component: () => import('@/components/permission/Permission')
      },
    ]
  },
  {
    path: '/error404',
    name: 'error404',
    component: () => import('@/components/error/error404.vue')
  },
]
