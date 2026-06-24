import { defineStore } from 'pinia'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: number
}

export interface RequestSource {
  ip: string | null
  userAgent: string | null
  forwardedFor: string | null
  realIp: string | null
  forwardedProto: string | null
  host: string | null
  timestamp: number
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as ChatMessage[],
    loading: false,
    error: null as string | null,
    /** Request source from bootstrap (IP, headers). Null until bootstrap() is called. */
    requestSource: null as RequestSource | null,
    bootstrapError: null as string | null,
  }),
  getters: {
    lastMessage: (state) =>
      state.messages.length ? state.messages[state.messages.length - 1] : null,
    /** Best available client IP: X-Real-IP when behind a proxy, otherwise ip (e.g. ::1 in dev). */
    clientIp: (state) =>
      state.requestSource?.realIp ?? state.requestSource?.ip ?? null,
  },
  actions: {
    getApiBase() {
      return useRuntimeConfig().public.taskBaseUrl as string
    },
    /**
     * Call the bootstrap API to capture request source (IP, user-agent, etc.).
     * Call early (e.g. app init or before first chat) to identify the client.
     */
    async bootstrap() {
      this.bootstrapError = null
      try {
        const data = await $fetch<RequestSource>('/api/bootstrap')
        this.requestSource = data
        return data
      } catch (e) {
        this.bootstrapError = e instanceof Error ? e.message : String(e)
        throw e
      }
    },
    async sendMessage(content: string) {
      if (!content.trim()) return null
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: content.trim(),
        createdAt: Date.now(),
      }
      this.messages.push(userMsg)
      this.loading = true
      this.error = null
      try {
        if (!this.requestSource) await this.bootstrap()
        const data = await $fetch<{ reply?: string; response?: string; message?: string }>(
          `${this.getApiBase()}/chat`,
          {
            method: 'POST',
            body: { query: content.trim() },
            timeout: 120000, // 2 min for LLM response
          },
        )
        const replyText =
          data.reply ?? data.response ?? data.message ?? (typeof data === 'string' ? data : '')
        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: String(replyText),
          createdAt: Date.now(),
        }
        this.messages.push(assistantMsg)
        return assistantMsg
      } catch (e) {
        this.error = e instanceof Error ? e.message : String(e)
        const errMsg: ChatMessage = {
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
    clearMessages() {
      this.messages = []
      this.error = null
    },
    clearError() {
      this.error = null
      this.bootstrapError = null
    },
  },
})
