<template>
  <nav :class="['border-b backdrop-blur-sm transition-colors duration-300', borderColor, backgroundColor]">
    <div class="mx-auto flex h-14 w-full items-center justify-around px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-10">
        <span
          @click="toggleTasks"
          :class="[
            'cursor-pointer text-lg font-semibold transition-colors duration-300',
            textColor,
            activeSection === 'tasks' ? 'underline underline-offset-4 decoration-2' : 'opacity-70 hover:opacity-100',
          ]"
        >
          Tasks
        </span>
        <span
          @click="toggleRag"
          :class="[
            'cursor-pointer text-lg font-semibold transition-colors duration-300',
            textColor,
            activeSection === 'rag' ? 'underline underline-offset-4 decoration-2' : 'opacity-70 hover:opacity-100',
          ]"
        >
          Document AI
        </span>
        <span
          @click="toggleStack"
          :class="[
            'cursor-pointer text-lg font-semibold transition-colors duration-300',
            textColor,
            activeSection === 'stack' ? 'underline underline-offset-4 decoration-2' : 'opacity-70 hover:opacity-100',
          ]"
        >
          Stack
        </span>
        <span
          @click="toggleAbout"
          :class="[
            'cursor-pointer text-lg font-semibold transition-colors duration-300',
            textColor,
            activeSection === 'about' ? 'underline underline-offset-4 decoration-2' : 'opacity-70 hover:opacity-100',
          ]"
        >
          About this website
        </span>
      </div>
      <div class="flex items-center gap-2">
        <DarkModeButton />
        <NuxtLink
          to="/"
          :class="['text-sm font-medium transition-colors duration-300', textColor]"
        >
          Home
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { toggleTasks, toggleRag, toggleAbout, toggleStack, activeSection } = useLayout()
const { backgroundColor, textColor, borderColor } = useDarkMode()
</script>
