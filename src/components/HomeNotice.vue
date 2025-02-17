<template>
  <div class="pt-5 pb-3 bg-light">
    <div class="mx-auto pt-3 col-11 col-lg-10">
      <h2 class="text-center mb-5">營養標示須知</h2>

      <Swiper
        style="padding: 0px 75px"
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
            spaceBetween: 75,
          },
          '780': {
            slidesPerView: 2,
            spaceBetween: 75,
          },
          '1255': {
            slidesPerView: 3,
            spaceBetween: 75,
          },
          '1600': {
            slidesPerView: 4,
            spaceBetween: 75,
          },
        }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide
          v-for="item in noitices"
          :key="item"
          class="d-flex flex-column align-items-center"
        >
          <div
            class="imgBox bg-primary100 d-flex justify-content-center align-items-center mb-4"
          >
            <img :src="item.img" alt="noitice icons" />
          </div>
          <h4 class="mb-3">{{ item.title }}</h4>
          <p
            v-for="text in item.content"
            :key="text"
            class="mb-1"
            v-html="text"
          ></p>
        </SwiperSlide>

        <div class="swiper-button-prev text-dark"></div>
        <div class="swiper-button-next text-dark"></div>
        <div class="swiper-pagination"></div>
      </Swiper>
    </div>
  </div>
</template>
<script>
import admin_settings from '@/assets/img/admin-settings-male-48.png'
import paper_plane from '@/assets/img/paper-plane-48.png'
import law from '@/assets/img/law-48.png'
import responsible from '@/assets/img/apply-48.png'
import report_card from '@/assets/img/report-card-48.png'
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
      noitices: [
        {
          img: admin_settings,
          title: '自主管理',
          content: [
            '食品業者須秉持自主管理之精神，確認產品品質、衛生安全及標示，並對其負完全責任。',
          ],
        },
        {
          img: report_card,
          title: '標示值產生方式',
          content: [
            `依據
            <a href="https://www.foodlabel.org.tw/FdaFrontEndApp/Law/Edit?SystemId=f27b8c5e-35c2-4a86-9b8b-d7cbbef409ab&clPublishStatus=undefined" target="_blank" class="text-decoration-none">
            「包裝食品營養標示應遵行事項」第 10 點
            </a>
            ，包裝食品各項營養標示值產生方式，得以檢驗分析或計算方式依實際需要為之。`,
          ],
        },
        {
          img: responsible,
          title: '業者責任',
          content: [
            '產品倘屬完整包裝食品，應依上開規定辦理標示。',
            '倘業者欲參考食品營養成分資料庫之樣品數值進行計算，仍應自行確認自家產品實際情況是否適用，且業者須對產品標示值負完全責任。',
          ],
        },
        {
          img: law,
          title: '食安法',
          content: [
            '上述內容未提及之處，仍請就整體標示宣稱所傳達之訊息，依食品安全衛生管理法相關規定辦理。',
          ],
        },
        {
          img: paper_plane,
          title: '諮詢服務',
          content: [
            `食品標示法規諮詢專線：`,

            `0800-035-958
             <a href="tel:0800035958" target="_blank" class="text-decoration-none text-primary ms-1">
                <i class="bi bi-telephone-forward fs-5 ms-1"></i>
             </a>`,

            `03-561-9633
            <a href="tel:035619633" target="_blank" class="text-decoration-none text-primary ms-1">
              <i class="bi bi-telephone-forward fs-5 ms-1"></i>
            </a>`,

            `食品標示諮詢信箱：`,

            `foodlabel@hibox.biz<a href="mailto:foodlabel@hibox.biz" target="_blank" class="text-decoration-none text-primary">
               <i class="bi bi-envelope-arrow-up fs-5 ms-2"></i>
            </a>`,

            `<a href="http://www.foodlabel.org.tw" target="_blank" class="text-decoration-none">食品標示諮詢服務平台</a>`,

            '以上資訊歡迎多加利用。',
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
.imgBox {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

// 使用深層選擇器覆蓋 swiper 內建樣式
::v-deep .swiper-button-next,
::v-deep .swiper-button-prev {
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
::v-deep .swiper-button-next:hover,
::v-deep .swiper-button-prev:hover {
  color: #00309f !important;
}

.swiper {
  --swiper-pagination-color: #00309f;
}
</style>
