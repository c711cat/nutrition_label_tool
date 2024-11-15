<template>
  <NavbarComponent />
  <MessageComponent ref="toast" />
  <AlertComponent />
  <RouterView />
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
