import { defineStore } from 'pinia'
export const useMsgStore = defineStore('msgStore', {
  state: () => ({
    message: [],
    alert: false,
  }),
  getters: {
    MessageData: ({ message }) => {
      return message
    },
    alertStatus: ({ alert }) => {
      return alert
    },
  },
  actions: {
    pushMsg(data) {
      this.message.push(data)
    },
    openAlert(data) {
      this.alert = data
      setTimeout(() => {
        this.alert = false
      }, 6000)
    },
    closeAlert() {
      this.alert = false
    },
  },
})
