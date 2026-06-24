import { useNavigationStore } from '../../stores/navigation'

const routeToPage: Record<string, string> = {
  '/': 'home',
  '/tasks': 'tasks',
  '/document-ai': 'document-ai',
  '/stack': 'stack',
  '/about': 'about',
}

export default defineNuxtPlugin(() => {
  const route = useRoute()
  const navigation = useNavigationStore()

  watch(
    () => route.path,
    (path) => {
      navigation.setPage(routeToPage[path] ?? 'home')
    },
    { immediate: true },
  )
})
