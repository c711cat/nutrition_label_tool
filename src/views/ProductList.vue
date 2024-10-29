<template>
  <div class="container my-4">
    <h3 class="text-center mb-5">營養標示列表</h3>
    <div class="row m-0">
      <section class="col-12 col-xl-9 markItemsContainer">
        <div class="d-flex">
          <p class="markItemsTitle">品名</p>
          <i class="fst-normal">：</i>
          <p class="col">南瓜蔬菜粥</p>
        </div>
        <div class="d-flex">
          <p class="markItemsTitle">成分</p>
          <i class="fst-normal">：</i>
          <p class="col">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab laborum
            ad itaque illo accusantium ratione ut ullam, fugiat vero quisquam
            facere. Officiis blanditiis laboriosam nostrum, dignissimos nulla
            nihil dicta reprehenderit.
          </p>
        </div>

        <div class="d-flex">
          <p class="markItemsTitle">過敏原資訊</p>
          <i class="fst-normal">：</i>
          <p class="col">本產品含有海鮮製品</p>
        </div>
        <div class="d-flex">
          <p class="markItemsTitle">淨重</p>
          <i class="fst-normal">：</i>
          <p class="col">250 公克</p>
        </div>
        <div class="d-flex">
          <p class="markItemsTitle">保存期限</p>
          <i class="fst-normal">：</i>
          <p class="col">300 天</p>
        </div>
        <div class="d-flex">
          <p class="markItemsTitle">有效日期</p>
          <i class="fst-normal">：</i>
          <p class="col">標示於外包裝</p>
        </div>
        <div class="d-flex">
          <p class="markItemsTitle">原產地</p>
          <i class="fst-normal">：</i>
          <p class="col">台灣</p>
        </div>
        <div class="d-flex">
          <p class="markItemsTitle">廠商名稱</p>
          <i class="fst-normal">：</i>
          <p class="col">寶寶粥</p>
        </div>
        <div class="d-flex">
          <p class="markItemsTitle">廠商地址</p>
          <i class="fst-normal">：</i>
          <p class="col">新北市淡水區新市一路一段100號</p>
        </div>
        <div class="d-flex">
          <p class="markItemsTitle">廠商電話</p>
          <i class="fst-normal">：</i>
          <p class="col">0987654321</p>
        </div>
      </section>
      <section class="col-12 col-xl-3">
        <table class="table table-sm table-borderless border border-black">
          <thead>
            <tr class="lh-sm border-bottom border-black">
              <th colspan="3" class="text-center fw-normal">營養標示</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="fw-normal ps-2 lh-sm">每一份量</th>
              <td colspan="2" class="lh-sm">250 公克</td>
            </tr>
            <tr class="lh-1 border-bottom border-black">
              <th class="fw-normal ps-2">本包裝含</th>
              <td colspan="2">1 份</td>
            </tr>
            <tr class="lh-sm border-bottom border-black">
              <th></th>
              <td class="text-end pe-2 col-3">每份</td>
              <td class="text-end pe-2 col-3">每 100 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal col-3 ps-2">熱量</th>
              <td class="text-end pe-2">300 大卡</td>
              <td class="text-end pe-2">150 大卡</td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">蛋白質</th>
              <td class="text-end pe-2">30 公克</td>
              <td class="text-end pe-2">15 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">脂肪</th>
              <td class="text-end pe-2">10 公克</td>
              <td class="text-end pe-2">5 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-4">飽和脂肪</th>
              <td class="text-end pe-2">10 公克</td>
              <td class="text-end pe-2">5 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-4">反式脂肪</th>
              <td class="text-end pe-2">10 公克</td>
              <td class="text-end pe-2">5 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">碳水化合物</th>
              <td class="text-end pe-2">10 公克</td>
              <td class="text-end pe-2">5 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-4">糖</th>
              <td class="text-end pe-2">10 公克</td>
              <td class="text-end pe-2">5 公克</td>
            </tr>
            <tr class="lh-1">
              <th class="fw-normal ps-2">鈉</th>
              <td class="text-end pe-2">10 公克</td>
              <td class="text-end pe-2">10 公克</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  border: 1px solid;
}
.markItemsContainer p {
  margin-bottom: 0px;
}

.markItemsTitle {
  width: 120px;
  text-align-last: justify;
}
</style>
