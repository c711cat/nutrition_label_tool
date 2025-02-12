<template>
  <main class="mx-auto">
    <section class="mb-5 col-11 col-lg-10 mx-auto">
      <HomeFirstSection />
    </section>

    <section>
      <HomeSecondSection />
    </section>
    <section>
      <h2>相關規定須知</h2>
      <div>
        <ul>
          <li>
            食品業者須秉持自主管理之精神，確認產品品質、衛生安全及標示，並對其負完全責任。
          </li>
          <li>
            依據「包裝食品營養標示應遵行事項」第10點，包裝食品各項營養標示值產生方式，得以檢驗分析或計算方式依實際需要為之。
          </li>
          <li>
            產品倘屬完整包裝食品，應依上開規定辦理標示。倘業者欲參考食品營養成分資料庫之樣品數值進行計算，仍應自行確認自家產品實際情況是否適用，且業者須對產品標示值負完全責任。
          </li>
          <li>
            上述內容未提及之處，仍請就整體標示宣稱所傳達之訊息，依食品安全衛生管理法相關規定辦理。
          </li>
          <li>
            食藥署-食品標示法規諮詢服務專線0800-035-958、03-561-9633、食品標示諮詢服務信箱foodlabel@hibox.biz及
            <a
              class="text-decoration-none fw-bold"
              href="http://www.foodlabel.org.tw"
              target="_blank"
            >
              食品標示諮詢服務平台
            </a>
            ，以上資訊歡迎多加利用。
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>
<script>
import HomeFirstSection from '@/components/HomeFirstSection.vue'
import HomeSecondSection from '@/components/HomeSecondSection.vue'
export default {
  data() {
    return {}
  },
  components: { HomeFirstSection, HomeSecondSection },
}
</script>

<style lang="scss" scoped>
a:hover {
  filter: brightness(1.7);
}
</style>
