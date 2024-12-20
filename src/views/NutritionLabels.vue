<template>
  <main class="mx-auto col-12 col-md-11 col-lg-11 col-xl-11 col-xxl-10 mt-4">
    <h3 class="text-center mb-4">營養標示製作</h3>
    <section class="form-floating mb-5 mx-3">
      <input
        @change="e => searchFood(e.target.value)"
        type="search"
        class="form-control"
        id="searchInput"
        placeholder="請輸入食物成分搜尋"
      />
      <label for="searchInput">請輸入食物成分搜尋</label>
    </section>
    <div class="col-12 ps-1">
      <div class="row col-12 mx-0 mb-5">
        <div class="col-4 col-xl-3">
          <div class="d-flex flex-wrap justify-content-center mb-2">
            <button
              type="button"
              class="col-12 col-xl m-1 me-1 btn btn-sm btn-outline-primary"
            >
              內建資料庫
            </button>
            <button
              type="button"
              class="col-12 col-xl m-1 me-1 btn btn-sm btn-outline-primary"
            >
              自定義資料庫
            </button>
          </div>
          <section>
            <div v-if="filteredData.length === 0" class="py-5">
              <p class="mb-0 text-center fw-bold">無相符品項</p>
            </div>
            <div v-else>
              <section
                v-if="true"
                class="list-group rounded visibleHeight overflow-y-auto"
              >
                <button
                  v-for="item in filteredData"
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
              </section>
              <section
                v-if="false"
                class="list-group rounded visibleHeight overflow-y-auto"
              >
                <button
                  v-for="item in filteredCostomizeData"
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
              </section>
            </div>
          </section>
        </div>

        <form
          id="form_id"
          @submit.prevent="submitForm"
          class="row m-0 g-3 align-content-start col-8 col-xl formVisibleHeight overflow-y-auto"
          novalidate
        >
          <section class="col-12 col-xl-6 mt-0">
            <label
              for="productName"
              class="form-label fw-bold ps-1 d-flex justify-content-start"
            >
              <div class="pe-1 d-flex align-items-center">
                <i class="text-danger fst-normal">＊</i>
              </div>
              商品名稱
            </label>
            <input
              v-model.trim="product.title"
              type="text"
              class="form-control"
              id="productName"
              placeholder="請輸入商品名稱"
              required
            />
            <div class="invalid-feedback">此欄位為必填</div>
          </section>
          <section class="col-12 col-xl-6">
            <label
              for="number_of_copies"
              class="form-label fw-bold ps-1 d-flex justify-content-start"
            >
              <div class="pe-1 d-flex align-items-center">
                <i class="text-danger fst-normal">＊</i>
              </div>
              以下食材總量共可製成幾份成品？
            </label>
            <input
              v-model="product.numberOfCopy"
              type="number"
              min="1"
              class="form-control"
              id="number_of_copies"
              placeholder="輸入共可製成幾份成品"
              required
            />

            <div class="invalid-feedback">此欄位為必填，且需大於等於 1</div>
          </section>
          <section class="col-12 col-xl-6 d-flex">
            <div class="col-12">
              <label
                for="net_weight"
                class="form-label fw-bold ps-1 d-flex flex-wrap justify-content-start col-12"
              >
                <div class="pe-1 d-flex align-items-center">
                  <i class="text-danger fst-normal">＊</i>
                </div>
                每一份量
                <div
                  class="infoStyle px-3 text-secondary d-flex align-items-center"
                >
                  <span class="fw-normal">
                    <i class="bi bi-info-circle"></i>
                    將會顯示在營養標示上，每一份量的位置
                  </span>
                </div>
              </label>

              <div class="col-12 d-flex flex-wrap justify-content-between">
                <div class="col-12 col-xl-6">
                  <input
                    v-model="product.perPortionInfomation.perWeight"
                    type="number"
                    min="1"
                    class="form-control me-3"
                    id="net_weight"
                    placeholder="輸入克數或毫升數"
                    required
                  />
                  <div class="invalid-feedback">
                    此欄位為必填，且需大於等於 1
                  </div>
                </div>
                <div class="mt-2 col-12 col-xl-5 text-xl-center">
                  <div class="form-check form-check-inline">
                    <input
                      v-model="product.perPortionInfomation.unit"
                      class="form-check-input"
                      type="radio"
                      id="gram"
                      value="公克"
                    />
                    <label class="form-check-label" for="gram">公克</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      v-model="product.perPortionInfomation.unit"
                      class="form-check-input"
                      type="radio"
                      id="milliliter"
                      value="毫升"
                    />
                    <label class="form-check-label" for="milliliter">
                      毫升
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="col-12 col-xl-6">
            <label
              for="product_quantity"
              class="form-label fw-bold ps-1 d-flex flex-wrap justify-content-start"
            >
              <div class="pe-1 d-flex align-items-center">
                <i class="text-danger fst-normal">＊</i>
              </div>
              本包裝含幾份成品？
              <div
                class="infoStyle px-3 text-secondary d-flex align-items-center"
              >
                <span class="fw-normal">
                  <i class="bi bi-info-circle"></i>
                  將會顯示在營養標示上，本包裝含幾份的位置
                </span>
              </div>
            </label>

            <input
              v-model="product.productQty"
              type="number"
              min="1"
              class="form-control"
              id="product_quantity"
              placeholder="輸入本包裝含幾份成品"
              required
            />
            <div class="invalid-feedback">此欄位為必填，且需大於等於 1</div>
          </section>
          <section class="col-12">
            <p class="mb-0 py-2 ms-1 fw-bold">
              <span class="text-danger">＊</span>
              從左邊資料庫點選成分，並填入各欄位所需資料
            </p>

            <ul
              v-for="(item, index) in product.ingredients"
              :key="item.id"
              class="border-top rounded-0 position-relative col-12 list-group list-group-horizontal-xl d-flex flex-wrap justify-content-between"
            >
              <li
                class="px-1 list-group-item col-12 col-xl-3 d-flex flex-column justify-content-center"
              >
                <p class="mb-0">{{ index + 1 }}. {{ item.sample_name }}</p>
                <p v-if="item.common_name" class="ps-3 mb-0">
                  俗名:{{ item.common_name }}
                </p>
              </li>
              <li
                class="px-0 list-group-item col-12 col-xl-4 d-flex flex-column justify-content-center"
              >
                <input
                  v-model.trim="item.foodName"
                  type="text"
                  :id="'foodName' + index"
                  :disabled="item.details.category === '自定義'"
                  placeholder="輸入欲示於外包裝成分"
                  class="form-control"
                  required
                />
                <div class="invalid-feedback">此欄位為必填</div>
              </li>
              <li
                class="px-0 list-group-item col-12 col-xl-3 d-flex flex-column justify-content-center"
              >
                <input
                  v-model="item.grams"
                  type="number"
                  :id="'grams' + index"
                  min="0.1"
                  step="0.1"
                  placeholder="輸入該成分『 總克數 』"
                  class="form-control"
                  required
                />
                <div class="invalid-feedback">此欄位為必填，且需大於 0</div>
              </li>
              <li
                class="d-none d-xl-block list-group-item col-1 align-content-center"
              >
                <button
                  @click="delField(item)"
                  type="button"
                  class="btn btn-outline-danger btn-sm d-block"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </li>
              <li
                class="d-block d-xl-none position-absolute delBtn-xs list-group"
              >
                <button
                  @click="delField(item)"
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </li>
            </ul>
            <div class="my-3 col-12">
              <button
                type="button"
                class="btn btn-outline-primary w-100"
                @click="addNewField"
              >
                新增欄位
              </button>
            </div>
          </section>
        </form>
      </div>
      <div class="col-12 text-end mb-4 px-3">
        <button
          form="form_id"
          type="submit"
          class="col-12 col-xl-9 btn btn-primary"
        >
          送出以上資料
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { useFoodStore } from '@/stores/foodDataStore.js'
import { mapState, mapActions } from 'pinia'
import { useMsgStore } from '@/stores/messageStore'
import { useCustomizeStore } from '@/stores/customizeStore'
export default {
  data() {
    return {
      filteredData: [],
      alert: false,
      filteredCostomizeData: [],
    }
  },

  computed: {
    ...mapState(useFoodStore, ['baseFoodData', 'product']),
    ...mapState(useCustomizeStore, ['customizeDataList']),
  },
  methods: {
    ...mapActions(useMsgStore, ['openAlert']),
    getCustomizeDataBase() {
      console.log(this.customizeDataList)
    },
    searchFood(food) {
      const data = []
      this.baseFoodData.filter(item => {
        if (
          (item.sample_name && item.sample_name.match(food)) ||
          (item.common_name && item.common_name.match(food))
        ) {
          data.push(item)
        }
      })
      this.filteredData = data
    },
    chooseSample(chooseItem) {
      const empty = this.product.ingredients.find(item => {
        return item.sample_name === ''
      })
      if (empty) {
        empty.id = Date.now()
        empty.details = chooseItem
        empty.sample_name = chooseItem.sample_name
        if (chooseItem.common_name) {
          empty.common_name = chooseItem.common_name
        }
        if (empty.details.category === '自定義') {
          if (chooseItem.sample_name === chooseItem.content_description) {
            empty.foodName = chooseItem.sample_name
          } else {
            empty.foodName =
              chooseItem.sample_name +
              ' ( ' +
              chooseItem.content_description +
              ' ) '
          }
        }
      }
    },
    addNewField() {
      const newIngredient = {
        id: '',
        sample_name: '',
        foodName: '',
        grams: '',
        details: '',
      }
      this.product.ingredients.push(newIngredient)
    },
    delField(data) {
      const index = this.product.ingredients.indexOf(data)
      this.product.ingredients.splice(index, 1)
    },
    submitForm(e) {
      const form = e.target
      if (!form.checkValidity()) {
        // 若表單無效，添加樣式提示
        form.classList.add('was-validated')
        this.openAlert(true, '還有必填欄位喔！')
        return
      }
      if (this.product.id) {
        this.$router.push(`/edit_mark_items/${this.product.id}`)
      } else {
        this.$router.push('/mark_items')
      }
    },
  },

  created() {
    this.filteredData = this.baseFoodData
    this.filteredCostomizeData = this.customizeDataList
    this.getCustomizeDataBase()
  },
}
</script>

<style lang="scss" scoped>
ul.list-group {
  --bs-list-group-border-width: none;
}

.visibleHeight {
  height: 72vh;
}

.formVisibleHeight {
  height: 77vh;
}

.delBtn-xs {
  top: 2%;
  right: 0%;
}

.btn-outline-danger {
  border-color: rgba(255, 255, 255, 0) !important;
}

.infoStyle {
  font-size: 14px;
}
* {
  border: 1px solid;
}
</style>
