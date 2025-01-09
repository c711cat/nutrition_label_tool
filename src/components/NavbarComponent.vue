<template>
  <nav class="px-3 navbar navbar-expand-lg fixed-top" :class="navBg">
    <div class="container-fluid">
      <div class="collapse navbar-collapse">
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
        </div>
      </div>
      <form
        v-if="showSearch"
        class="d-flex col-12 col-md-10 col-lg-auto mx-auto"
        role="search"
      >
        <div class="mx-auto position-relative col-12 col-md-10 col-lg-auto">
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
  <nav class="d-block d-lg-none navbar fixed-bottom bg-light">
    <div class="container-fluid w-100">
      <div class="col-12 d-flex align-items-center text-center">
        <router-link
          to="/"
          class="col bi bi-house-fill fs-2 text-dark"
          :class="$route.path === '/' ? 'active fw-bold' : ''"
        ></router-link>
        <router-link
          to="/nutrition_label"
          class="col nav-link"
          :class="$route.path === '/nutrition_label' ? 'active fw-bold' : ''"
          aria-current="page"
        >
          <i class="bi bi-plus-square fs-4"></i>
          <p class="xs-md-textStyle mb-0">新增標示</p>
        </router-link>
        <router-link
          to="/product_list"
          class="col nav-link"
          :class="$route.path === '/product_list' ? 'active fw-bold' : ''"
        >
          <i class="bi bi-postcard fs-4"></i>
          <p class="xs-md-textStyle mb-0">產品列表</p>
        </router-link>

        <router-link
          to="/customize_list"
          class="col nav-link"
          :class="$route.path === '/customize_list' ? 'active fw-bold' : ''"
        >
          <i class="bi bi-pen fs-4"></i>
          <p class="xs-md-textStyle mb-0">自定義</p>
        </router-link>
        <router-link
          v-if="myAddedNts > 0"
          to="/added_customize_nts"
          class="col nav-link"
          :class="
            $route.path === '/added_customize_nts' ? 'active fw-bold' : ''
          "
        >
          <i class="bi bi-list-check fs-4"></i>
          <p class="xs-md-textStyle mb-0">新增營養素</p>
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
    navBg() {
      if (this.$route.path === '/' && window.innerWidth < 992) {
        return 'bg-white'
      }
      if (this.$route.path === '/nutrition_label' && window.innerWidth < 992) {
        return 'bg-white'
      }
      if (this.$route.path === '/mark_items' && window.innerWidth < 992) {
        return 'bg-white'
      } else {
        return 'bg-light'
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
  },
  created() {
    this.getMyAddedNtsList()
  },
}
</script>
<style lang="scss" scoped>
.xs-md-textStyle {
  font-size: 14px;
}

.bi-house-fill:hover {
  color: #111a9e !important;
}

.nav-link:hover {
  color: #111a9e !important;
  font-weight: bold;
}

.active {
  color: #111a9e !important;
}

.bi-search {
  top: 7px;
  left: 11px;
}

.searchInput {
  padding-left: 33px;
}
</style>
