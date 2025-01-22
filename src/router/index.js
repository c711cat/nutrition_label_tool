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

export default router
