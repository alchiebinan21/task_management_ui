<template>
  <div class="tv-effect-overlay">
    <div
      v-for="(line, index) in lightLines"
      :key="line.id"
      class="tv-light-line"
      :class="{ 'dark-mode': isDark }"
      :style="{
        top: `${line.top}px`,
        left: `${line.left}%`,
        width: `${line.width}%`,
        animationDelay: `${line.delay}s`,
        animationDuration: `${line.duration}s`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const { isDark } = useDarkMode()
const { pageActive } = useNavigation()

const lightLines = ref<LightLine[]>([])
const maxLines = 10
const intervalRef = ref<ReturnType<typeof setInterval> | null>(null)
const timeoutRef = ref<ReturnType<typeof setTimeout> | null>(null)
const windowHeight = ref(0)
let resizeHandler: (() => void) | null = null
let lineIdCounter = 0

interface LightLine {
  id: number
  top: number
  left: number
  width: number
  delay: number
  duration: number
}

function createRandomLine(): LightLine {
  // Some lines are full width, some are partial
  const isFullWidth = Math.random() > 0.4 // 60% chance of full width
  const width = isFullWidth ? 100 : 20 + Math.random() * 60 // Partial: 20-80% width
  const left = isFullWidth ? 0 : Math.random() * (100 - width) // Random left position for partial lines
  
  return {
    id: lineIdCounter++,
    top: Math.random() * (windowHeight.value || window.innerHeight),
    left: left,
    width: width,
    delay: 0,
    duration: 0.2 + Math.random() * 0.3, // Slower flash: 0.2-0.5 seconds
  }
}

function addRandomLines() {
  // Add 1 to 10 lines at once
  const numLinesToAdd = Math.floor(Math.random() * 10) + 1 // 1-10 lines
  const availableSlots = maxLines - lightLines.value.length
  const linesToAdd = Math.min(numLinesToAdd, availableSlots)
  
  for (let i = 0; i < linesToAdd; i++) {
    if (lightLines.value.length < maxLines) {
      const newLine = createRandomLine()
      lightLines.value.push(newLine)
      
      // Remove the line after animation completes
      setTimeout(() => {
        const index = lightLines.value.findIndex(line => line.id === newLine.id)
        if (index !== -1) {
          lightLines.value.splice(index, 1)
        }
      }, 600) // Remove after animation (slower)
    }
  }
}

function startEffect() {
  // Clear any existing effect
  stopEffect()
  
  // Clear all existing lines
  lightLines.value = []
  
  // Start adding lines
  intervalRef.value = setInterval(() => {
    addRandomLines()
  }, 500 + Math.random() * 1000) // Slower rate: Random interval between 500-1500ms
  
  // Stop after 3 seconds
  timeoutRef.value = setTimeout(() => {
    stopEffect()
  }, 3000)
}

function stopEffect() {
  if (intervalRef.value) {
    clearInterval(intervalRef.value)
    intervalRef.value = null
  }
  if (timeoutRef.value) {
    clearTimeout(timeoutRef.value)
    timeoutRef.value = null
  }
  // Clear all lines
  lightLines.value = []
}

// Watch for page changes and start effect
watch(pageActive, () => {
  startEffect()
}, { immediate: false })

onMounted(() => {
  windowHeight.value = window.innerHeight
  
  // Update height on resize
  resizeHandler = () => {
    windowHeight.value = window.innerHeight
  }
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  stopEffect()
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
})
</script>

<style scoped>
.tv-effect-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.tv-light-line {
  position: absolute;
  height: 1px;
  background: black;
  animation: glitch-flash linear forwards;
}

.tv-light-line.dark-mode {
  background: white;
}

@keyframes glitch-flash {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
