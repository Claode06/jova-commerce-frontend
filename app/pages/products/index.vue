<template>
  <div class="max-w-7xl mx-auto px-6 py-12">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-xs text-gray-400 mb-8">
      <NuxtLink to="/" class="hover:text-black transition-colors">Beranda</NuxtLink>
      <span>/</span>
      <span class="text-gray-600">Produk</span>
    </div>

    <div class="flex flex-col md:flex-row gap-8">
      <!-- Filter Sidebar -->
      <aside class="w-full md:w-56 shrink-0">
        <div class="border border-gray-100 rounded-3xl p-6">
          <h3 class="text-xs uppercase tracking-widest text-gray-400 mb-6">Filter</h3>

          <!-- Category -->
          <div class="mb-6">
            <p class="text-[10px] uppercase tracking-widest text-gray-400 mb-3">Kategori</p>
            <div class="space-y-2">
              <label
                v-for="cat in categories"
                :key="cat.id"
                class="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  :value="cat.slug"
                  :checked="filters.category === cat.slug"
                  class="w-3.5 h-3.5 border border-gray-300 rounded-full accent-accent-400"
                  @change="setFilter('category', cat.slug)"
                />
                <span class="text-sm text-gray-700">{{ cat.name }}</span>
                <span class="text-xs text-gray-300">({{ cat.products_count }})</span>
              </label>
              <button
                v-if="filters.category"
                class="text-[10px] text-gray-400 hover:text-accent-400 uppercase tracking-wider mt-1 transition-colors"
                @click="clearFilter('category')"
              >
                Semua Kategori
              </button>
            </div>
          </div>

          <!-- Brand -->
          <div class="mb-6">
            <p class="text-[10px] uppercase tracking-widest text-gray-400 mb-3">Brand</p>
            <div class="space-y-2">
              <label
                v-for="brand in brands"
                :key="brand.id"
                class="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="brand"
                  :value="brand.slug"
                  :checked="filters.brand === brand.slug"
                  class="w-3.5 h-3.5 border border-gray-300 rounded-full accent-accent-400"
                  @change="setFilter('brand', brand.slug)"
                />
                <span class="text-sm text-gray-700">{{ brand.name }}</span>
              </label>
                <button
                  v-if="filters.brand"
                  class="text-[10px] text-gray-400 hover:text-accent-400 uppercase tracking-wider mt-1 transition-colors"
                  @click="clearFilter('brand')"
                >
                  Semua Brand
                </button>
            </div>
          </div>

          <!-- Gender -->
          <div class="mb-6">
            <p class="text-[10px] uppercase tracking-widest text-gray-400 mb-3">Gender</p>
            <div class="space-y-2">
              <label class="flex items-center gap-2 cursor-pointer" v-for="g in genders" :key="g.value">
                <input
                  type="radio"
                  name="gender"
                  :value="g.value"
                  :checked="filters.gender === g.value"
                  class="w-3.5 h-3.5 border border-gray-300 rounded-full accent-accent-400"
                  @change="setFilter('gender', g.value)"
                />
                <span class="text-sm text-gray-700">{{ g.label }}</span>
              </label>
                <button
                  v-if="filters.gender"
                  class="text-[10px] text-gray-400 hover:text-accent-400 uppercase tracking-wider mt-1 transition-colors"
                  @click="clearFilter('gender')"
                >
                  Semua Gender
                </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- Product Grid -->
      <div class="flex-1">
        <!-- Sort & Info -->
        <div class="flex items-center justify-between mb-6 flex-wrap gap-2">
          <p class="text-xs text-gray-400 font-light">
            Menampilkan {{ products?.from || 0 }} - {{ products?.to || 0 }} dari {{ products?.total || 0 }} produk
          </p>
          <select v-model="filters.sort" class="text-xs border border-gray-200 rounded-full px-4 py-2 bg-white focus:border-accent-400 focus:outline-none" @change="loadProducts(1)">
            <option value="newest">Terbaru</option>
            <option value="price_asc">Harga Terendah</option>
            <option value="price_desc">Harga Tertinggi</option>
            <option value="name">Nama A-Z</option>
          </select>
        </div>

        <!-- Active Filters -->
        <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mb-6">
          <div class="inline-flex items-center gap-1 text-[11px] bg-accent-50 text-accent-600 rounded-full px-3 py-1" v-if="filters.category">
            {{ getCategoryName(filters.category) }}
            <button @click="clearFilter('category')" class="text-gray-400 hover:text-accent-400 ml-0.5">✕</button>
          </div>
          <div class="inline-flex items-center gap-1 text-[11px] bg-accent-50 text-accent-600 rounded-full px-3 py-1" v-if="filters.brand">
            {{ getBrandName(filters.brand) }}
            <button @click="clearFilter('brand')" class="text-gray-400 hover:text-accent-400 ml-0.5">✕</button>
          </div>
          <div class="inline-flex items-center gap-1 text-[11px] bg-accent-50 text-accent-600 rounded-full px-3 py-1" v-if="filters.gender">
            {{ filters.gender === 1 ? 'Wanita' : filters.gender === 2 ? 'Pria' : 'Unisex' }}
            <button @click="clearFilter('gender')" class="text-gray-400 hover:text-accent-400 ml-0.5">✕</button>
          </div>
          <button class="text-[11px] text-gray-400 hover:text-accent-400 underline-offset-2 hover:underline transition-colors" @click="clearAllFilters">Hapus Semua</button>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="n in 6" :key="n" class="rounded-3xl overflow-hidden bg-white">
            <div class="skeleton w-full aspect-square rounded-none"></div>
            <div class="p-4 space-y-2">
              <div class="skeleton h-3 w-16"></div>
              <div class="skeleton h-4 w-3/4"></div>
              <div class="skeleton h-4 w-1/3"></div>
            </div>
          </div>
        </div>

        <!-- Empty -->
        <div v-else-if="!products?.data?.length" class="text-center py-20">
          <Icon name="heroicons:magnifying-glass-circle" class="w-16 h-16 mx-auto text-accent-200 mb-4" />
          <p class="text-gray-400 text-sm">Tidak ada produk ditemukan</p>
          <button class="inline-block mt-4 text-xs text-gray-400 hover:text-black underline transition-colors" @click="clearAllFilters">Reset Filter</button>
        </div>

        <!-- Products Grid -->
        <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <ProductCard v-for="product in products.data" :key="product.id" :product="product" />
        </div>

        <!-- Pagination -->
        <div v-if="products?.last_page > 1" class="flex justify-center mt-12 gap-1">
          <button
            class="w-9 h-9 flex items-center justify-center text-sm rounded-full border border-gray-200 hover:border-black disabled:opacity-30 disabled:cursor-default transition-colors"
            :disabled="!products.prev_page_url"
            @click="loadProducts(products.current_page - 1)"
          >
            ‹
          </button>
          <button
            v-for="p in products.last_page"
            :key="p"
            class="w-9 h-9 flex items-center justify-center text-sm rounded-full border transition-colors"
            :class="p === products.current_page ? 'bg-accent-400 text-white border-accent-400' : 'border-gray-200 hover:border-accent-400 text-gray-600'"
            @click="loadProducts(p)"
          >
            {{ p }}
          </button>
          <button
            class="w-9 h-9 flex items-center justify-center text-sm rounded-full border border-gray-200 hover:border-black disabled:opacity-30 disabled:cursor-default transition-colors"
            :disabled="!products.next_page_url"
            @click="loadProducts(products.current_page + 1)"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetchProducts, fetchCategories, fetchBrands } = useCatalog()
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const products = ref<any>(null)
const categories = ref<any[]>([])
const brands = ref<any[]>([])

const genders = [
  { label: 'Wanita', value: 1 },
  { label: 'Pria', value: 2 },
  { label: 'Unisex', value: 3 },
]

const filters = reactive({
  category: (route.query.category as string) || '',
  brand: (route.query.brand as string) || '',
  gender: route.query.gender ? Number(route.query.gender) : null as number | null,
  search: (route.query.search as string) || '',
  sort: (route.query.sort as string) || 'newest',
})

const hasActiveFilters = computed(() => filters.category || filters.brand || filters.gender)

function syncUrl() {
  const query: Record<string, string> = {}
  if (filters.category) query.category = filters.category
  if (filters.brand) query.brand = filters.brand
  if (filters.gender) query.gender = String(filters.gender)
  if (filters.search) query.search = filters.search
  if (filters.sort && filters.sort !== 'newest') query.sort = filters.sort
  router.replace({ query })
}

function setFilter(key: string, value: any) {
  ;(filters as any)[key] = value
  syncUrl()
  loadProducts(1)
}

function clearFilter(key: string) {
  ;(filters as any)[key] = key === 'gender' ? null : ''
  syncUrl()
  loadProducts(1)
}

function clearAllFilters() {
  filters.category = ''
  filters.brand = ''
  filters.gender = null
  filters.search = ''
  filters.sort = 'newest'
  router.replace({ query: {} })
  loadProducts(1)
}

function getCategoryName(slug: string) {
  return categories.value.find((c: any) => c.slug === slug)?.name || slug
}

function getBrandName(slug: string) {
  return brands.value.find((b: any) => b.slug === slug)?.name || slug
}

async function loadProducts(page = 1) {
  loading.value = true
  try {
    const result = await fetchProducts({
      category: filters.category || undefined,
      brand: filters.brand || undefined,
      gender: filters.gender || undefined,
      search: filters.search || undefined,
      sort: filters.sort || 'newest',
      page,
      per_page: 12,
    })
    products.value = result
  } finally {
    loading.value = false
  }
}

watch(() => route.query, (query) => {
  filters.category = (query.category as string) || ''
  filters.brand = (query.brand as string) || ''
  filters.gender = query.gender ? Number(query.gender) : null
  filters.search = (query.search as string) || ''
  filters.sort = (query.sort as string) || 'newest'
  loadProducts(1)
})

onMounted(async () => {
  const [cats, brds] = await Promise.all([fetchCategories(), fetchBrands()])
  categories.value = cats
  brands.value = brds
  loadProducts()
})
</script>
