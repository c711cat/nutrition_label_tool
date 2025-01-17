<template>
  <main class="mx-auto col-11 col-lg-10">
    <header class="mb-3 text-end">
      <h3 class="text-center">Q&A</h3>
    </header>
    <body>
      <div class="accordion" id="QA_List">
        <section
          v-for="(qa, index) in QAData"
          :key="qa + index"
          class="accordion-item"
        >
          <h2 class="accordion-header">
            <button
              class="accordion-button fw-bold text-dark"
              :class="index === 0 ? '' : collapsed"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#QA${index}`"
              aria-expanded="true"
              :aria-controls="`QA${index}`"
            >
              {{ qa.question }}
            </button>
          </h2>
          <div
            :id="`QA${index}`"
            class="accordion-collapse collapse"
            :class="{ show: index === 0 }"
          >
            <div class="accordion-body p-4">
              <component :is="qa.component" />
            </div>
          </div>
        </section>
      </div>
    </body>
  </main>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse'
import Q1Answer from '@/components/Q1Answer.vue'
import Q2Answer from '@/components/Q2Answer.vue'
import Q3Answer from '@/components/Q3Answer.vue'
import Q4Answer from '@/components/Q4Answer.vue'
import Q5Answer from '@/components/Q5Answer.vue'
import Q6Answer from '@/components/Q6Answer.vue'
import Q7Answer from '@/components/Q7Answer.vue'
import Q8Answer from '@/components/Q8Answer.vue'
import Q9Answer from '@/components/Q9Answer.vue'
import Q10Answer from '@/components/Q10Answer.vue'
export default {
  data() {
    return {
      QAList: {},
      QAData: [
        {
          question: 'Ｑ1. 我的產品需要標示營養標示嗎？',
          component: Q1Answer,
        },
        {
          question: 'Ｑ2. 何謂『 散裝食品 』與『 包裝食品 』？',
          component: Q2Answer,
        },
        {
          question:
            'Ｑ3.『 包裝食品 』應該要遵守什麼規範？ 『 得免營養標示之包裝食品規定 』 是什麼？',
          component: Q3Answer,
        },
        {
          question: 'Ｑ4. 網路販售『 散裝食品 』如何標示？',
          component: Q4Answer,
        },
        {
          question: 'Ｑ5. 如果以計算方式來得到營養成分之含量，應該如何進行？',
          component: Q5Answer,
        },
        {
          question: 'Ｑ6. 為什麼需要營養標示？',
          component: Q6Answer,
        },
        {
          question: 'Ｑ7. 營養標示不標可以嗎？',
          component: Q7Answer,
        },
        {
          question: 'Ｑ8. 營養標示標錯會有罰則嗎？',
          component: Q8Answer,
        },
        {
          question: 'Ｑ9. 想了解更多關於『 食品標示 』相關法規，可由何處獲得？',
          component: Q9Answer,
        },
        {
          question: 'Ｑ10. 此網站內建資料庫取自何處？',
          component: Q10Answer,
        },
      ],
    }
  },
  components: {
    Q1Answer,
    Q2Answer,
    Q3Answer,
    Q4Answer,
    Q5Answer,
    Q6Answer,
    Q7Answer,
    Q8Answer,
    Q9Answer,
    Q10Answer,
  },
  created() {
    const collapseElementList = document.querySelectorAll('.collapse')
    this.QAList = [...collapseElementList].map(
      collapseEl => new Collapse(collapseEl),
    )
  },
}
</script>

<style lang="scss" scoped>
a:hover {
  filter: brightness(1.7);
}

button {
  background: #d0d4ed;
}
button:hover {
  filter: brightness(1.06);
}

.itemBtn:hover {
  filter: brightness(0.97);
}

span {
  font-size: 14px;
}
</style>
