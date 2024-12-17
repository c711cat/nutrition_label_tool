import { defineStore } from 'pinia'
import { useFoodStore } from './foodDataStore'
import { mapState, mapActions } from 'pinia'
import { useMsgStore } from './messageStore'

function getCustomData() {
  return JSON.parse(localStorage.getItem('myCustomizeData')) || []
}
function getMyAddedNtsList() {
  return JSON.parse(localStorage.getItem('myAddedNts'))
}
const localStorageCustomData = getCustomData()
const localStorageMyAddedNtsList = getMyAddedNtsList()
export const useCustomizeStore = defineStore('customStore', {
  state: () => ({
    customizeDataList: localStorageCustomData,
    myAddedNtsList: localStorageMyAddedNtsList,
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
    localStorageMyAddedNtsList: ({ myAddedNtsList }) => {
      return myAddedNtsList
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
    addNts(nts, newNts) {
      this.baseClaimNts = [...nts]
      this.newClaimNts = [...newNts]
      if (!this.customizeData.id) {
        //  若是新增，沒有 id ，customizeData.baseClaimNts 則加入以營養素名稱為 key，value預設為 ''
        this.customizeData.baseClaimNts = nts.reduce((acc, key) => {
          acc[key] = '' // 將 nts 的元素作為 key，其 value = ''，進行累加
          return acc
        }, {}) //初始為空物件
        this.customizeData.newClaimNts = this.myAddedNtsList.filter(item => {
          return this.newClaimNts.includes(item.enName)
        })
      } else {
        // 編輯（ 有id ）
        this.integrateBaseClaimNts(nts)
        this.integrateNewClaimNts(newNts)
      }
    },
    integrateBaseClaimNts(nts) {
      let data = [...nts]
      // customizeData.baseClaimNts 與目前的 this.baseClaimNts 比對
      if (this.customizeData.baseClaimNts) {
        Object.keys(this.customizeData.baseClaimNts).map(item => {
          if (!this.baseClaimNts.includes(item)) {
            // 從 customizeData.baseClaimNts 裡面，刪除不在 baseClaimNts 中的項目
            // 剩下就是目前要的品項（此次編輯選擇的項目 與 上次新增時選擇的項目）
            delete this.customizeData.baseClaimNts[item]
          }
        })
        let oldItem = [] // 準備用來存取上次選擇的項目
        // 目前選擇的全部品項中（nt），與上次選擇的（customizeData.baseClaimNts）比對
        data = data.filter(nt => {
          Object.keys(this.customizeData.baseClaimNts).forEach(item => {
            oldItem.push(item)
          })
          // 不包含在舊品項中回傳到 data 中，取得這次新增的品項
          return !oldItem.includes(nt)
        })
        // 在新增的品項，以營養素名稱為 key，value預設為 ''，累加到 data 中
        data = data.reduce((acc, key) => {
          acc[key] = ''
          return acc
        }, {})
        // 組合新舊品項
        this.customizeData.baseClaimNts = {
          ...this.customizeData.baseClaimNts,
          ...data,
        }
      }
    },
    integrateNewClaimNts(newNts) {
      // 從 this.customizeData.newClaimNts（上次選擇的，舊的品項) 中，
      // 過濾掉不是 newNts（目前選擇的品項，新舊混合）的品項，
      // 回傳到 this.customizeData.newClaimNts (此時只有舊的品項，尚未加入這次選擇的)
      if (this.customizeData.newClaimNts) {
        this.customizeData.newClaimNts = this.customizeData.newClaimNts.filter(
          item => {
            return newNts.includes(item.enName)
          },
        )
        let oldItem = [] // 存入此次選擇的舊品項名稱
        this.customizeData.newClaimNts.forEach(item => {
          oldItem.push(item.enName)
        })
        // 將參數（此次選擇新舊混合）過濾掉舊的品項，保留新增加的品項
        newNts = newNts.filter(item => {
          return !oldItem.includes(item)
        })
        // newItem：代入新增品項的預設格式 （type,unit,enName,chNane,quantity)
        // 只剩下新增加的品項（newNts）與自行新增的營養素列表比對，相符的名稱則代入當初新增的格式
        let newItem = this.myAddedNtsList.filter(item => {
          return newNts.includes(item.enName)
        })
        // 合併新舊品項及其格式到 this.customizeData.newClaimNts 中
        this.customizeData.newClaimNts = [
          ...this.customizeData.newClaimNts,
          ...newItem,
        ]
      }
    },
    showProductClaimNts(item) {
      if (item.claimNts) {
        this.baseClaimNts = item.claimNts
      }
      if (item.newClaimNts) {
        this.newClaimNts = item.newClaimNts
      } else {
        this.baseClaimNts = []
        this.newClaimNts = []
      }
    },
  },
})
