import { defineStore } from 'pinia'
import { useFoodStore } from './foodDataStore'
import { mapState, mapActions } from 'pinia'
import { useMsgStore } from './messageStore'

function getCustomData() {
  return JSON.parse(localStorage.getItem('myCustomData')) || []
}

const localStorageCustomData = getCustomData()

export const useCustomStore = defineStore('customStore', {
  state: () => ({
    customDataList: localStorageCustomData,
    addOthersNutrients: [],
    addCMNts: [],
    customFood: {},
    toDo: '',
    ntName: { englishName: '', chineseName: '', unit: '' },
  }),
  getters: {
    localStorageData: ({ customDataList }) => {
      return customDataList
    },
    addOthersNts: ({ addOthersNutrients }) => {
      return addOthersNutrients
    },
    addCustomMadeNts: ({ addCMNts }) => {
      return addCMNts
    },
    customFoodInStore: ({ customFood }) => {
      return customFood
    },
    nutrientName: ({ ntName }) => {
      return ntName
    },
    ...mapState(useFoodStore, ['baseFoodData']),
  },
  actions: {
    ...mapActions(useMsgStore, ['pushMsg']),
    ...mapActions(useFoodStore, ['setNewHeaderItem']),
    setCustomData(data) {
      localStorage.setItem('myCustomData', JSON.stringify(data))
      const msg = {}
      if (this.toDo === 'edit') {
        msg.title = '更新成功'
        msg.style = 'success'
        this.pushMsg(msg)
      } else if (this.toDo === 'add') {
        msg.title = '新增成功'
        msg.style = 'success'
        this.pushMsg(msg)
      }
      this.toDo = ''
    },
    clearCustomFood() {
      this.customFood = {}
    },
    editCustomFood(item) {
      this.customFood = { ...item, ...item.nutritionLabels }
      const excludeKey = [
        'calories',
        'protein',
        'fat',
        'saturated_fat',
        'trans_fat',
        'total_carbohydrates',
        'total_sugar',
        'sodium',
      ]
      this.addOthersNutrients = []
      Object.keys(this.customFood.nutritionLabels).filter(key => {
        if (!excludeKey.includes(key)) {
          this.addOthersNutrients.push(key)
        }
      })
      delete this.customFood.nutritionLabels
    },
    updateList() {
      const keepKeys = [
        'sample_name',
        'content_description',
        'category',
        'id',
        'calories',
        'protein',
        'fat',
        'saturated_fat',
        'trans_fat',
        'total_carbohydrates',
        'total_sugar',
        'sodium',
      ]
      const keepKeysOfCustomFood = {}
      const othersNutrients = {}
      Object.keys(this.customFood).forEach(key => {
        if (keepKeys.includes(key)) {
          keepKeysOfCustomFood[key] = this.customFood[key]
        } else {
          othersNutrients[key] = this.customFood[key]
        }
      })

      const filterNts = {}
      this.addOthersNutrients.forEach(ele => {
        Object.keys(othersNutrients).forEach(key => {
          if (ele === key) {
            filterNts[key] = othersNutrients[key]
          }
        })
      })

      this.customFood = { ...keepKeysOfCustomFood, ...filterNts }
      this.customDataList = this.customDataList.map(item => {
        if (item.id === this.customFood.id) {
          return (item = this.customFood)
        } else {
          return item
        }
      })
      this.setCustomData(this.customDataList)
    },

    clearAddOtherNts() {
      this.addOthersNutrients = []
    },
    delItemOfCustomList(title, index) {
      this.customDataList.splice(index, 1)
      this.setCustomData(this.customDataList)
      const data = {}
      data.title = title + '刪除成功'
      data.style = 'success'
      this.pushMsg(data)
    },
    customDoubleCheckedOK() {
      if (!this.customFood.id) {
        this.toDo = 'add'
        this.customFood.id = Date.now()
        this.customFood.category = '自定義'
        this.customDataList.push(this.customFood)
        this.baseFoodData.push(this.customFood)
        this.setCustomData(this.customDataList)
      } else {
        this.toDo = 'edit'
        this.updateList()
      }
      this.clearCustomFood()
      this.clearAddOtherNts()
    },
    addCustomNts() {
      const Nts = {
        [this.ntName.englishName]:
          this.ntName.chineseName + '(' + this.ntName.unit + ')',
      }
      this.setNewHeaderItem(Nts)
      setTimeout(() => {
        this.ntName.englishName = ''
        this.ntName.chineseName = ''
        this.ntName.unit = ''
      }, 2000)
    },
    addNts(nts, customNts) {
      this.addOthersNutrients = [...nts]
      this.addCMNts = [...customNts]
      this.customFood.claimCMNts = { ...customNts }
    },
  },
})
