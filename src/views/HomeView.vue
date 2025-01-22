<template>
  <main class="col-12 col-lg-10 mx-auto">
    <section>
      <HomeFirstSection />
    </section>

    <section>
      <h2>特色與功能介紹</h2>
      <div>
        <ul>
          <li>
            內建資料庫取：取自衛生福利部食品藥物管理署 - 食品營養成分資料庫 (
            2023 版 )【 更新日期為：2024 / 08 / 09 】
          </li>
          <li>
            產品使用的原料，可依輸入的重量自動排序，比例多的排前面，避免人工作業誤差。
          </li>
          <li>
            自動計算出八大營養標示 (
            熱量、蛋白質、脂肪、飽和脂肪、反式脂肪、碳水化合物、糖及鈉
            )，並提供營養標示下載。
          </li>
          <li>
            可自行增加呈現其他非八大營養標示的營養素。對日常生活中攝取食品所含營養成分有興趣了解者提供參考。
          </li>
          <li>
            額外呈現的營養素，若屬於與熱量計算有關者，例如：膳食纖維、糖醇、酒精、有機酸，則可依呈現的內容，計算出相符之熱量。讓使用者更清楚了解營養標示的相關知識及規定。
          </li>
          <li>
            另外，若有標示酒精及有機酸，依法規：於營養標示格式外明顯處註明。
          </li>
          <li>
            若內建資料庫中查無相符食物，可提供自定義食材建檔使用。在使用上更為靈活。
          </li>
          <li>
            此網站不會儲存或搜集任何使用者輸入的產品資料，其資料只會保存在使用者的電腦或手機中，只有自己可查看，不用擔心配方外流問題。
          </li>
        </ul>
      </div>
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
export default {
  data() {
    return {}
  },
  components: { HomeFirstSection },
}
</script>

<style lang="scss" scoped>
a:hover {
  filter: brightness(1.7);
}
</style>
