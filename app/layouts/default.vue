<template>
  <div class="flex flex-col min-h-screen w-full" :class="backgroundColor">
    <!-- Left checkered panel -->
    <Navbar v-show="showNavbar" />
    <button @click="toggleCheckeredSides" v-show="showCheckeredSides" class="">
        <Icon name="mdi:chevron-left" />
      </button>
    <div class="grid grid-cols-12 w-full min-h-0 flex-1">
      <Sidebar side="right" v-show="showCheckeredSides" :class="showCheckeredSides ? 'col-span-2' : 'col-span-12'"/>
      <main
        :class="showCheckeredSides ? 'col-span-8' : 'col-span-12'"
        class="
          flex-1 
          mx-auto 
          w-full 
          px-4 
          py-8 
          sm:px-6 l
          g:px-8 
          rounded-xl">
        <slot />
      </main>
      <Sidebar side="left" v-show="showCheckeredSides" :class="showCheckeredSides ? 'col-span-2' : 'col-span-12'"/>
    </div>
    <TVEffect />
  </div>
</template>

<script setup lang="ts">

const { showNavbar, showCheckeredSides, toggleCheckeredSides } = useLayout()
const { backgroundColor } = useDarkMode()
</script>

<style scoped>

</style>