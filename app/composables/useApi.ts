export const useApi = <T = any>(url: string, opts?: any) => {
  const config = useRuntimeConfig()
  const token = useCookie('auth_token')

  const headers: Record<string, string> = {
    Accept: 'application/json',
  }

  if (token.value) {
    headers.Authorization = `Bearer ${token.value}`
  }

  if (opts?.body && typeof opts.body === 'object' && !(opts.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  return useFetch<T>(`${config.public.apiBase}${url}`, {
    ...opts,
    headers: {
      ...headers,
      ...opts?.headers,
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        const authToken = useCookie('auth_token')
        authToken.value = null
        if (process.client) {
          navigateTo('/login')
        }
      }
    },
  })
}
