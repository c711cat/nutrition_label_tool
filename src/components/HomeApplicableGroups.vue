<template>
  <h2 class="pt-4 text-center mb-4 w-100">營養標示工具適用對象</h2>
  <div class="pt-3 pb-4">
    <Swiper
      style="padding: 0px 35px"
      class="d-flex align-items-center m-0"
      :modules="modules"
      :slides-per-view="5"
      :space-between="40"
      :grabCursor="true"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :pagination="false"
      :scrollbar="false"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :breakpoints="{
        '0': {
          slidesPerView: 1,
          spaceBetween: 45,
        },
        '700': {
          slidesPerView: 2,
          spaceBetween: 45,
        },
        '1100': {
          slidesPerView: 3,
          spaceBetween: 45,
        },
        '1350': {
          slidesPerView: 4,
          spaceBetween: 45,
        },
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="item in firstContent" :key="item" class="pb-4">
        <div class="card cardStyle shadow border-0 rounded-3">
          <img
            class="section1Img object-fit-cover card-img-top rounded-top-3"
            :src="item.img"
            alt="carouselImg"
          />
          <div class="card-body">
            <h5 class="card-title my-2">
              {{ item.title }}
            </h5>
            <p class="card-text">
              {{ item.text }}
            </p>
          </div>
        </div>
      </SwiperSlide>
      <div class="swiper-button-prev text-dark"></div>
      <div class="swiper-button-next text-dark"></div>
    </Swiper>
  </div>
</template>
<script>
import nutritionFacts from '@/assets/img/nutrition facts.jpg'
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
      firstContent: [
        {
          title: '對於自製食物營養成分有興趣者',
          img: 'https://images.unsplash.com/photo-1563263427-708318a97183?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          text: '對於自製食物營養成分有興趣者，提供對日常生活中攝取食品所含營養成分之參考。',
        },
        {
          title: '特殊飲食控制者',
          img: 'https://images.unsplash.com/photo-1682342287771-ba352ea7e315?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          text: '特殊飲食控制者，例如：低醣飲食、低蛋白飲食、高蛋白飲食或低油飲食...等。',
        },
        {
          title: '暫無足夠經費送檢',
          img: 'https://images.unsplash.com/photo-1589047133531-570405874c6a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          text: '剛創業的業者，產品成分單純，例如：水餃、包子、饅頭、紅豆湯、果醬、泡菜...等，暫無足夠經費送檢，可先暫時利用此網站製作，待經費足夠再進行送檢。',
        },
        {
          title: '有興趣了解營養標示者',
          img: nutritionFacts,
          text: '想了解營養標示相關規定者。',
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
a:hover {
  filter: brightness(1.7);
}

.section1Img {
  height: 300px;
}

.cardStyle {
  height: 56vh;
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
</style>
