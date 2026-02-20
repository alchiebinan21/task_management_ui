<template>
  <nav :class="`border-b border-${borderColor}-200/60 backdrop-blur-sm transition-colors duration-300 ${backgroundColor}`">
    <div class="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-10">
        <span
          @click="setPage('stack')"
          :class="`cursor-pointer text-lg font-semibold text-${textColor}-700 transition-colors duration-300 ${textColor} `"
        >
          Stack
        </span>
        <span
          @click="setPage('about')"
          :class="`cursor-pointer text-lg font-semibold text-${textColor}-700 transition-colors duration-300 ${textColor} `"
        >
          About Me
        </span>
      </div>
      <div class="flex items-center gap-2">
        <DarkModeButton />
        <NuxtLink
          to="/"
          :class="`text-sm font-medium text-${textColor}-600 transition-colors duration-300 ${textColor} `"
        >
          Home
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { toggleCheckeredSides } = useLayout()

const { backgroundColor, textColor, borderColor } = useDarkMode()

const { setPage } = useNavigation()

</script>