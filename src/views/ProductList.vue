<template>
  <div class="container my-4">
    <h3 class="text-center mb-5">營養標示列表</h3>
    <div
      v-for="(item, index) in myProductList"
      :key="item.id"
      class="border rounded row m-0 my-5"
    >
      <section
        class="bg-light p-3 rounded col-12 col-xl-7 col-xxl-8 markItemsContainer"
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
          <p class="markItemsTitle">過敏原資訊</p>
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
            {{ item.allergenInformation.allergens.join('、') }}
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
            {{ item.validDateInformation.validDate }}
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
        class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 p-3"
      >
        <table class="table table-sm table-borderless border border-black mb-0">
          <thead>
            <tr class="lh-sm border-bottom border-black">
              <th colspan="3" class="text-center fw-normal">營養標示</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="fw-normal ps-2 lh-sm">每一份量</th>
              <td colspan="2" class="lh-sm">
                {{ item.netWeightInformation.netWeight }}
                {{ item.netWeightInformation.unit }}
              </td>
            </tr>
            <tr class="lh-1 border-bottom border-black">
              <th class="fw-normal ps-2">本包裝含</th>
              <td colspan="2">{{ item.productQty }} 份</td>
            </tr>
            <tr class="lh-sm border-bottom border-black">
              <th></th>
              <td class="text-end pe-2">每份</td>
              <td class="text-end pe-2">
                每 100 {{ item.netWeightInformation.unit }}
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">熱量</th>
              <td class="text-end pe-2">{{ calculateCalories(item) }} 大卡</td>
              <td class="text-end pe-2">
                {{ calculatePer100gCalories(item) }} 大卡
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">蛋白質</th>
              <td class="text-end pe-2">
                {{ calculateNutrients(item, 'protein') }} 公克
              </td>
              <td class="text-end pe-2">
                {{ calculatePer100g(item, 'protein') }} 公克
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">脂肪</th>
              <td class="text-end pe-2">
                {{ calculateNutrients(item, 'fat') }} 公克
              </td>
              <td class="text-end pe-2">
                {{ calculatePer100g(item, 'fat') }} 公克
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-4">飽和脂肪</th>
              <td class="text-end pe-2">
                {{ calculateNutrients(item, 'saturated_fat') }} 公克
              </td>
              <td class="text-end pe-2">
                {{ calculatePer100g(item, 'saturated_fat') }} 公克
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-4">反式脂肪</th>
              <td class="text-end pe-2">
                {{ calculateNutrients(item, 'trans_fat') }} 公克
              </td>
              <td class="text-end pe-2">
                {{ calculatePer100g(item, 'trans_fat') }} 公克
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">碳水化合物</th>
              <td class="text-end pe-2">
                {{ calculateNutrients(item, 'total_carbohydrates') }} 公克
              </td>
              <td class="text-end pe-2">
                {{ calculatePer100g(item, 'total_carbohydrates') }} 公克
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-4">糖</th>
              <td class="text-end pe-2">
                {{ calculateNutrients(item, 'total_sugar') }} 公克
              </td>
              <td class="text-end pe-2">
                {{ calculatePer100g(item, 'total_sugar') }} 公克
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">鈉</th>
              <td class="text-end pe-2">
                {{ calculateNutrients(item, 'sodium') }} 毫克
              </td>
              <td class="text-end pe-2">
                {{ calculatePer100g(item, 'sodium') }} 毫克
              </td>
            </tr>
            <tr
              v-for="nutrient in item.addNutrients"
              :key="nutrient"
              class="lh-1"
            >
              <th class="fw-normal ps-2">
                {{ headerChineseAndEnglish[nutrient].replace(/\(.*\)/, '') }}
              </th>
              <td class="text-end pe-2">
                {{ calculateNutrients(item, nutrient) }}
                {{ transUnitText(headerChineseAndEnglish[nutrient]) }}
              </td>
              <td class="text-end pe-2">
                {{ calculatePer100g(item, nutrient) }}
                {{ transUnitText(headerChineseAndEnglish[nutrient]) }}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <div class="d-flex flex-wrap justify-content-between pe-4">
        <button
          @click="openModal(item)"
          type="button"
          class="btn btn-primary my-3"
        >
          新增其他營養素
        </button>
        <div class="my-3">
          <router-link
            to="/nutrition_label"
            @click="edit(item)"
            type="button"
            class="btn btn-outline-primary me-3"
          >
            編輯
          </router-link>
          <button
            @click="del(index)"
            type="button"
            class="btn btn-outline-danger"
          >
            刪除
          </button>
        </div>
      </div>
    </div>
    <AddNutrientsModal ref="addNutrientsModal" />
  </div>
</template>

<script>
import { useFoodStore } from '@/stores/foodDataStore.js'
import { mapState, mapActions } from 'pinia'
import AddNutrientsModal from '@/components/AddNutrientsModal.vue'
export default {
  data() {
    return {
      addNutrients: [],
      productList: [],
    }
  },
  components: { AddNutrientsModal },
  computed: {
    ...mapState(useFoodStore, ['myProductList', 'headerChineseAndEnglish']),
  },
  methods: {
    ...mapActions(useFoodStore, ['setMyProducts', 'edit']),
    openModal(item) {
      this.$refs.addNutrientsModal.showModal(item)
    },
    sorted(ingredients) {
      return ingredients
        .sort((a, b) => b.grams - a.grams)
        .map(itemName => `${itemName.foodName}`)
        .join('、')
    },
    calculateNutrients(item, nutrient) {
      const data = item.ingredients.reduce((total, ingredient) => {
        const gramsRatio = ingredient.grams / 100
        const nutrientValue = ingredient.details[`${nutrient}`] || 0
        return total + nutrientValue * gramsRatio
      }, 0)
      return (data / item.numberOfCopy).toFixed(1)
    },
    calculateCalories(item) {
      const protein = parseFloat(this.calculateNutrients(item, 'protein'))
      const fat = parseFloat(this.calculateNutrients(item, 'fat'))
      const carbohydrates = parseFloat(
        this.calculateNutrients(item, 'total_carbohydrates'),
      )
      return (protein * 4 + fat * 9 + carbohydrates * 4).toFixed(1)
    },
    calculatePer100g(item, nutrient) {
      const data = item.ingredients.reduce((total, ingredient) => {
        const gramsRatio = ingredient.grams / 100
        const nutrientValue = ingredient.details[`${nutrient}`] || 0
        return total + nutrientValue * gramsRatio
      }, 0)
      return (
        (data / (item.netWeightInformation.netWeight * item.numberOfCopy)) *
        100
      ).toFixed(1)
    },
    calculatePer100gCalories(item) {
      const protein = parseFloat(this.calculatePer100g(item, 'protein'))
      const fat = parseFloat(this.calculatePer100g(item, 'fat'))
      const carbohydrates = parseFloat(
        this.calculatePer100g(item, 'total_carbohydrates'),
      )
      return (protein * 4 + fat * 9 + carbohydrates * 4).toFixed(1)
    },
    transUnitText(unit) {
      const unitMapping = {
        g: '公克',
        ug: '微克',
        mg: '毫克',
        IU: '國際單位',
        '': '',
      }
      const text = unit.match(/\((g|ug|mg|IU)\)/)
      if (text === null) {
        return ''
      } else {
        return unitMapping[text[1]]
      }
    },
    del(index) {
      this.productList.splice(index, 1)
      this.setMyProducts(this.productList)
    },
    sortItems() {
      this.productList = this.myProductList
      this.productList.sort((a, b) => b.id - a.id)
      window.scrollTo(0, 0)
    },
  },
  created() {
    this.sortItems()
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
</style>
