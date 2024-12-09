<template>
  <div ref="nutrientsModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header flex-column align-items-start">
          <div class="w-100 mb-3 p-2 d-flex justify-content-between">
            <h4 class="modal-title">新增其他營養素</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <section class="w-100 form-floating">
            <input
              v-model="searchText"
              @change="e => searchNutrient(e.target.value)"
              type="search"
              class="form-control"
              id="searchInput"
              placeholder="請輸入欲新增營養素搜尋"
            />
            <label for="searchInput">請輸入營養素搜尋</label>
          </section>
          <div
            class="mt-3 d-flex flex-wrap justify-content-start align-items-center"
          >
            <span class="ms-1">已新增營養素：</span>
            <span
              v-for="item in localAddedNts"
              :key="item"
              class="border badge text-bg-light fs-6 m-1"
            >
              {{ nutrients[item] }}
            </span>
            <span
              v-for="(item, index) in localAddedCustomNts"
              :key="item + index"
              class="border badge text-bg-dark fs-6 m-1"
            >
              {{ item.chName }}
            </span>
          </div>
        </div>

        <div class="modal-body">
          <div
            v-if="
              Object.values(filteredNutrients).length === 0 &&
              filteredMyAddHeader.length === 0
            "
          >
            <p class="mt-2 mb-4 text-center fw-bold fs-4 text-primary">
              查無相符品項
            </p>

            <form @submit.prevent="submitForm" novalidate>
              <h5 class="ms-1">自行新增營養素</h5>
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
                <p class="mb-2 fw-bold">
                  <i class="text-danger fst-normal me-1">＊</i>
                  營養素單位
                </p>
                <div class="form-check form-check-inline">
                  <input
                    v-model="unit"
                    class="form-check-input"
                    type="radio"
                    id="gram"
                    value="公克(g)"
                  />
                  <label class="form-check-label" for="gram">公克 (g)</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    v-model="unit"
                    class="form-check-input"
                    type="radio"
                    id="milligram"
                    value="毫克(mg)"
                  />
                  <label class="form-check-label" for="milligram">
                    毫克 (mg)
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    v-model="unit"
                    class="form-check-input"
                    type="radio"
                    id="microgram"
                    value="微克(ug)"
                  />
                  <label class="form-check-label" for="microgram">
                    微克 (ug)
                  </label>
                </div>
              </div>

              <div class="mt-2 ms-2 mb-3">
                <p class="mb-2 fw-bold">
                  <i class="text-danger fst-normal me-1">＊</i>
                  營養素類別
                </p>
                <div class="form-check form-check-inline">
                  <input
                    v-model="type"
                    class="form-check-input"
                    type="radio"
                    id="fiber"
                    value="膳食纖維"
                  />
                  <label class="form-check-label" for="fiber">膳食纖維</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    v-model="type"
                    class="form-check-input"
                    type="radio"
                    id="sugar_alcohol"
                    value="糖醇"
                  />
                  <label class="form-check-label" for="sugar_alcohol">
                    糖醇
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    v-model="type"
                    class="form-check-input"
                    type="radio"
                    id="organic_acid"
                    value="有機酸"
                  />
                  <label class="form-check-label" for="organic_acid">
                    有機酸
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    v-model="type"
                    class="form-check-input"
                    type="radio"
                    id="none"
                    value="以上皆非"
                  />
                  <label class="form-check-label" for="none">以上皆非</label>
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
          <div v-else>
            <div
              v-for="(item, index) in filteredMyAddHeader"
              :key="item + index"
              class="form-check px-4 py-1 ms-2"
            >
              <input
                v-model="localAddedCustomNts"
                :value="item"
                :id="item + index"
                class="form-check-input"
                type="checkbox"
              />
              <label :for="item + index" class="form-check-label">
                {{ item.chName }}
              </label>
            </div>

            <div
              v-for="(value, key) in filteredNutrients"
              :key="key"
              class="form-check px-4 py-1 ms-2"
            >
              <input
                v-model="localAddedNts"
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
            @click="addCustomFoodNTs"
            :disabled="
              Object.values(filteredNutrients).length === 0 &&
              filteredMyAddHeader.length === 0
            "
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

      localAddedNts: [],
      englishName: '',
      chineseName: '',
      unit: '公克(g)',
      type: '以上皆非',
      localAddedCustomNts: [],
      myAddHeader: [],
      filteredMyAddHeader: [],
      searchText: '',
    }
  },

  computed: {
    ...mapState(useFoodStore, ['headerChineseAndEnglish', 'myProductList']),
    ...mapState(useCustomStore, ['addOthersNutrients']),
  },
  watch: {
    localAddedNts: {
      handler(val) {
        this.pushNTs(val)
        return this.localAddedNts
      },
      deep: true,
      immediate: true,
    },
    // localAddedCustomNts: {
    //   handler(val) {
    //     this.pushNTs(val)
    //     return this.localAddedCustomNts
    //   },
    //   deep: true,
    //   immediate: true,
    // },
  },
  methods: {
    ...mapActions(useFoodStore, ['setMyProducts', 'pushNTs']),
    ...mapActions(useCustomStore, ['clearAddOtherNts', 'addNts']),
    ...mapActions(useMsgStore, ['openAlert']),
    searchNutrient(nutrient) {
      this.filteredNutrients = Object.fromEntries(
        Object.entries(this.nutrients).filter(([key, value]) => {
          return value.match(nutrient) || key.match(nutrient) // key:英文名稱，value:中文名稱
        }),
      )
      this.filteredMyAddHeader = this.myAddHeader.filter(item => {
        return item.enName.match(nutrient) || item.chName.match(nutrient)
      })
    },
    getMyAddHeader() {
      const data = JSON.parse(localStorage.getItem('myAddHeader')) || []
      this.myAddHeader = data
      this.filteredMyAddHeader = data
    },
    updateFilterData() {
      this.getMyAddHeader()
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

    showCustomModal() {
      this.localAddedNts = this.addOthersNutrients
      this.modal.show()
    },
    addCustomFoodNTs() {
      this.addNts(this.localAddedNts, this.localAddedCustomNts)
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
      const data = {
        type: this.type,
        enName: this.englishName,
        chName: this.chineseName,
        unit: this.unit,
        quantity: '',
      }
      this.localAddedCustomNts.push(data) // 為了立即顯示在已新增營養素畫面中
      this.myAddHeader.push(data) // 加入剛新增的項目到 myAddHeader 中，再將全部的 myAddHeader setItem 到 localStorage 中
      localStorage.setItem('myAddHeader', JSON.stringify(this.myAddHeader))
      this.getMyAddHeader() // 呼叫重新取得全部新增的品項，為了可以立即顯示在選項中
      this.type = '以上皆非'
      this.englishName = ''
      this.chineseName = ''
      this.unit = '公克(g)'
      this.searchText = '' // 清空搜尋欄位
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
