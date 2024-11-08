import { defineStore } from 'pinia'

function getCustomData() {
  return JSON.parse(localStorage.getItem('myCustomData')) || []
}

const localStorageCustomData = getCustomData()

export const useCustomStore = defineStore('customStore', {
  state: () => ({
    customDataList: localStorageCustomData,
    addOthersNutrients: [],
  }),
  getters: {
    localStorageData: ({ customDataList }) => {
      return customDataList
    },
    addOthersNts: ({ addOthersNutrients }) => {
      return addOthersNutrients
    },
  },
  actions: {
    setCustomData(data) {
      localStorage.setItem('myCustomData', JSON.stringify(data))
    },
  },
})
