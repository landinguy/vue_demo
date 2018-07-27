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
    path: '/account',
    name: 'account',
    meta: {
      title: '账户管理',
    },
    component: Main,
    children: [
      {
        path: 'account_info',
        name: 'account_info',
        meta: {
          title: '账户信息',
        },
        component: () => import('@/components/account/Account.vue')
      },
      {
        path: 'child_account',
        name: 'child_account',
        meta: {
          title: '账户权限管理',
          access:['0']
        },
        component: () => import('@/components/account/SubAccount.vue')
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
          access:['1']
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
      },
      {
        path: 'sign_list',
        name: 'sign_list',
        meta: {
          title: '签名管理',
        },
        component: () => import('@/components/sign/SignList')
      }
    ]
  },
  {
    path: '/send',
    name: 'send',
    meta: {
      title: '发送管理',
      access:['1']
    },
    component: Main,
    children: [
      {
        path: 'new_task',
        name: 'new_task',
        meta: {
          title: '新建任务'
        },
        component: () => import('@/components/task/Task.vue')
      },
      {
        path: 'send_record',
        name: 'send_record',
        meta: {
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
      title: '联系人分组管理',
      access:['2']
    },
    component: Main,
    children: [
      {
        path: 'add',
        name: 'add',
        meta: {
          title: '添加联系人'
        },
        component: () => import('@/components/contact/AddContact.vue')
      },
      {
        path: 'group',
        name: 'group',
        meta: {
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
      title: '财务管理',
      access:['2']
    },
    component: Main,
    children: [
      {
        path: 'recharge',
        name: 'recharge',
        meta: {
          title: '账户充值'
        },
        component: () => import('@/components/financial/Recharge.vue')
      },
      {
        path: 'group',
        name: 'group',
        meta: {
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
      title: '审核管理',
      access:['2']
    },
    component: Main,
    children: [
      {
        path: 'template',
        name: 'template',
        meta: {
          title: '模板审核'
        },
        component: () => import('@/components/examine/Template.vue')
      },
      {
        path: 'sign',
        name: 'sign',
        meta: {
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
      title: '数据报表',
    },
    component: Main,
    children: [
      {
        path: 'data_statistics',
        name: 'data_statistics',
        meta: {
          title: '发送统计',
          // access:['normal']
        },
        component: () => import('@/components/statistics/Statistics.vue')
      },
      {
        path: 'data_details',
        name: 'data_details',
        meta: {
          title: '发送明细'
        },
        component: () => import('@/components/statistics/Details.vue')
      }
    ]
  },

  {
    path: '/channel',
    name: 'channel',
    meta: {
      title: '通道管理',
      access:['0']
    },
    component: Main,
    children: [
      {
        path: 'channel_access',
        name: 'channel_access',
        meta: {
          title: '通道接入'
        },
        component: () => import('@/components/channel/ChannelAccess')
      },
      {
        path: 'channel_manage',
        name: 'channel_manage',
        meta: {
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
      title: '高级配置',
      access:['2']
    },
    component: Main,
    children: [
      {
        path: 'sensitive',
        name: 'sensitive',
        meta: {
          title: '敏感词管理'
        },
        component: () => import('@/components/advance/Sensitive.vue')
      },
      {
        path: 'regular',
        name: 'regular',
        meta: {
          title: '规则配置管理'
        },
        component: () => import('@/components/advance/Regular.vue')
      },
      {
        path: 'variable',
        name: 'variable',
        meta: {
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
      title: '系统管理',
      access:['2']
    },
    component: Main,
    children: [
      {
        path: 'permission',
        name: 'permission',
        meta: {
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
