<template>
  <div
    :class="[
      'overflow-hidden rounded-xl border transition-colors duration-300',
      isDark
        ? 'border-slate-600/80 bg-slate-800/90'
        : 'border-slate-300 bg-slate-100',
    ]"
  >
    <!-- Tab -->
    <div
      :class="[
        'flex items-center gap-2 border-b px-3 py-2 transition-colors duration-300',
        isDark
          ? 'border-slate-600/60 bg-slate-700/50'
          : 'border-slate-200 bg-slate-200/80',
      ]"
    >
      <button
        type="button"
        aria-label="Close tab"
        :class="[
          'ml-auto rounded p-0.5 transition-colors hover:opacity-80',
          isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700',
        ]"
        @click="$emit('close-tab')"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Input area with typing effect -->
    <div
      :class="[
        'flex min-h-[72px] items-center px-4 py-3 transition-colors duration-300',
        isDark ? 'text-slate-200' : 'text-slate-800',
      ]"
    >
      <template v-if="isTyping">
        <span class="min-h-[1.25rem]">{{ displayedText }}</span>
        <span
          class="caret ml-0.5 inline-block h-4 w-0.5 shrink-0 align-middle bg-blue-500"
        />
      </template>
      <input
        v-else
        ref="inputRef"
        v-model="inputValue"
        type="text"
        :placeholder="placeholder"
        :class="[
          'w-full min-w-0 border-0 bg-transparent text-base outline-none placeholder:opacity-60',
          isDark ? 'placeholder:text-slate-400' : 'placeholder:text-slate-500',
        ]"
        @keydown.enter="$emit('submit', inputValue)"
      />
    </div>

    <!-- Bottom icon row -->
    <div
      :class="[
        'flex items-center gap-3 border-t px-3 py-2 transition-colors duration-300',
        isDark ? 'border-slate-600/60 text-slate-400' : 'border-slate-200 text-slate-500',
      ]"
    >
      <button
        type="button"
        aria-label="Send"
        :class="[
          'ml-auto rounded p-1.5 transition-opacity hover:opacity-80',
          isDark ? 'bg-slate-600 text-slate-200' : 'bg-slate-500 text-white',
        ]"
        @click="$emit('submit', inputValue)"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    typingText?: string
    placeholder?: string
    typingSpeed?: number
  }>(),
  {
    typingText: 'Welcome Visitor',
    placeholder: 'Welcome Visitor',
    typingSpeed: 80,
  }
)

defineEmits<{
  'close-tab': []
  submit: [value: string]
}>()

const { isDark } = useDarkMode()

const displayedText = ref('')
const isTyping = ref(true)
const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

let typingInterval: ReturnType<typeof setInterval> | null = null

function startTyping() {
  displayedText.value = ''
  isTyping.value = true
  let index = 0
  typingInterval = setInterval(() => {
    if (index < props.typingText.length) {
      displayedText.value += props.typingText[index]
      index++
    } else {
      if (typingInterval) clearInterval(typingInterval)
      typingInterval = null
      isTyping.value = false
      nextTick(() => inputRef.value?.focus())
    }
  }, props.typingSpeed)
}

onMounted(() => {
  startTyping()
})

onUnmounted(() => {
  if (typingInterval) clearInterval(typingInterval)
})
</script>

<style scoped>
.caret {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
