<template>
  <div
    ref="toast"
    class="toast align-items-center"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex">
      <div class="toast-body d-flex align-items-center">
        <i class="fs-4 me-2" :class="iconStyle(msg.style)"></i>
        <p class="mb-0 fs-6">{{ msg.title }}</p>
      </div>
      <button
        type="button"
        class="btn-close me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>
<script>
import Toast from 'bootstrap/js/dist/toast'

export default {
  data() {
    return {
      toastEle: null,
    }
  },
  props: ['msg'],
  methods: {
    iconStyle(style) {
      if (style === 'success') {
        return 'bi bi-check-circle-fill text-success'
      }
      if (style === 'failure') {
        return 'bi bi-x-circle-fill text-danger'
      } else {
        return ''
      }
    },
  },
  mounted() {
    const myToast = this.$refs.toast
    this.toastEle = new Toast(myToast, {
      delay: 6000,
    })
    this.toastEle.show()
  },
}
</script>
