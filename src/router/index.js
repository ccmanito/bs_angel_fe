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
      icon: 'user',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        name: '编辑信息',
        component: () => import('@/views/personalinfo/index'),
        meta: { title: '编辑信息', icon: 'edit', roles: ['admin'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

