<template>
  <div
    v-if="alert"
    class="alertPosition translate-middle alert alert-danger d-flex justify-content-between fade show"
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

<style lang="scss" scoped>
.alertPosition {
  position: fixed;
  top: 50%;
  left: 50%;
  max-width: 300px;
  z-index: 1056;
}
</style>
