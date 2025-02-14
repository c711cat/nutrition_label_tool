<template>
  <div class="d-flex flex-column justify-content-between wrap">
    <div>
      <NavbarComponent />
      <SearchBarComponent class="d-block d-lg-none fixed-top" />
      <MessageComponent ref="toast" />
      <AlertComponent />
      <RouterView class="routerViewStyle" />
    </div>
    <div>
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import MessageComponent from '@/components/MessagesComponent.vue'
import AlertComponent from '@/components/AlertComponent.vue'
import SearchBarComponent from '@/components/SearchBarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  data() {
    return {}
  },
  components: {
    NavbarComponent,
    MessageComponent,
    AlertComponent,
    SearchBarComponent,
    FooterComponent,
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
}

.routerViewStyle {
  padding: 100px 0px 0px 0px;
}
</style>
