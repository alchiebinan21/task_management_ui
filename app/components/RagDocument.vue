<template>
  <section class="rag-document flex flex-col gap-4" :class="textColor">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-lg font-semibold">Document AI</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Upload a PDF and ask questions about its contents.
        </p>
      </div>
      <button
        v-if="status.indexed"
        type="button"
        class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm transition hover:bg-slate-200/60 dark:border-slate-600 dark:hover:bg-slate-700/60"
        :disabled="clearing"
        @click="onClear"
      >
        {{ clearing ? 'Clearing…' : 'Clear document' }}
      </button>
    </div>

    <p v-if="error" class="text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </p>

    <label
      v-if="!status.indexed"
      class="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-blue-400 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800/50 dark:hover:border-blue-500 dark:hover:bg-slate-800"
      :class="{ 'pointer-events-none opacity-60': uploading }"
      @dragover.prevent
      @drop.prevent="onDrop"
    >
      <input
        ref="fileInputRef"
        type="file"
        accept=".pdf,application/pdf"
        class="hidden"
        @change="onFileSelect"
      />
      <svg class="h-10 w-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <span class="font-medium">
        {{ uploading ? 'Indexing PDF…' : 'Drop a PDF here or click to upload' }}
      </span>
      <span class="text-xs text-slate-500 dark:text-slate-400">
        The agent will chunk and index the document for Q&amp;A.
      </span>
    </label>

    <div
      v-else
      class="rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 dark:border-slate-600 dark:bg-slate-800/80"
    >
      <p class="text-sm font-medium text-green-700 dark:text-green-400">
        Document indexed
      </p>
      <p class="mt-1 text-sm">
        <span class="text-slate-500 dark:text-slate-400">File:</span>
        {{ status.filename }}
      </p>
      <p class="text-sm text-slate-600 dark:text-slate-300">
        {{ status.pages }} page(s) · {{ status.chunks }} chunk(s)
      </p>
      <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
        Use the chat box below to ask questions about this document.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRagStore } from '../../stores/rag'

const { textColor } = useDarkMode()
const ragStore = useRagStore()
const { status, uploading, clearing, error } = storeToRefs(ragStore)
const { fetchStatus, uploadPdf, clearIndex } = ragStore

onMounted(() => {
  fetchStatus().catch(() => {})
})

async function handleFile(file: File | undefined) {
  if (!file) return
  try {
    await uploadPdf(file)
  } catch {
    // error stored in ragStore
  }
}

function onFileSelect(event: Event) {
  const input = event.target as HTMLInputElement
  handleFile(input.files?.[0])
  input.value = ''
}

function onDrop(event: DragEvent) {
  handleFile(event.dataTransfer?.files?.[0])
}

async function onClear() {
  try {
    await clearIndex()
  } catch {
    // error stored in ragStore
  }
}
</script>
