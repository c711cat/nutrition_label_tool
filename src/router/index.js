import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/product_list',
      component: () => import('@/views/ProductList.vue'),
    },
    {
      path: '/nutrition_label',
      component: () => import('@/views/NutritionLabels.vue'),
    },
    {
      path: '/mark_items',
      component: () => import('@/views/MarkItems.vue'),
    },
  ],
})

export default router
