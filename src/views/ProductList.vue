<template>
  <div class="container my-4">
    <h3 class="text-center mb-5">營養標示列表</h3>
    <div
      v-for="item in myProductList"
      :key="item.id"
      class="border rounded row m-0 my-5"
    >
      <section
        class="bg-light p-3 rounded col-12 col-xl-8 col-xxl-9 markItemsContainer"
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
      <section class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 p-3">
        <table class="table table-sm table-borderless border border-black mb-0">
          <thead>
            <tr class="lh-sm border-bottom border-black">
              <th colspan="3" class="text-center fw-normal">營養標示</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="fw-normal ps-2 lh-sm">每一份量</th>
              <td colspan="2" class="lh-sm">250 公克</td>
            </tr>
            <tr class="lh-1 border-bottom border-black">
              <th class="fw-normal ps-2">本包裝含</th>
              <td colspan="2">1 份</td>
            </tr>
            <tr class="lh-sm border-bottom border-black">
              <th></th>
              <td class="text-end pe-2">每份</td>
              <td class="text-end pe-2">每 100 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">熱量</th>
              <td class="text-end pe-2">300 大卡</td>
              <td class="text-end pe-2">150 大卡</td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">蛋白質</th>
              <td class="text-end pe-2">30 公克</td>
              <td class="text-end pe-2">15 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">脂肪</th>
              <td class="text-end pe-2">10 公克</td>
              <td class="text-end pe-2">5 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-4">飽和脂肪</th>
              <td class="text-end pe-2">10 公克</td>
              <td class="text-end pe-2">5 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-4">反式脂肪</th>
              <td class="text-end pe-2">10 公克</td>
              <td class="text-end pe-2">5 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">碳水化合物</th>
              <td class="text-end pe-2">10 公克</td>
              <td class="text-end pe-2">5 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-4">糖</th>
              <td class="text-end pe-2">10 公克</td>
              <td class="text-end pe-2">5 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">鈉</th>
              <td class="text-end pe-2">10 公克</td>
              <td class="text-end pe-2">10 公克</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<script>
import { useFoodStore } from '@/stores/foodDataStore.js'
import { mapState, mapActions } from 'pinia'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(useFoodStore, ['myProductList']),
  },
  methods: {
    ...mapActions(useFoodStore, ['getMyProductList']),
    sorted(ingredients) {
      return ingredients
        .sort((a, b) => b.grams - a.grams)
        .map(itemName => `${itemName.foodName}`)
        .join('、')
    },
  },
  created() {
    this.getMyProductList()
    console.log(this.myProductList)
  },
}
</script>

<style lang="scss" scoped>
* {
  border: 1px solid;
}
.markItemsContainer p {
  margin-bottom: 0px;
}

.markItemsTitle {
  width: 120px;
  text-align-last: justify;
}
</style>
