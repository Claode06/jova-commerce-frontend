<template>
  <div class="min-h-screen flex items-center justify-center px-6 py-20 bg-white">
    <div class="w-full max-w-md">
      <h1 class="text-3xl font-serif font-bold text-center mb-2">Create Account</h1>
      <p class="text-sm text-gray-400 text-center mb-10">Join the community</p>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <!-- Name -->
        <div>
          <label class="block text-xs uppercase tracking-widest text-gray-400 mb-2">Nama Lengkap</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-300">
              <Icon name="heroicons:user" class="w-4 h-4" />
            </span>
            <input v-model="name" type="text" placeholder="Nama Anda" class="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-sm focus:border-black focus:outline-none transition-colors pl-11" required />
          </div>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-xs uppercase tracking-widest text-gray-400 mb-2">Email</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-300">
              <Icon name="heroicons:envelope" class="w-4 h-4" />
            </span>
            <input v-model="email" type="email" placeholder="nama@email.com" class="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-sm focus:border-black focus:outline-none transition-colors pl-11" required autocomplete="email" />
          </div>
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-xs uppercase tracking-widest text-gray-400 mb-2">No. Telepon</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-300">
              <Icon name="heroicons:phone" class="w-4 h-4" />
            </span>
            <input v-model="phone" type="tel" placeholder="081234567890" class="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-sm focus:border-black focus:outline-none transition-colors pl-11" required />
          </div>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-xs uppercase tracking-widest text-gray-400 mb-2">Kata Sandi</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-300">
              <Icon name="heroicons:lock-closed" class="w-4 h-4" />
            </span>
            <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Min. 6 karakter" class="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-sm focus:border-black focus:outline-none transition-colors pl-11 pr-11" required minlength="6" autocomplete="new-password" />
            <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-300 hover:text-gray-600 transition-colors" @click="showPassword = !showPassword">
              <Icon v-if="showPassword" name="heroicons:eye-slash" class="w-4 h-4" />
              <Icon v-else name="heroicons:eye" class="w-4 h-4" />
            </button>
          </div>
          <p class="text-xs text-gray-300 mt-1.5">Minimal 6 karakter</p>
        </div>

        <!-- Error -->
        <div v-if="error" class="bg-red-50 text-red-600 text-sm p-4 rounded-2xl border border-red-100 flex items-center gap-2">
          <Icon name="heroicons:exclamation-circle" class="w-5 h-5 shrink-0" />
          <span>{{ error }}</span>
        </div>

        <!-- Submit -->
        <button type="submit" class="w-full py-3.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" :disabled="loading">
          <span v-if="loading" class="loading loading-spinner loading-sm"></span>
          <span v-else>Daftar</span>
        </button>
      </form>

      <!-- Divider -->
      <div class="flex items-center gap-4 my-8">
        <div class="flex-1 h-px bg-gray-100"></div>
        <span class="text-xs text-gray-300 uppercase tracking-wider">atau</span>
        <div class="flex-1 h-px bg-gray-100"></div>
      </div>

      <!-- Login Link -->
      <div class="text-center">
        <p class="text-sm text-gray-500">
          Sudah punya akun?
          <NuxtLink to="/login" class="text-sm text-black font-medium underline underline-offset-2 hover:text-gray-600 transition-colors">Masuk</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
})

const { register } = useAuth()
const router = useRouter()

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref<string | null>(null)
const loading = ref(false)

async function handleRegister() {
  error.value = null
  loading.value = true
  try {
    await register(name.value, email.value, phone.value, password.value)
    router.push('/')
  } catch (e: any) {
    error.value = e.message || 'Pendaftaran gagal, coba lagi'
  } finally {
    loading.value = false
  }
}
</script>
