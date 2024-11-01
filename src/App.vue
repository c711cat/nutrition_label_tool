<template>
  <div class="container my-3">
    <router-link to="/nutrition_label" class="btn btn-primary me-3">
      新增營養標示
    </router-link>
    <router-link to="/product_list" class="btn btn-primary">
      標示列表
    </router-link>
  </div>
  <RouterView />
</template>

<style lang="scss">
@import '@/assets/all.scss';
</style>
