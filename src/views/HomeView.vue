<template>
  <div class="container my-5">
    <h3 class="text-center mb-5">食品外包裝營養標示製作</h3>
    <div class="form-floating mb-3">
      <input
        @change="e => searchFood(e.target.value)"
        type="search"
        class="form-control"
        id="searchInput"
        placeholder="請輸入食物成分搜尋"
      />
      <label for="searchInput">請輸入食物成分搜尋</label>
    </div>
    <div class="col-12 justify-content-between row m-0">
      <div class="col-4 col-xl-2 ps-0 foodDataContainer">
        <div class="list-group rounded foodDataContainer overflow-y-auto">
          <button
            v-for="item in updateKeyData"
            :key="item.id"
            type="button"
            class="list-group-item list-group-item-action"
            aria-current="true"
          >
            {{ item.sample_name }}
            <p v-if="item.common_name" class="mb-0 text-secondary">
              俗名：{{ item.common_name }}
            </p>
          </button>
        </div>
      </div>

      <div class="p-0 col-8 col-xl-10">
        <div class="mb-3 col-12">
          <label for="productName" class="form-label fw-bold ps-1">
            商品名稱
          </label>
          <input
            type="text"
            class="form-control"
            id="productName"
            placeholder="請輸入商品名稱"
          />
        </div>

        <p class="mb-1 pb-1 ps-1 fw-bold">
          從左邊資料庫點選成分，並填入各欄位所需資料
        </p>
        <ul
          class="border-top rounded-0 position-relative col-12 list-group list-group-horizontal-xl"
        >
          <li
            class="list-group-item col-12 col-xl-3 d-flex flex-column justify-content-center"
          >
            <span class="pe-3">樣品名j樣品名c樣品名樣品名樣品名</span>
            <span>俗名</span>
          </li>
          <li
            class="list-group-item col-12 col-xl-4 d-flex flex-column justify-content-center"
          >
            <input
              type="text"
              name=""
              id=""
              placeholder="輸入欲呈現於外包裝成分"
              class="form-control"
            />
          </li>
          <li
            class="list-group-item col-12 col-xl-4 d-flex flex-column justify-content-center"
          >
            <input
              type="number"
              name=""
              id=""
              min="1"
              placeholder="輸入該成分的總克數"
              class="form-control"
            />
          </li>
          <li
            class="d-none d-xl-block list-group-item col-1 align-content-center"
          >
            <button type="button" class="btn btn-outline-danger btn-sm d-block">
              <i class="bi bi-x-lg"></i>
            </button>
          </li>
          <li class="d-block d-xl-none position-absolute delBtn-xs list-group">
            <button type="button" class="btn btn-outline-danger btn-sm">
              <i class="bi bi-x-lg"></i>
            </button>
          </li>
        </ul>
        <div class="my-3 col-12">
          <button type="button" class="btn btn-primary w-100">新增欄位</button>
        </div>
      </div>
    </div>
  </div>
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
  --bs-list-group-border-width: none;
}

.foodDataContainer {
  height: 600px;
}

.delBtn-xs {
  top: 2%;
  right: -2%;
}

.btn-outline-danger {
  border-color: rgba(255, 255, 255, 0) !important;
}
</style>
