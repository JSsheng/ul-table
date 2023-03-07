import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { useUserStoreHook } from '../store/modules/user';

export const staticRouter: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/',
    component: () => import('../layout/index.vue'),
    redirect: '/report',
    children: [
      {
        path: 'swagger',
        component: () => import('../views/swagger/index.vue'),
        name: 'swagger',
        meta: { title: 'swagger', breadcrumb: false }
      }, {
        path: 'report',
        component: () => import('../views/report/index.vue'),
        name: 'report',
        meta: { title: 'report' }
      }, {
        path: '/report/preview',
        component: () => import('../views/preview/index.vue'),
        name: 'preview',
        meta: { title: 'preview' }
      }, {
        path: '/instrument',
        component: () => import('../views/instrument/index.vue'),
        name: 'instrument',
        meta: { title: 'instrument' }
      }, {
        path:"/hawkeye",
        component: () => import('../views/hawkeye/index.vue'),
        name: 'hawkeye',
        meta: { title: 'hawkeye' }
      }, {
        path:"/monitor",
        component: () => import('../views/monitor/index.vue'),
        name: 'monitor',
        meta: { title: 'monitor' }
      }, {
        path:"/monitor/csv",
        component: () => import('../views/csv/index.vue'),
        name: 'csv',
        meta: { title: 'csv' }
      }, {
        path:"/strategy-template",
        component: () => import('../views/strategy-template/index.vue'),
        name: 'strategy-template',
        meta: { title: 'strategy-template' }
      },{
        path:"/strategy-template/template-edit",
        component: () => import('../views/template-edit/index.vue'),
        name: 'template-edit',
        meta: { title: 'template-edit' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRouter,
  scrollBehavior: () => ({ left: 0, top: 0})
})

router.beforeEach((to, from, next) => {
  const user = useUserStoreHook();
  if (to.path !== '/login' && !user.token) {
    next({ path: '/login' });
  }
  next();
})

export default router;
