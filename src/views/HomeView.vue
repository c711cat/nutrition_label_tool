<template>
  <div></div>
</template>

<script>
import { useFoodStore } from '@/stores/foodDataStore.js'

export default {
  data() {
    return {
      foodData: [],
    }
  },
  created() {
    const foodStore = useFoodStore()
    foodStore.fetchFoods().then(() => {
      this.foodData = foodStore.updateKeyData
    })
  },
}
</script>
