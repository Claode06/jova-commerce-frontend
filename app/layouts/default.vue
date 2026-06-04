<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Navbar -->
    <header class="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div class="flex items-center justify-between px-6 md:px-12 h-16">
        <NuxtLink to="/" class="text-xl md:text-2xl font-serif font-bold tracking-tight text-black no-underline">
          Jova Mart
        </NuxtLink>

        <div class="flex items-center gap-6">
          <!-- Desktop Search -->
          <div class="hidden md:flex items-center">
            <div v-if="searchOpen" class="flex items-center border-b border-black">
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="w-64 px-0 py-1.5 text-sm bg-transparent border-none outline-none placeholder:text-gray-300"
                @keyup.enter="goSearch"
                @blur="searchOpen = false"
              />
              <button @click="goSearch" class="p-1">
                <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-black" />
              </button>
            </div>
            <button v-else @click="openSearch" class="p-1 hover:opacity-60 transition-opacity">
              <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-black" />
            </button>
          </div>

          <NuxtLink to="/cart" class="relative p-1 hover:opacity-60 transition-opacity">
            <Icon name="heroicons:shopping-cart" class="w-5 h-5 text-black" />
            <span
              v-if="cartTotal > 0"
              class="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-black text-white text-[8px] flex items-center justify-center rounded-full"
            >
              {{ cartTotal > 9 ? '9+' : cartTotal }}
            </span>
          </NuxtLink>

          <template v-if="isLoggedIn || user">
            <div class="relative" @click.outside="dropdownOpen = false">
              <button @click="dropdownOpen = !dropdownOpen" class="flex items-center gap-1.5 p-1 hover:opacity-60 transition-opacity">
                <Icon name="heroicons:user-circle" class="w-5 h-5 text-black" />
                <span class="hidden md:inline text-sm text-gray-600">{{ user?.name || 'Akun' }}</span>
              </button>
              <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-sm py-2 z-50">
                <!-- User Info -->
                <div class="px-4 py-3 border-b border-gray-50">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-full bg-gray-100 text-gray-600 text-sm font-medium flex items-center justify-center shrink-0">
                      {{ user?.name?.[0]?.toUpperCase() || 'U' }}
                    </div>
                    <div class="min-w-0">
                      <p class="text-sm font-medium text-black truncate">{{ user?.name || 'User' }}</p>
                      <p class="text-xs text-gray-400 truncate">{{ user?.email || '' }}</p>
                    </div>
                  </div>
                </div>
                <NuxtLink to="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-50 transition-colors">Pesanan Saya</NuxtLink>
                <NuxtLink to="/orders?tab=paid" class="block px-4 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-50 transition-colors">Transaksi Dibayar</NuxtLink>
                <NuxtLink to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-50 transition-colors">Profil</NuxtLink>
                <hr class="my-1 border-gray-50" />
                <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-50 transition-colors">Keluar</button>
              </div>
            </div>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="text-sm text-gray-600 hover:text-black transition-colors hidden md:inline">Masuk</NuxtLink>
            <NuxtLink to="/register" class="text-sm font-medium text-black border border-gray-300 rounded-full px-5 py-1.5 hover:bg-black hover:text-white hover:border-black transition-all hidden md:inline">Daftar</NuxtLink>
          </template>

          <!-- Mobile: search + menu toggles -->
          <button class="block md:hidden p-1" @click="mobileSearchOpen = !mobileSearchOpen">
            <Icon name="heroicons:magnifying-glass" class="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      <!-- Mobile Search Overlay -->
      <div v-if="mobileSearchOpen" class="border-t border-gray-100 px-6 py-4 md:hidden">
        <div class="flex items-center border-b border-black">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="flex-1 px-0 py-2 text-sm bg-transparent border-none outline-none placeholder:text-gray-300"
            @keyup.enter="mobileSearchOpen = false; goSearch()"
          />
          <button @click="mobileSearchOpen = false; goSearch()" class="p-1">
            <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-black" />
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
              <a class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition-colors">
                <Icon name="mdi:instagram" class="w-3.5 h-3.5 text-gray-500" />
              </a>
              <a class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition-colors">
                <Icon name="mdi:tiktok" class="w-3.5 h-3.5 text-gray-500" />
              </a>
              <a class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition-colors">
                <Icon name="mdi:whatsapp" class="w-3.5 h-3.5 text-gray-500" />
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
              <a class="block text-sm text-gray-600 hover:text-black transition-colors">Cara Belanja</a>
              <a class="block text-sm text-gray-600 hover:text-black transition-colors">Syarat & Ketentuan</a>
              <a class="block text-sm text-gray-600 hover:text-black transition-colors">Kebijakan Privasi</a>
            </div>
          </div>
          <div>
            <h6 class="text-[11px] uppercase tracking-widest text-gray-400 mb-4 font-serif font-bold">Kontak</h6>
            <div class="space-y-2.5">
              <a class="block text-sm text-gray-600 hover:text-black transition-colors">hello@jovamart.com</a>
              <a class="block text-sm text-gray-600 hover:text-black transition-colors">+62 812 3456 7890</a>
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
  </div>
</template>

<script setup lang="ts">
const { user, isLoggedIn, logout, fetchMe } = useAuth()
const cartTotal = computed(() => useCart().totalItems)

const searchQuery = ref('')
const searchOpen = ref(false)
const mobileSearchOpen = ref(false)
const dropdownOpen = ref(false)
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

onMounted(() => {
  if (isLoggedIn.value && !user.value) {
    fetchMe()
  }
})
</script>
