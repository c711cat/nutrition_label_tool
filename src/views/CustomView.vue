<template>
  <div class="container mt-4">
    <h3 class="text-center py-3">新增自訂義食材</h3>
    <div class="row m-0">
      <div class="py-3 col-12 col-lg-6">
        <div class="form-floating mb-3">
          <input
            v-model="customFood.sample_name"
            type="text"
            class="form-control"
            id="sample_name"
            placeholder="食材名稱"
          />
          <label for="sample_name" class="">食材名稱</label>
        </div>
        <div class="form-floating">
          <textarea
            style="height: 200px"
            v-model="customFood.content_description"
            type="text"
            class="form-control"
            id="content_description"
            placeholder="成分 （ 填入相同於包裝上顯示的成分 ）"
          />
          <label for="content_description" class="">
            成分 （ 填入相同於包裝上的成分 ）
          </label>
        </div>
      </div>

      <div class="py-3 col-12 col-lg-6">
        <table class="my-0 mx-auto">
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
              <th class="fw-normal px-3">{{ value }}</th>
              <td>
                <input
                  v-model="customFood[key]"
                  type="number"
                  :name="key"
                  :id="key"
                  class="form-control text-center"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useFoodStore } from '@/stores/foodDataStore.js'
import { mapState } from 'pinia'

export default {
  data() {
    return {
      unit: { grams: '公克', mililiter: '毫升' },
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
      customFood: {},
    }
  },
  computed: {
    ...mapState(useFoodStore, ['headerChineseAndEnglish', 'myProductList']),
  },
  methods: {
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
      console.log(this.header)
    },
  },

  created() {
    this.getHeader()
    console.log(this.headerChineseAndEnglish)
  },
}
</script>
<style lang="scss" scoped>
* {
  border: 1px solid;
}
</style>
