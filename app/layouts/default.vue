<template>
  <div class="flex flex-col min-h-screen w-full" :class="backgroundColor">
    <!-- Left checkered panel -->
    <Navbar v-show="showNavbar" />
    <div class="grid grid-cols-12 w-full min-h-0 flex-1">
      <Sidebar side="right" v-show="showCheckeredSides" />
      <main
        class="
          col-span-full 
          sm:col-span-8 
          flex-1 
          mx-auto 
          w-full 
          max-w-4xl 
          px-4 
          py-8 
          sm:px-6 l
          g:px-8 
          rounded-xl">
        <slot />
      </main>
      <Sidebar side="left" v-show="showCheckeredSides" />
    </div>
    <TVEffect />
  </div>
</template>

<script setup lang="ts">

const { showNavbar, showCheckeredSides } = useLayout()
const { backgroundColor } = useDarkMode()
</script>

<style scoped>

</style>