import { storeToRefs } from 'pinia'
import { useLayoutStore, type LayoutSection } from '../../stores/layout'

export function useLayout() {
  const store = useLayoutStore()
  const {
    showCheckeredSides,
    showNavbar,
    showTasks,
    showRag,
    showAbout,
    showStack,
    activeSection,
  } = storeToRefs(store)

  function setSection(section: LayoutSection) {
    store.setSection(section)
    if (import.meta.client) {
      nextTick(() => {
        document.getElementById('main-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }

  return {
    showCheckeredSides,
    showNavbar,
    showTasks,
    showRag,
    showAbout,
    showStack,
    activeSection,
    setSection,
    toggleTasks: () => setSection('tasks'),
    toggleRag: () => setSection('rag'),
    toggleAbout: () => setSection('about'),
    toggleStack: () => setSection('stack'),
    toggleCheckeredSides: () => store.toggleCheckeredSides(),
    toggleNavbar: () => store.toggleNavbar(),
  }
}

// Prevent stale persisted layout state from breaking section navigation.
if (import.meta.client) {
  try {
    const raw = localStorage.getItem('layout')
    if (raw && !raw.includes('activeSection')) {
      localStorage.removeItem('layout')
    }
  } catch {
    // ignore
  }
}
