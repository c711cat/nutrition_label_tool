<template>
  <NavbarComponent />
  <MessageComponent ref="toast" />
  <RouterView />
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import MessageComponent from '@/components/MessagesComponent.vue'
export default {
  data() {
    return {}
  },
  components: { NavbarComponent, MessageComponent },
}
</script>
