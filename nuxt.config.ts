// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
  runtimeConfig: {
    // Server-only: where to proxy /api/task/* (Task Agent backend)
    taskAgentUrl: process.env.TASK_AGENT_URL ?? process.env.NUXT_TASK_AGENT_URL ?? 'http://127.0.0.1:8001',
    public: {
      // Client: use same-origin proxy by default to avoid CORS / mixed content
      taskBaseUrl: process.env.TASK_BASE_URL ?? process.env.NUXT_PUBLIC_TASK_BASE_URL ?? '/api/task',
      ragBaseUrl: process.env.TASK_RAG_BASE_URL ?? process.env.NUXT_PUBLIC_RAG_BASE_URL ?? '/api/rag',
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
  tailwindcss: {
    config: {
      darkMode: 'class',
    },
  },
})