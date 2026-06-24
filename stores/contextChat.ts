import { defineStore } from 'pinia'

const SESSION_KEY = 'context-demo-session-id'

export interface ContextMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ContextPreset {
  id: string
  label: string
  text: string
}

export interface ContextSession {
  sessionId: string | null
  contextId: string | null
  contextLabel: string | null
  contextText: string | null
  messages: ContextMessage[]
  presets: ContextPreset[]
}

export const useContextChatStore = defineStore('contextChat', {
  state: () => ({
    sessionId: null as string | null,
    contextId: null as string | null,
    contextLabel: null as string | null,
    contextText: null as string | null,
    messages: [] as ContextMessage[],
    presets: [] as ContextPreset[],
    loading: false,
    switching: false,
    error: null as string | null,
    lastToolOutput: null as string | null,
  }),
  actions: {
    getApiBase() {
      return useRuntimeConfig().public.taskBaseUrl as string
    },
    loadSessionId() {
      if (import.meta.client && !this.sessionId) {
        const stored = localStorage.getItem(SESSION_KEY)
        if (stored) this.sessionId = stored
      }
    },
    saveSessionId(id: string) {
      this.sessionId = id
      if (import.meta.client) {
        localStorage.setItem(SESSION_KEY, id)
      }
    },
    applySession(data: Partial<ContextSession> & { session_id?: string }) {
      if (data.session_id) this.saveSessionId(data.session_id)
      if (data.contextId ?? data.context_id) {
        this.contextId = (data.contextId ?? data.context_id) as string
      }
      if (data.contextLabel ?? data.context_label) {
        this.contextLabel = (data.contextLabel ?? data.context_label) as string
      }
      if (data.contextText ?? data.context_text) {
        this.contextText = (data.contextText ?? data.context_text) as string
      }
      if (data.messages) this.messages = data.messages
      if (data.presets) this.presets = data.presets
    },
    async initSession() {
      this.loadSessionId()
      this.error = null
      try {
        if (this.sessionId) {
          const data = await $fetch<{
            success: boolean
            session_id: string
            context_id: string
            context_label: string
            context_text: string
            messages: ContextMessage[]
            presets: ContextPreset[]
          }>(`${this.getApiBase()}/context/session/${this.sessionId}`)
          this.applySession({
            session_id: data.session_id,
            context_id: data.context_id,
            context_label: data.context_label,
            context_text: data.context_text,
            messages: data.messages,
            presets: data.presets,
          })
        } else {
          const data = await $fetch<{ success: boolean; presets: ContextPreset[] }>(
            `${this.getApiBase()}/context/presets`,
          )
          this.presets = data.presets ?? []
          this.contextId = 'color'
          const preset = this.presets.find((p) => p.id === 'color')
          if (preset) {
            this.contextLabel = preset.label
            this.contextText = preset.text
          }
        }
      } catch (e) {
        this.error = e instanceof Error ? e.message : String(e)
      }
    },
    async switchContext(contextId: string) {
      this.switching = true
      this.error = null
      try {
        const data = await $fetch<{
          success: boolean
          session_id: string
          context_id: string
          context_label: string
          context_text: string
          messages: ContextMessage[]
        }>(`${this.getApiBase()}/context/switch`, {
          method: 'POST',
          body: {
            session_id: this.sessionId,
            context_id: contextId,
          },
        })
        this.applySession({
          session_id: data.session_id,
          context_id: data.context_id,
          context_label: data.context_label,
          context_text: data.context_text,
          messages: data.messages,
        })
      } catch (e) {
        this.error = e instanceof Error ? e.message : String(e)
        throw e
      } finally {
        this.switching = false
      }
    },
    async sendMessage(query: string) {
      if (!query.trim()) return null

      this.loading = true
      this.error = null
      this.lastToolOutput = null

      try {
        const data = await $fetch<{
          success: boolean
          session_id: string
          context_id: string
          context_label: string
          context_text: string
          response?: string
          tool_output?: string | null
          messages: ContextMessage[]
          presets?: ContextPreset[]
        }>(`${this.getApiBase()}/context/chat`, {
          method: 'POST',
          body: {
            session_id: this.sessionId,
            query: query.trim(),
          },
          timeout: 60000,
        })

        this.applySession({
          session_id: data.session_id,
          context_id: data.context_id,
          context_label: data.context_label,
          context_text: data.context_text,
          messages: data.messages,
          presets: data.presets,
        })
        this.lastToolOutput = data.tool_output ?? null
        return data
      } catch (e) {
        this.error = e instanceof Error ? e.message : String(e)
        throw e
      } finally {
        this.loading = false
      }
    },
    async runColorTool() {
      return this.sendMessage('Run the get_color_from_context tool')
    },
  },
})
