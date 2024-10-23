import { defineStore } from 'pinia'

export const useFoodStore = defineStore('foodDataStore', {
  state: () => ({
    originalFoodData: [],
    headerObj: [],
    updateKeyData: [],
  }),

  actions: {
    async fetchFoods() {
      try {
        const response = await fetch('fooddata2023.json')
        if (!response.ok) throw new Error('Network response was not ok')
        this.originalFoodData = await response.json()
      } catch (error) {
        console.error('Failed to fetch food data:', error)
      }

      this.updateData()
    },
    updateData() {
      const copyData = [...this.originalFoodData]
      this.headerObj = copyData.shift()
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
        Column73: 'total_fatty_acid-M',
        Column74: 'myristoleic_acid(14:1)',
        Column75: 'palmitoleic_acid(16:1)',
        Column76: 'oleic_acid(18:1)',
        Column77: 'gadoleic_acid(20:1)',
        Column78: 'erucic_acid(22:1)',
        Column79: 'total_fatty_acid-P',
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
        Column109: 'amount_of_alcohol',
      }
      this.updateKeyData = copyData.map(item => {
        const newItem = {}
        for (const key in headerMap) {
          if (Object.prototype.hasOwnProperty.call(item, key)) {
            newItem[headerMap[key]] = item[key]
          }
        }
        return newItem
      })
    },
  },
})
