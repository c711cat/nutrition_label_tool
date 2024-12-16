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
        :id="`nutritionLabel${item.id}`"
        class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 p-3"
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
              <td colspan="2" class="lh-sm">
                {{ item.perPortionInfomation.perWeight }}
                {{ item.perPortionInfomation.unit }}
              </td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2 border-bottom border-black">
                本包裝含
              </th>
              <td colspan="2" class="border-bottom border-black">
                {{ item.productQty }} 份
              </td>
            </tr>
            <tr class="lh-sm">
              <th class="border-bottom border-black"></th>
              <td class="text-end pe-2 border-bottom border-black">每份</td>
              <td class="text-end pe-2 border-bottom border-black">
                每 100 {{ item.perPortionInfomation.unit }}
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
            <tr v-for="nutrient in item.claimNts" :key="nutrient" class="lh-1">
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
          增減營養素
        </button>
        <div class="my-3">
          <button
            @click="download(item.id)"
            type="button"
            class="btn btn-primary me-3"
          >
            下載營養標示
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
      </div>
      <div>
        <p>
          依據
          <a
            href="https://www.foodlabel.org.tw/FdaFrontEndApp/Law/Edit?SystemId=f27b8c5e-35c2-4a86-9b8b-d7cbbef409ab&clPublishStatus=undefined"
            target="_blank"
            rel="noopener noreferrer"
          >
            包裝食品營養標示應遵行事項
          </a>
          第一章 之 第十一條：包裝食品營養標示之熱量計算方式，應依下列規定辦理：
        </p>
        <p>(一) 蛋白質之熱量，以每公克四大卡計算。</p>
        <p>(二) 脂肪之熱量，以每公克九大卡計算。</p>
        <p>
          (三)
          碳水化合物之熱量，以每公克四大卡計算，但加以標示膳食纖維者，其膳食纖維熱量得以每公克二大卡計算。
        </p>
        <p>
          (四)
          赤藻糖醇之熱量得以零大卡計算，其他糖醇之熱量得以每公克二‧四大卡計算；有機酸之熱量得以每公克三大卡計算；酒精(乙醇)之熱量得以每公克七大卡計算。並應將糖醇含量標示於營養標示格式中，有機酸及酒精(乙醇)含量應於營養標示格式外明顯處註明。
        </p>
        <p>
          (五)
          每份熱量計算方式，得以每一百公克(或毫升)之熱量換算之，或以每一百公克(或毫升)之蛋白質、脂肪及碳水化合物含量換算為每份含量後，再以第一款至前款計算方式計算每份之熱量。
        </p>
      </div>
    </div>
    <ProductClaimNtsModal ref="productClaimNtsModal" />
    <DoubleCheckModal ref="doubleCheckModal" />
  </div>
</template>

<script>
import { useFoodStore } from '@/stores/foodDataStore.js'
import { mapState, mapActions } from 'pinia'
import ProductClaimNtsModal from '@/components/ProductClaimNtsModal.vue'
import DoubleCheckModal from '@/components/DoubleCheckModal.vue'
import html2canvas from 'html2canvas'
import { useMsgStore } from '@/stores/messageStore'
export default {
  data() {
    return {
      claimNts: [],
      productList: [],
    }
  },
  components: { ProductClaimNtsModal, DoubleCheckModal },
  computed: {
    ...mapState(useFoodStore, ['myProductList', 'headerChineseAndEnglish']),
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
    calculateNutrients(item, nutrient) {
      // 利用『每 100 公克』的數值換算『每份的數值』
      const data = parseFloat(this.calculatePer100g(item, nutrient))
      const perWeight = item.perPortionInfomation.perWeight
      const perData = (data / 100) * perWeight
      return perData.toFixed(1)
    },
    calculateCalories(item) {
      let data = parseFloat(this.calculatePer100gCalories(item))
      data = (data / 100) * item.perPortionInfomation.perWeight
      return data.toFixed(1)
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
        return per100g.toFixed(1)
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
        return per100g.toFixed(1)
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
      // erythritol 赤藻糖醇 熱量為零
      const erythritol = item.claimNts?.includes('Erythritol')
        ? parseFloat(this.calculatePer100g(item, 'Erythritol')) || 0
        : 0
      // 其它糖醇 熱量每公克 2.4 大卡
      const sugarAlcohols = [
        'Xylitol',
        'Sorbitol',
        'Maltitol',
        'Lactitol',
        'Mannitol',
      ]
      const SAGrams = sugarAlcohols.reduce((total, SA) => {
        if (item.claimNts?.includes(SA)) {
          const grams = parseFloat(this.calculatePer100g(item, SA)) || 0
          return total + grams
        }
        return total
      }, 0)

      // 酒精 熱量 每公克 7 大卡
      const alcohol = item.claimNts?.includes('alcohol')
        ? parseFloat(this.calculatePer100g(item, 'alcihol')) || 0
        : 0

      // 碳水化合物包含：膳食纖維、赤藻糖醇、其它糖醇，『若要標示出來』，則熱量計算為：
      // （ 碳水化合物 - 膳食纖維 - 赤藻糖醇 - 其它糖醇 ） * 4 大卡
      // ＋ 膳食纖維 ＊ 2 大卡 + 赤藻糖醇 * 0 大卡 + 其它糖醇 * 2.4 大卡
      // 『不標示出來』，計算方式則為：碳水化合物 * 4 大卡
      carbohydrates = carbohydrates - fiber - erythritol - SAGrams
      const kcal =
        protein * 4 +
        fat * 9 +
        carbohydrates * 4 +
        fiber * 2 +
        erythritol * 0 +
        SAGrams * 2.4 +
        alcohol * 7
      return kcal.toFixed(1)
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
            delete item.details.baseClaimNts
          }
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
    download(id) {
      const data = {}
      const targetElement = document.getElementById('nutritionLabel' + id)
      html2canvas(targetElement, { scale: 2 }) // 解析度為目標元素實際大小的 2 倍
        .then(canvas => {
          const link = document.createElement('a')
          link.download = '營養標示.png' // 設定檔名
          link.href = canvas.toDataURL('image/png') //導出 png 格式，支援透明背景
          link.click() // 自動點擊下載
          data.title = '圖片下載成功'
          data.style = 'success'
          this.pushMsg(data)
        })
        .catch(err => {
          data.title = '圖片生成失敗:' + err
          data.style = 'failure'
          this.pushMsg(data)
        })
    },
  },
  created() {
    this.adjustData()
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
