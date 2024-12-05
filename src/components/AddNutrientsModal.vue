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
            v-if="localAddOthersNutrients.length > 0"
            class="mt-3 d-flex flex-wrap justify-content-start align-items-center"
          >
            <span class="ms-1">已新增營養素：</span>
            <span
              v-for="item in localAddOthersNutrients"
              :key="item"
              class="border badge text-bg-light fs-6 m-1"
            >
              {{ nutrients[item] }}
            </span>
          </div>
        </div>

        <div class="modal-body">
          <div v-if="Object.values(filteredNutrients).length === 0">
            <p class="mt-2 mb-4 text-center fw-bold fs-5 text-primary">
              查無相符品項
            </p>
            <form @submit.prevent="submitForm" novalidate>
              <h6 class="ms-1">自行新增營養素</h6>
              <div class="form-floating mb-3">
                <input
                  v-model.trim="englishName"
                  type="text"
                  class="form-control"
                  id="englishName"
                  placeholder="營養素英文名稱 或 縮寫"
                  required
                />
                <div class="invalid-feedback">此欄位為必填</div>
                <label for="englishName">
                  <i class="text-danger fst-normal">＊</i>
                  營養素英文名稱 或 縮寫
                </label>
              </div>
              <div class="form-floating mb-3">
                <input
                  v-model.trim="chineseName"
                  type="text"
                  class="form-control"
                  id="chineseName"
                  placeholder="營養素中文名稱"
                  required
                />
                <div class="invalid-feedback">此欄位為必填</div>
                <label for="chineseName">
                  <i class="text-danger fst-normal">＊</i>
                  營養素中文名稱
                </label>
              </div>

              <div class="mt-2 ms-2 mb-3">
                <p class="mb-2">
                  <i class="text-danger fst-normal me-2">＊</i>
                  營養素單位
                </p>
                <div class="form-check form-check-inline">
                  <input
                    v-model="unit"
                    class="form-check-input"
                    type="radio"
                    id="gram"
                    value="公克"
                  />
                  <label class="form-check-label" for="gram">公克</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    v-model="unit"
                    class="form-check-input"
                    type="radio"
                    id="milligram"
                    value="毫克"
                  />
                  <label class="form-check-label" for="milligram">毫克</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    v-model="unit"
                    class="form-check-input"
                    type="radio"
                    id="microgram"
                    value="微克"
                  />
                  <label class="form-check-label" for="microgram">微克</label>
                </div>
              </div>
              <button
                type="submit"
                class="w-100 btn btn-sm btn-outline-primary"
              >
                新增營養素
              </button>
            </form>
          </div>
          <div
            v-else
            v-for="(value, key) in filteredNutrients"
            :key="key"
            class="form-check px-4 py-1 ms-2"
          >
            <input
              v-model="localAddOthersNutrients"
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
          <button
            v-if="addNTsBtb"
            @click="addNTs"
            type="button"
            class="btn btn-primary"
          >
            新增
          </button>
          <button
            v-else
            @click="addCustomFoodNTs"
            type="button"
            class="btn btn-primary"
          >
            新增自訂義食材營養素
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import { useFoodStore } from '@/stores/foodDataStore'
import { useCustomStore } from '@/stores/customStore'
import { useMsgStore } from '@/stores/messageStore'
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
      addNTsBtb: true,
      localAddOthersNutrients: [],
      englishName: '',
      chineseName: '',
      unit: '公克',
    }
  },

  computed: {
    ...mapState(useFoodStore, ['headerChineseAndEnglish', 'myProductList']),
    ...mapState(useCustomStore, ['addOthersNutrients']),
  },
  watch: {
    localAddOthersNutrients: {
      handler(val) {
        this.pushNTs(val)
        return this.localAddOthersNutrients
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    ...mapActions(useFoodStore, [
      'setMyProducts',
      'addLabelNTs',
      'pushNTs',
      'setNewHeaderItem',
    ]),
    ...mapActions(useCustomStore, ['addCustomNutrients', 'clearAddOtherNts']),
    ...mapActions(useMsgStore, ['openAlert']),
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
      this.addLabelNTs(this.product)
      this.hideModal()
    },
    showModal(item) {
      this.addNTsBtb = true
      this.product = { ...item }
      this.addNutrients = []
      if (item.addNutrients) {
        this.localAddOthersNutrients = item.addNutrients
      }
      this.modal.show()
    },
    showCustomModal() {
      this.localAddOthersNutrients = this.addOthersNutrients
      this.modal.show()
      this.addNTsBtb = false
    },
    addCustomFoodNTs() {
      this.addCustomNutrients(this.localAddOthersNutrients)
      this.hideModal()
    },
    hideModal() {
      this.modal.hide()
    },
    submitForm(e) {
      const form = e.target
      if (!form.checkValidity()) {
        // 若表單無效，添加樣式提示
        form.classList.add('was-validated')
        this.openAlert(true, '還有必填欄位喔！')
        return
      }
      this.addCustomNts()
    },
    addCustomNts() {
      const Nts = {
        [this.englishName]: this.chineseName + '(' + this.unit + ')',
      }
      this.localAddOthersNutrients.push(this.englishName)
      this.addCustomNutrients(this.localAddOthersNutrients)
      this.setNewHeaderItem(Nts)
      this.updateFilterData()
    },
  },
  created() {
    this.updateFilterData()
  },
  mounted() {
    this.modal = new Modal(this.$refs.nutrientsModal)
  },
}
</script>
