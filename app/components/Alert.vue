<template>
  <div
    class="flex items-center p-4 border-2 border-solid rounded-lg bg-white shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg"
    :style="{ 'border-color': color }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const { color } = defineProps({
  color: {
    type: String,
    default: 'orange'
  }
})
</script>
