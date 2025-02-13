<template>
  <main class="mx-auto">
    <section class="mb-5 col-11 col-lg-10 mx-auto">
      <HomeFirstSection />
    </section>

    <section>
      <HomeSecondSection />
    </section>
    <section>
      <HomeNotice />
    </section>
  </main>
</template>
<script>
import HomeFirstSection from '@/components/HomeFirstSection.vue'
import HomeSecondSection from '@/components/HomeSecondSection.vue'
import HomeNotice from '@/components/HomeNotice.vue'
export default {
  data() {
    return {}
  },
  components: { HomeFirstSection, HomeSecondSection, HomeNotice },
}
</script>

<style lang="scss" scoped>
a:hover {
  filter: brightness(1.7);
}
</style>
