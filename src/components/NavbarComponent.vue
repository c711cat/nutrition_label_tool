<template>
  <nav
    class="d-none d-lg-block px-3 navbar navbar-expand-lg fixed-top bg-light"
  >
    <div class="container-fluid">
      <div class="navbar-collapse">
        <div class="navbar-nav align-items-center">
          <router-link
            to="/"
            class="bi bi-house-fill fs-4 text-secondary nav-link"
            :class="$route.path === '/' ? 'active fw-bold' : ''"
          ></router-link>
          <router-link
            to="/nutrition_label"
            class="nav-link"
            :class="$route.path === '/nutrition_label' ? 'active fw-bold' : ''"
          >
            新增營養標示
          </router-link>
          <router-link
            to="/product_list"
            class="nav-link"
            :class="$route.path === '/product_list' ? 'active fw-bold' : ''"
          >
            產品列表
          </router-link>
          <router-link
            to="/customize_list"
            class="nav-link"
            :class="$route.path === '/customize_list' ? 'active fw-bold' : ''"
          >
            自定義資料庫
          </router-link>
          <router-link
            v-if="myAddedNts > 0"
            to="/added_customize_nts"
            class="nav-link"
            :class="
              $route.path === '/added_customize_nts' ? 'active fw-bold' : ''
            "
          >
            已新增營養素清單
          </router-link>
          <router-link
            to="/QA"
            class="nav-link"
            :class="$route.path === '/QA' ? 'active fw-bold' : ''"
          >
            QA
          </router-link>
        </div>
      </div>
      <form v-if="showSearch" class="" role="search">
        <div class="position-relative col-lg-auto">
          <i class="bi bi-search position-absolute text-secondary"></i>
          <input
            @input="search($event)"
            class="form-control me-2 searchInput"
            type="search"
            :placeholder="currentPlaceHolder"
            aria-label="Search"
          />
        </div>
      </form>
    </div>
  </nav>
  <nav
    v-if="$route.path === '/'"
    class="moveNav py-1 d-block d-lg-none navbar bg-light bg-opacity-75 fixed-top"
    :class="{ hidden: isNavHidden }"
  >
    <div class="container-fluid w-100">
      <p class="text-center w-100 mb-0">營樣標示工具</p>
      <p class="text-center w-100 mb-0">Nutrition Label Tool</p>
    </div>
  </nav>

  <nav class="d-block d-lg-none navbar fixed-bottom bg-light">
    <div class="container-fluid w-100">
      <div class="col-12 d-flex align-items-center text-center">
        <router-link
          to="/"
          class="col nav-link"
          :class="$route.path === '/' ? 'active fw-bold' : ''"
        >
          <i class="bi bi-house-fill fs-4"></i>
          <p class="xs-md-textStyle mb-0 adjustFZ">首頁</p>
        </router-link>
        <router-link
          to="/nutrition_label"
          class="col nav-link"
          :class="$route.path === '/nutrition_label' ? 'active fw-bold' : ''"
          aria-current="page"
        >
          <i class="bi bi-plus-square fs-4"></i>
          <p class="xs-md-textStyle mb-0 adjustFZ">新增標示</p>
        </router-link>
        <router-link
          to="/product_list"
          class="col nav-link"
          :class="$route.path === '/product_list' ? 'active fw-bold' : ''"
        >
          <i class="bi bi-postcard fs-4"></i>
          <p class="xs-md-textStyle mb-0 adjustFZ">產品列表</p>
        </router-link>

        <router-link
          to="/customize_list"
          class="col nav-link"
          :class="$route.path === '/customize_list' ? 'active fw-bold' : ''"
        >
          <i class="bi bi-pen fs-4"></i>
          <p class="xs-md-textStyle mb-0 adjustFZ">自定義</p>
        </router-link>
        <router-link
          v-if="myAddedNts > 0"
          to="/added_customize_nts"
          class="col nav-link"
          :class="
            $route.path === '/added_customize_nts' ? 'active fw-bold' : ''
          "
        >
          <i class="bi bi-folder-plus fs-4"></i>
          <p class="xs-md-textStyle mb-0 adjustFZ">＋營養素</p>
        </router-link>
        <router-link
          to="/QA"
          class="col nav-link"
          :class="$route.path === '/QA' ? 'active fw-bold' : ''"
        >
          <i class="bi bi-question-circle fs-4"></i>
          <p class="xs-md-textStyle mb-0 adjustFZ">QA</p>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { useCustomizeStore } from '@/stores/customizeStore'
import { useFoodStore } from '@/stores/foodDataStore'
import { mapActions } from 'pinia'

export default {
  data() {
    return {
      myAddedNts: 0,
      lastScrollY: 0, // 記錄上一次Ｙ滾動位置
      isNavHidden: false, // 控制 navbar 是否隱藏
    }
  },
  computed: {
    showSearch() {
      if (this.$route.path === '/') {
        return false
      }
      if (this.$route.path === '/nutrition_label') {
        return false
      }
      if (this.$route.path === '/mark_items') {
        return false
      }
      if (this.$route.path === '/QA') {
        return false
      } else {
        return true
      }
    },
    currentPlaceHolder() {
      if (this.$route.path === '/product_list') {
        return '產品名稱'
      }
      if (this.$route.path === '/customize_list') {
        return '自定義資料品名'
      }
      if (this.$route.path === '/added_customize_nts') {
        return '中文或英文營養素名稱'
      } else {
        return ''
      }
    },
  },
  methods: {
    ...mapActions(useFoodStore, ['searchProducts']),
    ...mapActions(useCustomizeStore, ['searchAddedNts', 'searchCustomizeList']),
    getMyAddedNtsList() {
      const data = JSON.parse(localStorage.getItem('myAddedNts')) || []
      this.myAddedNts = data.length
    },
    search(e) {
      const text = e.target.value.trim()
      const currentPath = this.$router.currentRoute._value.fullPath
      if (currentPath === '/added_customize_nts') {
        this.searchAddedNts(text)
      }
      if (currentPath === '/customize_list') {
        this.searchCustomizeList(text)
      }
      if (currentPath === '/product_list') {
        this.searchProducts(text)
      }
    },
    handleScroll() {
      const currentScrollY = window.scrollY
      if (currentScrollY > 150) {
        // 向下滾動 Y 大於 150：隱藏 navbar
        this.isNavHidden = true
      }
      if (currentScrollY < this.lastScrollY) {
        // 向上滾動：一律顯示 navbar
        this.isNavHidden = false
      }
      this.lastScrollY = currentScrollY
    },
  },
  created() {
    this.getMyAddedNtsList()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
<style lang="scss" scoped>
.xs-md-textStyle {
  font-size: 14px;
}

.bi-house-fill:hover {
  color: #00309f !important;
}

.nav-link:hover {
  color: #00309f !important;
  font-weight: bold;
}

.active {
  color: #00309f !important;
}

.bi-search {
  top: 7px;
  left: 11px;
}

.searchInput {
  padding-left: 33px;
}

.adjustFZ {
  font-size: clamp(12px, 2vw, 14px);
}

.moveNav {
  transition: transform 0.3s ease-in-out;
  font-size: clamp(14px, 2vw, 16px);
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.moveNav.hidden {
  transform: translateY(-100%);
  box-shadow: none;
}
</style>
