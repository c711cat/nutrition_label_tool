<template>
  <div class="mx-auto col-11 col-lg-10 pb-5 mb-5">
    <header class="text-end mb-3">
      <h3 class="text-center">自定義資料庫</h3>
      <button
        v-if="updateSortData.length > 0"
        @click="openModal"
        class="btn btn-primary"
      >
        新增
      </button>
    </header>
    <section
      v-if="updateSortData.length === 0"
      class="mx-auto py-5 col-12 w-100 text-center"
    >
      <i class="bi bi-clipboard text-secondary"></i>
      <p class="text-center fw-bold fs-5 text-primary">{{ noResultText }}</p>
      <button @click="openModal" class="btn btn-primary">
        試著新增一個吧！
      </button>
    </section>
    <section
      v-for="(item, index) in updateSortData"
      :key="item"
      class="bg-light border rounded row m-0 mb-5 justify-content-between"
    >
      <section class="p-3 col">
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
      <section
        class="col-12 col-sm-7 col-md-5 col-lg-5 col-xl-4 col-xxl-3 d-flex flex-wrap justify-content-end p-3"
      >
        <table
          class="table table-sm table-borderless border border-2 border-black col-12 mb-1"
        >
          <thead>
            <tr class="lh-sm">
              <th
                colspan="2"
                class="text-center fw-normal border-bottom border-black"
              >
                營養標示
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="lh-sm">
              <th class="border-bottom border-black"></th>
              <td class="text-end px-2 border-bottom border-black">
                每 100 公克 / 毫升
              </td>
            </tr>
            <tr class="lh-1">
              <th class="px-2 fw-normal">熱量</th>
              <td class="text-end px-2">{{ item.calories }} 大卡</td>
            </tr>
            <tr class="lh-1">
              <th class="px-2 fw-normal">蛋白質</th>
              <td class="text-end px-2">{{ item.protein }} 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="px-2 fw-normal">脂肪</th>
              <td class="text-end px-2">{{ item.fat }} 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="pe-2 ps-4 fw-normal">飽和脂肪</th>
              <td class="text-end px-2">{{ item.saturated_fat }} 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="pe-2 ps-4 fw-normal">反式脂肪</th>
              <!-- 資料庫中的單位以『毫克』計算，這裡再換算成『公克』 -->
              <td class="text-end px-2">{{ item.trans_fat / 1000 }} 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="px-2 fw-normal">碳水化合物</th>
              <td class="text-end px-2">{{ item.total_carbohydrates }} 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="pe-2 ps-4 fw-normal">糖</th>
              <td class="text-end px-2">{{ item.total_sugar }} 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="px-2 fw-normal">鈉</th>
              <td class="text-end px-2">{{ item.sodium }} 毫克</td>
            </tr>
            <tr
              v-for="(value, key) in item.baseClaimNts"
              :key="key"
              class="lh-1"
            >
              <th v-if="key !== 'alcohol'" class="px-2 fw-normal">
                {{ headerChineseAndEnglish[key].replace(/\(.*\)/, '') }}
              </th>
              <td v-if="key !== 'alcohol'" class="text-end px-2">
                {{ value }} {{ transUnitText(headerChineseAndEnglish[key]) }}
              </td>
            </tr>
            <tr
              v-for="(item, index) in item.newClaimNts"
              :key="item + index"
              class="lh-1"
            >
              <th v-if="item.type !== '有機酸'" class="px-2 fw-normal">
                {{ item.chName }}
              </th>
              <td v-if="item.type !== '有機酸'" class="text-end px-2">
                {{ item.quantity }} {{ item.unit.replace(/\(.*\)/, '') }}
              </td>
            </tr>
          </tbody>
        </table>
        <table
          v-if="isOtherIngredients(item)"
          class="table table-sm table-borderless border border-2 border-black col-12"
        >
          <thead>
            <tr class="lh-sm">
              <th
                class="ps-2 fw-normal border-bottom border-black align-middle col"
              >
                其他成分
              </th>
              <td
                class="text-end pe-2 border-bottom border-black col align-middle"
              >
                每 100 公克 / 毫升
              </td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(value, key) in item.baseClaimNts"
              :key="key"
              class="lh-1"
            >
              <th v-if="key === 'alcohol'" class="fw-normal ps-2">酒精</th>
              <td v-if="key === 'alcohol'" class="text-end pe-2 align-middle">
                {{ value }} 公克
              </td>
            </tr>
            <tr v-for="nt in item.newClaimNts" :key="nt" class="lh-1">
              <th v-if="nt.type === '有機酸'" class="fw-normal ps-2">
                {{ nt.chName }}
              </th>
              <td v-if="nt.type === '有機酸'" class="text-end pe-2">
                {{ nt.quantity }} {{ nt.unit.replace(/\(.*\)/, '') }}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <div class="text-end my-3">
        <button
          @click="openModal(item)"
          type="button"
          class="btn btn-outline-primary me-3"
        >
          編輯
        </button>
        <button
          @click="opendelModal(item, index)"
          type="button"
          class="btn btn-outline-danger me-1"
        >
          刪除
        </button>
      </div>
    </section>
    <DoubleCheckModal ref="doubleCheckModal" />
    <CustomizeBaseDataModal ref="customizeBaseDataModal" />
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import { useCustomizeStore } from '@/stores/customizeStore'
import { useFoodStore } from '@/stores/foodDataStore'
import DoubleCheckModal from '@/components/DoubleCheckModal.vue'
import CustomizeBaseDataModal from '@/components/CustomizeBaseDataModal.vue'
export default {
  data() {
    return {
      updateSortData: [],
      organicAcid: [],
    }
  },
  watch: {
    customizeModal: {
      handler(val) {
        if (val.switch === false) {
          location.reload()
        }
      },
      deep: true,
      immediate: true,
    },
    customizeDataList: {
      handler() {
        this.sortItem()
      },
      deep: true,
      immediate: true,
    },
  },
  components: { DoubleCheckModal, CustomizeBaseDataModal },
  computed: {
    ...mapState(useCustomizeStore, [
      'customizeDataList',
      'filteredCustomizeDataList',
      'customizeData',
      'customizeModal',
      'myAddedNtsList',
    ]),
    ...mapState(useFoodStore, ['headerChineseAndEnglish']),
    noResultText() {
      if (
        this.customizeDataList.length === 0 &&
        this.filteredCustomizeDataList.length === 0
      ) {
        return '目前無自定義的資料～'
      }
      if (
        this.customizeDataList.length === 0 &&
        this.filteredCustomizeDataList.length > 0
      ) {
        return '搜尋結果：無符合的資料～'
      } else {
        return ''
      }
    },
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
    openModal(item) {
      this.$refs.customizeBaseDataModal.showModal()
      if (item) {
        this.editCustomizeData(item)
      }
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
        (item.baseClaimNts &&
          Object.keys(item.baseClaimNts).includes('alcohol')) ||
        isOrganicAcid === true
      ) {
        return true
      } else {
        return false
      }
    },
  },
  created() {
    this.sortItem()
    this.getOrganicAcidName()
  },
}
</script>

<style lang="scss" scoped>
.bi-clipboard {
  font-size: 75px;
}
</style>
