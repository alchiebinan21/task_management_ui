import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    showCheckeredSides: true,
    showNavbar: true,
  }),
  actions: {
    toggleCheckeredSides() {
      this.showCheckeredSides = !this.showCheckeredSides
    },
    toggleNavbar() {
      this.showNavbar = !this.showNavbar
    },
    setCheckeredSides(value: boolean) {
      this.showCheckeredSides = value
    },
    setNavbar(value: boolean) {
      this.showNavbar = value
    },
  },
})
