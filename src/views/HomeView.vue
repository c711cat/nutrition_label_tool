<template>
  <div></div>
</template>

<script>
import { useFoodStore } from '@/stores/foodDataStore.js'
import { mapActions, mapState } from 'pinia'
export default {
  data() {
    return {
      foodData: [],
    }
  },
  methods: {
    ...mapActions(useFoodStore, ['searchFood']),
    getFoodData() {
      const foodStore = useFoodStore()
      foodStore.fetchFoods().then(() => {
        this.foodData = foodStore.updateKeyData
      })
    },
  },
  computed: {
    ...mapState(useFoodStore, ['updateKeyData']),
  },
  created() {
    this.getFoodData()
  },
}
</script>

<style lang="scss" scoped>
* {
  // border: 1px solid;
}

ul.list-group {
  // --bs-list-group-border-width: none;
}

.foodDataContainer {
  height: 600px;
}
</style>
