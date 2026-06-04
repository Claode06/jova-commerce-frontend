<template>
  <div class="max-w-lg mx-auto px-6 py-12">
    <h1 class="text-3xl font-serif font-bold mb-10">Profil Saya</h1>

    <div class="bg-white border border-gray-100 rounded-3xl p-8">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-16 h-16 rounded-full bg-gray-100 text-gray-500 text-lg flex items-center justify-center">
          {{ user?.name?.[0] || 'U' }}
        </div>
        <div>
          <p class="text-lg font-serif font-semibold">{{ user?.name }}</p>
          <p class="text-sm text-gray-400">{{ user?.email }}</p>
        </div>
      </div>

        <form @submit.prevent="handleUpdate" class="space-y-4">
          <div class="form-control">
            <label class="label"><span class="label-text">Nama</span></label>
            <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-300">
                  <Icon name="heroicons:user" class="w-4 h-4" />
                </span>
                <input v-model="form.name" type="text" class="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:border-black focus:outline-none transition-colors pl-11" required />
              </div>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Email</span></label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-300">
                  <Icon name="heroicons:envelope" class="w-4 h-4" />
                </span>
                <input v-model="form.email" type="email" class="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:border-black focus:outline-none transition-colors pl-11" required />
              </div>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">No. Telepon</span></label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-300">
                  <Icon name="heroicons:phone" class="w-4 h-4" />
                </span>
                <input v-model="form.phone" type="tel" class="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:border-black focus:outline-none transition-colors pl-11" required />
              </div>
          </div>

          <div v-if="success" class="bg-gray-50 text-gray-700 text-sm p-4 rounded-2xl border border-gray-100 flex items-center gap-2">
            <Icon name="heroicons:check-circle" class="w-5 h-5 shrink-0" />
            <span>Profil berhasil diperbarui</span>
          </div>
          <div v-if="error" class="bg-red-50 text-red-600 text-sm p-4 rounded-2xl border border-red-100 flex items-center gap-2">
            <Icon name="heroicons:exclamation-circle" class="w-5 h-5 shrink-0" />
            <span>{{ error }}</span>
          </div>

          <button type="submit" class="w-full py-3.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50" :disabled="updating">
            <span v-if="updating" class="loading loading-spinner loading-sm"></span>
            <span v-else class="flex items-center gap-2">
              <Icon name="heroicons:check" class="w-5 h-5" />
              Simpan Perubahan
            </span>
          </button>
        </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { user, updateProfile } = useAuth()
const form = reactive({
  name: '',
  email: '',
  phone: '',
})
const updating = ref(false)
const success = ref(false)
const error = ref<string | null>(null)

watch(user, (u) => {
  if (u) {
    form.name = u.name
    form.email = u.email
    form.phone = u.phone || ''
  }
}, { immediate: true })

async function handleUpdate() {
  updating.value = true
  success.value = false
  error.value = null
  try {
    await updateProfile({ name: form.name, email: form.email, phone: form.phone })
    success.value = true
    setTimeout(() => { success.value = false }, 3000)
  } catch (e: any) {
    error.value = e.message
  } finally {
    updating.value = false
  }
}
</script>
