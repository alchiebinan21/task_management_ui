<template>
    <div class="hidden sm:block col-span-2" :class="[props.side === 'left' ? 'border-l' : 'border-r', borderColor, textColor]">
      <SideNav />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  side: 'left' | 'right'
}>()
const { showCheckeredSides } = useLayout()
const { backgroundColor, borderColor, textColor } = useDarkMode()
</script>

<style scoped>


</style>
