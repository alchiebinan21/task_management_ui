import { defineStore } from 'pinia'

export interface RagMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: number
}

export interface RagStatus {
  indexed: boolean
  filename: string | null
  pages: number | null
  chunks: number | null
  characters: number | null
}

export interface RagSource {
  text: string
  chunk_index?: number | null
  source?: string | null
  score?: number | null
}

export const useRagStore = defineStore('rag', {
  state: () => ({
    status: {
      indexed: false,
      filename: null,
      pages: null,
      chunks: null,
      characters: null,
    } as RagStatus,
    messages: [] as RagMessage[],
    uploading: false,
    loading: false,
    clearing: false,
    error: null as string | null,
  }),
  getters: {
    isReady: (state) => state.status.indexed,
    lastMessage: (state) =>
      state.messages.length ? state.messages[state.messages.length - 1] : null,
  },
  actions: {
    getApiBase() {
      return useRuntimeConfig().public.ragBaseUrl as string
    },
    async fetchStatus() {
      this.error = null
      try {
        const data = await $fetch<RagStatus & { success: boolean }>(
          `${this.getApiBase()}/status`,
        )
        this.status = {
          indexed: data.indexed,
          filename: data.filename ?? null,
          pages: data.pages ?? null,
          chunks: data.chunks ?? null,
          characters: data.characters ?? null,
        }
        return this.status
      } catch (e) {
        this.error = e instanceof Error ? e.message : String(e)
        throw e
      }
    },
    async uploadPdf(file: File) {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        throw new Error('Only PDF files are supported.')
      }

      this.uploading = true
      this.error = null
      try {
        const formData = new FormData()
        formData.append('file', file)

        const data = await $fetch<{
          success: boolean
          filename?: string
          pages?: number
          chunks?: number
          characters?: number
          message?: string
        }>(`${this.getApiBase()}/upload`, {
          method: 'POST',
          body: formData,
        })

        this.status = {
          indexed: true,
          filename: data.filename ?? file.name,
          pages: data.pages ?? null,
          chunks: data.chunks ?? null,
          characters: data.characters ?? null,
        }
        this.messages = []
        return data
      } catch (e) {
        this.error = e instanceof Error ? e.message : String(e)
        throw e
      } finally {
        this.uploading = false
      }
    },
    async askQuestion(content: string) {
      if (!content.trim()) return null
      if (!this.status.indexed) {
        this.error = 'Upload a PDF first.'
        return null
      }

      const userMsg: RagMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: content.trim(),
        createdAt: Date.now(),
      }
      this.messages.push(userMsg)
      this.loading = true
      this.error = null

      try {
        const data = await $fetch<{
          success: boolean
          response?: string
          sources?: RagSource[]
          error?: string
        }>(`${this.getApiBase()}/chat`, {
          method: 'POST',
          body: { query: content.trim() },
          timeout: 120000,
        })

        const assistantMsg: RagMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.response ?? 'No response.',
          createdAt: Date.now(),
        }
        this.messages.push(assistantMsg)
        return { message: assistantMsg, sources: data.sources ?? [] }
      } catch (e) {
        this.error = e instanceof Error ? e.message : String(e)
        const errMsg: RagMessage = {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: `Error: ${this.error}`,
          createdAt: Date.now(),
        }
        this.messages.push(errMsg)
        throw e
      } finally {
        this.loading = false
      }
    },
    async clearIndex() {
      this.clearing = true
      this.error = null
      try {
        await $fetch(`${this.getApiBase()}/clear`, { method: 'DELETE' })
        this.status = {
          indexed: false,
          filename: null,
          pages: null,
          chunks: null,
          characters: null,
        }
        this.messages = []
      } catch (e) {
        this.error = e instanceof Error ? e.message : String(e)
        throw e
      } finally {
        this.clearing = false
      }
    },
    clearError() {
      this.error = null
    },
  },
})
