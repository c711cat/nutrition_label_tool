<template>
  <div
    ref="doubleCheckModal"
    class="modal fade"
    data-bs-backdrop="static"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="bg-primary text-white modal-header" data-bs-theme="dark">
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
        <div class="modal-footer bg-light">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            :disabled="loadingStatus"
          >
            取消
          </button>
          <button
            v-if="customizeForm"
            @click="customizeCheckedOK"
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
            :disabled="loadingStatus"
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
            v-if="delCustomizeIndex !== ''"
            @click="delCustomizeItem"
            type="button"
            class="btn btn-danger"
          >
            確定刪除自定義品項
          </button>
          <button
            v-if="delNtIndex !== ''"
            @click="checkedDelCustomizeNt"
            type="button"
            class="btn btn-danger"
          >
            確定刪除此營養素
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import { useFoodStore } from '@/stores/foodDataStore'
import { useCustomizeStore } from '@/stores/customizeStore'
import { mapActions, mapState } from 'pinia'
export default {
  data() {
    return {
      modal: {},
      customizeForm: false,
      labelForm: false,
      text: '',
      delIndex: '',
      delCustomizeIndex: '',
      delNtIndex: '',
      title: '',
    }
  },
  computed: { ...mapState(useFoodStore, ['loadingStatus']) },
  methods: {
    ...mapActions(useFoodStore, ['doubleCheckedOK', 'del', 'delItemOfNts']),
    ...mapActions(useCustomizeStore, [
      'customizeDoubleCheckedOK',
      'delItemOfCustomizeList',
      'delCustomizeNt',
    ]),
    showModal(customize) {
      this.text = '資料確認無誤，並送出'
      if (customize) {
        this.customizeForm = true
      } else if (!customize && this.delIndex === '') {
        this.labelForm = true
      }
      this.modal.show()
    },
    checkedOK() {
      this.doubleCheckedOK()
      this.modal.hide()
      this.$router.push('/product_list')
    },
    customizeCheckedOK() {
      this.customizeDoubleCheckedOK()
      this.modal.hide()
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
    showDelCustomizeModal(item, index) {
      this.title = item.sample_name
      this.delCustomizeIndex = index
      this.text = '確定刪除' + '『 ' + item.sample_name + ' 』'
      this.modal.show()
    },
    delCustomizeItem() {
      this.delItemOfCustomizeList(this.title, this.delCustomizeIndex)
      this.modal.hide()
    },
    // 自行新增營養素 modal 傳來的參數
    showDelNtModal(value, key, index) {
      this.title = key + ' : ' + value
      this.delNtIndex = index
      this.text = '確定刪除' + '『 ' + key + ' : ' + value + ' 』'
      this.modal.show()
    },
    // 自行新增營養素清單頁面傳來的參數
    showDelAddedNtModal(index, item) {
      this.title = item.enName + ' : ' + item.chName
      this.delNtIndex = index
      this.text = '確定刪除' + '『 ' + item.enName + ' : ' + item.chName + ' 』'
      this.modal.show()
    },
    checkedDelCustomizeNt() {
      this.delCustomizeNt(this.delNtIndex, this.title)
      this.hideModal()
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
