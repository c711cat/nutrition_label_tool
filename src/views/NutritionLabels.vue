<template>
  <main class="mx-auto col-11 col-xxl-10 pb-5 mb-5">
    <h3 class="text-center mb-4">{{ titleText }}</h3>
    <div class="text-end mb-2 me-1 d-block d-xl-none">
      <button @click="toggleDataBase" class="btn btn-primary" type="button">
        {{ toggleBtnText }}
      </button>
    </div>

    <section v-if="showDataBase" class="form-floating mb-5 mx-1">
      <input
        @input="e => searchFood(e.target.value.trim())"
        type="search"
        class="form-control"
        id="searchInput"
        placeholder="請輸入食物成分搜尋"
      />
      <label for="searchInput">請輸入食物名稱搜尋</label>
    </section>
    <div class="col-12 ps-1">
      <div class="row col-12 mx-0 mb-5">
        <section
          v-if="showDataBase"
          class="dataWrap bg-light py-2 mb-3 me-2 border rounded-3 col-12 col-xl-3"
        >
          <div class="d-flex flex-wrap justify-content-center mb-2">
            <button
              @click="showBuiltInDataBase"
              type="button"
              class="col-12 col-md m-1 me-1 btn btn-sm"
              :class="isBuiltIn ? 'btn-primary' : 'btn-outline-primary'"
            >
              內建資料庫
            </button>
            <button
              @click="showCustomizeDataBase"
              type="button"
              class="col-12 col-md m-1 me-1 btn btn-sm"
              :class="isCustomize ? 'btn-primary' : 'btn-outline-primary'"
            >
              自定義資料庫
            </button>
          </div>
          <section>
            <div
              v-if="
                filteredData.length === 0 && filteredCustomizeData.length === 0
              "
              class="py-5 text-center"
            >
              <p class="mb-2 fw-bold px-3">皆無相符品項</p>
              <p class="px-3">若該品項有營養標示，可自行新增資料</p>

              <button
                @click="openCustomizeBaseDataModal"
                type="button"
                class="btn btn-sm btn-outline-primary"
              >
                新增自定義資料
              </button>
            </div>
            <div v-else>
              <section
                v-if="isBuiltIn"
                class="list-group rounded overflow-y-auto overflow-x-hidden"
                :class="['xsVisibleHeight', 'visibleHeight']"
              >
                <button
                  v-for="item in filteredData"
                  :key="item.id"
                  @click="chooseSample(item)"
                  type="button"
                  class="list-group-item list-group-item-action px-1"
                  aria-current="true"
                >
                  <p class="mb-0 px-2">
                    {{ item.sample_name }}
                  </p>
                  <p v-if="item.common_name" class="mb-0 px-2 text-secondary">
                    俗名:{{ item.common_name }}
                  </p>
                  <p
                    v-if="item.content_description"
                    class="mb-0 px-2 text-secondary"
                  >
                    {{ item.content_description }}
                  </p>
                </button>
                <div v-if="filteredData.length === 0" class="mt-5 text-center">
                  <p class="mb-0 text-center fw-bold">內建資料庫中</p>
                  <p class="mb-0 text-center fw-bold">無相符品項</p>
                  <p class="px-3">若該品項有營養標示，可自行新增資料</p>
                  <button
                    @click="openCustomizeBaseDataModal"
                    type="button"
                    class="btn btn-sm btn-outline-primary"
                  >
                    新增自定義資料
                  </button>
                </div>
              </section>
              <section
                v-if="isCustomize"
                class="list-group rounded overflow-y-auto overflow-x-hidden"
                :class="['xsVisibleHeight', 'visibleHeight']"
              >
                <button
                  v-for="item in filteredCustomizeData"
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
                <div
                  v-if="filteredCustomizeData.length === 0"
                  class="mt-5 text-center"
                >
                  <p class="mb-0 text-center fw-bold">自定義資料庫中</p>
                  <p class="mb-2 text-center fw-bold">無相符品項</p>
                  <p class="px-3">若該品項有營養標示，可自行新增資料</p>
                  <button
                    @click="openCustomizeBaseDataModal"
                    type="button"
                    class="btn btn-sm btn-outline-primary"
                  >
                    新增自定義資料
                  </button>
                </div>
              </section>
            </div>
          </section>
        </section>
        <form
          id="form_id"
          @submit.prevent="submitForm"
          class="row mx-0 pt-3 pe-1 bg-primary50 rounded-3 align-content-start col-12 col-xl border"
          novalidate
        >
          <section class="col-12 col-xl-6 mb-3">
            <label
              for="productName"
              class="form-label fw-bold d-flex justify-content-start"
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
          <section class="col-12 col-xl-6 mb-3">
            <label
              for="number_of_copies"
              class="form-label fw-bold d-flex flex-wrap justify-content-start"
            >
              <div class="pe-1">
                <i class="text-danger fst-normal pe-1">＊</i>
                <span class="me-1">以下食材總量共可製成幾份成品？</span>
                <i
                  @click="openInstructionModal('productQty')"
                  class="showInfo bi bi-question-circle text-primary fw-normal fst-normal infoStyle d-inline-block"
                >
                  說明
                </i>
              </div>
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
          <section class="col-12 col-xl-6 d-flex mb-3">
            <div class="col-12">
              <label
                for="net_weight"
                class="form-label fw-bold d-flex flex-wrap justify-content-start col-12"
              >
                <div class="pe-1 d-flex align-items-center">
                  <i class="text-danger fst-normal">＊</i>
                </div>
                <span class="me-2">每一份量</span>

                <div
                  class="infoStyle text-secondary fw-normal d-flex flex-wrap align-items-center"
                >
                  <i class="bi bi-info-circle fst-normal">
                    將顯示在每一份量的位置
                    <i
                      @click="openInstructionModal('perServing')"
                      class="showInfo bi bi-question-circle fst-normal text-primary d-inline-block"
                    >
                      顯示圖示
                    </i>
                  </i>
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
          <section class="col-12 col-xl-6 mb-3">
            <label
              for="product_quantity"
              class="form-label fw-bold d-flex flex-wrap justify-content-start"
            >
              <div class="pe-1 d-flex align-items-center">
                <i class="text-danger fst-normal">
                  ＊
                  <span class="me-1 text-dark">本包裝含幾份成品？</span>
                </i>
              </div>

              <div
                class="infoStyle text-secondary fw-normal d-flex flex-wrap align-items-center"
              >
                <i class="bi bi-info-circle me-2 fst-normal">
                  將顯示在本包裝含幾份的位置
                  <i
                    @click="openInstructionModal('howMany')"
                    class="showInfo bi bi-question-circle fst-normal text-primary d-inline-block"
                  >
                    顯示圖示
                  </i>
                </i>
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
            <p class="mb-0 py-2 fw-bold">
              <span class="text-danger">＊</span>
              先從資料庫點選成分，再填入各欄位所需資料
              <i
                @click="openInstructionModal('totalWeight')"
                class="showInfo bi bi-question-circle text-primary fw-normal fst-normal ps-1 infoStyle d-inline-block"
              >
                說明
              </i>
            </p>

            <ul
              v-for="(item, index) in product.ingredients"
              :key="item.id"
              class="rounded-0 position-relative col-12 list-group list-group-horizontal-xl d-flex flex-wrap justify-content-between"
              :class="item.sample_name === '' ? '' : 'border-top'"
            >
              <li
                v-if="item.sample_name"
                class="px-1 bg-primary50 list-group-item col-12 col-xl-3 d-flex"
              >
                <i class="pe-1 fst-normal">{{ index + 1 }}.</i>
                <div>
                  <p class="mb-0">
                    {{ item.sample_name }}
                  </p>
                  <p v-if="item.common_name" class="mb-0">
                    俗名:{{ item.common_name }}
                  </p>
                </div>
              </li>

              <li
                v-if="item.sample_name"
                class="px-0 bg-primary50 list-group-item col-12 col-xl-4 d-flex flex-column justify-content-center"
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
                v-if="item.sample_name"
                class="px-0 bg-primary50 bg-opacity-50 list-group-item col-12 col-xl-3 d-flex flex-column justify-content-center"
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
                v-if="item.sample_name"
                class="bg-primary50 d-none d-xl-block list-group-item col-1 align-content-center"
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
                v-if="item.sample_name"
                class="bg-primary50 d-block d-xl-none position-absolute delBtn-xs list-group"
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
          </section>
        </form>
      </div>
      <div class="col-12 text-end mb-4">
        <button
          form="form_id"
          type="submit"
          class="col-12 col-xl-9 btn btn-primary"
        >
          送出以上資料
        </button>
      </div>
    </div>
    <CustomizeBaseDataModal ref="customizeBaseDataModal" />
    <InstructionModal ref="instructionModal" />
  </main>
</template>

<script>
import { useFoodStore } from '@/stores/foodDataStore.js'
import { mapState, mapActions } from 'pinia'
import { useMsgStore } from '@/stores/messageStore'
import { useCustomizeStore } from '@/stores/customizeStore'
import CustomizeBaseDataModal from '@/components/CustomizeBaseDataModal.vue'
import InstructionModal from '@/components/InstructionModal.vue'
export default {
  data() {
    return {
      filteredData: [],
      alert: false,
      filteredCustomizeData: [],
      isBuiltIn: true,
      isCustomize: false,
      showDataBase: true,
    }
  },
  components: { CustomizeBaseDataModal, InstructionModal },
  watch: {
    customizeModal: {
      handler(val) {
        if (val.switch === false && this.$route.path === '/nutrition_label') {
          this.showCustomizeDataBase()
          this.searchFood(val.title)
          document.getElementById('searchInput').value = val.title
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapState(useFoodStore, ['baseFoodData', 'product']),
    ...mapState(useCustomizeStore, ['customizeDataList', 'customizeModal']),
    toggleBtnText() {
      if (this.showDataBase === true) {
        return '隱藏資料庫'
      } else {
        return '開啟資料庫'
      }
    },
    titleText() {
      return this.product.id ? '編輯營養標示' : '營養標示製作'
    },
  },
  methods: {
    ...mapActions(useMsgStore, ['openAlert']),
    toggleDataBase() {
      this.showDataBase = !this.showDataBase
    },

    showBuiltInDataBase() {
      this.isBuiltIn = true
      this.isCustomize = false
    },
    showCustomizeDataBase() {
      this.isCustomize = true
      this.isBuiltIn = false
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
      const customizeData = []
      this.customizeDataList.filter(item => {
        if (item.sample_name && item.sample_name.match(food)) {
          customizeData.push(item)
        }
      })
      this.filteredCustomizeData = customizeData

      if (
        this.filteredData.length === 0 &&
        this.filteredCustomizeData.length !== 0
      ) {
        this.showCustomizeDataBase()
      }
      if (
        this.filteredData.length !== 0 &&
        this.filteredCustomizeData.length === 0
      ) {
        this.showBuiltInDataBase()
      }
    },
    chooseSample(chooseItem) {
      // 檢查是否已經選取過相同的項目
      const repeat = this.product.ingredients.some(item => {
        return (
          item.sample_name === chooseItem.sample_name &&
          item.common_name === chooseItem.common_name
        )
      })
      if (repeat) {
        this.openAlert(true, '已經選取囉！')
      } else {
        // 新增一個空白欄位
        this.addNewField()
        // 尋找 product.ingredients 陣列中第一個 sample_name 為空字串的項目
        const empty = this.product.ingredients.find(item => {
          return item.sample_name === ''
        })
        // 確定是空欄位再填入對應資料，避免覆蓋之前選取的項目
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
      // 刪除空白欄位
      this.product.ingredients.filter(item => {
        if (item.sample_name === '') {
          this.delField(item)
        }
      })
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
    getAllData() {
      this.filteredData = this.baseFoodData
      this.filteredCustomizeData = this.customizeDataList
    },
    openCustomizeBaseDataModal() {
      this.$refs.customizeBaseDataModal.showModal()
    },
    openInstructionModal(text) {
      this.$refs.instructionModal.showModal(text)
    },
  },
  created() {
    this.getAllData()
  },
}
</script>

<style lang="scss" scoped>
ul.list-group {
  --bs-list-group-border-width: none;
}
.dataWrap {
  height: 82vh;
}

@media (min-width: 768px) {
  //視窗寬度 >= 768px
  .visibleHeight {
    height: 72vh;
  }
}

@media (max-width: 767px) {
  //視窗寬度 <= 767px
  .xsVisibleHeight {
    height: 66vh;
  }
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

.list-group-item-action:hover,
.list-group-item-action:focus {
  --bs-list-group-action-hover-bg: #f9fafb !important;
}

.showInfo {
  cursor: pointer;
}

.showInfo:hover {
  filter: brightness(1.5);
}
</style>
