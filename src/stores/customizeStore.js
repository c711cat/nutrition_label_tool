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
      this.customizeData = { ...item }
      if (item.baseClaimNts) {
        this.baseClaimNts = []
        Object.entries(item.baseClaimNts).forEach(item => {
          this.baseClaimNts.push(item[0])
        })
        if (item.newClaimNts) {
          this.newClaimNts = []
          Object.values(item.newClaimNts).forEach(item => {
            this.newClaimNts.push(item.enName)
          })
        }
      }
    },
    clearClaimNts() {
      this.baseClaimNts = []
      this.newClaimNts = []
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
      } else {
        this.toDo = 'edit'
        this.customizeDataList = this.customizeDataList.map(item => {
          if (item.id === this.customizeData.id) {
            return { ...this.customizeData } // 把舊的 item 換成新的
          }
          return item // 如果不是該 id，則保持原值
        })
      }
      this.setCustomData(this.customizeDataList)
      this.clearCustomizeData()
      this.clearClaimNts()
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
    addNts(nts, newNts, customizeData) {
      this.baseClaimNts = [...nts]
      this.newClaimNts = [...newNts]
      this.customizeData.baseClaimNts = nts.reduce((acc, key) => {
        acc[key] = '' // 將 nts 的元素作為 key，其 value = ''，進行累加
        return acc
      }, {}) //初始為空物件
      this.customizeData.newClaimNts = { ...customizeData }
    },
  },
})
