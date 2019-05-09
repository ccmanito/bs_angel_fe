import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '/',
    redirect: 'dashboard'
  },
  {
    path: '/dashboard',
    component: Layout,
    // redirect: '/dashboard',
    name: 'Dashboard',
    // hidden: true,
    meta: { title: 'Dashboard' },
    children: [{
      path: '/dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'BS_Angel 管理平台' }
    }]
  }
]
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/personalinfo',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '个人信息管理',
      icon: 'user1'
    },
    children: [
      {
        path: 'index',
        name: '编辑个人信息',
        component: () => import('@/views/personalinfo/index'),
        meta: { title: '编辑个人信息', icon: 'edit1', roles: ['admin', 'student'] }
      }, {
        path: 'admin',
        name: '编辑信息',
        component: () => import('@/views/personalinfo/admin'),
        meta: { title: '编辑信息', icon: 'edit1', roles: ['admin', 'teacher'] }
      }
    ]
  },
  {
    path: '/worker',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '流程中心',
      icon: 'worker'
    },
    children: [
      {
        path: 'info',
        name: '流程查询',
        component: () => import('@/views/worker/info'),
        meta: { title: '流程查询', icon: 'workerend', roles: ['admin', 'teacher'] }
      },
      {
        path: 'auth/apply',
        name: '权限申请',
        component: () => import('@/views/worker/auth/apply'),
        meta: { title: '权限申请', icon: 'applyauth' }
      },
      {
        path: 'auth/empty',
        name: '空白页',
        component: () => import('@/views/worker/auth/emptypage'),
        meta: { title: 'empty' },
        hidden: true
      },
      {
        path: 'auth/approval',
        name: '权限审批',
        component: () => import('@/views/worker/auth/approval'),
        meta: { title: '权限审批', icon: 'applyauth', roles: ['admin'] }
      },
      {
        path: 'detail/:id(\\d+)/:step_id(\\d+)',
        component: () => import('@/views/worker/info/TicketDetail'),
        name: 'TicketDetail',
        meta: { title: '工单详情', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '系统管理',
      icon: 'setting',
      roles: ['admin', 'teacher']
    },
    children: [
      {
        path: 'info',
        name: '学校信息',
        component: () => import('@/views/system/info'),
        meta: { title: '学校信息', icon: 'edit', roles: ['admin', 'teacher'] }
      },
      {
        path: 'dorm/info',
        name: '宿舍信息管理',
        component: () => import('@/views/system/dormitory'),
        meta: { title: '宿舍信息', icon: 'edit', roles: ['admin', 'teacher'] }
      },
      {
        path: 'user/list',
        name: '用户信息管理',
        component: () => import('@/views/system/userinfo'),
        meta: { title: '用户信息', icon: 'edit', roles: ['admin', 'teacher'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

