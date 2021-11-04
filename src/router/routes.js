
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/burguer', component: () => import('../components/burguer.vue') },
      { path: '/orders', component: () => import('../components/orders.vue') },
      { path: '/register', component: () => import('../components/register.vue') },
      { path: '/dashboard', component: () => import('../components/dashboard.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
