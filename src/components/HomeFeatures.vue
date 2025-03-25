<template>
  <div class="bg-primary100 pt-5 pb-3">
    <div class="pt-3 col-11 col-lg-10 mx-auto">
      <h2 class="text-center">特色與功能介紹</h2>
      <Swiper
        style="padding: 0px 35px"
        class="d-flex align-items-center m-0 pb-5"
        :modules="modules"
        :slides-per-view="5"
        :space-between="40"
        :grabCursor="true"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        :pagination="{ clickable: true, el: '.swiper-pagination' }"
        :scrollbar="false"
        :autoplay="{
          delay: 60000,
          disableOnInteraction: false,
        }"
        :breakpoints="{
          '0': {
            slidesPerView: 1,
            spaceBetween: 45,
          },
          '780': {
            slidesPerView: 2,
            spaceBetween: 45,
          },
          '1255': {
            slidesPerView: 3,
            spaceBetween: 45,
          },
          '1700': {
            slidesPerView: 4,
            spaceBetween: 45,
          },
        }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="item in content" :key="item">
          <div
            class="contentBox mt-5 border border-light border-5 rounded-4 position-relative pt-4 d-flex justify-content-center align-items-center"
          >
            <h4 class="title bg-primary100 px-2 position-absolute">
              <i :class="item.icon"></i>
              {{ item.title }}
            </h4>
            <div class="px-4 py-2">
              <p v-for="text in item.text" :key="text">
                {{ text }}
              </p>
            </div>
          </div>
        </SwiperSlide>

        <div class="swiper-button-prev text-dark"></div>
        <div class="swiper-button-next text-dark"></div>
        <div class="swiper-pagination"></div>
      </Swiper>
    </div>
  </div>
</template>
<script>
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
export default {
  data() {
    return {
      content: [
        {
          icon: 'bi bi-clipboard2-data-fill',
          title: '豐富的資料',
          text: [
            '內建 2000 多筆常見食品資料。',
            '取自衛生福利部食品藥物管理署 - 食品營養成分資料庫 ( 2023 版 )',
          ],
        },
        {
          icon: 'bi bi-bookmark-plus-fill',
          title: '可新增食品資料',
          text: [
            '若內建資料庫中查無相符食物，可提供自定義食材建檔使用。',
            '在使用上更為靈活。',
          ],
        },
        {
          icon: 'bi bi-sort-down',
          title: '自動排序成分',
          text: [
            '產品使用的原料，可依輸入的重量自動排序，比例多的排前面。',
            '避免人工作業誤差。',
          ],
        },
        {
          icon: 'bi bi-calculator-fill',
          title: '自動計算營養標示',
          text: [
            '可計算出必要的 8 大營養標示：',
            '熱量、蛋白質、脂肪、飽和脂肪、反式脂肪、碳水化合物、糖及鈉。',
            '可下載計算出的營養標示圖片。',
          ],
        },
        {
          icon: 'bi bi-file-earmark-diff-fill',
          title: '自由增減標示',
          text: [
            '可自行增加呈現其他非 8 大營養標示的營養素。',
            '提供對日常生活中攝取食品所含營養成分有興趣者參考。',
          ],
        },
        {
          icon: 'bi bi-file-spreadsheet-fill',
          title: '熱量計算符合規定',
          text: [
            '額外呈現的營養素，若屬於與熱量計算有關者，計算方式則有不同。',
            '例如：膳食纖維、糖醇、酒精及有機酸，則可依呈現的內容，計算出相符之熱量。',
            '讓使用者更清楚了解營養標示的相關知識及規定。',
          ],
        },
        {
          icon: 'bi bi-clipboard-check-fill',
          title: '標示符合法規',
          text: ['若有標示酒精及有機酸，依法規：於營養標示格式外明顯處註明。'],
        },
        {
          icon: 'bi bi-eye-slash-fill',
          title: '保障個人隱私',
          text: [
            '此網站不會儲存或搜集任何使用者輸入的產品資料。',
            '其資料只會保存在使用者的電腦或手機中，只有自己可查看，不用擔心配方外流問題。',
          ],
        },
      ],
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: { onSwiper() {}, onSlideChange() {} },
}
</script>

<style lang="scss" scoped>
.contentBox {
  min-height: 270px;
}

.title {
  top: -14px;
}

// 使用深層選擇器覆蓋 swiper 內建樣式
::v-deep(.swiper-button-next),
::v-deep(.swiper-button-prev) {
  --swiper-navigation-size: 28px;
}

.swiper-button-next {
  position: absolute;
  right: 0px;
}

.swiper-button-prev {
  position: absolute;
  left: 0px;
}

// 使用深層選擇器覆蓋 swiper 內建樣式
::v-deep(.swiper-button-next:hover),
::v-deep(.swiper-button-prev:hover) {
  color: #00309f !important;
}

.swiper {
  --swiper-pagination-color: #00309f;
}
</style>
