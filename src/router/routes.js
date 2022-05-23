
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), meta: { scrollToTop: true } }
    ]
  },
   {
    path: '/about',
    name: 'About',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/about', component: () => import('pages/About.vue') }
    ]
  }, 
  {
    path: '/testnet',
    name: 'Testnet',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/testnet', component: () => import('pages/Testnet.vue') }
    ]
  },
  {
    path: '/bounty',
    name: 'Bounty',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/bounty', component: () => import('pages/Bounty.vue') }
    ]
  },
  {
    path: '/catchlabs',
    name: 'Catch Labs',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/catchlabs', component: () => import('src/pages/Catchlabs.vue') }
    ]
  }, 
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/upload', component: () => import('src/pages/Upload.vue') }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/user', component: () => import('src/pages/User.vue') }
    ]
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/faq', component: () => import('src/pages/Faq.vue') }
    ]
  },
  {
    path: '/referral',
    name: 'referral',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/referral', component: () => import('src/pages/Referral.vue') }
    ]
  },
  {
    path: '/whitepaper',
    name: 'whitepaper',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/whitepaper', component: () => import('src/pages/Whitepaper.vue') }
    ]
  },
  {
    path: '/:token',
    name: 'token',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/:token', name: 'token', component: () => import('src/pages/Token.vue') }
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
