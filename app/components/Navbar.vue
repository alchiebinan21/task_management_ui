<template>
  <nav :class="['border-b backdrop-blur-sm transition-colors duration-300', borderColor, backgroundColor]">
    <div class="mx-auto flex h-14 w-full items-center justify-around px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-10">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="[
            'text-lg font-semibold transition-colors duration-300',
            textColor,
            isActive(item.to) ? 'underline underline-offset-4 decoration-2' : 'opacity-70 hover:opacity-100',
          ]"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
      <div class="flex items-center gap-2">
        <DarkModeButton />
        <NuxtLink
          to="/"
          :class="[
            'text-sm font-medium transition-colors duration-300',
            textColor,
            isActive('/') ? 'underline underline-offset-4 decoration-2' : '',
          ]"
        >
          Home
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const { backgroundColor, textColor, borderColor } = useDarkMode()

const navItems = [
  { label: 'Tasks', to: '/tasks' },
  { label: 'Document AI', to: '/document-ai' },
  { label: 'Stack', to: '/stack' },
  { label: 'About this website', to: '/about' },
]

function isActive(path: string) {
  return route.path === path
}
</script>
