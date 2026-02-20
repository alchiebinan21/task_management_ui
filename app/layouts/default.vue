<template>
  <div class="flex min-h-screen w-full">
    <!-- Left checkered panel -->
    <div
      class="checkered-side fixed left-0 top-0 z-0 hidden h-full shrink-0 transition-[width,colors] duration-500 ease-in-out sm:block sm:w-[100px] lg:w-[120px] xl:w-[180px]"
      :class="[checkeredClass, { 'checkered-side--closed': !showCheckeredSides }]"
      aria-hidden="true"
    />
    <!-- Center content (inset so side panels are visible) -->
    <div
      class="relative z-10 min-h-screen w-full flex-1 transition-all duration-500"
      :class="[backgroundColor, contentMarginClass]"
    >
      <Navbar v-show="showNavbar" />
      <main class="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <slot />
      </main>
    </div>
    <!-- Right checkered panel -->
    <div
      class="checkered-side fixed right-0 top-0 z-0 hidden h-full shrink-0 transition-[width,colors] duration-500 ease-in-out sm:block sm:w-[100px] lg:w-[120px] xl:w-[180px]"
      :class="[checkeredClass, { 'checkered-side--closed': !showCheckeredSides }]"
      aria-hidden="true"
    />
  </div>
</template>

<script setup lang="ts">
const { backgroundColor, isDark } = useDarkMode()
const { showCheckeredSides, showNavbar } = useLayout()

const checkeredClass = computed(() =>
  isDark.value
    ? 'checkered-dark'
    : 'checkered-light'
)

const contentMarginClass = computed(() =>
  showCheckeredSides.value
    ? 'sm:ml-[100px] sm:mr-[100px] lg:ml-[120px] lg:mr-[120px] xl:ml-[180px] xl:mr-[180px]'
    : 'sm:ml-0 sm:mr-0'
)
</script>

<style scoped>
.checkered-side {
  background-size: 14px 14px;
}

.checkered-side--closed {
  width: 0 !important;
  min-width: 0 !important;
  overflow: hidden;
  pointer-events: none;
}

/* Subtle diamond/dot grid: small points in a uniform grid on deep dark background */
.checkered-dark {
  background-color: rgb(26 26 36);
  background-image:
    linear-gradient(45deg, transparent 46%, rgba(255 255 255 / 0.04) 47%, transparent 48%),
    linear-gradient(-45deg, transparent 46%, rgba(255 255 255 / 0.04) 47%, transparent 48%);
}

.checkered-light {
  background-color: rgb(241 245 249);
  background-image:
    linear-gradient(45deg, transparent 46%, rgba(0 0 0 / 0.1) 47%, transparent 48%),
    linear-gradient(-45deg, transparent 46%, rgba(0 0 0 / 0.1) 47%, transparent 48%);
}
</style>