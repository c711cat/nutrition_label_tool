<template>
  <div class="mx-auto col-11 col-lg-10 col-xl-9 col-xxl-8">
    <h3 class="text-center">已新增的營養素</h3>
    <div class="text-end px-1">
      <button
        @click="openAddNtsModal"
        type="button"
        class="btn btn-primary mb-3"
      >
        新增
      </button>
    </div>

    <div class="row">
      <div v-if="myAddedNtsList.length === 0" class="mx-auto py-5 col-12 w-100">
        <p class="text-center mb-0 fw-bold fs-5 text-primary">
          目前已無新增的營養素
        </p>
      </div>
      <div
        v-for="(item, index) in myAddedNtsList"
        :key="item"
        class="col-md-6 mb-3"
      >
        <div class="card bg-light">
          <div
            class="card-body d-flex flex-column justify-content-between"
            :class="used(item.enName) ? 'pb-2' : ''"
          >
            <div>
              <p class="card-text mb-0 fw-bold">
                英文名稱：
                <span class="fw-normal">{{ item.enName }}</span>
              </p>
              <p class="card-text mb-0 fw-bold">
                中文名稱：
                <span class="fw-normal">{{ item.chName }}</span>
              </p>
              <p class="card-text mb-0 fw-bold">
                單位：
                <span class="fw-normal">{{ item.unit }}</span>
              </p>
              <p class="card-text mb-0 fw-bold">
                類別：
                <span class="fw-normal">{{ item.type }}</span>
              </p>
            </div>

            <div class="text-end">
              <button
                @click="openEditModal(index, item)"
                :disabled="used(item.enName)"
                class="btn btn-outline-primary me-2"
              >
                編輯
              </button>
              <button
                @click="openDoubleCheckModal(index, item)"
                :disabled="used(item.enName)"
                class="btn btn-outline-danger"
              >
                刪除
              </button>
              <div
                v-if="used(item.enName)"
                class="py-1 text-secondary d-flex flex-wrap justify-content-end"
              >
                <i class="bi bi-info-circle pe-1"></i>
                <span>自定義資料中已使用，</span>
                <span>不予編輯及刪除</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NewClaimNtsModal ref="newClaimNtsModal" />
    <DoubleCheckModal ref="doubleCheckModal" />
  </div>
</template>
<script>
import NewClaimNtsModal from '@/components/NewClaimNtsModal.vue'
import DoubleCheckModal from '@/components/DoubleCheckModal.vue'
import { useFoodStore } from '@/stores/foodDataStore'
import { useCustomizeStore } from '@/stores/customizeStore'
import { mapState } from 'pinia'
export default {
  data() {
    return {}
  },
  components: { NewClaimNtsModal, DoubleCheckModal },
  computed: {
    ...mapState(useFoodStore, ['onlyNewAddHeader']),
    ...mapState(useCustomizeStore, ['customizeDataList', 'myAddedNtsList']),
  },
  methods: {
    openAddNtsModal() {
      this.$refs.newClaimNtsModal.showModal()
    },
    openEditModal(index, item) {
      this.$refs.newClaimNtsModal.showModal(index, item)
    },
    openDoubleCheckModal(index, item) {
      this.$refs.doubleCheckModal.showDelAddedNtModal(index, item)
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
  },
}
</script>
<style lang="scss" scoped>
.card {
  height: 210px;
}
</style>
