<template>
  <div
    ref="doubleCheckModal"
    class="modal fade"
    data-bs-backdrop="static"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">再次確認</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>資料確認無誤，並送出</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            v-if="custom"
            @click="customCheckedOK"
            type="button"
            class="btn btn-primary"
          >
            確定送出自定義品項
          </button>
          <button
            v-else
            @click="checkedOK"
            type="button"
            class="btn btn-primary"
          >
            確定送出
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import { useFoodStore } from '@/stores/foodDataStore'
import { useCustomStore } from '@/stores/customStore'
import { mapActions } from 'pinia'
export default {
  data() {
    return {
      modal: {},
      custom: false,
    }
  },
  methods: {
    ...mapActions(useFoodStore, ['doubleCheckedOK']),
    ...mapActions(useCustomStore, ['customDoubleCheckedOK']),
    showModal(boolean) {
      if (boolean) {
        this.custom = boolean
      } else {
        this.custom = false
      }
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    },
    checkedOK() {
      this.doubleCheckedOK()
      this.modal.hide()
      this.$router.push('/product_list')
    },
    customCheckedOK() {
      this.customDoubleCheckedOK()
      this.modal.hide()
      this.$router.push('/custom_list')
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.doubleCheckModal)
  },
}
</script>
