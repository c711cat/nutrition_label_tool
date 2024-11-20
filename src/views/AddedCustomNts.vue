<template>
  <div class="container col-12 col-lg-5">
    <h3 class="text-center">已新增的營養素</h3>
    <div class="text-end">
      <button
        @click="openAddNtsModal"
        type="button"
        class="btn btn-outline-primary mb-3"
      >
        新增
      </button>
    </div>

    <div v-for="(value, key) in newHeader" :key="key">
      <div
        class="d-flex flex-wrap align-items-center bg-light rounded p-3 mb-2"
      >
        <p class="mb-0 col">{{ key }}</p>
        <p class="mb-0 col">{{ value }}</p>
        <div class="text-end">
          <button type="button" class="btn btn-outline-primary me-3">
            編輯
          </button>
          <button type="button" class="btn btn-outline-danger">刪除</button>
        </div>
      </div>
    </div>
  </div>
  <AddCustomNtsModal ref="addCustomNtsModal" />
</template>
<script>
import AddCustomNtsModal from '@/components/CustomNtsModal.vue'
export default {
  data() {
    return {
      newHeader: {},
    }
  },
  components: { AddCustomNtsModal },
  methods: {
    getOnlyNewHeader() {
      this.newHeader = JSON.parse(localStorage.getItem('myAddHeader')) || []
    },
    openAddNtsModal() {
      this.$refs.addCustomNtsModal.showModal()
    },
  },
  created() {
    this.getOnlyNewHeader()
  },
}
</script>
