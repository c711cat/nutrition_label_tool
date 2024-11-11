import { defineStore } from 'pinia'

function getCustomData() {
  return JSON.parse(localStorage.getItem('myCustomData')) || []
}

const localStorageCustomData = getCustomData()

export const useCustomStore = defineStore('customStore', {
  state: () => ({
    customDataList: localStorageCustomData,
    addOthersNutrients: [],
    customFood: {},
  }),
  getters: {
    localStorageData: ({ customDataList }) => {
      return customDataList
    },
    addOthersNts: ({ addOthersNutrients }) => {
      return addOthersNutrients
    },
    customFoodInStore: ({ customFood }) => {
      return customFood
    },
  },
  actions: {
    setCustomData(data) {
      localStorage.setItem('myCustomData', JSON.stringify(data))
    },
    clearCustomFood() {
      this.customFood = {}
    },
    addCustomNutrients(nts) {
      this.addOthersNutrients = [...nts]
      console.log(this.addOthersNutrients)
    },
  },
})
