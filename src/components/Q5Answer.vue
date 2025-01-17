<template>
  <!-- Ｑ5. 如果以計算方式來得到營養成分之含量，應該如何進行？ -->
  <p class="mb-1">欲以計算方式來得到營養成分之含量，可依下列步驟進行：</p>
  <ol class="ps-4">
    <li>列出產品配方，以百分比配方表示。</li>
    <li>查出配方中各材料之營養成分資料。</li>
    <li>利用各材料之配方百分比及其營養成分含量計算產品之營養成分值。</li>
    <li>考慮水分之變化。</li>
    <li>考慮加工損耗、各營養素加工調理後之保留率等因子之影響。</li>
  </ol>

  <p class="mb-0">
    參考資料：
    <a
      class="text-decoration-none fw-bold d-inline-block"
      href="https://www.foodlabel.org.tw/FdaFrontEndApp/FoodFAQ/Edit?SystemId=b7395ee1-cdb2-445c-882c-70799a1e4a69"
      target="_blank"
    >
      衛福部食藥署-食品標示常用問答區
    </a>
  </p>
  <hr />
  <h6>此網站的營養標示計算方式：</h6>
  <ul class="ps-4">
    <li>依輸入的個別食材重量，代入資料庫中換算出每個食材營養素的值。</li>
    <li>再將每個食材不同的營養素的值，個別予以加總得出營養素成分的值。</li>
    <li>
      先計算出每100公克的數值，再利用每100公克的數值進行換算出每份的數值。
    </li>
  </ul>

  <p class="mb-1">
    舉例說明：生南瓜 50 公克、生豬絞肉 30 公克、白飯 80
    公克，加水煮成南瓜絞肉粥，烹調後實際秤重得到的重量為 200 公克。
  </p>
  <table class="table align-middle">
    <thead>
      <tr>
        <th scope="col" class="col-2"></th>
        <th scope="col" class="col text-center">
          <p class="mb-0 d-inline-block me-1">生南瓜</p>
          <p class="mb-0 d-inline-block">50 公克</p>
        </th>
        <th scope="col" class="col text-center">
          <p class="mb-0 d-inline-block me-1">生豬絞肉</p>
          <p class="mb-0 d-inline-block">30 公克</p>
        </th>
        <th scope="col" class="col text-center">
          <p class="mb-0 d-inline-block me-1">白飯</p>
          <p class="mb-0 d-inline-block">80 公克</p>
        </th>
        <th scope="col" class="col-3 text-center">
          <p class="mb-0 d-inline-block me-1">每</p>
          <p class="mb-0 d-inline-block">100 公克</p>
          <p class="mb-0 d-inline-block">成品</p>
        </th>
        <th scope="col" class="col-3 text-center">
          <p class="mb-0 d-inline-block me-1">每份</p>
          <p class="mb-0 d-inline-block">200 公克</p>
          <p class="mb-0 d-inline-block">成品</p>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">
          <p class="mb-0 d-inline-block me-1">蛋白質</p>
          <p class="mb-0 d-inline-block">(公克)</p>
        </th>
        <td class="text-center">0.9</td>
        <td class="text-center">5.6</td>
        <td class="text-center">2.5</td>
        <td class="text-center">
          <p class="mb-0">{{ ((0.9 + 5.6 + 2.5) / 200) * 100 }}</p>
          <span class="text-primary text-opacity-75">
            ( 0.9 + 5.6 + 2.5 ) ÷ 200 × 100 = 4.5
          </span>
        </td>
        <td class="text-center">
          <p class="mb-0">{{ 4.5 * (200 / 100) }}</p>
          <span class="text-primary text-opacity-75">
            4.5 × ( 200 ÷ 100 ) = 9
          </span>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <p class="mb-0 d-inline-block me-1">脂肪</p>
          <p class="mb-0 d-inline-block">(公克)</p>
        </th>
        <td class="text-center">0.1</td>
        <td class="text-center">4.4</td>
        <td class="text-center">0.2</td>
        <td class="text-center">
          <p class="mb-0">
            {{ (((0.1 + 4.4 + 0.2) / 200) * 100).toFixed(1) }}
          </p>
          <span class="text-primary text-opacity-75">
            ( 0.1 + 4.4 + 0.2 ) ÷ 200 × 100 = 2.4
          </span>
        </td>
        <td class="text-center">
          <p class="mb-0">{{ 2.4 * (200 / 100) }}</p>
          <span class="text-primary text-opacity-75">
            2.4 × ( 200 ÷ 100 ) = 4.8
          </span>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <p class="mb-0 d-inline-block me-1">碳水化合物</p>
          <p class="mb-0 d-inline-block">(公克)</p>
        </th>
        <td class="text-center">8.7</td>
        <td class="text-center">0</td>
        <td class="text-center">32.8</td>
        <td class="text-center">
          <p class="mb-0">
            {{ (((8.7 + 0 + 32.8) / 200) * 100).toFixed(1) }}
          </p>
          <span class="text-primary text-opacity-75">
            ( 8.7 + 0 + 32.8 ) ÷ 200 × 100 = 20.75
          </span>
        </td>
        <td class="text-center">
          <p class="mb-0">{{ ((20.8 / 100) * 200).toFixed(1) }}</p>
          <span class="text-primary text-opacity-75">
            20.8 × ( 200 ÷ 100 ) = 41.6
          </span>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <p class="mb-0 d-inline-block me-1">熱量</p>
          <p class="mb-0 d-inline-block">(大卡)</p>
        </th>
        <td></td>
        <td></td>
        <td></td>
        <td class="text-center">
          <p class="mb-0">
            {{ (4.5 * 4 + 2.4 * 9 + 20.8 * 4).toFixed(1) }}
          </p>
          <span class="text-primary text-opacity-75">
            4.5 × 4 + 2.4 × 9 + 20.8 × 4 = 122.8
          </span>
        </td>
        <td class="text-center">
          <p class="mb-0">
            {{ 9 * 4 + 4.7 * 9 + 41.5 * 4 }}
          </p>
          <span class="text-primary text-opacity-75">
            9 × 4 + 4.7 × 9 + 41.5 × 4 = 244.3
          </span>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="6">
          <p class="mb-1">備註：</p>
          <ol class="ps-4">
            <li>計算出的數值，以四捨五入取到小數點第 1 位。</li>
            <li>
              熱量計算：蛋白質 每公克 × 4 大卡 ＋ 脂肪 每公克 × 9 大卡 ＋
              碳水化合物 每公克 × 4 大卡
            </li>
          </ol>
        </td>
      </tr>
    </tfoot>
  </table>
  <p class="fw-bold text-danger mb-0">
    此網站的計算方式無法計算出加工耗損、各營養素加工調理後之保留率等因子之影響。
  </p>
  <p class="fw-bold text-danger mb-0">
    如需精準的數值，建議將產品送檢至可信賴的檢驗單位，進行檢驗。
  </p>
</template>

<style lang="scss" scoped>
span {
  font-size: 14px;
}
</style>
