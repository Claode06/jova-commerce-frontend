export const useAuth = () => {
  const user = ref<null | {
    id: number
    name: string
    email: string
    phone: string
  }>(null)

  const token = useCookie('auth_token', {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
  })

  const isLoggedIn = computed(() => !!token.value)

  async function login(email: string, password: string) {
    const { data, error } = await useApi('/login', {
      method: 'POST',
      body: { email, password },
    })

    if (error.value) throw new Error(error.value.data?.message || 'Login failed')

    token.value = data.value.token
    user.value = data.value.user
    return data.value
  }

  async function register(name: string, email: string, phone: string, password: string) {
    const { data, error } = await useApi('/register', {
      method: 'POST',
      body: { name, email, phone, password },
    })

    if (error.value) throw new Error(error.value.data?.message || 'Register failed')

    token.value = data.value.token
    user.value = data.value.user
    return data.value
  }

  async function fetchMe() {
    if (!token.value) return null
    const { data, error } = await useApi('/me')
    if (error.value) {
      token.value = null
      user.value = null
      return null
    }
    user.value = data.value?.user || data.value
    return user.value
  }

  async function logout() {
    await useApi('/logout', { method: 'POST' })
    token.value = null
    user.value = null
    navigateTo('/login')
  }

  async function updateProfile(body: { name?: string; email?: string; phone?: string }) {
    const { data } = await useApi('/profile', {
      method: 'PUT',
      body,
    })
    user.value = data.value?.user || data.value
    return user.value
  }

  return {
    user,
    token,
    isLoggedIn,
    login,
    register,
    fetchMe,
    logout,
    updateProfile,
  }
}
