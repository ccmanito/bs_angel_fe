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
      title: '信息管理',
      icon: 'user1'
    },
    children: [
      {
        path: 'index',
        name: '编辑信息',
        component: () => import('@/views/personalinfo/index'),
        meta: { title: '编辑信息', icon: 'edit1' }
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
        path: 'auth',
        name: '权限申请',
        component: () => import('@/views/worker/auth'),
        meta: { title: '权限申请', icon: 'applyauth' }
      },
      {
        path: 'info',
        name: '申请跟踪',
        component: () => import('@/views/worker/info'),
        meta: { title: '申请跟踪', icon: 'todo', roles: ['admin', 'teacher'] }
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
        name: '系统信息',
        component: () => import('@/views/system/info'),
        meta: { title: '系统信息', icon: 'edit', roles: ['admin', 'teacher'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

