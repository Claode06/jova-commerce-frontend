const toasts = ref<Toast[]>([])
let nextId = 0

export const useToast = () => {
  function show(message: string, type: 'success' | 'error' | 'info' = 'success', duration = 3000) {
    const id = ++nextId
    toasts.value.push({ id, message, type })
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, duration)
  }

  function dismiss(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  return { toasts, show, dismiss }
}

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}
