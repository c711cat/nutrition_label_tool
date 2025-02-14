<template>
  <NavbarComponent />
  <SearchBarComponent class="d-block d-lg-none fixed-top" />
  <MessageComponent ref="toast" />
  <AlertComponent />
  <RouterView class="routerViewStyle" />
  <a target="_blank" href="https://icons8.com/icon/1274/paper-plane"></a>
  noitice icons by <a target="_blank" href="https://icons8.com">Icons8</a>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import MessageComponent from '@/components/MessagesComponent.vue'
import AlertComponent from '@/components/AlertComponent.vue'
import SearchBarComponent from '@/components/SearchBarComponent.vue'
export default {
  data() {
    return {}
  },
  components: {
    NavbarComponent,
    MessageComponent,
    AlertComponent,
    SearchBarComponent,
  },
}
</script>

<style lang="scss" scoped>
.routerViewStyle {
  padding: 100px 0px 100px 0px;
}
</style>
