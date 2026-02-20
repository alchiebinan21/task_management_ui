<template>
  <div class="flex min-h-[calc(100vh-8rem)] flex-col mx-auto max-w-4xl text-slate-800 dark:text-slate-200">
    <div class="flex-1 space-y-6 px-4 pt-8 pb-4">
      <Stack v-if="pageActive === 'stack'" :key="pageActive" />
      <AboutMe v-if="pageActive === 'about'" :key="pageActive" />
      <div
        v-if="replyFullText"
        class="rounded-xl border border-slate-300 bg-slate-100 p-4 dark:border-slate-600 dark:bg-slate-800/80"
      >
        <p class="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          Reply
        </p>
        <p class="min-h-[1.25rem] text-slate-800 dark:text-slate-200">
           
          {{ replyDisplayed }}
          <span
            v-if="isReplyTyping"
            class="reply-caret ml-0.5 inline-block h-4 w-0.5 align-middle bg-blue-500"
          />
        </p>
      </div>
    </div>
    <div class="shrink-0 px-4 pb-8 pt-4">
      <CursorStyleInput
        typing-text="Welcome Visitor"
        placeholder="Welcome Visitor"
        @close-tab="() => {}"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { pageActive } = useNavigation()

const { setPage } = useNavigation()

const replyFullText = ref('')
const replyDisplayed = ref('')
const isReplyTyping = ref(false)

const REPLY_SPEED_MS = 40

let replyInterval: ReturnType<typeof setInterval> | null = null

function startReplyTyping(text: string) {
  replyFullText.value = text
  replyDisplayed.value = ''
  isReplyTyping.value = true
  let index = 0
  replyInterval = setInterval(() => {
    if (index < text.length) {
      replyDisplayed.value += text[index]
      index++
    } else {
      if (replyInterval) clearInterval(replyInterval)
      replyInterval = null
      isReplyTyping.value = false
    }
  }, REPLY_SPEED_MS)
}

function onSubmit(value: string) {
  if (!value.trim()) return
  startReplyTyping(value.trim())
}

onUnmounted(() => {
  if (replyInterval) clearInterval(replyInterval)
})
</script>


<style scoped>
.reply-caret {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
