/**
 * Proxy /api/rag/* to the Task Agent RAG API (same-origin to avoid CORS).
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = (config.taskAgentUrl || 'http://127.0.0.1:8001').replace(/\/$/, '')
  const path = event.path.replace(/^\/api\/rag\/?/, 'rag/') || 'rag/'
  const query = getRequestURL(event).search
  const target = `${baseUrl}/${path}${query || ''}`
  return proxyRequest(event, target)
})
