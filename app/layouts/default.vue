<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Navbar -->
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-accent-200">
      <div class="flex items-center justify-between px-6 md:px-12 h-16">
        <NuxtLink to="/" class="text-xl md:text-2xl font-serif font-bold tracking-tight bg-gradient-to-r from-accent-600 to-accent-400 bg-clip-text text-transparent no-underline">
          Jova Mart
        </NuxtLink>

        <div class="flex items-center gap-6">
          <!-- Desktop Search -->
          <div class="hidden md:flex items-center">
            <div v-if="searchOpen" class="flex items-center border-b border-accent-400">
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="w-64 px-0 py-1.5 text-sm bg-transparent border-none outline-none placeholder:text-gray-300"
                @keyup.enter="goSearch"
                @blur="closeSearch"
              />
              <button @click="goSearch" class="p-1 group">
                <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-black group-hover:text-accent-400 transition-colors" />
              </button>
            </div>
            <button v-else @click="openSearch" class="p-1 group">
              <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-black group-hover:text-accent-400 transition-colors" />
            </button>
          </div>

          <NuxtLink to="/cart" class="relative p-1 transition-colors hover:text-accent-400">
            <Icon name="heroicons:shopping-cart" class="w-5 h-5" />
            <span
              v-if="cartTotal > 0"
              class="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-accent-400 text-white text-[8px] flex items-center justify-center rounded-full"
            >
              {{ cartTotal > 9 ? '9+' : cartTotal }}
            </span>
          </NuxtLink>

          <template v-if="isLoggedIn || user">
            <div ref="dropdownRef" class="relative">
              <button @click="dropdownOpen = !dropdownOpen" class="flex items-center gap-2 p-1 transition-colors hover:text-accent-400">
                <div class="w-7 h-7 rounded-full bg-gray-100 text-gray-600 text-xs font-medium flex items-center justify-center shrink-0 ring-2 ring-accent-200">
                  {{ user?.name?.[0]?.toUpperCase() || 'A' }}
                </div>
                <span class="text-sm text-gray-600 max-w-[120px] truncate">{{ user?.name || 'Akun' }}</span>
              </button>
              <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-sm py-2 z-50">
                <NuxtLink to="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:text-accent-400 hover:bg-gray-50 transition-colors">Pesanan Saya</NuxtLink>
                <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-accent-400 hover:bg-gray-50 transition-colors">Keluar</button>
              </div>
            </div>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="text-sm text-gray-600 hover:text-accent-400 transition-colors hidden md:inline">Masuk</NuxtLink>
            <NuxtLink to="/register" class="text-sm font-medium text-accent-600 border border-accent-300 rounded-full px-5 py-1.5 hover:bg-accent-400 hover:text-white hover:border-accent-400 transition-all hidden md:inline">Daftar</NuxtLink>
          </template>

          <!-- Mobile: search + menu toggles -->
          <button class="block md:hidden p-1 hover:text-accent-400 transition-colors" @click="mobileSearchOpen = !mobileSearchOpen">
            <Icon name="heroicons:magnifying-glass" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Mobile Search Overlay -->
      <div v-if="mobileSearchOpen" class="border-t border-gray-100 px-6 py-4 md:hidden">
        <div class="flex items-center border-b border-accent-400">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="flex-1 px-0 py-2 text-sm bg-transparent border-none outline-none placeholder:text-gray-300"
            @keyup.enter="mobileSearchOpen = false; goSearch()"
          />
          <button @click="mobileSearchOpen = false; goSearch()" class="p-1 group">
            <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-black group-hover:text-accent-400 transition-colors" />
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div class="col-span-2 md:col-span-1">
            <NuxtLink to="/" class="text-2xl font-serif font-bold text-black no-underline">Jova Mart</NuxtLink>
            <p class="text-sm text-gray-400 mt-3 max-w-xs leading-relaxed">
              Belanja fashion & kecantikan terpercaya dengan pengalaman terbaik.
            </p>
            <div class="flex gap-3 mt-6">
              <a class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-accent-400 transition-colors group">
                <Icon name="mdi:instagram" class="w-3.5 h-3.5 text-gray-500 group-hover:text-accent-400" />
              </a>
              <a class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-accent-400 transition-colors group">
                <Icon name="mdi:tiktok" class="w-3.5 h-3.5 text-gray-500 group-hover:text-accent-400" />
              </a>
              <a class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-accent-400 transition-colors group">
                <Icon name="mdi:whatsapp" class="w-3.5 h-3.5 text-gray-500 group-hover:text-accent-400" />
              </a>
            </div>
          </div>
          <div>
            <h6 class="text-[11px] uppercase tracking-widest text-gray-400 mb-4 font-serif font-bold">Belanja</h6>
            <div class="space-y-2.5">
              <NuxtLink to="/products" class="block text-sm text-gray-600 hover:text-black transition-colors">Katalog</NuxtLink>
              <NuxtLink to="/products" class="block text-sm text-gray-600 hover:text-black transition-colors">Kategori</NuxtLink>
              <NuxtLink to="/products" class="block text-sm text-gray-600 hover:text-black transition-colors">Brand</NuxtLink>
            </div>
          </div>
          <div>
            <h6 class="text-[11px] uppercase tracking-widest text-gray-400 mb-4 font-serif font-bold">Bantuan</h6>
            <div class="space-y-2.5">
              <span class="block text-sm text-gray-400">Cara Belanja</span>
              <span class="block text-sm text-gray-400">Syarat & Ketentuan</span>
              <span class="block text-sm text-gray-400">Kebijakan Privasi</span>
            </div>
          </div>
          <div>
            <h6 class="text-[11px] uppercase tracking-widest text-gray-400 mb-4 font-serif font-bold">Kontak</h6>
            <div class="space-y-2.5">
              <a href="mailto:hello@jovamart.com" class="block text-sm text-gray-600 hover:text-black transition-colors">hello@jovamart.com</a>
              <a href="tel:+6281234567890" class="block text-sm text-gray-600 hover:text-black transition-colors">+62 812 3456 7890</a>
            </div>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-50 px-6 md:px-12 py-5">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-gray-300">
          <p>&copy; 2026 Jova Mart. All rights reserved.</p>
          <p>Made with care in Indonesia</p>
        </div>
      </div>
    </footer>

    <!-- Toast Container -->
    <div class="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="px-5 py-3 rounded-2xl text-sm font-medium shadow-lg border transition-all duration-300"
          :class="toast.type === 'success' ? 'bg-black text-white border-gray-800' : toast.type === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-white text-gray-700 border-gray-200'"
        >
          <div class="flex items-center gap-2">
            <Icon v-if="toast.type === 'success'" name="heroicons:check-circle" class="w-4 h-4 shrink-0" />
            <Icon v-else-if="toast.type === 'error'" name="heroicons:exclamation-circle" class="w-4 h-4 shrink-0" />
            <span>{{ toast.message }}</span>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, isLoggedIn, logout, fetchMe } = useAuth()
const { totalItems: cartTotal, fetchCart } = useCart()
const { toasts } = useToast()

const searchQuery = ref('')
const searchOpen = ref(false)
const mobileSearchOpen = ref(false)
const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)
const router = useRouter()

function openSearch() {
  searchOpen.value = true
  nextTick(() => searchInput.value?.focus())
}

function goSearch() {
  if (searchQuery.value.trim()) {
    router.push(`/products?search=${encodeURIComponent(searchQuery.value.trim())}`)
    searchOpen.value = false
    mobileSearchOpen.value = false
  }
}

function closeSearch() {
  setTimeout(() => { searchOpen.value = false }, 150)
}

function onDocumentClick(e: MouseEvent) {
  if (dropdownOpen.value && dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  if (isLoggedIn.value && !user.value) {
    fetchMe()
  }
  if (isLoggedIn.value) {
    fetchCart()
  }
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>
