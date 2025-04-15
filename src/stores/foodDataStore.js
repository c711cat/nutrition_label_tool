import { defineStore, mapActions } from 'pinia'
import foodData from '@/fooddata2023.json'
import { useMsgStore } from '@/stores/messageStore.js'

const headerMap = {
  '*本資料庫所列數值單位均為每100 g可食部分之含量。': 'id',
  Column2: 'category',
  Column3: 'sample_name',
  Column4: 'common_name',
  Column5: 'content_description',
  Column6: 'scrap_rate',
  Column7: 'calories',
  Column8: 'corrected_calories',
  Column9: 'water',
  Column10: 'protein',
  Column11: 'fat',
  Column12: 'saturated_fat',
  Column13: 'ash',
  Column14: 'total_carbohydrates',
  Column15: 'dietary_fiber',
  Column16: 'total_sugar',
  Column17: 'glucose',
  Column18: 'fructose',
  Column19: 'galactose',
  Column20: 'maltose',
  Column21: 'sucrose',
  Column22: 'lactose',
  Column23: 'sodium',
  Column24: 'potassium',
  Column25: 'calcium',
  Column26: 'magnesium',
  Column27: 'iron',
  Column28: 'zinc',
  Column29: 'phosphorus',
  Column30: 'copper',
  Column31: 'manganese',
  Column32: 'total_vitaminA',
  Column33: 'retinol_equivalent',
  Column34: 'retinol',
  Column35: 'alpha-carotene',
  Column36: 'beta-carotene',
  Column37: 'total_vitaminD-IU',
  Column38: 'total_vitaminD-ug',
  Column39: 'vitaminD2',
  Column40: 'vitaminD3',
  Column41: 'total_vitaminE',
  Column42: 'alpha-tocopherol_equivalent',
  Column43: 'alpha-tocopherol',
  Column44: 'beta-tocopherol',
  Column45: 'gamma-tocopherol',
  Column46: 'delta-tocopherol',
  Column47: 'vitaminK1',
  Column48: 'vitaminK2-MK-4',
  Column49: 'vitaminK2-MK-7',
  Column50: 'vitaminB1',
  Column51: 'vitaminB2',
  Column52: 'niacin',
  Column53: 'vitaminB6',
  Column54: 'vitaminB12',
  Column55: 'folate',
  Column56: 'vitaminC',
  Column57: 'total_fatty_acid-S',
  Column58: 'butyric_acid(4:0)',
  Column59: 'hexanoic_acid(6:0)',
  Column60: 'caprylic_acid(8:0)',
  Column61: 'decanoic_acid(10:0)',
  Column62: 'lauric_acid(12:0)',
  Column63: 'tridecylic_acid(13:0)',
  Column64: 'myristic_acid(14:0)',
  Column65: 'pentadecanoic_acid(15:0)',
  Column66: 'palmitic_acid(16:0)',
  Column67: 'heptadecanoic_acid(17:0)',
  Column68: 'stearic_acid(18:0)',
  Column69: 'nonadecanoic_acid(19:0)',
  Column70: 'arachidic_acid(20:0)',
  Column71: 'docosanoic_acid(22:0)',
  Column72: 'tetracosanoic_acid(24:0)',
  Column73: 'monounsaturated_fatty_acid(MUFA)',
  Column74: 'myristoleic_acid(14:1)',
  Column75: 'palmitoleic_acid(16:1)',
  Column76: 'oleic_acid(18:1)',
  Column77: 'gadoleic_acid(20:1)',
  Column78: 'erucic_acid(22:1)',
  Column79: 'polyunsaturated_fatty_acid(PUFA)',
  Column80: 'linoleic_acid(18:2)',
  Column81: 'linolenic_acid(18:3)',
  Column82: 'octadecatetraenoic_acid(18:4)',
  Column83: 'arachidonic_acid(20:4)',
  Column84: 'eicosapentaenoic_acid(EPA)(20:5)',
  Column85: 'docosapentaenoic_acid(22:5)',
  Column86: 'docosahexaenoic_acid(DHA)(22:6)',
  Column87: 'Other_fatty_acids',
  Column88: 'P/M/S',
  Column89: 'trans_fat',
  Column90: 'total_hydrolysed_amino_acids',
  Column91: 'Asp',
  Column92: 'Thr',
  Column93: 'Ser',
  Column94: 'Glu',
  Column95: 'Pro',
  Column96: 'Gly',
  Column97: 'Ala',
  Column98: 'Cys',
  Column99: 'Val',
  Column100: 'Met',
  Column101: 'Ile',
  Column102: 'Leu',
  Column103: 'Tyr',
  Column104: 'Phe',
  Column105: 'Lys',
  Column106: 'His',
  Column107: 'Arg',
  Column108: 'Trp',
  Column109: 'cholesterol',
  Column110: 'alcohol',
  Column111: 'iodine(I)',
  Column112: 'Pantothenic Acid(vitaminB5)',
  Column113: 'biotin',
  Column114: 'Choline',
  Column115: 'Inositol',
  Column116: 'Lutein',
  Column117: 'Chlorine(Cl)',
  Column118: 'Sulfur(S)',
  Column119: 'Fluoride(F)',
  Column120: 'Chromium(Cr)',
  Column121: 'Selenium(Se)',
  Column122: 'Cobalt(Co)',
  Column123: 'Molybdenum(Mo)',
  Column124: 'Boron(B)',
  Column125: 'Nickel(Ni)',
  Column126: 'Silicon(Si)',
  Column127: 'Tin(Sn)',
  Column128: 'Vanadium(V)',
  Column129: 'Erythritol',
  Column130: 'Xylitol',
  Column131: 'Sorbitol',
  Column132: 'Maltitol',
  Column133: 'Lactitol',
  Column134: 'Mannitol',
}
const nullInput = {
  id: '',
  title: '',
  ingredients: [
    {
      id: '',
      sample_name: '',
      foodName: '',
      grams: '',
      details: {},
    },
  ],
  numberOfCopy: '',
  perPortionInfomation: { perWeight: '', unit: '公克' },
  netWeightInformation: { netWeight: '', unit: '公克' },
  productQty: '',
  manufacturer: '',
  manufacturerAddress: '',
  manufacturerPhone: '',
  origin: '',
  validDaysInformation: { validDaysStatus: '標示於外包裝', validDays: '' },
  validDateInformation: { validDateStatus: '標示於外包裝', validDate: '' },
  geneticallyModified: { GMFStatus: '本產品不含有基因改造食品', GMFs: [] },
  allergenInformation: { allergenStatus: 'no', allergens: [] },
}

function getHeader() {
  return foodData.shift()
}

function updateKeyFoodData() {
  return foodData.map(item => {
    const newItem = {}
    for (const key in headerMap) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        newItem[headerMap[key]] = item[key]
      }
    }
    return newItem
  })
}

function createHeaderChineseAndEnglish() {
  const newData = {}
  for (const [originKey, newKey] of Object.entries(headerMap)) {
    newData[newKey] = headerObj[originKey]
    localStorage.setItem('myHeader', JSON.stringify(newData))
  }
  return JSON.parse(localStorage.getItem('myHeader')) || []
}

function getMyProductList() {
  return JSON.parse(localStorage.getItem('myFoodData')) || []
}

const headerObj = getHeader()

let baseFoodData = []
baseFoodData = updateKeyFoodData()

let headerChineseAndEnglish = {}
headerChineseAndEnglish = createHeaderChineseAndEnglish()

const localStorageData = getMyProductList()
export const useFoodStore = defineStore('foodDataStore', {
  state: () => ({
    foodData: foodData,
    header: headerObj,
    baseFoodData: baseFoodData,
    headerChineseAndEnglish: headerChineseAndEnglish,
    headerMap: headerMap,
    myProductList: localStorageData,
    filteredMyProductList: localStorageData,
    forSearchData: [],
    product: {
      id: '',
      title: '',
      ingredients: [
        {
          id: '',
          sample_name: '',
          foodName: '',
          grams: '',
          details: {},
        },
      ],
      numberOfCopy: '',
      perPortionInfomation: { perWeight: '', unit: '公克' },
      netWeightInformation: { netWeight: '', unit: '公克' },
      productQty: '',
      manufacturer: '',
      manufacturerAddress: '',
      manufacturerPhone: '',
      origin: '',
      validDaysInformation: { validDaysStatus: '標示於外包裝', validDays: '' },
      validDateInformation: { validDateStatus: '標示於外包裝', validDate: '' },
      geneticallyModified: { GMFStatus: '本產品不含有基因改造食品', GMFs: [] },
      allergenInformation: { allergenStatus: 'no', allergens: [] },
    },
    nullInput: nullInput,
    loadingStatus: false,
    toDo: '',
    addNts: [],
  }),
  getters: {
    updateKeyFoodData: ({ baseFoodData }) => {
      return baseFoodData
    },
    productLabeledMatters: ({ product }) => {
      return product
    },
    localStorageData: ({ myProductList }) => {
      return myProductList
    },
    localStoragefilteredMyProductList: ({ filteredMyProductList }) => {
      return filteredMyProductList
    },
    headerData: ({ headerChineseAndEnglish }) => {
      return headerChineseAndEnglish
    },
    BtnloadingStatus: ({ loadingStatus }) => {
      return loadingStatus
    },
    getOnlyNewAddHeader: ({ onlyNewAddHeader }) => {
      return onlyNewAddHeader
    },
  },
  actions: {
    ...mapActions(useMsgStore, ['pushMsg']),
    showChosenMsg(title) {
      const data = {}
      data.title = title + ' 選取成功'
      data.style = 'success'
      this.pushMsg(data)
    },
    doubleCheckedOK() {
      this.loadingStatus = true
      this.toDo = 'edit'
      if (!this.product.id) {
        this.product.id = Date.now()
        this.myProductList.push(this.product)
        this.toDo = 'add'
      }
      this.setMyProducts(this.myProductList)
      this.clearInput()
      setTimeout(() => {
        this.loadingStatus = false
      }, 9000)
    },
    setMyProducts(productList) {
      localStorage.setItem('myFoodData', JSON.stringify(productList))
      const data = {}
      if (this.toDo === 'edit') {
        data.title = ' 更新成功'
        data.style = 'success'
        this.pushMsg(data)
      } else if (this.toDo === 'add') {
        data.title = ' 新增成功'
        data.style = 'success'
        this.pushMsg(data)
      }
      this.toDo = ''
    },
    clearInput() {
      this.product = this.nullInput
    },
    edit(item) {
      this.product = item
    },
    del(title, index) {
      this.myProductList.splice(index, 1)
      this.setMyProducts(this.myProductList)
      const data = {}
      data.title = title + ' 刪除成功'
      data.style = 'success'
      this.pushMsg(data)
    },
    pushNTs(nts) {
      this.addNts = nts
    },
    delItemOfNts(title, index) {
      const keys = Object.keys(this.onlyNewAddHeader) // 得到 key 的陣列 例如：[ 0:lutein, 1:calcium ]
      const keyToDel = keys[index] // 根據 index 找到對應的 key
      delete this.onlyNewAddHeader[keyToDel]
      localStorage.setItem('myAddedNts', JSON.stringify(this.onlyNewAddHeader))
      const data = {}
      data.title = title + ' 刪除成功'
      data.style = 'success'
      this.pushMsg(data)
    },
    updateCalimNts(product) {
      this.myProductList.forEach(item => {
        if (item.id === product.id) {
          item.claimNts = product.claimNts
          item.newClaimNts = product.newClaimNts
        }
      })
      this.setMyProducts(this.myProductList)
    },
    searchProducts(text) {
      const data = []
      this.filteredMyProductList.filter(item => {
        if (item.title.match(text)) {
          data.push(item)
        }
      })
      this.myProductList = data
    },
  },
})
