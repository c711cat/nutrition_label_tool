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
          path: 'customize_list',
          component: () => import('@/views/CustomizeList.vue'),
        },
        {
          path: 'customize',
          component: () => import('@/components/CustomizeComponent.vue'),
        },
        {
          path: 'edit_customize/:id',
          component: () => import('@/components/CustomizeComponent.vue'),
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
