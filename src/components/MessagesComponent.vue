<template>
  <div class="sticky-top">
    <div aria-live="polite" aria-atomic="true" class="position-relative">
      <div class="toast-container top-0 end-0 p-3">
        <ToastComponent v-for="item in localMsg" :key="item" :msg="item" />
      </div>
    </div>
  </div>
</template>

<script>
import ToastComponent from './ToastComponent.vue'
import { useMsgStore } from '@/stores/messageStore'
import { mapState } from 'pinia'
export default {
  data() {
    return {
      toastEle: null,
      localMsg: [],
    }
  },
  components: { ToastComponent },
  computed: {
    ...mapState(useMsgStore, ['message']),
  },
  watch: {
    message: {
      handler(val) {
        this.localMsg = [...val]
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>
