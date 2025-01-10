<template>
  <main
    class="wrap ms-auto mt-2 me-2 d-flex justify-content-end align-items-center"
    :class="bar ? 'openBar' : ''"
  >
    <form :class="bar ? 'show' : ''" class="me-2 p-1 search-form">
      <input
        class="form-control"
        placeholder="請輸入關鍵字"
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
export default {
  data() {
    return {
      bar: false,
    }
  },
  methods: {
    showSearchBar() {
      this.bar = true
    },
    closeSearchBar() {
      this.bar = false
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
  width: 200px;
  opacity: 1;
}

.openBar {
  width: 290px;
}
</style>
