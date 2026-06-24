import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    pageActive: 'home',
  }),
  actions: {
    setPage(page: string) {
      this.pageActive = page
    },
  },
})
