<template>
  <main class="mx-auto mb-5 col-11 pb-5 mb-5">
    <header class="">
      <h3 class="text-center my-4">外包裝資訊標示</h3>
    </header>
    <form @submit.prevent="submitForm" class="needs-validation" novalidate>
      <div class="bg-light rounded row m-0 g-5 pb-5 mb-4">
        <section class="col-xl-4">
          <label for="manufacturer" class="form-label fw-bold ps-1 d-flex">
            <div class="pe-1 d-flex align-items-center">
              <i class="text-danger fst-normal">＊</i>
            </div>
            製造廠商名稱
          </label>
          <input
            v-model.trim="product.manufacturer"
            type="text"
            class="form-control"
            id="manufacturer"
            placeholder="輸入製造商名稱"
            required
          />
          <div class="invalid-feedback">此欄位為必填</div>
        </section>
        <section class="col-xl-4">
          <label
            for="manufacturer_address"
            class="form-label fw-bold ps-1 d-flex"
          >
            <div class="pe-1 d-flex align-items-center">
              <i class="text-danger fst-normal">＊</i>
            </div>
            製造廠商地址
          </label>
          <input
            v-model.trim="product.manufacturerAddress"
            type="text"
            class="form-control"
            id="manufacturer_address"
            placeholder="輸入製造廠商地址"
            required
          />
          <div class="invalid-feedback">此欄位為必填</div>
        </section>
        <section class="col-xl-4">
          <label
            for="manufacturer_phone"
            class="form-label fw-bold ps-1 d-flex"
          >
            <div class="pe-1 d-flex align-items-center">
              <i class="text-danger fst-normal">＊</i>
            </div>
            製造廠商電話
          </label>
          <input
            v-model.trim="product.manufacturerPhone"
            type="tel"
            class="form-control"
            id="manufacturer_phone"
            placeholder="輸入製造廠商電話"
            required
          />
          <div class="invalid-feedback">此欄位為必填</div>
        </section>
        <section class="col-xl-4">
          <label for="country_of_origin" class="form-label fw-bold ps-1 d-flex">
            <div class="pe-1 d-flex align-items-center">
              <i class="text-danger fst-normal">＊</i>
            </div>
            原產地
          </label>
          <input
            v-model.trim="product.origin"
            type="text"
            class="form-control"
            id="country_of_origin"
            placeholder="輸入原產地"
            required
          />
          <div class="invalid-feedback">此欄位為必填</div>
        </section>
        <section class="col-xl-4 d-flex flex-wrap">
          <div class="col-12">
            <label
              for="net_weight"
              class="form-label fw-bold ps-1 d-flex flex-wrap justify-content-start col-12"
            >
              <div class="pe-1 d-flex align-items-center">
                <i class="text-danger fst-normal">＊</i>
              </div>
              淨重
              <div
                class="infoStyle px-3 text-secondary d-flex align-items-center"
              >
                <span class="fw-normal">
                  <i class="bi bi-info-circle"></i>
                  將會顯示在外包裝上，淨重的位置
                </span>
              </div>
            </label>

            <div class="col-12 d-flex flex-wrap justify-content-between">
              <div class="col-12 col-sm">
                <input
                  v-model="product.netWeightInformation.netWeight"
                  type="number"
                  min="1"
                  class="form-control me-3"
                  id="net_weight"
                  placeholder="輸入克數或毫升數"
                  required
                />
                <div class="invalid-feedback">此欄位為必填，且需大於等於 1</div>
              </div>
              <div class="mt-2 ms-2 text-xl-center">
                <div class="form-check form-check-inline">
                  <input
                    v-model="product.netWeightInformation.unit"
                    class="form-check-input"
                    type="radio"
                    id="gram"
                    value="公克"
                  />
                  <label class="form-check-label" for="gram">公克</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    v-model="product.netWeightInformation.unit"
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
        <section class="col-xl-4">
          <span class="fw-bold ps-1 mb-2 d-flex">
            <div class="pe-1 d-flex align-items-center">
              <i class="text-danger fst-normal">＊</i>
            </div>
            有效期限資訊（ 擇一標示 ）
          </span>
          <div class="form-check mb-2">
            <input
              v-model="product.validDaysInformation.validDaysStatus"
              class="form-check-input"
              type="radio"
              id="vali_days_on_outer_packaging"
              value="標示於外包裝"
              required
            />
            <div class="invalid-feedback">此欄位為必填</div>
            <label class="form-check-label" for="vali_days_on_outer_packaging">
              以『 標示於外包裝 』標示
            </label>
          </div>
          <div class="form-check mb-2">
            <input
              v-model="product.validDaysInformation.validDaysStatus"
              class="form-check-input"
              type="radio"
              id="days"
              value="number"
              required
            />
            <label class="form-check-label" for="days"> 以下方日期標示 </label>
          </div>
          <label for="valid_days" class="form-label fw-bold ps-1 d-flex">
            輸入有效天數（ 數字 ）
          </label>
          <input
            v-model="product.validDaysInformation.validDays"
            :disabled="
              product.validDaysInformation.validDaysStatus === '標示於外包裝'
            "
            type="number"
            min="1"
            class="form-control"
            id="valid_days"
            placeholder="輸入有效天數"
            required
          />
          <div class="invalid-feedback">此欄位為必填，且需大於等於 1</div>
        </section>
        <section class="col-xl-4">
          <span class="fw-bold ps-1 mb-2 d-flex">
            <div class="pe-1 d-flex align-items-center">
              <i class="text-danger fst-normal">＊</i>
            </div>
            有效日期資訊（ 擇一標示 ）
          </span>
          <div class="form-check mb-2">
            <input
              v-model="product.validDateInformation.validDateStatus"
              class="form-check-input"
              type="radio"
              id="marked_on_outer_packaging"
              value="標示於外包裝"
              required
            />
            <label class="form-check-label" for="marked_on_outer_packaging">
              以『 標示於外包裝 』標示
            </label>
          </div>
          <div class="form-check mb-2">
            <input
              v-model="product.validDateInformation.validDateStatus"
              class="form-check-input"
              type="radio"
              id="choose_date"
              value="date"
              required
            />
            <label class="form-check-label" for="choose_date">
              以下方日期標示
            </label>
          </div>
          <label for="valid_date" class="form-label fw-bold ps-1 d-flex">
            選擇有效日期
          </label>
          <input
            v-model="product.validDateInformation.validDate"
            :disabled="
              product.validDateInformation.validDateStatus === '標示於外包裝'
            "
            type="date"
            class="form-control"
            id="valid_date"
            required
          />
          <div class="invalid-feedback">此欄位為必填</div>
        </section>
        <section class="col-xl-4">
          <span class="fw-bold ps-1 mb-2 d-flex">
            <div class="pe-1 d-flex align-items-center">
              <i class="text-danger fst-normal">＊</i>
            </div>
            基因改造食品資訊
          </span>

          <div class="form-check">
            <input
              v-model="product.geneticallyModified.GMFStatus"
              class="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios1"
              value="本產品不含有基因改造食品"
              required
            />
            <label class="form-check-label" for="exampleRadios1">
              本產品不含有基因改造食品
            </label>
          </div>
          <div class="form-check mb-2">
            <input
              v-model="product.geneticallyModified.GMFStatus"
              class="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios2"
              value="yes"
              required
            />
            <label class="form-check-label" for="exampleRadios2">
              本產品含有基因改造食品
            </label>
          </div>
          <p class="fw-bold mb-2">
            含有以下哪些：目前全球核准的基因改造作物種類（ 複選 ）
          </p>
          <div
            v-for="(item, index) in GMFOptions"
            :key="item"
            class="form-check mb-2"
          >
            <input
              v-model="product.geneticallyModified.GMFs"
              :disabled="
                product.geneticallyModified.GMFStatus ===
                '本產品不含有基因改造食品'
              "
              class="form-check-input"
              type="checkbox"
              :id="'GMF' + index"
              :value="item"
              :required="
                product.geneticallyModified.GMFStatus === 'yes' &&
                product.geneticallyModified.GMFs.length === 0
              "
            />
            <label class="form-check-label" :for="'GMF' + index">
              {{ item }}
            </label>
          </div>
        </section>
        <section class="col-xl-4">
          <span class="fw-bold ps-1 mb-2 d-flex">
            <div class="pe-1 d-flex align-items-center">
              <i class="text-danger fst-normal">＊</i>
            </div>
            過敏原資訊：請選擇是否含有過敏原
          </span>
          <div class="form-check">
            <input
              v-model="product.allergenInformation.allergenStatus"
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="allergen_free"
              value="no"
              required
            />
            <label class="form-check-label" for="allergen_free"> 無 </label>
          </div>
          <div class="form-check mb-2">
            <input
              v-model="product.allergenInformation.allergenStatus"
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="allergens_present"
              value="yes"
              required
            />
            <label class="form-check-label" for="allergens_present"> 有 </label>
          </div>
          <p class="fw-bold mb-2">含有以下哪些過敏原（ 複選 ）</p>
          <div
            v-for="(item, index) in allergenOptions"
            :key="item"
            class="form-check mb-2"
          >
            <input
              v-model="product.allergenInformation.allergens"
              :disabled="product.allergenInformation.allergenStatus === 'no'"
              class="form-check-input"
              type="checkbox"
              name="exampleRadios"
              :id="'allergen' + index"
              :value="item"
              :required="
                product.allergenInformation.allergenStatus === 'yes' &&
                product.allergenInformation.allergens.length === 0
              "
            />
            <label class="form-check-label" :for="'allergen' + index">
              {{ item }}
            </label>
          </div>
        </section>
      </div>
      <div class="col-12 text-end">
        <button
          :disabled="loadingStatus"
          class="col-12 col-xl-2 btn btn-primary"
          id="submit"
          type="submit"
        >
          <span v-if="!loadingStatus">送出表單</span>
          <span
            v-else
            class="spinner-border spinner-border-sm"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </form>
    <DoubleCheckModal ref="doubleCheckModal" />
  </main>
</template>

<script>
import { useFoodStore } from '@/stores/foodDataStore.js'
import { mapState, mapActions } from 'pinia'
import DoubleCheckModal from '@/components/DoubleCheckModal.vue'
import { useMsgStore } from '@/stores/messageStore'
export default {
  data() {
    return {
      GMFOptions: [
        '玉米',
        '黃豆',
        '棉花',
        '油菜',
        '甜菜',
        '苜蓿',
        '蘋果',
        '茄子',
        '亞麻',
        '木瓜',
        '鳳梨',
        '馬鈴薯',
        '水稻',
        '南瓜',
        '甘蔗',
        '小麥',
      ],
      allergenOptions: [
        '甲殼類及其製品',
        '芒果類及其製品',
        '花生類及其製品',
        '牛奶、羊奶及其製品。但由牛奶、羊奶取得之乳糖醇，不在此限',
        '蛋及其製品',
        '堅果類及其製品',
        '芝麻及其製品',
        '含麩質之穀物及其製品。但由穀類製得之葡萄糖漿、麥芽糊精及酒類，不在此限',
        '大豆及其製品。但由大豆製得之高度提煉或純化取得之大豆油（脂）、混合形式之生育醇及其衍生物、植物固醇、植物固醇酯，不在此限',
        '魚類及其製品。但由魚類取得之明膠，並作為製備維生素或類胡蘿蔔素製劑之載體或酒類之澄清用途者，不在此限',
        '使用亞硫酸鹽類等，其終產品以二氧化硫殘留量計每公斤十毫克以上之製品',
      ],
      validItemsInput: '',
    }
  },
  components: { DoubleCheckModal },
  watch: {
    'product.validDaysInformation.validDaysStatus'(status) {
      if (status === '標示於外包裝') {
        this.product.validDaysInformation.validDays = this.validItemsInput
      }
    },
    'product.validDateInformation.validDateStatus'(status) {
      if (status === '標示於外包裝') {
        this.product.validDateInformation.validDate = this.validItemsInput
      }
    },
  },
  computed: {
    ...mapState(useFoodStore, ['product', 'myProductList', 'loadingStatus']),
  },
  methods: {
    ...mapActions(useFoodStore, ['setMyProducts', 'clearInput']),
    ...mapActions(useMsgStore, ['openAlert']),
    submitForm(e) {
      const form = e.target
      if (!form.checkValidity()) {
        // 若表單無效，添加樣式提示
        form.classList.add('was-validated')
        this.openAlert(true, '還有必填欄位喔！')
        return
      } else {
        this.$refs.doubleCheckModal.showModal()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.infoStyle {
  font-size: 14px;
}
</style>
