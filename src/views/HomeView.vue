<template>
  <main class="mx-auto">
    <section class="mb-5 col-11 col-lg-10 mx-auto">
      <HomeFirstSection />
    </section>
    <section>
      <HomeExampleVideo />
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
import HomeFirstSection from '@/components/HomeApplicableGroups.vue'
import HomeSecondSection from '@/components/HomeFeatures.vue'
import HomeNotice from '@/components/HomeNotice.vue'
import HomeExampleVideo from '@/components/HomeExampleVideo.vue'

export default {
  data() {
    return {}
  },
  components: {
    HomeFirstSection,
    HomeSecondSection,
    HomeNotice,
    HomeExampleVideo,
  },
}
</script>

<style lang="scss" scoped>
a:hover {
  filter: brightness(1.7);
}
</style>
