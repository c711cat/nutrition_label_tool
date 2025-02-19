<template>
  <div ref="instructionModal" class="modal fade" tabindex="-1">
    <div
      class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable justify-content-center"
    >
      <div v-if="currentView === 'productQty'" class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-white">說明共可製成幾份</h5>
        </div>
        <div class="modal-body">
          <p>
            例 1：總共有以下食材：娃娃菜、洋蔥、鴻喜菇、干貝...等，煮完可以分成
            7 份。
          </p>
          <p>因此這裡的欄位填入 <span class="fw-bold text-primary">7 </span></p>
          <hr />
          <p>
            例 2：食材總量是 200 公克的白飯，我的成品每一份是 200 公克，所以 200
            公克的白飯共可製成 1 份成品。
          </p>
          <p>
            因此這裡的欄位會填入 <span class="fw-bold text-primary">1</span>
          </p>
        </div>
        <div class="modal-footer bg-light">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
        </div>
      </div>
      <img
        v-if="currentView === 'showImg'"
        :src="currentImg"
        :alt="imgName"
        class="showImg"
      />
      <div v-if="currentView === 'totalWeight'" class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-white">說明 外包裝成分 及 總克數 欄位</h5>
        </div>
        <div class="modal-body">
          <p class="fw-bold fs-5 ps-2 mb-3">
            舉例，總共食材：娃娃菜 238 公克、洋蔥 172 公克、鴻喜菇 136
            公克、干貝 20 公克...等，將用來製成 7 份的成品。
          </p>

          <p class="fw-bold fs-5 ps-2 mb-3">
            以下欄位需填入這 7 份各食材所用的總克數。
          </p>
          <img
            class="ingredientImg mb-5 border"
            src="@/assets/img/ingredient-2.png"
            alt="ingredientImg"
          />

          <p class="fw-bold fs-5 ps-2 mb-3">2. 外包裝成分呈現範例</p>
          <img
            class="ingredientImg border"
            src="@/assets/img/ingredient-1.png"
            alt="ingredientImg"
          />
        </div>
        <div class="modal-footer bg-light">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
import perServing from '../assets/img/營養標示-每一份量.png'
import howMany from '@/assets/img/營養標示-含幾份.png'

export default {
  data() {
    return {
      modal: {},
      imgName: '營養標示-每一份量.png',
      perServing: perServing,
      howMany: howMany,
      currentImg: perServing,
      currentView: '',
    }
  },
  methods: {
    showModal(text) {
      if (text === 'perServing') {
        this.currentImg = this.perServing
        this.currentView = 'showImg'
      }
      if (text === 'howMany') {
        this.currentImg = this.howMany
        this.currentView = 'showImg'
      }
      if (text === 'productQty') {
        this.currentImg = ''
        this.currentView = text
      }
      if (text === 'totalWeight') {
        this.currentImg = ''
        this.currentView = text
      }
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.instructionModal)
  },
}
</script>

<style lang="scss" scoped>
.showImg {
  min-width: 300px;
}

.ingredientImg {
  width: 800px;
}
</style>
