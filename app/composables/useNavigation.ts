import { storeToRefs } from 'pinia'
import { useNavigationStore } from '../../stores/navigation'

export function useNavigation() {
  const store = useNavigationStore()
  const { pageActive } = storeToRefs(store)

  return {
    pageActive,
    setPage: (page: string) => store.setPage(page),
  }
}
