<template>
  <div ref="nutrientsModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header flex-column align-items-start">
          <div class="w-100 mb-3 p-2 d-flex justify-content-between">
            <h5 class="modal-title">新增其他營養素</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <section class="w-100 form-floating">
            <input
              @change="e => searchNutrient(e.target.value)"
              type="search"
              class="form-control"
              id="searchInput"
              placeholder="請輸入欲新增營養素搜尋"
            />
            <label for="searchInput">請輸入營養素搜尋</label>
          </section>
          <div
            v-if="addNutrients.length > 0"
            class="mt-3 d-flex flex-wrap justify-content-start align-items-center"
          >
            <span class="ms-1">已新增營養素：</span>
            <span
              v-for="item in addNutrients"
              :key="item"
              class="border badge text-bg-light fs-6 m-1"
            >
              {{ nutrients[item] }}
            </span>
          </div>
        </div>

        <div class="modal-body">
          <div
            v-for="(value, key) in filteredNutrients"
            :key="key"
            class="form-check px-4 py-1 ms-2"
          >
            <input
              v-model="addNutrients"
              class="form-check-input"
              type="checkbox"
              :id="value"
              :value="key"
            />
            <label class="form-check-label" :for="value">
              {{ value }}
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button @click="addNTs" type="button" class="btn btn-primary">
            新增
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import { useFoodStore } from '@/stores/foodDataStore'
import { mapState, mapActions } from 'pinia'

export default {
  data() {
    return {
      modal: null,
      nutrients: [],
      filteredNutrients: [],
      addNutrients: [],
      product: null,
      productList: null,
    }
  },

  computed: {
    ...mapState(useFoodStore, ['headerChineseAndEnglish', 'myProductList']),
  },
  methods: {
    ...mapActions(useFoodStore, ['addMyProduct']),
    searchNutrient(nutrient) {
      this.filteredNutrients = Object.fromEntries(
        Object.entries(this.nutrients).filter(([, value]) => {
          return value.match(nutrient)
        }),
      )
    },
    updateFilterData() {
      const data = { ...this.headerChineseAndEnglish }
      ;[
        'id',
        'category',
        'sample_name',
        'common_name',
        'content_description',
        'scrap_rate',
        'calories',
        'corrected_calories',
        'protein',
        'fat',
        'saturated_fat',
        'total_carbohydrates',
        'total_sugar',
        'sodium',
        'trans_fat',
      ].forEach(ele => {
        delete data[ele]
      })
      this.filteredNutrients = data
      this.nutrients = data
    },

    addNTs() {
      this.productList.forEach(item => {
        if (item.id === this.product.id) {
          item.addNutrients = this.addNutrients
        }
      })
      this.addMyProduct(this.productList)
      this.hideModal()
    },
    showModal(item) {
      this.product = { ...item }
      if (item.addNutrients) {
        this.addNutrients = item.addNutrients
      }

      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    },
  },
  created() {
    this.updateFilterData()
    this.productList = this.myProductList
  },
  mounted() {
    this.modal = new Modal(this.$refs.nutrientsModal)
  },
}
</script>
