// stores/counter.js
import { defineStore } from 'pinia'

export const useStore = defineStore('user', {
  state: () => {
    return {
    userId:null}
  },
  actions: {
    setUser(userId){
      this.userId=userId;
    }
  },
})