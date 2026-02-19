import { storeToRefs } from 'pinia'
import { useDarkModeStore } from '../../stores/darkMode'

export function useDarkMode() {
  const store = useDarkModeStore()
  const { isDark } = storeToRefs(store)

  const backgroundColor = computed(() => {
    return isDark.value ? 'bg-slate-950' : 'bg-slate-50'
  })

  const textColor = computed(() => {
    return isDark.value ? 'text-slate-50' : 'text-slate-950'
  })
  
  const borderColor = computed(() => {
    return isDark.value ? 'border-slate-700' : 'border-slate-200'
  })

  onMounted(() => {
    store.init()
  })

  return {
    isDark,
    toggle: () => store.toggle(),
    apply: (value: boolean) => store.apply(value),
    init: () => store.init(),
    backgroundColor,
    textColor,
    borderColor,
  }
}
