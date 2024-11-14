import { defineStore } from 'pinia'
export const useMsgStore = defineStore('msgStore', {
  state: () => ({
    message: [],
  }),
  getters: {
    MessageData: ({ message }) => {
      return message
    },
  },
  actions: {
    getMsg(data) {
      this.message.push(data)
    },
  },
})
