<template>
  <main class="mx-auto col-11 col-lg-10 pb-5 mb-5">
    <header class="mb-3 text-end">
      <h3 class="text-center">產品列表</h3>
      <router-link
        v-if="myProductList.length > 0"
        to="/nutrition_label"
        class="btn btn-primary"
      >
        新增營養標示
      </router-link>
    </header>
    <section
      v-if="myProductList.length === 0"
      class="mx-auto py-5 col-12 w-100 text-center"
    >
      <i class="bi bi-columns-gap text-secondary"></i>
      <p class="text-center fw-bold fs-5 text-primary">
        {{ noResultText }}
      </p>

      <router-link to="/nutrition_label" class="btn btn-primary">
        試著新增一個吧！
      </router-link>
    </section>
    <section
      v-for="(item, index) in myProductList"
      :key="item.id"
      class="bg-light border rounded row m-0 mb-4"
    >
      <section
        :id="`text${item.id}`"
        class="p-3 col-12 col-xl markItemsContainer"
      >
        <div class="d-flex">
          <p class="markItemsTitle">品名</p>
          <i class="fst-normal">：</i>
          <p class="col">{{ item.title }}</p>
        </div>
        <!-- 成分 -->
        <div class="d-flex">
          <p class="markItemsTitle">成分</p>
          <i class="fst-normal">：</i>
          <p class="col">
            {{ sorted(item.ingredients) }}
          </p>
        </div>
        <!-- 基因改造食品 -->
        <div v-if="item.geneticallyModified.GMFStatus === 'yes'" class="d-flex">
          <p class="markItemsTitle">基因改造食品</p>
          <i class="fst-normal">：</i>
          <p class="col">
            {{ item.geneticallyModified.GMFs.join('、') }}
          </p>
        </div>
        <!-- 過敏原資訊 -->
        <div
          v-if="item.allergenInformation.allergenStatus === 'yes'"
          class="d-flex"
        >
          <p class="markItemsTitle">過敏原資訊</p>
          <i class="fst-normal">：</i>
          <p class="col">
            本產品含有{{
              transAllergenText(item.allergenInformation.allergens)
            }}及其製品
          </p>
        </div>
        <!-- 淨重 -->
        <div class="d-flex">
          <p class="markItemsTitle">淨重</p>
          <i class="fst-normal">：</i>
          <p class="col">
            {{ item.netWeightInformation.netWeight }}
            {{ item.netWeightInformation.unit }}
          </p>
        </div>
        <!-- 保存天數 -->
        <div class="d-flex">
          <p class="markItemsTitle">保存期限</p>
          <i class="fst-normal">：</i>

          <p v-if="item.validDaysInformation.validDays" class="col">
            {{ item.validDaysInformation.validDays }} 天
          </p>
          <p v-else class="col">
            {{ item.validDaysInformation.validDaysStatus }}
          </p>
        </div>
        <!-- 有效日期 -->
        <div class="d-flex">
          <p class="markItemsTitle">有效日期</p>
          <i class="fst-normal">：</i>
          <p v-if="item.validDateInformation.validDate" class="col">
            {{ item.validDateInformation.validDate }} (西元年/月/日)
          </p>
          <p v-else class="col">
            {{ item.validDateInformation.validDateStatus }}
          </p>
        </div>
        <!-- 原產地 -->
        <div class="d-flex">
          <p class="markItemsTitle">原產地</p>
          <i class="fst-normal">：</i>
          <p class="col">{{ item.origin }}</p>
        </div>
        <!-- 廠商相關 -->
        <div class="d-flex">
          <p class="markItemsTitle">廠商名稱</p>
          <i class="fst-normal">：</i>
          <p class="col">{{ item.manufacturer }}</p>
        </div>
        <div class="d-flex">
          <p class="markItemsTitle">廠商地址</p>
          <i class="fst-normal">：</i>
          <p class="col">{{ item.manufacturerAddress }}</p>
        </div>
        <div class="d-flex">
          <p class="markItemsTitle">廠商電話</p>
          <i class="fst-normal">：</i>
          <p class="col">{{ item.manufacturerPhone }}</p>
        </div>
      </section>
      <section
        :id="`nutritionLabel${item.id}`"
        class="col-12 col-sm-9 col-md-7 col-lg-5 col-xl-5 col-xxl-4 p-3"
      >
        <table
          class="table table-sm table-borderless border border-2 border-black mb-0"
        >
          <thead>
            <tr class="lh-sm">
              <th
                colspan="3"
                class="text-center fw-normal border-bottom border-black"
              >
                營養標示
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="fw-normal ps-2 lh-sm">每一份量</th>
              <td colspan="2" class="lh-sm align-middle">
                {{ item.perPortionInfomation.perWeight }}
                {{ item.perPortionInfomation.unit }}
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2 border-bottom border-black pb-2">
                本包裝含
              </th>
              <td colspan="2" class="border-bottom border-black align-middle">
                {{ item.productQty }} 份
              </td>
            </tr>
            <tr class="lh-sm">
              <th class="border-bottom border-black"></th>
              <td class="text-end pe-2 border-bottom border-black align-middle">
                每份
              </td>
              <td class="text-end pe-2 border-bottom border-black align-middle">
                每 100 {{ item.perPortionInfomation.unit }}
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">熱量</th>
              <td class="text-end pe-2 align-middle">
                {{ calculateCalories(item) }} 大卡
              </td>
              <td class="text-end pe-2 align-middle">
                {{ calculatePer100gCalories(item) }} 大卡
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">蛋白質</th>
              <td class="text-end pe-2 align-middle">
                {{ calculateNutrients(item, 'protein') }} 公克
              </td>
              <td class="text-end pe-2 align-middle">
                {{ calculatePer100g(item, 'protein') }} 公克
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">脂肪</th>
              <td class="text-end pe-2 align-middle">
                {{ calculateNutrients(item, 'fat') }} 公克
              </td>
              <td class="text-end pe-2 align-middle">
                {{ calculatePer100g(item, 'fat') }} 公克
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-4">飽和脂肪</th>
              <td class="text-end pe-2 align-middle">
                {{ calculateNutrients(item, 'saturated_fat') }} 公克
              </td>
              <td class="text-end pe-2 align-middle">
                {{ calculatePer100g(item, 'saturated_fat') }} 公克
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-4">反式脂肪</th>
              <td class="text-end pe-2 align-middle">
                {{
                  (calculateNutrients(item, 'trans_fat') / 1000).toFixed(1) ==
                  '0.0'
                    ? '0'
                    : (calculateNutrients(item, 'trans_fat') / 1000).toFixed(1)
                }}
                公克
              </td>
              <td class="text-end pe-2 align-middle">
                {{
                  (calculatePer100g(item, 'trans_fat') / 1000).toFixed(1) ==
                  '0.0'
                    ? '0'
                    : (calculatePer100g(item, 'trans_fat') / 1000).toFixed(1)
                }}
                公克
              </td>
            </tr>
            <!-- 單元、多元不飽和脂肪酸 及 P/M/S 放在脂肪區塊中 -->
            <tr v-for="nutrient in item.claimNts" :key="nutrient" class="lh-1">
              <th
                v-if="
                  nutrient === 'monounsaturated_fatty_acid(MUFA)' ||
                  nutrient === 'polyunsaturated_fatty_acid(PUFA)'
                "
                class="fw-normal ps-4"
              >
                {{ headerChineseAndEnglish[nutrient].replace(/\(.*\)/, '') }}
              </th>
              <td
                v-if="
                  nutrient === 'monounsaturated_fatty_acid(MUFA)' ||
                  nutrient === 'polyunsaturated_fatty_acid(PUFA)'
                "
                class="text-end pe-2 align-middle"
              >
                {{ (calculateNutrients(item, nutrient) / 1000).toFixed(1) }}
                公克
              </td>
              <td
                v-if="
                  nutrient === 'monounsaturated_fatty_acid(MUFA)' ||
                  nutrient === 'polyunsaturated_fatty_acid(PUFA)'
                "
                class="text-end pe-2 align-middle"
              >
                {{ (calculatePer100g(item, nutrient) / 1000).toFixed(1) }}
                公克
              </td>
            </tr>
            <tr v-for="nutrient in item.claimNts" :key="nutrient" class="lh-1">
              <th v-if="nutrient === 'P/M/S'" class="fw-normal ps-4">
                多元不飽和脂肪酸 /<br />單元不飽和脂肪酸 /<br />飽和脂肪酸
              </th>
              <td
                v-if="nutrient === 'P/M/S'"
                class="text-end pe-2 align-middle"
              >
                {{ calculatePMS(item) }}
              </td>
              <td
                v-if="nutrient === 'P/M/S'"
                class="text-end pe-2 align-middle"
              >
                {{ calculatePMS(item) }}
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">碳水化合物</th>
              <td class="text-end pe-2 align-middle">
                {{ calculateNutrients(item, 'total_carbohydrates') }} 公克
              </td>
              <td class="text-end pe-2 align-middle">
                {{ calculatePer100g(item, 'total_carbohydrates') }} 公克
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-4">糖</th>
              <td class="text-end pe-2 align-middle">
                {{ calculateNutrients(item, 'total_sugar') }} 公克
              </td>
              <td class="text-end pe-2 align-middle">
                {{ calculatePer100g(item, 'total_sugar') }} 公克
              </td>
            </tr>
            <!-- 膳食纖維 位置改放置於 碳水化合物 下方區塊 並內縮一個字元位置 -->
            <tr v-for="nutrient in item.claimNts" :key="nutrient" class="lh-1">
              <th v-if="nutrient === 'dietary_fiber'" class="fw-normal ps-4">
                {{ headerChineseAndEnglish[nutrient].replace(/\(.*\)/, '') }}
              </th>
              <td
                v-if="nutrient === 'dietary_fiber'"
                class="text-end pe-2 align-middle"
              >
                {{ calculateNutrients(item, nutrient) }}
                {{ transUnitText(headerChineseAndEnglish[nutrient]) }}
              </td>
              <td
                v-if="nutrient === 'dietary_fiber'"
                class="text-end pe-2 align-middle"
              >
                {{ calculatePer100g(item, nutrient) }}
                {{ transUnitText(headerChineseAndEnglish[nutrient]) }}
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">鈉</th>
              <td class="text-end pe-2 align-middle">
                {{ calculateNutrients(item, 'sodium') }} 毫克
              </td>
              <td class="text-end pe-2 align-middle">
                {{ calculatePer100g(item, 'sodium') }} 毫克
              </td>
            </tr>
            <!-- 酒精 、 膳食纖維、 單元 及 多元不飽和脂肪酸 不放在此區塊中 -->
            <tr v-for="nutrient in item.claimNts" :key="nutrient" class="lh-1">
              <th
                v-if="
                  nutrient !== 'alcohol' &&
                  nutrient !== 'dietary_fiber' &&
                  nutrient !== 'monounsaturated_fatty_acid(MUFA)' &&
                  nutrient !== 'polyunsaturated_fatty_acid(PUFA)' &&
                  nutrient !== 'P/M/S'
                "
                class="fw-normal ps-2"
              >
                {{ headerChineseAndEnglish[nutrient].replace(/\(.*\)/, '') }}
              </th>
              <td
                v-if="
                  nutrient !== 'alcohol' &&
                  nutrient !== 'dietary_fiber' &&
                  nutrient !== 'monounsaturated_fatty_acid(MUFA)' &&
                  nutrient !== 'polyunsaturated_fatty_acid(PUFA)' &&
                  nutrient !== 'P/M/S'
                "
                class="text-end pe-2 align-middle"
              >
                {{ calculateNutrients(item, nutrient) }}
                {{ transUnitText(headerChineseAndEnglish[nutrient]) }}
              </td>
              <td
                v-if="
                  nutrient !== 'alcohol' &&
                  nutrient !== 'dietary_fiber' &&
                  nutrient !== 'monounsaturated_fatty_acid(MUFA)' &&
                  nutrient !== 'polyunsaturated_fatty_acid(PUFA)' &&
                  nutrient !== 'P/M/S'
                "
                class="text-end pe-2 align-middle"
              >
                {{ calculatePer100g(item, nutrient) }}
                {{ transUnitText(headerChineseAndEnglish[nutrient]) }}
              </td>
            </tr>
            <tr
              v-for="nutrient in item.newClaimNts"
              :key="nutrient"
              class="lh-1"
            >
              <th v-if="!organicAcid.includes(nutrient)" class="fw-normal ps-2">
                {{ myAddedNts[nutrient].replace(/\(.*\)/, '') }}
              </th>
              <td
                v-if="!organicAcid.includes(nutrient)"
                class="text-end pe-2 align-middle"
              >
                {{ calculateNutrients(item, nutrient) }}
                {{ transUnitText(myAddedNts[nutrient]) }}
              </td>
              <td
                v-if="!organicAcid.includes(nutrient)"
                class="text-end pe-2 align-middle"
              >
                {{ calculatePer100g(item, nutrient) }}
                {{ transUnitText(myAddedNts[nutrient]) }}
              </td>
            </tr>
          </tbody>
        </table>
        <section>
          <table
            v-if="isOtherIngredients(item)"
            class="table table-sm table-borderless border border-2 border-black mt-1 mb-0"
          >
            <thead>
              <tr class="lh-sm">
                <th
                  class="ps-2 fw-normal border-bottom border-black align-middle"
                >
                  其他成分
                </th>
                <td
                  class="pR text-end border-bottom border-black col-4 align-middle"
                >
                  每份
                </td>
                <td
                  class="text-end pe-2 border-bottom border-black col-4 align-middle"
                >
                  每 100 公克
                </td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="nutrient in item.claimNts"
                :key="nutrient"
                class="lh-1"
              >
                <th v-if="nutrient === 'alcohol'" class="fw-normal ps-2">
                  酒精
                </th>
                <td
                  v-if="nutrient === 'alcohol'"
                  class="pR text-end align-middle"
                >
                  {{ calculateNutrients(item, nutrient) }} 公克
                </td>
                <td
                  v-if="nutrient === 'alcohol'"
                  class="text-end pe-2 align-middle"
                >
                  {{ calculatePer100g(item, nutrient) }} 公克
                </td>
              </tr>
              <tr
                v-for="nutrient in item.newClaimNts"
                :key="nutrient"
                class="lh-1"
              >
                <th
                  v-if="organicAcid.includes(nutrient)"
                  class="fw-normal ps-2"
                >
                  {{ myAddedNts[nutrient].replace(/\(.*\)/, '') }}
                </th>
                <td v-if="organicAcid.includes(nutrient)" class="text-end pe-2">
                  {{ calculateNutrients(item, nutrient) }}
                  {{ transUnitText(myAddedNts[nutrient]) }}
                </td>
                <td v-if="organicAcid.includes(nutrient)" class="text-end pe-2">
                  {{ calculatePer100g(item, nutrient) }}
                  {{ transUnitText(myAddedNts[nutrient]) }}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>

      <div class="text-end pe-4">
        <button
          @click="copy(item.id)"
          type="button"
          class="btn btn-primary me-3"
        >
          複製包裝文字
        </button>
        <button
          @click="download(item.id, item.title)"
          type="button"
          class="btn btn-primary me-3"
        >
          下載營養標示
        </button>
        <button
          @click="openModal(item)"
          type="button"
          class="btn btn-outline-primary my-3 me-3"
        >
          增減標示營養素
        </button>
        <router-link
          :to="isPath(item.id)"
          @click="edit(item)"
          type="button"
          class="btn btn-outline-primary me-3"
        >
          編輯
        </router-link>
        <button
          @click="openDoubleCheckModal(item, index)"
          type="button"
          class="btn btn-outline-danger"
        >
          刪除
        </button>
      </div>

      <div
        v-if="
          item.claimNts?.includes('dietary_fiber') ||
          item.claimNts?.includes('Erythritol') ||
          isOtherSugarAlcohols(item) ||
          isNewAddedSA(item.newClaimNts) ||
          isOrganicAcid(item) ||
          item.claimNts?.includes('alcohol')
        "
      >
        <hr class="mt-0 mb-2" />
        <p class="mb-1">
          備註：依據
          <a
            class="fw-bold text-decoration-none"
            href="https://www.foodlabel.org.tw/FdaFrontEndApp/Law/Edit?SystemId=f27b8c5e-35c2-4a86-9b8b-d7cbbef409ab&clPublishStatus=undefined"
            target="_blank"
            rel="noopener noreferrer"
          >
            包裝食品營養標示應遵行事項
          </a>
          第一章 之 第十一條：包裝食品營養標示之熱量計算方式：
        </p>
        <ol class="ps-4">
          <li v-if="item.claimNts?.includes('dietary_fiber')">
            碳水化合物之熱量，以每公克 4
            大卡計算，但加以標示膳食纖維者，其膳食纖維熱量得以每公克 2
            大卡計算。
          </li>
          <li v-if="item.claimNts?.includes('Erythritol')">
            赤藻糖醇之熱量得以 零 大卡計算。
          </li>
          <li
            v-if="isOtherSugarAlcohols(item) || isNewAddedSA(item.newClaimNts)"
          >
            除了赤藻糖醇得以 零 大卡計算以外，其他糖醇之熱量得以每公克 2.4
            大卡計算。
          </li>
          <li v-if="isOrganicAcid(item)">
            有機酸之熱量得以每公克 3
            大卡計算。有機酸含量應於營養標示格式外明顯處註明。
          </li>
          <li v-if="item.claimNts?.includes('alcohol')">
            酒精 ( 乙醇 ) 之熱量得以每公克 7 大卡計算。酒精 ( 乙醇 )
            含量應於營養標示格式外明顯處註明。
          </li>
        </ol>
      </div>
    </section>
    <ProductClaimNtsModal ref="productClaimNtsModal" />
    <DoubleCheckModal ref="doubleCheckModal" />
  </main>
</template>

<script>
import { useFoodStore } from '@/stores/foodDataStore.js'
import { mapState, mapActions } from 'pinia'
import ProductClaimNtsModal from '@/components/ProductClaimNtsModal.vue'
import DoubleCheckModal from '@/components/DoubleCheckModal.vue'
import html2canvas from 'html2canvas'
import { useMsgStore } from '@/stores/messageStore'
import { useCustomizeStore } from '@/stores/customizeStore'
export default {
  data() {
    return {
      claimNts: [],
      productList: [],
      myAddedNts: [],
      newFiber: [],
      sugarAlcohols: [
        // 內建資料庫已存在的糖醇名稱
        'Xylitol', // 木糖醇
        'Sorbitol', // 山梨醇
        'Maltitol', // 麥芽糖醇
        'Lactitol', // 乳糖醇
        'Mannitol', // 甘露醇
      ],
      organicAcid: [],
    }
  },
  components: { ProductClaimNtsModal, DoubleCheckModal },
  computed: {
    ...mapState(useFoodStore, [
      'myProductList',
      'filteredMyProductList',
      'headerChineseAndEnglish',
    ]),
    ...mapState(useCustomizeStore, ['myAddedNtsList']),
    noResultText() {
      if (
        this.myProductList.length === 0 &&
        this.filteredMyProductList.length === 0
      ) {
        return '目前無製作的營養標示～'
      }
      if (
        this.myProductList.length === 0 &&
        this.filteredMyProductList.length > 0
      ) {
        return '搜尋結果：無符合的營養標示～'
      } else {
        return ''
      }
    },
  },
  methods: {
    ...mapActions(useFoodStore, ['setMyProducts', 'edit']),
    ...mapActions(useMsgStore, ['pushMsg']),
    isPath(id) {
      return (this.$route.path = `/edit_nutrition_label/${id}`)
    },
    openModal(item) {
      this.$refs.productClaimNtsModal.showModal(item)
    },
    sorted(ingredients) {
      return ingredients
        .sort((a, b) => b.grams - a.grams)
        .map(itemName => `${itemName.foodName}`)
        .join('、')
    },
    calculatePMS(item) {
      const PUFA =
        parseFloat(
          this.calculatePer100g(item, 'polyunsaturated_fatty_acid(PUFA)'),
        ) / 1000
      const MUFA =
        parseFloat(
          this.calculatePer100g(item, 'monounsaturated_fatty_acid(MUFA)'),
        ) / 1000
      const SFA =
        parseFloat(this.calculatePer100g(item, 'total_fatty_acid-S')) / 1000
      const minFA = Math.min(PUFA, MUFA, SFA)
      const PUFARatio = (PUFA / minFA).toFixed(1)
      const MUFARatio = (MUFA / minFA).toFixed(1)
      const SFARatio = (SFA / minFA).toFixed(1)
      return `${PUFARatio} / ${MUFARatio} / ${SFARatio}`
    },
    calculateNutrients(item, nutrient) {
      // 利用『每 100 公克』的數值換算『每份的數值』
      const data = parseFloat(this.calculatePer100g(item, nutrient))
      const perWeight = item.perPortionInfomation.perWeight
      const perData = (data / 100) * perWeight
      if (perData === 0) {
        return perData.toFixed(0)
      } else {
        return perData.toFixed(1)
      }
    },
    calculateCalories(item) {
      let data = parseFloat(this.calculatePer100gCalories(item))
      data = (data / 100) * item.perPortionInfomation.perWeight
      if (data === 0) {
        return data.toFixed(0)
      } else {
        return data.toFixed(1)
      }
    },
    calculatePer100g(item, nutrient) {
      // 若 Copy = 1 ， 並且 Qty > Copy：可製成 1 份，並且『本包裝含的份數』大於『可製成的份數』時
      // 例如：輸入的材料總重量可製成 1 包鹽，本包裝含 1000 份，每一份量為 1 克（ perWeight : 1 )
      if (item.numberOfCopy === 1 && item.productQty > item.numberOfCopy) {
        const data = item.ingredients.reduce((total, ingredient) => {
          const gramsRatio = ingredient.grams / 100
          const nutrientValue = ingredient.details[`${nutrient}`] || 0
          const sumValue = total + nutrientValue * gramsRatio
          return sumValue
        }, 0)
        const totalWeight =
          item.productQty * item.perPortionInfomation.perWeight
        const per100g = (data / totalWeight) * 100
        if (per100g === 0) {
          return per100g.toFixed(0)
        } else {
          return per100g.toFixed(1)
        }
      } else {
        // 除了以上之外的情況
        // 例如：南瓜豬肉粥，總材料重量可製成 10 份（ Copy:10 )，本包裝含 1 份 ( Qty:1 )，每一份量為 250 克（ perWeight : 250 )
        const data = item.ingredients.reduce((total, ingredient) => {
          const gramsRatio = ingredient.grams / 100
          const nutrientValue = ingredient.details[`${nutrient}`] || 0
          const sumValue = total + nutrientValue * gramsRatio
          return sumValue
        }, 0)
        const totalWt = item.numberOfCopy * item.perPortionInfomation.perWeight
        const per100g = (data / totalWt) * 100
        if (per100g === 0) {
          return per100g.toFixed(0)
        } else {
          return per100g.toFixed(1)
        }
      }
    },

    calculatePer100gCalories(item) {
      const protein = parseFloat(this.calculatePer100g(item, 'protein')) || 0
      const fat = parseFloat(this.calculatePer100g(item, 'fat')) || 0
      let carbohydrates =
        parseFloat(this.calculatePer100g(item, 'total_carbohydrates')) || 0
      const fiber = item.claimNts?.includes('dietary_fiber')
        ? parseFloat(this.calculatePer100g(item, 'dietary_fiber')) || 0
        : 0
      // Erythritol 赤藻糖醇 熱量為零
      const erythritol = item.claimNts?.includes('Erythritol')
        ? parseFloat(this.calculatePer100g(item, 'Erythritol')) || 0
        : 0
      // 將自行新增的膳食纖維名稱加入到 this.newFiber 陣列中
      item.ingredients.forEach(product => {
        product.details.newClaimNts?.forEach(newClaimItem => {
          if (
            newClaimItem.type === '膳食纖維' &&
            !this.newFiber.includes(newClaimItem.enName)
          ) {
            this.newFiber.push(newClaimItem.enName)
          }
        })
      })
      // 加總自行新增的膳食纖維克數
      const newFiberGrams = this.newFiber.reduce((total, fiber) => {
        if (item.newClaimNts?.includes(fiber)) {
          const grams = parseFloat(this.calculatePer100g(item, fiber)) || 0
          return total + grams
        }
        return total
      }, 0)
      //將 item.ingredients 中的自行新增的糖醇元素加入到內建資料庫 this.sugarAlcohols 陣列中
      item.ingredients.forEach(product => {
        product.details.newClaimNts?.forEach(newClaimItem => {
          if (
            newClaimItem.type === '糖醇' &&
            !this.sugarAlcohols.includes(newClaimItem.enName)
          ) {
            this.sugarAlcohols.push(newClaimItem.enName)
          }
        })
      })
      // 其他糖醇 熱量每公克 2.4 大卡
      const SAGrams = this.sugarAlcohols.reduce((total, SA) => {
        if (item.claimNts?.includes(SA) || item.newClaimNts?.includes(SA)) {
          const grams = parseFloat(this.calculatePer100g(item, SA)) || 0
          return total + grams
        }
        return total
      }, 0)

      // 加總自行新增的 有機酸 克數，若將 有機酸 有標示出來，每公克以熱量 3 大卡 計算，不標則不用算
      const organicAcidGrams = this.organicAcid.reduce((total, acid) => {
        if (item.newClaimNts?.includes(acid)) {
          const grams = parseFloat(this.calculatePer100g(item, acid)) || 0
          return total + grams
        }
        return total
      }, 0)

      // 酒精 熱量 每公克 7 大卡
      const alcohol = item.claimNts?.includes('alcohol')
        ? parseFloat(this.calculatePer100g(item, 'alcohol')) || 0
        : 0

      // 碳水化合物包含：膳食纖維、赤藻糖醇、其它糖醇，『若要標示出來』，則熱量計算為：
      // （ 碳水化合物 - 膳食纖維 - 赤藻糖醇 - 其它糖醇 ） * 4 大卡
      // ＋ 膳食纖維 ＊ 2 大卡 + 赤藻糖醇 * 0 大卡 + 其它糖醇 * 2.4 大卡
      // 『不標示出來』，計算方式則為：碳水化合物 * 4 大卡
      carbohydrates =
        carbohydrates - fiber - newFiberGrams - erythritol - SAGrams
      const kcal =
        protein * 4 +
        fat * 9 +
        carbohydrates * 4 +
        fiber * 2 +
        newFiberGrams * 2 +
        erythritol * 0 +
        SAGrams * 2.4 +
        organicAcidGrams * 3 +
        alcohol * 7
      if (kcal === 0) {
        return kcal.toFixed(0)
      } else {
        return kcal.toFixed(1)
      }
    },
    transUnitText(unit) {
      const unitMapping = {
        g: '公克',
        ug: '微克',
        mg: '毫克',
        IU: '國際單位',
      }
      const text = unit.match(/\((g|ug|mg|IU)\)/)
      if (text === null) {
        return ''
      } else {
        return unitMapping[text[1]]
      }
    },
    openDoubleCheckModal(item, index) {
      this.$refs.doubleCheckModal.showDelModal(item, index)
    },
    adjustData() {
      this.productList = this.myProductList
      // 將 productList.ingredients.details.baseClaimNts 展開並存入 productList.ingredients.details
      // 並在處理後刪除 baseClaimNts
      this.productList.forEach(product => {
        product.ingredients.forEach(item => {
          if (item.details.baseClaimNts) {
            item.details = { ...item.details, ...item.details.baseClaimNts }
          }
          let newClaimData = {}
          item.details.newClaimNts?.forEach(newClaimItem => {
            newClaimData[newClaimItem.enName] = newClaimItem.quantity
          })
          item.details = { ...item.details, ...newClaimData }
        })
      })
      this.sortItems()
    },
    sortItems() {
      this.productList.sort((a, b) => {
        return b.id - a.id
      })
      window.scrollTo(0, 0)
    },
    getMyAddedNts() {
      const data = {}
      this.myAddedNtsList?.forEach(item => {
        data[item.enName] =
          item.chName + '(' + item.unit.match(/\((.*?)\)/)[1] + ')'
      })
      this.myAddedNts = data
    },
    transAllergenText(data) {
      const text = []
      const allergenItem = [
        '麩質',
        '甲殼類',
        '芒果類',
        '花生類',
        '牛奶、羊奶',
        '蛋',
        '芝麻',
        '堅果類',
        '大豆',
        '魚類',
        '亞硫酸鹽',
      ]
      data.forEach(item => {
        allergenItem.forEach(ele => {
          if (item.match(ele)) {
            text.push(ele)
          }
        })
      })
      return text.join('、')
    },

    getOrganicAcidName() {
      // 將自行新增的 有機酸 名稱加入到 this.organicAcid 陣列中
      const OAName = []
      this.myAddedNtsList?.forEach(item => {
        if (item.type === '有機酸') {
          OAName.push(item.enName)
        }
      })
      this.organicAcid = OAName
    },
    isOtherIngredients(item) {
      let isOrganicAcid = false
      item.newClaimNts?.forEach(nt => {
        if (this.organicAcid.includes(nt)) {
          isOrganicAcid = true
        } else {
          isOrganicAcid = false
        }
      })
      if (
        (item.claimNts && item.claimNts.includes('alcohol')) ||
        isOrganicAcid === true
      ) {
        return true
      } else {
        return false
      }
    },
    isOrganicAcid(item) {
      let organicAcid = false
      item.newClaimNts?.forEach(nt => {
        if (this.organicAcid.includes(nt)) {
          organicAcid = true
        } else {
          organicAcid = false
        }
      })
      return organicAcid
    },
    isOtherSugarAlcohols(item) {
      let otherSA = false
      item.claimNts?.filter(item => {
        return (otherSA = this.sugarAlcohols.includes(item))
      })
      return otherSA
    },
    isNewAddedSA(item) {
      let othersSA = false
      const localStorageNts =
        JSON.parse(localStorage.getItem('myAddedNts')) || []
      if (item) {
        localStorageNts.filter(nt => {
          return (othersSA = nt.type === '糖醇' && item?.includes(nt.enName))
        })
      } else {
        return (othersSA = false)
      }
      return othersSA
    },
    download(id, title) {
      const data = {}
      const targetElement = document.getElementById('nutritionLabel' + id)
      html2canvas(targetElement, { scale: 2, logging: false }) // 解析度為目標元素實際大小的 2 倍
        .then(canvas => {
          const link = document.createElement('a')
          link.download = `${title}.png` // 設定檔名
          link.href = canvas.toDataURL('image/png') //導出 png 格式，支援透明背景
          link.click() // 自動點擊下載
          data.title = '圖片下載成功'
          data.style = 'success'
          this.pushMsg(data)
          // GA 事件追蹤
          if (window.gtag) {
            window.gtag('event', 'download_button_click', {
              event_category: 'download',
              event_label: 'product_label',
              file_format: 'png',
            })
          }
        })
        .catch(err => {
          data.title = '圖片生成失敗:' + err
          data.style = 'failure'
          this.pushMsg(data)
        })
    },
    copy(id) {
      const sectionEl = document.getElementById('text' + id)
      const data = {}
      if (sectionEl) {
        const arrayContent = Array.from(
          sectionEl.querySelectorAll('p.markItemsTitle'),
        )?.map(p => {
          const title = p.textContent.trim() || ''
          const text =
            p.closest('div')?.querySelector('.col')?.textContent?.trim() || ''
          return title + '：' + text
        })
        const finishText = arrayContent.join('\n')
        navigator.clipboard
          .writeText(finishText)
          .then(() => {
            data.title = '已複製外包裝文字'
            data.style = 'success'
            this.pushMsg(data)
            // GA 事件追蹤
            if (window.gtag) {
              window.gtag('event', 'copy_text', {
                event_category: 'copy',
                event_label: 'copy packaging text',
                file_format: 'text',
              })
            }
          })
          .catch(err => {
            data.title = '複製失敗:' + err
            data.style = 'failure'
            this.pushMsg(data)
          })
      } else {
        data.title = '找不到複製內容:'
        data.style = 'failure'
        this.pushMsg(data)
      }
    },
  },
  created() {
    this.adjustData()
    this.getMyAddedNts()
    this.getOrganicAcidName()
  },
}
</script>

<style lang="scss" scoped>
.markItemsContainer p {
  margin-bottom: 0px;
}

.markItemsTitle {
  width: 120px;
  text-align-last: justify;
}

.pR {
  padding-right: 9px !important;
}

.bi-columns-gap {
  font-size: 75px;
}
</style>
