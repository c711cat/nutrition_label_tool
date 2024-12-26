<template>
  <div
    ref="newClaimNtsModal"
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增營養素</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form id="submitCustomNts" @submit.prevent="submitForm" novalidate>
            <div class="form-floating mb-3">
              <input
                @change="alreadlyHaveEnName($event)"
                v-model.trim="enName"
                type="text"
                class="form-control"
                id="enName"
                placeholder="營養素『 英文 』名稱 或 縮寫"
                required
              />
              <div class="invalid-feedback">此欄位為必填</div>
              <label for="enName">
                <i class="text-danger fst-normal">＊</i>
                營養素『 英文 』名稱 或 縮寫
              </label>
            </div>
            <div class="form-floating mb-3">
              <input
                @change="alreadlyHaveChName($event)"
                v-model.trim="chName"
                type="text"
                class="form-control"
                id="chName"
                placeholder="營養素『 中文 』名稱"
                required
              />
              <div class="invalid-feedback">此欄位為必填</div>
              <label for="chName">
                <i class="text-danger fst-normal">＊</i>
                營養素『 中文 』名稱
              </label>
            </div>

            <div class="mt-2 ms-2 mb-3">
              <p class="mb-2 fw-bold">
                <i class="text-danger fst-normal me-1">＊</i>
                營養素單位
              </p>
              <div class="form-check form-check-inline">
                <input
                  v-model="unit"
                  class="form-check-input"
                  type="radio"
                  id="gram"
                  value="公克(g)"
                />
                <label class="form-check-label" for="gram">公克 (g)</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  v-model="unit"
                  class="form-check-input"
                  type="radio"
                  id="milligram"
                  value="毫克(mg)"
                />
                <label class="form-check-label" for="milligram">
                  毫克 (mg)
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  v-model="unit"
                  class="form-check-input"
                  type="radio"
                  id="microgram"
                  value="微克(ug)"
                />
                <label class="form-check-label" for="microgram">
                  微克 (ug)
                </label>
              </div>
            </div>

            <div class="mt-2 ms-2 mb-3">
              <p class="mb-2 fw-bold">
                <i class="text-danger fst-normal me-1">＊</i>
                營養素類別
                <i class="bi bi-info-circle ms-2 me-1 text-secondary"></i>
                <span class="text-secondary fw-normal">
                  以下選擇與熱量計算有關
                </span>
              </p>
              <div class="form-check form-check-inline">
                <input
                  v-model="type"
                  class="form-check-input"
                  type="radio"
                  id="fiber"
                  value="膳食纖維"
                />
                <label class="form-check-label" for="fiber">膳食纖維</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  v-model="type"
                  class="form-check-input"
                  type="radio"
                  id="sugar_alcohol"
                  value="糖醇"
                />
                <label class="form-check-label" for="sugar_alcohol">
                  糖醇
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  v-model="type"
                  class="form-check-input"
                  type="radio"
                  id="organic_acid"
                  value="有機酸"
                />
                <label class="form-check-label" for="organic_acid">
                  有機酸
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  v-model="type"
                  class="form-check-input"
                  type="radio"
                  id="none"
                  value="以上皆非"
                />
                <label class="form-check-label" for="none">以上皆非</label>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button form="submitCustomNts" type="submit" class="btn btn-primary">
            送出
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import { mapActions, mapState } from 'pinia'
import { useMsgStore } from '@/stores/messageStore'
import { useCustomizeStore } from '@/stores/customizeStore'

export default {
  data() {
    return {
      modal: null,
      enName: '',
      chName: '',
      unit: '公克(g)',
      type: '以上皆非',
      localMyAddedNtsList: [],
    }
  },
  computed: { ...mapState(useCustomizeStore, ['myAddedNtsList']) },
  methods: {
    ...mapActions(useMsgStore, ['openAlert', 'pushMsg']),
    submitForm(e) {
      const form = e.target
      if (!form.checkValidity()) {
        // 若表單無效，添加樣式提示
        form.classList.add('was-validated')
        this.openAlert(true, '還有必填欄位喔！')
        return
      } else {
        this.submitCustomNts()
      }
    },
    alreadlyHaveEnName(e) {
      const text = e.target.value
      this.localMyAddedNtsList.forEach(item => {
        if (item.enName === text) {
          this.openAlert(true, '『 ' + text + ' 』' + '已存在！')
          this.enName = ''
        }
      })
    },
    alreadlyHaveChName(e) {
      const text = e.target.value
      this.localMyAddedNtsList.forEach(item => {
        if (item.chName === text) {
          this.openAlert(true, '『 ' + text + ' 』' + '已存在！')
          this.chName = ''
        }
      })
    },
    showModal() {
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    },
    submitCustomNts() {
      this.addNt()
      this.hideModal()
    },
    addNt() {
      const data = {
        type: this.type,
        enName: this.enName,
        chName: this.chName,
        unit: this.unit,
        quantity: '',
      }
      this.localMyAddedNtsList.push(data)
      localStorage.setItem(
        'myAddedNts',
        JSON.stringify(this.localMyAddedNtsList),
      )
      const msgData = {}
      msgData.title = this.enName + '：' + this.chName + '新增成功'
      msgData.style = 'success'
      this.pushMsg(msgData)
      setTimeout(() => {
        this.enName = ''
        this.chName = ''
        this.unit = '公克(g)'
        this.type = '以上皆非'
      }, 1000)
    },
    getMyAddedNtsList() {
      this.localMyAddedNtsList = this.myAddedNtsList
    },
  },
  created() {
    this.getMyAddedNtsList()
  },
  mounted() {
    this.modal = new Modal(this.$refs.newClaimNtsModal)
  },
}
</script>
