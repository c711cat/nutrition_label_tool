<template>
  <main
    v-if="showSearch"
    class="wrap ms-auto mt-3 me-3 d-flex justify-content-end align-items-center"
    :class="bar ? 'openBar' : ''"
  >
    <form :class="bar ? 'show' : ''" class="me-2 p-1 search-form">
      <input
        @input="search($event)"
        class="form-control w-100"
        :placeholder="currentPlaceHolder"
        type="search"
        name="searchBar"
        id="searchBar"
      />
    </form>
    <button
      v-if="!bar"
      @click="showSearchBar"
      type="button"
      class="btn btn-outline-primary bi bi-search rounded-circle bg-primary bg-opacity-25 border-0"
    ></button>
    <button
      v-if="bar"
      @click="closeSearchBar"
      type="button"
      class="btn btn-outline-primary rounded bg-primary bg-opacity-25 border-0"
    >
      關閉
    </button>
  </main>
</template>

<script>
import { useCustomizeStore } from '@/stores/customizeStore'
import { useFoodStore } from '@/stores/foodDataStore'
import { mapActions } from 'pinia'
export default {
  data() {
    return {
      bar: false,
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
  },
  methods: {
    ...mapActions(useFoodStore, ['searchProducts']),
    ...mapActions(useCustomizeStore, ['searchAddedNts', 'searchCustomizeList']),
    showSearchBar() {
      this.bar = true
    },
    closeSearchBar() {
      this.bar = false
    },
    search(e) {
      console.log(e)
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
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 80px;
  transition: 1s;
}

.search-form {
  width: 0;
  overflow: hidden;
  opacity: 0;
  transition: 1s;
}

.search-form.show {
  width: 220px;
  opacity: 1;
}

.openBar {
  width: 290px;
}
</style>
