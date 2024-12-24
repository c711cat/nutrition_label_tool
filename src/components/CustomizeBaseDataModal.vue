<template>
  <div
    ref="customizeBaseDataModal"
    class="modal fade col-12"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-fullscreen"
    >
      <div class="modal-content">
        <div class="modal-header border-0">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body p-0">
          <CustomizeView />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import CustomizeView from '@/views/CustomizeView.vue'

export default {
  data() {
    return {
      modal: null,
    }
  },
  components: { CustomizeView },
  methods: {
    showModal() {
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.customizeBaseDataModal)
  },
}
</script>
