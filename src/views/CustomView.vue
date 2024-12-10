<template>
  <div class="container col-lg-9 mt-4">
    <h3 class="text-center py-3">新增自訂義食材</h3>
    <form
      @submit.prevent="submitForm"
      class="row m-0 justify-content-between"
      novalidate
    >
      <div class="py-3 col-12 col-lg">
        <div class="form-floating mb-3">
          <input
            v-model.trim="customFood.sample_name"
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
            v-model.trim="customFood.content_description"
            type="text"
            class="form-control"
            id="content_description"
            placeholder="成分 （ 填入相同於包裝上顯示的成分 ）"
            required
          />
          <div class="invalid-feedback">此欄位為必填</div>
          <label for="content_description" class="text-wrap">
            <i class="text-danger fst-normal">＊</i>
            成分 （ 填入相同於包裝上的成分，順序也必須相同 ）
          </label>
        </div>
      </div>

      <div class="py-3 col-12 col-lg-auto mb-5">
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
                <input
                  v-model="customFood[key]"
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

            <tr v-for="(item, index) in baseClaimNts" :key="item + index">
              <th class="fw-normal px-3">
                <i class="text-danger fst-normal">＊</i>
                {{ header[item] }}
              </th>
              <td>
                <input
                  v-model="customFood[item]"
                  type="number"
                  :name="item"
                  :id="item + index"
                  class="form-control text-center"
                  required
                  min="0"
                  step="0.01"
                />
              </td>
            </tr>

            <tr v-for="(item, index) in newClaimNts" :key="item + index">
              <th class="fw-normal px-3">
                <i class="text-danger fst-normal">＊</i>
                {{ item.chName }}
              </th>
              <td>
                <input
                  v-model="customFood.newClaimNts[index].quantity"
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
      <div class="text-end py-4">
        <button type="submit" class="col-12 col-lg-auto btn btn-primary">
          送出資料
        </button>
      </div>
    </form>
    <CustomizeClaimNtsModal ref="customizeClaimNtsModal" />
    <DoubleCheckModal ref="doubleCheckModal" />
  </div>
</template>

<script>
import { useFoodStore } from '@/stores/foodDataStore.js'
import { useCustomStore } from '@/stores/customStore.js'
import { useMsgStore } from '@/stores/messageStore'
import { mapState, mapActions } from 'pinia'
import CustomizeClaimNtsModal from '@/components/CustomizeClaimNtsModal.vue'
import DoubleCheckModal from '@/components/DoubleCheckModal.vue'
export default {
  data() {
    return {
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
  },
  computed: {
    ...mapState(useFoodStore, [
      'headerChineseAndEnglish',
      'myProductList',
      'baseFoodData',
    ]),
    ...mapState(useCustomStore, [
      'customDataList',
      'newClaimNts',
      'customFood',
      'baseClaimNts',
    ]),
  },
  methods: {
    ...mapActions(useCustomStore, ['setCustomData']),
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
      } else {
        this.$refs.doubleCheckModal.showModal('custom')
      }
    },
    openModal() {
      this.$refs.customizeClaimNtsModal.showModal(this.customFood)
    },
  },

  created() {
    this.getHeader()
  },
}
</script>
<style lang="scss" scoped>
* {
  // border: 1px solid;
}
</style>
