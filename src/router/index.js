import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/DashboardView.vue'),
      children: [
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
          path: 'custom_list',
          component: () => import('@/views/CustomList.vue'),
        },
        {
          path: 'custom',
          component: () => import('@/views/CustomView.vue'),
        },
        {
          path: 'edit_custom/:id',
          component: () => import('@/views/CustomView.vue'),
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
          path: 'added_custom_nts',
          component: () => import('@/views/AddedCustomNts.vue'),
        },
      ],
    },
  ],
})

export default router
