<template>
  <div ref="nutrientsModal" class="modal" tabindex="-1">
    <div class="rounded-4 modal-dialog modal-dialog-scrollable">
      <div class="rounded-4 modal-content">
        <div
          class="border-0 pt-2 pb-3 bg-light modal-header flex-column align-items-start"
          :class="
            localBaseClaimNts.length > 0 || localNewClaimNts.length > 0
              ? ''
              : 'border-bottom'
          "
        >
          <div class="w-100 mb-2 d-flex justify-content-between">
            <h4 class="modal-title p-1">新增其他營養素</h4>
            <button
              type="button"
              class="btn-close mt-1"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <section class="w-100 form-floating">
            <input
              v-model="searchText"
              @change="search($event.target.value)"
              type="search"
              class="form-control"
              id="searchInput"
              placeholder="請輸入欲新增營養素搜尋"
            />
            <label for="searchInput">搜尋 中文 或 英文 營養素</label>
          </section>
        </div>
        <section
          v-if="localBaseClaimNts.length > 0 || localNewClaimNts.length > 0"
          class="bg-light pb-2 border-bottom d-flex flex-wrap justify-content-start align-items-center"
        >
          <p class="ms-3 ps-1 mb-0">已新增營養素：</p>
          <div class="addedNts w-100 ms-3">
            <span
              v-for="(nt, index) in localBaseClaimNts"
              :key="nt + index"
              class="badge text-primary-emphasis bg-primary-subtle border-primary-subtle fs-6 m-1"
            >
              {{ nts[nt].replace(/\(.*\)/, '') }}
            </span>
            <span
              v-for="(value, key) in localNewClaimNts"
              :key="key"
              class="badge text-dark-emphasis bg-dark-subtle border-dark-subtle fs-6 m-1"
            >
              {{ myAddedNts[value].replace(/\(.*\)/, '') }}
            </span>
          </div>
        </section>
        <div class="modal-body">
          <section
            v-if="
              Object.values(filteredNts).length === 0 &&
              Object.values(filteredMyAddedNts).length === 0
            "
          >
            <p class="mt-2 mb-4 text-center fw-bold fs-4 text-primary">
              查無相符品項
            </p>

            <form @submit.prevent="submitForm" novalidate>
              <h5 class="ms-1">自行新增營養素</h5>
              <div class="form-floating mb-3">
                <input
                  @change="alreadlyHaveEnName($event)"
                  v-model.trim="enName"
                  type="text"
                  class="form-control"
                  id="enName"
                  placeholder="營養素『 英文 』名稱 或 縮寫"
                  required
                />
                <div class="invalid-feedback">此欄位為必填</div>
                <label for="enName">
                  <i class="text-danger fst-normal">＊</i>
                  營養素『 英文 』名稱 或 縮寫
                </label>
              </div>
              <div class="form-floating mb-3">
                <input
                  @change="alreadlyHaveChName($event)"
                  v-model.trim="chName"
                  type="text"
                  class="form-control"
                  id="chName"
                  placeholder="營養素『 中文 』名稱"
                  required
                />
                <div class="invalid-feedback">此欄位為必填</div>
                <label for="chName">
                  <i class="text-danger fst-normal">＊</i>
                  營養素『 中文 』名稱
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
                  <i class="bi bi-info-circle ms-2 me-1 text-secondary"></i>
                  <span class="text-secondary fw-normal">
                    以下選擇與熱量計算有關
                  </span>
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

              <button type="submit" class="w-100 btn btn-sm btn-primary">
                新增營養素
              </button>
            </form>
          </section>

          <section v-else>
            <div
              v-for="(value, key, index) in filteredMyAddedNts"
              :key="key"
              class="form-check px-4 ms-2 d-flex align-items-center"
            >
              <div class="col-4 col-sm-3">
                <input
                  v-model="localNewClaimNts"
                  :value="key"
                  :id="key"
                  class="form-check-input"
                  type="checkbox"
                />
                <label :for="key" class="form-check-label">
                  {{ value }}
                </label>
              </div>

              <div class="d-flex align-items-center">
                <button
                  @click="openDoubleCheckModal(value, key, index)"
                  :disabled="localNewClaimNts.includes(key) || used(key)"
                  type="button"
                  class="btn btn-sm btn-outline-danger bi bi-trash3"
                ></button>
                <div>
                  <p
                    v-if="localNewClaimNts.includes(key) && !used(key)"
                    class="mb-0 px-2 text-secondary"
                  >
                    <i class="bi bi-info-circle"></i>
                    若需刪除，則取消勾選
                  </p>
                  <p v-if="used(key)" class="px-2 text-secondary mb-0">
                    <i class="bi bi-info-circle"></i>
                    自定義資料中已使用，不予刪除
                  </p>
                </div>
              </div>
            </div>

            <div
              v-for="(value, key) in filteredNts"
              :key="key"
              class="form-check px-4 py-1 ms-2"
            >
              <input
                v-model="localBaseClaimNts"
                :id="key"
                :value="key"
                class="form-check-input"
                type="checkbox"
              />
              <label :for="key" class="form-check-label">
                {{ value }}
              </label>
            </div>
          </section>
        </div>
        <div class="bg-light modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>

          <button
            @click="update"
            :disabled="
              Object.values(filteredNts).length === 0 &&
              Object.values(filteredMyAddedNts).length === 0
            "
            type="button"
            class="btn btn-primary"
          >
            更新
          </button>
        </div>
      </div>
    </div>
  </div>
  <DoubleCheckModal ref="doubleCheckModal" />
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import { useFoodStore } from '@/stores/foodDataStore'
import { useCustomizeStore } from '@/stores/customizeStore'
import { useMsgStore } from '@/stores/messageStore'
import { mapState, mapActions } from 'pinia'
import DoubleCheckModal from '@/components/DoubleCheckModal.vue'

export default {
  data() {
    return {
      modal: null,
      filteredNts: [],
      nts: [],
      product: null,
      productList: null,
      localBaseClaimNts: [],
      localNewClaimNts: [],
      enName: '',
      chName: '',
      unit: '公克(g)',
      type: '以上皆非',
      localMyAddedNtsList: [],
      myAddedNts: [],
      filteredMyAddedNts: [],
      searchText: '',
    }
  },
  components: { DoubleCheckModal },
  computed: {
    ...mapState(useFoodStore, ['headerChineseAndEnglish', 'myProductList']),
    ...mapState(useCustomizeStore, [
      'baseClaimNts',
      'newClaimNts',
      'customizeData',
      'customizeDataList',
      'myAddedNtsList',
    ]),
  },
  watch: {
    baseClaimNts: {
      handler(val) {
        this.localBaseClaimNts = val
      },
      deep: true,
      immediate: true,
    },
    newClaimNts: {
      handler(val) {
        this.localNewClaimNts = val
      },
      deep: true,
      immediate: true,
    },
    myAddedNtsList: {
      handler() {
        this.getMyAddedNts()
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    ...mapActions(useFoodStore, ['setMyProducts', 'pushNTs']),
    ...mapActions(useCustomizeStore, ['addNts', 'showCustomizeDataClaimNts']),
    ...mapActions(useMsgStore, ['openAlert']),
    updateOptionData() {
      this.getMyAddedNts()
      const delItems = [
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
      ]
      this.nts = { ...this.headerChineseAndEnglish }
      delItems.forEach(item => {
        delete this.nts[item]
      })
      this.filteredNts = this.nts
    },
    search(text) {
      this.filteredNts = Object.fromEntries(
        Object.entries(this.nts).filter(([key, value]) => {
          return value.match(text) || key.match(text) // key:英文名稱，value:中文名稱
        }),
      )
      this.filteredMyAddedNts = Object.fromEntries(
        Object.entries(this.myAddedNts).filter(([key, value]) => {
          return key.match(text) || value.match(text)
        }),
      )
    },
    showModal(customizeData) {
      if (customizeData) {
        this.showCustomizeDataClaimNts(customizeData)
      }
      this.modal.show()
    },
    update() {
      this.addNts(this.localBaseClaimNts, this.localNewClaimNts)
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
      this.addNt()
    },
    addNt() {
      const data = {
        type: this.type,
        enName: this.enName,
        chName: this.chName,
        unit: this.unit,
        quantity: '',
      }
      this.localNewClaimNts.push(this.enName) // 為了立即顯示在Modal已新增營養素畫面中
      this.localMyAddedNtsList.push(data) // 加入剛新增的項目到 myAddedNts 中，再將全部的 myAddedNts setItem 到 localStorage 中
      localStorage.setItem(
        'myAddedNts',
        JSON.stringify(this.localMyAddedNtsList),
      )
      this.getMyAddedNts() // 呼叫重新取得全部 myAddedNts，為了可以立即顯示在選項中
      this.type = '以上皆非'
      this.enName = ''
      this.chName = ''
      this.unit = '公克(g)'
      this.searchText = '' // 清空搜尋欄位
      this.filteredNts = this.nts // 恢復內建資料庫所有選項在畫面中
    },
    getMyAddedNts() {
      const data = JSON.parse(localStorage.getItem('myAddedNts')) || []
      this.localMyAddedNtsList = data // 將已新增的先存在 myAddedNtsList
      // 以下 將已新增的營養素英文名設定為 key，中文名設定為 value，與內建營養素呈現方式一致
      let ntName = {}
      data.forEach(item => {
        ntName[item.enName] =
          item.chName + '(' + item.unit.match(/\((.*?)\)/)[1] + ')'
      })
      this.myAddedNts = ntName
      this.filteredMyAddedNts = ntName
    },
    openDoubleCheckModal(value, key, index) {
      this.$refs.doubleCheckModal.showDelNtModal(value, key, index)
    },
    used(itemEnName) {
      let result = false
      this.customizeDataList.forEach(item => {
        if (item.newClaimNts) {
          item.newClaimNts.some(Nt => {
            if (Nt.enName === itemEnName) {
              result = true
            }
          })
        }
      })
      return result
    },
    alreadlyHaveEnName(e) {
      const text = e.target.value
      this.localMyAddedNtsList.forEach(item => {
        if (item.enName === text) {
          this.openAlert(true, '『 ' + text + ' 』' + '已存在！')
          this.enName = ''
        }
      })
      Object.keys(this.headerChineseAndEnglish).forEach(item => {
        // 去除括號，取得括號前方的文字 ： item.replace(/\(.*\)/, '')
        if (item.replace(/\(.*\)/, '') === text) {
          this.openAlert(true, '『 ' + text + ' 』' + '已存在內建資料庫！')
          this.enName = ''
        }
      })
    },
    alreadlyHaveChName(e) {
      const text = e.target.value
      this.localMyAddedNtsList.forEach(item => {
        if (item.chName === text) {
          this.openAlert(true, '『 ' + text + ' 』' + '已存在！')
          this.chName = ''
        }
      })
      Object.values(this.headerChineseAndEnglish).forEach(item => {
        // 去除括號，取得括號前方的文字 ： item.replace(/\(.*\)/, '')
        if (item.replace(/\(.*\)/, '') === text) {
          this.openAlert(true, '『 ' + text + ' 』' + '已存在內建資料庫！')
          this.chName = ''
        }
      })
    },
  },
  created() {
    this.updateOptionData()
  },
  mounted() {
    this.modal = new Modal(this.$refs.nutrientsModal)
  },
}
</script>

<style lang="scss" scoped>
.addedNts {
  height: 40px;
  overflow-y: scroll;
}

* {
  // border: 1px solid;
}
</style>
