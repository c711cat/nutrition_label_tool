<template>
  <section class="custom-label-wrapper col-12 mt-3">
    <div
      v-if="hasSavedLabel || isEditing"
      :id="`customNutritionLabel${product.id}`"
      ref="customNutritionLabel"
      class="col-12 col-sm-9 col-md-7 col-lg-5 col-xl-5 col-xxl-4 p-2 ms-xl-auto"
    >
      <table
        class="table table-sm table-borderless border border-2 border-black mb-0"
      >
        <thead>
          <tr class="lh-sm">
            <th
              colspan="3"
              class="text-center fw-normal border-bottom border-black"
            >
              營養標示
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="fw-normal ps-2 lh-sm">每一份量</th>
            <td colspan="2" class="lh-sm align-middle">
              <input
                v-if="isEditing"
                v-model="localLabel.perWeight"
                type="number"
                step="any"
                min="0"
                class="custom-label-input"
              />
              <span v-else>{{ localLabel.perWeight }}</span>
              {{ localLabel.unit }}
            </td>
          </tr>
          <tr class="lh-1">
            <th class="fw-normal ps-2 border-bottom border-black pb-2">
              本包裝含
            </th>
            <td colspan="2" class="border-bottom border-black align-middle">
              <input
                v-if="isEditing"
                v-model="localLabel.productQty"
                type="number"
                step="any"
                min="0"
                class="custom-label-input"
              />
              <span v-else>{{ localLabel.productQty }}</span>
              份
            </td>
          </tr>
          <tr class="lh-sm">
            <th class="border-bottom border-black"></th>
            <td class="text-end pe-2 border-bottom border-black align-middle">
              每份
            </td>
            <td class="text-end pe-2 border-bottom border-black align-middle">
              每 100 {{ localLabel.unit }}
            </td>
          </tr>
          <tr v-for="row in localLabel.rows" :key="row.key" class="lh-1">
            <th class="fw-normal" :class="row.indent ? 'ps-4' : 'ps-2'">
              {{ row.label }}
            </th>
            <td class="text-end pe-2 align-middle">
              <input
                v-if="isEditing"
                v-model="row.perServing"
                :type="row.inputType || 'number'"
                step="any"
                min="0"
                class="custom-label-input text-end"
              />
              <span v-else>{{ row.perServing }}</span>
              {{ row.unit }}
            </td>
            <td class="text-end pe-2 align-middle">
              <input
                v-if="isEditing"
                v-model="row.per100"
                :type="row.inputType || 'number'"
                step="any"
                min="0"
                class="custom-label-input text-end"
              />
              <span v-else>{{ row.per100 }}</span>
              {{ row.unit }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="text-end pe-3">
      <button
        v-if="showEntryButton && !isEditing"
        @click="startEditing"
        type="button"
        class="btn btn-outline-primary my-3 me-3"
      >
        {{ hasSavedLabel ? '編輯自填營養標示' : '新增自填營養標示' }}
      </button>
      <button
        v-if="isEditing"
        @click="cancelEditing"
        type="button"
        class="btn btn-outline-secondary my-3 me-3"
      >
        取消
      </button>
      <button
        v-if="isEditing"
        @click="saveLabel"
        type="button"
        class="btn btn-primary my-3 me-3"
      >
        儲存
      </button>
      <button
        v-if="hasSavedLabel || isEditing"
        @click="downloadCustomLabel"
        type="button"
        class="btn btn-primary my-3"
      >
        下載自填營養標示
      </button>
    </div>
  </section>
</template>

<script>
import html2canvas from 'html2canvas'
import { mapActions } from 'pinia'
import { useMsgStore } from '@/stores/messageStore'

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    baseLabel: {
      type: Object,
      required: true,
    },
    showEntryButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['save'],
  data() {
    return {
      isEditing: false,
      localLabel: this.createLocalLabel(),
    }
  },
  computed: {
    hasSavedLabel() {
      return Boolean(this.product.customNutritionLabel)
    },
  },
  watch: {
    baseLabel: {
      deep: true,
      handler() {
        if (!this.isEditing) {
          this.localLabel = this.createLocalLabel()
        }
      },
    },
    'product.customNutritionLabel': {
      deep: true,
      handler() {
        if (!this.isEditing) {
          this.localLabel = this.createLocalLabel()
        }
      },
    },
  },
  methods: {
    ...mapActions(useMsgStore, ['pushMsg']),
    clone(data) {
      return JSON.parse(JSON.stringify(data))
    },
    createLocalLabel() {
      const source = this.product.customNutritionLabel || this.baseLabel
      return this.clone(source)
    },
    startEditing() {
      this.localLabel = this.createLocalLabel()
      this.isEditing = true
    },
    cancelEditing() {
      this.localLabel = this.createLocalLabel()
      this.isEditing = false
    },
    saveLabel() {
      this.$emit('save', this.product, this.clone(this.localLabel))
      this.isEditing = false
      this.pushMsg({ title: '自填營養標示已儲存', style: 'success' })
    },
    downloadCustomLabel() {
      const data = {}
      this.$nextTick(() => {
        html2canvas(this.$refs.customNutritionLabel, {
          scale: 2,
          logging: false,
        })
          .then(canvas => {
            const link = document.createElement('a')
            link.download = `${this.product.title}-自填營養標示.png`
            link.href = canvas.toDataURL('image/png')
            link.click()
            data.title = '自填營養標示圖片下載成功'
            data.style = 'success'
            this.pushMsg(data)
          })
          .catch(err => {
            data.title = '圖片生成失敗:' + err
            data.style = 'failure'
            this.pushMsg(data)
          })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.custom-label-wrapper {
  width: 100%;
}

.custom-label-input {
  width: 64px;
  max-width: 100%;
  padding: 0 4px;
  border: 1px solid #dc3545;
  border-radius: 3px;
  line-height: 1.2;
}

.custom-label-input:focus {
  border-color: #0d6efd;
  outline: none;
}
</style>
