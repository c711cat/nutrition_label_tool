<template>
  <NavbarComponent />
  <RouterView />
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
export default {
  data() {
    return {}
  },
  components: { NavbarComponent },
}
</script>
