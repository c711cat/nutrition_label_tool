import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/DashboardView.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'product_list',
          component: () => import('@/views/ProductList.vue'),
        },
        {
          path: 'nutrition_label',
          component: () => import('@/views/NutritionLabels.vue'),
        },
        {
          path: 'mark_items',
          component: () => import('@/views/MarkItems.vue'),
        },
        {
          path: 'customize_list',
          component: () => import('@/views/CustomizeList.vue'),
        },
        {
          path: 'edit_nutrition_label/:id',
          component: () => import('@/views/NutritionLabels.vue'),
        },
        {
          path: 'edit_mark_items/:id',
          component: () => import('@/views/MarkItems.vue'),
        },
        {
          path: 'added_customize_nts',
          component: () => import('@/views/AddedCustomizeNts.vue'),
        },
        {
          path: 'QA',
          component: () => import('@/views/QAView.vue'),
        },
      ],
    },
  ],
})

// 監聽路由變更並發送 GA 事件，想知道每個頁面被瀏覽的次數
router.afterEach(to => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: to.fullPath,
    })
  }
})

export default router
