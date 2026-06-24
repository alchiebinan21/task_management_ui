import { useChatStore } from '../../stores/chat'
import { useRagStore } from '../../stores/rag'

export type PageChatMode = 'task' | 'rag'

export function usePageChat(mode: PageChatMode) {
  const chatStore = useChatStore()
  const ragStore = useRagStore()
  const { loading: chatLoading } = storeToRefs(chatStore)
  const { loading: ragLoading, status: ragStatus } = storeToRefs(ragStore)

  const isReplyLoading = computed(() =>
    mode === 'rag' ? ragLoading.value : chatLoading.value,
  )

  const inputHint = computed(() => {
    if (mode === 'rag') {
      if (ragStatus.value.indexed) {
        return 'Ask a question about your PDF…'
      }
      return 'Upload a PDF to get started…'
    }
    return 'Welcome Visitor'
  })

  const replyFullText = ref('')
  const replyDisplayed = ref('')
  const isReplyTyping = ref(false)

  const REPLY_SPEED_MS = 40
  let replyInterval: ReturnType<typeof setInterval> | null = null

  function startReplyTyping(text: string) {
    replyFullText.value = text
    replyDisplayed.value = ''
    isReplyTyping.value = true
    let index = 0
    replyInterval = setInterval(() => {
      if (index < text.length) {
        replyDisplayed.value += text[index]
        index++
      } else {
        if (replyInterval) clearInterval(replyInterval)
        replyInterval = null
        isReplyTyping.value = false
      }
    }, REPLY_SPEED_MS)
  }

  async function onSubmit(value: string) {
    if (!value.trim()) return
    try {
      if (mode === 'rag') {
        if (!ragStatus.value.indexed) {
          startReplyTyping('Upload a PDF first to ask questions about it.')
          return
        }
        const result = await ragStore.askQuestion(value.trim())
        if (result?.message) {
          startReplyTyping(result.message.content)
        }
        return
      }

      const assistantMsg = await chatStore.sendMessage(value.trim())
      if (assistantMsg) {
        startReplyTyping(assistantMsg.content)
      }
    } catch {
      const last = mode === 'rag' ? ragStore.lastMessage : chatStore.lastMessage
      if (last) startReplyTyping(last.content)
    }
  }

  onUnmounted(() => {
    if (replyInterval) clearInterval(replyInterval)
  })

  return {
    inputHint,
    isReplyLoading,
    replyFullText,
    replyDisplayed,
    isReplyTyping,
    onSubmit,
  }
}
