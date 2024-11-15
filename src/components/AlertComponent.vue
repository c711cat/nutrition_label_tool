<template>
  <div
    v-if="alert"
    class="pr-3 alert alert-danger d-flex justify-content-between fade show position-absolute top-50 start-50 translate-middle z-3"
    role="alert"
  >
    <p class="mb-0 fw-bold pe-3">還有必填的欄位喔 !</p>

    <button
      @click="closeAlert"
      type="button"
      class="btn-close"
      aria-label="Close"
    ></button>
  </div>
</template>

<script>
import { useMsgStore } from '@/stores/messageStore'
import { mapState, mapActions } from 'pinia'
export default {
  data() {
    return {}
  },

  computed: {
    ...mapState(useMsgStore, ['alert']),
  },
  methods: {
    ...mapActions(useMsgStore, ['closeAlert']),
  },
}
</script>
