<template>
  <div ref="productModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div
          class="p-0 modal-header bg-primary text-white flex-column align-items-start"
        >
          <div
            class="w-100 mb-3 pt-3 ps-3 pe-3 d-flex justify-content-between"
            data-bs-theme="dark"
          >
            <h4 class="modal-title">新增或刪除營養素</h4>
            <button
              type="button"
              class="btn-close pt-3"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <section class="w-100 p-2 bg-light form-floating">
            <input
              @change="search($event)"
              type="search"
              class="form-control"
              id="searchInput"
            />
            <label for="searchInput" class="m-2">
              搜尋 中文 或 英文 營養素
            </label>
          </section>
          <section
            v-if="localClaimNts.length > 0 || localNewClaimNts.length > 0"
            class="w-100 bg-light text-dark pb-2 d-flex flex-wrap justify-content-start align-items-center"
          >
            <p class="ms-3 ps-1 mb-0">已新增營養素：</p>
            <div class="addedNts w-100 ms-3">
              <span
                v-for="(nt, index) in localClaimNts"
                :key="nt + index"
                class="badge text-primary-emphasis bg-primary-subtle fs-6 m-1"
              >
                {{ nts[nt].replace(/\(.*\)/, '') }}
              </span>
              <span
                v-for="(nt, index) in localNewClaimNts"
                :key="nt + index"
                class="badge text-primary bg-secondary-subtle fs-6 m-1"
              >
                {{ myAddedNts[nt].replace(/\(.*\)/, '') }}
              </span>
            </div>
          </section>
        </div>

        <div class="modal-body">
          <div>
            <p
              v-if="
                Object.values(filteredNts).length === 0 &&
                Object.values(filteredMyAddedNts).length === 0
              "
              class="mt-2 mb-4 text-center fw-bold fs-4 text-primary"
            >
              查無相符品項
            </p>
            <div
              v-for="(value, key) in filteredMyAddedNts"
              :key="key"
              class="form-check px-4 py-1 ms-2"
            >
              <input
                v-model="localNewClaimNts"
                :id="key"
                :value="key"
                class="form-check-input"
                type="checkbox"
              />
              <label :for="key" class="form-check-label">
                {{ value }}
              </label>
            </div>
            <div
              v-for="(value, key) in filteredNts"
              :key="key"
              class="form-check px-4 py-1 ms-2"
            >
              <input
                v-model="localClaimNts"
                :id="key"
                :value="key"
                class="form-check-input"
                type="checkbox"
              />
              <label :for="key" class="form-check-label">
                {{ value }}
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer bg-light">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button @click="update" type="button" class="btn btn-primary">
            更新
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import { useFoodStore } from '@/stores/foodDataStore'
import { mapActions, mapState } from 'pinia'
import { useCustomizeStore } from '@/stores/customizeStore'
export default {
  data() {
    return {
      modal: null,
      nts: [],
      filteredNts: [],
      product: null,
      localClaimNts: [],
      myAddedNts: [],
      filteredMyAddedNts: [],
      localNewClaimNts: [],
    }
  },
  watch: {
    baseClaimNts: {
      handler(val) {
        this.localClaimNts = val
      },
      deep: true,
      immediate: true,
    },
    newClaimNts: {
      handler(val) {
        this.localNewClaimNts = val
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapState(useFoodStore, ['headerChineseAndEnglish', 'claimNts']),
    ...mapState(useCustomizeStore, [
      'myAddedNtsList',
      'baseClaimNts',
      'newClaimNts',
    ]),
  },
  methods: {
    ...mapActions(useFoodStore, ['updateCalimNts']),
    ...mapActions(useCustomizeStore, ['showProductClaimNts']),
    updateOptions() {
      const delItems = [
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
      ]
      this.nts = { ...this.headerChineseAndEnglish }
      delItems.forEach(item => {
        delete this.nts[item]
      })
      this.filteredNts = this.nts
    },

    showModal(item) {
      this.showProductClaimNts(item)
      this.product = { ...item }
      this.modal.show()
    },
    update() {
      this.product.claimNts = this.localClaimNts
      this.product.newClaimNts = this.localNewClaimNts
      this.updateCalimNts(this.product)
      this.hideModal()
    },
    hideModal() {
      this.modal.hide()
    },
    search(e) {
      // Object.entries(this.nts) [key:value] key 英文名稱，value 中文名稱
      this.filteredNts = Object.entries(this.nts).filter(([key, value]) => {
        return (
          key.match(e.target.value.trim()) || value.match(e.target.value.trim())
        )
      })
      this.filteredNts = Object.fromEntries(this.filteredNts) // 再組裝回去

      this.filteredMyAddedNts = Object.entries(this.myAddedNts).filter(
        ([key, value]) => {
          return (
            key.match(e.target.value.trim()) ||
            value.match(e.target.value.trim())
          )
        },
      )
      this.filteredMyAddedNts = Object.fromEntries(this.filteredMyAddedNts)
    },
    getMyAddedNtsList() {
      const data = {}
      this.myAddedNtsList?.forEach(item => {
        data[item.enName] =
          item.chName + '(' + item.unit.match(/\((.*?)\)/)[1] + ')'
      })
      this.myAddedNts = data
      this.filteredMyAddedNts = data
    },
  },
  created() {
    this.updateOptions()
    this.getMyAddedNtsList()
  },
  mounted() {
    this.modal = new Modal(this.$refs.productModal)
  },
}
</script>
<style lang="scss" scoped>
.addedNts {
  height: 40px;
  overflow-y: scroll;
}
</style>
