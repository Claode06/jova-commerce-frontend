<template>
  <div class="min-h-screen flex items-center justify-center px-6 py-20 bg-white">
    <div class="w-full max-w-md">
      <h1 class="text-3xl font-serif font-bold text-center mb-2">Welcome Back</h1>
      <p class="text-sm text-gray-400 text-center mb-10">Sign in to your account</p>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Email -->
        <div>
          <label class="block text-xs uppercase tracking-widest text-gray-400 mb-2">Email</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-300">
              <Icon name="heroicons:envelope" class="w-4 h-4" />
            </span>
            <input
              v-model="email"
              type="email"
              placeholder="nama@email.com"
              class="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-sm focus:border-black focus:outline-none transition-colors pl-11"
              required
              autocomplete="email"
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs uppercase tracking-widest text-gray-400">Kata Sandi</label>
            <a class="text-xs text-gray-400 hover:text-black underline-offset-2 hover:underline transition-colors">Lupa kata sandi?</a>
          </div>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-300">
              <Icon name="heroicons:lock-closed" class="w-4 h-4" />
            </span>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-sm focus:border-black focus:outline-none transition-colors pl-11 pr-11"
              required
              autocomplete="current-password"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-300 hover:text-gray-600 transition-colors"
              @click="showPassword = !showPassword"
            >
              <Icon v-if="showPassword" name="heroicons:eye-slash" class="w-4 h-4" />
              <Icon v-else name="heroicons:eye" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Remember -->
        <div class="flex items-center gap-2">
          <input type="checkbox" class="w-4 h-4 border border-gray-300 rounded accent-black" checked />
          <span class="text-xs text-gray-500">Ingat saya</span>
        </div>

        <!-- Error -->
        <div v-if="error" class="bg-red-50 text-red-600 text-sm p-4 rounded-2xl border border-red-100 flex items-center gap-2">
          <Icon name="heroicons:exclamation-circle" class="w-5 h-5 shrink-0" />
          <span>{{ error }}</span>
        </div>

        <!-- Submit -->
        <button type="submit" class="w-full py-3.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" :disabled="loading">
          <span v-if="loading" class="loading loading-spinner loading-sm"></span>
          <span v-else>Masuk</span>
        </button>
      </form>

      <!-- Divider -->
      <div class="flex items-center gap-4 my-8">
        <div class="flex-1 h-px bg-gray-100"></div>
        <span class="text-xs text-gray-300 uppercase tracking-wider">atau</span>
        <div class="flex-1 h-px bg-gray-100"></div>
      </div>

      <!-- Register Link -->
      <div class="text-center">
        <p class="text-sm text-gray-500">
          Belum punya akun?
          <NuxtLink to="/register" class="text-sm text-black font-medium underline underline-offset-2 hover:text-gray-600 transition-colors">Daftar</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
})

const { login } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref<string | null>(null)
const loading = ref(false)

async function handleLogin() {
  error.value = null
  loading.value = true
  try {
    await login(email.value, password.value)
    router.push('/')
  } catch (e: any) {
    error.value = e.message || 'Email atau kata sandi salah'
  } finally {
    loading.value = false
  }
}
</script>
