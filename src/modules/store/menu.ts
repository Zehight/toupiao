import { defineStore } from 'pinia'

export const useMenu = defineStore('menu', {
  state: () => ({
    active: '',
    openeds: [] as string[],
  }),
  getters: {

  },
  actions: {
    setActive(key: string) {
      this.active = key
    },
    addOpeneds(key: string) {
      if (!this.openeds.includes(key)) this.openeds.push(key)
    },
    removeOpeneds(key: string) {
      const index = this.openeds.indexOf(key)
      if (index !== -1) this.openeds.splice(index, 1)
    }
  }
})
