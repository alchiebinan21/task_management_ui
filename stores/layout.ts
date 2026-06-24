import { defineStore } from 'pinia'

export type LayoutSection = 'tasks' | 'rag' | 'stack' | 'about'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    activeSection: 'tasks' as LayoutSection,
    showCheckeredSides: true,
    showNavbar: true,
  }),
  getters: {
    showTasks: (state) => (state.activeSection ?? 'tasks') === 'tasks',
    showRag: (state) => state.activeSection === 'rag',
    showStack: (state) => state.activeSection === 'stack',
    showAbout: (state) => state.activeSection === 'about',
  },
  actions: {
    setSection(section: LayoutSection) {
      this.activeSection = section
    },
    toggleTasks() {
      this.setSection('tasks')
    },
    toggleRag() {
      this.setSection('rag')
    },
    toggleAbout() {
      this.setSection('about')
    },
    toggleStack() {
      this.setSection('stack')
    },
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
