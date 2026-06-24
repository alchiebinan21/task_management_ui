<template>
  <div class="flex min-h-[calc(100vh-8rem)] flex-col mx-auto text-slate-800 dark:text-slate-200">
    <div id="main-section" class="flex-1 space-y-6 px-4 pt-8 pb-4" :class="textColor">
      <slot />
      <div
        v-if="showChat && (replyFullText || isReplyLoading)"
        class="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800/80"
      >
        <p class="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          Reply
        </p>
        <p class="min-h-[1.25rem] text-slate-800 dark:text-slate-200">
          <template v-if="isReplyLoading && !replyDisplayed">
            Sending…
          </template>
          <template v-else>
            {{ replyDisplayed }}
            <span
              v-if="isReplyTyping"
              class="reply-caret ml-0.5 inline-block h-4 w-0.5 align-middle bg-blue-500"
            />
          </template>
        </p>
      </div>
    </div>
    <div v-if="showChat" class="px-4 pb-8 pt-4 w-full max-w-4xl mx-auto">
      <CursorStyleInput
        :typing-text="inputHint"
        :placeholder="inputHint"
        @close-tab="() => {}"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PageChatMode } from '../composables/usePageChat'

const props = withDefaults(
  defineProps<{
    chatMode?: PageChatMode
    showChat?: boolean
  }>(),
  { showChat: true },
)

const { textColor } = useDarkMode()
const {
  inputHint,
  isReplyLoading,
  replyFullText,
  replyDisplayed,
  isReplyTyping,
  onSubmit,
} = usePageChat(props.chatMode ?? 'task')
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
