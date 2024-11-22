<template>
  <div class="container col-12 col-md-11 col-xl-10 col-xxl-9 pb-5 mb-5">
    <h3 class="text-center">已新增的營養素</h3>
    <div class="text-end px-1">
      <button
        @click="openAddNtsModal"
        type="button"
        class="btn btn-outline-primary mb-3 me-3"
      >
        新增
      </button>
    </div>
    <div class="d-flex flex-wrap">
      <div
        v-for="(value, key, index) in onlyNewAddHeader"
        :key="key"
        class="col-12 col-lg-6"
      >
        <div
          class="d-flex flex-wrap align-items-center bg-light rounded p-3 mb-2 mx-1"
        >
          <p class="mb-0 px-1 col">{{ key }}</p>
          <p class="mb-0 px-1 col">{{ value }}</p>
          <div class="text-end">
            <button
              @click="edit(value, key)"
              type="button"
              class="btn btn-outline-primary me-3"
            >
              編輯
            </button>
            <button
              @click="openDoubleCheckModal(value, key, index)"
              type="button"
              class="btn btn-outline-danger"
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AddCustomNtsModal ref="addCustomNtsModal" />
  <DoubleCheckModal ref="doubleCheckModal" />
</template>
<script>
import AddCustomNtsModal from '@/components/CustomNtsModal.vue'
import DoubleCheckModal from '@/components/DoubleCheckModal.vue'
import { useFoodStore } from '@/stores/foodDataStore'
import { mapState } from 'pinia'
export default {
  data() {
    return {}
  },
  components: { AddCustomNtsModal, DoubleCheckModal },
  computed: { ...mapState(useFoodStore, ['onlyNewAddHeader']) },
  methods: {
    openAddNtsModal() {
      this.$refs.addCustomNtsModal.showModal()
    },
    openDoubleCheckModal(value, key, index) {
      this.$refs.doubleCheckModal.showDelNtsModal(value, key, index)
    },
    edit(value, key) {
      this.$refs.addCustomNtsModal.showModal(value, key)
    },
  },
}
</script>
