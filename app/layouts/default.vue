<template>
    <div
        class="min-h-screen transition-colors duration-500"
        :class="backgroundColor"
    >
    <Navbar />
    <main class="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { backgroundColor } = useDarkMode()
</script>