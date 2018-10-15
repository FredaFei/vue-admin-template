import Layout from '@/views/layout/index'
/**
 * name: 'router-name'   在<keep-alive> 必须设置
 * redirect     面包屑父级导航
 * meta: {
 *    title: 'title'  submenu和面包屑名称
 * }
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: {
          title: 'home',
          icon: 'menu'
        }
      }
    ]
  },
  {
    path: '/map',
    component: Layout,
    redirect: '/map/pointMap',
    children: [
      {
        path: 'pointMap',
        name: 'pointMap',
        component: () => import('@/views/map/pointMap'),
        meta: {
          title: '点聚合地图',
          icon: 'location'
        }
      }
    ]
  },
  {
    path: '/tree',
    component: Layout,
    redirect: '/tree/complexTree',
    children: [
      {
        path: 'complexTree',
        name: 'complexTree',
        component: () => import('@/views/tree/index'),
        meta: {
          title: 'tree结构',
          icon: 'icon'
        }
      }
    ]
  },
  {
    path: '/tab',
    component: Layout,
    redirect: '/tab/complexTab',
    children: [
      {
        path: 'complexTab',
        name: 'complexTab',
        component: () => import('@/views/tab/index'),
        meta: {
          title: 'tab卡片',
          icon: 'tab'
        }
      }
    ]
  },
  {
    path: '/table',
    name: 'table',
    component: Layout,
    redirect: '/table/complexTable',
    meta: {
      title: 'table',
      icon: 'table'
    },
    children: [
      {
        path: 'complexTable',
        name: 'complexTable',
        component: () => import('@/views/table/complexTable'),
        meta: {
          title: '综合table'
        }
      },
      {
        path: 'inlineEditTable',
        name: 'inlineEditTable',
        component: () => import('@/views/table/inlineEditTable'),
        meta: {
          title: 'table内编辑'
        }
      },
      {
        path: 'treeTable',
        name: 'treeTable',
        component: () => import('@/views/table/treeTable'),
        meta: {
          title: '树形表格'
        }
      }
    ]
  },
  {
    path: '/wheels',
    name: 'wheels',
    component: Layout,
    redirect: '/wheels/countUp',
    meta: {
      title: 'wheels',
      icon: 'wheel'
    },
    children: [
      {
        path: 'countUp',
        name: 'countUp',
        component: () => import('@/views/wheels/countUp'),
        meta: {
          title: '数字动画'
        }
      },
      {
        path: 'markdown',
        name: 'markdown',
        component: () => import('@/views/wheels/markdown'),
        meta: {
          title: 'markdown'
        }
      }
    ]
  }
]

// 动态路由
export const asyncRouterMap = [
  {
    path: '/personal',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'permission', icon: 'wheel', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'index',
        name: 'personal',
        component: () => import('@/views/personal/index'),
        meta: { title: 'personal', roles: ['admin'], icon: 'wheel' }
      },
      {
        path: 'editor',
        name: 'editor',
        component: () => import('@/views/personal/edit'),
        meta: { title: 'editor', icon: 'wheel' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
