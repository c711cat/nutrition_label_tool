<template>
  <NavbarComponent />
  <MessageComponent ref="toast" />
  <AlertComponent />
  <RouterView class="routerViewStyle" />
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import MessageComponent from '@/components/MessagesComponent.vue'
import AlertComponent from '@/components/AlertComponent.vue'
export default {
  data() {
    return {}
  },
  components: { NavbarComponent, MessageComponent, AlertComponent },
}
</script>

<style lang="scss" scoped>
.routerViewStyle {
  padding: 100px 0px 100px 0px;
}
</style>
