<template>
  <div ref="nutrientsModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增其他營養素</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="list-group">
            <button
              v-for="item in updateHeaderChineseAndEnglish"
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
import { mapActions, mapState } from 'pinia'

export default {
  data() {
    return {
      modal: null,
      nutrients: {},
    }
  },
  computed: {
    ...mapState(useFoodStore, ['headerChineseAndEnglish']),
    updateHeaderChineseAndEnglish() {
      console.log(this.headerChineseAndEnglish)
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
      console.log(data)
      return data
    },
  },
  methods: {
    ...mapActions(useFoodStore, ['fetchFoods']),
    showModal() {
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    },
  },
  created() {
    this.fetchFoods()
  },
  mounted() {
    this.modal = new Modal(this.$refs.nutrientsModal)
  },
}
</script>
