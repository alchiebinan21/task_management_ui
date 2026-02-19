import { defineStore } from 'pinia'

const STORAGE_KEY = 'task-ui-dark'

export const useDarkModeStore = defineStore('darkMode', {
  state: () => ({
    isDark: ref(false),
  }),
  actions: {
    toggle() {
      this.isDark = !this.isDark
    },
    apply(value: boolean) {
      this.isDark = value
    },
    init() {
      this.isDark = localStorage.getItem(STORAGE_KEY) === 'true'
    },
  },
  persist: {
    key: STORAGE_KEY,
    pick: ['isDark'],
  },
})
