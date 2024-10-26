<template>
  <IngredientsComponent />
  <MarkItemsComponent />
</template>

<script>
import IngredientsComponent from '@/components/IngredientsComponent.vue'
import MarkItemsComponent from '@/components/MarkItemsComponent.vue'

export default {
  data() {
    return {}
  },
  components: { IngredientsComponent, MarkItemsComponent },
}
</script>

<style lang="scss" scoped>
* {
  // border: 1px solid;
}
</style>
