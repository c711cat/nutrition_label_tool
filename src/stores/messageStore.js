import { defineStore } from 'pinia'
export const useMsgStore = defineStore('msgStore', {
  state: () => ({
    message: [],
    alert: false,
    alertText: '',
  }),
  getters: {
    MessageData: ({ message }) => {
      return message
    },
    alertStatus: ({ alert }) => {
      return alert
    },
    alertContent: ({ alertText }) => {
      return alertText
    },
  },
  actions: {
    pushMsg(data) {
      this.message.push(data)
    },
    openAlert(data, text) {
      this.alert = data
      this.alertText = text
      setTimeout(() => {
        this.alert = false
      }, 6000)
    },
    closeAlert() {
      this.alert = false
    },
  },
})
