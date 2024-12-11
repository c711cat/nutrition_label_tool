import { defineStore } from 'pinia'
import { useFoodStore } from './foodDataStore'
import { mapState, mapActions } from 'pinia'
import { useMsgStore } from './messageStore'

function getCustomData() {
  return JSON.parse(localStorage.getItem('myCustomizeData')) || []
}

const localStorageCustomData = getCustomData()

export const useCustomizeStore = defineStore('customStore', {
  state: () => ({
    customizeDataList: localStorageCustomData,
    baseClaimNts: [],
    newClaimNts: [],
    customizeData: {},
    toDo: '',
    ntName: { englishName: '', chineseName: '', unit: '' },
  }),
  getters: {
    localStorageCustomizeData: ({ customizeDataList }) => {
      return customizeDataList
    },
    baseClaimNutrients: ({ baseClaimNts }) => {
      return baseClaimNts
    },
    newClaimNutrients: ({ newClaimNts }) => {
      return newClaimNts
    },
    customizeDataInStore: ({ customizeData }) => {
      return customizeData
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
      localStorage.setItem('myCustomizeData', JSON.stringify(data))
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
    clearCustomizeData() {
      this.customizeData = {}
    },
    editCustomizeData(item) {
      console.log(item)
      this.baseClaimNts = item.baseClaimNts
      this.newClaimNts = item.newClaimNts
      this.customizeData = { ...item, ...this.baseClaimNts }
      // const excludeKey = [
      //   'calories',
      //   'protein',
      //   'fat',
      //   'saturated_fat',
      //   'trans_fat',
      //   'total_carbohydrates',
      //   'total_sugar',
      //   'sodium',
      // ]
      // this.baseClaimNts = []

      // Object.keys(this.customizeData.nutritionLabels).filter(key => {
      //   if (!excludeKey.includes(key)) {
      //     this.baseClaimNts.push(key)
      //   }
      // })
      // delete this.customizeData.nutritionLabels
      console.log(this.customizeData)
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
      const keepKeysOfCustomizeData = {}
      const othersNutrients = {}
      Object.keys(this.customizeData).forEach(key => {
        if (keepKeys.includes(key)) {
          keepKeysOfCustomizeData[key] = this.customizeData[key]
        } else {
          othersNutrients[key] = this.customizeData[key]
        }
      })

      const filterNts = {}
      this.baseClaimNts.forEach(ele => {
        Object.keys(othersNutrients).forEach(key => {
          if (ele === key) {
            filterNts[key] = othersNutrients[key]
          }
        })
      })

      this.customizeData = { ...keepKeysOfCustomizeData, ...filterNts }
      this.customizeDataList = this.customizeDataList.map(item => {
        if (item.id === this.customizeData.id) {
          return (item = this.customizeData)
        } else {
          return item
        }
      })
      this.setCustomData(this.customizeDataList)
    },

    clearBaseClaimNts() {
      this.baseClaimNts = []
    },
    delItemOfCustomizeList(title, index) {
      this.customizeDataList.splice(index, 1)
      this.setCustomData(this.customizeDataList)
      const data = {}
      data.title = title + '刪除成功'
      data.style = 'success'
      this.pushMsg(data)
    },
    customizeDoubleCheckedOK() {
      if (!this.customizeData.id) {
        this.toDo = 'add'
        this.customizeData.id = Date.now()
        this.customizeData.category = '自定義'
        this.customizeDataList.push(this.customizeData)
        this.baseFoodData.push(this.customizeData)
        this.setCustomData(this.customizeDataList)
      } else {
        this.toDo = 'edit'
        this.updateList()
      }
      this.clearCustomizeData()
      this.clearBaseClaimNts()
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
    addNts(nts, newNts) {
      this.baseClaimNts = [...nts]
      this.newClaimNts = [...newNts]
      this.customizeData.newClaimNts = { ...newNts }
    },
  },
})
