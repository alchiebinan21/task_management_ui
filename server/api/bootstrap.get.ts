/**
 * Returns request source info (IP, headers) for bootstrap / debugging.
 * Called by the chat store to identify the client.
 */
export default defineEventHandler((event) => {
  const ip = getRequestIP(event, { xForwardedFor: true })
  const headers = getRequestHeaders(event)
  return {
    ip: ip ?? null,
    userAgent: headers['user-agent'] ?? null,
    forwardedFor: headers['x-forwarded-for'] ?? null,
    realIp: headers['x-real-ip'] ?? null,
    forwardedProto: headers['x-forwarded-proto'] ?? null,
    host: headers['host'] ?? null,
    timestamp: Date.now(),
  }
})
