<template>
  <section class="space-y-6" :class="textColor">
    <div>
      <h1 class="text-2xl font-bold">Live Context Switching</h1>
      <p class="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300">
        Assignment 2 demo: one chat session, same history, but the bot&apos;s
        <strong>live context</strong> switches via the button below and changes tool output.
      </p>
    </div>

    <!-- Live context panel -->
    <div
      class="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-white"
    >
      <div class="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Live context
          </p>
          <p class="text-sm font-semibold">{{ contextLabel || 'Favorite Color' }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="preset in presets"
            :key="preset.id"
            type="button"
            :disabled="switching || loading || contextId === preset.id"
            :class="[
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              contextId === preset.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600',
              (switching || loading) && 'opacity-60 cursor-not-allowed',
            ]"
            @click="onSwitch(preset.id)"
          >
            {{ preset.id === 'color' ? 'Color context' : 'Food context' }}
          </button>
        </div>
      </div>
      <p
        class="rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-800 dark:border-slate-300 dark:bg-white dark:text-slate-800"
      >
        {{ contextText || 'My favorite color is red.' }}
      </p>
      <p v-if="lastToolOutput" class="mt-3 text-sm">
        Latest tool output:
        <span
          class="ml-1 inline-block rounded-md px-2 py-0.5 font-bold"
          :class="toolBadgeClass"
        >
          {{ lastToolOutput }}
        </span>
      </p>
    </div>

    <!-- Chat history -->
    <div
      class="min-h-[200px] rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-white"
    >
      <p class="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Session chat history (persists across context switches)
      </p>
      <div v-if="!messages.length" class="text-sm text-slate-500 dark:text-slate-400">
        No messages yet. Ask something like
        <em>&quot;What does the color tool return?&quot;</em>
        or click <strong>Run color tool</strong>.
      </div>
      <ul class="space-y-3">
        <li
          v-for="(msg, index) in messages"
          :key="index"
          :class="msg.role === 'user' ? 'text-right' : 'text-left'"
        >
          <span
            class="inline-block max-w-[90%] rounded-xl px-3 py-2 text-sm"
            :class="
              msg.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'border border-slate-200 bg-white text-slate-800 dark:border-slate-300 dark:bg-white dark:text-slate-800'
            "
          >
            {{ msg.content }}
          </span>
        </li>
      </ul>
      <p v-if="loading" class="mt-3 text-sm text-slate-500">Thinking…</p>
    </div>

    <p v-if="error" class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>

    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-60"
        :disabled="loading || switching"
        @click="onRunTool"
      >
        Run color tool
      </button>
    </div>

    <CursorStyleInput
      typing-text="Ask about the live context or run the color tool…"
      placeholder="Ask about the live context or run the color tool…"
      @close-tab="() => {}"
      @submit="onSubmit"
    />
  </section>
</template>

<script setup lang="ts">
import { useContextChatStore } from '../../stores/contextChat'

const { textColor } = useDarkMode()
const store = useContextChatStore()
const {
  contextId,
  contextLabel,
  contextText,
  messages,
  presets,
  loading,
  switching,
  error,
  lastToolOutput,
} = storeToRefs(store)

const toolBadgeClass = computed(() => {
  if (lastToolOutput.value === 'Red') {
    return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
  }
  if (lastToolOutput.value === 'Green') {
    return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
  }
  return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
})

onMounted(() => {
  store.initSession()
})

async function onSwitch(contextId: string) {
  await store.switchContext(contextId)
}

async function onSubmit(value: string) {
  if (!value.trim()) return
  try {
    await store.sendMessage(value.trim())
  } catch {
    // error shown in store
  }
}

async function onRunTool() {
  try {
    await store.runColorTool()
  } catch {
    // error shown in store
  }
}
</script>
