<template>
  <main class="container mt-4">
    <h3 class="text-center mb-4">食品外包裝營養標示製作</h3>
    <section class="form-floating mb-3">
      <input
        @change="e => searchFood(e.target.value)"
        type="search"
        class="form-control"
        id="searchInput"
        placeholder="請輸入食物成分搜尋"
      />
      <label for="searchInput">請輸入食物成分搜尋</label>
    </section>
    <form @submit.prevent="submitForm" novalidate>
      <div class="col-12 justify-content-between row flex-nowrap mx-0 mb-2">
        <section class="col-4 col-xl-2 px-0 me-1">
          <div class="list-group rounded visibleHeight overflow-y-auto">
            <button
              v-for="item in updateKeyData"
              :key="item.id"
              @click="chooseSample(item)"
              type="button"
              class="list-group-item list-group-item-action px-1"
              aria-current="true"
            >
              <p class="mb-0 px-2">{{ item.sample_name }}</p>
              <p v-if="item.common_name" class="mb-0 px-2 text-secondary">
                俗名：{{ item.common_name }}
              </p>
            </button>
          </div>
        </section>

        <section class="py-0 pe-0 col-8 col-xl">
          <div class="mb-3 col-12">
            <label for="productName" class="form-label fw-bold ps-1 d-flex">
              <div class="pe-1 d-flex align-items-center">
                <i class="text-danger fst-normal">＊</i>
              </div>
              商品名稱
            </label>
            <input
              v-model="product.title"
              type="text"
              class="form-control"
              id="productName"
              placeholder="請輸入商品名稱"
              required
            />
            <div class="invalid-feedback">此欄位為必填</div>
          </div>
          <p
            class="border-start border-top border-end rounded-top mb-0 py-2 ps-1 fw-bold"
          >
            <span class="text-danger">＊</span>
            從左邊資料庫點選成分，並填入各欄位所需資料
          </p>
          <div
            class="border-start border-end border-bottom rounded-bottom ingredientsVisibleHeight overflow-y-auto mb-2"
          >
            <ul
              v-for="(item, index) in product.ingredients"
              :key="item.id"
              class="border-top rounded-0 position-relative col-12 list-group list-group-horizontal-xl"
            >
              <li
                class="list-group-item col-12 col-xl-3 d-flex flex-column justify-content-center"
              >
                <span class=""> {{ index + 1 }}. {{ item.sample_name }} </span>
                <span v-if="item.common_name">俗名:{{ item.common_name }}</span>
              </li>
              <li
                class="list-group-item col-12 col-xl-4 d-flex flex-column justify-content-center"
              >
                <input
                  v-model="item.foodName"
                  type="text"
                  name=""
                  id=""
                  placeholder="輸入欲示於外包裝成分"
                  class="form-control"
                  required
                />
                <div class="invalid-feedback">此欄位為必填</div>
              </li>
              <li
                class="list-group-item col-12 col-xl-4 d-flex flex-column justify-content-center"
              >
                <input
                  v-model="item.grams"
                  type="number"
                  name=""
                  id=""
                  min="1"
                  placeholder="輸入該成分『 總克數 』"
                  class="form-control"
                  required
                />
                <div class="invalid-feedback">此欄位為必填</div>
              </li>
              <li
                class="d-none d-xl-block list-group-item col-1 align-content-center"
              >
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm d-block"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </li>
              <li
                class="d-block d-xl-none position-absolute delBtn-xs list-group"
              >
                <button type="button" class="btn btn-outline-danger btn-sm">
                  <i class="bi bi-x-lg"></i>
                </button>
              </li>
            </ul>
            <div class="my-3 col-12 d-flex justify-content-center px-2">
              <button
                type="button"
                class="btn btn-outline-primary w-100"
                @click="addNewField"
              >
                新增欄位
              </button>
            </div>
          </div>
          <div class="col-12 text-end mb-4">
            <button type="submit" class="col-12 btn btn-primary">
              確認以上資料
            </button>
          </div>
        </section>
      </div>
    </form>
  </main>
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
    ...mapActions(useFoodStore, ['searchFood', 'submitForm']),
    getFoodData() {
      const foodStore = useFoodStore()
      foodStore.fetchFoods().then(() => {
        this.foodData = foodStore.updateKeyData
      })
    },
    chooseSample(chooseItem) {
      console.log(chooseItem)
      const empty = this.product.ingredients.find(item => {
        return item.sample_name === ''
      })
      if (empty) {
        empty.id = Date.now()
        empty.sample_name = chooseItem.sample_name
        if (chooseItem.common_name) {
          empty.common_name = chooseItem.common_name
        }
      }

      console.log(this.product)
    },
    addNewField() {
      const newIngredient = {
        id: '',
        sample_name: '',
        foodName: '',
        grams: '',
      }
      this.product.ingredients.push(newIngredient)
      console.log(this.product)
    },
  },
  computed: {
    ...mapState(useFoodStore, ['updateKeyData', 'product']),
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

.visibleHeight {
  height: 680px;
}

.ingredientsVisibleHeight {
  height: 500px;
}

.delBtn-xs {
  top: 2%;
  right: 0%;
}

.btn-outline-danger {
  border-color: rgba(255, 255, 255, 0) !important;
}
</style>
