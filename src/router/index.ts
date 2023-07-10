import { createRouter, createWebHashHistory, RouteRecordRaw, useRoute } from 'vue-router';
import { useUserStoreHook } from '@/store/modules/user';

export const staticRouter: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  { 
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/report',
    children: [
      {
        path: 'swagger',
        component: () => import('@/views/swagger/index.vue'),
        name: 'swagger',
        meta: { breadcrumb: 'swagger', breadcrumbShow: false }
      },
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: { breadcrumb: 'home', breadcrumbShow: false }
      },{
        path: 'log',
        component: () => import('@/views/log/index.vue'),
        name: 'log',
        meta: { breadcrumb: 'log'}
      }, {
        path: 'report',
        name: 'report',
        meta: { breadcrumb: 'report' },
        children: [
          {
            path: "",
            component: () => import('@/views/report/index.vue'),
          },
          {
            path: '/report/preview',
            component: () => import('@/views/preview/index.vue'),
            name: 'report-preview',
            meta: { breadcrumb: 'report-preview' },
          }
        ]
      }, {
        path: '/instrument',
        component: () => import('@/views/instrument/index.vue'),
        name: 'instrument',
        meta: { breadcrumb: 'instrument' }
      }, {
        path:"/hawkeye",
        component: () => import('@/views/hawkeye/index.vue'),
        name: 'hawkeye',
        meta: { breadcrumb: 'hawkeye' }
      }, {
        path:"/monitor",
        name: 'monitor',
        meta: { breadcrumb: 'monitor' },
        children: [
          {
            path: "",
            component: () => import('@/views/monitor/index.vue'),
          },
          {
            path: '/monitor/preview',
            component: () => import('@/views/preview/index.vue'),
            name: 'monitor-preview',
            meta: { breadcrumb: 'monitor-preview' }
          }, {
            path:"/monitor/csv",
            component: () => import('@/views/csv/index.vue'),
            name: 'csv',
            meta: { breadcrumb: 'csv' }
          },  {
            path:"/monitor/csv-editable",
            component: () => import('@/views/csv/editable.vue'),
            name: 'csv-editable',
            meta: { breadcrumb: 'csv-editable' }
          },
        ]
      }, {
        path:"/setting-strategy",
        meta: { breadcrumb: 'setting-strategy' },
        children: [
          {
            path: "",
            component: () => import('@/views/strategy/index.vue'),
          },
          {
            path:"/setting-strategy/strategy-edit",
            component: () => import('@/views/strategy/edit.vue'),
            name: 'strategy-edit',
            meta: { breadcrumb: 'strategy-edit' }
          }
        ]
      }, {
        path:"/setting-csv",
        meta: { breadcrumb: 'setting-csv' },
        children: [
          {
            path: "",
            component: () => import('@/views/csv/upload.vue'),
          }
        ]
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

  // replace the meta
  if (to.query.meta) {
    // @ts-ignore
    to.meta.breadcrumb = to.query.meta;
  }

  next();
})

export default router;
