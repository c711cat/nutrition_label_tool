<template>
  <div class="container">
    <h3 class="text-center mb-5">自定義品項列表</h3>
    <div class="text-end">
      <router-link to="/added_custom_nts" class="btn btn-outline-primary me-3">
        已新增營養素列表
      </router-link>
      <router-link to="/customize" class="btn btn-outline-primary">
        新增自定義品項
      </router-link>
    </div>

    <div
      v-for="(item, index) in updateSortData"
      :key="item"
      class="border rounded row m-0 my-5 justify-content-between"
    >
      <section class="bg-light p-3 rounded col">
        <div class="d-flex">
          <p class="mb-0">品名</p>
          <i class="fst-normal">：</i>
          <p class="mb-0">{{ item.sample_name }}</p>
        </div>
        <div class="d-flex">
          <p class="mb-0">成分</p>
          <i class="fst-normal">：</i>
          <p class="mb-0">{{ item.content_description }}</p>
        </div>
      </section>
      <section class="col-auto d-flex justify-content-end p-3">
        <table class="border border-black">
          <thead>
            <tr class="border-bottom border-black">
              <th colspan="2" class="text-center fw-normal">營養標示</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="border-bottom border-black"></th>
              <td class="px-2 border-bottom border-black">
                每 100 公克 / 毫升
              </td>
            </tr>
            <tr>
              <th class="px-2 fw-normal">熱量</th>
              <td class="text-end px-2">{{ item.calories }} 大卡</td>
            </tr>
            <tr>
              <th class="px-2 fw-normal">蛋白質</th>
              <td class="text-end px-2">{{ item.protein }} 公克</td>
            </tr>
            <tr>
              <th class="px-2 fw-normal">脂肪</th>
              <td class="text-end px-2">{{ item.fat }} 公克</td>
            </tr>
            <tr>
              <th class="pe-2 ps-4 fw-normal">飽和脂肪</th>
              <td class="text-end px-2">{{ item.saturated_fat }} 公克</td>
            </tr>
            <tr>
              <th class="pe-2 ps-4 fw-normal">反式脂肪</th>
              <td class="text-end px-2">{{ item.trans_fat }} 公克</td>
            </tr>
            <tr>
              <th class="px-2 fw-normal">碳水化合物</th>
              <td class="text-end px-2">{{ item.total_carbohydrates }} 公克</td>
            </tr>
            <tr>
              <th class="pe-2 ps-4 fw-normal">糖</th>
              <td class="text-end px-2">{{ item.total_sugar }} 公克</td>
            </tr>
            <tr>
              <th class="px-2 fw-normal">鈉</th>
              <td class="text-end px-2">{{ item.sodium }} 毫克</td>
            </tr>
            <tr v-for="(value, key) in item.baseClaimNts" :key="key">
              <th class="px-2 fw-normal">
                {{ headerChineseAndEnglish[key].replace(/\(.*\)/, '') }}
              </th>
              <td class="text-end px-2">
                {{ value }} {{ transUnitText(headerChineseAndEnglish[key]) }}
              </td>
            </tr>
            <tr v-for="(item, index) in item.newClaimNts" :key="item + index">
              <th class="px-2 fw-normal">
                {{ item.chName }}
              </th>
              <td class="text-end px-2">
                {{ item.quantity }} {{ item.unit.replace(/\(.*\)/, '') }}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <div class="text-end my-3">
        <router-link
          :to="isPath(item.id)"
          @click="editCustomizeData(item)"
          type="button"
          class="btn btn-outline-primary me-3"
        >
          編輯
        </router-link>
        <button
          @click="opendelModal(item, index)"
          type="button"
          class="btn btn-outline-danger me-1"
        >
          刪除
        </button>
      </div>
    </div>
  </div>
  <DoubleCheckModal ref="doubleCheckModal" />
</template>
<script>
import { mapState, mapActions } from 'pinia'
import { useCustomizeStore } from '@/stores/customizeStore'
import { useFoodStore } from '@/stores/foodDataStore'
import DoubleCheckModal from '@/components/DoubleCheckModal.vue'

export default {
  data() {
    return {
      updateSortData: [],
    }
  },
  components: { DoubleCheckModal },
  computed: {
    ...mapState(useCustomizeStore, ['customizeDataList', 'customizeData']),
    ...mapState(useFoodStore, ['headerChineseAndEnglish']),
  },
  methods: {
    ...mapActions(useCustomizeStore, [
      'editCustomizeData',
      'delItemOfCustomizeList',
    ]),
    sortItem() {
      this.updateSortData = this.customizeDataList
      this.updateSortData.sort((a, b) => {
        return b.id - a.id
      })
      this.updateData()
    },
    updateData() {
      this.updateSortData = this.customizeDataList.map(
        ({
          sample_name,
          content_description,
          category,
          id,
          calories,
          protein,
          fat,
          saturated_fat,
          trans_fat,
          total_carbohydrates,
          total_sugar,
          sodium,
          newClaimNts,
          ...baseClaimNts
        }) => {
          return {
            sample_name,
            content_description,
            category,
            id,
            calories,
            protein,
            fat,
            saturated_fat,
            trans_fat,
            total_carbohydrates,
            total_sugar,
            sodium,
            newClaimNts: newClaimNts || null,
            baseClaimNts,
          }
        },
      )
    },

    transText(item) {
      const chineseAndUnit = this.headerChineseAndEnglish[item]
      const chinese = chineseAndUnit.replace(/\(.*\)/, '')
      const textMapping = {
        粗蛋白: '蛋白質',
        粗脂肪: '脂肪',
        總碳水化合物: '碳水化合物',
        糖質總量: '糖',
      }
      return textMapping[chinese] || chinese
    },
    transUnitText(unit) {
      const unitMapping = {
        kcal: '大卡',
        g: '公克',
        ug: '微克',
        mg: '毫克',
        IU: '國際單位',
      }
      const text = unit.match(/\((kcal|g|ug|mg|IU)\)/)
      if (text === null) {
        return ''
      } else {
        return unitMapping[text[1]]
      }
    },
    opendelModal(item, index) {
      this.$refs.doubleCheckModal.showDelCustomizeModal(item, index)
    },
    isPath(id) {
      return (this.$route.path = `/edit_customize/${id}`)
    },
  },
  created() {
    this.sortItem()
  },
}
</script>
