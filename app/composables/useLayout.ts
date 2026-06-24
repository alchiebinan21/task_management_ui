import { storeToRefs } from 'pinia'
import { useLayoutStore } from '../../stores/layout'

export function useLayout() {
  const store = useLayoutStore()
  const { showCheckeredSides, showNavbar } = storeToRefs(store)

  return {
    showCheckeredSides,
    showNavbar,
    toggleCheckeredSides: () => store.toggleCheckeredSides(),
    toggleNavbar: () => store.toggleNavbar(),
  }
}
