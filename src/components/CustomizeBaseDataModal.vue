<template>
  <div
    ref="customizeBaseDataModal"
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl"
    >
      <div class="modal-content">
        <div class="modal-header bg-primary text-white" data-bs-theme="dark">
          <h3 class="modal-title">{{ titleText }}自訂義資料</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form
            id="AddCustomizeForm_id"
            @submit.prevent="submitForm"
            class="row m-0 flex-wrap justify-content-between"
            novalidate
          >
            <div class="py-3 col-12 col-lg">
              <div class="form-floating mb-3">
                <input
                  v-model.trim="customizeData.sample_name"
                  type="text"
                  class="form-control"
                  id="sample_name"
                  placeholder="食材名稱"
                  required
                />
                <div class="invalid-feedback">此欄位為必填</div>
                <label for="sample_name" class="">
                  <i class="text-danger fst-normal">＊</i>
                  食材名稱
                </label>
              </div>
              <div class="form-floating">
                <textarea
                  style="height: 200px"
                  v-model.trim="customizeData.content_description"
                  type="text"
                  class="form-control"
                  :class="getStyle"
                  id="content_description"
                  placeholder="成分 （ 填入相同於包裝上顯示的成分 ）"
                  required
                />
                <div class="invalid-feedback">此欄位為必填</div>
                <label for="content_description" class="text-wrap">
                  <i class="text-danger fst-normal">＊</i>
                  成分：填入包裝上成分，內容及順序須相同
                </label>
              </div>
            </div>

            <div class="py-3 col-auto mb-5 mx-auto">
              <table class="mb-4">
                <thead>
                  <tr>
                    <th colspan="2" class="px-3 fs-5">
                      營養標示 - 依包裝上的數值填入
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-center">
                    <th></th>
                    <td class="py-2">每 100 公克 / 毫升</td>
                  </tr>
                  <tr v-for="(value, key) in nutrients" :key="value">
                    <th class="fw-normal px-3">
                      <i class="text-danger fst-normal">＊</i>
                      {{ value }}
                    </th>
                    <td class="col-6 col-sm-auto">
                      <!-- 如果 key 是 trans_fat，則執行若 (customizeData[key] ? customizeData[key] / 1000 : '')，如果不是，則直接使用 customizeData[key]。 -->
                      <input
                        :value="
                          key === 'trans_fat'
                            ? customizeData[key]
                              ? customizeData[key] / 1000
                              : ''
                            : customizeData[key]
                        "
                        @input="updateValue($event, key)"
                        type="number"
                        :name="key"
                        :id="key"
                        class="form-control text-center"
                        required
                        min="0"
                        step="0.0001"
                      />
                      <div class="invalid-feedback">此欄位為必填</div>
                    </td>
                  </tr>

                  <tr
                    v-for="(value, key) in customizeData.baseClaimNts"
                    :key="key"
                  >
                    <th class="fw-normal px-3">
                      <i class="text-danger fst-normal">＊</i>
                      {{ header[key] }}
                    </th>
                    <td>
                      <input
                        v-model="customizeData.baseClaimNts[key]"
                        type="number"
                        :name="key"
                        :id="key"
                        class="form-control text-center"
                        required
                        min="0"
                        step="0.01"
                      />
                    </td>
                  </tr>

                  <tr
                    v-for="(item, index) in customizeData.newClaimNts"
                    :key="item + index"
                  >
                    <th class="fw-normal px-3">
                      <i class="text-danger fst-normal">＊</i>
                      {{ item.chName }}({{ item.unit.match(/\((.*?)\)/)[1] }})
                    </th>
                    <td>
                      <input
                        v-if="customizeData.newClaimNts"
                        v-model="customizeData.newClaimNts[index].quantity"
                        :id="item + index"
                        :name="item.quantity"
                        type="number"
                        class="form-control text-center"
                        required
                        min="0"
                        step="0.01"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <button
                  @click="openModal()"
                  type="button"
                  class="btn btn-outline-primary col-12"
                >
                  新增其他營養素
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer bg-light">
          <button
            form="AddCustomizeForm_id"
            type="submit"
            class="btn btn-primary"
          >
            送出資料
          </button>
        </div>
      </div>
    </div>
  </div>
  <CustomizeClaimNtsModal ref="customizeClaimNtsModal" />
  <DoubleCheckModal ref="doubleCheckModal" />
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import { mapState, mapActions } from 'pinia'
import { useFoodStore } from '@/stores/foodDataStore.js'
import { useCustomizeStore } from '@/stores/customizeStore'
import { useMsgStore } from '@/stores/messageStore'
import CustomizeClaimNtsModal from '@/components/CustomizeClaimNtsModal.vue'
import DoubleCheckModal from '@/components/DoubleCheckModal.vue'
export default {
  data() {
    return {
      modal: null,
      header: [],
      filteredHeader: [],
      nutrients: {
        calories: '熱量(kcal)',
        protein: '蛋白質(g)',
        fat: '脂肪(g)',
        saturated_fat: '飽和脂肪(g)',
        trans_fat: '反式脂肪(g)',
        total_carbohydrates: '碳水化合物(g)',
        total_sugar: '糖(g)',
        sodium: '鈉(mg)',
      },
    }
  },
  components: { CustomizeClaimNtsModal, DoubleCheckModal },
  watch: {
    headerChineseAndEnglish: {
      handler(val) {
        this.getHeader()
        return val
      },
      deep: true,
      immediate: true,
    },
    customizeModal: {
      handler(val) {
        if (val.switch === false) {
          this.hideModal()
        }
      },
      deep: true,
      immediate: true,
    },
    updateValue(event, key) {
      const value = parseFloat(event.target.value)
      if (!isNaN(value)) {
        this.customizeData[key] = key === 'trans_fat' ? value * 1000 : value
      }
    },
  },
  computed: {
    ...mapState(useFoodStore, [
      'headerChineseAndEnglish',
      'myProductList',
      'baseFoodData',
    ]),
    ...mapState(useCustomizeStore, [
      'newClaimNts',
      'customizeData',
      'baseClaimNts',
      'customizeModal',
    ]),
    getStyle() {
      if (window.innerWidth < 483) {
        return 'pt-5'
      } else {
        return ''
      }
    },
    titleText() {
      return this.customizeData.id ? '編輯' : '新增'
    },
  },
  methods: {
    updateValue(event, key) {
      let value = parseFloat(event.target.value)

      // 如果輸入無效（空白、非數字），則設為 0，避免 NaN 問題
      if (isNaN(value)) {
        value = 0
      }

      this.customizeData[key] = key === 'trans_fat' ? value * 1000 : value
    },
    showModal() {
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    },

    ...mapActions(useMsgStore, ['openAlert']),
    getHeader() {
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
      this.header = data
      this.filteredHeader = data
    },
    submitForm(e) {
      const form = e.target
      if (!form.checkValidity()) {
        // 若表單無效，添加樣式提示
        form.classList.add('was-validated')
        this.openAlert(true, '還有必填欄位喔！')
        return
      }
      this.$refs.doubleCheckModal.showModal('customize')
    },
    openModal() {
      this.$refs.customizeClaimNtsModal.showModal(this.customizeData)
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.customizeBaseDataModal)
  },
  created() {
    this.getHeader()
  },
}
</script>
