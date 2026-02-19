const STORAGE_KEY = 'task-ui-dark'

export default defineNuxtPlugin(() => {
  const raw = localStorage.getItem(STORAGE_KEY)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  let isDark = prefersDark
  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      isDark = parsed?.isDark === true
    } catch {
      isDark = raw === '1'
    }
  }
  if (isDark) {
    document.documentElement.classList.add('dark')
  }
})
