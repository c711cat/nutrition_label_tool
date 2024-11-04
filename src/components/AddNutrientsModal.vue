<template>
  <div ref="nutrientsModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header flex-column">
          <div class="w-100 mb-3 p-2 d-flex justify-content-between">
            <h5 class="modal-title">新增其他營養素</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <section class="w-100 form-floating">
            <input
              @change="e => searchNutrient(e.target.value)"
              type="search"
              class="form-control"
              id="searchInput"
              placeholder="請輸入欲新增營養素搜尋"
            />
            <label for="searchInput">請輸入營養素搜尋</label>
          </section>
        </div>
        <div class="modal-body">
          <div class="list-group">
            <button
              v-for="item in filteredNutrients"
              :key="item"
              type="button"
              class="list-group-item list-group-item-action"
              aria-current="true"
            >
              {{ item }}
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary">新增</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import { useFoodStore } from '@/stores/foodDataStore'
import { mapState } from 'pinia'

export default {
  data() {
    return {
      modal: null,
      nutrients: [],
      filteredNutrients: [],
    }
  },
  computed: {
    ...mapState(useFoodStore, ['headerChineseAndEnglish']),
  },
  methods: {
    searchNutrient(nutrient) {
      const data = []
      Object.values(this.nutrients).filter(item => {
        if (item.match(nutrient)) {
          data.push(item)
        }
      })
      this.filteredNutrients = data
    },
    updateFilterData() {
      const data = { ...this.headerChineseAndEnglish }
      ;[
        'id',
        'category',
        'sample_name',
        'common_name',
        'content_description',
        'scrap_rate',
        'calories',
        'corrected_calories',
        'protein',
        'fat',
        'saturated_fat',
        'total_carbohydrates',
        'total_sugar',
        'sodium',
        'trans_fat',
      ].forEach(ele => {
        delete data[ele]
      })
      this.filteredNutrients = data
      this.nutrients = data
    },
    showModal() {
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    },
  },
  created() {
    this.updateFilterData()
  },
  mounted() {
    this.modal = new Modal(this.$refs.nutrientsModal)
  },
}
</script>
