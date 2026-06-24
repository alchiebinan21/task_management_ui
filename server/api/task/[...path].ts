/**
 * Proxy /api/task/* to the Task Agent API (same-origin to avoid CORS / strict-origin).
 * Backend URL is set via TASK_AGENT_URL or NUXT_TASK_AGENT_URL (server-only).
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = (config.taskAgentUrl || 'http://127.0.0.1:8001').replace(/\/$/, '')
  const path = event.path.replace(/^\/api\/task\/?/, '') || ''
  const query = getRequestURL(event).search
  const target = `${baseUrl}/${path}${query || ''}`
  return proxyRequest(event, target)
})
