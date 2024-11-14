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
          <p>{{ text }}</p>
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
            v-if="customForm"
            @click="customCheckedOK"
            type="button"
            class="btn btn-primary"
          >
            確定送出自定義品項
          </button>
          <button
            v-if="labelForm"
            @click="checkedOK"
            type="button"
            class="btn btn-primary"
          >
            確定送出
          </button>
          <button
            v-if="delIndex !== ''"
            @click="delLableItem"
            type="button"
            class="btn btn-danger"
          >
            確定刪除
          </button>
          <button
            v-if="delCustomIndex !== ''"
            @click="delCustomItem"
            type="button"
            class="btn btn-danger"
          >
            確定刪除自定義品項
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
      customForm: false,
      labelForm: false,
      text: '',
      delIndex: '',
      delCustomIndex: '',
      title: '',
    }
  },
  methods: {
    ...mapActions(useFoodStore, ['doubleCheckedOK', 'del']),
    ...mapActions(useCustomStore, [
      'customDoubleCheckedOK',
      'delItemOfCustomList',
    ]),
    showModal(custom) {
      this.text = '資料確認無誤，並送出'
      if (custom) {
        this.customForm = true
      } else if (!custom && this.delIndex === '') {
        this.labelForm = true
      }
      this.modal.show()
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
    showDelModal(item, index) {
      this.title = item.title
      this.delIndex = index
      this.text = '確定刪除' + '『 ' + item.title + ' 』'
      this.modal.show()
    },
    delLableItem() {
      this.del(this.title, this.delIndex)
      this.modal.hide()
    },
    showDelCustomModal(item, index) {
      this.title = item.sample_name
      this.delCustomIndex = index
      this.text = '確定刪除' + '『 ' + item.sample_name + ' 』'
      this.modal.show()
    },
    delCustomItem() {
      this.delItemOfCustomList(this.title, this.delCustomIndex)
      this.modal.hide()
    },
    hideModal() {
      this.modal.hide()
    },
  },

  mounted() {
    this.modal = new Modal(this.$refs.doubleCheckModal)
  },
}
</script>
